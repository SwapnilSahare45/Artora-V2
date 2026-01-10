import { Metadata } from "next";
import { Suspense } from "react";
import AuctionTimer from "@/components/atoms/AuctionTimer";
import LayoutToggle from "@/components/atoms/LayoutToggle";
import ArtworkLayoutMode from "@/components/molecules/ArtworkLayoutMode";
import { LuActivity, LuUsers } from "react-icons/lu";

export const metadata: Metadata = {
  title: "The Winter Modernism | Live Auction | Artora",
  description:
    "Live auction event featuring 12 curated digital and traditional masterpieces. Join 40+ active bidders now.",
};

const AuctionPage = () => {
  return (
    <main className="min-h-screen antialiased pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <header className="space-y-6 max-w-2xl">
            <div
              className="flex items-center gap-3 text-brand"
              aria-hidden="true"
            >
              <span className="w-8 h-px bg-current" />
              <p className="font-jakarta text-[10px] font-bold uppercase tracking-[0.4em]">
                Live Auction Event
              </p>
            </div>
            <h1 className="text-6xl md:text-8xl font-luxury leading-[0.9] tracking-tight">
              The Winter <br />{" "}
              <span className="italic text-brand">Modernism.</span>
            </h1>
            <p className="font-jakarta text-sm text-muted leading-relaxed max-w-md">
              A curated selection of 12 works exploring the intersection of
              cold-light and digital abstraction. Organized by the Artora
              Curatorial Collective.
            </p>
          </header>

          {/* Stats & Timer Card */}
          <aside
            className="w-full lg:w-100 bg-surface border border-glass p-10 space-y-10 shadow-2xl"
            aria-label="Live Auction Statistics"
          >
            <div className="space-y-3">
              <p className="font-jakarta text-[9px] uppercase tracking-[0.3em] text-dim">
                Time Remaining
              </p>
              <div
                className="font-mono text-4xl tracking-widest bg-surface-hover px-6 py-3 inline-block border border-glass"
                aria-live="polite"
              >
                <AuctionTimer targetDate={new Date(Date.now() + 5000000)} />
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-8 border-t border-glass pt-10">
              <div className="space-y-2">
                <dt className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                  Active Bidders
                </dt>
                <dd className="flex items-center gap-2">
                  <LuUsers
                    className="text-brand"
                    size={16}
                    aria-hidden="true"
                  />
                  <span className="font-luxury text-3xl">42</span>
                </dd>
              </div>
              <div className="space-y-2">
                <dt className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                  Current Volume
                </dt>
                <dd className="flex items-center gap-2">
                  <LuActivity
                    className="text-emerald-500"
                    size={16}
                    aria-hidden="true"
                  />
                  <span className="font-luxury text-3xl">₹24.8L</span>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* Catalog Control Bar */}
      <section className="max-w-7xl mx-auto flex items-center justify-between border-y border-glass py-8 px-6 backdrop-blur-md z-20">
        <h2 className="text-4xl font-luxury">
          The <span className="italic text-dim">Catalog.</span>
        </h2>
        <nav
          className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end"
          aria-label="Catalog View Controls"
        >
          <span className="font-jakarta text-[10px] text-brand uppercase tracking-widest font-bold">
            12 Lots Remaining
          </span>

          <div className="h-4 w-px bg-dim hidden md:block" aria-hidden="true" />

          <Suspense
            fallback={<div className="h-10 w-24 bg-glass animate-pulse" />}
          >
            <LayoutToggle />
          </Suspense>
        </nav>
      </section>

      <section className="max-w-7xl mx-auto mt-20 px-6">
        <Suspense
          fallback={
            <div className="text-dim uppercase text-[10px] tracking-widest">
              Loading curated lots...
            </div>
          }
        >
          <ArtworkLayoutMode />
        </Suspense>
      </section>
    </main>
  );
};

export default AuctionPage;
