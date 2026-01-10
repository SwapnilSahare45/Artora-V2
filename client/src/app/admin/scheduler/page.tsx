import { Metadata } from "next";
import Button from "@/components/atoms/Button";
import {
  LuGavel,
  LuCalendar,
  LuClock,
  LuPlus,
  LuLayers,
  LuChevronRight,
  LuLayoutList,
} from "react-icons/lu";

export const metadata: Metadata = {
  title: "Auction Scheduler | Architect Portal | Artora",
  description:
    "Temporal coordination of global art exhibitions and lot sequencing.",
};

const AuctionSchedulerPage = () => {
  const scheduledExhibitions = [
    {
      id: "EXH-2026-01",
      title: "The Winter Modernism",
      status: "Live",
      date: "2026-01-07",
      displayDate: "Jan 07, 2026",
      lots: 12,
      valuation: "₹45.5L",
    },
    {
      id: "EXH-2026-02",
      title: "Digital Sovereignty",
      status: "Scheduled",
      date: "2026-01-22",
      displayDate: "Jan 22, 2026",
      lots: 8,
      valuation: "₹28.2L",
    },
    {
      id: "EXH-2026-03",
      title: "Mediterranean Light",
      status: "Draft",
      date: "2026-02-12",
      displayDate: "Feb 12, 2026",
      lots: 15,
      valuation: "₹62.0L",
    },
  ];

  return (
    <main className="min-h-screen pt-12 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        <section
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-glass pb-12"
          aria-label="Page Header"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" aria-hidden="true" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Temporal Coordination
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-luxury leading-none tracking-tight">
              Auction <span className="italic text-muted">Scheduler.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <Button
              title="Create Exhibition"
              ariaLabel="Create a new art exhibition"
              icon={<LuPlus size={18} aria-hidden="true" />}
              className="h-16 px-10 shadow-neon flex-1 lg:flex-none"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          <section
            className="xl:col-span-8 space-y-8"
            aria-labelledby="timeline-heading"
          >
            <header className="flex justify-between items-center px-2">
              <h2 id="timeline-heading" className="font-luxury text-2xl italic">
                Active Timeline
              </h2>
              <div className="flex items-center gap-4 text-dim">
                <LuLayoutList size={18} aria-hidden="true" />
                <span className="font-jakarta text-[10px] uppercase tracking-widest font-bold">
                  Chronological View
                </span>
              </div>
            </header>

            <div className="space-y-4" role="list">
              {scheduledExhibitions.map((exh, idx) => (
                <article
                  key={idx}
                  role="listitem"
                  className="group relative flex flex-col md:flex-row items-center justify-between p-8 bg-surface border border-glass hover:border-brand/30 transition-all duration-700 gap-8"
                >
                  {/* Status Indicator Bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      exh.status === "Live"
                        ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                        : exh.status === "Scheduled"
                        ? "bg-brand shadow-neon"
                        : "bg-surface-hover"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-10 flex-1">
                    <div className="space-y-1 min-w-30">
                      <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                        {exh.id}
                      </p>
                      <div className="flex items-center gap-2">
                        <LuCalendar
                          size={14}
                          className="text-brand"
                          aria-hidden="true"
                        />
                        <time
                          dateTime={exh.date}
                          className="font-jakarta text-xs text-white uppercase tracking-widest font-bold"
                        >
                          {exh.displayDate}
                        </time>
                      </div>
                    </div>

                    <div
                      className="h-12 w-px bg-glass hidden md:block"
                      aria-hidden="true"
                    />

                    <div className="space-y-1">
                      <h3 className="font-luxury text-3xl group-hover:text-brand transition-colors m-0">
                        {exh.title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-[8px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 border ${
                            exh.status === "Live"
                              ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
                              : exh.status === "Scheduled"
                              ? "border-brand/30 text-brand bg-brand/5"
                              : "border-white/20 text-dim"
                          }`}
                        >
                          {exh.status}
                        </span>
                        <p className="font-jakarta text-[10px] text-dim uppercase tracking-widest m-0">
                          {exh.lots} Masterpieces Listed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-12 w-full md:w-auto border-t md:border-t-0 border-glass pt-6 md:pt-0">
                    <dl className="text-right m-0">
                      <dt className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                        Estimated Pool
                      </dt>
                      <dd className="font-luxury text-2xl m-0">
                        {exh.valuation}
                      </dd>
                    </dl>
                    <button
                      type="button"
                      aria-label={`View schedule details for ${exh.title}`}
                      className="p-4 border border-white/10 text-dim hover:text-white hover:border-brand transition-all focus:ring-2 focus:ring-brand focus:outline-none"
                    >
                      <LuChevronRight size={20} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside
            className="xl:col-span-4 space-y-8"
            aria-labelledby="pool-heading"
          >
            <header className="space-y-2">
              <h2
                id="pool-heading"
                className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold"
              >
                Curation Pool
              </h2>
              <p className="font-jakarta text-[9px] text-dim uppercase tracking-widest">
                Verified Artworks Available for Scheduling
              </p>
            </header>

            <div className="p-8 border border-glass bg-surface space-y-8">
              <div className="space-y-4" role="list">
                {[
                  {
                    title: "Sovereign Flow",
                    artist: "Swapnil Sahare",
                    val: "₹3.1L",
                  },
                  {
                    title: "Ethereal Echo",
                    artist: "Elena Vasquez",
                    val: "₹1.8L",
                  },
                  {
                    title: "The Silent Grid",
                    artist: "Julian K.",
                    val: "₹2.4L",
                  },
                ].map((art, i) => (
                  <div
                    key={i}
                    role="listitem"
                    draggable
                    className="flex items-center justify-between p-4 bg-surface-hover border border-glass hover:border-brand/20 transition-all cursor-move group"
                  >
                    <div className="flex items-center gap-4">
                      <LuLayers
                        size={14}
                        className="text-dim group-hover:text-brand"
                        aria-hidden="true"
                      />
                      <div className="space-y-0.5">
                        <h3 className="font-luxury text-sm m-0">{art.title}</h3>
                        <p className="font-jakarta text-[8px] text-dim uppercase m-0">
                          {art.artist}
                        </p>
                      </div>
                    </div>
                    <p className="font-jakarta text-[9px] font-bold">
                      {art.val}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-glass space-y-4">
                <div className="flex items-center gap-3 text-dim">
                  <LuClock size={16} aria-hidden="true" />
                  <p className="font-jakarta text-[9px] uppercase tracking-widest">
                    Auto-Sequencing Active
                  </p>
                </div>
                <p className="font-jakarta text-[10px] text-muted leading-relaxed m-0">
                  Drag masterpieces into the timeline or an existing exhibition
                  to update global lots.
                </p>
              </div>
            </div>

            <section
              className="p-8 bg-brand/5 border border-brand/20 space-y-4"
              aria-label="System Notice"
            >
              <div className="flex items-center gap-3 text-brand">
                <LuGavel size={18} aria-hidden="true" />
                <h3 className="font-jakarta text-[10px] font-bold uppercase tracking-widest m-0">
                  Protocol Notice
                </h3>
              </div>
              <p className="font-jakarta text-[11px] text-muted leading-relaxed uppercase tracking-wider m-0">
                Changing exhibition dates will trigger automated system alerts
                to all registered bidders and participating artists.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default AuctionSchedulerPage;
