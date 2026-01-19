import { model, Schema } from "mongoose";

const bidSchema = new Schema(
  {
    artwork: {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
      required: true,
    },
    bidder: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Bid = model("Bid", bidSchema);
