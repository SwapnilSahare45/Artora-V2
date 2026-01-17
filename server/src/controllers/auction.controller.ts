import { Response } from "express";
import { AuthRequest } from "../types";
import { Auction } from "../models/auction.model";

export const getAuctions = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        error: "Vault Access Denied: Authentication credentials missing.",
      });
    }

    // Fetch all auctions which are either scheduled or live
    const auctions = await Auction.find({
      status: { $in: ["scheduled", "live"] },
    })
      .populate({
        path: "artworkIds",
        populate: {
          path: "artist",
          select: "firstName lastName avatar",
        },
      })
      .sort({ startDate: 1 });

    return res.status(200).json({
      success: true,
      message:
        "Auction protocols successfully retrieved from the Artora Vault.",
      count: auctions.length,
      auctions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:
        "Internal Vault Protocol failure while accessing auction scheduling records.",
    });
  }
};

export const getAuctionById = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        error: "Vault Access Denied: Authentication credentials missing.",
      });
    }

    const { id } = req.params;

    // Find auction by ID which is scheduled or live
    const auction = await Auction.findOne({
      _id: id,
      status: { $in: ["scheduled", "live"] },
    }).populate({
      path: "artworkIds",
      populate: {
        path: "artist",
        select: "firstName lastName avatar",
      },
    });

    // If auction not found
    if (!auction) {
      return res.status(404).json({
        success: false,
        error:
          "Auction Protocol Error: Auction event not found or not accessible in the current protocol state.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Auction protocol successfully initialized and retrieved from the Vault.",
      auction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:
        "Internal Vault Protocol failure while retrieving auction execution data.",
    });
  }
};
