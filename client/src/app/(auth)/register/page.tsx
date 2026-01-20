import Logo from "@/components/atoms/Logo";
import RegisterForm from "@/components/molecules/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Profile | Artora Protocol",
  description:
    "Join the Artora ecosystem. Establish your collector credentials and gain exclusive access to curated global masterpieces.",
};

const RegisterPage = () => {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-bg-primary">
      <section className="sticky top-0 max-h-screen hidden lg:flex flex-col justify-between p-16 overflow-hidden border-r border-glass">
        {/* Decorative elements hidden from screen readers */}
        <div className="absolute top-[-15%] left-[-10%] w-150 h-150 bg-brand/15 blur-[210px] rounded-full pointer-events-none" />

        <Logo />

        <div className="relative z-10 space-y-8">
          <header className="space-y-4">
            {/* Primary H1 for the page */}
            <h1 className="font-luxury text-7xl leading-tight tracking-tight">
              Curating the <br />
              <span className="italic text-brand">soul</span> of art.
            </h1>
            <div className="h-px w-20 bg-brand shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
          </header>

          <div className="space-y-6 max-w-sm">
            <p className="font-jakarta text-sm text-muted leading-relaxed tracking-wide">
              Join a distinguished community of collectors and creators. Unlock
              direct access to original masterpieces and exclusive live auction
              events.
            </p>

            <ul className="space-y-3 font-jakarta text-[11px] uppercase tracking-[0.2em] text-dim">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-brand rounded-full shadow-neon" />
                Verified Independent Talent
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-brand rounded-full shadow-neon" />
                Secure Provenance Tracking
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-brand rounded-full shadow-neon" />
                Global Collector Network
              </li>
            </ul>
          </div>
        </div>

        <footer className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-dim font-bold">
            Artora Protocol — 2026
          </p>
        </footer>

        <div className="absolute top-1/4 right-0 w-64 h-px bg-white/5 -rotate-45" />
        <div className="absolute bottom-1/4 left-0 w-64 h-px bg-white/5 rotate-45" />
        <div className="absolute bottom-10 right-30 w-44 h-px bg-white/5 rotate-30" />
      </section>

      <section className="flex flex-col items-center justify-center p-8 md:p-16 relative">
        <article className="relative group">
          <RegisterForm />
        </article>
      </section>
    </main>
  );
};

export default RegisterPage;
