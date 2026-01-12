import Button from "@/components/atoms/Button";
import ArtistProfileForm from "@/components/molecules/ArtistProfileForm";
import { cookies } from "next/headers";
import Link from "next/link";

const Artist = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/loggedInUser`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: `token=${token}` },
    }
  );

  const result = await response.json();
  const user = result.user;

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <section className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-glass pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-brand" aria-hidden="true" />
            <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
              Identity Configuration
            </p>
          </div>
          <h1 className="text-6xl md:text-7xl font-luxury leading-none tracking-tight">
            The <span className="italic text-brand/90">Persona.</span>
          </h1>
        </div>

        <Link href={"/dashboard/artist/gallery"}>
          <Button
            title="My Gallery"
            ariaLabel="View my public gallery"
            variant="outline"
            className="h-14"
          />
        </Link>
      </section>

      <ArtistProfileForm user={user} />
    </main>
  );
};

export default Artist;
