"use client";

import { useAppSelector } from "@/store/hooks";
import GridCard from "./GridCard";
import ListCard from "./ListCard";

interface ArtworkLayoutModeProps {
  artworks: any[];
}

const ArtworkLayoutMode = ({ artworks }: ArtworkLayoutModeProps) => {
  const viewMode = useAppSelector((state) => state.viewMode.mode);

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          : "flex flex-col gap-px bg-surface border border-glass"
      }
    >
      {artworks.map((artwork, idx) => (
        <div key={artwork._id ?? idx} className="relative group">
          {viewMode === "grid" ? (
            <>
              <GridCard artwork={artwork} />
              <span className="absolute -left-4 top-0 font-jakarta text-[9px] text-dim opacity-0 group-hover:opacity-100">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </>
          ) : (
            <ListCard artwork={artwork} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ArtworkLayoutMode;
