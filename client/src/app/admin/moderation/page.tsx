"use client";

import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import Image from "next/image";
import { toast } from "sonner";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import { LuBox, LuEye, LuMaximize } from "react-icons/lu";
import { IArtwork } from "@/types";

const ModerationQueuePage = () => {
  const [artworks, setArtworks] = useState<IArtwork[]>([]);

  // Fetch pending artworks
  const fetchArtworks = async () => {
    try {
      const res = await fetch(
        "http://localhost:4500/api/admin/artworks/pending",
        {
          credentials: "include",
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to fetch queue");
      }

      setArtworks(result.artworks);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Fetch artworks when page loads
  useEffect(() => {
    fetchArtworks();
  }, []);

  // Verify Artwork
  const verifyArtwork = async (id: string) => {
    toast.promise(
      async () => {
        const res = await fetch(
          `http://localhost:4500/api/admin/artworks/${id}/verify`,
          { method: "PATCH", credentials: "include" },
        );

        const result = await res.json();
        if (!res.ok) throw new Error(result.error);

        // Refresh list after verification
        await fetchArtworks();
        return result;
      },
      {
        loading: "Verifying asset...",
        success: "Artwork verified",
        error: (err) => err.message,
      },
    );
  };

  // Reject artwork
  const rejectArtwork = async (id: string) => {
    toast.promise(
      async () => {
        const res = await fetch(
          `http://localhost:4500/api/admin/artworks/${id}/reject`,
          { method: "PATCH", credentials: "include" },
        );

        const result = await res.json();
        if (!res.ok) throw new Error(result.error);

        // Refresh list after rejection
        await fetchArtworks();
        return result;
      },
      {
        loading: "Rejecting asset...",
        success: "Artwork rejected",
        error: (err) => err.message,
      },
    );
  };

  // Helper to Normalize artist name
  const getArtistName = (artist: IArtwork["artist"]) => {
    if (typeof artist === "string") return artist;
    return `${artist.firstName} ${artist.lastName}`;
  };

  // Helper to calculate how long artwork is waiting in queue
  const getWaitTime = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  return (
    <main className="min-h-screen pt-18 lg:pt-0 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-glass pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Quality Control Protocol
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-luxury">
              Artwork <span className="italic text-brand">Moderation.</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <p className="font-inter text-[10px] uppercase font-bold">
              {artworks.length} Deposits Awaiting
            </p>
            <LuBox className="text-brand opacity-40" size={32} />
          </div>
        </section>

        {/* Queue */}
        <section className="space-y-4">
          {artworks.map((art) => (
            <article
              key={art._id}
              className="group flex flex-col xl:flex-row justify-between p-6 bg-surface border border-glass hover:border-brand/30 transition-all gap-8"
            >
              {/* Preview */}
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="relative w-full md:w-32 h-32 border border-glass overflow-hidden">
                  <Image
                    src={art.imageURL}
                    alt={art.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60">
                    <LuMaximize className="text-white" size={20} />
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[8px] uppercase text-white/30">
                    {art._id}
                  </p>
                  <h3 className="font-luxury text-3xl">{art.title}</h3>
                  <p className="font-jakarta text-[10px] text-brand font-bold uppercase">
                    {getArtistName(art.artist)}
                  </p>
                </div>
              </div>

              {/* Meta */}
              <dl className="grid grid-cols-2 md:grid-cols-4 items-center gap-8 lg:border-x border-glass px-8">
                <div>
                  <dt className="text-[8px] uppercase text-dim">Medium</dt>
                  <dd className="text-[10px] uppercase">{art.medium}</dd>
                </div>

                <div>
                  <dt className="text-[8px] uppercase text-dim">Dimensions</dt>
                  <dd className="text-[10px] uppercase">{art.dimensions}</dd>
                </div>

                <div>
                  <dt className="text-[8px] uppercase text-dim">Sale Type</dt>
                  <dd className="text-[10px] uppercase">
                    {art.salePath === "auction"
                      ? `Auction · ₹${art.openingBid}`
                      : `Direct · ₹${art.price}`}
                  </dd>
                </div>

                <div>
                  <dt className="text-[8px] uppercase text-dim">Wait Time</dt>
                  <dd className="flex items-center gap-2 text-amber-500 text-[10px] uppercase">
                    <FiAlertCircle size={12} />
                    {getWaitTime(art.createdAt.toString())}
                  </dd>
                </div>
              </dl>

              {/* Actions */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 items-center">
                <Button
                  title="Verify"
                  icon={<BiCheckCircle size={18} />}
                  onClick={() => verifyArtwork(art._id)}
                />
                <Button
                  title="Reject"
                  variant="outline"
                  icon={<BiXCircle size={18} />}
                  onClick={() => rejectArtwork(art._id)}
                />
              </div>
            </article>
          ))}
        </section>

        {/* Footer */}
        <footer className="pt-20 border-t border-glass text-center">
          <LuEye size={32} className="mx-auto text-brand opacity-40" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-dim mt-4">
            Verified assets are hashed and listed instantly
          </p>
        </footer>
      </div>
    </main>
  );
};

export default ModerationQueuePage;
