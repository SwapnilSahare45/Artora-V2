"use client";

import { useState, ChangeEvent } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { LuCheck, LuGavel, LuTag, LuShieldCheck } from "react-icons/lu";
import { FiUploadCloud } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ART_CATEGORIES, ART_MEDIUMS } from "@/types";

const DepositArtworkPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Image preview & file state
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      medium: "",
      year: "2026",
      dimensions: "",
      description: "",
      salePath: "direct" as "auction" | "direct",
      price: "",
      openingBid: "",
      reservePrice: "",
    },
  });

  const salePath = watch("salePath");
  const description = watch("description");

  // Stepper labels
  const steps = [
    { id: 1, title: "Asset & Provenance" },
    { id: 2, title: "Artwork Particulars" },
    { id: 3, title: "Sale Mechanics" },
  ];

  // Handle image upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Asset exceeds 10MB limit.");
      return;
    }

    // Only image files allowed
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }

    setSelectedFile(file);
    setFilePreview(URL.createObjectURL(file));
    toast.success("Master asset successfully attached.");
  };

  // Move to next step with validation
  const handleNext = async () => {
    let fieldsToValidate: any[] = [];

    // Step 1: Image must required
    if (currentStep === 1 && !selectedFile) {
      toast.error("Master digital asset is required.");
      return;
    }

    // Step 2: Artwork details
    if (currentStep === 2) {
      fieldsToValidate = [
        "title",
        "category",
        "medium",
        "year",
        "dimensions",
        "description",
      ];
    }

    // Step 3: Price or bid based on sale type
    if (currentStep === 3) {
      fieldsToValidate = salePath === "direct" ? ["price"] : ["openingBid"];
    }

    const isValid =
      fieldsToValidate.length === 0 || (await trigger(fieldsToValidate));

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Go back to previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Submit handler
  const onDepositSubmit = async (data: any) => {
    if (!selectedFile) {
      toast.error("Master digital asset is required.");
      return;
    }

    setIsSubmitting(true);

    const depositPromise = async () => {
      try {
        const formData = new FormData();

        // Append only relevant fields
        Object.keys(data).forEach((key) => {
          if (key === "price" && salePath !== "direct") return;
          if (
            (key === "openingBid" || key === "reservePrice") &&
            salePath !== "auction"
          )
            return;

          if (data[key]) {
            formData.append(key, data[key]);
          }
        });

        // Append image file
        formData.append("imageURL", selectedFile);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/artworks/deposit`,
          {
            method: "POST",
            body: formData,
            credentials: "include",
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Deposit protocol failure.");
        }

        router.push("/dashboard/artist");

        return result;
      } catch (error) {
        console.error("Deposit error:", error);
        throw error;
      }
    };

    toast.promise(depositPromise(), {
      loading: "Securing masterpiece in the vault...",
      success: (data) => `${data.message}`,
      error: (err) => `${err.message}`,
    });

    setIsSubmitting(false);
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b border-white/20 p-4 font-jakarta text-sm text-white outline-none focus:border-brand focus:shadow-none transition-all placeholder:text-white/30 hover:border-white/40";

  return (
    <main className="min-h-screen pt-12 pb-20 px-6 md:px-10">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Page header */}
        <header className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-brand" />
            <p className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
              Studio Deposit
            </p>
            <span className="w-8 h-px bg-brand" />
          </div>
          <h1 className="text-5xl md:text-6xl font-luxury leading-none tracking-tight">
            Submit New <span className="italic text-muted">Masterpiece.</span>
          </h1>
        </header>

        <nav className="flex items-center justify-center">
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
                      {isCompleted ? <LuCheck size={14} /> : `0${step.id}`}
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

        <section className="bg-surface border border-glass p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Deposit form */}
          <form onSubmit={handleSubmit(onDepositSubmit)} className="space-y-12">
            {/* Step 1: Upload artwork */}
            {currentStep === 1 && (
              <fieldset className="space-y-8 border-none">
                <div className="space-y-2">
                  <h2 className="font-luxury text-2xl">Digital Asset Upload</h2>
                  <p className="font-jakarta text-xs text-dim">
                    High-resolution source file for archival encryption.
                  </p>
                </div>
                <div className="relative group">
                  <input
                    type="file"
                    id="master-file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="master-file"
                    className="border-2 border-dashed border-glass hover:border-brand/50 transition-colors bg-surface-hover/30 p-12 flex flex-col items-center justify-center gap-6 text-center cursor-pointer rounded-lg overflow-hidden min-h-62.5"
                  >
                    {filePreview ? (
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                      />
                    ) : (
                      <div className="p-6 bg-glass rounded-full text-muted group-hover:text-brand transition-all">
                        <FiUploadCloud size={32} />
                      </div>
                    )}
                    <div className="relative z-10">
                      <p className="font-jakarta text-sm font-bold uppercase tracking-widest">
                        {filePreview
                          ? "Replace Asset"
                          : "Drag master file here"}
                      </p>
                      <p className="font-jakarta text-xs text-muted">
                        or click to browse local storage
                      </p>
                    </div>
                  </label>
                </div>
                <div className="flex items-start gap-4 p-4 bg-brand/5 border border-brand/20">
                  <LuShieldCheck
                    className="text-brand mt-0.5 shrink-0"
                    size={16}
                  />
                  <p className="font-jakarta text-xs text-muted leading-relaxed">
                    I certify that I am the original creator and generate an
                    immutable provenance record.
                  </p>
                </div>
              </fieldset>
            )}

            {/* Step 2: Artwork Details */}
            {currentStep === 2 && (
              <fieldset className="space-y-10 border-none">
                <h2 className="font-luxury text-2xl">Artwork Particulars</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <Input
                      label="Artwork Title"
                      className={inputClass}
                      {...register("title", { required: "Title is required" })}
                      error={errors.title?.message as string}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-jakarta font-bold transition-colors duration-300 ml-1 text-white/60">
                      Category
                    </label>
                    <select
                      {...register("category", {
                        required: "Category is required",
                      })}
                      className={`${inputClass} [&>option]:bg-surface-hover`}
                    >
                      <option value="">Select Category</option>
                      {ART_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-jakarta font-bold transition-colors duration-300 ml-1 text-white/60">
                      Medium
                    </label>
                    <select
                      {...register("medium", {
                        required: "Medium is required",
                      })}
                      className={`${inputClass} [&>option]:bg-surface-hover`}
                    >
                      <option value="">Select Medium</option>
                      {ART_MEDIUMS.map((med) => (
                        <option key={med} value={med}>
                          {med}
                        </option>
                      ))}
                    </select>
                    {errors.medium && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.medium.message}
                      </p>
                    )}
                  </div>

                  <Input
                    label="Year of Creation"
                    {...register("year", { required: "Year is required" })}
                    className={inputClass}
                    error={errors.year?.message as string}
                  />
                  <Input
                    label="Dimensions"
                    className={inputClass}
                    placeholder="e.g., 24 x 36 inches"
                    {...register("dimensions", {
                      required: "Dimensions are required",
                    })}
                    error={errors.dimensions?.message as string}
                  />

                  <div className="md:col-span-2 space-y-3">
                    <div className="flex justify-between items-end">
                      <label className="font-jakarta text-[9px] uppercase tracking-widest text-dim font-bold">
                        Manifesto / Description
                      </label>
                      <span className="text-[8px] text-dim uppercase">
                        {description?.length || 0} / 1000
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      className="w-full bg-transparent border-b border-white/20 p-4 font-jakarta text-sm outline-none focus:border-brand transition-all resize-none"
                      placeholder="Describe your masterpiece..."
                      {...register("description", {
                        required: "Description is required",
                        maxLength: {
                          value: 1000,
                          message:
                            "Description must be less than 1000 characters",
                        },
                      })}
                    />
                    {errors.description && (
                      <p className="text-red-400 text-xs">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </fieldset>
            )}

            {/* Step 3: Sale Types */}
            {currentStep === 3 && (
              <fieldset className="space-y-12 border-none">
                <h2 className="font-luxury text-2xl">Acquisition Path</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    type="button"
                    onClick={() => setValue("salePath", "direct")}
                    className={`p-8 text-left border transition-all space-y-4 ${
                      salePath === "direct"
                        ? "border-brand bg-brand/5"
                        : "border-glass opacity-60 hover:opacity-100"
                    }`}
                  >
                    <LuTag
                      size={28}
                      className={
                        salePath === "direct" ? "text-brand" : "text-muted"
                      }
                    />
                    <h3 className="font-luxury text-xl">Direct Marketplace</h3>
                    <p className="font-jakarta text-[10px] text-dim uppercase tracking-wider">
                      Fixed valuation for immediate collection.
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue("salePath", "auction")}
                    className={`p-8 text-left border transition-all space-y-4 ${
                      salePath === "auction"
                        ? "border-brand bg-brand/5"
                        : "border-glass opacity-60 hover:opacity-100"
                    }`}
                  >
                    <LuGavel
                      size={28}
                      className={
                        salePath === "auction" ? "text-brand" : "text-muted"
                      }
                    />
                    <h3 className="font-luxury text-xl">Request Auction</h3>
                    <p className="font-jakarta text-[10px] text-dim uppercase tracking-wider">
                      Submit to themed exhibition pools.
                    </p>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-glass">
                  {salePath === "direct" ? (
                    <div className="md:col-span-2">
                      <Input
                        label="Acquisition Price (₹)"
                        className={inputClass}
                        placeholder="50,000"
                        type="number"
                        {...register("price", {
                          required:
                            salePath === "direct" ? "Price is required" : false,
                          min: {
                            value: 1,
                            message: "Price must be greater than 0",
                          },
                        })}
                        error={errors.price?.message as string}
                      />
                    </div>
                  ) : (
                    <>
                      <Input
                        label="Opening Bid (₹)"
                        placeholder="10,000"
                        className={inputClass}
                        type="number"
                        {...register("openingBid", {
                          required:
                            salePath === "auction"
                              ? "Opening bid is required"
                              : false,
                          min: {
                            value: 1,
                            message: "Opening bid must be greater than 0",
                          },
                        })}
                        error={errors.openingBid?.message as string}
                      />
                      <Input
                        label="Reserve Price (₹)"
                        className={inputClass}
                        placeholder="Optional"
                        type="number"
                        {...register("reservePrice", {
                          min: {
                            value: 1,
                            message: "Reserve price must be greater than 0",
                          },
                        })}
                        error={errors.reservePrice?.message as string}
                      />
                    </>
                  )}
                </div>
              </fieldset>
            )}

            {/* Navigation buttons */}
            <footer className="mt-12 pt-8 border-t border-glass flex justify-between items-center">
              <Button
                title="Back"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isSubmitting}
                type="button"
              />
              <Button
                title={
                  currentStep === steps.length
                    ? isSubmitting
                      ? "Securing..."
                      : "Submit for Approval"
                    : "Continue"
                }
                type={currentStep === steps.length ? "submit" : "button"}
                onClick={currentStep === steps.length ? undefined : handleNext}
                disabled={isSubmitting}
                className="md:h-14 md:px-10 shadow-neon"
              />
            </footer>
          </form>
        </section>
      </div>
    </main>
  );
};

export default DepositArtworkPage;
