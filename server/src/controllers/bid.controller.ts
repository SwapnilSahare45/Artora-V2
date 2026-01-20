import { Response } from "express";
import { AuthRequest } from "../types";
import { Bid } from "../models/bid.model";
import { Artwork } from "../models/artwork.model";
import { io } from "../server";

export const placeBid = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId || req.user.role !== "collector") {
      return res.status(403).json({
        success: false,
        error: "Vault Access Denied: Only verified collectors may place bids.",
      });
    }

    const { artworkId, amount } = req.body;

    // Validate input
    if (!artworkId || amount === undefined) {
      return res.status(400).json({
        success: false,
        error:
          "Protocol Error: Missing asset identification or valuation amount.",
      });
    }

    // Validate amount is a positive number
    const bidAmount = Number(amount);
    if (isNaN(bidAmount) || bidAmount <= 0) {
      return res.status(400).json({
        success: false,
        error:
          "Valuation Error: Bid amount must be a positive numerical figure.",
      });
    }

    // Find artwork
    const artwork = await Artwork.findById(artworkId);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        error:
          "Asset Protocol Error: The specified masterpiece was not found in the Vault.",
      });
    }

    // Validate artwork is available for auction
    if (artwork.status !== "verified" || artwork.salePath !== "auction") {
      return res.status(400).json({
        success: false,
        error:
          "Acquisition Error: This masterpiece is not currently open for auction.",
      });
    }

    // Highest bidder restriction
    if (
      artwork.highestBidder &&
      artwork.highestBidder.toString() === req.user.userId
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Bid Restriction: You are already the highest bidder for this artwork.",
      });
    }

    // Validate bid amount is higher than current bid
    const currentBid = artwork.openingBid || 0;
    const minimumBid =
      currentBid > 0 ? Math.floor(currentBid * 1.1) : currentBid;

    if (bidAmount <= minimumBid) {
      return res.status(400).json({
        success: false,
        error: `Acquisition Error: Minimum acceptable bid is ₹${minimumBid.toLocaleString("en-IN")}.`,
      });
    }

    // Create new bid
    const newBid = await Bid.create({
      artwork: artwork._id,
      bidder: req.user.userId,
      amount: bidAmount,
    });

    // Update artwork with new bid
    await Artwork.findByIdAndUpdate(
      artworkId,
      { openingBid: bidAmount, highestBidder: req.user.userId },
      { runValidators: false },
    );

    // Emit socket event to all users in the auction room
    io.to(artworkId).emit("bid-updated", {
      artworkId,
      amount: bidAmount,
      bidder: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Bid successfully recorded in the Artora Protocol.",
      bid: {
        _id: newBid._id,
        amount: newBid.amount,
        createdAt: newBid.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Vault Protocol failure: The bid could not be secured.",
    });
  }
};
