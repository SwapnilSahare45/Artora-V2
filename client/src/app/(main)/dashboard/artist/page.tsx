import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Image from "next/image";
import { LuCamera, LuCheck, LuGlobe, LuInstagram } from "react-icons/lu";

const Artist = () => {
  const inputClass =
    "w-full bg-transparent shadow-none border-0 border-b border-glass py-3 font-jakarta text-sm outline-none focus:border-brand focus:ring-0 focus:shadow-none transition-all duration-500 placeholder:text-white/20 hover:border-white/20";

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

        <div className="flex items-center gap-4">
          <Button
            title="My Gallery"
            ariaLabel="View my public gallery"
            variant="outline"
            className="h-14"
          />
          <div
            className="h-14 w-px bg-dim hidden md:block"
            aria-hidden="true"
          />
          <Button
            title="Save Profile"
            ariaLabel="Save profile changes"
            className="h-14 px-10 text-[10px] font-bold tracking-widest shadow-neon"
          />
          <Button
            title="Discard"
            ariaLabel="Discard profile changes"
            variant="ghost"
            className="h-14"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <form className="lg:col-span-7 space-y-16">
          <fieldset className="space-y-10 border-none p-0 m-0">
            <legend className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold flex items-center gap-3 mb-8">
              <span className="opacity-50 text-[8px]" aria-hidden="true">
                01.
              </span>
              Public Identity
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
              <Input label="First Name" className={inputClass} />
              <Input label="Last Name" className={inputClass} />

              <Input
                label="Primary Specialty"
                className={`md:col-span-2 ${inputClass}`}
                placeholder="e.g. Abstract Expressionism"
              />

              <div className="space-y-3 md:col-span-2">
                <div className="flex justify-between items-end">
                  <label className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                    Professional Narrative (Bio)
                  </label>
                  <span className="text-[8px] text-dim font-jakarta uppercase">
                    0 / 500
                  </span>
                </div>
                <textarea
                  rows={4}
                  aria-label="Professional Biography"
                  className={`${inputClass} leading-relaxed resize-none`}
                  placeholder="Tell your artistic story..."
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-10 border-none mt-10">
            <legend className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold flex items-center gap-3 mb-8">
              <span className="opacity-50 text-[8px]" aria-hidden="true">
                02.
              </span>
              External Presence
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex items-center gap-4">
                <LuGlobe
                  className="text-dim group-focus-within:text-brand transition-colors"
                  size={18}
                  aria-hidden="true"
                />
                <Input
                  placeholder="Website URL"
                  ariaLabel="Website URL"
                  className={inputClass}
                />
              </div>
              <div className="flex items-center gap-4">
                <LuInstagram
                  className="text-dim group-focus-within:text-brand transition-colors"
                  size={18}
                  aria-hidden="true"
                />
                <Input
                  placeholder="Instagram Handle"
                  ariaLabel="Instagram Handle"
                  className={inputClass}
                />
              </div>
            </div>
          </fieldset>
        </form>

        <aside className="lg:col-span-5" aria-label="Real-time profile preview">
          <div className="space-y-8">
            <p className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-dim font-bold text-center">
              Real-time Preview
            </p>

            {/* Profile Image */}
            <div className="relative aspect-square w-full bg-neutral-900 border border-glass group overflow-hidden">
              <Image
                src="/artist.webp"
                alt="Profile Preview"
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center">
                <button
                  type="button"
                  aria-label="Upload new profile asset"
                  className="flex flex-col items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                >
                  <div className="p-4 bg-brand rounded-full shadow-xl">
                    <LuCamera size={20} aria-hidden="true" />
                  </div>
                  <span className="font-jakarta text-[9px] uppercase tracking-widest font-bold">
                    Update Asset
                  </span>
                </button>
              </div>
            </div>

            {/* Dynamic Preview Card */}
            <div className="p-8 border border-glass bg-linear-to-br from-white/5 to-transparent backdrop-blur-sm space-y-5 shadow-2xl">
              <div className="space-y-1">
                <h2 className="font-luxury text-4xl tracking-tight">
                  Unnamed Artist
                </h2>
                <p className="font-jakarta text-[9px] uppercase tracking-[0.3em] text-brand font-bold">
                  General Specialty
                </p>
              </div>

              <p className="font-jakarta text-xs text-dim leading-relaxed italic line-clamp-4">
                "I paint the feelings that words can't capture—the space between
                memory and dream."
              </p>

              <div className="pt-5 flex items-center justify-between border-t border-glass">
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                    aria-hidden="true"
                  />
                  <p className="font-jakarta text-[9px] uppercase tracking-widest text-dim">
                    Nagpur, India
                  </p>
                </div>
                <div className="p-1.5 rounded-full border border-brand/20">
                  <LuCheck
                    className="text-brand"
                    size={12}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Artist;
