"use client";

import Image from "next/image";
import { LuSearch, LuSend, LuInfo, LuGavel, LuCheck } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import Button from "@/components/atoms/Button";

const ArtistInbox = () => {
  const conversations = [
    {
      id: 1,
      collector: "Adrian M.",
      location: "Paris, FR",
      lastMessage:
        "Is the provenance certificate available for 'Digital Renaissance'?",
      time: "2m ago",
      unread: true,
      artwork: "Digital Renaissance",
    },
    {
      id: 2,
      collector: "Vault 42",
      location: "Dubai, UAE",
      lastMessage:
        "We are interested in a private commission for the 2026 Winter series.",
      time: "1h ago",
      unread: false,
      artwork: "Private Commission",
    },
    {
      id: 3,
      collector: "Julian K.",
      location: "Nagpur, IN",
      lastMessage:
        "The bidding process was seamless. Looking forward to the arrival.",
      time: "2d ago",
      unread: false,
      artwork: "The Looking Eye",
    },
  ];

  return (
    <main
      className="h-screen pt-24 overflow-hidden flex flex-col"
      id="main-content"
    >
      <div className="max-w-400 mx-auto w-full flex-1 flex overflow-hidden border-x border-glass">
        <aside
          className="hidden md:flex w-96 border-r border-glass flex-col"
          aria-label="Conversation list"
        >
          <header className="p-8 space-y-6">
            <h1 className="font-luxury text-4xl">Conversations.</h1>
            <div className="relative group">
              <LuSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-dim group-focus-within:text-brand transition-colors"
                size={16}
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search collectors..."
                aria-label="Search conversation history"
                className="w-full bg-surface border border-glass p-4 pl-12 font-jakarta text-[10px] uppercase tracking-widest outline-none focus:border-brand/50 transition-all placeholder:text-white/20"
              />
            </div>
          </header>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {conversations.map((chat) => (
              <button
                key={chat.id}
                type="button"
                aria-label={`Conversation with ${chat.collector} regarding ${chat.artwork}`}
                className={`w-full p-8 text-left border-b border-glass hover:bg-surface-hover transition-all relative group ${
                  chat.unread ? "bg-white/1" : ""
                }`}
              >
                {chat.unread && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-brand shadow-neon"
                    aria-hidden="true"
                  />
                )}
                <div className="flex justify-between items-start mb-2">
                  <p className="font-jakarta text-[10px] font-bold uppercase tracking-[0.2em]">
                    {chat.collector}
                  </p>
                  <span className="text-[8px] text-dim uppercase">
                    {chat.time}
                  </span>
                </div>
                <p className="font-jakarta text-[9px] text-brand uppercase tracking-widest mb-3">
                  Re: {chat.artwork}
                </p>
                <p className="font-jakarta text-xs text-muted line-clamp-1 leading-relaxed">
                  {chat.lastMessage}
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* Active chat */}
        <section
          className="flex-1 flex flex-col bg-[radial-gradient(circle_at_top_right,#111_0%,#050505_100%)]"
          aria-label="Active conversation chat"
        >
          {/* Chat Header */}
          <header className="p-6 border-b border-glass flex items-center justify-between backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center border border-brand/30"
                aria-hidden="true"
              >
                <span className="font-luxury text-brand">A</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-jakarta text-[11px] font-bold uppercase tracking-[0.3em]">
                    Adrian M.
                  </h2>
                  <LuCheck
                    className="text-brand"
                    size={12}
                    aria-hidden="true"
                  />
                </div>
                <p className="font-jakarta text-[9px] text-dim uppercase tracking-widest">
                  Paris, France
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="View collector info"
                className="w-11 h-11 flex items-center justify-center text-dim hover:text-white transition-colors"
              >
                <LuInfo size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="More conversation options"
                className="w-11 h-11 flex items-center justify-center text-dim hover:text-white transition-colors"
              >
                <FiMoreHorizontal size={20} aria-hidden="true" />
              </button>
            </div>
          </header>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
            {/* System Context Card */}
            <div className="flex justify-center">
              <div className="max-w-md w-full p-4 bg-surface border border-glass flex items-center gap-6">
                <div className="relative w-20 h-20 shrink-0 bg-surface-hover">
                  <Image
                    src="/hero-2.webp"
                    alt="Contextual Artwork: Digital Renaissance"
                    fill
                    className="object-cover grayscale"
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                    Inquiry regarding Lot #90234
                  </p>
                  <h3 className="font-luxury text-lg m-0">
                    Digital Renaissance
                  </h3>
                  <p className="font-jakarta text-[9px] text-brand font-bold uppercase tracking-widest m-0">
                    Status: Live Auction
                  </p>
                </div>
              </div>
            </div>

            {/* Message Bubble: Collector */}
            <div className="flex flex-col items-start max-w-2xl">
              <div className="bg-white/5 p-6 rounded-none border border-glass">
                <p className="font-jakarta text-sm leading-relaxed text-muted m-0">
                  Greetings. I’ve been following your Winter Modernism series.
                  Is the provenance certificate for 'Digital Renaissance'
                  already minted on the protocol, or is it issued upon
                  settlement?
                </p>
              </div>
              <span className="mt-2 font-jakarta text-[8px] text-dim uppercase tracking-widest">
                Adrian M. — 14:02
              </span>
            </div>

            {/* Message Bubble: Artist (User) */}
            <div className="flex flex-col items-end max-w-2xl ml-auto">
              <div className="bg-brand/10 p-6 rounded-none border border-brand/20">
                <p className="font-jakarta text-sm leading-relaxed m-0">
                  Hello Adrian. All works in the current exhibition have
                  pre-minted certificates. The ownership metadata is transferred
                  instantly via the smart contract once the auction concludes
                  and payment is reconciled in INR.
                </p>
              </div>
              <span className="mt-2 font-jakarta text-[8px] text-brand uppercase tracking-widest">
                Swapnil Sahare — 14:15
              </span>
            </div>
          </div>

          {/* Chat Input */}
          <footer className="p-8 border-t border-glass">
            <form
              className="max-w-4xl mx-auto relative group"
              onSubmit={(e) => e.preventDefault()}
            >
              <textarea
                rows={1}
                aria-label="Compose your message"
                placeholder="Compose professional response..."
                className="w-full bg-surface border border-glass p-6 pr-44 font-jakarta text-sm outline-none focus:border-brand/50 transition-all resize-none placeholder:text-white/20"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Send Private Offer/Gavel"
                  className="w-11 h-11 flex items-center justify-center text-dim hover:text-brand transition-colors"
                >
                  <LuGavel size={20} aria-hidden="true" />
                </button>
                <div className="w-px h-6 bg-glass" aria-hidden="true" />
                <Button
                  title="Send"
                  type="submit"
                  icon={<LuSend size={14} aria-hidden="true" />}
                  iconPosition="right"
                  className="px-6! h-10! text-[10px]!"
                />
              </div>
            </form>
            <p className="text-center mt-4 font-jakarta text-[8px] text-white/30 uppercase tracking-[0.3em]">
              Encrypted Peer-to-Peer Protocol
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
};

export default ArtistInbox;
