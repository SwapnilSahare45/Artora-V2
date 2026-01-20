import { Document, model, Schema } from "mongoose";
import { ART_CATEGORIES, ART_MEDIUMS, IArtwork } from "../types";

export interface IArtworkDocument extends IArtwork, Document {}

const artworkSchema: Schema<IArtworkDocument> = new Schema(
  {
    artist: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      enum: ART_CATEGORIES,
      required: true,
    },
    medium: {
      type: String,
      enum: ART_MEDIUMS,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    dimensions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    imageURL: {
      type: String,
      required: true,
    },
    salePath: {
      type: String,
      enum: ["auction", "direct"],
      required: true,
    },
    auctionId: {
      type: Schema.Types.ObjectId,
      ref: "Auction",
    },
    price: {
      type: Number,
      required: function () {
        return this.salePath === "direct";
      },
    },
    openingBid: {
      type: Number,
      required: function () {
        return this.salePath === "auction";
      },
    },
    reservePrice: {
      type: Number,
    },
    highestBidder: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "verified", "sold", "rejected"],
      default: "pending",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

artworkSchema.index({ status: 1, category: 1 });

export const Artwork = model<IArtworkDocument>("Artwork", artworkSchema);
