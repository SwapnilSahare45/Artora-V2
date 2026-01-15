"use client";

import useUpdateQuery from "@/hooks/useUpdateQuery";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";

const Search = () => {
  const { updateQuery, searchParams } = useUpdateQuery();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  // Debounced search effect
  useEffect(() => {
    const id = setTimeout(() => {
      updateQuery({ search: query || null, page: "1" });
    }, 500);

    return () => clearTimeout(id);
  }, [query]);

  return (
    <div className="relative w-72">
      <LuSearch className="absolute left-2 top-1/2 -translate-y-1/2" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search artwork or artist"
        className="w-full bg-transparent border-0 border-b border-white/20 pl-10 py-4 font-jakarta text-sm text-white outline-none focus:border-brand focus:shadow-none transition-all placeholder:text-white/30 hover:border-white/40"
      />
    </div>
  );
};

export default Search;
