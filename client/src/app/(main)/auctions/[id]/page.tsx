import { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import AuctionTimer from "@/components/atoms/AuctionTimer";
import LayoutToggle from "@/components/atoms/LayoutToggle";
import ArtworkLayoutMode from "@/components/molecules/ArtworkLayoutMode";

type AuctionPageProps = {
  params: Promise<{ id: string }>;
};

type Auction = {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  artworkIds: any[];
};

export const metadata: Metadata = {
  title: "Live Auction | Artora",
};

const AuctionPage = async ({ params }: AuctionPageProps) => {
  // Get auction ID from URL
  const { id } = await params;
  const cookieStore = await cookies();

  // Fetch auction details
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auctions/${id}`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to initialize auction protocol.");
  }

  const { auction }: { auction: Auction } = await res.json();

  return (
    <main className="min-h-screen antialiased pt-12 pb-24">
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <header className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3 text-brand">
              <span className="w-8 h-px bg-current" />
              <p className="font-jakarta text-[10px] font-bold uppercase tracking-[0.4em]">
                Live Auction Event
              </p>
            </div>

            <h1 className="text-6xl md:text-8xl font-luxury leading-[0.9] tracking-tight">
              {auction.title.split(" ").slice(0, 1).join(" ")} <br />
              <span className="italic text-brand">
                {auction.title.split(" ").slice(1).join(" ")}.
              </span>
            </h1>

            <p className="font-jakarta text-sm text-muted leading-relaxed max-w-md">
              {auction.description}
            </p>
          </header>

          {/* Stats & Timer */}
          <aside className="w-full lg:w-100 bg-surface border border-glass p-10 space-y-10 shadow-2xl">
            <div className="space-y-3">
              <p className="font-jakarta text-[9px] uppercase tracking-[0.3em] text-dim">
                Time Remaining
              </p>
              <div className="font-mono text-4xl tracking-widest bg-surface-hover px-6 py-3 inline-block border border-glass">
                <AuctionTimer targetDate={new Date(auction.endDate)} />
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-8 border-t border-glass pt-10">
              <div className="space-y-2">
                <dt className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                  Auction Start
                </dt>
                <dd className="font-luxury text-2xl">
                  {new Date(auction.startDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </dd>
              </div>

              <div className="space-y-2">
                <dt className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                  Total Lots
                </dt>
                <dd className="font-luxury text-3xl">
                  {auction.artworkIds.length}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* Catalog */}
      <section className="max-w-7xl mx-auto flex items-center justify-between border-y border-glass py-8 px-6">
        <h2 className="text-4xl font-luxury">
          The <span className="italic text-dim">Catalog.</span>
        </h2>

        <nav className="flex items-center gap-8">
          <span className="font-jakarta text-[10px] text-brand uppercase tracking-widest font-bold">
            {auction.artworkIds.length} Lots Remaining
          </span>

          <Suspense
            fallback={<div className="h-10 w-24 bg-glass animate-pulse" />}
          >
            <LayoutToggle />
          </Suspense>
        </nav>
      </section>

      <section className="max-w-7xl mx-auto mt-20 px-6">
        <ArtworkLayoutMode artworks={auction.artworkIds} />
      </section>
    </main>
  );
};

export default AuctionPage;
