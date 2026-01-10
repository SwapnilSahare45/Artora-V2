"use client";

import useUpdateQuery from "@/hooks/useUpdateQuery";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";

const Search = () => {
  const { updateQuery, searchParams } = useUpdateQuery();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (query !== (searchParams.get("q") || "")) {
        updateQuery({ q: query });
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [query, updateQuery, searchParams]);

  return (
    <div className="relative w-full md:w-72 group">
      <LuSearch
        className={`absolute left-0 top-1/2 -translate-y-1/2 transition-colors ${
          query ? "text-brand" : "text-dim group-focus-within:text-brand"
        }`}
        size={18}
        aria-hidden="true"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search artist or title..."
        aria-label="Search the permanent collection"
        className="w-full bg-transparent border-b border-glass pl-8 pr-12 py-2 font-jakarta text-sm outline-none focus:border-brand transition-all duration-500 placeholder:text-text-dim/50"
      />

      {query && (
        <button
          onClick={() => setQuery("")}
          aria-label="Clear search input"
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-brand uppercase tracking-tighter hover:text-white transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
