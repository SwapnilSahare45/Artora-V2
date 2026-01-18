"use client";

import { useEffect, useState } from "react";
import { LuSearch, LuX, LuPlus, LuCheck, LuGavel } from "react-icons/lu";
import Image from "next/image";
import Button from "../atoms/Button";
import { BiLoader } from "react-icons/bi";

interface LotSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (artwork: any) => void;
  selectedIds: string[];
}

const LotSelectorModal = ({
  isOpen,
  onClose,
  onSelect,
  selectedIds,
}: LotSelectorModalProps) => {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      const fetchPool = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/artworks/inAuction`,
            {
              credentials: "include",
            }
          );
          const data = await res.json();
          if (data.success) setArtworks(data.artworks);
        } finally {
          setLoading(false);
        }
      };
      fetchPool();
    }
  }, [isOpen]);

  const filtered = artworks.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl bg-[#050505] border border-glass shadow-2xl flex flex-col max-h-[85vh]">
        <header className="p-8 border-b border-glass flex justify-between items-center">
          <h2 className="font-luxury text-3xl text-white">Curation Pool</h2>
          <button onClick={onClose} className="text-dim hover:text-white">
            <LuX size={24} />
          </button>
        </header>

        <div className="p-6 border-b border-glass bg-white/5">
          <div className="relative">
            <LuSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-dim"
              size={16}
            />
            <input
              type="text"
              placeholder="Filter pool..."
              className="w-full bg-surface border border-glass p-3 pl-12 font-jakarta text-xs text-white outline-none focus:border-brand transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
          {loading ? (
            <div className="h-60 flex items-center justify-center">
              <BiLoader className="animate-spin text-brand" size={32} />
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((item) => {
              const active = selectedIds.includes(item._id);
              return (
                <div
                  key={item._id}
                  onClick={() => onSelect(item)}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                    active
                      ? "bg-brand/5 border-brand/40 shadow-[inset_0_0_20px_rgba(var(--brand-rgb),0.05)]"
                      : "border-glass hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 border border-glass overflow-hidden">
                      <Image
                        src={item.imageURL}
                        alt=""
                        fill
                        className={`object-cover ${!active && "grayscale"}`}
                      />
                    </div>
                    <div>
                      <h4 className="font-luxury text-lg text-white">
                        {item.title}
                      </h4>
                      <p className="font-jakarta text-[9px] text-dim uppercase">
                        {item.artist?.firstName} {item.artist?.lastName}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`p-2 rounded-full border ${
                      active
                        ? "bg-brand border-brand text-white shadow-neon"
                        : "border-glass text-dim"
                    }`}
                  >
                    {active ? <LuCheck size={16} /> : <LuPlus size={16} />}
                  </div>
                </div>
              );
            })
          ) : (
            /* --- EMPTY STATE --- */
            <div className="h-80 flex flex-col items-center justify-center space-y-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full" />
                <LuGavel size={48} className="text-dim relative z-10" />
              </div>
              <div className="space-y-2 relative z-10">
                <p className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold">
                  Vault Empty
                </p>
                <p className="font-luxury text-xl text-muted">
                  No verified masterpieces <br />
                  available for orchestration.
                </p>
              </div>
            </div>
          )}
        </div>

        <footer className="p-8 border-t border-glass bg-surface flex justify-between items-center">
          <p className="font-jakarta text-[10px] uppercase text-dim tracking-widest">
            {selectedIds.length} Assets Staged
          </p>
          <Button
            title="Confirm Selection"
            className="px-10 shadow-neon"
            onClick={onClose}
          />
        </footer>
      </div>
    </div>
  );
};

export default LotSelectorModal;
