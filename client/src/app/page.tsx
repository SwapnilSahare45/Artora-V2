import { Metadata } from "next";
import { Suspense } from "react";
import Button from "@/components/atoms/Button";
import ArtistSpotlight from "@/components/molecules/ArtistsSpotlight";
import Footer from "@/components/molecules/Footer";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import NavbarServer from "@/components/molecules/NavbarServer";
import FeaturedArtworks from "@/components/molecules/FeaturedArtworks";
import VisualNavigation from "@/components/molecules/VisualNavigation";

export const metadata: Metadata = {
  title: "Artora | Curated Luxury Art & Digital Masterpieces",
  description:
    "Discover and acquire rare artworks from elite independent creators globally through Artora's high-stakes auction protocol.",
};

export default async function Home() {
  // Read request headers
  const headersList = await headers();

  // Custom header injected from middleware
  const userRole = headersList.get("x-user-role");

  // Steps shown for collectors
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

  // Steps shown for artists
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

  // Steps to show based on logged-in user role
  const activeSteps = userRole === "artist" ? artistSteps : collectorSteps;

  return (
    <>
      <NavbarServer />
      <main>
        {/* Hero section */}
        <section
          className="relative max-w-7xl mx-auto pt-32 pb-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
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
              {/* Conditional CTA based on user role */}
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

          <div className="hidden relative h-150 md:flex items-center justify-center">
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

        {/* Featured artworks */}

        <Suspense
          fallback={
            <section className="max-w-7xl mx-auto py-24 px-6">
              <div className="h-96 w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-t-2 border-brand rounded-full animate-spin" />
                  <p className="text-brand uppercase tracking-widest text-[10px]">
                    Loading Featured Artworks...
                  </p>
                </div>
              </div>
            </section>
          }
        >
          <FeaturedArtworks />
        </Suspense>

        <ArtistSpotlight />

        {/* Visual Navigation */}
        <VisualNavigation />

        {/* How it Works */}
        <section className="max-w-7xl mx-auto py-40 px-6 grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-glass">
          {activeSteps.map((item, idx) => (
            <div key={idx} className="space-y-8 group">
              <span className="text-7xl font-luxury text-white/10 group-hover:text-brand transition-all duration-700 block italic">
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
        <section className="relative h-125 flex flex-col items-center justify-center text-center overflow-hidden border-t border-glass">
          <div className="absolute inset-0 bg-brand/5 -z-10" />
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
              <Link href="/dashboard/artist/deposit">
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
