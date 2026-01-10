import Search from "@/components/molecules/Search";
import { Metadata } from "next";
import {
  LuShieldCheck,
  LuUserCheck,
  LuUserX,
  LuSearch,
  LuFilter,
  LuFileText,
  LuFingerprint,
} from "react-icons/lu";

export const metadata: Metadata = {
  title: "KYC Portal | Admin Dashboard | Artora",
  description:
    "Identity verification and badge authorization for the Artora Protocol ecosystem.",
};

const UserVerificationPage = () => {
  const pendingUsers = [
    {
      id: "USR-001",
      name: "Elena Vasquez",
      role: "Artist",
      location: "Barcelona, ES",
      submitted: "2h ago",
      documents: "Passport, Studio Lease",
      status: "Pending",
    },
    {
      id: "USR-002",
      name: "Vault_Collector_42",
      role: "Collector",
      location: "Nagpur, IN",
      submitted: "5h ago",
      documents: "Bank Statement",
      status: "Reviewing",
    },
    {
      id: "USR-003",
      name: "Julian K.",
      role: "Collector",
      location: "Berlin, DE",
      submitted: "1d ago",
      documents: "Tax ID",
      status: "Pending",
    },
  ];

  return (
    <main className="min-h-screen pt-12 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        <section
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-glass pb-12"
          aria-label="Page Header"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" aria-hidden="true" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Architectural Governance
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-luxury leading-none tracking-tight">
              User <span className="italic text-muted">Verification.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div
              className="flex items-center gap-2 px-4 py-2 bg-surface border border-glass"
              role="status"
              aria-live="polite"
            >
              <LuFingerprint
                className="text-brand"
                size={16}
                aria-hidden="true"
              />
              <p className="font-jakarta text-[10px] uppercase tracking-widest text-dim">
                Awaiting Review:
                <span className="text-white font-bold ml-1">14</span>
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8" aria-label="Verification Queue">
          <header className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Search />
            <nav
              className="flex items-center gap-6"
              aria-label="Filter queue by role"
            >
              {["All", "Artists", "Collectors"].map((filter, i) => (
                <button
                  key={i}
                  type="button"
                  className={`font-jakarta text-[10px] uppercase tracking-widest min-h-11 transition-colors ${
                    i === 0
                      ? "text-brand font-bold"
                      : "text-dim hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </nav>
          </header>

          {/* Verification Table */}
          <div className="w-full overflow-x-auto border border-glass bg-surface">
            <table className="w-full text-left border-collapse min-w-225">
              <thead>
                <tr className="border-b border-white/20 bg-surface-hover">
                  <th
                    scope="col"
                    className="p-6 font-jakarta text-[9px] uppercase tracking-widest text-muted"
                  >
                    Identity Token
                  </th>
                  <th
                    scope="col"
                    className="p-6 font-jakarta text-[9px] uppercase tracking-widest text-muted"
                  >
                    Persona Details
                  </th>
                  <th
                    scope="col"
                    className="p-6 font-jakarta text-[9px] uppercase tracking-widest text-muted"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="p-6 font-jakarta text-[9px] uppercase tracking-widest text-muted"
                  >
                    Evidence
                  </th>
                  <th
                    scope="col"
                    className="p-6 font-jakarta text-[9px] uppercase tracking-widest text-muted"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="p-6 font-jakarta text-[9px] uppercase tracking-widest text-muted text-right"
                  >
                    Decision
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map((user, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-white/5 hover:bg-surface-hover/40 transition-all group"
                  >
                    <td className="p-6 font-mono text-[10px] text-dim">
                      {user.id}
                    </td>
                    <td className="p-6">
                      <p className="font-luxury text-xl group-hover:text-brand transition-colors m-0">
                        {user.name}
                      </p>
                      <p className="text-[8px] font-jakarta text-dim uppercase tracking-tighter mt-1 m-0">
                        {user.location}
                      </p>
                    </td>
                    <td className="p-6">
                      <span
                        className={`px-3 py-1 text-[8px] font-bold uppercase tracking-widest border ${
                          user.role === "Artist"
                            ? "border-brand/30 text-brand bg-brand/5"
                            : "border-white/20 bg-glass"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-6">
                      <button
                        type="button"
                        aria-label={`View documents for ${user.name}: ${user.documents}`}
                        className="flex items-center gap-2 text-dim group-hover:text-white transition-colors"
                      >
                        <LuFileText size={14} aria-hidden="true" />
                        <span className="font-jakarta text-[9px] uppercase tracking-widest">
                          {user.documents}
                        </span>
                      </button>
                    </td>
                    <td className="p-6">
                      <p className="font-jakarta text-[9px] uppercase tracking-widest text-amber-500 flex items-center gap-2 m-0">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"
                          aria-hidden="true"
                        />
                        {user.submitted}
                      </p>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-end items-center gap-4">
                        <button
                          type="button"
                          className="w-11 h-11 flex items-center justify-center border border-white/10 text-dim hover:text-red-500 hover:border-red-500/30 transition-all"
                          aria-label={`Reject application for ${user.name}`}
                          title="Reject Application"
                        >
                          <LuUserX size={18} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="w-11 h-11 flex items-center justify-center border border-brand/20 bg-brand/5 text-brand hover:bg-brand hover:text-white transition-all shadow-neon"
                          aria-label={`Grant verified badge to ${user.name}`}
                          title="Grant Verified Badge"
                        >
                          <LuUserCheck size={18} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="pt-20 flex flex-col items-center space-y-6">
          <div className="opacity-30 flex flex-col items-center gap-4">
            <LuShieldCheck
              size={32}
              className="text-brand"
              aria-hidden="true"
            />
            <p className="font-jakarta text-[10px] text-center uppercase tracking-[0.4em] text-muted leading-relaxed max-w-sm">
              Architectural decisions are final. <br />
              Granting a badge issues a cryptographic verification token to the
              user's public profile.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default UserVerificationPage;
