"use client";

import Image from "next/image";
import Button from "../atoms/Button";
import AuctionTimer from "../atoms/AuctionTimer";
import { LuTrendingUp, LuHistory } from "react-icons/lu";
import { FiAlertCircle } from "react-icons/fi";

interface ActiveBidProps {
  title: string;
  artist: string;
  yourBid: string;
  currentBid: string;
  status: "Leading" | "Outbid";
  timeLeft: number;
}

const ActiveBidCard = ({
  title,
  artist,
  yourBid,
  currentBid,
  status,
  timeLeft,
}: ActiveBidProps) => {
  const isOutbid = status === "Outbid";

  return (
    <article
      role="region"
      aria-label={`Bid status for ${title}`}
      className={`group flex flex-col lg:flex-row bg-surface border transition-all duration-500 ${
        isOutbid
          ? "border-red-500/30 bg-red-500/2"
          : "border-glass hover:border-brand/30"
      }`}
    >
      {/* Visual Section */}
      <div className="relative w-full lg:w-72 h-48 lg:h-auto overflow-hidden shrink-0 bg-glass">
        <Image
          src="/hero-1.webp"
          alt=""
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
        />
        {isOutbid && (
          <div
            className="absolute inset-0 bg-red-900/20 backdrop-blur-[2px] flex items-center justify-center"
            aria-hidden="true"
          >
            <FiAlertCircle className="text-red-500 animate-pulse" size={32} />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-8 flex flex-col md:flex-row justify-between gap-10">
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
              {artist}
            </p>
            <h3 className="font-luxury text-3xl">{title}</h3>
          </div>

          <div className="flex items-center gap-8">
            <div className="space-y-1">
              <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                Ends In
              </p>
              <div
                className="font-jakarta text-brand font-bold text-sm"
                aria-live="polite"
              >
                <AuctionTimer targetDate={new Date(Date.now() + timeLeft)} />
              </div>
            </div>
            <div className="h-8 w-px bg-glass" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                Lot ID
              </p>
              <p className="font-mono text-[10px] text-dim">#ART-2026-042</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <dl className="flex gap-12 m-0">
            <div className="space-y-1">
              <dt className="font-jakarta text-[8px] uppercase tracking-widest text-muted">
                Your Bid
              </dt>
              <dd className="font-luxury text-2xl m-0">{yourBid}</dd>
            </div>
            <div className="space-y-1">
              <dt
                className={`font-jakarta text-[8px] uppercase tracking-widest ${
                  isOutbid ? "text-red-400 font-bold" : "text-emerald-500"
                }`}
              >
                {isOutbid ? "Highest Bid" : "Status"}
              </dt>
              <dd
                className={`font-luxury text-2xl m-0 flex items-center gap-2 ${
                  isOutbid ? "text-white" : "text-brand"
                }`}
              >
                {isOutbid ? (
                  currentBid
                ) : (
                  <span className="text-emerald-500 flex items-center gap-2">
                    <LuTrendingUp size={16} aria-hidden="true" /> Leading
                  </span>
                )}
              </dd>
            </div>
          </dl>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button
              title={isOutbid ? "Increase Bid" : "Manage Bid"}
              ariaLabel={
                isOutbid
                  ? `Increase your bid for ${title}`
                  : `Manage your bid for ${title}`
              }
              className={`h-14 px-8 ${
                isOutbid
                  ? "bg-white text-black shadow-neon"
                  : "bg-transparent border border-brand/40 text-brand hover:bg-brand hover:text-white"
              }`}
            />
            <button
              type="button"
              aria-label={`View bid history for ${title}`}
              className="flex items-center justify-center gap-2 font-jakarta text-[8px] uppercase tracking-[0.2em] text-dim hover:text-white transition-colors min-h-8"
            >
              <LuHistory size={12} aria-hidden="true" /> View Bid History
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ActiveBidCard;
