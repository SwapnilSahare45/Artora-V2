"use client";
import { useAppSelector } from "@/store/hooks";
import GridCard from "./GridCard";
import ListCard from "./ListCard";

const ArtworkLayoutMode = () => {
  const viewMode = useAppSelector((state) => state.viewMode.mode);

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          : "flex flex-col gap-px bg-surface border border-glass"
      }
    >
      {[1, 2, 3, 4, 5, 6].map((idx) => (
        <div key={idx} className="relative group">
          {viewMode === "grid" ? (
            <>
              <GridCard />
              <span className="absolute -left-4 top-0 font-jakarta text-[9px] text-dim opacity-0 group-hover:opacity-100 transition-opacity">
                0{idx}
              </span>
            </>
          ) : (
            <ListCard />
          )}
        </div>
      ))}
    </div>
  );
};

export default ArtworkLayoutMode;
