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
    | string
    | {
        _id: string;
        firstName: string;
        lastName: string;
        avatar?: string;
        bio?: string;
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

// Search parameters
export interface ISearchParams {
  page?: string;
  category?: string;
  medium?: string;
  search?: string;
  sortBy?: string;
  order?: string;
}

export interface IArtworkData {
  artworks: IArtwork[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
