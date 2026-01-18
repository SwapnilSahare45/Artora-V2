import { Response } from "express";
import { AuthRequest } from "../types";
import { Order } from "../models/order.model";
import { Artwork } from "../models/artwork.model";

export const getBuyerOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        error: "Vault Access Denied: Authentication credentials missing.",
      });
    }

    // Find all orders where logged-in user is the buyer
    const orders = await Order.find({ buyer: req.user.userId })
      .populate({
        path: "artwork",
        select: "title imageURL artist",
        populate: {
          path: "artist",
          select: "firstName lastName",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Acquisition archive retrieved successfully from the Vault.",
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:
        "Internal Vault Protocol failure while retrieving acquisition records.",
    });
  }
};

export const getArtistOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        error: "Vault Access Denied: Authentication credentials missing.",
      });
    }

    // Find all orders where logged-in user is the artist
    const orders = await Order.find({ artist: req.user.userId })
      .populate({
        path: "artwork",
        select: "title imageURL category medium price",
      })
      .populate({
        path: "buyer",
        select: "firstName lastName email",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Sales archive retrieved successfully from the Vault.",
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Vault Protocol failure while retrieving sales records.",
    });
  }
};

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        error: "Vault Access Denied: Authentication credentials missing.",
      });
    }

    const { artworkId, name, phone, address, city, postal, paymentMethod } =
      req.body;

    if (!artworkId || !name || !phone || !address || !city || !postal) {
      return res.status(400).json({
        success: false,
        error:
          "Acquisition Protocol Error: All shipping coordinates are required.",
      });
    }

    // Allow only cash on delivery
    if (paymentMethod !== "cod") {
      return res.status(400).json({
        success: false,
        error:
          "Payment Protocol Error: Currently only Cash on Delivery is supported.",
      });
    }

    // Fetch artwork to get price and validate existence
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({
        success: false,
        error: "Asset Protocol Error: Masterpiece not found in the Vault.",
      });
    }

    // Check if artwork is verified
    if (artwork.status !== "verified") {
      return res.status(400).json({
        success: false,
        error:
          "Acquisition Protocol Error: This masterpiece is not yet available for acquisition.",
      });
    }

    // Determine final amount based on sale type
    const amount =
      artwork.salePath === "auction"
        ? artwork.openingBid || 0
        : artwork.price || 0;

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        error:
          "Valuation Protocol Error: Invalid masterpiece pricing detected.",
      });
    }

    // Create order
    const order = await Order.create({
      buyer: req.user.userId,
      artist: artwork.artist,
      artwork: artworkId,
      saleType: artwork.salePath,
      amount,
      shipping: {
        name,
        phone,
        address,
        city,
        postal,
      },
      paymentMethod: "cod",
      paymentStatus: "pending",
      orderStatus: "created",
    });

    // Mark artwork as sold
    artwork.status = "sold";
    await artwork.save();

    return res.status(201).json({
      success: true,
      message: "Acquisition successfully secured within the Artora Protocol.",
      orderId: order._id,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Vault Protocol failure during acquisition processing.",
    });
  }
};
