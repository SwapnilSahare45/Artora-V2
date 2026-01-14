"use client";

import { LuCamera, LuCheck } from "react-icons/lu";
import Input from "../atoms/Input";
import Image from "next/image";
import Button from "../atoms/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ArtistProfileForm = ({ user }: { user: any }) => {
  const router = useRouter();

  // Preview image URL for avatar before upload
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // Button loading state
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user.email || "",
      bio: user?.bio || "",
    },
  });

  // Watching form fields for real-time preview
  const watchedFirstName = watch("firstName");
  const watchedLastName = watch("lastName");
  const watchedBio = watch("bio");

  // Handle avatar preview when file is selected
  const handleFilePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke old object URL to avoid memory leaks
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setPreviewUrl(URL.createObjectURL(file));
  };

  // Submit handler for artist profile update
  const onArtistUpdate = async (data: any) => {
    setIsUpdating(true);

    const updatePromise = async () => {
      const formData = new FormData();

      // Append text fields
      Object.keys(data).forEach((key) => {
        if (key !== "avatar") formData.append(key, data[key]);
      });

      // Append avatar file manually
      const fileInput = document.getElementById(
        "artist-avatar"
      ) as HTMLInputElement;

      if (fileInput?.files?.[0]) {
        formData.append("avatar", fileInput.files[0]);
      }

      // API call
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/update`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Vault update failed");

      // Refresh server components to reflect updated data
      router.refresh();
      return result;
    };

    toast.promise(updatePromise(), {
      loading: "Archiving profile changes...",
      success: (data) => `${data.message}`,
      error: (err) => `${err.message}`,
    });
    setIsUpdating(false);
  };

  const inputClass =
    "w-full bg-transparent shadow-none border-0 border-b border-glass py-3 font-jakarta text-sm outline-none focus:border-brand focus:ring-0 focus:shadow-none transition-all duration-500 placeholder:text-white/20 hover:border-white/20";

  return (
    <form
      onSubmit={handleSubmit(onArtistUpdate)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-20"
    >
      <div className="lg:col-span-7 space-y-16">
        <fieldset className="space-y-10 border-none p-0 m-0">
          <legend className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand font-bold flex items-center gap-3 mb-8">
            Public Identity
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
            <Input
              label="First Name"
              className={inputClass}
              {...register("firstName")}
            />
            <Input
              label="Last Name"
              className={inputClass}
              {...register("lastName")}
            />
            <div className="md:col-span-2">
              <Input
                label="Email"
                className={`${inputClass} text-muted! cursor-not-allowed`}
                {...register("email")}
                disabled
              />
            </div>
            <div className="space-y-3 md:col-span-2">
              <div className="flex justify-between items-end">
                <label
                  className="font-jakarta text-[9px] uppercase tracking-widest text-dim"
                  htmlFor="bio"
                >
                  Professional Narrative (Bio)
                </label>
                <span
                  className={`text-[8px] font-jakarta uppercase transition-colors duration-300 ${
                    (watchedBio?.length || 0) > 480 ? "text-brand" : "text-dim"
                  }`}
                >
                  {watchedBio?.length || 0} / 500
                </span>
              </div>
              <textarea
                id="bio"
                rows={4}
                maxLength={500}
                className={`${inputClass} leading-relaxed resize-none ${
                  errors.bio ? "border-brand/50" : "border-glass"
                }`}
                {...register("bio", {
                  maxLength: {
                    value: 500,
                    message:
                      "Maximum 500 characters allowed for the narrative.",
                  },
                })}
              />
              {errors.bio && (
                <p className="text-[9px] text-brand uppercase tracking-widest font-bold mt-1">
                  {errors.bio.message as string}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            title={isUpdating ? "Archiving..." : "Update Portfolio"}
            className="h-14 px-10 shadow-neon"
            disabled={isUpdating}
          />
        </fieldset>
      </div>

      <aside className="lg:col-span-5" aria-label="Real-time profile preview">
        <div className="space-y-8">
          <p className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-dim font-bold text-center">
            Real-time Preview
          </p>

          <div className="relative aspect-square w-full bg-neutral-900 border border-glass group overflow-hidden">
            {previewUrl || user.avatar ? (
              <Image
                src={previewUrl || user?.avatar}
                alt="Profile Preview"
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-9xl text-brand font-extrabold uppercase font-inter">
                {user.firstName.slice(0, 1)}
                {user.lastName.slice(0, 1)}
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center">
              <input
                type="file"
                id="artist-avatar"
                className="hidden"
                accept="image/*"
                onChange={handleFilePreview}
              />
              <label
                htmlFor="artist-avatar"
                className="flex flex-col items-center gap-3 cursor-pointer transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
              >
                <div className="p-4 bg-brand rounded-full shadow-xl">
                  <LuCamera size={20} aria-hidden="true" />
                </div>
                <span className="font-jakarta text-[9px] uppercase tracking-widest font-bold">
                  Update Asset
                </span>
              </label>
            </div>
          </div>

          <div className="p-8 border border-glass bg-linear-to-br from-white/5 to-transparent backdrop-blur-sm space-y-5 shadow-2xl">
            <div className="space-y-1">
              <h2 className="font-luxury text-4xl tracking-tight capitalize">
                {watchedFirstName || watchedLastName
                  ? `${watchedFirstName} ${watchedLastName}`
                  : "Unnamed Artist"}
              </h2>
            </div>

            <p className="font-jakarta text-xs text-dim leading-relaxed italic line-clamp-4">
              {watchedBio || user.bio || "Describe your approach narrative..."}
            </p>

            <div className="pt-5 flex items-center justify-between border-t border-glass">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="font-jakarta text-[9px] tracking-widest text-dim">
                  {user.email}
                </p>
              </div>
              <LuCheck className="text-brand" size={12} />
            </div>
          </div>
        </div>
      </aside>
    </form>
  );
};

export default ArtistProfileForm;
