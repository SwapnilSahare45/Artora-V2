import { Metadata } from "next";
import { LuTrendingUp, LuArrowUpRight, LuArrowDownRight } from "react-icons/lu";
import Button from "@/components/atoms/Button";
import { BiBarChart, BiPieChart } from "react-icons/bi";

export const metadata: Metadata = {
  title: "Market Intelligence | Architect Portal | Artora",
  description:
    "Global marketplace analytics, revenue reconciliation, and trending art movements.",
};

const PlatformAnalyticsPage = () => {
  const kpis = [
    {
      label: "Total Protocol Revenue",
      value: "₹1.28Cr",
      trend: "+14.2%",
      positive: true,
    },
    {
      label: "Active Collectors",
      value: "1,240",
      trend: "+5.1%",
      positive: true,
    },
    {
      label: "High-Water Mark Sale",
      value: "₹18.5L",
      trend: "Winter '26",
      positive: true,
    },
    {
      label: "Avg. Auction Premium",
      value: "22%",
      trend: "-2.4%",
      positive: false,
    },
  ];

  const trendingMovements = [
    {
      name: "Digital Abstraction",
      volume: "₹42.5L",
      liquidity: "High",
      growth: "+18%",
    },
    {
      name: "Neo-Baroque AI",
      volume: "₹28.2L",
      liquidity: "Medium",
      growth: "+32%",
    },
    {
      name: "Traditional Oil",
      volume: "₹18.8L",
      liquidity: "Stable",
      growth: "+4%",
    },
    {
      name: "Minimalist Photo",
      volume: "₹12.4L",
      liquidity: "Low",
      growth: "-2%",
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
                Market Intelligence
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-luxury leading-none tracking-tight">
              Platform <span className="italic text-muted">Analytics.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              title="Generate Audit"
              ariaLabel="Generate a formal protocol audit report"
              variant="outline"
              className="h-14 px-8"
            />
            <div
              className="h-14 w-px bg-glass hidden md:block"
              aria-hidden="true"
            />
            <div className="text-right">
              <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim m-0">
                Last Reconciliation
              </p>
              <p className="font-jakarta text-[10px] uppercase font-bold text-white tracking-widest m-0">
                07 Jan 2026 — 14:00
              </p>
            </div>
          </div>
        </section>

        <section aria-label="Key Performance Indicators">
          <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-surface border border-glass m-0">
            {kpis.map((kpi, i) => (
              <div key={i} className="p-8 space-y-4 group">
                <div className="flex justify-between items-start">
                  <dt className="font-jakarta text-[9px] uppercase tracking-widest text-dim group-hover:text-brand transition-colors">
                    {kpi.label}
                  </dt>
                  {kpi.positive ? (
                    <LuArrowUpRight
                      size={14}
                      className="text-emerald-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <LuArrowDownRight
                      size={14}
                      className="text-red-500"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <dd className="m-0 space-y-1">
                  <h2 className="font-luxury text-4xl">{kpi.value}</h2>
                  <p
                    className={`font-jakarta text-[9px] font-bold uppercase tracking-widest ${
                      kpi.positive ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {kpi.trend}{" "}
                    <span className="text-white/30 font-normal ml-1">
                      vs L30D
                    </span>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          <section
            className="xl:col-span-8 space-y-8"
            aria-labelledby="chart-title"
          >
            <header className="flex justify-between items-center px-2">
              <h3 id="chart-title" className="font-luxury text-2xl italic">
                Protocol Liquidity
              </h3>
              <nav
                className="flex gap-4"
                aria-label="Chart timeframe selection"
              >
                {["1W", "1M", "1Y", "ALL"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-label={`Show ${t} data`}
                    className="font-jakarta text-[9px] text-dim hover:text-brand uppercase tracking-widest font-bold transition-colors min-h-8 px-2"
                  >
                    {t}
                  </button>
                ))}
              </nav>
            </header>

            <div
              className="aspect-video bg-surface border border-glass relative group flex items-end p-8 gap-4"
              role="img"
              aria-label="Bar chart showing platform liquidity growth trends"
            >
              {[40, 70, 45, 90, 65, 80, 50, 85, 100, 75, 60, 95].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 bg-surface-hover group-hover:bg-brand/20 transition-all duration-700 relative"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 pointer-events-none"
                aria-hidden="true"
              >
                <BiBarChart className="text-white/10" size={48} />
                <p className="font-jakarta text-[9px] uppercase tracking-[0.4em] text-white/20">
                  Market Volatility Index
                </p>
              </div>
            </div>
          </section>

          <aside
            className="xl:col-span-4 space-y-12"
            aria-label="Additional market insights"
          >
            <section className="space-y-6">
              <h3 className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold flex items-center gap-3">
                <LuTrendingUp size={14} aria-hidden="true" /> Trending Sectors
              </h3>
              <div className="space-y-4">
                {trendingMovements.map((move, i) => (
                  <article
                    key={i}
                    className="p-5 bg-surface border border-glass flex justify-between items-center group hover:border-brand/20 transition-all"
                  >
                    <div className="space-y-1">
                      <h4 className="font-luxury text-lg group-hover:text-brand transition-colors m-0">
                        {move.name}
                      </h4>
                      <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim m-0">
                        Liquidity: {move.liquidity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-jakarta text-xs font-bold m-0">
                        {move.volume}
                      </p>
                      <p className="font-jakarta text-[8px] text-emerald-500 uppercase font-bold m-0">
                        {move.growth}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="p-8 bg-brand/5 border border-brand/20 space-y-6">
              <div className="flex items-center gap-3 text-brand">
                <BiPieChart size={18} aria-hidden="true" />
                <p className="font-jakarta text-[10px] font-bold uppercase tracking-widest">
                  Global Distribution
                </p>
              </div>
              <dl className="space-y-4 m-0">
                {[
                  { country: "India", share: "42%" },
                  { country: "Europe", share: "28%" },
                  { country: "UAE", share: "15%" },
                  { country: "Other", share: "15%" },
                ].map((loc, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between font-jakarta text-[9px] uppercase tracking-widest text-dim">
                      <dt>{loc.country}</dt>
                      <dd className="m-0">{loc.share}</dd>
                    </div>
                    <div className="h-0.5 w-full bg-glass" aria-hidden="true">
                      <div
                        className="h-full bg-brand"
                        style={{ width: loc.share }}
                      />
                    </div>
                  </div>
                ))}
              </dl>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default PlatformAnalyticsPage;
