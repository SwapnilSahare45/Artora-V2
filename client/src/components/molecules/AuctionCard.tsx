"use client";

import AuctionTimer from "../atoms/AuctionTimer";
import Button from "../atoms/Button";

type AuctionCardProps = {
  auction: {
    _id: string;
    title: string;
    description: string;
    endDate: string | Date;
  };
  children?: React.ReactNode;
};

const AuctionCard = ({ auction, children }: AuctionCardProps) => {
  return (
    <article className="space-y-16">
      <div className="space-y-6">
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-luxury leading-[0.85] tracking-tighter">
          {auction.title.split(" ").slice(0, 1).join(" ")} <br />
          <span className="italic text-brand">
            {auction.title.split(" ").slice(1).join(" ")}.
          </span>
        </h1>

        <p className="max-w-md font-jakarta text-muted text-sm leading-relaxed tracking-wide">
          {auction.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-6 items-center">
        {children ?? (
          <Button
            title="Join Auction"
            ariaLabel={`Join ${auction.title} live auction`}
            className="h-16 px-12 text-[10px]! shadow-neon"
          />
        )}

        {/* Timer Container */}
        <div className="flex items-center gap-6 px-8 h-16 border border-white/10 bg-surface backdrop-blur-sm">
          <p className="font-jakarta text-[9px] uppercase tracking-[0.3em] text-dim whitespace-nowrap">
            Ends In
          </p>
          <div className="min-w-30 font-mono font-bold text-xl tracking-widest">
            <AuctionTimer targetDate={new Date(auction.endDate)} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default AuctionCard;
