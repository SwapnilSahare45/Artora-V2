import { Metadata } from "next";
import Logo from "@/components/atoms/Logo";
import LoginForm from "@/components/molecules/LoginForm";

export const metadata: Metadata = {
  title: "Login | Artora Protocol",
  description:
    "Securely access your curated art collection and manage your digital masterpieces.",
};

const LoginPage = () => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      <section className="sticky top-0 max-h-screen hidden lg:flex flex-col justify-between p-16 overflow-hidden border-r border-glass">
        {/* Glow overlay */}
        <div className="absolute top-[-15%] left-[-10%] w-150 h-150 bg-brand/10 blur-[210px] rounded-full pointer-events-none" />

        <Logo size="md" />

        <div className="relative z-10 space-y-8">
          <header className="space-y-4">
            <h1 className="font-luxury text-7xl leading-tight tracking-tight">
              The portal to <br />
              <span className="italic text-brand">unseen</span> creation.
            </h1>
            <div className="h-px w-20 bg-brand shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
          </header>

          <div className="space-y-6 max-w-sm">
            <p className="font-jakarta text-sm text-muted leading-relaxed tracking-wide">
              Connect with a global elite of independent artists. Discover
              masterpieces that don't just decorate walls, but define them.
            </p>
          </div>
        </div>

        <footer className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-dim font-bold">
            Artora Protocol — 2026
          </p>
        </footer>

        {/* background line art */}
        <div className="absolute top-1/4 right-0 w-64 h-px bg-white/5 -rotate-45" />
        <div className="absolute bottom-1/4 left-0 w-64 h-px bg-white/5 rotate-45" />
        <div className="absolute bottom-10 right-30 w-44 h-px bg-white/5 rotate-30" />
      </section>

      {/* Form Section */}
      <section className="flex flex-col items-center justify-center p-8 md:px-16 relative">
        <div className="w-full max-w-md space-y-10">
          <header className="space-y-3 text-center lg:text-left">
            <h2 className="font-luxury text-4xl italic">Welcome back</h2>
            <p className="font-jakarta text-[10px] uppercase tracking-[0.3em] text-brand font-bold">
              Access your curated collection
            </p>
          </header>

          <article className="relative group">
            <LoginForm />
          </article>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
