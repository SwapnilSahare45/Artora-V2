import { Metadata } from "next";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Image from "next/image";
import { LuShieldCheck, LuTruck, LuLock, LuCreditCard } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Acquisition Settlement | Artora Protocol",
  description:
    "Secure the final reconciliation of your acquired masterpiece under the Artora Protocol.",
};

const CheckoutPage = () => {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-16">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-brand" aria-hidden="true" />
              <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
                Final Settlement
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl font-luxury leading-none tracking-tight">
              Secure your{" "}
              <span className="italic text-muted">Acquisition.</span>
            </h1>
          </header>

          <form className="space-y-12">
            {/* Shipping */}
            <fieldset className="space-y-8 border-none p-0">
              <legend className="font-jakarta text-[11px] uppercase tracking-[0.4em]font-bold flex items-center gap-3 mb-8">
                <LuTruck className="text-brand" size={16} aria-hidden="true" />
                01. Delivery Logistics
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input label="Full Name" placeholder="Swapnil Sahare" />
                <Input label="Phone Number" placeholder="+91 9370595448" />
                <Input
                  label="Delivery Address"
                  className="md:col-span-2"
                  placeholder="Suite 402, High-Rise Towers, Nagpur"
                />
                <Input label="City" placeholder="Nagpur" />
                <Input label="Postal Code" placeholder="440001" />
              </div>
            </fieldset>

            {/* Payment */}
            <fieldset
              className="space-y-8 border-none p-0 m-0"
              role="radiogroup"
              aria-labelledby="payment-label"
            >
              <legend
                id="payment-label"
                className="font-jakarta text-[11px] uppercase tracking-[0.4em] font-bold flex items-center gap-3 mb-8"
              >
                <LuCreditCard
                  className="text-brand"
                  size={16}
                  aria-hidden="true"
                />
                02. Secure Reconciliation
              </legend>
              <div className="space-y-4">
                {/* Payment Method Options */}
                <div
                  className="p-6 border border-brand bg-brand/5 flex items-center justify-between group cursor-pointer"
                  role="radio"
                  aria-checked="true"
                  tabIndex={0}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full border border-brand flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="w-2 h-2 bg-brand rounded-full" />
                    </div>
                    <div>
                      <p className="font-jakarta text-[10px] font-bold uppercase tracking-widest">
                        Bank Transfer / UPI (INR)
                      </p>
                      <p className="font-jakarta text-[9px] text-dim uppercase tracking-tighter">
                        Zero processing fees for Indian Residents
                      </p>
                    </div>
                  </div>
                  <LuLock
                    className="text-brand/40"
                    size={18}
                    aria-hidden="true"
                  />
                </div>

                <div
                  className="p-6 border border-glass bg-surface flex items-center justify-between opacity-50 grayscale cursor-not-allowed"
                  role="radio"
                  aria-checked="false"
                  aria-disabled="true"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full border border-glass"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-jakarta text-[10px] font-bold uppercase tracking-widest">
                        International Credit Card
                      </p>
                      <p className="font-jakarta text-[9px] text-dim uppercase tracking-tighter">
                        Subject to currency conversion (USD/EUR)
                      </p>
                    </div>
                  </div>
                  <LuLock className="text-dim" size={18} aria-hidden="true" />
                </div>
              </div>
            </fieldset>

            {/* Terms Acceptance */}
            <div className="flex items-start gap-4 p-6 bg-surface border border-glass">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 accent-brand cursor-pointer"
                id="terms"
                required
              />
              <label
                htmlFor="terms"
                className="font-jakarta text-[10px] text-dim leading-relaxed uppercase tracking-widest cursor-pointer select-none"
              >
                I acknowledge that this acquisition is binding. The masterpiece
                will be released from the Artora Protocol Vault once the
                reconciliation is settled in full.
              </label>
            </div>
          </form>
        </div>

        <aside className="lg:col-span-5" aria-labelledby="summary-heading">
          <div className="sticky top-32 space-y-8">
            <article className="bg-surface border border-glass p-10 space-y-10 shadow-2xl relative overflow-hidden">
              <h2 className="font-luxury text-3xl">Acquisition Summary</h2>

              <div className="flex items-center gap-6 pb-10 border-b border-glass">
                <div className="relative w-24 h-24 overflow-hidden shrink-0 bg-glass">
                  <Image
                    src="/hero-2.webp"
                    alt="Acquired artwork: Digital Renaissance"
                    fill
                    className="object-cover grayscale"
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-jakarta text-[9px] uppercase tracking-widest text-brand font-bold">
                    Lot #ART-2026-042
                  </p>
                  <h3 className="font-luxury text-xl">Digital Renaissance</h3>
                  <p className="font-jakarta text-[10px] text-dim uppercase tracking-widest italic">
                    Swapnil Sahare
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <dl className="space-y-6">
                  <div className="flex justify-between font-jakarta text-[10px] uppercase tracking-widest">
                    <dt className="text-dim">Winning Bid</dt>
                    <dd>₹2,50,000</dd>
                  </div>
                  <div className="flex justify-between font-jakarta text-[10px] uppercase tracking-widest">
                    <dt className="text-dim">GST (12%)</dt>
                    <dd>₹30,000</dd>
                  </div>
                  <div className="flex justify-between font-jakarta text-[10px] uppercase tracking-widest">
                    <dt className="text-dim">White-Glove Shipping</dt>
                    <dd className="text-brand font-bold">Complimentary</dd>
                  </div>
                </dl>

                <div className="pt-6 border-t border-brand/20 flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold">
                      Total Valuation
                    </p>
                    <p className="text-[8px] text-dim uppercase">
                      Reconciled in INR
                    </p>
                  </div>
                  <p className="font-luxury text-4xl">₹2,80,000</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Button
                  title="Finalize Acquisition"
                  ariaLabel="Finalize and pay ₹2,80,000 for your acquisition"
                  className="w-full h-16 shadow-neon text-[11px]!"
                />
                <div className="flex items-center justify-center gap-3 text-dim">
                  <LuShieldCheck
                    size={16}
                    className="text-brand"
                    aria-hidden="true"
                  />
                  <p className="font-jakarta text-[9px] uppercase tracking-[0.2em]">
                    Provenance Guaranteed by Artora
                  </p>
                </div>
              </div>
            </article>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CheckoutPage;
