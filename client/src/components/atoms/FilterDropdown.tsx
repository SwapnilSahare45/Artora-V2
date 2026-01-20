"use client";

import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuCheck } from "react-icons/lu";
import useUpdateQuery from "@/hooks/useUpdateQuery";

interface FilterProps {
  label: string;
  options: { value: string; label: string }[]; // Dropdown options
  paramName: string;
}

const FilterDropdown = ({ label, options, paramName }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Ref to detect clicks outside the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { updateQuery, searchParams } = useUpdateQuery();

  // Get currently selected value from URL
  const selected = searchParams.get(paramName) || "";

  // Close dropdown when click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Handle selection of a filter option
  const handleSelect = (value: string) => {
    // If "All" is selected remove filter & reset page
    if (value === "") {
      updateQuery({ [paramName]: null, page: null });
    } else {
      // Apply filter and reset pagination to page 1
      updateQuery({ [paramName]: value, page: "1" });
    }

    // Close dropdown after selection
    setIsOpen(false);
  };

  // Get label to show in dropdown button
  const getCurrentLabel = () => {
    if (!selected) return label;
    const option = options.find((opt) => opt.value === selected);
    return option?.label || label;
  };

  return (
    // Wrapper with ref for outside click detection
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title={`Filter by ${label}`}
        className="flex items-center gap-3 py-2 border-b border-glass hover:border-brand transition-all group focus:outline-none focus:border-brand"
      >
        {/* Selected filter label */}
        <span
          className={`font-jakarta text-[10px] uppercase tracking-[0.2em] transition-all ${
            selected
              ? "text-white font-bold"
              : "text-muted group-hover:text-white"
          }`}
        >
          {getCurrentLabel()}
        </span>
        <LuChevronDown
          size={12}
          className={`text-brand transition-transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full left-0 mt-2 w-56 bg-[#0a0a0a] border border-glass shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50"
        >
          <div className="py-2 max-h-60 overflow-y-auto custom-scrollbar">
            {/* Reset/All option */}
            <button
              role="option"
              onClick={() => handleSelect("")}
              className="w-full text-left px-6 py-3 text-[9px] uppercase tracking-widest text-brand hover:bg-surface transition-all italic font-bold flex items-center justify-between"
            >
              All {label}
              {!selected && <LuCheck size={14} className="text-brand" />}
            </button>

            {/* Filter options list */}
            {options.map((option) => {
              const isActive = selected === option.value;

              return (
                <button
                  key={option.value}
                  role="option"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-6 py-3 text-[10px] uppercase tracking-widest transition-all flex items-center justify-between ${
                    isActive
                      ? "text-brand bg-brand/5 font-bold"
                      : "text-white/80 hover:bg-surface hover:text-brand"
                  }`}
                >
                  {option.label}
                  {isActive && <LuCheck size={14} className="text-brand" />}
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
