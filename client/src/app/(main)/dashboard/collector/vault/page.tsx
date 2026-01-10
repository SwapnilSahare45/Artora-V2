import { Metadata } from "next";
import Button from "@/components/atoms/Button";
import VaultCard from "@/components/molecules/VaultCard";
import {
  LuShieldCheck,
  LuTrendingUp,
  LuHistory,
  LuLayoutGrid,
} from "react-icons/lu";

export const metadata: Metadata = {
  title: "The Vault | Collector Dashboard | Artora",
  description:
    "Secure private gallery housing your acquired masterpieces and immutable provenance records.",
};

const CollectorVaultPage = () => {
  const portfolioStats = [
    {
      label: "Acquired Assets",
      value: "12",
      icon: <LuLayoutGrid size={14} aria-hidden="true" />,
    },
    {
      label: "Portfolio Valuation",
      value: "₹24.5L",
      icon: <LuTrendingUp size={14} aria-hidden="true" />,
    },
    {
      label: "Provenance Records",
      value: "100%",
      icon: <LuShieldCheck size={14} aria-hidden="true" />,
    },
    {
      label: "Last Acquisition",
      value: "8 Days Ago",
      icon: <LuHistory size={14} aria-hidden="true" />,
    },
  ];

  return (
    <main className="min-h-screen pt-22 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-glass pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" aria-hidden="true" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Private Collection
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-luxury leading-none tracking-tight">
              The <span className="italic text-muted">Vault.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <Button
              title="Marketplace"
              ariaLabel="Navigate to the public marketplace"
              variant="outline"
              className="h-14 px-8 flex-1 lg:flex-none"
            />
            <div
              className="h-14 w-px bg-glass hidden md:block"
              aria-hidden="true"
            />
            <Button
              title="Acquisition History"
              ariaLabel="View your past masterpiece acquisitions"
              className="h-14 px-10 flex-1 lg:flex-none"
            />
          </div>
        </section>
        <section aria-label="Portfolio summary metrics">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-surface border border-glass shadow-2xl m-0">
            {portfolioStats.map((stat, i) => (
              <div
                key={i}
                className="p-8 space-y-3 relative group overflow-hidden"
              >
                <div className="flex items-center gap-2 text-brand">
                  {stat.icon}
                  <dt className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                    {stat.label}
                  </dt>
                </div>
                <dd className="m-0 font-luxury text-3xl relative z-10">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section
          className="flex justify-between items-center py-6 border-b border-glass"
          aria-label="Vault organization"
        >
          <h2 className="font-luxury text-2xl italic">Current Holdings</h2>
        </section>

        <section aria-label="Masterpiece collection grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Digital Renaissance",
                artist: "Swapnil Sahare",
                price: "₹2.5L",
                date: "Dec 2025",
              },
              {
                title: "The Looking Eye",
                artist: "Elena Vasquez",
                price: "₹4.2L",
                date: "Nov 2025",
              },
              {
                title: "Sovereign Flow",
                artist: "Swapnil Sahare",
                price: "₹1.8L",
                date: "Oct 2025",
              },
              {
                title: "Abstract Geometry",
                artist: "Digital Architect",
                price: "₹3.1L",
                date: "Sept 2025",
              },
            ].map((item, idx) => (
              <VaultCard
                key={idx}
                title={item.title}
                artist={item.artist}
                price={item.price}
                date={item.date}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CollectorVaultPage;
