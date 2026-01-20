import { Metadata } from "next";
import Button from "@/components/atoms/Button";
import AuctionCard from "@/components/molecules/AuctionCard";
import { LuCalendar } from "react-icons/lu";
import Link from "next/link";
import { cookies } from "next/headers";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Live Auctions | Artora Protocol",
  description:
    "Participate in real-time, high-stakes auctions for curated digital and traditional masterpieces.",
};

type Auction = {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  status: "scheduled" | "live";
  artworkIds: any[];
};

const AuctionsPage = async () => {
  const cookieStore = await cookies();

  // Fetch all auctions
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auctions/all`,
    {
      headers: {
        // Pass cookies to backend for auth
        Cookie: cookieStore.toString(),
      },
      // Disable caching to always get latest data
      cache: "no-store",
    },
  );

  const data = await res.json();
  const auctions: Auction[] = data?.auctions || [];

  // Filter auctions that are currently live
  const liveAuction = auctions.filter((a) => a.status === "live");

  // Filter auctions that are scheduled for future
  const upcomingAuctions = auctions.filter((a) => a.status === "scheduled");

  return (
    <main className="min-h-screen">
      {/* Live Auction Hero */}
      {liveAuction && (
        <section className="max-w-7xl mx-auto pt-20 pb-20 px-6 space-y-12">
          <div className="flex items-center gap-4">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </div>
            <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.5em]">
              Live Event In Progress
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {liveAuction.map((auction) => (
              <div key={auction._id} className="space-y-12">
                <AuctionCard auction={auction}>
                  <Link href={`/auctions/${auction._id}`}>
                    <Button title="Join Auction" className="h-16" />
                  </Link>
                </AuctionCard>
                <div className="h-px bg-glass" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Auctions */}
      <section className="max-w-7xl mx-auto md:pb-24 px-6 space-y-16">
        <div className="flex justify-center pt-10">
          <div className="w-px h-24 bg-linear-to-t from-brand to-transparent" />
        </div>

        <header className="space-y-2 border-b border-glass pb-8">
          <h2 className="text-4xl font-luxury">
            Future <span className="italic text-brand">Engagements.</span>
          </h2>
          <p className="font-jakarta text-[10px] uppercase tracking-widest text-dim">
            Scheduled Curations
          </p>
        </header>

        <ol className="space-y-px bg-surface border border-glass">
          {upcomingAuctions.map((auction, idx) => (
            <li key={auction._id}>
              <div className="group p-10 flex flex-col md:flex-row justify-between items-center gap-8 hover:bg-surface-hover transition-all">
                <div className="flex items-center gap-8">
                  <span className="font-jakarta text-[10px] text-dim">
                    0{idx + 1}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-luxury text-3xl group-hover:text-brand transition-colors">
                      {auction.title}
                    </h3>
                    <div className="flex items-center gap-4 text-dim">
                      <LuCalendar size={14} />
                      <time
                        dateTime={auction.startDate}
                        className="font-jakarta text-[10px] uppercase tracking-widest"
                      >
                        {format(new Date(auction.startDate), "PPP p")}
                      </time>
                    </div>
                  </div>
                </div>

                <p className="font-jakarta text-[10px] uppercase tracking-widest text-dim">
                  {auction.artworkIds.length} Lots
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="flex justify-center pt-10">
          <div className="w-px h-24 bg-linear-to-b from-brand to-transparent" />
        </div>
      </section>
    </main>
  );
};

export default AuctionsPage;
