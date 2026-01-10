import { Metadata } from "next";
import AuctionTimer from "@/components/atoms/AuctionTimer";
import Button from "@/components/atoms/Button";
import Image from "next/image";
import { LuHeart, LuInfo, LuShare2 } from "react-icons/lu";

// This would usually be fetched based on the [id]
const artworkData = {
  title: "The Looking Eye",
  artist: "Swapnil Sahare",
  currentBid: 2200,
  id: "2349JD",
  medium: "Digital Generative",
  year: "2026",
  dimensions: "120 x 120 cm",
  auth: "Digital NFT",
  description:
    "This piece was generated using custom GAN algorithms trained on 17th-century baroque light patterns. It represents a bridge between classical chiaroscuro and modern computational logic.",
};

// --- SEO & SOCIAL METADATA ---
export const metadata: Metadata = {
  title: `${artworkData.title} by ${artworkData.artist} | Artora`,
  description: `Acquire "${artworkData.title}", a ${artworkData.medium} masterpiece by ${artworkData.artist} via Artora Protocol.`,
  openGraph: {
    title: artworkData.title,
    description: artworkData.description,
    images: ["/hero-2.webp"],
  },
};

const ArtworkPage = () => {
  return (
    <main className="min-h-screen antialiased py-20 px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Artwork Image */}
      <section className="relative" aria-label="Artwork Image Preview">
        <figure className="w-full h-[60vh] lg:h-[80vh] sticky top-40 flex items-center justify-center">
          <Image
            src="/hero-2.webp"
            alt={`${artworkData.title} by ${artworkData.artist}`}
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
                Entry #{artworkData.id}
              </span>
              <span className="h-px w-8 bg-glass" aria-hidden="true" />
            </div>
            <h1 className="text-5xl md:text-7xl font-luxury leading-tight">
              {artworkData.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="italic text-brand">
                {artworkData.title.split(" ").pop()}.
              </span>
            </h1>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-glass p-0.5">
                <Image
                  src="/artist.webp"
                  alt={artworkData.artist}
                  width={48}
                  height={48}
                  className="rounded-full object-cover grayscale"
                />
              </div>
              <div>
                <p className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                  Creator
                </p>
                <p className="font-luxury text-xl italic">
                  {artworkData.artist}
                </p>
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

        <article className="p-8 md:p-12 bg-surface border border-glass space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="space-y-1">
              <p className="font-jakarta text-[10px] uppercase tracking-widest text-brand font-bold">
                Current Bid
              </p>
              <p className="text-6xl font-luxury">
                ₹{artworkData.currentBid.toLocaleString()}
              </p>
            </div>
            <div className="w-full md:w-auto">
              <p className="font-jakarta text-[10px] uppercase tracking-widest text-dim mb-3">
                Ends In
              </p>
              <div className="bg-brand px-6 py-3 font-mono text-lg font-bold shadow-neon inline-block">
                <AuctionTimer targetDate={new Date(Date.now() + 10000000)} />
              </div>
            </div>
          </div>

          <form className="space-y-4">
            <div className="relative group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-brand font-luxury text-2xl group-focus-within:scale-110 transition-transform">
                ₹
              </span>
              <input
                type="number"
                aria-label="Bid Amount"
                placeholder="Enter custom bid amount"
                className="w-full bg-bg-primary border border-glass p-6 pl-12 font-jakarta outline-none focus:border-brand focus:bg-surface transition-all placeholder:text-white/30"
              />
            </div>
            <Button
              title="Place Binding Bid"
              type="submit"
              className="w-full h-16 text-[12px]! tracking-[0.3em]! shadow-neon"
            />
            <p className="text-center font-jakarta text-[9px] text-dim uppercase tracking-widest">
              Minimum Next Bid: ₹
              {(artworkData.currentBid + 200).toLocaleString()}
            </p>
          </form>
        </article>

        {/* Specifications */}
        <section className="space-y-10 px-2">
          <div className="space-y-6">
            <h2 className="font-jakarta text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <LuInfo size={14} className="text-brand" /> Specifications
            </h2>
            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              {[
                { label: "Medium", value: artworkData.medium },
                { label: "Dimensions", value: artworkData.dimensions },
                { label: "Year", value: artworkData.year },
                { label: "Authenticity", value: artworkData.auth },
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
            <h2 className="font-jakarta text-[10px] font-bold uppercase tracking-[0.3em] ">
              Manifesto / Description
            </h2>
            <p className="font-jakarta text-sm text-muted leading-relaxed max-w-xl">
              {artworkData.description}
            </p>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ArtworkPage;
