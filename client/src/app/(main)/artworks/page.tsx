import { Metadata } from "next";
import { Suspense } from "react";
import LayoutToggle from "@/components/atoms/LayoutToggle";
import ArtworkLayoutMode from "@/components/molecules/ArtworkLayoutMode";
import Filter from "@/components/molecules/Filter";
import Search from "@/components/molecules/Search";
import Pagination from "@/components/molecules/Pagination";

export const metadata: Metadata = {
  title: "The Collection | Artora Protocol",
  description:
    "Browse the permanent collection of elite independent artworks, filtered by movement, medium, and style.",
};

interface SearchParams {
  page?: string;
  category?: string;
  medium?: string;
  search?: string;
  priceRange?: string;
  sort?: string;
}

interface ArtworkData {
  artworks: any[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Loader show while artworks are loading
const GalleryLoader = () => (
  <div
    className="w-full h-96 flex flex-col items-center justify-center gap-4 opacity-20"
    aria-hidden="true"
  >
    <div className="w-12 h-12 border-t-2 border-brand rounded-full animate-spin" />
    <p className="font-jakarta text-[10px] uppercase tracking-[0.4em]">
      Synchronizing Vault...
    </p>
  </div>
);

// Function to fetch artworks from backend
async function getVerifiedArtworks(
  searchParams: SearchParams & { priceRange?: string; sort?: string }
): Promise<ArtworkData> {
  // Price filter handling
  let minPrice, maxPrice;
  if (searchParams.priceRange) {
    const [min, max] = searchParams.priceRange.split("-");
    minPrice = min;
    maxPrice = max;
  }

  // Sorting
  let sortBy = "createdAt";
  let order = "desc";
  if (searchParams.sort) {
    const [field, direction] = searchParams.sort.split("-");
    sortBy = field;
    order = direction;
  }

  // Build query string dynamically
  const params = new URLSearchParams({
    page: searchParams.page || "1",
    limit: "12",
    ...(searchParams.category && { category: searchParams.category }),
    ...(searchParams.medium && { medium: searchParams.medium }),
    ...(searchParams.search && { search: searchParams.search }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
    sortBy,
    order,
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/artworks/?${params}`,
      {
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch artworks");
      return {
        artworks: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalCount: 0,
          limit: 12,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return {
      artworks: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        limit: 12,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

// Component for rendering artwork list
async function ArtworkContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const data = await getVerifiedArtworks(searchParams);

  // If no artworks found
  if (data.artworks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="text-center space-y-3">
          <p className="font-jakarta text-dim text-sm uppercase tracking-widest">
            No Artworks Found
          </p>
          <p className="font-luxury text-2xl text-muted">
            The vault appears empty for this selection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Grid / List layout */}
      <ArtworkLayoutMode artworks={data.artworks} />
      {/* Pagination */}
      {data.pagination.totalPages > 1 && (
        <div className="mt-16">
          <Pagination
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
            hasNextPage={data.pagination.hasNextPage}
            hasPrevPage={data.pagination.hasPrevPage}
          />
        </div>
      )}
    </>
  );
}

interface ArtworksPageProps {
  searchParams: Promise<SearchParams>;
}

// Main page
const Artworks = async ({ searchParams }: ArtworksPageProps) => {
  const params = await searchParams;

  return (
    <main className="min-h-screen">
      {/* Page heading */}
      <section className="pt-12 pb-12 px-6 border-b border-glass">
        <div className="max-w-7xl mx-auto space-y-4">
          <header className="flex items-center gap-3">
            <span className="w-8 h-px bg-brand" aria-hidden="true" />
            <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
              Permanent Collection
            </p>
          </header>
          <h1 className="text-6xl md:text-8xl font-luxury leading-none tracking-tight">
            The <span className="italic">Collection.</span>
          </h1>
        </div>
      </section>

      {/* Filters section */}
      <section className="border-b border-glass px-6">
        <div className="max-w-7xl mx-auto py-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <Search />

          <nav
            className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end"
            aria-label="Collection Filters"
          >
            <Filter />
            <div
              className="h-4 w-px bg-glass hidden lg:block"
              aria-hidden="true"
            />
            <LayoutToggle />
          </nav>
        </div>
      </section>

      {/* Artworks list */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <Suspense fallback={<GalleryLoader />}>
          <ArtworkContent searchParams={params} />
        </Suspense>
      </section>
    </main>
  );
};

export default Artworks;
