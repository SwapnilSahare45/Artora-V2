"use client";

import AuctionTimer from "../atoms/AuctionTimer";
import Button from "../atoms/Button";

const AuctionCard = () => {
  return (
    <article className="space-y-16">
      <div className="space-y-6">
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-luxury leading-[0.85] tracking-tighter">
          The Winter <br />
          <span className="italic text-brand">Modernism</span>.
        </h1>
        <p className="max-w-md font-jakarta text-muted text-sm leading-relaxed tracking-wide">
          A curated sequence of 12 original masterpieces from the Barcelona
          Underground collective. Bidding is now active for registered
          collectors.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 items-center">
        <Button
          title="Join Auction"
          ariaLabel="Join the Winter Modernism live auction"
          className="h-16 px-12 text-[10px]! shadow-neon"
        />

        {/* Timer Container */}
        <div
          className="flex items-center gap-6 px-8 h-16 border border-white/10 bg-surface backdrop-blur-sm"
          aria-label="Auction ends in"
        >
          <p className="font-jakarta text-[9px] uppercase tracking-[0.3em] text-dim whitespace-nowrap">
            Ends In
          </p>
          <div className="min-w-30 font-mono font-bold text-xl tracking-widest">
            <AuctionTimer targetDate={new Date(Date.now() + 5000000)} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default AuctionCard;
