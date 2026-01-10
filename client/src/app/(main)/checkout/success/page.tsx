import { Metadata } from "next";
import Button from "@/components/atoms/Button";
import { LuShieldCheck, LuPrinter } from "react-icons/lu";
import Link from "next/link";
import { BiCheckCircle } from "react-icons/bi";

export const metadata: Metadata = {
  title: "Acquisition Confirmed | Artora Protocol",
  description:
    "Your acquisition has been secured and hashed into the Artora Protocol.",
};

const SuccessPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-brand/10 blur-[160px] rounded-full -z-10"
        aria-hidden="true"
      />

      <div className="max-w-2xl w-full text-center space-y-12">
        <header className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 bg-brand blur-2xl opacity-40 animate-pulse"
                aria-hidden="true"
              />
              <BiCheckCircle
                size={80}
                className="text-brand relative z-10"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.5em]">
              Transaction Secured
            </p>
            <h1 className="text-5xl md:text-7xl font-luxury leading-tight">
              Masterpiece <br />{" "}
              <span className="italic text-muted">Acquired.</span>
            </h1>
          </div>
        </header>

        <section
          className="p-8 border border-glass bg-surface backdrop-blur-md space-y-8"
          aria-label="Transaction Details"
        >
          <div className="space-y-2">
            <p className="font-jakarta text-[10px] text-dim uppercase tracking-widest">
              Order Reference
            </p>
            <p className="font-mono text-lg">#ART-SEC-90234-2026</p>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-glass pt-8">
            <div className="text-left space-y-1">
              <p className="font-jakarta text-[8px] text-dim uppercase tracking-widest">
                Settlement
              </p>
              <p className="font-luxury text-xl">₹2,80,000</p>
            </div>
            <div className="text-right space-y-1">
              <p className="font-jakarta text-[8px] text-muted uppercase tracking-widest">
                Provenance
              </p>
              <div className="flex items-center justify-end gap-2 text-emerald-500">
                <LuShieldCheck size={14} aria-hidden="true" />
                <span className="font-jakarta text-[10px] font-bold uppercase tracking-widest">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/dashboard/collector/collection"
            className="w-full sm:w-auto"
          >
            <Button
              title="Enter The Vault"
              ariaLabel="View your acquired artworks in the vault"
              className="h-16 px-12 shadow-neon w-full"
            />
          </Link>
          <Button
            title="Download Receipt"
            variant="ghost"
            aria-label="Download and print your acquisition receipt"
            icon={<LuPrinter size={16} aria-hidden="true" />}
            className="h-16 text-dim"
          />
        </div>

        <footer className="pt-12">
          <p className="font-jakarta text-[10px] text-dim uppercase tracking-[0.3em] leading-relaxed">
            A confirmation email and digital certificate of authenticity <br />
            have been dispatched to your registered secure address.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default SuccessPage;
