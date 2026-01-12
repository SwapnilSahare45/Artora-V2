"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../atoms/Logo";
import Button from "../atoms/Button";
import { LuMenu, LuX, LuChevronRight, LuUser, LuPalette } from "react-icons/lu";
import LogoutButton from "../atoms/LogoutButton";

interface NavbarProps {
  userRole: string | null;
}

const NavbarClient = ({ userRole }: NavbarProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const guestLinks = [
    { name: "Artworks", href: "/artworks" },
    { name: "Auctions", href: "/auctions" },
    { name: "Artists", href: "/artists" },
  ];

  const collectorLinks = [
    { name: "Collection", href: "/artworks" },
    { name: "Live Floor", href: "/auctions" },
    { name: "My Bids", href: "/dashboard/collector/bids" },
    { name: "Artists", href: "/artists" },
  ];

  const artistLinks = [
    { name: "Studio", href: "/dashboard/artist/deposit" },
    { name: "Artworks", href: "/artworks" },
    { name: "My Gallery", href: "/dashboard/artist/gallery" },
    { name: "Artists", href: "/artists" },
  ];

  const activeLinks =
    userRole === "artist"
      ? artistLinks
      : userRole === "collector"
      ? collectorLinks
      : guestLinks;

  useEffect(() => setIsOpen(false), [pathname]);

  const getLinkStyle = (href: string) =>
    `relative font-jakarta text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 group ${
      pathname === href ? "text-white" : "text-white/40 hover:text-white"
    }`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto flex items-center justify-between py-2 lg:py-8 px-6">
          <div className="flex-1">
            <Link href="/" aria-label="Artora home">
              <Logo size="sm" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center gap-10 grow">
            {activeLinks.map((link) => (
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
            {!userRole ? (
              <>
                <Link href="/register">
                  <Button
                    title="Join Artora"
                    className="px-6! py-2.5! text-[10px]!"
                  />
                </Link>
                <div className="h-4 w-px bg-glass" />
                <Link href="/login">
                  <Button
                    title="Enter Gallery"
                    className="px-6! py-2.5! text-[10px]!"
                  />
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-6">
                {userRole === "artists" ? (
                  <Link
                    href="/dashboard/artist/deposit"
                    className="font-jakarta text-[10px] uppercase tracking-[0.2em] text-brand hover:text-white transition-colors flex items-center gap-2"
                  >
                    <LuPalette size={14} /> My Studio
                  </Link>
                ) : (
                  <Link
                    href={`/dashboard/${userRole}`}
                    className="font-jakarta text-[10px] uppercase tracking-[0.2em] text-dim hover:text-brand transition-colors flex items-center gap-2"
                  >
                    <LuUser size={14} /> My Profile
                  </Link>
                )}
                <div className="h-4 w-px bg-glass" />
                <LogoutButton />
              </div>
            )}
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
            {activeLinks.map((link) => (
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

            <div className="pt-8 border-t border-glass space-y-4">
              {userRole ? (
                <LogoutButton />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-3 text-brand font-jakarta text-sm uppercase tracking-widest"
                  >
                    <LuUser size={18} /> Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-3 text-dim font-jakarta text-sm uppercase tracking-widest"
                  >
                    <LuPalette size={18} /> Join Artora
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default NavbarClient;
