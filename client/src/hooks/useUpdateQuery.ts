"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useUpdateQuery() {
  const router = useRouter();

  // Current route pathname (without query params)
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const updateQuery = (updates: Record<string, string | null>) => {
    // Clone existing query params
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      // Remove params is value is null, empty or "All"
      if (value === null || value === "" || value === "All") {
        params.delete(key);
      } else {
        // Set query param
        params.set(key, value);
      }
    });

    // Push updated URL without scrolling the page
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { updateQuery, searchParams };
}
