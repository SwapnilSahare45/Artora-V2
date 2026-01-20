import CollectorProfileForm from "@/components/molecules/CollectorProfileForm";
import { cookies } from "next/headers";

const CollectorProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/loggedInUser`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: `token=${token}` },
    },
  );

  const result = await response.json();
  const user = result.user;
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <section className="mb-16 border-b border-glass pb-12">
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-brand" />
            <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
              Acquisition Identity
            </p>
          </div>
          <h1 className="text-6xl md:text-7xl font-luxury leading-none tracking-tight">
            The <span className="italic text-brand">Curator.</span>
          </h1>
        </header>
      </section>

      <CollectorProfileForm user={user} />
    </main>
  );
};

export default CollectorProfilePage;
