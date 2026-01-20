import mongoose from "mongoose";
import cron from "node-cron";
import { Auction } from "../models/auction.model";
import { Artwork } from "../models/artwork.model";
import { Bid } from "../models/bid.model";
import { Order } from "../models/order.model";

export const initAuctionEndWorker = () => {
  cron.schedule("* * * * *", async () => {
    // Start mongodb session for transaction safety
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const now = new Date();

      //   Find all auctions that are live but whose end time has passed
      const auctions = await Auction.find({
        status: "live",
        endDate: { $lte: now },
      }).session(session);

      if (!auctions.length) {
        await session.endSession();
        return;
      }

      for (const auction of auctions) {
        for (const artworkId of auction.artworkIds) {
          const artwork = await Artwork.findById(artworkId).session(session);
          if (!artwork) continue;

          // Find highest bid placed for this artwork
          const highestBid = await Bid.findOne({ artwork: artworkId })
            .sort({ amount: -1 }) // Highest amount first
            .session(session);

          //If no one placed a bid
          if (!highestBid) {
            // Remove auction link so artwork can be reused
            await Artwork.findByIdAndUpdate(
              artworkId,
              {
                $unset: { auctionId: 1, highestBidder: 1 },
              },
              { session },
            );
            continue;
          }

          //   Create an order for the heighest bidder
          await Order.create(
            [
              {
                buyer: highestBid.bidder,
                artist: artwork.artist,
                artwork: artwork._id,
                saleType: "auction",
                auction: auction._id,
                orderStatus: "awaiting_details",
                paymentStatus: "pending",
              },
            ],
            { session },
          );

          // Mark artwork as sold
          await Artwork.findByIdAndUpdate(
            artworkId,
            {
              status: "sold",
              highestBidder: highestBid.bidder,
            },
            { session },
          );
        }

        // Mark auction as completed
        auction.status = "completed";
        await auction.save({ session });
      }

      //   Commit all DB changes if everything success
      await session.commitTransaction();
      console.log(`Successfully completed ${auctions.length} auctions.`);
    } catch (error) {
      // Rollback all DB changes if any error occurs
      await session.abortTransaction();
      console.error("Auction end worker failed:", error);
    } finally {
      // End the session
      session.endSession();
    }
  });
};
