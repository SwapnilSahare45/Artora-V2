"use client";

import Image from "next/image";
import {
  LuShieldCheck,
  LuExternalLink,
  LuFileText,
  LuHistory,
} from "react-icons/lu";

interface VaultCardProps {
  title: string;
  artist: string;
  price: string;
  date: string;
}

const VaultCard = ({ title, artist, price, date }: VaultCardProps) => {
  return (
    <article
      className="group bg-surface border border-glass hover:border-brand/30 transition-all duration-700"
      aria-labelledby={`vault-title-${title
        .replace(/\s+/g, "-")
        .toLowerCase()}`}
    >
      {/* Visual Container */}
      <div className="aspect-square relative overflow-hidden bg-surface-hover">
        <Image
          src="/hero-2.webp"
          alt={`Masterpiece: ${title} by ${artist}`}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
        />

        <div
          className="absolute top-4 right-4 p-2 bg-brand text-white shadow-neon"
          title="Authenticated Provenance"
        >
          <LuShieldCheck size={16} aria-hidden="true" />
        </div>

        {/* Vault Actions */}
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-6">
          <p className="font-jakarta text-[10px] uppercase tracking-[0.3em] text-brand font-bold">
            Secure Asset
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              aria-label={`View high-resolution version of ${title}`}
              className="w-12 h-12 flex items-center justify-center bg-white text-black hover:bg-brand hover:text-white transition-all focus:ring-2 focus:ring-brand"
            >
              <LuExternalLink size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`Download digital certificate for ${title}`}
              className="w-12 h-12 flex items-center justify-center bg-white text-black hover:bg-brand hover:text-white transition-all focus:ring-2 focus:ring-brand"
            >
              <LuFileText size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        <div className="space-y-1">
          <p className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
            {artist}
          </p>
          <h3
            id={`vault-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
            className="font-luxury text-2xl italic group-hover:text-brand transition-colors"
          >
            {title}
          </h3>
        </div>

        <dl className="grid grid-cols-2 gap-6 pt-6 border-t border-glass">
          <div className="space-y-1">
            <dt className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
              Acquired Value
            </dt>
            <dd className="font-luxury text-lg m-0">{price}</dd>
          </div>
          <div className="space-y-1 text-right">
            <dt className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
              Date
            </dt>
            <dd className="font-jakarta text-xs text-muted uppercase tracking-widest m-0">
              {date}
            </dd>
          </div>
        </dl>

        <div className="pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"
              aria-hidden="true"
            />
            <p className="font-mono text-[7px] text-white/30 uppercase tracking-[0.2em]">
              0x71C...49f2
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default VaultCard;
