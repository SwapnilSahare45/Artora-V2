import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { LuHeart, LuInfo, LuShare2 } from "react-icons/lu";
import { IArtwork } from "@/types";
import BidSection from "@/components/molecules/BidSection";

interface ArtworkPageProps {
  params: Promise<{ id: string }>;
}

// Fetch artwork data from API
async function getArtwork(id: string): Promise<IArtwork | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/artworks/${id}`,
      {
        cache: "no-store",
        next: { revalidate: 0 },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.artwork;
  } catch (error) {
    console.error("Error fetching artwork:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ArtworkPageProps): Promise<Metadata> {
  const { id } = await params;
  const artwork = await getArtwork(id);

  if (!artwork) {
    return {
      title: "Artwork Not Found | Artora",
    };
  }

  const artistName =
    typeof artwork.artist === "object"
      ? `${artwork.artist.firstName} ${artwork.artist.lastName}`
      : "Unknown Artist";

  return {
    title: `${artwork.title} by ${artistName} | Artora`,
    description: artwork.description,
    openGraph: {
      title: artwork.title,
      description: artwork.description,
      images: [artwork.imageURL],
    },
  };
}

// Main page - Server Component
const ArtworkPage = async ({ params }: ArtworkPageProps) => {
  const { id } = await params;
  const artwork = await getArtwork(id);

  if (!artwork) {
    notFound();
  }

  // Normalize artist data
  const artistName =
    typeof artwork.artist === "object"
      ? `${artwork.artist.firstName} ${artwork.artist.lastName}`
      : "Unknown Artist";

  const artistAvatar =
    typeof artwork.artist === "object" ? artwork.artist.avatar : null;

  return (
    <main className="min-h-screen antialiased mb-4 md:mb-0 md:py-20 px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Artwork Image */}
      <section className="relative" aria-label="Artwork Image Preview">
        <figure className="w-full h-[40vh] lg:h-[80vh] sticky top-40 flex items-center justify-center">
          <Image
            src={artwork.imageURL}
            alt={`${artwork.title} by ${artistName}`}
            fill
            priority
            className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-transform duration-1000 hover:scale-[1.03]"
          />
        </figure>
      </section>

      {/* Artwork Details */}
      <section className="space-y-12">
        {/* Identity block */}
        <header className="pb-10 space-y-6 border-b border-glass">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-jakarta text-[9px] font-bold uppercase tracking-[0.4em] text-brand">
                {artwork.status === "verified" ? "Verified" : "Pending"}
              </span>
              <div className="h-4 w-px bg-glass" />
              <span className="font-jakarta text-[9px] font-bold uppercase tracking-[0.4em] text-brand">
                {artwork.category}
              </span>
              <span className="h-px w-8 bg-glass" />
            </div>
            <h1 className="text-5xl md:text-7xl font-luxury leading-tight">
              {artwork.title.split(" ").slice(0, -1).join(" ")}
              <span className="italic text-brand">
                {artwork.title.split(" ").pop()}.
              </span>
            </h1>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {artistAvatar && (
                <div className="w-12 h-12 rounded-full overflow-hidden border border-glass p-0.5">
                  <Image
                    src={artistAvatar}
                    alt={artistName}
                    width={48}
                    height={48}
                    className="rounded-full object-cover grayscale"
                  />
                </div>
              )}
              <div>
                <p className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                  Creator
                </p>
                <p className="font-luxury text-xl italic">{artistName}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                aria-label="Add to Favorites"
                className="p-3 border border-glass text-dim hover:text-brand hover:border-brand transition-all min-w-11 min-h-11"
              >
                <LuHeart size={20} />
              </button>
              <button
                aria-label="Share Artwork"
                className="p-3 border border-glass text-dim hover:text-brand hover:border-brand transition-all min-w-11 min-h-11"
              >
                <LuShare2 size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Pricing & Action - Client Component */}
        <BidSection
          artworkId={artwork._id}
          initialBid={artwork.openingBid || 0}
          salePath={artwork.salePath}
          price={artwork.price}
          endDate={artwork.auctionId?.endDate}
        />

        {/* Specifications */}
        <section className="space-y-10 px-2">
          <div className="space-y-6">
            <h2 className="font-jakarta text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <LuInfo size={14} className="text-brand" /> Specifications
            </h2>
            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              {[
                { label: "Medium", value: artwork.medium },
                { label: "Dimensions", value: artwork.dimensions },
                { label: "Year", value: artwork.year },
                { label: "Category", value: artwork.category },
              ].map((spec, i) => (
                <div key={i}>
                  <p className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                    {spec.label}
                  </p>
                  <p className="font-jakarta text-sm border-b border-glass pb-3 mt-1">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="font-jakarta text-[10px] font-bold uppercase tracking-[0.3em]">
              Manifesto / Description
            </h2>
            <p className="font-jakarta text-sm text-muted leading-relaxed max-w-xl">
              {artwork.description}
            </p>
          </div>

          {/* Artwork Metadata */}
          <div className="pt-6 border-t border-glass">
            <p className="font-mono text-[7px] text-dim truncate uppercase tracking-widest">
              Artwork ID: {artwork._id}
            </p>
            <p className="font-mono text-[7px] text-dim uppercase tracking-widest mt-1">
              Added: {new Date(artwork.createdAt).toLocaleDateString()}
            </p>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ArtworkPage;
