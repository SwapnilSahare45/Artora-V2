import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../types";
import bcrypt from "bcryptjs";

export interface IUserDocument extends IUser, Document {
  comparePassword(userPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: function (this: IUserDocument) {
        return this.provider === "local" && !this.googleId && !this.githubId;
      },
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    bio: {
      type: String,
      default: "",
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: {
        values: ["artist", "collector", "admin"],
        message: "Role must be either artist, collector, or admin",
      },
      default: "collector",
      index: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    provider: {
      type: String,
      enum: {
        values: ["local", "google", "github"],
        message: "Provider must be local, google, or github",
      },
      default: "local",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Compound indexes for common queries
userSchema.index({ role: 1, createdAt: -1 }); // Filter by role + sort by date
userSchema.index({ provider: 1, googleId: 1 }); // OAuth login
userSchema.index({ provider: 1, githubId: 1 }); // OAuth login

// Middleware
// Hash password before saving
userSchema.pre("save", async function (next) {
  // Only hash if password is modified or new
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Methods
// Compare password method
userSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  try {
    if (!this.password) return false;
    return await bcrypt.compare(userPassword, this.password);
  } catch (error) {
    return false;
  }
};

export const User = mongoose.model<IUserDocument>("User", userSchema);
