import Image from "next/image";
import { cookies } from "next/headers";
import Button from "@/components/atoms/Button";
import { LuShieldCheck, LuPackage, LuTruck } from "react-icons/lu";
import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";
import { BiCheckCircle } from "react-icons/bi";

// Helper to get status styles
const getStatusConfig = (status: string) => {
  switch (status) {
    case "awaiting_details":
      return {
        label: "Action Required",
        icon: FiAlertCircle,
        color: "text-brand",
        bg: "bg-brand/10",
        border: "border-brand/50",
      };
    case "created":
      return {
        label: "Order Placed",
        icon: LuPackage,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/30",
      };
    case "confirmed":
      return {
        label: "Authenticating",
        icon: LuShieldCheck,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/30",
      };
    case "shipped":
      return {
        label: "In Transit",
        icon: LuTruck,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/30",
      };
    case "delivered":
      return {
        label: "Delivered",
        icon: BiCheckCircle,
        color: "text-white",
        bg: "bg-white/10",
        border: "border-white/30",
      };
    default:
      return {
        label: status,
        icon: FiAlertCircle,
        color: "text-dim",
        bg: "bg-glass",
        border: "border-glass",
      };
  }
};

const AcquisitionHistoryPage = async () => {
  const cookieStore = await cookies();

  // Fetch collector order history
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/buyer`,
    {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store", //Always get fresh data
    },
  );

  if (!res.ok) throw new Error("Failed to load archive.");
  const { orders }: { orders: any[] } = await res.json();

  // Sort
  // Awaiting orders getting on top
  const sortedOrders = [...orders].sort((a, b) => {
    if (
      a.orderStatus === "awaiting_details" &&
      b.orderStatus !== "awaiting_details"
    )
      return -1;
    if (
      a.orderStatus !== "awaiting_details" &&
      b.orderStatus === "awaiting_details"
    )
      return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Count awating orders
  const pendingCount = orders.filter(
    (o) => o.orderStatus === "awaiting_details",
  ).length;

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 md:px-10 bg-black text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-glass pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Vault Records
              </p>
            </div>
            <h1 className="text-6xl md:text-8xl font-luxury">
              The <span className="italic text-brand">Archive.</span>
            </h1>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:w-32 p-4 border border-glass bg-surface/30 text-center">
              <p className="text-[8px] uppercase text-dim tracking-widest mb-1">
                Total Assets
              </p>
              <p className="font-luxury text-2xl">{orders.length}</p>
            </div>
            {pendingCount > 0 && (
              <div className="flex-1 md:w-32 p-4 border border-brand/50 bg-brand/5 text-center animate-pulse">
                <p className="text-[8px] uppercase text-brand tracking-widest mb-1">
                  Pending
                </p>
                <p className="font-luxury text-2xl text-brand">
                  {pendingCount}
                </p>
              </div>
            )}
          </div>
        </header>

        {/* Orders List */}
        <div className="grid grid-cols-1 gap-6">
          {sortedOrders.length === 0 ? (
            <div className="py-40 text-center border border-dashed border-glass">
              <p className="font-luxury text-2xl text-dim italic">
                The vault is currently empty.
              </p>
            </div>
          ) : (
            sortedOrders.map((order) => {
              const isPending = order.orderStatus === "awaiting_details";
              const status = getStatusConfig(order.orderStatus);
              const StatusIcon = status.icon;

              return (
                <article
                  key={order._id}
                  className={`relative flex flex-col lg:flex-row items-center justify-between p-8 border transition-all duration-500 gap-8 overflow-hidden ${
                    isPending
                      ? "bg-brand/4 border-brand shadow-[0_0_30px_rgba(var(--brand-rgb),0.1)] scale-[1.02] z-10"
                      : "bg-surface/50 border-glass hover:border-white/20"
                  }`}
                >
                  {/* Status Bar */}
                  {isPending && (
                    <div className="absolute top-0 left-0 w-0.75 h-full bg-brand shadow-[0_0_15px_#C5A358]" />
                  )}

                  {/* Artwork Info */}
                  <div className="flex flex-col md:flex-row md:items-center gap-8 w-full lg:w-1/3">
                    <div className="relative w-full md:w-28 h-28 shrink-0 border border-glass bg-glass overflow-hidden">
                      <Image
                        src={order.artwork.imageURL}
                        alt={order.artwork.title}
                        fill
                        className={`object-cover transition-all duration-700 ${!isPending && "grayscale hover:grayscale-0"}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-mono text-[9px] text-white/20 tracking-tighter uppercase">
                        Ref: {order._id.slice(-10).toUpperCase()}
                      </p>
                      <h2 className="font-luxury text-3xl tracking-wide">
                        {order.artwork.title}
                      </h2>
                      <p className="font-jakarta text-[10px] text-dim uppercase tracking-[0.2em] italic">
                        {order.artwork.artist.firstName}{" "}
                        {order.artwork.artist.lastName}
                      </p>
                    </div>
                  </div>

                  {/* Value & Date */}
                  <div className="flex flex-1 justify-between items-center w-full max-w-xl px-4 md:border-x border-glass/10">
                    <div className="space-y-1">
                      <p className="text-[8px] uppercase text-dim tracking-widest font-bold">
                        Valuation
                      </p>
                      <p
                        className={`font-luxury text-3xl ${isPending ? "text-brand" : "text-white"}`}
                      >
                        ₹{order.amount.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="space-y-1 text-right md:text-left">
                      <p className="text-[8px] uppercase text-dim tracking-widest font-bold">
                        Acquired On
                      </p>
                      <p className="font-jakarta text-[11px] uppercase tracking-tighter text-white/80">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Action / Status Section */}
                  <div className="w-full lg:w-1/4 flex flex-col items-center lg:items-end gap-4">
                    {isPending ? (
                      <Link
                        href={`/checkout/${order.artwork._id}`}
                        className="w-full"
                      >
                        <Button
                          title="Finalize Acquisition"
                          className="w-full h-16 text-[11px]! tracking-[0.3em]! shadow-brand/20 hover:shadow-brand/40 animate-pulse"
                        />
                      </Link>
                    ) : (
                      <div
                        className={`flex items-center gap-3 px-8 py-4 border rounded-none w-full lg:w-auto justify-center ${status.bg} ${status.border}`}
                      >
                        <StatusIcon className={status.color} size={18} />
                        <span
                          className={`font-jakarta text-[10px] font-bold uppercase tracking-[0.2em] ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {isPending ? (
                        <p className="text-[8px] text-brand/80 uppercase tracking-widest font-bold animate-pulse">
                          Awaiting Shipping Info
                        </p>
                      ) : (
                        <p className="text-[8px] text-dim uppercase tracking-widest flex items-center gap-2">
                          <LuShieldCheck
                            size={10}
                            className="text-emerald-500"
                          />
                          Ownership Secured
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
};

export default AcquisitionHistoryPage;
