import { Response } from "express";
import { AuthRequest, IUserUpdateInput } from "../types";
import { bufferToDataUrl } from "../utils/bufferToDataUrl";
import cloudinary from "../utils/cloudinary";
import { User } from "../models/user.model";

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Vault Access Denied: Authentication credentials missing.",
      });
    }

    const { firstName, lastName, bio }: IUserUpdateInput = req.body;
    let avatarUrl = "";

    // If user uploaded a new avatar
    if (req.file) {
      try {
        // Convert image to buffer to data URL
        const fileDataUrl = bufferToDataUrl(req.file);
        const uploadResponse = await cloudinary.uploader.upload(fileDataUrl, {
          folder: "artora/avatars",
          public_id: `user-${userId}`, // Replace old avatar
          overwrite: true,
          format: "webp",
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: "auto:eco" },
            { fetch_format: "auto" },
            { flags: "lossy" },
          ],
        });
        avatarUrl = uploadResponse.secure_url;
      } catch (uploadErr) {
        return res.status(500).json({
          success: false,
          error: "Failed to archive digital avatar. Asset transmission failed.",
        });
      }
    }

    // Create object with updated profile data
    const updatedData: IUserUpdateInput = { firstName, lastName, bio };
    // Add avatar URL if image was uploaded
    if (avatarUrl) updatedData.avatar = avatarUrl;

    // Update user info in database
    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { $set: updatedData },
      { new: true }
    );

    // If user not found in database
    if (!user) {
      return res.status(404).json({
        success: false,
        error:
          "Identity Protocol Error: User profile not found in the Artora Vault.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Identity credentials successfully updated within the Artora Vault.",
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: "Internal Vault Protocol failure. Please try again later.",
    });
  }
};
