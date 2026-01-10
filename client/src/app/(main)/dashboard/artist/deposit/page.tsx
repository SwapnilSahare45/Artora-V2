"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import {
  LuCheck,
  LuChevronRight,
  LuChevronLeft,
  LuGavel,
  LuTag,
  LuInfo,
  LuShieldCheck,
} from "react-icons/lu";
import { FiUploadCloud } from "react-icons/fi";

const DepositArtworkPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [salePath, setSalePath] = useState<"auction" | "direct" | null>(null);

  const steps = [
    { id: 1, title: "Asset & Provenance" },
    { id: 2, title: "Artwork Particulars" },
    { id: 3, title: "Sale Mechanics" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b border-white/20 py-3 font-jakarta text-sm text-white outline-none focus:border-brand transition-all placeholder:text-white/30 hover:border-white/40";

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-4xl mx-auto space-y-16">
        <section className="space-y-8" aria-label="Submission Progress">
          <header className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-brand" aria-hidden="true" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Studio Deposit
              </p>
              <span className="w-8 h-px bg-brand" aria-hidden="true" />
            </div>
            <h1 className="text-5xl md:text-6xl font-luxury leading-none tracking-tight">
              Submit New <span className="italic text-muted">Masterpiece.</span>
            </h1>
          </header>

          <nav
            aria-label="Progress Stepper"
            className="flex items-center justify-center"
          >
            <ol className="flex items-center w-full max-w-xl">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                return (
                  <li
                    key={step.id}
                    className={`flex-1 flex items-center ${
                      index !== steps.length - 1
                        ? "after:content-[''] after:w-full after:h-px after:bg-white/10 after:mx-4"
                        : ""
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-[10px] font-bold font-jakarta border transition-all ${
                          isCompleted
                            ? "bg-brand border-brand text-white"
                            : isActive
                            ? "border-brand text-brand shadow-neon"
                            : "border-white/20 text-white/30"
                        }`}
                      >
                        {isCompleted ? (
                          <LuCheck size={14} aria-hidden="true" />
                        ) : (
                          `0${step.id}`
                        )}
                        <span className="sr-only">
                          {isCompleted
                            ? "Completed"
                            : isActive
                            ? "Current"
                            : "Upcoming"}
                        </span>
                      </span>
                      <span
                        className={`hidden md:block font-jakarta text-[10px] uppercase tracking-widest whitespace-nowrap ${
                          isActive ? "text-white font-bold" : "text-dim"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>
        </section>

        {/* Form */}
        <section className="bg-surface border border-glass p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <form className="space-y-12">
            {/* Step 1: Asset Upload */}
            {currentStep === 1 && (
              <fieldset className="space-y-8 border-none">
                <legend className="sr-only">Digital Asset & Provenance</legend>
                <div className="space-y-2">
                  <h2 className="font-luxury text-2xl">Digital Asset Upload</h2>
                  <p className="font-jakarta text-xs text-dim">
                    Provide the high-resolution source file. This will be
                    encrypted and stored in the vault.
                  </p>
                </div>

                <div
                  className="border-2 border-dashed border-glass hover:border-brand/50 transition-colors bg-surface-hover/30 p-12 flex flex-col items-center justify-center gap-6 text-center group cursor-pointer rounded-lg"
                  role="button"
                  aria-label="Upload artwork master file"
                  tabIndex={0}
                >
                  <div
                    className="p-6 bg-glass rounded-full text-muted group-hover:text-brand group-hover:shadow-neon transition-all"
                    aria-hidden="true"
                  >
                    <FiUploadCloud size={32} />
                  </div>
                  <div className="space-y-2">
                    <p className="font-jakarta text-sm font-bold uppercase tracking-widest">
                      Drag master file here
                    </p>
                    <p className="font-jakarta text-xs text-muted">
                      or click to browse local storage
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-brand/5 border border-brand/20">
                  <LuShieldCheck
                    className="text-brand mt-0.5 shrink-0"
                    size={16}
                    aria-hidden="true"
                  />
                  <p className="font-jakarta text-xs text-muted leading-relaxed">
                    I certify that I am the original creator of this work and
                    hold all necessary rights. This action generates an
                    immutable provenance record.
                  </p>
                </div>
              </fieldset>
            )}

            {/* Step 2: Artwork Particulars */}
            {currentStep === 2 && (
              <fieldset className="space-y-10 border-none">
                <legend className="sr-only">Artwork Details</legend>
                <div className="space-y-2">
                  <h2 className="font-luxury text-2xl">Artwork Particulars</h2>
                  <p className="font-jakarta text-xs text-muted">
                    Define the core identity of the piece.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input
                    label="Artwork Title"
                    placeholder="e.g., The Chromatic Echo"
                    className="md:col-span-2"
                  />
                  <Input
                    label="Medium / Technique"
                    placeholder="e.g., Oil on Linen"
                  />
                  <Input label="Year of Creation" placeholder="2026" />
                  <Input label="Dimensions" placeholder="120 x 120 cm" />

                  <div className="md:col-span-2 space-y-3">
                    <label className="font-jakarta text-[9px] uppercase tracking-widest text-mute font-bold">
                      Manifesto / Description
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-transparent border p-4 font-jakarta text-sm outline-none focus:border-brand transition-all resize-none placeholder:text-white/20"
                      placeholder="Describe the conceptual framework..."
                      aria-required="true"
                    />
                  </div>
                </div>
              </fieldset>
            )}

            {/* Step 3: Valuation & Mechanics */}
            {currentStep === 3 && (
              <fieldset className="space-y-12 border-none">
                <legend className="sr-only">
                  Acquisition Path & Valuation
                </legend>
                <div className="space-y-2">
                  <h2 className="font-luxury text-2xl">Acquisition Path</h2>
                  <p className="font-jakarta text-xs text-muted">
                    Choose how this masterpiece should reach the collection.
                  </p>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  role="radiogroup"
                  aria-label="Sale Type Selection"
                >
                  {/* Auction Path Card */}
                  <button
                    type="button"
                    role="radio"
                    aria-checked={salePath === "auction"}
                    onClick={() => setSalePath("auction")}
                    className={`p-8 text-left border transition-all space-y-4 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand ${
                      salePath === "auction"
                        ? "border-brand bg-brand/5"
                        : "border-glass bg-surface-hover opacity-60 hover:opacity-100"
                    }`}
                  >
                    {salePath === "auction" && (
                      <LuCheck
                        className="absolute top-4 right-4 text-brand"
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                    <LuGavel
                      size={28}
                      className={
                        salePath === "auction" ? "text-brand" : "text-muted"
                      }
                      aria-hidden="true"
                    />
                    <div className="space-y-2">
                      <h3 className="font-luxury text-xl">
                        Request for Auction
                      </h3>
                      <p className="font-jakarta text-[10px] text-muted uppercase tracking-wider leading-relaxed">
                        Submit to the Curation Pool. The Architect will schedule
                        this piece into a themed exhibition.
                      </p>
                    </div>
                  </button>

                  {/* Direct Sale Card */}
                  <button
                    type="button"
                    role="radio"
                    aria-checked={salePath === "direct"}
                    onClick={() => setSalePath("direct")}
                    className={`p-8 text-left border transition-all space-y-4 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand ${
                      salePath === "direct"
                        ? "border-brand bg-brand/5"
                        : "border-glass bg-surface-hover opacity-60 hover:opacity-100"
                    }`}
                  >
                    {salePath === "direct" && (
                      <LuCheck
                        className="absolute top-4 right-4 text-brand"
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                    <LuTag
                      size={28}
                      className={
                        salePath === "direct" ? "text-brand" : "text-muted"
                      }
                      aria-hidden="true"
                    />
                    <div className="space-y-2">
                      <h3 className="font-luxury text-xl">
                        Direct Marketplace
                      </h3>
                      <p className="font-jakarta text-[10px] text-dim uppercase tracking-wider leading-relaxed">
                        List immediately at a fixed valuation. Piece goes live
                        once verified by moderation.
                      </p>
                    </div>
                  </button>
                </div>

                {salePath && (
                  <div className="pt-10 border-t border-glass space-y-8">
                    <h3 className="font-jakarta text-[10px] uppercase tracking-[0.3em] text-brand font-bold">
                      {salePath === "auction"
                        ? "Curatorial Suggestion"
                        : "Market Valuation"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative flex items-center">
                        <span
                          className="absolute text-dim font-luxury"
                          aria-hidden="true"
                        >
                          ₹
                        </span>
                        <Input
                          label={
                            salePath === "auction"
                              ? "Suggested Reserve Price"
                              : "Acquisition Price"
                          }
                          placeholder="25,000"
                          className="pl-6 bg-transparent border-0 border-b border-white/20 py-3 focus:shadow-none"
                        />
                      </div>

                      {salePath === "auction" ? (
                        <div className="flex items-center gap-4 p-4 bg-surface-hover border border-white/5">
                          <LuInfo
                            size={18}
                            className="text-brand shrink-0"
                            aria-hidden="true"
                          />
                          <p className="font-jakarta text-[8px] text-dim uppercase tracking-widest leading-relaxed">
                            Final exhibition dates and sequencing are determined
                            by the Architect to ensure maximum liquidity.
                          </p>
                        </div>
                      ) : (
                        <Input
                          label="Available Editions"
                          placeholder="e.g. 1/1"
                          className={inputClass}
                          required
                        />
                      )}
                    </div>
                  </div>
                )}
              </fieldset>
            )}

            {/* Navigation footer */}
            <footer className="mt-12 pt-8 border-t border-glass flex justify-between items-center font-jakarta uppercase tracking-widest text-[10px]">
              <Button
                title="Back"
                variant="outline"
                onClick={handleBack}
                icon={<LuChevronLeft size={14} aria-hidden="true" />}
                className="text-[10px]! font-normal capitalize!"
              />

              <Button
                title={
                  currentStep === steps.length
                    ? "Submit for Approval"
                    : "Continue"
                }
                ariaLabel={
                  currentStep === steps.length
                    ? "Finalize and submit artwork"
                    : "Go to next step"
                }
                onClick={currentStep === steps.length ? undefined : handleNext}
                icon={
                  currentStep !== steps.length ? (
                    <LuChevronRight size={16} aria-hidden="true" />
                  ) : undefined
                }
                iconPosition="right"
                className="h-14 px-10 shadow-neon"
                disabled={currentStep === 3 && !salePath}
              />
            </footer>
          </form>
        </section>
      </div>
    </main>
  );
};

export default DepositArtworkPage;
