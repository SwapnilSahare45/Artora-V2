import { Response } from "express";
import { AuthRequest, IArtwork } from "../types";
import { Artwork } from "../models/artwork.model";
import { Auction } from "../models/auction.model";
import mongoose from "mongoose";

// Get all unverified pending artworks
export const getUnverifiedArtworks = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        error:
          "Vault Access Denied: Admin privileges required to access pending assets.",
      });
    }

    // Fetch artworks which are still pending verification
    const artworks: IArtwork[] = await Artwork.find({ status: "pending" })
      .populate("artist", "firstName lastName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Pending curation queue synchronized successfully.",
      count: artworks.length,
      artworks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:
        "Internal protocol failure while accessing the pending collection.",
    });
  }
};

// Mark as verified after admin approval
export const verifyArtwork = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        error:
          "Authorization failed: High-level clearance required for verification.",
      });
    }

    // Update artwork status to verified
    const artwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      { status: "verified" },
      { new: true },
    );

    if (!artwork) {
      return res.status(404).json({
        success: false,
        error:
          "Asset identification failure. Matching record not found in the archives.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Asset validated. Artwork is now archived as verified within the network.",
      artwork,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:
        "Verification protocol failure. Asset integrity could not be updated.",
    });
  }
};

// Mark artwork as rejected by admin
export const rejectArtwork = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        error:
          "Authorization failed: High-level clearance required for asset rejection.",
      });
    }

    // Update artwork status to rejected
    const artwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true },
    );

    if (!artwork) {
      return res.status(404).json({
        success: false,
        error: "Asset identification failure. Matching record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Asset rejected. Documentation updated within the Artora registry.",
      artwork,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Artwork rejection failed",
    });
  }
};

// Get verified artworks eligible for auction
export const getArtworksForAuction = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Admin privileges required to access the curation pool.",
      });
    }

    // Fetch verified artworks send for auction
    const artworks = await Artwork.find({
      salePath: "auction",
      status: "verified",
      auctionId: { $exists: false },
    })
      .populate("artist", "firstName lastName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Auction curation pool synchronized.",
      count: artworks.length,
      artworks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:
        "Internal protocol failure while retrieving auction-eligible assets.",
    });
  }
};

// Create and schedules an auction
export const createAuction = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Admin privileges required to orchestrate a new exhibition.",
      });
    }

    const {
      title,
      description,
      artworkIds,
      startDate,
      endDate,
      status = "scheduled",
    } = req.body;

    if (
      !title ||
      !description ||
      !Array.isArray(artworkIds) ||
      artworkIds.length === 0 ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Incomplete orchestration parameters. All exhibition data must be defined.",
      });
    }

    // Ensure artworks are verified and auction-eligible
    const verifiedArtworks = await Artwork.find({
      _id: { $in: artworkIds },
      status: "verified",
      salePath: "auction",
    });

    // Validate artwork ids
    if (verifiedArtworks.length !== artworkIds.length) {
      return res.status(400).json({
        success: false,
        error:
          "Validation failed: One or more assets are not verified or lack auction eligibility.",
      });
    }

    // Create Auction
    const auction = await Auction.create({
      title,
      description,
      artworkIds: artworkIds.map(
        (id: string) => new mongoose.Types.ObjectId(id),
      ),
      startDate,
      endDate,
      status,
      createdBy: req.user.userId,
    });

    // Link artworks to the created auction
    await Artwork.updateMany(
      { _id: { $in: artworkIds } },
      { $set: { auctionId: auction._id } },
    );

    return res.status(201).json({
      success: true,
      message:
        "Exhibition successfully orchestrated. Assets linked to temporal window.",
      auction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:
        "Exhibition orchestration failed due to an internal protocol error.",
    });
  }
};

// Get scheduled auctions
export const getScheduledAuctions = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Vault Access Denied: Admin authorization required.",
      });
    }

    // Fetch all auctions with artwork data
    const auctions = await Auction.find()
      .populate({
        path: "artworkIds",
        select: "openingBid price",
      })
      .sort({ startDate: 1 });

    // Format data
    const formattedAuctions = auctions.map((auction: any) => {
      const totalValuation = auction.artworkIds.reduce(
        (acc: number, art: any) => acc + (art.openingBid || 0),
        0,
      );

      return {
        id: auction._id,
        title: auction.title,
        status: auction.status,
        date: auction.startDate,
        lots: auction.artworkIds.length,
        valuation: `₹${(totalValuation / 1000).toFixed(1)}K`,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Exhibition timeline synchronized successfully.",
      auctions: formattedAuctions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Timeline synchronization protocol failure.",
    });
  }
};

// Get verified artworks not yet assigned to any auction
export const getCurationPool = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        error:
          "Vault Access Denied: Admin authorization required to access the curation pool.",
      });
    }

    const artworks = await Artwork.find({
      status: "verified",
      salePath: "auction",
      auctionId: { $exists: false }, // exclude already assigned artworks
    })
      .populate("artist", "firstName lastName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message:
        "Available asset pool synchronized for curation. Ready for orchestration.",
      artworks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:
        "Asset pool retrieval failure. Internal protocol synchronization error.",
    });
  }
};
