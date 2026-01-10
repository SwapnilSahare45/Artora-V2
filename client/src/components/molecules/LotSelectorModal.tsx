"use client";

import { LuSearch, LuX, LuPlus, LuCheck, LuFilter } from "react-icons/lu";
import Image from "next/image";
import Button from "../atoms/Button";

interface LotSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (artworkId: string) => void;
  selectedIds: string[];
}

const LotSelectorModal = ({
  isOpen,
  onClose,
  onSelect,
  selectedIds,
}: LotSelectorModalProps) => {
  if (!isOpen) return null;

  const verifiedPool = [
    {
      id: "ASSET-902",
      title: "Chromatic Echo",
      artist: "Elena Vasquez",
      val: "₹1.8L",
      thumb: "/hero-1.webp",
    },
    {
      id: "ASSET-899",
      title: "Neon Chiaroscuro",
      artist: "Swapnil Sahare",
      val: "₹3.1L",
      thumb: "/hero-2.webp",
    },
    {
      id: "ASSET-895",
      title: "The Silent Grid",
      artist: "Julian K.",
      val: "₹2.4L",
      thumb: "/abstract.webp",
    },
    {
      id: "ASSET-890",
      title: "Sovereign Flow",
      artist: "Swapnil Sahare",
      val: "₹4.5L",
      thumb: "/traditional.webp",
    },
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-bg-primary border border-glass shadow-2xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <header className="p-8 border-b border-glass flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="font-luxury text-3xl">Curation Pool</h2>
            <p className="font-jakarta text-[10px] uppercase tracking-widest text-text-dim">
              Select verified masterpieces for this exhibition sequence
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-dim hover:text-white transition-colors"
          >
            <LuX size={24} />
          </button>
        </header>

        {/* Filters & Search */}
        <div className="p-6 border-b border-glass bg-surface flex flex-col md:flex-row gap-6 justify-between">
          <div className="relative flex-1">
            <LuSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by artist or title..."
              className="w-full bg-surface-hover border border-glass p-3 pl-12 font-jakarta text-xs outline-none focus:border-brand/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-dim hover:text-white text-[10px] uppercase tracking-widest">
              <LuFilter size={14} /> All Mediums
            </button>
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2 custom-scrollbar">
          {verifiedPool.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`flex items-center justify-between p-4 border transition-all cursor-pointer group ${
                  isSelected
                    ? "bg-brand/5 border-brand/40"
                    : "bg-transparent border-glass hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className="relative w-14 h-14 bg-neutral-900 overflow-hidden border border-white/10">
                    <Image
                      src={item.thumb}
                      alt={item.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-luxury text-lg">{item.title}</h4>
                    <p className="font-jakarta text-[9px] text-dim uppercase tracking-widest">
                      {item.artist}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                  <div className="text-right hidden md:block">
                    <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                      Valuation
                    </p>
                    <p className="font-jakarta text-sm font-bold">{item.val}</p>
                  </div>
                  <div
                    className={`p-2 rounded-full border transition-all ${
                      isSelected
                        ? "bg-brand border-brand text-white shadow-neon"
                        : "border-glass text-dim"
                    }`}
                  >
                    {isSelected ? <LuCheck size={16} /> : <LuPlus size={16} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <footer className="p-8 border-t border-glass flex justify-between items-center bg-surface">
          <p className="font-jakarta text-[10px] uppercase tracking-widest text-dim">
            {selectedIds.length} Assets Selected for Sequencing
          </p>
          <div className="flex gap-4">
            <Button title="Cancel" variant="ghost" onClick={onClose} />
            <Button
              title="Confirm Selection"
              className="px-8 shadow-neon"
              onClick={onClose}
            />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LotSelectorModal;
