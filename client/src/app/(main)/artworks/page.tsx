import { Metadata } from "next";
import { Suspense } from "react";
import LayoutToggle from "@/components/atoms/LayoutToggle";
import ArtworkLayoutMode from "@/components/molecules/ArtworkLayoutMode";
import Filter from "@/components/molecules/Filter";
import Search from "@/components/molecules/Search";

export const metadata: Metadata = {
  title: "The Collection | Artora Protocol",
  description:
    "Browse the permanent collection of elite independent artworks, filtered by movement, medium, and style.",
};

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

const Artworks = () => {
  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-12 px-6 border-b border-glass">
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

      <section className="max-w-7xl mx-auto py-16 px-6">
        <Suspense fallback={<GalleryLoader />}>
          <ArtworkLayoutMode />
        </Suspense>
      </section>
    </main>
  );
};

export default Artworks;
