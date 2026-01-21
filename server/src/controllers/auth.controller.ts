import { Request, Response } from "express";
import {
  AuthRequest,
  ILoginInput,
  IRegisterInput,
  IUserResponse,
} from "../types";
import { User } from "../models/user.model";
import { generateOTP } from "../utils/generateOTP";
import { OTP } from "../models/otp.model";
import { sendOTP } from "../utils/email";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, role }: IRegisterInput =
      req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        error: "All identity parameters are required to initialize membership.",
      });
    }

    const otp = generateOTP();

    let user = await User.findOne({ email });

    // Check if user already exists
    if (user) {
      // If user is already verified, return
      if (user.verified) {
        return res.status(400).json({
          success: false,
          error: "This identity is already archived in the Artora network.",
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
      message:
        "Identity initialized. Please authorize via the security key sent to your email.",
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
      error:
        "Membership initialization protocol failed. Please try again later.",
    });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: "Identity and security key are required for authorization.",
      });
    }

    // Check OTP is exists or not
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        error: "The provided security key is invalid or has expired.",
      });
    }

    // If otp validate then update the user to verified
    const user = await User.findOneAndUpdate(
      { email, verified: false },
      { $set: { verified: true } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Identity not found or already verified in the network.",
      });
    }

    // Delete OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // Send resposne
    return res.status(200).json({
      success: true,
      message: "Email verified. Welcome to the Artora ecosystem.",
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
      error: "Verification protocol failure. Integrity check failed.",
    });
  }
};

export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Identity email is required to dispatch a new security key.",
      });
    }

    // Check user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No matching identity found in our archives.",
      });
    }

    // Check is user verified
    if (user.verified) {
      return res.status(400).json({
        success: false,
        error: "Identity is already verified. No further action required.",
      });
    }

    // Check if there is a recent OTP
    const recentOTP = await OTP.findOne({ email });
    if (recentOTP) {
      const timeSinceLastOTP = Date.now() - recentOTP.createdAt.getTime();
      const COOLDOWN_SECONDS = 60; // 1 min

      if (timeSinceLastOTP < COOLDOWN_SECONDS * 1000) {
        const remainingTime = Math.ceil(
          (COOLDOWN_SECONDS * 1000 - timeSinceLastOTP) / 1000,
        );
        return res.status(429).json({
          success: false,
          error: `Security protocol in cooldown. Please wait ${remainingTime} seconds.`,
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
      message: "A new security key has been dispatched to your email.",
    });

    // Send email in background
    sendOTP(email, otp).catch((error) => {
      console.error("Email sending error:", error);
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Key dispatch protocol failure.",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: ILoginInput = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Access credentials are required.",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        error: "Invalid access credentials. Unauthorized entry detected.",
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        success: false,
        error: "Access denied. Please verify your identity first.",
      });
    }
    const token = generateToken(user._id.toString(), user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      domain: ".artora.qzz.io",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: `Vault accessed. Welcome back, ${user.firstName}.`,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Authentication protocol failure.",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      domain: ".artora.qzz.io",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Vault secured. Session terminated.",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Session termination protocol failure.",
    });
  }
};

export const authenticatedUser = (req: AuthRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    isAuthenticated: true,
    user: {
      userId: req.user?.userId,
      role: req.user?.role,
    },
  });
};

export const getLoggedInUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Access denied. No active session found in the Artora network.",
      });
    }

    const user: IUserResponse | null = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "Identity synchronization failure. Matching archival record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Identity synchronized successfully.",
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error:
        "Identity retrieval protocol failure. Internal synchronization error.",
    });
  }
};
