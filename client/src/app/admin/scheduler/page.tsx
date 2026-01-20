"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import Button from "@/components/atoms/Button";
import {
  LuGavel,
  LuCalendar,
  LuPlus,
  LuLayers,
  LuSearch,
  LuTrash2,
} from "react-icons/lu";
import { BiLoader } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";

interface Artwork {
  _id: string;
  title: string;
  openingBid: number;
  artist?: { firstName: string; lastName: string };
}

interface Auction {
  id: string;
  title: string;
  date: string;
  status: "live" | "scheduled" | "completed";
  lots: number;
  valuation: string;
}

const AuctionSchedulerPage = () => {
  const [exhibitions, setExhibitions] = useState<Auction[]>([]);

  // Stores artworks available for auction
  const [pool, setPool] = useState<Artwork[]>([]);

  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSchedulerData = async () => {
      try {
        setLoading(true);

        // Fetch auctions and artwork pool in parallel
        const [exhRes, poolRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/auctions/scheduled`,
            { credentials: "include" },
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/artworks/curationPool`,
            { credentials: "include" },
          ),
        ]);

        const exhData = await exhRes.json();
        const poolData = await poolRes.json();

        if (exhData.success) setExhibitions(exhData.auctions);
        if (poolData.success) setPool(poolData.artworks);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedulerData();
  }, []);

  // Filter pool based on search
  const filteredPool = useMemo(() => {
    return pool.filter((art) =>
      art.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [pool, searchQuery]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-brand space-y-4 bg-black">
        <BiLoader className="animate-spin text-brand" size={40} />
        <p className="font-jakarta text-[10px] uppercase tracking-[0.4em]">
          Synchronizing Artora Timeline...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-18 lg:pt-0 pb-20 px-6 md:px-10 text-white bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-5xl font-luxury tracking-tight">
              Auction <span className="italic text-brand">Scheduler.</span>
            </h1>
          </div>
          <Link href="/admin/scheduler/create">
            <Button
              title="New Exhibition"
              icon={<LuPlus size={18} />}
              className="h-14 px-8 shadow-neon"
            />
          </Link>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* Main auction list */}
          <section className="order-2 md:order-1 xl:col-span-8 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="font-luxury text-xl italic">Active Timeline</h2>
              <span className="text-[10px] text-dim uppercase tracking-widest">
                {exhibitions.length} Total Auctions
              </span>
            </div>

            <div className="space-y-4">
              {exhibitions.length > 0 ? (
                exhibitions.map((exh) => (
                  <article
                    key={exh.id}
                    className="group relative flex flex-col md:flex-row items-center justify-between p-6 bg-surface border border-white/5 hover:border-brand/40 transition-all"
                  >
                    <div className="flex items-center gap-8 flex-1">
                      <div className="min-w-25">
                        <div className="flex items-center gap-2 text-brand mb-1">
                          <LuCalendar size={12} />
                          <time className="font-jakarta text-[11px] font-bold">
                            {format(new Date(exh.date), "MMM dd, yyyy")}
                          </time>
                        </div>
                        <span
                          className={`text-[9px] px-2 py-0.5 border uppercase ${
                            exh.status === "live"
                              ? "border-emerald-500 text-emerald-400"
                              : "border-brand/30 text-brand"
                          }`}
                        >
                          {exh.status}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-luxury capitalize text-2xl m-0">
                          {exh.title}
                        </h3>
                        <div className="flex items-center gap-4 text-[10px] text-dim uppercase mt-1">
                          <span>{exh.lots} Assets Listed</span>
                          <div className="h-4 w-px bg-glass" />
                          <span>Est. {exh.valuation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center gap-3 mt-4 md:mt-0">
                      <button
                        className="p-3 bg-white/5 hover:bg-brand/20 hover:text-brand transition-all rounded"
                        title="Edit Auction"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 transition-all rounded"
                        title="Delete"
                      >
                        <LuTrash2 size={16} />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="py-20 border border-dashed border-white/10 text-center text-dim font-luxury">
                  No Auctions Scheduled
                </div>
              )}
            </div>
          </section>

          {/* Curation Pool */}
          <aside className="order-1 md:order-2 xl:col-span-4 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <h2 className="font-jakarta text-[10px] uppercase tracking-[0.3em] text-brand font-bold">
                  Curation Pool
                </h2>
                <p className="text-[9px] text-dim uppercase">
                  {filteredPool.length} Available
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <LuSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-dim"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="SEARCH ARTWORKS..."
                  className="w-full bg-surface border border-white/10 py-3 pl-10 pr-4 text-[10px] font-jakarta focus:border-brand outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="p-1 bg-white/5 border border-white/10 max-h-125 overflow-y-auto">
              {filteredPool.map((art) => (
                <div
                  key={art._id}
                  className="flex items-center justify-between p-4 hover:bg-white/5 border-b border-white/5 last:border-0 group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <LuLayers
                      size={14}
                      className="text-dim group-hover:text-brand"
                    />
                    <div>
                      <h3 className="text-xs font-luxury truncate max-w-37.5">
                        {art.title}
                      </h3>
                      <p className="text-[8px] text-dim uppercase">
                        {art.artist?.firstName} {art.artist?.lastName}
                      </p>
                    </div>
                  </div>
                  <button className="text-brand hover:scale-110 transition-transform">
                    <LuPlus size={16} />
                  </button>
                </div>
              ))}
              {filteredPool.length === 0 && (
                <div className="p-8 text-center text-[10px] text-dim uppercase">
                  No matching artworks
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default AuctionSchedulerPage;
