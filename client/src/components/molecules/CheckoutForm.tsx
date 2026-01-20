"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { LuShieldCheck, LuTruck, LuLock } from "react-icons/lu";

interface CheckoutFormProps {
  artwork: {
    _id: string;
    title: string;
    imageURL: string;
    salePath: "direct" | "auction";
  };
  artistName: string;
  displayPrice: number;
}

interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
  terms: boolean;
}

const CheckoutForm = ({
  artwork,
  artistName,
  displayPrice,
}: CheckoutFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>();

  const onFormSubmit = async (data: CheckoutFormData) => {
    const orderPromise = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            artworkId: artwork._id,
            name: data.name,
            phone: data.phone,
            address: data.address,
            city: data.city,
            postal: data.postal,
            paymentMethod: "cod",
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to place order");
      }

      // Clear form
      reset();

      // Redirect to orders page after success
      setTimeout(() => {
        router.push("/artworks");
      }, 1500);

      return result;
    };

    toast.promise(orderPromise(), {
      loading: "Processing your acquisition...",
      success: (data) => data.message || "Order placed successfully!",
      error: (err) => err.message,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      {/* Shipping & COD*/}
      <div className="order-1 lg:col-span-7 space-y-16">
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-brand" />
            <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
              Final Settlement
            </p>
          </div>
          <h1 className="text-5xl md:text-6xl font-luxury leading-none tracking-tight">
            Secure your{" "}
            <span className="italic text-muted">{artwork.title}</span>
          </h1>
        </header>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-12">
          {/* Shipping Information */}
          <fieldset className="space-y-8 border-none p-0">
            <legend className="font-jakarta text-[11px] uppercase tracking-[0.4em] font-bold flex items-center gap-3 mb-8">
              <LuTruck className="text-brand" size={16} />
              01. Delivery Logistics
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                label="Full Name"
                placeholder="Swapnil Sahare"
                {...register("name", {
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                error={errors.name?.message}
              />
              <Input
                label="Phone Number"
                placeholder="+91 9370595448"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[+]?[0-9]{10,15}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                error={errors.phone?.message}
              />
              <Input
                label="Delivery Address"
                placeholder="Suite 402, High-Rise Towers, Nagpur"
                className="md:col-span-2"
                {...register("address", {
                  required: "Delivery address is required",
                  minLength: {
                    value: 10,
                    message: "Please enter a complete address",
                  },
                })}
                error={errors.address?.message}
              />
              <Input
                label="City"
                placeholder="Nagpur"
                {...register("city", {
                  required: "City is required",
                })}
                error={errors.city?.message}
              />
              <Input
                label="Postal Code"
                placeholder="440001"
                {...register("postal", {
                  required: "Postal code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Please enter a valid 6-digit postal code",
                  },
                })}
                error={errors.postal?.message}
              />
            </div>
          </fieldset>

          {/* Payment Method */}
          <fieldset className="space-y-4 border-none p-0 m-0">
            <legend className="font-jakarta text-[11px] uppercase tracking-[0.4em] font-bold flex items-center gap-3 mb-8">
              <LuLock className="text-brand" size={16} />
              02. Cash on Delivery
            </legend>

            <div className="p-6 border border-brand bg-brand/5 flex justify-between items-center">
              <div>
                <p className="font-jakarta text-[10px] font-bold uppercase tracking-widest text-brand">
                  Cash on Delivery
                </p>
                <p className="font-jakarta text-[9px] text-dim uppercase tracking-tighter mt-1">
                  Available within India only
                </p>
              </div>
              <LuLock className="text-brand" size={18} />
            </div>
          </fieldset>

          {/* Terms & Conditions */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-6 bg-surface border border-glass">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must accept the terms and conditions",
                })}
                className="mt-1 w-4 h-4 accent-brand cursor-pointer"
              />
              <label className="font-jakarta text-[10px] text-dim leading-relaxed uppercase tracking-widest cursor-pointer select-none">
                I acknowledge that this acquisition is binding. The masterpiece
                will be released once the reconciliation is settled in full.
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-400 text-xs ml-10">
                {errors.terms.message}
              </p>
            )}
          </div>

          <Button
            title={isSubmitting ? "Processing..." : "Place Order"}
            ariaLabel="Place order with Cash on Delivery"
            className="w-full h-16 shadow-neon text-[11px]!"
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>

      {/* Order Summary */}
      <aside className="lg:col-span-5">
        <div className="sticky top-32 space-y-8">
          <article className="bg-surface border border-glass p-10 space-y-10 shadow-2xl relative overflow-hidden">
            <h2 className="font-luxury text-3xl">Acquisition Summary</h2>

            <div className="flex items-center gap-6 pb-10 border-b border-glass">
              <div className="relative w-24 h-24 overflow-hidden shrink-0 bg-glass">
                <Image
                  src={artwork.imageURL}
                  alt={artwork.title}
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div className="space-y-1">
                <p className="font-jakarta text-[9px] uppercase tracking-widest text-brand font-bold">
                  Lot #{artwork._id.slice(-6).toUpperCase()}
                </p>
                <h3 className="font-luxury text-xl">{artwork.title}</h3>
                <p className="font-jakarta text-[10px] text-dim uppercase tracking-widest italic">
                  {artistName}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <dl className="space-y-6">
                <div className="flex justify-between font-jakarta text-[10px] uppercase tracking-widest">
                  <dt className="text-dim">Price</dt>
                  <dd>₹{displayPrice.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between font-jakarta text-[10px] uppercase tracking-widest">
                  <dt className="text-dim">White-Glove Shipping</dt>
                  <dd className="text-brand font-bold">Complimentary</dd>
                </div>
                <div className="flex justify-between font-jakarta text-[10px] uppercase tracking-widest">
                  <dt className="text-dim">Payment Method</dt>
                  <dd className="text-white">Cash on Delivery</dd>
                </div>
              </dl>

              <div className="pt-6 border-t border-brand/20 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold">
                    Total
                  </p>
                  <p className="text-[8px] text-dim uppercase">
                    Reconciled in INR
                  </p>
                </div>
                <p className="font-luxury text-4xl">
                  ₹{displayPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 text-dim mt-4">
              <LuShieldCheck size={16} className="text-brand" />
              <p className="font-jakarta text-[9px] uppercase tracking-[0.2em]">
                Provenance Guaranteed by Artora
              </p>
            </div>
          </article>
        </div>
      </aside>
    </div>
  );
};

export default CheckoutForm;
