import { Metadata } from "next";
import Button from "@/components/atoms/Button";
import Image from "next/image";
import {
  LuDownload,
  LuFileSearch,
  LuSearch,
  LuPrinter,
  LuShieldCheck,
  LuHistory,
} from "react-icons/lu";
import Search from "@/components/molecules/Search";

export const metadata: Metadata = {
  title: "The Archive | Acquisition History | Artora",
  description:
    "Review your historical acquisitions, download invoices, and access provenance certificates.",
};

const AcquisitionHistoryPage = () => {
  const acquisitions = [
    {
      id: "ART-99234",
      artwork: "Digital Renaissance",
      artist: "Swapnil Sahare",
      date: "Jan 04, 2026",
      price: "₹2,50,000",
      status: "Secured in Vault",
      image: "/hero-1.webp",
    },
    {
      id: "ART-99102",
      artwork: "The Looking Eye",
      artist: "Elena Vasquez",
      date: "Dec 22, 2025",
      price: "₹4,20,000",
      status: "Secured in Vault",
      image: "/hero-2.webp",
    },
    {
      id: "ART-99088",
      artwork: "Sovereign Flow",
      artist: "Swapnil Sahare",
      date: "Dec 15, 2025",
      price: "₹1,85,000",
      status: "In Transit",
      image: "/hero-1.webp",
    },
  ];

  return (
    <main className="min-h-screen pt-22 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-glass pb-12">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" aria-hidden="true" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Collection Records
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-luxury leading-none tracking-tight">
              The <span className="italic text-muted">Archive.</span>
            </h1>
          </header>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <Button
              title="Export Full Report"
              ariaLabel="Export your full acquisition history as a report"
              variant="outline"
              icon={<LuDownload size={16} aria-hidden="true" />}
              className="h-14 px-8"
            />
          </div>
        </section>

        <section aria-label="Archive Statistics">
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-px bg-surface border border-glass m-0">
            {[
              {
                label: "Capital Deployed",
                value: "₹8,55,000",
                sub: "Total Asset Value",
              },
              {
                label: "Items Archived",
                value: "03",
                sub: "Masterpieces Secured",
              },
              {
                label: "Provenance Status",
                value: "100%",
                sub: "Authenticated by Artora",
              },
            ].map((stat, i) => (
              <div key={i} className="p-10 space-y-4 group">
                <dt className="font-jakarta text-[9px] uppercase tracking-widest text-dim group-hover:text-brand transition-colors">
                  {stat.label}
                </dt>
                <dd className="m-0 space-y-1">
                  <p className="font-luxury text-4xl">{stat.value}</p>
                  <p className="font-jakarta text-[8px] uppercase tracking-widest text-white/20">
                    {stat.sub}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="space-y-8" aria-label="Acquisition List">
          <header className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* placeholder="Search Archive..." */}
            <Search />
          </header>

          <div className="space-y-4" role="list">
            {acquisitions.map((item, idx) => (
              <article
                key={idx}
                role="listitem"
                className="group flex flex-col lg:flex-row items-center justify-between p-6 bg-surface border border-glass hover:bg-surface-hover hover:border-white/10 transition-all duration-500 gap-8"
              >
                <div className="flex items-center gap-8 w-full lg:w-auto">
                  <div className="relative w-20 h-20 overflow-hidden shrink-0 border border-glass bg-neutral-900">
                    <Image
                      src={item.image}
                      alt={`Thumbnail of ${item.artwork}`}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest">
                      {item.id}
                    </p>
                    <h2 className="font-luxury text-2xl m-0">{item.artwork}</h2>
                    <p className="font-jakarta text-[10px] text-dim uppercase tracking-widest m-0">
                      {item.artist}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 flex-1 max-w-2xl w-full">
                  <div className="space-y-1">
                    <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                      Reconciliation Date
                    </p>
                    <time
                      dateTime={item.date}
                      className="font-jakarta text-xs uppercase tracking-widest"
                    >
                      {item.date}
                    </time>
                  </div>
                  <div className="space-y-1">
                    <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                      Valuation
                    </p>
                    <p className="font-luxury text-xl m-0">{item.price}</p>
                  </div>
                  <div className="space-y-1 hidden md:block">
                    <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                      Status
                    </p>
                    <div className="flex items-center gap-2">
                      <LuShieldCheck
                        size={12}
                        className="text-brand"
                        aria-hidden="true"
                      />
                      <p className="font-jakarta text-[9px] text-muted uppercase tracking-widest m-0">
                        {item.status}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto border-t lg:border-t-0 border-glass pt-4 lg:pt-0">
                  <button
                    type="button"
                    title="Download Invoice"
                    aria-label={`Download invoice for ${item.artwork}`}
                    className="flex-1 lg:flex-none p-4 border border-white/10 hover:bg-surface-hover hover:border-brand transition-all flex items-center justify-center gap-2 min-w-11 min-h-11"
                  >
                    <LuDownload size={16} aria-hidden="true" />
                    <span className="lg:hidden font-jakarta text-[9px] uppercase tracking-widest">
                      Invoice
                    </span>
                  </button>
                  <button
                    type="button"
                    title="View Certificate"
                    aria-label={`View certificate of authenticity for ${item.artwork}`}
                    className="flex-1 lg:flex-none p-4 border border-white/10 hover:bg-surface-hover hover:border-brand transition-all flex items-center justify-center gap-2 min-w-11 min-h-11"
                  >
                    <LuFileSearch size={16} aria-hidden="true" />
                    <span className="lg:hidden font-jakarta text-[9px] uppercase tracking-widest">
                      Certificate
                    </span>
                  </button>
                  <button
                    type="button"
                    title="Print Proof"
                    aria-label={`Print proof of acquisition for ${item.artwork}`}
                    className="flex-1 lg:flex-none p-4 border border-white/10 hover:bg-surface-hover hover:border-brand transition-all flex items-center justify-center gap-2 min-w-11 min-h-11"
                  >
                    <LuPrinter size={16} aria-hidden="true" />
                    <span className="lg:hidden font-jakarta text-[9px] uppercase tracking-widest">
                      Print
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="pt-20 border-t border-glass text-center space-y-6">
          <p className="font-jakarta text-[10px] text-white/30 uppercase tracking-[0.4em] leading-relaxed">
            Facing issues with your records? <br />
            Contact our curatorial concierge for white-glove support.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default AcquisitionHistoryPage;
