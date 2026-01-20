import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Button from "@/components/atoms/Button";
import StudioCard from "@/components/molecules/StudioCard";
import { LuPlus } from "react-icons/lu";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Studio Inventory | Artora",
};

// Fetch artworks of the logged-in artist
async function getArtistArtworks() {
  // Read cookies from incoming request
  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/artworks/artistArtworks`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store", // Alwasy fetch fresh data
    },
  );

  // If API fails, return empty list
  if (!response.ok) return [];

  const data = await response.json();
  return data.artworks || [];
}

// Skeleton loader for stats section
function StatsLoading() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-surface border border-glass">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-8 animate-pulse">
          <div className="h-3 w-20 bg-white/10 rounded mb-3" />
          <div className="h-8 w-16 bg-white/10 rounded" />
        </div>
      ))}
    </section>
  );
}

// Skeleton loader for atworks grid
function ArtworksLoading() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-surface border border-glass animate-pulse overflow-hidden"
        >
          <div className="aspect-3/2 bg-white/5" />
          <div className="p-6 space-y-4">
            <div className="h-4 w-3/4 bg-white/10 rounded" />
            <div className="h-4 w-1/2 bg-white/10 rounded" />
            <div className="h-3 w-20 bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </section>
  );
}

// Stats component
function StatsSection({ artworks }: { artworks: any[] }) {
  // Total artworks uploaded
  const totalAssets = artworks.length;

  // Count verified artworks
  const verifiedCount = artworks.filter(
    (a: any) => a.status === "verified",
  ).length;

  // Count pending artworks
  const pendingCount = artworks.filter(
    (a: any) => a.status === "pending",
  ).length;

  // Total valuation (only direct sale price)
  const totalValuation = artworks.reduce(
    (acc: number, a: any) => acc + (Number(a.price) || 0),
    0,
  );

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-surface border border-glass">
      {[
        { label: "Total Assets", value: totalAssets },
        { label: "Verified", value: verifiedCount },
        { label: "Pending", value: pendingCount },
        {
          label: "Valuation",
          value: `₹${(totalValuation / 1000).toFixed(1)}K`,
        },
      ].map((stat, i) => (
        <div key={i} className="p-8">
          <dt className="text-[9px] uppercase tracking-widest text-dim font-jakarta">
            {stat.label}
          </dt>
          <dd className="text-3xl font-luxury m-0 text-white">{stat.value}</dd>
        </div>
      ))}
    </section>
  );
}

// Artworks grid component
function ArtworksGrid({ artworks }: { artworks: any[] }) {
  // Empty state when artist has no artworks
  if (artworks.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center py-20 space-y-6 border border-glass bg-surface/30">
        <div className="text-center space-y-3">
          <p className="font-jakarta text-dim text-sm uppercase tracking-widest">
            No Artworks Yet
          </p>
          <p className="font-luxury text-2xl text-muted">
            Your vault awaits its first masterpiece.
          </p>
        </div>
        <Link href="/dashboard/artist/deposit">
          <Button
            title="Deposit First Piece"
            icon={<LuPlus size={18} />}
            className="h-14 px-8"
          />
        </Link>
      </section>
    );
  }

  // Grid view
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {artworks.map((item: any) => (
        <StudioCard
          key={item._id}
          id={item._id}
          status={item.status}
          title={item.title}
          price={
            item.price
              ? `₹${item.price.toLocaleString()}`
              : `Bid: ₹${item.openingBid}`
          }
          imageURL={item.imageURL}
        />
      ))}
    </section>
  );
}

// Fetches artworks and passes them to child components
async function GalleryContent() {
  const artworks = await getArtistArtworks();
  return (
    <>
      <StatsSection artworks={artworks} />
      <ArtworksGrid artworks={artworks} />
    </>
  );
}

// Main page
const ArtistGalleryPage = async () => {
  return (
    <main className="min-h-screen pt-12 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <section className="flex justify-between items-end border-b border-glass pb-12">
          <div className="space-y-4">
            <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
              Inventory Management
            </p>
            <h1 className="text-6xl md:text-7xl font-luxury">
              Studio <span className="italic text-brand">Inventory.</span>
            </h1>
          </div>
          {/* Deposit button */}
          <Link href="/dashboard/artist/deposit" className="hidden md:block">
            <Button
              title="Deposit New Piece"
              icon={<LuPlus size={18} />}
              className="h-16 px-10 shadow-neon"
            />
          </Link>
        </section>

        {/* Stats and Artworks section */}
        <Suspense
          fallback={
            <>
              <StatsLoading />
              <ArtworksLoading />
            </>
          }
        >
          <GalleryContent />
        </Suspense>
      </div>
    </main>
  );
};

export default ArtistGalleryPage;
