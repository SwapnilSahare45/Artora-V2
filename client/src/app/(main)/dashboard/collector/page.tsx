"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Image from "next/image";
import { LuShieldCheck, LuEye, LuSettings2, LuPlus } from "react-icons/lu";

const CollectorProfilePage = () => {
  const inputClass =
    "w-full bg-transparent shadow-none border-0 border-b border-white/20 py-3 font-jakarta text-sm text-white outline-none focus:border-brand focus:shadow-none focus:ring-0 transition-all duration-500 placeholder:text-white/20 hover:border-white/40";

  const interests = [
    "Abstract Expressionism",
    "Digital Generative",
    "Post-Modernism",
    "Photography",
    "Minimalism",
    "Crypto-Art",
    "Oil on Canvas",
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <section className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-glass pb-12">
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-brand" aria-hidden="true" />
            <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
              Acquisition Identity
            </p>
          </div>
          <h1 className="text-6xl md:text-7xl font-luxury leading-none tracking-tight">
            The <span className="italic text-brand">Curator.</span>
          </h1>
        </header>

        <div className="flex items-center gap-4">
          <Button
            title="Update Portfolio"
            ariaLabel="Save and update collector portfolio"
            className="h-14 px-10 shadow-neon"
          />
          <Button
            title="Vault Settings"
            ariaLabel="Open vault privacy settings"
            variant="outline"
            icon={<LuSettings2 size={16} aria-hidden="true" />}
            className="h-14"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-7 space-y-20">
          <form className="space-y-20">
            {/* Public Persona */}
            <fieldset className="space-y-12 border-none p-0">
              <legend className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold flex items-center gap-3 mb-8">
                <span className="opacity-50 text-[8px]" aria-hidden="true">
                  01.
                </span>
                Public Persona
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                <Input
                  label="Display Name / Alias"
                  id="display-name"
                  className={inputClass}
                  placeholder="Vault_Collector_42"
                  autoComplete="username"
                />
                <Input
                  label="Location"
                  id="location"
                  className={inputClass}
                  placeholder="Nagpur, India"
                  autoComplete="address-level2"
                />

                <div className="md:col-span-2 space-y-4">
                  <label
                    htmlFor="philosophy"
                    className="font-jakarta text-[9px] uppercase tracking-widest text-dim font-bold"
                  >
                    Curation Philosophy
                  </label>
                  <textarea
                    id="philosophy"
                    rows={4}
                    className={`${inputClass} leading-relaxed resize-none placeholder:text-white/20`}
                    placeholder="Describe your approach to acquiring art..."
                  />
                </div>
              </div>
            </fieldset>

            {/* Acquisition Interests */}
            <fieldset className="space-y-12 border-none p-0">
              <legend className="flex justify-between items-center w-full mb-8">
                <span className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold flex items-center gap-3">
                  <span className="opacity-50 text-[8px]" aria-hidden="true">
                    02.
                  </span>
                  Interest Mapping
                </span>
                <span className="text-[9px] font-jakarta text-white/30 uppercase">
                  Select all that apply
                </span>
              </legend>

              <div
                className="flex flex-wrap gap-3"
                role="group"
                aria-label="Artistic interest tags"
              >
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    className="px-6 py-3 border border-glass text-[10px] font-jakarta uppercase tracking-widest text-dim hover:border-brand hover:text-white transition-all duration-300 min-h-11"
                  >
                    {interest}
                  </button>
                ))}
                <button
                  type="button"
                  className="px-6 py-3 border border-glass border-dashed text-[10px] font-jakarta uppercase tracking-widest text-brand hover:bg-brand/5 transition-all flex items-center gap-2 min-h-11"
                >
                  <LuPlus size={14} aria-hidden="true" /> Add Custom
                </button>
              </div>
            </fieldset>

            {/* Privacy & Protection */}
            <fieldset className="space-y-12 border-none p-0">
              <legend className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold flex items-center gap-3 mb-8">
                <span className="opacity-50 text-[8px]" aria-hidden="true">
                  03.
                </span>
                Vault Privacy
              </legend>
              <div className="space-y-6">
                {[
                  {
                    id: "gallery-visibility",
                    title: "Public Gallery Visibility",
                    desc: "Allow other users to view your acquired pieces in a read-only gallery.",
                    icon: <LuEye size={20} />,
                    enabled: true,
                  },
                  {
                    id: "anon-bidding",
                    title: "Anonymized Bidding",
                    desc: "Hide your identity during live auctions, showing only a generic alias.",
                    icon: <LuShieldCheck size={20} />,
                    enabled: false,
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-6 border border-glass bg-surface"
                  >
                    <div className="flex gap-6">
                      <div className="text-brand pt-1" aria-hidden="true">
                        {item.icon}
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor={item.id}
                          className="font-jakarta text-xs font-bold uppercase tracking-widest cursor-pointer"
                        >
                          {item.title}
                        </label>
                        <p className="font-jakarta text-[11px] text-dim leading-relaxed max-w-sm">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <button
                      id={item.id}
                      type="button"
                      role="switch"
                      aria-checked={item.enabled}
                      aria-label={`Toggle ${item.title}`}
                      className={`w-12 h-6 rounded-full relative transition-colors focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-bg-primary ${
                        item.enabled ? "bg-brand" : "bg-white/10"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          item.enabled ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </fieldset>
          </form>
        </div>

        {/* Collector Identity Card */}
        <aside className="lg:col-span-5" aria-label="Public profile preview">
          <div className="sticky top-32 space-y-8">
            <p className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-dim font-bold text-center">
              Archival Preview
            </p>

            <article className="relative bg-[#080808] border border-glass p-10 space-y-10 overflow-hidden group shadow-2xl">
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-brand/5 -rotate-45 translate-x-16 -translate-y-16"
                aria-hidden="true"
              />

              <header className="space-y-6">
                <div className="w-24 h-24 bg-neutral-900 border border-glass flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/artist.webp"
                    alt="Collector Avatar Preview"
                    fill
                    className="object-cover grayscale opacity-50"
                  />
                  <span className="relative z-10 font-luxury text-3xl text-white">
                    V_C
                  </span>
                </div>
                <div className="space-y-2">
                  <h2 className="font-luxury text-4xl">Vault_Collector_42</h2>
                  <div className="flex items-center gap-2">
                    <LuShieldCheck
                      className="text-brand"
                      size={14}
                      aria-hidden="true"
                    />
                    <p className="font-jakarta text-[9px] uppercase tracking-[0.4em] text-brand font-bold">
                      Certified Curator
                    </p>
                  </div>
                </div>
              </header>

              <div className="space-y-4">
                <p className="font-jakarta text-[10px] uppercase tracking-widest text-dim">
                  Philosophy
                </p>
                <p className="font-jakarta text-xs text-muted leading-relaxed italic">
                  "Curating a digital lineage that bridges the gap between
                  traditional oil work and algorithmic generation."
                </p>
              </div>

              <div className="pt-8 border-t border-glass flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                    Acquisitions
                  </p>
                  <p className="font-luxury text-xl">12 Pieces</p>
                </div>
                <div className="h-8 w-px bg-glass" aria-hidden="true" />
                <div className="space-y-1 text-right">
                  <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                    Location
                  </p>
                  <p className="font-jakarta text-xs uppercase tracking-widest">
                    Nagpur, IN
                  </p>
                </div>
              </div>
            </article>

            <div className="p-6 bg-brand/5 border border-brand/10 space-y-3">
              <div className="flex items-center gap-3">
                <LuShieldCheck
                  className="text-brand"
                  size={18}
                  aria-hidden="true"
                />
                <p className="font-jakarta text-[10px] font-bold uppercase tracking-widest">
                  Provenance Guarantee
                </p>
              </div>
              <p className="font-jakarta text-[11px] text-muted leading-relaxed">
                Your identity configuration is used to generate digital
                certificates of authenticity for every masterpiece you acquire.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CollectorProfilePage;
