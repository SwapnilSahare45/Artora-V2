"use client";

import { useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import useUpdateQuery from "@/hooks/useUpdateQuery";

interface FilterProps {
  label: string;
  options: string[];
  paramName: string;
}

const FilterDropdown = ({ label, options, paramName }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { updateQuery, searchParams } = useUpdateQuery();
  const selected = searchParams.get(paramName) || "";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (option: string) => {
    const value =
      option === "All" ? null : option.toLowerCase().replace(/ /g, "_");
    updateQuery({ [paramName]: value });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <span id={`${paramName}-label`} className="sr-only">
        Filter by {label}
      </span>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${paramName}-label`}
        title={`Filter by ${label}`}
        className="flex items-center gap-3 py-2 border-b border-glass hover:border-brand transition-all group focus:outline-none focus:border-brand"
      >
        <span
          className={`font-jakarta text-[10px] uppercase tracking-[0.2em] transition-all ${
            selected
              ? "text-white font-bold"
              : "text-muted group-hover:text-white"
          }`}
        >
          {selected ? selected.replace(/_/g, " ") : label}
        </span>
        <LuChevronDown
          size={12}
          aria-hidden="true"
          className={`text-brand transition-transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-labelledby={`${paramName}-label`}
          className="absolute top-full left-0 mt-2 w-56 bg-[#0a0a0a] border border-glass shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-100"
        >
          <div className="py-2 max-h-60 overflow-y-auto custom-scrollbar">
            <button
              role="option"
              aria-selected={!selected}
              onClick={() => handleSelect("All")}
              className="w-full text-left px-6 py-3 text-[9px] uppercase tracking-widest text-brand hover:bg-surface transition-all italic font-bold"
            >
              Reset {label}
            </button>
            {options.map((option) => {
              const formattedOption = option.toLowerCase().replace(/ /g, "_");
              const isActive = selected === formattedOption;

              return (
                <button
                  key={option}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-6 py-3 text-[10px] uppercase tracking-widest transition-all ${
                    isActive
                      ? "text-brand bg-brand/5 font-bold"
                      : "text-white/80 hover:bg-surface hover:text-brand"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
