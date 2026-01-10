import { Metadata } from "next";
import Button from "@/components/atoms/Button";
import StudioCard from "@/components/molecules/StudioCard";
import { LuPlus } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Studio Inventory | Artist Dashboard | Artora",
  description:
    "Manage your private art collection, track moderation status, and list pieces for upcoming exhibitions.",
};

const ArtistGalleryPage = () => {
  const inventoryStats = [
    { label: "Total Assets", value: "32" },
    { label: "In Exhibition", value: "12" },
    { label: "Studio Drafts", value: "08" },
    { label: "Total Valuation", value: "₹18.4L" },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-glass pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" aria-hidden="true" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Inventory Management
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-luxury leading-none tracking-tight">
              Studio <span className="italic text-muted">Inventory.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <Button
              title="Deposit New Piece"
              ariaLabel="Deposit a new artwork into the vault"
              icon={<LuPlus size={18} aria-hidden="true" />}
              className="h-16 px-10 shadow-neon flex-1 lg:flex-none"
            />
          </div>
        </section>

        {/* Stats Overview */}
        <section aria-label="Inventory Statistics">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-surface border border-glass">
            {inventoryStats.map((stat, i) => (
              <div key={i} className="p-8 space-y-2">
                <dt className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                  {stat.label}
                </dt>
                <dd className="font-luxury text-3xl m-0">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Filter */}
        <section className="flex flex-col md:flex-row justify-between items-center gap-6 py-4 border-b border-glass">
          <nav
            className="flex items-center gap-8 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 no-scrollbar"
            aria-label="Filter inventory by status"
          >
            {["All Pieces", "Live", "Pending", "Sold", "Private"].map(
              (filter, i) => (
                <button
                  key={i}
                  type="button"
                  className={`whitespace-nowrap font-jakarta text-[10px] uppercase tracking-[0.2em] transition-colors min-h-11 px-2 ${
                    i === 0
                      ? "text-brand font-bold border-b border-brand"
                      : "text-dim hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </nav>
        </section>

        {/* Inventory */}
        <section aria-label="Artworks Grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { status: "Live", title: "Digital Renaissance", price: "₹2,500" },
              {
                status: "Pending",
                title: "Abstract Geometry",
                price: "₹4,000",
              },
              { status: "Private", title: "The Looking Eye", price: "₹2,200" },
              { status: "Sold", title: "Winter Modernism", price: "₹8,500" },
              { status: "Live", title: "Sovereign Flow", price: "₹3,100" },
              { status: "Private", title: "Ethereal Echo", price: "₹1,800" },
            ].map((item, idx) => (
              <StudioCard
                key={idx}
                status={item.status as any}
                title={item.title}
                price={item.price}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ArtistGalleryPage;
