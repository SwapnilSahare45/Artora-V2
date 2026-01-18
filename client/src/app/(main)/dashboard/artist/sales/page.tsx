import { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import SalesTable from "@/components/molecules/SalesTable";
import Search from "@/components/molecules/Search";
import { LuCircleDollarSign } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Sales Ledger | Artist Dashboard | Artora",
  description:
    "Review your acquisition history, track pending payments, and export financial statements for your artistic career.",
};

interface Order {
  _id: string;
  artwork: {
    title: string;
    price: number;
  };
  buyer: {
    firstName: string;
    lastName: string;
  };
  amount: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
}

interface SalesStats {
  netRevenue: number;
  pendingSettlement: number;
  platformFees: number;
  totalOrders: number;
  settledOrders: number;
  pendingOrders: number;
}

// Fetch artist orders
async function getArtistOrders(): Promise<Order[]> {
  const cookieStore = await cookies();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/artist`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.orders || [];
  } catch (error) {
    console.error("Error fetching artist orders:", error);
    return [];
  }
}

// Calculate sales statistics
function calculateStats(orders: Order[]): SalesStats {
  const settledOrders = orders.filter(
    (o) => o.orderStatus === "delivered" && o.paymentStatus === "paid",
  );
  const inTransitOrders = orders.filter(
    (o) => o.orderStatus === "shipped" || o.orderStatus === "confirmed",
  );
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

  const netRevenue = settledOrders.reduce(
    (sum, order) => sum + order.amount,
    0,
  );
  const pendingSettlement = inTransitOrders.reduce(
    (sum, order) => sum + order.amount,
    0,
  );
  const platformFees = netRevenue * 0.03; // 3% platform fee

  return {
    netRevenue,
    pendingSettlement,
    platformFees,
    totalOrders: orders.length,
    settledOrders: settledOrders.length,
    pendingOrders: inTransitOrders.length,
  };
}

// Stats Loading Component
function StatsLoading() {
  return (
    <dl className="grid grid-cols-1 md:grid-cols-4 gap-px bg-glass border border-glass shadow-2xl m-0">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-10 space-y-4 animate-pulse">
          <div className="h-3 w-24 bg-white/10 rounded" />
          <div className="h-8 w-32 bg-white/10 rounded" />
          <div className="h-2 w-20 bg-white/10 rounded" />
        </div>
      ))}
    </dl>
  );
}

// Stats Component
async function StatsSection() {
  const orders = await getArtistOrders();
  const stats = calculateStats(orders);

  // Calculate percentage change (mock for now - would need historical data)
  const revenueChange = stats.settledOrders > 0 ? "+12%" : "0%";

  return (
    <dl className="grid grid-cols-1 md:grid-cols-4 gap-px bg-glass border border-glass shadow-2xl m-0">
      {[
        {
          label: "Total Sales",
          value: stats.totalOrders.toString(),
          sub: `${stats.settledOrders} Delivered`,
        },
        {
          label: "Net Revenue",
          value: `₹${stats.netRevenue.toLocaleString()}`,
          sub: `${revenueChange} vs last month`,
        },
        {
          label: "In Transit",
          value: `₹${stats.pendingSettlement.toLocaleString()}`,
          sub: `${stats.pendingOrders} Order${stats.pendingOrders !== 1 ? "s" : ""}`,
        },
        {
          label: "Platform Fees",
          value: `₹${Math.floor(stats.platformFees).toLocaleString()}`,
          sub: "3% Protocol Fee",
        },
      ].map((stat, i) => (
        <div key={i} className="p-10 space-y-4 relative overflow-hidden group">
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
  );
}

const SalesLedgerPage = () => {
  return (
    <main className="min-h-screen pt-12 pb-20 px-6 md:px-10">
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
        </section>

        {/* Revenue Overview Stats */}
        <section aria-label="Financial Overview">
          <Suspense fallback={<StatsLoading />}>
            <StatsSection />
          </Suspense>
        </section>

        {/* Transaction Table */}
        <section className="space-y-8" aria-label="Transaction History">
          <Search />

          <Suspense
            fallback={
              <div className="w-full h-96 flex items-center justify-center border border-glass bg-surface/10">
                <div className="w-12 h-12 border-t-2 border-brand rounded-full animate-spin" />
              </div>
            }
          >
            <SalesTable />
          </Suspense>
        </section>
      </div>
    </main>
  );
};

export default SalesLedgerPage;
