"use client";

import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import AuctionTimer from "../atoms/AuctionTimer";
import { IArtwork } from "@/types";

interface GridCardProps {
  artwork: IArtwork;
}

const GridCard = ({ artwork }: GridCardProps) => {
  // Determine whether the artwork is listed as an auction or direct sale
  const isAuction = artwork.salePath === "auction";

  // Normalize price & bid based on sale type
  const displayPrice = isAuction
    ? `Bid: ₹${artwork.openingBid?.toLocaleString()}`
    : `₹${artwork.price?.toLocaleString()}`;

  // Normalize artist name
  const artistName =
    typeof artwork.artist === "object"
      ? `${artwork.artist.firstName} ${artwork.artist.lastName}`
      : "Unknown Artist";

  // Extract artist avatar only if artist data is populated
  const artistAvatar =
    typeof artwork.artist === "object" ? artwork.artist.avatar : null;

  return (
    <article className="group flex flex-col bg-[#0A0A0A] border border-glass hover:border-brand/40 transition-all duration-500 shadow-2xl overflow-hidden min-h-100">
      {/* Image Section */}
      <div className="aspect-3/2 relative overflow-hidden bg-surface">
        <Image
          src={artwork.imageURL}
          alt={`${artwork.title} by ${artistName}`}
          fill
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`font-jakarta text-[8px] font-bold px-3 py-1 uppercase tracking-widest shadow-neon ${
              isAuction
                ? "bg-brand"
                : artwork.status === "verified"
                ? "bg-green-600"
                : "bg-yellow-600"
            }`}
          >
            {isAuction ? "Live Auction" : "Available"}
          </span>
        </div>

        {/* Auction Timer (if auction) */}
        {isAuction && (
          <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-2 text-brand">
              <AuctionTimer
                targetDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        {/* Artist & Title */}
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            {artistAvatar && (
              <div className="relative w-5 h-5 rounded-full overflow-hidden">
                <Image
                  src={artistAvatar}
                  alt={artistName}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <p className="font-jakarta text-[8px] uppercase tracking-widest text-muted">
              {artistName}
            </p>
          </div>
          <h3 className="font-luxury text-2xl italic group-hover:text-brand transition-colors line-clamp-2">
            {artwork.title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-jakarta text-[7px] uppercase tracking-wider text-dim">
              {artwork.category}
            </span>
            <div className="h-3 w-px bg-glass mx-2" aria-hidden="true" />
            <span className="font-jakarta text-[7px] uppercase tracking-wider text-dim">
              {artwork.medium}
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-4 border-t border-glass flex items-end justify-between">
          <div className="space-y-1">
            <p className="font-jakarta text-[8px] uppercase tracking-widest text-brand">
              {isAuction ? "Opening Bid" : "Price"}
            </p>
            <p className="text-xl font-bold tracking-tighter">{displayPrice}</p>
          </div>
          <Link
            href={`/artworks/${artwork._id}`}
            aria-label={`View ${artwork.title} details`}
            className="h-11 w-11 border border-glass flex items-center justify-center hover:bg-brand hover:border-brand transition-all"
          >
            <LuArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>

        {/* Metadata */}
        <p className="font-mono text-[7px] text-dim truncate uppercase tracking-widest">
          ID: {artwork._id}
        </p>
      </div>
    </article>
  );
};

export default GridCard;
