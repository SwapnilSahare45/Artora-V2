import { Metadata } from "next";
import {
  LuBell,
  LuCheck,
  LuTrash2,
  LuGavel,
  LuShieldCheck,
  LuCircleDollarSign,
  LuClock,
} from "react-icons/lu";
import Button from "@/components/atoms/Button";

export const metadata: Metadata = {
  title: "Intelligence Brief | Notifications | Artora",
  description:
    "Real-time updates on auction status, security protocols, and acquisition milestones.",
};

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      type: "Auction",
      title: "Outbid Alert: Lot #90234",
      desc: "A collector from Dubai has exceeded your bid on 'Digital Renaissance'. Current valuation: ₹3,10,000.",
      time: "2m ago",
      isUnread: true,
      icon: <LuGavel className="text-brand" aria-hidden="true" />,
    },
    {
      id: 2,
      type: "Acquisition",
      title: "Settlement Confirmed",
      desc: "Reconciliation for 'The Looking Eye' is complete. The masterpiece is now secured in your Vault.",
      time: "1h ago",
      isUnread: true,
      icon: (
        <LuCircleDollarSign className="text-emerald-500" aria-hidden="true" />
      ),
    },
    {
      id: 3,
      type: "Security",
      title: "Provenance Hashed",
      desc: "Immutable certificate generated for your latest deposit. Digital signature verified by Artora Protocol.",
      time: "4h ago",
      isUnread: false,
      icon: <LuShieldCheck className="text-white/40" aria-hidden="true" />,
    },
    {
      id: 4,
      type: "Auction",
      title: "Exhibition Launching",
      desc: "'The Winter Modernism' exhibition is now live. Your listed lot is currently accepting bids.",
      time: "1d ago",
      isUnread: false,
      icon: <LuClock className="text-brand" aria-hidden="true" />,
    },
  ];

  return (
    <main className="min-h-screen pt-22 pb-20 px-6 md:px-10">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-glass pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" aria-hidden="true" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                System Log
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl font-luxury leading-none">
              Intelligence <span className="italic text-muted">Brief.</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              className="font-jakarta text-[10px] uppercase tracking-widest text-dim hover:text-white transition-colors min-h-11"
            >
              Mark all as read
            </button>
            <div className="h-4 w-px bg-glass" aria-hidden="true" />
            <div role="status" aria-live="polite">
              <LuBell
                className="text-brand animate-pulse"
                size={20}
                aria-label="System active"
              />
            </div>
          </div>
        </header>

        {/* Categories */}
        <nav
          className="flex gap-8 border-b border-glass pb-4"
          aria-label="Notification categories"
        >
          {["All Alerts", "Auctions", "Acquisitions", "Security"].map(
            (cat, i) => (
              <button
                key={cat}
                type="button"
                className={`whitespace-nowrap font-jakarta text-[10px] uppercase tracking-widest transition-all min-h-11 ${
                  i === 0
                    ? "text-white font-bold border-b border-brand pb-4 -mb-4.5"
                    : "text-dim hover:text-white"
                }`}
              >
                {cat}
              </button>
            )
          )}
        </nav>

        {/* Notification List */}
        <section className="space-y-4" aria-label="Notifications list">
          {notifications.map((note) => (
            <article
              key={note.id}
              className={`group relative p-6 border border-glass transition-all duration-500 hover:bg-surface-hover flex items-start gap-6 ${
                note.isUnread ? "bg-surface border-brand/20" : "opacity-70"
              }`}
            >
              {/* Unread Indicator */}
              {note.isUnread && (
                <div
                  className="absolute top-0 left-0 w-1 h-full bg-brand shadow-neon"
                  aria-hidden="true"
                />
              )}

              <div
                className="p-4 bg-glass rounded-full shrink-0 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                {note.icon}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                    {note.type} • {note.time}
                  </p>
                  <div className="flex items-center gap-4 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      title="Archive Notification"
                      aria-label={`Archive: ${note.title}`}
                      className="w-10 h-10 flex items-center justify-center text-dim hover:text-white transition-colors"
                    >
                      <LuCheck size={14} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      title="Dismiss Notification"
                      aria-label={`Dismiss: ${note.title}`}
                      className="w-10 h-10 flex items-center justify-center text-dim hover:text-red-500 transition-colors"
                    >
                      <LuTrash2 size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <h3 className="font-luxury text-xl group-hover:text-brand transition-colors m-0">
                  {note.title}
                </h3>
                <p className="font-jakarta text-xs text-muted leading-relaxed max-w-2xl m-0">
                  {note.desc}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Load more */}
        <footer className="pt-12 flex justify-center">
          <Button
            title="Load Historical Logs"
            ariaLabel="Load more older notifications"
            variant="outline"
            className="border-glass font-jakarta text-[10px] uppercase tracking-widest"
          />
        </footer>
      </div>
    </main>
  );
};

export default NotificationsPage;
