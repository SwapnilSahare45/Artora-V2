"use client";
import Link from "next/link";
import {
  FaArrowRightLong,
  FaLinkedin,
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";
import { LuUser, LuLayers } from "react-icons/lu";
import Logo from "../atoms/Logo";

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-32 pb-12 px-6 md:px-12 border-t border-glass font-jakarta">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 pb-24">
          <div className="flex flex-col justify-between space-y-12">
            <div className="space-y-8">
              <Logo size="sm" className="opacity-80 grayscale" />
              <h2 className="text-5xl md:text-7xl font-luxury leading-[0.85] tracking-tighter italic">
                Discover your <br />{" "}
                <span className="not-italic text-muted font-light text-5xl md:text-6xl">
                  Masterpiece.
                </span>
              </h2>
            </div>

            <form
              className="relative max-w-md group"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Join the inner circle (Email)"
                aria-label="Newsletter email subscription"
                className="w-full bg-transparent border-b border-glass py-4 font-jakarta text-sm outline-none focus:border-brand transition-all placeholder:text-white/20 uppercase tracking-widest"
              />
              <button
                type="submit"
                className="absolute right-0 bottom-4 text-brand hover:text-white transition-all"
              >
                <FaArrowRightLong size={20} />
              </button>
            </form>
          </div>

          <nav className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-8">
              <h6 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand">
                Marketplace
              </h6>
              <div className="flex flex-col space-y-4 text-[10px] uppercase tracking-[0.2em] text-dim">
                <Link
                  href="/artworks"
                  className="hover:text-white transition-colors"
                >
                  Explore All
                </Link>
                <Link
                  href="/auctions"
                  className="hover:text-white transition-colors"
                >
                  Live Auctions
                </Link>
              </div>
            </div>
            <div className="space-y-8">
              <h6 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand">
                Dashboard
              </h6>
              <div className="flex flex-col space-y-4 text-[10px] uppercase tracking-[0.2em] text-dim">
                <Link
                  href="/dashboard/artist/portfolio"
                  className="hover:text-white transition-colors"
                >
                  My Portfolio
                </Link>
                <Link
                  href="/register"
                  className="hover:text-white transition-colors"
                >
                  Identity Setup
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <div className="py-8 border-y border-glass flex flex-wrap items-center gap-12 mb-12">
          <div className="flex items-center gap-3">
            <LuUser size={14} className="text-brand" />
            <p className="text-[9px] uppercase tracking-[0.3em]">
              Design & Develop: Swapnil Vinod Sahare
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LuLayers size={14} className="text-brand" />
            <p className="text-[9px] uppercase tracking-[0.3em]">
              Next.js + Node.js + MongoDB
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] uppercase tracking-[0.4em] text-dim">
            &copy; 2026 Artora
          </p>
          <div className="flex gap-10">
            <Link
              href="https://www.linkedin.com/in/swapnil-sahare-06a803318/"
              target="_blank"
              className="hover:text-brand transition-all"
            >
              <FaLinkedin size={18} />
            </Link>
            <Link
              href="https://github.com/SwapnilSahare45"
              target="_blank"
              className="hover:text-brand transition-all"
            >
              <FaGithub size={18} />
            </Link>
            <Link href="/" className="hover:text-brand transition-all">
              <FaXTwitter size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
