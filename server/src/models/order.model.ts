import { Document, model, Schema } from "mongoose";
import { IOrder } from "../types";

export interface IOrderDocument extends IOrder, Document {}

const orderSchema: Schema<IOrderDocument> = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    artwork: {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
      required: true,
    },
    saleType: {
      type: String,
      enum: ["direct", "auction"],
      required: true,
    },
    auction: {
      type: Schema.Types.ObjectId,
      ref: "Auction",
      required: function () {
        return this.saleType === "auction";
      },
    },
    amount: {
      type: Number,
      required: true,
    },
    shipping: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postal: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "upi", "card", "wallet"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["created", "confirmed", "shipped", "delivered", "cancelled"],
      default: "created",
    },
  },
  { timestamps: true }
);

orderSchema.index({ buyer: 1 });
orderSchema.index({ artwork: 1 });
orderSchema.index({ artist: 1 });
orderSchema.index({ saleType: 1 });

export const Order = model<IOrderDocument>("Order", orderSchema);
