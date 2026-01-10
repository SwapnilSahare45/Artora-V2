"use client";

import Image from "next/image";
import Button from "../atoms/Button";
import AuctionTimer from "../atoms/AuctionTimer";

const ListCard = () => {
  return (
    <article className="group w-full h-auto md:min-h-70 hover:bg-surface border-b border-glass flex flex-col md:flex-row overflow-hidden transition-all duration-500">
      {/* Visual Preview */}
      <div className="relative w-full md:w-100 h-64 md:h-auto bg-surface-hover overflow-hidden shrink-0">
        <Image
          src="/hero-2.webp"
          alt="Abstract Geometry Artwork"
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
        />
        <div
          className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"
          aria-hidden="true"
        />

        <div className="absolute top-4 left-4">
          <span className="bg-brand font-jakarta text-[8px] font-bold px-3 py-1 uppercase tracking-widest shadow-neon">
            Verified
          </span>
        </div>
      </div>

      <div className="grow p-8 flex flex-col justify-between gap-4 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="font-jakarta text-[9px] font-bold uppercase tracking-[0.4em] text-brand">
              Verified
            </span>
            <span className="font-jakarta text-[10px] text-muted tracking-widest uppercase">
              Generative Art
            </span>
          </div>
          <div
            className="bg-surface-hover border border-glass px-4 py-2"
            aria-label="Auction time remaining"
          >
            <div className="flex items-center gap-2 text-brand">
              <AuctionTimer
                targetDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-luxury text-3xl italic group-hover:text-brand transition-colors">
              Abstract Geometry
            </h3>
            <p className="font-jakarta text-xs text-muted leading-relaxed line-clamp-2">
              Mathematical precision meets artistic expression in this
              algorithmic masterpiece.
            </p>
          </div>
          <div className="hidden lg:block text-right shrink-0">
            <p className="font-jakarta text-[9px] uppercase tracking-[0.2em] text-dim mb-1">
              Created By
            </p>
            <p className="font-luxury text-lg italic">Swapnil Sahare</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-glass">
          <div className="flex justify-between md:px-6 items-baseline gap-12">
            <div className="space-y-1">
              <p className="font-jakarta text-[9px] uppercase tracking-[0.2em] text-brand font-bold">
                Current Bid
              </p>
              <p className="text-2xl font-bold tracking-tighter">₹3,000</p>
            </div>
            <div className="space-y-1">
              <p className="font-jakarta text-[9px] uppercase tracking-[0.2em] text-muted">
                Est. Value
              </p>
              <p className="text-sm font-jakarta text-dim italic">
                ₹4,000 — ₹5,000
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button
              title="Details"
              ariaLabel="View Abstract Geometry details"
              variant="outline"
              className="px-6! h-12! text-[10px]! w-full! sm:w-auto!"
            />
            <Button
              title="Place Bid"
              ariaLabel="Place bid on Abstract Geometry"
              className="px-10! h-12! text-[10px]! shadow-neon w-full! sm:w-auto!"
            />
          </div>
        </div>

        <p className="font-mono text-[7px] text-white/20 truncate uppercase tracking-widest">
          0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
        </p>
      </div>
    </article>
  );
};

export default ListCard;
