import { Metadata } from "next";
import Button from "@/components/atoms/Button";
import AuctionCard from "@/components/molecules/AuctionCard";
import { LuCalendar } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Live Auctions | Artora Protocol",
  description:
    "Participate in real-time, high-stakes auctions for curated digital and traditional masterpieces.",
};

const AuctionsPage = () => {
  const upcomingAuctions = [
    {
      title: "The Abstract Protocol",
      date: "2026-01-15",
      displayDate: "Jan 15, 2026",
      lots: "24 Lots",
    },
    {
      title: "Digital Sovereignty",
      date: "2026-01-22",
      displayDate: "Jan 22, 2026",
      lots: "08 Lots",
    },
    {
      title: "Mediterranean Light",
      date: "2026-02-02",
      displayDate: "Feb 02, 2026",
      lots: "15 Lots",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Live Auction Hero */}
      <section
        className="max-w-7xl mx-auto pt-40 pb-20 px-6 space-y-12"
        aria-label="Featured Live Auction"
      >
        <div className="flex items-center gap-4" aria-live="polite">
          <div className="relative flex h-3 w-3">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
              aria-hidden="true"
            ></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
          <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.5em]">
            Live Event In Progress
          </p>
        </div>
        <AuctionCard />
      </section>

      {/* Upcoming List */}
      <section
        className="max-w-7xl mx-auto py-24 px-6 space-y-16"
        aria-labelledby="upcoming-heading"
      >
        <header className="space-y-2 border-b border-glass pb-8">
          <h2 className="text-4xl font-luxury">
            Future <span className="italic text-brand">Engagements.</span>
          </h2>
          <p className="font-jakarta text-[10px] uppercase tracking-widest text-dim">
            Scheduled Curations
          </p>
        </header>

        <ol className="space-y-px bg-surface border border-glass">
          {upcomingAuctions.map((event, idx) => (
            <li key={idx}>
              <div className="group p-10 flex flex-col md:flex-row justify-between items-center gap-8 hover:bg-surface-hover transition-all">
                <div className="flex items-center gap-8">
                  <span
                    className="font-jakarta text-[10px] text-dim"
                    aria-hidden="true"
                  >
                    0{idx + 1}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-luxury text-3xl group-hover:text-brand transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-4 text-dim">
                      <LuCalendar size={14} aria-hidden="true" />
                      <time
                        dateTime={event.date}
                        className="font-jakarta text-[10px] uppercase tracking-widest"
                      >
                        {event.displayDate}
                      </time>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  <p className="font-jakarta text-[10px] uppercase tracking-widest text-dim">
                    {event.lots}
                  </p>
                  <Button
                    title="Set Reminder"
                    ariaLabel={`Set a reminder for ${event.title}`}
                    variant="outline"
                    className="h-10! px-6! text-[9px]!"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="flex justify-center pt-10" aria-hidden="true">
          <div className="w-px h-24 bg-linear-to-b from-brand to-transparent" />
        </div>
      </section>
    </main>
  );
};

export default AuctionsPage;
