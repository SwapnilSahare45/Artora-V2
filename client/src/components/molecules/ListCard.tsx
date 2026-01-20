"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../atoms/Button";
import AuctionTimer from "../atoms/AuctionTimer";
import { IArtwork } from "@/types";

interface ListCardProps {
  artwork: IArtwork;
}

const ListCard = ({ artwork }: ListCardProps) => {
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
    <article className="group w-full hover:bg-surface border-b border-glass flex flex-col md:flex-row overflow-hidden transition-all duration-500">
      {/* Visual Preview */}
      <div className="relative w-full md:w-100 h-64 md:h-auto bg-surface-hover overflow-hidden shrink-0">
        <Image
          src={artwork.imageURL}
          alt={`${artwork.title} by ${artistName}`}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-brand font-jakarta text-[8px] font-bold px-3 py-1 uppercase tracking-widest shadow-neon">
            {artwork.status === "verified" ? "Verified" : "Pending"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="grow p-8 flex flex-col justify-between gap-4 min-w-0">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-jakarta text-[9px] font-bold uppercase tracking-[0.4em] text-brand">
              {artwork.status}
            </span>
            <div className="flex items-center gap-1">
              <span className="font-jakarta text-[10px] text-muted tracking-widest uppercase">
                {artwork.category}
              </span>
              <div className="h-3 w-px bg-glass mx-2" />
              <span className="font-jakarta text-[10px] text-muted tracking-widest uppercase">
                {artwork.medium}
              </span>
            </div>
          </div>

          {/* Auction Timer */}
          {isAuction && (
            <div className="bg-surface-hover border border-glass px-4 py-2">
              <div className="flex items-center gap-2 text-brand">
                <AuctionTimer targetDate={artwork.auctionId?.endDate} />
              </div>
            </div>
          )}
        </div>

        {/* Title, Description & Artist */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-luxury text-3xl italic group-hover:text-brand transition-colors">
              {artwork.title}
            </h3>
            <p className="font-jakarta text-xs text-muted leading-relaxed line-clamp-2">
              {artwork.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-dim pt-2">
              <span>{artwork.year}</span>
              <div className="h-4 w-px bg-glass mx-2" />
              <span>{artwork.dimensions}</span>
            </div>
          </div>

          {/* Artist Info */}
          <div className="flex items-center gap-3 lg:flex-col lg:items-end shrink-0">
            <p className="font-jakarta text-[9px] uppercase tracking-[0.2em] text-dim">
              Created By
            </p>
            <div className="flex items-center gap-2">
              {artistAvatar && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={artistAvatar}
                    alt={artistName}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <p className="font-luxury text-lg italic capitalize">
                {artistName}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-glass gap-4">
          <div className="md:px-6">
            <div className="space-y-1">
              <p className="font-jakarta text-[9px] uppercase tracking-[0.2em] text-brand font-bold">
                {isAuction ? "Opening Bid" : "Price"}
              </p>
              <p className="text-2xl font-bold tracking-tighter">
                {displayPrice}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Link
            href={`/artworks/${artwork._id}`}
            className="flex-1 sm:flex-none"
          >
            <Button
              title="Details"
              ariaLabel={`View ${artwork.title} details`}
              variant="outline"
              className="px-6 h-12 text-[10px] w-full sm:w-auto"
            />
          </Link>
        </div>

        {/* Artwork ID */}
        <p className="font-mono text-[7px] text-white/20 truncate uppercase tracking-widest">
          {artwork._id}
        </p>
      </div>
    </article>
  );
};

export default ListCard;
