"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../atoms/Logo";
import LogoutButton from "../atoms/LogoutButton";
import { LuBox, LuGavel, LuMenu, LuX } from "react-icons/lu";
import { PiPlusSquare } from "react-icons/pi";

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Moderation",
      href: "/admin/moderation",
      icon: <LuBox size={18} />,
    },
    {
      name: "Scheduler",
      href: "/admin/scheduler",
      icon: <LuGavel size={18} />,
    },
    {
      name: "New Exhibition",
      href: "/admin/scheduler/create",
      icon: <PiPlusSquare size={18} />,
    },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden backdrop-blur-xl bg-bg-primary/80 border-b border-glass">
        <div className="flex items-center justify-between px-6 py-4">
          <Logo size="sm" />
          <button onClick={() => setIsOpen(true)} className="text-white">
            <LuMenu size={26} />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72
        bg-bg-primary/80 backdrop-blur-xl
        border-r border-glass
        flex flex-col
        transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-10 border-b border-glass bg-bg-primary/40 backdrop-blur-xl">
          <Link href="/" className="flex flex-col gap-2">
            <Logo size="sm" />
            <p className="font-jakarta text-[8px] uppercase tracking-[0.5em] text-brand font-bold opacity-60">
              Architect Portal
            </p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-10 px-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-4 px-6 py-4 transition-all duration-500 group
              ${
                isActive(item.href)
                  ? "text-white bg-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
                  : "text-dim hover:text-white hover:bg-surface"
              }`}
            >
              {isActive(item.href) && (
                <div className="absolute left-0 w-1 h-6 bg-brand shadow-neon" />
              )}
              <span
                className={`transition-colors ${
                  isActive(item.href) ? "text-brand" : "group-hover:text-brand"
                }`}
              >
                {item.icon}
              </span>
              <span className="font-jakarta text-[10px] font-bold uppercase tracking-widest">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-8 border-t border-glass bg-bg-primary/40 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                System Live
              </p>
            </div>
            <p className="font-mono text-[8px] text-white/20">V2.6</p>
          </div>

          <LogoutButton />
        </div>

        {/* Mobile Close */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 lg:hidden text-dim hover:text-white"
        >
          <LuX size={24} />
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;
