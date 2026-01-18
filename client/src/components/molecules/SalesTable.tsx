"use client";

import { useEffect, useState } from "react";
import { LuArrowUpRight, LuPackage } from "react-icons/lu";
import Link from "next/link";

interface Order {
  _id: string;
  artwork: {
    title: string;
    category?: string;
  };
  buyer: {
    firstName: string;
    lastName: string;
  };
  amount: number;
  orderStatus: string;
  paymentStatus: string;
  shipping: {
    city: string;
  };
  createdAt: string;
}

const SalesTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // API call
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/artist`,
          {
            credentials: "include",
            cache: "no-store",
          },
        );

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error("Error fetching sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Format order status for display
  const getStatusLabel = (order: Order) => {
    if (order.orderStatus === "delivered" && order.paymentStatus === "paid") {
      return { label: "Settled", color: "emerald" };
    }
    if (order.orderStatus === "shipped") {
      return { label: "In Transit", color: "brand" };
    }
    if (order.orderStatus === "confirmed") {
      return { label: "Processing", color: "white" };
    }
    if (order.orderStatus === "cancelled") {
      return { label: "Cancelled", color: "red" };
    }
    return { label: "Created", color: "white" };
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Generate order reference
  const getOrderRef = (id: string) => {
    return `ORD-${id.slice(-5).toUpperCase()}`;
  };

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center border border-glass bg-surface/10">
        <div className="w-12 h-12 border-t-2 border-brand rounded-full animate-spin" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="w-full border border-glass bg-surface/10 p-20 text-center">
        <div className="flex flex-col items-center gap-4">
          <LuPackage size={48} className="text-dim opacity-30" />
          <p className="font-luxury text-2xl text-muted">
            No sales recorded yet.
          </p>
          <p className="font-jakarta text-xs text-dim uppercase tracking-widest">
            Your transaction history will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
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
          {orders.map((order) => {
            const status = getStatusLabel(order);
            const buyerName = `${order.buyer.firstName} ${order.buyer.lastName}`;
            const location = order.shipping.city;

            return (
              <tr
                key={order._id}
                className="border-b border-glass hover:bg-surface-hover transition-all group"
              >
                <td className="p-6 font-mono text-[10px] text-muted">
                  {getOrderRef(order._id)}
                </td>
                <td className="p-6">
                  <p className="font-luxury text-lg group-hover:text-brand transition-colors m-0">
                    {order.artwork.title}
                  </p>
                  <p className="text-[8px] font-jakarta text-dim uppercase tracking-tighter mt-1 m-0">
                    {formatDate(order.createdAt)}
                  </p>
                </td>
                <td className="p-6 font-jakarta text-xs text-muted">
                  {buyerName}
                  {location && (
                    <>
                      {" "}
                      <span className="text-dim">({location})</span>
                    </>
                  )}
                </td>
                <td className="p-6 font-luxury text-xl">
                  ₹{order.amount.toLocaleString()}
                </td>
                <td className="p-6">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest border ${
                      status.color === "emerald"
                        ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
                        : status.color === "brand"
                          ? "border-brand/30 text-brand bg-brand/5"
                          : status.color === "red"
                            ? "border-red-500/30 text-red-400 bg-red-500/5"
                            : "border-white/20 text-white/50 bg-white/5"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        status.color === "emerald"
                          ? "bg-emerald-400"
                          : status.color === "brand"
                            ? "bg-brand"
                            : status.color === "red"
                              ? "bg-red-400"
                              : "bg-white/50"
                      }`}
                      aria-hidden="true"
                    />
                    {status.label}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <Link
                    href={`/dashboard/orders/${order._id}`}
                    className="w-11 h-11 inline-flex items-center justify-center text-dim hover:text-white border border-transparent hover:border-white/10 transition-all rounded-none"
                  >
                    <LuArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
