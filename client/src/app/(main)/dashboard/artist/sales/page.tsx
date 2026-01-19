import Image from "next/image";
import { cookies } from "next/headers";
import { LuPackage, LuShieldCheck, LuTruck } from "react-icons/lu";
import { BiCheckCircle } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";

// Helper to get status styles
const getStatusConfig = (status: string) => {
  switch (status) {
    case "awaiting_details":
      return {
        label: "Pending Info",
        icon: FiAlertCircle,
        color: "text-brand",
        bg: "bg-brand/10",
        border: "border-brand/50",
      };
    case "created":
      return {
        label: "New Order",
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

const ArtistSalesPage = async () => {
  const cookieStore = await cookies();

  // Fetch Artist Sales
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/artist`,
    {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to load sales ledger.");
  const { orders }: { orders: any[] } = await res.json();

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 md:px-10 bg-black text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-glass pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Artist Records
              </p>
            </div>
            <h1 className="text-6xl md:text-8xl font-luxury">
              Sales <span className="italic text-brand">Ledger.</span>
            </h1>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:w-40 p-4 border border-glass bg-surface/30 text-center">
              <p className="text-[8px] uppercase text-dim tracking-widest mb-1">
                Total Sales
              </p>
              <p className="font-luxury text-2xl">{orders.length}</p>
            </div>
          </div>
        </header>

        {/* Sales List */}
        <div className="grid grid-cols-1 gap-6">
          {orders.length === 0 ? (
            <div className="py-40 text-center border border-dashed border-glass">
              <p className="font-luxury text-2xl text-dim italic">
                No sales recorded in the ledger yet.
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const status = getStatusConfig(order.orderStatus);
              const StatusIcon = status.icon;

              return (
                <article
                  key={order._id}
                  className="relative flex flex-col lg:flex-row items-center justify-between p-8 border border-glass bg-surface/50 transition-all duration-500 gap-8 overflow-hidden hover:border-white/20"
                >
                  {/* Artwork Info */}
                  <div className="flex items-center gap-8 w-full lg:w-1/3">
                    <div className="relative w-28 h-28 shrink-0 border border-glass bg-glass overflow-hidden">
                      <Image
                        src={order.artwork.imageURL}
                        alt={order.artwork.title}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-mono text-[9px] text-white/20 tracking-tighter uppercase">
                        ID: {order._id.slice(-10).toUpperCase()}
                      </p>
                      <h2 className="font-luxury text-3xl tracking-wide">
                        {order.artwork.title}
                      </h2>
                      <p className="font-jakarta text-[10px] text-dim uppercase tracking-[0.2em] italic">
                        Buyer: {order.buyer.firstName} {order.buyer.lastName}
                      </p>
                    </div>
                  </div>

                  {/* Value & Date */}
                  <div className="flex flex-1 justify-between items-center w-full max-w-xl px-4 md:border-x border-glass/10">
                    <div className="space-y-1">
                      <p className="text-[8px] uppercase text-dim tracking-widest font-bold">
                        Sale Amount
                      </p>
                      <p className="font-luxury text-3xl text-white">
                        ₹{order.amount.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="space-y-1 text-right md:text-left">
                      <p className="text-[8px] uppercase text-dim tracking-widest font-bold">
                        Date of Sale
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

                  {/* Status Section */}
                  <div className="w-full lg:w-1/4 flex flex-col items-center lg:items-end gap-4">
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
                    <p className="text-[8px] text-dim uppercase tracking-widest flex items-center gap-2">
                      Order{" "}
                      {order.paymentStatus === "paid"
                        ? "Settled"
                        : "Processing"}
                    </p>
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

export default ArtistSalesPage;
