"use client";

import { setViewMode } from "@/store/features/viewMode/viewModeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LuLayoutList } from "react-icons/lu";
import { TbLayoutGridFilled } from "react-icons/tb";

const LayoutToggle = () => {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector((state) => state.viewMode.mode);

  const containerStyle =
    "flex items-center bg-surface border border-glass p-[2px] rounded-none";

  const buttonBase =
    "flex h-11 w-11 items-center justify-center transition-all duration-500 ease-out cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand/50";

  return (
    <div
      className={containerStyle}
      role="group"
      aria-label="View mode selection"
    >
      <button
        type="button"
        className={`
          ${buttonBase}
          ${
            viewMode === "grid"
              ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              : "text-muted hover:text-white hover:bg-surface-hover"
          }
        `}
        onClick={() => dispatch(setViewMode("grid"))}
        aria-label="Switch to Grid View"
        aria-pressed={viewMode === "grid"}
      >
        <TbLayoutGridFilled size={18} aria-hidden="true" />
      </button>

      <div className="w-px h-6 bg-glass mx-px" aria-hidden="true" />

      <button
        type="button"
        className={`
          ${buttonBase}
          ${
            viewMode === "list"
              ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              : "text-muted hover:text-white hover:bg-surface-hover"
          }
        `}
        onClick={() => dispatch(setViewMode("list"))}
        aria-label="Switch to List View"
        aria-pressed={viewMode === "list"}
      >
        <LuLayoutList size={18} aria-hidden="true" />
      </button>
    </div>
  );
};

export default LayoutToggle;
