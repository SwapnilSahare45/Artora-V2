import { Document, model, Schema } from "mongoose";

export interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema: Schema<IOTP> = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 5 min
  },
});

export const OTP = model<IOTP>("OTP", otpSchema);
