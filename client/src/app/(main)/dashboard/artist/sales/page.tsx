import { Metadata } from "next";
import Button from "@/components/atoms/Button";
import {
  LuDownload,
  LuArrowUpRight,
  LuSearch,
  LuFilter,
  LuCircleDollarSign,
} from "react-icons/lu";
import Search from "@/components/molecules/Search";

export const metadata: Metadata = {
  title: "Sales Ledger | Artist Dashboard | Artora",
  description:
    "Review your acquisition history, track pending payments, and export financial statements for your artistic career.",
};

const SalesLedgerPage = () => {
  const salesData = [
    {
      id: "ORD-99234",
      artwork: "Digital Renaissance",
      collector: "Adrian M. (Paris)",
      date: "Dec 28, 2025",
      amount: "₹2,50,000",
      status: "Settled",
    },
    {
      id: "ORD-99102",
      artwork: "The Looking Eye",
      collector: "Vault 42 (Dubai)",
      date: "Dec 22, 2025",
      amount: "₹4,20,000",
      status: "In Transit",
    },
    {
      id: "ORD-99088",
      artwork: "Sovereign Flow",
      collector: "Anonymous #4",
      date: "Dec 15, 2025",
      amount: "₹1,85,000",
      status: "Settled",
    },
    {
      id: "ORD-98991",
      artwork: "Ethereal Echo",
      collector: "Julian K. (Nagpur)",
      date: "Dec 04, 2025",
      amount: "₹95,000",
      status: "Processing",
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
                Financial Protocol
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-luxury leading-none tracking-tight">
              Sales <span className="italic text-muted">Ledger.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <Button
              title="Download Statement"
              ariaLabel="Download your financial statement as a PDF"
              variant="outline"
              icon={<LuDownload size={16} aria-hidden="true" />}
              className="h-14 px-8 flex-1 lg:flex-none"
            />
          </div>
        </section>

        {/* Revenue Overview Stats */}
        <section aria-label="Financial Overview">
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-px bg-glass border border-glass shadow-2xl m-0">
            {[
              {
                label: "Net Revenue",
                value: "₹9,50,000",
                sub: "+12% vs last month",
              },
              {
                label: "Pending Settlement",
                value: "₹95,000",
                sub: "1 Active Transaction",
              },
              {
                label: "Platform Royalty Fees",
                value: "₹28,500",
                sub: "Fixed 3% Protocol Fee",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-10 space-y-4 relative overflow-hidden group"
              >
                <div
                  className="absolute -right-4 -bottom-4 text-white/2 group-hover:text-brand/5 transition-colors duration-700"
                  aria-hidden="true"
                >
                  <LuCircleDollarSign size={120} />
                </div>
                <dt className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                  {stat.label}
                </dt>
                <dd className="m-0 space-y-1">
                  <p className="font-luxury text-4xl">{stat.value}</p>
                  <p className="font-jakarta text-[8px] uppercase tracking-widest text-brand/70 font-bold">
                    {stat.sub}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Transaction Table */}
        <section className="space-y-8" aria-label="Transaction History">
          {/* placeholder="Filter by order ID or artwork..." */}
          <Search />

          <div className="w-full overflow-x-auto border border-glass bg-surface/10">
            <table className="w-full text-left border-collapse min-w-200">
              <thead>
                <tr className="border-b border-white/20 bg-surface">
                  <th
                    scope="col"
                    className="p-6 font-jakarta text-[9px] uppercase tracking-widest text-dim"
                  >
                    Transaction ID
                  </th>
                  <th
                    scope="col"
                    className="p-6 font-jakarta text-[9px] uppercase tracking-widest text-dim"
                  >
                    Artwork Asset
                  </th>
                  <th
                    scope="col"
                    className="p-6 font-jakarta text-[9px] uppercase tracking-widest text-dim"
                  >
                    Acquired By
                  </th>
                  <th
                    scope="col"
                    className="p-6 font-jakarta text-[9px] uppercase tracking-widest text-dim"
                  >
                    Valuation
                  </th>
                  <th
                    scope="col"
                    className="p-6 font-jakarta text-[9px] uppercase tracking-widest text-dim"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="p-6 font-jakarta text-[9px] uppercase tracking-widest text-dim text-right"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((order, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-glass hover:bg-surface-hover transition-all group"
                  >
                    <td className="p-6 font-mono text-[10px] text-muted">
                      {order.id}
                    </td>
                    <td className="p-6">
                      <p className="font-luxury text-lg group-hover:text-brand transition-colors m-0">
                        {order.artwork}
                      </p>
                      <p className="text-[8px] font-jakarta text-dim uppercase tracking-tighter mt-1 m-0">
                        {order.date}
                      </p>
                    </td>
                    <td className="p-6 font-jakarta text-xs text-muted">
                      {order.collector}
                    </td>
                    <td className="p-6 font-luxury text-xl">{order.amount}</td>
                    <td className="p-6">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest border ${
                          order.status === "Settled"
                            ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
                            : order.status === "In Transit"
                            ? "border-brand/30 text-brand bg-brand/5"
                            : "border-white/20 text-white/50 bg-white/5"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            order.status === "Settled"
                              ? "bg-emerald-400"
                              : "bg-brand"
                          }`}
                          aria-hidden="true"
                        />
                        {order.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <button
                        type="button"
                        aria-label={`View details for transaction ${order.id}`}
                        className="w-11 h-11 inline-flex items-center justify-center text-dim hover:text-white border border-transparent hover:border-white/10 transition-all rounded-none"
                      >
                        <LuArrowUpRight size={18} aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SalesLedgerPage;
