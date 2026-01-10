"use client";

import Button from "@/components/atoms/Button";
import ActiveBidCard from "@/components/molecules/ActiveBidCard";
import { LuGavel, LuWallet, LuTimer } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";

const ActiveBidsPage = () => {
  const bidStats = [
    {
      label: "Active Bids",
      value: "04",
      icon: <LuGavel size={14} aria-hidden="true" />,
    },
    {
      label: "Committed Capital",
      value: "₹8.2L",
      icon: <LuWallet size={14} aria-hidden="true" />,
    },
    {
      label: "Leading",
      value: "03",
      icon: <LuTimer size={14} aria-hidden="true" />,
    },
    {
      label: "Outbid Alerts",
      value: "01",
      icon: (
        <FiAlertTriangle
          size={14}
          className="text-red-500"
          aria-hidden="true"
        />
      ),
    },
  ];

  const activeBids = [
    {
      title: "Digital Renaissance",
      artist: "Swapnil Sahare",
      yourBid: "₹2,50,000",
      currentBid: "₹2,50,000",
      status: "Leading",
      timeLeft: 5000000,
    },
    {
      title: "The Looking Eye",
      artist: "Elena Vasquez",
      yourBid: "₹4,00,000",
      currentBid: "₹4,20,000",
      status: "Outbid",
      timeLeft: 1200000,
    },
  ] as const;

  return (
    <main className="min-h-screen pt-22 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-glass pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" aria-hidden="true" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Live Engagements
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-luxury leading-none tracking-tight">
              The <span className="italic text-muted">Pursuit.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <p className="hidden md:block font-jakarta text-[9px] uppercase tracking-widest text-dim max-w-37.5 text-right">
              All bids are legally binding under the Artora Protocol.
            </p>
            <div
              className="h-14 w-px bg-glass hidden md:block"
              aria-hidden="true"
            />
            <Button
              title="View History"
              ariaLabel="View your past auction history"
              variant="outline"
              className="h-14 px-10"
            />
          </div>
        </section>

        <section aria-label="Auction statistics overview">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-surface border border-glass m-0">
            {bidStats.map((stat, i) => (
              <div key={i} className="p-8 space-y-3">
                <div className="flex items-center gap-2 text-brand">
                  {stat.icon}
                  <dt className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                    {stat.label}
                  </dt>
                </div>
                <dd className="font-luxury text-3xl m-0">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Live Bids Feed */}
        <section className="space-y-8" aria-labelledby="active-lots-heading">
          <div className="flex items-center justify-between border-b border-glass pb-6">
            <h2
              id="active-lots-heading"
              className="font-luxury text-2xl italic"
            >
              Active Lots
            </h2>
            <div
              className="flex items-center gap-2"
              role="status"
              aria-live="polite"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"
                  aria-hidden="true"
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              <span className="font-jakarta text-[10px] uppercase tracking-widest text-brand font-bold">
                Live Stream Connected
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {activeBids.map((bid, idx) => (
              <ActiveBidCard key={idx} {...bid} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ActiveBidsPage;
