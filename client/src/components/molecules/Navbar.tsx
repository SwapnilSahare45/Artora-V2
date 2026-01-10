"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../atoms/Logo";
import Button from "../atoms/Button";
import { LuMenu, LuX, LuChevronRight } from "react-icons/lu";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => setIsOpen(false), [pathname]);

  const navLinks = [
    { name: "Artworks", href: "/artworks" },
    { name: "Auctions", href: "/auctions" },
    { name: "Curations", href: "/buy-now" },
    { name: "Artists", href: "/artists" },
  ];

  const getLinkStyle = (href: string) =>
    `relative font-jakarta text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 group ${
      pathname === href ? "text-white" : "text-white/40 hover:text-white"
    }`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-xl border-b border-glass">
        <nav className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6">
          <div className="flex-1">
            <Link href="/" aria-label="Artora home">
              <Logo size="sm" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center gap-10 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkStyle(link.href)}
              >
                {link.name}
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 bg-brand transition-all duration-500 ${
                    pathname === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full opacity-50"
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex flex-1 justify-end items-center gap-6">
            <Link
              href="/submit"
              className="font-jakarta text-[10px] uppercase tracking-[0.2em] text-dim hover:text-brand transition-colors"
            >
              Sell Artwork
            </Link>
            <div className="h-4 w-px bg-glass" />
            <Link href="/login">
              <Button
                title="Enter Gallery"
                className="px-6! py-2.5! text-[10px]!"
              />
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open mobile menu"
              className="p-2 text-white"
            >
              <LuMenu size={28} />
            </button>
          </div>
        </nav>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-100 bg-black/90 backdrop-blur-md transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-75 z-101 border-l border-glass transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-12">
            <Logo size="sm" />
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close mobile menu"
              className="text-dim hover:text-white"
            >
              <LuX size={28} />
            </button>
          </div>
          <nav className="flex-1 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between py-2 group"
              >
                <span
                  className={`font-luxury text-2xl ${
                    pathname === link.href ? "text-brand" : "text-white"
                  }`}
                >
                  {link.name}
                </span>
                <LuChevronRight
                  size={18}
                  className={
                    pathname === link.href ? "text-brand" : "text-white/20"
                  }
                />
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
