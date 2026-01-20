import { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import Logo from "@/components/atoms/Logo";

export const metadata: Metadata = {
  title: "404 | Art Not Found",
  description:
    "The piece you are looking for has been moved to a private collection or does not exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-luxury text-[30vw] text-white/2 leading-none">
          404
        </span>
      </div>

      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-brand/10 blur-[160px] rounded-full -z-10" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-12">
        {/* Branding */}
        <div className="opacity-40 hover:opacity-100 transition-opacity duration-700">
          <Logo size="sm" />
        </div>

        <header className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-brand" />
            <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.5em]">
              Void Encountered
            </p>
            <span className="w-12 h-px bg-brand" />
          </div>

          <h1 className="text-6xl md:text-8xl font-luxury leading-[0.9] tracking-tighter">
            This frame is <br />
            <span className="italic text-muted">currently empty.</span>
          </h1>

          <p className="max-w-md mx-auto font-jakarta text-dim text-sm leading-relaxed tracking-wide m-0">
            The masterpiece you are seeking has either been acquired by a
            private collector or exists in a different exhibition realm.
          </p>
        </header>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-8">
          <Link href="/artworks" className="w-full sm:w-auto">
            <Button
              title="Return to Exhibition"
              ariaLabel="Return to the full artwork gallery"
              className="px-12 h-16 shadow-neon w-full"
            />
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button
              title="Back to Home"
              ariaLabel="Navigate back to the landing page"
              variant="outline"
              className="px-12 h-16 w-full"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
