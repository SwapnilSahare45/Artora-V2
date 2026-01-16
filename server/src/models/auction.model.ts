import { Document, model, Schema } from "mongoose";
import { IAuction } from "../types";

export interface IAuctionDocument extends IAuction, Document {}

const AuctionSchema: Schema<IAuctionDocument> = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    artworkIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artwork",
        required: true,
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "scheduled", "live", "completed"],
      default: "draft",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Auction = model<IAuction>("Auction", AuctionSchema);
