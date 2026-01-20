import LayoutToggle from "@/components/atoms/LayoutToggle";
import ArtworkLayoutMode from "@/components/molecules/ArtworkLayoutMode";

async function getFeaturedArtworks() {
  try {
    // API call
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/artworks/featured`,
      {
        cache: "no-store",
        next: { revalidate: 0 },
      },
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.artworks || [];
  } catch (error) {
    console.error("Error fetching featured artworks:", error);
    return [];
  }
}

const FeaturedArtworks = async () => {
  const artworks = await getFeaturedArtworks();

  return (
    <section className="max-w-7xl mx-auto md:py-24 px-6 flex flex-col">
      <header className="w-full flex flex-row items-end justify-between mb-12 gap-8 border-b border-glass pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-brand" />
            <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
              Top Curation
            </p>
          </div>
          <h2
            id="trending-heading"
            className="text-5xl md:text-6xl font-luxury leading-none tracking-tight"
          >
            Featured <span className="italic text-muted">Artworks</span>
          </h2>
        </div>

        <LayoutToggle />
      </header>

      {artworks.length > 0 ? (
        <ArtworkLayoutMode artworks={artworks} />
      ) : (
        <div className="h-96 flex items-center justify-center">
          <p className="text-muted font-jakarta text-sm uppercase tracking-widest">
            No featured artworks available
          </p>
        </div>
      )}
    </section>
  );
};

export default FeaturedArtworks;
