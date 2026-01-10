"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../atoms/Logo";
import {
  LuShieldCheck,
  LuLayoutDashboard,
  LuGavel,
  LuBox,
  LuLogOut,
  LuSettings,
} from "react-icons/lu";
import { BiBarChart } from "react-icons/bi";

const AdminSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Platform Overview",
      href: "/admin/dashboard",
      icon: <LuLayoutDashboard size={18} aria-hidden="true" />,
    },
    {
      name: "User Verification",
      href: "/admin/verification",
      icon: <LuShieldCheck size={18} aria-hidden="true" />,
    },
    {
      name: "Moderation Queue",
      href: "/admin/moderation",
      icon: <LuBox size={18} aria-hidden="true" />,
    },
    {
      name: "Auction Scheduler",
      href: "/admin/scheduler",
      icon: <LuGavel size={18} aria-hidden="true" />,
    },
    {
      name: "Market Analytics",
      href: "/admin/analytics",
      icon: <BiBarChart size={18} aria-hidden="true" />,
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-72 bg-bg-primary border-r border-glass  flex-col z-50 hidden lg:flex"
      aria-label="Main Administration Navigation"
    >
      <div className="p-10 border-b border-glass">
        <Link
          href="/"
          aria-label="Go to Artora Home"
          className="group flex flex-col gap-2"
        >
          <Logo size="sm" />
          <p className="font-jakarta text-[8px] uppercase tracking-[0.5em] text-brand font-bold opacity-60 group-hover:opacity-100 transition-opacity">
            Architect Portal
          </p>
        </Link>
      </div>

      <nav className="flex-1 py-10 px-6 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={`flex items-center gap-4 px-6 py-4 transition-all duration-500 group relative focus:outline-none focus:ring-1 focus:ring-brand/30 ${
              isActive(item.href)
                ? "text-white bg-surface-hover"
                : "text-dim hover:text-white hover:bg-surface"
            }`}
          >
            {isActive(item.href) && (
              <div
                className="absolute left-0 w-1 h-6 bg-brand shadow-neon"
                aria-hidden="true"
              />
            )}
            <span
              className={`${
                isActive(item.href) ? "text-brand" : "group-hover:text-brand"
              } transition-colors`}
            >
              {item.icon}
            </span>
            <span className="font-jakarta text-[10px] font-bold uppercase tracking-widest">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      <div className="p-8 border-t border-glass space-y-8">
        <div className="space-y-4">
          <div
            className="flex items-center justify-between"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                aria-hidden="true"
              />
              <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                Protocol v2.6
              </p>
            </div>
            <p className="font-mono text-[8px] text-white/20">STABLE</p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-surface border border-glass">
            <div
              className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center border border-brand/20"
              aria-hidden="true"
            >
              <span className="font-luxury text-xs text-brand">S</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-jakarta text-[9px] font-bold truncate uppercase">
                Swapnil Sahare
              </p>
              <p className="font-jakarta text-[8px] text-dim uppercase">
                Lead Architect
              </p>
            </div>
            <button
              type="button"
              aria-label="Architect Settings"
              className="text-dim hover:text-white transition-colors p-1"
            >
              <LuSettings size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-3 w-full px-4 py-2 text-dim hover:text-red-500 transition-colors group focus:outline-none focus:text-red-500"
        >
          <LuLogOut
            size={16}
            className="group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          />
          <span className="font-jakarta text-[10px] font-bold uppercase tracking-widest">
            Terminate Session
          </span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
