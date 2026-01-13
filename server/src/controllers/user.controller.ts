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

    if (req.file) {
      try {
        const fileDataUrl = bufferToDataUrl(req.file);
        const uploadResponse = await cloudinary.uploader.upload(fileDataUrl, {
          folder: "artora/avatars",
          public_id: `user-${req.user?.userId}`,
          overwrite: true,
          format: "webp",
          transformation: [
            { width: 500, height: 500, crop: "fill", gravity: "face" },
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

    const updatedData: IUserUpdateInput = { firstName, lastName, bio };
    if (avatarUrl) updatedData.avatar = avatarUrl;

    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { $set: updatedData },
      { new: true }
    );

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
