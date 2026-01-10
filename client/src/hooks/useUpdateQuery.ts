import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useUpdateQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "All") {
        params.delete(key);
      } else {
        const formattedValue = value.toLowerCase().replace(/ /g, "_");
        params.set(key, formattedValue);
      }
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { updateQuery, searchParams };
}
