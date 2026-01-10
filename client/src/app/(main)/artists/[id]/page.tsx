import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LuInstagram, LuGlobe, LuMapPin, LuArrowUpRight } from "react-icons/lu";
import Button from "@/components/atoms/Button";
import GridCard from "@/components/molecules/GridCard";
import { GoVerified } from "react-icons/go";

// Mock data for the artist
const artistData = {
  name: "Elena Vasquez",
  specialty: "Abstract Expressionism",
  location: "Barcelona, Spain",
  bio: "Elena Vasquez is a self-taught painter who transforms everyday moments into visceral abstract expressions. Working from her sun-drenched studio overlooking the Mediterranean, Elena layers oil and acrylic to create depth that draws viewers into her emotional landscapes.",
  quote:
    "I paint the feelings that words can't capture—the space between memory and dream.",
  stats: [
    { label: "Works", value: "24" },
    { label: "Sold", value: "18" },
    { label: "Exhibitions", value: "06" },
  ],
};

// SEO Metadata
export const metadata: Metadata = {
  title: `${artistData.name} | Senior Artist | Artora`,
  description: `Explore the visceral abstract expressions of ${artistData.name}, a ${artistData.location}-based painter exploring the space between memory and dream.`,
  openGraph: {
    title: artistData.name,
    description: artistData.bio,
    images: ["/artist.webp"],
  },
};

const PublicArtistProfile = () => {
  return (
    <main className="min-h-screen antialiased">
      {/* Artist Hero Section */}
      <section
        className="relative h-[70vh] w-full overflow-hidden border-b border-glass"
        aria-label="Artist Hero"
      >
        <Image
          src="/artist.webp"
          alt={`Portrait of ${artistData.name}`}
          fill
          priority
          className="object-cover grayscale"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/20 to-transparent"
          aria-hidden="true"
        />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <GoVerified className="text-brand" size={20} aria-hidden="true" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Verified Artora Creator
              </p>
            </div>
            <h1 className="text-7xl md:text-9xl font-luxury leading-none tracking-tighter">
              {artistData.name.split(" ")[0]} <br />
              <span className="italic text-white/90">
                {artistData.name.split(" ")[1]}.
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Narrative and Stats section */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Detailed Bio */}
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-6">
            <h2 className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-dim font-bold">
              The Narrative
            </h2>
            <p className="font-jakarta text-xl md:text-2xl leading-relaxed text-muted">
              {artistData.bio}
            </p>
          </div>

          <blockquote className="relative py-8 pl-12 border-l border-brand">
            <p className="font-luxury italic text-3xl md:text-4xl text-white/90">
              "{artistData.quote}"
            </p>
          </blockquote>

          {/* Social Links and Location */}
          <nav
            className="flex flex-wrap gap-10 pt-6"
            aria-label="Social and location links"
          >
            <div className="flex items-center gap-3 text-dim">
              <LuMapPin size={18} className="text-brand" aria-hidden="true" />
              <span className="font-jakarta text-xs uppercase tracking-widest">
                {artistData.location}
              </span>
            </div>
            <Link
              href="#"
              aria-label={`Follow ${artistData.name} on Instagram`}
              className="flex items-center gap-3 text-dim hover:text-brand transition-all"
            >
              <LuInstagram size={18} aria-hidden="true" />
              <span className="font-jakarta text-xs uppercase tracking-widest">
                @elenavasquez
              </span>
            </Link>
            <Link
              href="#"
              aria-label="View external portfolio"
              className="flex items-center gap-3 text-dim hover:text-brand transition-all"
            >
              <LuGlobe size={18} aria-hidden="true" />
              <span className="font-jakarta text-xs uppercase tracking-widest">
                Portfolio
              </span>
            </Link>
          </nav>
        </div>

        {/* Stats and Action */}
        <aside className="lg:col-span-5 space-y-12">
          <div className="p-10 border border-glass bg-surface backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-8">
              {artistData.stats.map((stat, i) => (
                <div key={i} className="text-center space-y-2">
                  <p className="text-4xl font-luxury">{stat.value}</p>
                  <p className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-10 border-t border-glass">
              <Button
                title="Follow Creator"
                ariaLabel={`Follow ${artistData.name}`}
                className="w-full h-14 shadow-neon"
              />
            </div>
          </div>

          <div className="p-8 border border-glass space-y-4">
            <h3 className="font-jakarta text-[10px] font-bold uppercase tracking-[0.3em]">
              Upcoming Exhibition
            </h3>
            <p className="font-jakarta text-xs text-dim uppercase tracking-widest">
              Mediterranean Light — Feb 2026
            </p>
            <Link
              href="/auctions"
              className="inline-flex items-center gap-2 text-brand text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors"
            >
              View Lots <LuArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </section>

      {/* Artist's Artworks */}
      <section
        className="max-w-7xl mx-auto px-6 py-24 border-t border-glass"
        aria-labelledby="exhibition-title"
      >
        <header className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <h2 id="exhibition-title" className="text-5xl font-luxury">
              The <span className="italic text-brand/80">Exhibition.</span>
            </h2>
            <p className="font-jakarta text-[10px] uppercase tracking-widest text-dim">
              Current Public Works
            </p>
          </div>
          <Link
            href="/artworks"
            className="text-dim hover:text-brand transition-colors font-jakarta text-[10px] uppercase tracking-widest"
          >
            View Full Inventory
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <GridCard key={idx} />
          ))}
        </div>
      </section>

      {/* Decorative line */}
      <div className="h-40 flex justify-center" aria-hidden="true">
        <div className="w-px h-full bg-linear-to-b from-brand to-transparent" />
      </div>
    </main>
  );
};

export default PublicArtistProfile;
