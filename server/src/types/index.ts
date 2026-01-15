import { Request } from "express";
import mongoose from "mongoose";

// =============== User Types ===============
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  bio?: string;
  avatar?: string;
  role: "artist" | "collector" | "admin";
  googleId?: string;
  githubId?: string;
  provider: "local" | "google" | "github";
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// For API responses
export interface IUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  avatar?: string;
  role: "artist" | "collector" | "admin";
  provider: "local" | "google" | "github";
  createdAt: Date;
  updatedAt: Date;
}

// For registration
export interface IRegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "artist" | "collector";
}

// For Login
export interface ILoginInput {
  email: string;
  password: string;
}

// For profile update
export interface IUserUpdateInput {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string;
}

// Auth Request
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

// ==================== Artwork Type =========================
export const ART_CATEGORIES = [
  "Painting",
  "Sculpture",
  "Photography",
  "Digital Art",
  "Printmaking",
  "Mixed Media",
  "Installation",
  "Textile",
];

export const ART_MEDIUMS = [
  "Oil",
  "Acrylic",
  "Watercolor",
  "Marble",
  "Bronze",
  "Digital Paint",
  "Photography",
  "Ink",
  "Mixed Media",
  "Giclee",
];

export type ArtCategory = (typeof ART_CATEGORIES)[number];
export type ArtMedium = (typeof ART_MEDIUMS)[number];

export interface IArtwork {
  _id: string;
  artist:
    | mongoose.Types.ObjectId
    | string
    | {
        _id: string;
        firstName: string;
        lastName: string;
        avatar: string;
      };
  title: string;
  category: ArtCategory;
  medium: ArtMedium;
  year: string;
  dimensions: string;
  description: string;
  imageURL: string;
  salePath: "auction" | "direct";
  price?: number; // If salePath === "direct"
  openingBid?: number; // If salePath === "auction"
  reservePrice?: number; // If salePath === "auction"
  status: "pending" | "verified" | "sold" | "rejected";
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IArtworkInput {
  title: string;
  category: ArtCategory;
  medium: ArtMedium;
  year: string;
  dimensions: string;
  description: string;
  salePath: "auction" | "direct";
  price?: number;
  openingBid?: number;
  reservePrice?: number;
}

export interface IArtworkQueryParams {
  page?: string;
  limit?: string;
  category?: string;
  medium?: string;
  search?: string;
  sortBy?: string;
  order?: string;
  minPrice?: string;
  maxPrice?: string;
}
