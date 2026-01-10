"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import LotSelectorModal from "@/components/molecules/LotSelectorModal";
import { LuGavel, LuPlus, LuShieldCheck, LuTrash2 } from "react-icons/lu";

const CreateAuctionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLots, setSelectedLots] = useState<any[]>([]);

  const inputClass =
    "w-full bg-transparent shadow-none border-0 border-b border-white/20 py-3 font-jakarta text-sm text-white outline-none focus:border-brand focus:shadow-none transition-all duration-500 placeholder:text-white/20 hover:border-white/40";

  const handleSelectArtwork = (id: string) => {
    const mockArtwork = {
      id,
      title: "Masterpiece Asset",
      artist: "Verified Creator",
      val: "₹2.5L",
    };

    setSelectedLots((prev) =>
      prev.find((item) => item.id === id)
        ? prev.filter((item) => item.id !== id)
        : [...prev, mockArtwork]
    );
  };

  return (
    <main className="min-h-screen pt-12 pb-20 px-6 md:px-10">
      <LotSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectArtwork}
        selectedIds={selectedLots.map((l) => l.id)}
      />

      <div className="max-w-7xl mx-auto space-y-16">
        <section
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-glass pb-12"
          aria-label="Page Header"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" aria-hidden="true" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Event Orchestration
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-luxury leading-none tracking-tight">
              Initiate <span className="italic text-muted">Exhibition.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              title="Save Draft"
              ariaLabel="Save exhibition as draft"
              variant="ghost"
              className="h-14"
            />
            <div
              className="h-14 w-px bg-glass hidden md:block"
              aria-hidden="true"
            />
            <Button
              title="Launch Global Auction"
              ariaLabel="Launch this exhibition to the global marketplace"
              className={`h-14 px-10 text-[10px] font-bold tracking-widest transition-all ${
                selectedLots.length > 0
                  ? "shadow-neon opacity-100"
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={selectedLots.length === 0}
            />
          </div>
        </section>

        <form className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7 space-y-16">
            <fieldset className="space-y-10 border-none p-0 m-0">
              <legend className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold flex items-center gap-3 mb-8">
                <span className="opacity-50 text-[8px]" aria-hidden="true">
                  01.
                </span>
                Exhibition Identity
              </legend>
              <div className="space-y-12">
                <Input
                  label="Exhibition Title"
                  className={inputClass}
                  placeholder="e.g., The Neo-Baroque Sequence"
                  required
                />
                <div className="space-y-4">
                  <label
                    htmlFor="manifesto"
                    className="font-jakarta text-[9px] uppercase tracking-widest text-dim font-bold"
                  >
                    Curatorial Manifesto
                  </label>
                  <textarea
                    id="manifesto"
                    rows={4}
                    className={`${inputClass} leading-relaxed resize-none placeholder:text-white/20`}
                    placeholder="Describe the conceptual framework..."
                    required
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-10 border-none p-0 m-0">
              <div className="flex justify-between items-center mb-8">
                <legend className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold flex items-center gap-3">
                  <span className="opacity-50 text-[8px]" aria-hidden="true">
                    02.
                  </span>
                  Lot Sequencing
                </legend>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Add artworks from curation pool"
                  className="flex items-center gap-2 text-brand text-[9px] uppercase tracking-widest font-bold hover:text-white transition-colors min-h-11"
                >
                  <LuPlus size={14} aria-hidden="true" /> Open Curation Pool
                </button>
              </div>

              <div className="space-y-4" role="list">
                {selectedLots.length > 0 ? (
                  selectedLots.map((lot, index) => (
                    <article
                      key={lot.id}
                      role="listitem"
                      className="p-6 bg-surface border border-glass flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-6">
                        <span
                          className="font-mono text-[10px] text-brand"
                          aria-label={`Position ${index + 1}`}
                        >
                          #{index + 1}
                        </span>
                        <div className="space-y-1">
                          <h4 className="font-luxury text-xl m-0">
                            {lot.title}
                          </h4>
                          <p className="font-jakarta text-[9px] text-dim uppercase m-0">
                            {lot.artist}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <p className="font-luxury text-xl m-0">{lot.val}</p>
                        <button
                          type="button"
                          aria-label={`Remove ${lot.title} from sequence`}
                          onClick={() => handleSelectArtwork(lot.id)}
                          className="w-10 h-10 flex items-center justify-center text-dim hover:text-red-500 transition-colors"
                        >
                          <LuTrash2 size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="p-16 border border-dashed border-glass flex flex-col items-center justify-center space-y-4 text-white/20">
                    <LuGavel size={32} aria-hidden="true" />
                    <p className="font-jakarta text-[9px] uppercase tracking-[0.4em]">
                      No Masterpieces Selected
                    </p>
                  </div>
                )}
              </div>
            </fieldset>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              <section className="p-10 border border-glass bg-surface space-y-10 shadow-2xl relative">
                <div
                  className="absolute top-0 left-0 w-1 h-full bg-brand"
                  aria-hidden="true"
                />
                <h2 className="font-luxury text-3xl">Temporal Gates</h2>
                <div className="space-y-8">
                  <div className="space-y-6">
                    <label
                      htmlFor="exec-date"
                      className="font-jakarta text-[10px] font-bold uppercase tracking-widest"
                    >
                      Execution Date
                    </label>
                    <input
                      type="date"
                      id="exec-date"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <input
                        type="time"
                        id="start-time"
                        className={inputClass}
                        title="Start Time"
                        required
                      />
                    </div>
                    <div className="space-y-4">
                      <input
                        type="time"
                        id="end-time"
                        className={inputClass}
                        title="End Time"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label htmlFor="auction-type" className="sr-only">
                      Auction Protocol
                    </label>
                    <select id="auction-type" className={`${inputClass}`}>
                      <option>Standard Ascending (English)</option>
                      <option>Dutch (Falling Price)</option>
                    </select>
                  </div>
                </div>
                <div className="pt-8 border-t border-glass">
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 text-emerald-400">
                    <LuShieldCheck size={18} aria-hidden="true" />
                    <p className="font-jakarta text-[9px] font-bold uppercase tracking-widest">
                      Protocol: Ready
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default CreateAuctionPage;
