import { Metadata } from "next";
import { Suspense } from "react";
import Button from "@/components/atoms/Button";
import LayoutToggle from "@/components/atoms/LayoutToggle";
import ArtistSpotlight from "@/components/molecules/ArtistsSpotlight";
import ArtworkLayoutMode from "@/components/molecules/ArtworkLayoutMode";
import Footer from "@/components/molecules/Footer";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import NavbarServer from "@/components/molecules/NavbarServer";

export const metadata: Metadata = {
  title: "Artora | Curated Luxury Art & Digital Masterpieces",
  description:
    "Discover and acquire rare artworks from elite independent creators globally through Artora's high-stakes auction protocol.",
};

export default async function Home() {
  const headersList = await headers();
  const userRole = headersList.get("x-user-role");

  const visualNavigation = [
    { name: "Abstract", slug: "abstract", image: "/abstract.webp" },
    { name: "Digital Art", slug: "digital-art", image: "/digitalart.webp" },
    { name: "Photography", slug: "photography", image: "/photography.webp" },
    { name: "Traditional", slug: "traditional", image: "/traditional.webp" },
  ];

  const collectorSteps = [
    {
      step: "01",
      title: "Discover",
      info: "Our curators hand-select independent talent globally, ensuring every piece tells a profound story.",
    },
    {
      step: "02",
      title: "Acquire",
      info: "Participate in sub-second latency auctions or secure masterpieces instantly through direct purchase.",
    },
    {
      step: "03",
      title: "Receive",
      info: "Every acquisition is handled with care, featuring insured worldwide shipping and white-glove delivery.",
    },
  ];
  const artistSteps = [
    {
      step: "01",
      title: "Exhibit",
      info: "Upload your high-resolution masterpieces to our digital gallery and reach elite global collectors.",
    },
    {
      step: "02",
      title: "Auction",
      info: "Launch high-stakes auctions with custom reserves and watch live bidding wars in real-time.",
    },
    {
      step: "03",
      title: "Prosper",
      info: "Bypass traditional galleries with sub-second payment settlement and transparent revenue tracking.",
    },
  ];

  const activeSteps = userRole === "artist" ? artistSteps : collectorSteps;

  return (
    <>
      <NavbarServer />
      <main>
        {/* Hero section */}
        <section
          className="relative max-w-7xl mx-auto pt-32 pb-20 px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          aria-label="Welcome to Artora"
        >
          <div className="space-y-8 text-left z-10">
            <div className="space-y-4">
              <span className="text-brand font-jakarta font-bold tracking-[0.2em] text-[10px] uppercase block">
                Curated Masterpieces
              </span>
              <h1 className="text-6xl md:text-8xl font-luxury leading-[0.9] tracking-tight">
                The beauty you <br />
                <span className="italic text-brand">haven't found</span> yet.
              </h1>
            </div>

            <p className="text-muted max-w-md text-lg font-jakarta leading-relaxed">
              Artora is a premier destination for elite independent creators. We
              bypass the mainstream to bring you the profound and the rare.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Link href={"/artworks"}>
                <Button
                  title="Explore Collection"
                  ariaLabel="View our curated art collection"
                  className="px-10 h-14 shadow-neon"
                />
              </Link>
              {userRole === "artists" ? (
                <Link href={"/dashboard/artist/deposit"}>
                  <Button
                    title="Sell Your Art"
                    ariaLabel="Access your artist dashboard to sell art"
                    variant="outline"
                    className="px-10 h-14"
                  />
                </Link>
              ) : (
                <Link href={"/auctions"}>
                  <Button
                    title="Explore Auctions"
                    ariaLabel="View live and upcoming art auctions"
                    variant="outline"
                    className="px-10 h-14"
                  />
                </Link>
              )}
            </div>
          </div>

          <div
            className="relative h-150 flex items-center justify-center lg:mt-0 mt-12"
            aria-hidden="true"
          >
            <div className="absolute top-10 right-0 w-72 h-112.5 z-20 border border-glass shadow-2xl overflow-hidden">
              <Image
                src="/hero-1.webp"
                alt="High-resolution featured artwork"
                fill
                priority
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-80 h-96 z-10 border border-glass overflow-hidden">
              <Image
                src="/hero-2.webp"
                alt="Secondary curatorial texture"
                fill
                className="object-cover opacity-40 grayscale"
              />
            </div>
            <div className="absolute inset-0 bg-brand/10 blur-[120px] rounded-full -z-10 animate-pulse pointer-events-none" />
          </div>
        </section>

        {/* Trending artworks section */}
        <section
          className="max-w-7xl mx-auto py-24 px-6 flex flex-col"
          aria-labelledby="trending-heading"
        >
          <header className="w-full flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 border-b border-glass pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-brand" aria-hidden="true" />
                <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                  Top 5 Curation
                </p>
              </div>
              <h2
                id="trending-heading"
                className="text-5xl md:text-6xl font-luxury leading-none tracking-tight"
              >
                Trending <span className="italic text-muted">Artworks</span>
              </h2>
            </div>

            <LayoutToggle />
          </header>

          <Suspense
            fallback={
              <div
                className="h-96 w-full flex items-center justify-center text-brand uppercase tracking-widest text-[10px]"
                role="status"
              >
                Loading Gallery...
              </div>
            }
          >
            <ArtworkLayoutMode />
          </Suspense>
        </section>

        <ArtistSpotlight />

        {/* Visual Navigation */}
        <section
          className="max-w-7xl mx-auto py-24 px-6"
          aria-labelledby="exhibition-heading"
        >
          <div className="flex justify-between items-end mb-12 border-b border-glass pb-8">
            <h2 id="exhibition-heading" className="text-4xl font-luxury">
              Browse by <span className="italic text-brand">Exhibition</span>
            </h2>
            <p className="text-dim font-jakarta text-[10px] uppercase tracking-widest">
              Four distinct realms
            </p>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            role="list"
          >
            {visualNavigation.map((nav, idx) => (
              <Link
                href={`/artworks/${nav.slug}`}
                key={idx}
                role="listitem"
                className="group relative h-100 overflow-hidden border border-glass"
                aria-label={`Explore the ${nav.name} exhibition`}
              >
                <Image
                  src={nav.image}
                  alt=""
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center p-6 border border-white/0 group-hover:border-glass transition-all">
                  <h3 className="text-sm font-jakarta font-bold tracking-[0.4em] uppercase">
                    {nav.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="max-w-7xl mx-auto py-40 px-6 grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-glass">
          {activeSteps.map((item, idx) => (
            <div key={idx} className="space-y-8 group">
              <span
                className="text-7xl font-luxury text-white/10 group-hover:text-brand transition-all duration-700 block italic"
                aria-hidden="true"
              >
                {item.step}
              </span>
              <div className="space-y-4">
                <h4 className="text-[11px] font-jakarta font-bold tracking-[0.4em] uppercase">
                  {item.title}
                </h4>
                <p className="text-muted font-jakarta leading-relaxed text-xs uppercase tracking-widest">
                  {item.info}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section
          className="relative h-125 flex flex-col items-center justify-center text-center overflow-hidden border-t border-glass"
          aria-label="Join Artora"
        >
          <div
            className="absolute inset-0 bg-brand/5 -z-10"
            aria-hidden="true"
          />
          <div className="space-y-10 px-6 relative z-10 flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-luxury leading-tight">
              {userRole ? (
                <>
                  Ready to discover <br />
                  <span className="italic text-brand">
                    your next acquisition?
                  </span>
                </>
              ) : (
                <>
                  Find a piece that <br />
                  <span className="italic text-brand">
                    speaks to your soul.
                  </span>
                </>
              )}
            </h2>
            {!userRole ? (
              <Link href="/register">
                <Button
                  title="Become a Collector"
                  ariaLabel="Sign up to become a collector"
                  className="h-16 px-16 shadow-neon"
                />
              </Link>
            ) : userRole === "artist" ? (
              <Link href="/dashboard/artist/create-artwork">
                <Button
                  title="List New Masterpiece"
                  ariaLabel="Go to artist dashboard to list artwork"
                  className="h-16 px-16 shadow-neon"
                />
              </Link>
            ) : (
              <Link href="/artworks">
                <Button
                  title="View New Arrivals"
                  ariaLabel="Browse the latest curated collection"
                  className="h-16 px-16 shadow-neon"
                />
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
