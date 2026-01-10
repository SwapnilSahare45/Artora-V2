"use client";

import Image from "next/image";
import { CgMoreVertical } from "react-icons/cg";
import { FiBarChart2, FiEdit3 } from "react-icons/fi";
import { LuEye } from "react-icons/lu";

interface StudioCardProps {
  status: "Live" | "Pending" | "Sold" | "Private";
  title: string;
  price: string;
}

const StudioCard = ({ status, title, price }: StudioCardProps) => {
  const statusColors = {
    Live: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]",
    Pending: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]",
    Sold: "bg-brand shadow-neon",
    Private: "bg-white/20",
  };

  return (
    <article className="group bg-surface border border-glass hover:border-white/10 transition-all duration-500">
      {/* Visual Container */}
      <div className="aspect-3/2 relative overflow-hidden bg-surface-hover">
        <Image
          src="/hero-2.webp"
          alt={`Preview of ${title}`}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
        />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-glass">
          <span
            className={`w-1.5 h-1.5 rounded-full ${statusColors[status]}`}
            aria-hidden="true"
          />
          <span className="font-jakarta text-[8px] font-bold uppercase tracking-widest">
            {status}
          </span>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label={`View public page for ${title}`}
            className="w-11 h-11 flex items-center justify-center bg-white text-black hover:bg-brand hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <LuEye size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Edit details for ${title}`}
            className="w-11 h-11 flex items-center justify-center bg-white text-black hover:bg-brand hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <FiEdit3 size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`View analytics for ${title}`}
            className="w-11 h-11 flex items-center justify-center bg-white text-black hover:bg-brand hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <FiBarChart2 size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-luxury text-xl group-hover:text-brand transition-colors">
              {title}
            </h3>
            <p className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
              Valuation: <span className="text-white">{price}</span>
            </p>
          </div>
          <button
            type="button"
            aria-label="More options"
            className="text-dim hover:text-white transition-colors p-1"
          >
            <CgMoreVertical size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Footer info: Id & Date */}
        <div className="pt-4 border-t border-glass flex justify-between items-center">
          <p className="font-mono text-[7px] text-white/20 uppercase tracking-widest">
            ID: ART-90234-X
          </p>
          <p className="font-jakarta text-[8px] text-dim uppercase tracking-widest">
            Added Dec 2025
          </p>
        </div>
      </div>
    </article>
  );
};

export default StudioCard;
