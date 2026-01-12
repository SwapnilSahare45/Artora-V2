import { Response } from "express";
import { AuthRequest, IUserUpdateInput } from "../types";
import { bufferToDataUrl } from "../utils/bufferToDataUrl";
import cloudinary from "../utils/cloudinary";
import { User } from "../models/user.model";

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, bio }: IUserUpdateInput = req.body;
    let avatarUrl = "";

    if (req.file) {
      const fileDataUrl = bufferToDataUrl(req.file);
      const uploadResponse = await cloudinary.uploader.upload(fileDataUrl, {
        folder: "artora/avatars",
        public_id: `user-${req.user?.userId}`,
        overwrite: true,
        format: "webp",
      });
      avatarUrl = uploadResponse.secure_url;
    }

    const updatedData: IUserUpdateInput = { firstName, lastName, bio };
    if (avatarUrl) updatedData.avatar = avatarUrl;

    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || "Server error",
    });
  }
};
