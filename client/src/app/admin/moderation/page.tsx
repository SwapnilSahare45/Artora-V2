import Button from "@/components/atoms/Button";
import { Metadata } from "next";
import Image from "next/image";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import { LuBox, LuEye, LuFileSearch, LuMaximize } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Moderation Queue | Architect Portal | Artora",
  description:
    "Quality control and curatorial approval for high-resolution studio deposits.",
};

const ModerationQueuePage = () => {
  const pendingArtworks = [
    {
      id: "ASSET-902",
      title: "Chromatic Echo",
      artist: "Elena Vasquez",
      medium: "Oil on Linen",
      size: "142 MB",
      resolution: "8000 x 8000 px",
      submitted: "45m ago",
      thumbnail: "/hero-1.webp",
    },
    {
      id: "ASSET-899",
      title: "Neon Chiaroscuro",
      artist: "Swapnil Sahare",
      medium: "Generative AI",
      size: "89 MB",
      resolution: "6000 x 9000 px",
      submitted: "2h ago",
      thumbnail: "/hero-2.webp",
    },
    {
      id: "ASSET-895",
      title: "The Silent Grid",
      artist: "Julian K.",
      medium: "Photography",
      size: "112 MB",
      resolution: "7200 x 4800 px",
      submitted: "5h ago",
      thumbnail: "/abstract.webp",
    },
  ];

  return (
    <main className="min-h-screen pt-12 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-glass pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" aria-hidden="true" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Quality Control Protocol
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-luxury leading-none tracking-tight">
              Artwork <span className="italic text-muted">Moderation.</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="font-jakarta text-[9px] uppercase tracking-widest text-dim m-0">
                Queue Status
              </p>
              <p className="font-jakarta text-[10px] uppercase font-bold tracking-widest m-0">
                03 Deposits Awaiting
              </p>
            </div>
            <div
              className="h-10 w-px bg-glass hidden md:block"
              aria-hidden="true"
            />
            <LuBox
              className="text-brand opacity-40"
              size={32}
              aria-hidden="true"
            />
          </div>
        </section>

        {/* Queue List */}
        <section className="space-y-6" aria-labelledby="queue-heading">
          <header className="flex justify-between items-center px-4">
            <h2 id="queue-heading" className="font-luxury text-2xl italic">
              Awaiting Inspection
            </h2>
            <div className="flex items-center gap-4">
              <span className="font-jakarta text-[9px] text-dim uppercase tracking-widest">
                Sort: Newest First
              </span>
            </div>
          </header>

          <div className="space-y-4" role="list">
            {pendingArtworks.map((art, idx) => (
              <article
                key={idx}
                role="listitem"
                className="group flex flex-col xl:flex-row items-center justify-between p-6 bg-surface border border-glass hover:border-brand/30 transition-all duration-700 gap-8"
              >
                {/* Visual Preview */}
                <div className="flex items-center gap-8 w-full xl:w-auto">
                  <div className="relative w-32 h-32 bg-neutral-900 border border-glass overflow-hidden shrink-0">
                    <Image
                      src={art.thumbnail}
                      alt={`Deposit thumbnail: ${art.title}`}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <button
                      type="button"
                      aria-label={`Expand preview for ${art.title}`}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center focus:opacity-100"
                    >
                      <LuMaximize
                        className="text-white"
                        size={20}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest">
                      {art.id}
                    </p>
                    <h3 className="font-luxury text-3xl group-hover:text-brand transition-colors m-0">
                      {art.title}
                    </h3>
                    <p className="font-jakarta text-[10px] text-brand font-bold uppercase tracking-widest m-0">
                      {art.artist}
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 w-full max-w-3xl border-x border-glass px-8 m-0">
                  <div className="space-y-1">
                    <dt className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                      Medium
                    </dt>
                    <dd className="font-jakarta text-[10px] uppercase tracking-widest m-0">
                      {art.medium}
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                      Resolution
                    </dt>
                    <dd className="font-jakarta text-[10px] uppercase tracking-widest m-0">
                      {art.resolution}
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                      File Size
                    </dt>
                    <dd className="flex items-center gap-2 m-0">
                      <span className="font-jakarta text-[10px] uppercase tracking-widest">
                        {art.size}
                      </span>
                      <BiCheckCircle
                        size={10}
                        className="text-emerald-500"
                        aria-hidden="true"
                      />
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                      Wait Time
                    </dt>
                    <dd className="font-jakarta text-[10px] text-amber-500 uppercase tracking-widest flex items-center gap-2 m-0">
                      <FiAlertCircle size={12} aria-hidden="true" />{" "}
                      {art.submitted}
                    </dd>
                  </div>
                </dl>

                {/* Decision Actions */}
                <div className="flex items-center gap-4 w-full xl:w-auto justify-end">
                  <button
                    type="button"
                    title="View Original Asset"
                    aria-label={`Inspect original high-res file for ${art.title}`}
                    className="w-12 h-12 flex items-center justify-center border border-glass text-dim hover:text-white hover:border-white/20 transition-all focus:ring-2 focus:ring-brand"
                  >
                    <LuFileSearch size={20} aria-hidden="true" />
                  </button>
                  <div className="h-10 w-px bg-glass" aria-hidden="true" />
                  <Button
                    title="Reject"
                    variant="outline"
                    icon={<BiXCircle size={18} aria-hidden="true" />}
                    className="text-dim! px-6! text-[10px]! hover:text-red-500! hover:border-red-500/30"
                  />
                  <Button
                    title="Verify"
                    icon={<BiCheckCircle size={18} aria-hidden="true" />}
                    className="px-8! text-[10px]!"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="pt-20 border-t border-glass flex flex-col items-center gap-6 text-center">
          <div className="opacity-40 flex flex-col items-center gap-4">
            <LuEye size={32} className="text-brand" aria-hidden="true" />
            <p className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-dim leading-relaxed max-w-sm">
              Your inspection ensures the Artora vault remains untainted by the
              mundane. <br />
              All verified assets are instantly hashed and listed.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default ModerationQueuePage;
