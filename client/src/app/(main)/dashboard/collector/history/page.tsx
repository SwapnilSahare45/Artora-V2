import { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import Button from "@/components/atoms/Button";
import {
  LuDownload,
  LuFileSearch,
  LuPrinter,
  LuShieldCheck,
} from "react-icons/lu";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Archive | Acquisition History | Artora",
};

type Order = {
  _id: string;
  amount: number;
  createdAt: string;
  artwork: {
    title: string;
    imageURL: string;
    artist: {
      firstName: string;
      lastName: string;
    };
  };
};

const AcquisitionHistoryPage = async () => {
  const cookieStore = await cookies();

  // Fetch all orders placed by the logged-in collector
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/buyer`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      // Disable caching to get latest data
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to load acquisition archive.");
  }

  const { orders }: { orders: Order[] } = await res.json();

  return (
    <main className="min-h-screen pt-22 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-glass pb-12">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Collection Records
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-luxury">
              The <span className="italic text-brand">Archive.</span>
            </h1>
          </header>
        </section>

        {/* Orders */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            /* Empty State */
            <div className="border border-glass bg-surface p-20 text-center space-y-6">
              <div className="mx-auto w-14 h-px bg-brand" />

              <h2 className="font-luxury text-4xl">
                Your <span className="italic text-muted">Archive</span> is
                Empty.
              </h2>

              <p className="font-jakarta text-[11px] uppercase tracking-[0.35em] text-dim max-w-md mx-auto leading-relaxed">
                No acquisitions have been secured in your vault yet. Once you
                acquire artworks through auctions or direct purchase, they will
                appear here permanently.
              </p>

              <div className="pt-6 flex justify-center">
                <Link href={"/auction"}>
                  <Button title="Explore Live Auctions" variant="outline" />
                </Link>
              </div>
            </div>
          ) : (
            orders.map((order) => (
              <article
                key={order._id}
                className="group flex flex-col lg:flex-row items-center justify-between p-6 bg-surface border border-glass hover:bg-surface-hover transition-all gap-8"
              >
                <div className="flex items-center gap-8">
                  <div className="relative w-20 h-20 border border-glass">
                    <Image
                      src={order.artwork.imageURL}
                      alt={order.artwork.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-mono text-[8px] text-white/30 uppercase">
                      {order._id.slice(-8)}
                    </p>
                    <h2 className="font-luxury text-2xl">
                      {order.artwork.title}
                    </h2>
                    <p className="font-jakarta text-[10px] text-dim uppercase">
                      {order.artwork.artist.firstName}{" "}
                      {order.artwork.artist.lastName}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-12 flex-1 max-w-2xl">
                  <div>
                    <p className="text-[8px] uppercase text-dim">Acquired On</p>
                    <time className="text-xs">
                      {new Date(order.createdAt).toDateString()}
                    </time>
                  </div>

                  <div>
                    <p className="text-[8px] uppercase text-dim">Valuation</p>
                    <p className="font-luxury text-xl">
                      ₹{order.amount.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <LuShieldCheck size={12} className="text-brand" />
                    <p className="text-[9px] uppercase text-muted">
                      Secured in Vault
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="p-4 border border-white/10">
                    <LuDownload size={16} />
                  </button>
                  <button className="p-4 border border-white/10">
                    <LuFileSearch size={16} />
                  </button>
                  <button className="p-4 border border-white/10">
                    <LuPrinter size={16} />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default AcquisitionHistoryPage;
