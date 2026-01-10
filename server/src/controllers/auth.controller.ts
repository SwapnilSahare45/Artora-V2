import { Request, Response } from "express";
import { IRegisterInput } from "../types";
import { User } from "../models/user.model";
import { generateOTP } from "../utils/generateOTP";
import { OTP } from "../models/otp.model";
import { sendOTP } from "../utils/email";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, role }: IRegisterInput =
      req.body;

    const otp = generateOTP();

    let user = await User.findOne({ email });

    // Check if user already exists
    if (user) {
      // If user is already verified, return
      if (user.verified) {
        return res.status(400).json({
          success: false,
          error: "Email already exists",
        });
      }

      // If user exists but not verified, update info
      user.firstName = firstName;
      user.lastName = lastName;
      user.password = password;
      user.role = role;
    } else {
      // Create new unverified user
      user = new User({
        firstName,
        lastName,
        email,
        password,
        role,
        provider: "local",
      });
    }

    // All database operations in parallel
    await Promise.all([user.save(), OTP.deleteMany({ email: user.email })]);

    // Create OTP and send Email
    const otpPromise = OTP.create({ email: user.email, otp });
    const emailPromise = sendOTP(user.email, otp);

    // Send response
    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
    });

    await Promise.all([otpPromise, emailPromise]).catch((error) => {
      console.error("Background task error:", error);
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || "Server error",
    });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: "Email and OTP are required",
      });
    }

    // Check OTP is exists or not
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired OTP",
      });
    }

    // If otp validate then update the user to verified
    const user = await User.findOneAndUpdate(
      { email, verified: false },
      { $set: { verified: true } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found or already verified",
      });
    }

    // Delete OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // Send resposne
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || "Server error",
    });
  }
};

export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      });
    }

    // Check user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Check is user verified
    if (user.verified) {
      return res.status(400).json({
        success: false,
        error: "Email is already verified",
      });
    }

    // Check if there is a recent OTP
    const recentOTP = await OTP.findOne({ email });
    if (recentOTP) {
      const timeSinceLastOTP = Date.now() - recentOTP.createdAt.getTime();
      const COOLDOWN_SECONDS = 60; // 1 min

      if (timeSinceLastOTP < COOLDOWN_SECONDS * 1000) {
        const remainingTime = Math.ceil(
          (COOLDOWN_SECONDS * 1000 - timeSinceLastOTP) / 1000
        );
        return res.status(429).json({
          success: false,
          error: `Please wait ${remainingTime} seconds before requesting a new OTP`,
        });
      }
    }

    const otp = generateOTP();

    // Delete old OTPs and create new one
    await OTP.deleteMany({ email });
    await OTP.create({ email, otp });

    // Send response
    res.status(200).json({
      success: true,
      message: "OTP has been resent to your email",
    });

    // Send email in background
    sendOTP(email, otp).catch((error) => {
      console.error("Email sending error:", error);
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || "Server error",
    });
  }
};
