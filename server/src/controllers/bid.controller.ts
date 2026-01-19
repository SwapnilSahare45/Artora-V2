import { Response } from "express";
import { AuthRequest } from "../types";
import { Bid } from "../models/bid.model";
import { Artwork } from "../models/artwork.model";
import { io } from "../server";

export const placeBid = async (req: AuthRequest, res: Response) => {
  try {
    // Validate user authentication and role
    if (!req.user?.userId || req.user.role !== "collector") {
      return res.status(403).json({
        success: false,
        error: "Only collectors can place bids",
      });
    }

    const { artworkId, amount } = req.body;

    // Validate input
    if (!artworkId || !amount) {
      return res.status(400).json({
        success: false,
        error: "Artwork ID and bid amount are required",
      });
    }

    // Validate amount is a positive number
    const bidAmount = Number(amount);
    if (isNaN(bidAmount) || bidAmount <= 0) {
      return res.status(400).json({
        success: false,
        error: "Bid amount must be a positive number",
      });
    }

    // Find artwork
    const artwork = await Artwork.findById(artworkId);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        error: "Artwork not found",
      });
    }

    // Validate artwork is available for auction
    if (artwork.status !== "verified" || artwork.salePath !== "auction") {
      return res.status(400).json({
        success: false,
        error: "This artwork is not available for auction",
      });
    }

    // Validate bid amount is higher than current bid
    const currentBid = artwork.openingBid || 0;
    const minimumBid =
      currentBid > 0 ? Math.floor(currentBid * 1.1) : currentBid;

    if (bidAmount <= minimumBid) {
      return res.status(400).json({
        success: false,
        error: `Bid must be higher than ₹${minimumBid.toLocaleString()}`,
      });
    }

    // Create new bid
    const newBid = await Bid.create({
      artwork: artwork._id,
      bidder: req.user.userId,
      amount: bidAmount,
    });

    // Update artwork with new bid - Use findByIdAndUpdate to skip validation
    await Artwork.findByIdAndUpdate(
      artworkId,
      { openingBid: bidAmount },
      { runValidators: false }, // Skip validation since we're only updating openingBid
    );

    // Emit socket event to all clients in the auction room
    io.to(artworkId).emit("bid-updated", {
      artworkId,
      amount: bidAmount,
      bidder: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Bid placed successfully",
      bid: {
        _id: newBid._id,
        amount: newBid.amount,
        createdAt: newBid.createdAt,
      },
    });
  } catch (error) {
    console.error("Error placing bid:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to place bid. Please try again later.",
    });
  }
};
