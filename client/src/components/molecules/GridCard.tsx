"use client";

import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import AuctionTimer from "../atoms/AuctionTimer";

const GridCard = () => {
  return (
    <article className="group flex flex-col bg-[#0A0A0A] border border-glass hover:border-brand/40 transition-all duration-500 shadow-2xl overflow-hidden min-h-100">
      <div className="aspect-3/2 relative overflow-hidden bg-surface">
        <Image
          src="/hero-2.webp"
          alt="Digital Renaissance Artwork"
          fill
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand font-jakarta text-[8px] font-bold px-3 py-1 uppercase tracking-widest shadow-neon">
            Live Auction
          </span>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-2 text-brand">
            <AuctionTimer targetDate={new Date(Date.now() + 10 * 60 * 1000)} />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <p className="font-jakarta text-[8px] uppercase tracking-widest text-muted">
            Artist: Swapnil Sahare
          </p>
          <h3 className="font-luxury text-2xl italic group-hover:text-brand transition-colors">
            Digital Renaissance
          </h3>
        </div>

        <div className="pt-4 border-t border-glass flex items-end justify-between">
          <div className="space-y-1">
            <p className="font-jakarta text-[8px] uppercase tracking-widest text-muted">
              Valuation
            </p>
            <p className="font-luxury text-xl">₹2,500</p>
          </div>
          <Link
            href={`/artworks/1`}
            aria-label="View Digital Renaissance details"
            className="h-11 w-11 border border-glass flex items-center justify-center hover:bg-brand hover:border-brand transition-all"
          >
            <LuArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <p className="font-mono text-[7px] text-dim truncate uppercase tracking-widest">
          0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
        </p>
      </div>
    </article>
  );
};

export default GridCard;
