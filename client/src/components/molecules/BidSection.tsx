"use client";

import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import AuctionTimer from "@/components/atoms/AuctionTimer";
import { socket } from "@/lib/socket";
import Link from "next/link";

interface BidSectionProps {
  artworkId: string;
  initialBid: number;
  salePath: string;
  price?: number;
  endDate?: Date;
}

const BidSection = ({
  artworkId,
  initialBid,
  salePath,
  price,
  endDate,
}: BidSectionProps) => {
  const [currentBid, setCurrentBid] = useState(initialBid);
  const [bidAmount, setBidAmount] = useState("");
  const [bidding, setBidding] = useState(false);
  const [error, setError] = useState("");

  const isAuction = salePath === "auction";
  const displayPrice = isAuction ? currentBid : price || 0;
  const minNextBid = isAuction ? Math.floor(displayPrice * 1.1) : displayPrice;

  // Setup socket connection for real-time updates
  useEffect(() => {
    if (!isAuction) return;

    // Connect socket
    if (!socket.connected) {
      socket.connect();
    }

    // Join auction room
    socket.emit("join-auction", artworkId);

    // Listen for bid updates
    socket.on(
      "bid-updated",
      (data: { artworkId: string; amount: number; bidder: string }) => {
        if (data.artworkId === artworkId) {
          setCurrentBid(data.amount);
        }
      },
    );

    // Cleanup
    return () => {
      socket.emit("leave-auction", artworkId);
      socket.off("bid-updated");
    };
  }, [artworkId, isAuction]);

  // Handle bid submission
  const handlePlaceBid = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bidAmount) return;

    const amount = parseFloat(bidAmount);

    if (amount < minNextBid) {
      setError(`Bid must be at least ₹${minNextBid.toLocaleString()}`);
      return;
    }

    setBidding(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auctions/bid`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            artworkId,
            amount,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to place bid");
        return;
      }

      // Clear input on success
      setBidAmount("");
    } catch (error) {
      console.error("Error placing bid:", error);
      setError("Failed to place bid. Please try again.");
    } finally {
      setBidding(false);
    }
  };

  return (
    <article className="p-8 md:p-12 bg-surface border border-glass space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-1">
          <p className="font-jakarta text-[10px] uppercase tracking-widest text-brand font-bold">
            {isAuction ? "Current Bid" : "Price"}
          </p>
          <p className="text-6xl font-bold tracking-tighter">
            ₹{displayPrice.toLocaleString("en-IN")}
          </p>
        </div>

        {isAuction && endDate && (
          <div className="w-full md:w-auto">
            <p className="font-jakarta text-[10px] uppercase tracking-widest text-dim mb-3">
              Ends In
            </p>
            <div className="bg-brand px-6 py-3 font-mono text-lg font-bold shadow-neon inline-block">
              <AuctionTimer targetDate={endDate} />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handlePlaceBid} className="space-y-4">
        {isAuction ? (
          <>
            <div className="relative group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-brand font-luxury text-2xl group-focus-within:scale-110 transition-transform">
                ₹
              </span>
              <input
                type="number"
                aria-label="Bid Amount"
                placeholder="Enter custom bid amount"
                min={minNextBid}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full bg-bg-primary border border-glass p-6 pl-12 font-jakarta outline-none focus:border-brand focus:bg-surface transition-all placeholder:text-white/30"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm font-jakarta">{error}</p>
            )}
            <Button
              title={bidding ? "Placing Bid..." : "Place Binding Bid"}
              type="submit"
              disabled={bidding}
              className="w-full h-16 text-[12px]! tracking-[0.3em]! shadow-neon"
            />
            <p className="text-center font-jakarta text-[9px] text-dim uppercase tracking-widest">
              Minimum Next Bid: ₹{minNextBid.toLocaleString("en-IN")}
            </p>
          </>
        ) : (
          <Link href={`/checkout/${artworkId}`}>
            <Button
              title="Purchase Now"
              type="submit"
              className="w-full h-16 text-[12px]! tracking-[0.3em]! shadow-neon"
            />
          </Link>
        )}
      </form>
    </article>
  );
};

export default BidSection;
