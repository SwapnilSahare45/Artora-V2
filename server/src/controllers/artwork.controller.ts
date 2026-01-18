import { Request, Response } from "express";
import {
  AuthRequest,
  IArtwork,
  IArtworkInput,
  IArtworkQueryParams,
} from "../types";
import { bufferToDataUrl } from "../utils/bufferToDataUrl";
import cloudinary from "../utils/cloudinary";
import { Artwork } from "../models/artwork.model";
import { Auction } from "../models/auction.model";

export const getFeaturedArtworks = async (req: Request, res: Response) => {
  try {
    // Get live auctions
    const liveAuctions = await Auction.find({ status: "live" }).select("_id");
    const liveAuctionIds = liveAuctions.map((a) => a._id);

    // Filter -> Featured, verified, Not sold and direct sale or live Auction
    const filter = {
      isFeatured: true,
      status: "verified",
      $or: [
        { salePath: "direct" },
        { salePath: "auction", auctionId: { $in: liveAuctionIds } },
      ],
    };

    // Fetch artworks
    const artworks = await Artwork.find(filter)
      .populate("artist", "firstName lastName avatar")
      .populate("auctionId", "status startDate endDate")
      .sort({ createdAt: -1 })
      .limit(6);

    return res.status(200).json({
      success: true,
      message: "Featured artworks retrieved successfully",
      artworks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal protocol failure while fetching featured artworks",
    });
  }
};

export const getAllVerifiedArtworks = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "12",
      category,
      medium,
      search,
      sortBy = "createdAt",
      order = "desc",
      minPrice,
      maxPrice,
    }: IArtworkQueryParams = req.query;

    // Fetch live auctionIds
    const liveAuctionIds = await Auction.find({ status: "live" }).select("_id");
    const auctionIds = liveAuctionIds.map((a) => a._id);

    // Convert page and limit to number
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(50, Math.max(1, Number(limit) || 12)); // Max 50 per page
    const skip = (pageNum - 1) * limitNum;

    // Create a filter object
    // Only verified artworks
    const filter: any = {
      status: "verified",
      $and: [
        {
          $or: [
            { salePath: "direct" },
            { salePath: "auction", auctionId: { $in: auctionIds } },
          ],
        },
      ],
    };

    // Category filter
    if (category && category.toLowerCase() !== "all") {
      filter.category = category;
    }

    // Medium filter
    if (medium && medium.toLowerCase() !== "all") {
      filter.medium = medium;
    }

    // Search filter (title, description)
    if (search && search.trim()) {
      filter.$and.push({
        $or: [
          { title: { $regex: search.trim(), $options: "i" } },
          { description: { $regex: search.trim(), $options: "i" } },
        ],
      });
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Create sort logic
    const sortOrder = order === "asc" ? 1 : -1;
    const sortObj: any = { [sortBy]: sortOrder };

    // Fetch artworks and total count at the same time
    const [artworks, totalCount] = await Promise.all([
      Artwork.find(filter)
        .populate("artist", "firstName lastName avatar")
        .populate("auctionId", "status startDate endDate")
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum)
        .lean(),

      Artwork.countDocuments(filter),
    ]);
    console.log(artworks);

    // Calculate pegination info
    const totalPages = Math.ceil(totalCount / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved verified artworks from the collection.",
      data: {
        artworks,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          limit: limitNum,
          hasNextPage,
          hasPrevPage,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal protocol failure while accessing the collection.",
    });
  }
};

export const getArtworkById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find artwork by id
    const artwork: IArtwork | null = await Artwork.findById(id)
      .populate("artist", "firstName lastName avatar bio")
      .lean();

    // If artwork not found
    if (!artwork) {
      return res.status(404).json({
        success: false,
        error: "Artwork not found in the vault.",
      });
    }

    // If artwork is not verified
    if (artwork.status !== "verified") {
      return res.status(403).json({
        success: false,
        error: "This artwork is not yet available in the public collection.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Artwork retrieved successfully.",
      artwork,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal protocol failure while retrieving artwork details.",
    });
  }
};

export const depositArtwork = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Vault Access Denied: Authentication credentials missing.",
      });
    }
    const {
      title,
      category,
      medium,
      year,
      dimensions,
      description,
      salePath,
      price,
      openingBid,
      reservePrice,
    }: IArtworkInput = req.body;

    if (
      !title ||
      !category ||
      !medium ||
      !year ||
      !dimensions ||
      !description ||
      !salePath
    ) {
      return res.status(400).json({
        success: false,
        error: "Acquisition parameters are incomplete.",
      });
    }

    // Check if image file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Master digital asset missing from transmission.",
      });
    }

    // Validate price for direct sale
    if (salePath === "direct" && (!price || Number(price) <= 0)) {
      return res.status(400).json({
        success: false,
        error:
          "A valid acquisition price is required for direct marketplace listings.",
      });
    }

    // Validate auction values
    if (salePath === "auction") {
      if (!openingBid || Number(openingBid) <= 0) {
        return res.status(400).json({
          success: false,
          error:
            "An opening bid is required to initialize an auction sequence.",
        });
      }

      if (reservePrice && Number(reservePrice) < Number(openingBid)) {
        return res.status(400).json({
          success: false,
          error: "Reserve price cannot be lower than the opening bid.",
        });
      }
    }

    let uploadResponse;
    // Upload image to cloudinary
    try {
      const fileDataUrl = bufferToDataUrl(req.file);
      uploadResponse = await cloudinary.uploader.upload(fileDataUrl, {
        folder: "artora/artworks",
        public_id: `art-${req.user?.userId}-${Date.now()}`,
        overwrite: false,
        resource_type: "auto",
        transformation: [{ quality: "auto:good" }, { fetch_format: "auto" }],
      });
    } catch (uploadErr) {
      return res.status(500).json({
        success: false,
        error: "Failed to archive asset in digital cloud. Please try again.",
      });
    }

    // Save artwork in database
    const newArtwork = await Artwork.create({
      artist: req.user?.userId,
      title,
      category,
      medium,
      year,
      dimensions,
      description,
      salePath,
      imageURL: uploadResponse.secure_url,
      price: salePath === "direct" ? Number(price) : undefined,
      openingBid: salePath === "auction" ? Number(openingBid) : undefined,
      reservePrice: reservePrice ? Number(reservePrice) : undefined,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Masterpiece successfully archived in the Artora Vault.",
      artwork: newArtwork,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Internal Vault Protocol failure. Please try again later.",
    });
  }
};

export const artistArtworks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Vault Access Denied: Authentication credentials missing.",
      });
    }

    // Fetch all artworks of the logged-in artist
    const artworks: IArtwork[] = await Artwork.find({ artist: userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved masterpieces from your personal vault.",
      count: artworks.length,
      artworks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:
        "Internal Vault Protocol failure while retrieving identity records.",
    });
  }
};
