"use client";

import Image from "next/image";
import { LuEye } from "react-icons/lu";

interface StudioCardProps {
  id: string;
  status: "pending" | "verified" | "sold" | "rejected";
  title: string;
  price: string;
  imageURL: string;
}

const StudioCard = ({
  status,
  title,
  price,
  id,
  imageURL,
}: StudioCardProps) => {
  const statusColors = {
    verified: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]",
    pending: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]",
    sold: "bg-brand shadow-neon",
    rejected: "bg-white/20",
  };

  return (
    <article className="group bg-surface border border-glass hover:border-white/10 transition-all duration-500">
      {/* Visual Container */}
      <div className="aspect-3/2 relative overflow-hidden bg-surface-hover">
        <Image
          src={imageURL}
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

        {/* Action Overlay - Only "View" remains */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <button
            type="button"
            className="px-6 py-3 bg-white text-black font-jakarta text-[10px] font-bold uppercase tracking-widest hover:bg-brand hover:text-white transition-all flex items-center gap-2"
          >
            <LuEye size={16} /> View Masterpiece
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="font-luxury text-xl capitalize group-hover:text-brand transition-colors">
            {title}
          </h3>
          <p className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
            Valuation: <span className="text-white">{price}</span>
          </p>
        </div>

        <div className="pt-4 border-t border-glass flex justify-between items-center">
          <p className="font-mono text-[7px] text-white/20 uppercase tracking-widest">
            REF: {id.slice(-8).toUpperCase()}
          </p>
          <p className="font-jakarta text-[8px] text-dim uppercase tracking-widest">
            Studio Archive
          </p>
        </div>
      </div>
    </article>
  );
};

export default StudioCard;
