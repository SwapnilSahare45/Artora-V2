"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LuGavel,
  LuPlus,
  LuShieldCheck,
  LuTrash2,
  LuCalendar,
  LuClock,
} from "react-icons/lu";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import LotSelectorModal from "@/components/molecules/LotSelectorModal";

const CreateAuctionPage = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stores selected artworks for auction
  const [selectedLots, setSelectedLots] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  const inputClass =
    "w-full bg-transparent border-0 border-b border-white/20 py-3 font-jakarta text-sm text-white outline-none focus:border-brand focus:shadow-none transition-all cursor-pointer";

  // Add / Remove artworks from selected lot
  const handleSelectArtwork = (artwork: any) => {
    setSelectedLots(
      (prev) =>
        prev.find((i) => i._id === artwork._id)
          ? prev.filter((i) => i._id !== artwork._id) // remove if already selectec
          : [...prev, artwork], // add if not selcted
    );
  };

  // Auction submit handler
  const handleLaunchAuction = async (e: React.FormEvent) => {
    e.preventDefault();

    // at least one artwork must be selected
    if (selectedLots.length === 0) return toast.error("Selection required.");

    const auctionPromise = async () => {
      const start = new Date(`${formData.startDate}T${formData.startTime}`);
      const end = new Date(`${formData.endDate}T${formData.endTime}`);

      // End date must be after start date
      if (end <= start) throw new Error("Conclusion must follow Commencement.");

      // API call to create auction
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/auction/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            artworkIds: selectedLots.map((l) => l._id),
            startDate: start.toISOString(),
            endDate: end.toISOString(),
          }),
          credentials: "include",
        },
      );

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed");

      // Redirect to scheduler after success
      setTimeout(() => router.push("/admin/scheduler"), 2000);

      return data;
    };

    toast.promise(auctionPromise(), {
      loading: "Orchestrating Exhibition Protocol...",
      success: "Exhibition scheduled successfully.",
      error: (err) => err.message,
    });
  };

  return (
    <main className="min-h-screen pt-18 lg:pt-0 pb-20 px-6 md:px-10">
      <LotSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectArtwork}
        selectedIds={selectedLots.map((l) => l._id)}
      />

      <div className="max-w-7xl mx-auto space-y-16">
        <header className="flex justify-between items-end border-b border-glass pb-12">
          <h1 className="text-7xl font-luxury leading-none">
            Initiate <span className="italic text-brand">Exhibition.</span>
          </h1>
        </header>

        <form
          className="grid grid-cols-1 lg:grid-cols-12 gap-20"
          onSubmit={handleLaunchAuction}
        >
          <div className="lg:col-span-7 space-y-16">
            <fieldset className="space-y-10 border-none p-0">
              <legend className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold">
                01. Identity
              </legend>
              <Input
                label="Exhibition Title"
                className={inputClass.replace("cursor-pointer", "")}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
              <textarea
                rows={4}
                className={`${inputClass.replace(
                  "cursor-pointer",
                  "",
                )} leading-relaxed resize-none`}
                placeholder="Curatorial Manifesto"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </fieldset>

            <fieldset className="space-y-10 border-none p-0">
              <div className="flex justify-between items-center">
                <legend className="font-jakarta text-[10px] uppercase text-brand font-bold">
                  02. Lots
                </legend>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-brand text-[9px] uppercase tracking-widest font-bold flex items-center gap-2"
                >
                  <LuPlus /> Open Curation Pool
                </button>
              </div>
              <div className="space-y-4">
                {selectedLots.length > 0 ? (
                  selectedLots.map((lot, i) => (
                    <article
                      key={lot._id}
                      className="p-6 bg-surface border border-glass flex justify-between items-center"
                    >
                      <div className="flex items-center gap-6">
                        <span className="text-brand font-mono text-[10px]">
                          #{i + 1}
                        </span>
                        <div>
                          <h4 className="font-luxury text-xl">{lot.title}</h4>
                          <p className="text-dim text-[9px] uppercase tracking-widest">
                            {lot.artist?.firstName} {lot.artist?.lastName}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSelectArtwork(lot)}
                        className="text-dim hover:text-red-500"
                      >
                        <LuTrash2 size={16} />
                      </button>
                    </article>
                  ))
                ) : (
                  <div className="p-16 border border-dashed border-glass text-center text-white/20 uppercase text-[9px] tracking-widest">
                    <LuGavel size={32} className="mx-auto mb-4" /> No Selection
                  </div>
                )}
              </div>
            </fieldset>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-32 p-10 border border-glass bg-surface space-y-12 overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand" />
              <h2 className="font-luxury text-3xl">Temporal Gates</h2>
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-brand text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <LuCalendar size={14} /> Commencement
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      className={inputClass}
                      onClick={(e) => e.currentTarget.showPicker()}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      required
                    />
                    <input
                      type="time"
                      className={inputClass}
                      onClick={(e) => e.currentTarget.showPicker()}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <LuClock size={14} /> Conclusion
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      className={inputClass}
                      onClick={(e) => e.currentTarget.showPicker()}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      required
                    />
                    <input
                      type="time"
                      className={inputClass}
                      onClick={(e) => e.currentTarget.showPicker()}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div
                className={`p-4 border text-[9px] font-bold uppercase tracking-widest flex items-center gap-3 transition-all ${
                  selectedLots.length > 0
                    ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-400"
                    : "bg-white/5 border-white/10 text-dim"
                }`}
              >
                <LuShieldCheck size={18} /> Protocol:{" "}
                {selectedLots.length > 0 ? "Ready" : "Staging"}
              </div>

              <Button
                type="submit"
                title="Launch Global Auction"
                className={`h-14 w-full px-10 transition-all ${
                  selectedLots.length > 0 ? "shadow-neon" : "opacity-50"
                }`}
                disabled={selectedLots.length === 0}
              />
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default CreateAuctionPage;
