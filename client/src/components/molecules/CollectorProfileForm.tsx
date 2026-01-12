"use client";

import Image from "next/image";
import Input from "../atoms/Input";
import { LuPencil, LuShieldCheck } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../atoms/Button";
import { toast } from "sonner";

interface ProfileInput {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatar: FileList;
}

const CollectorProfileForm = ({ user }: { user: any }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileInput>({
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      bio: user.bio || "",
    },
  });

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const bio = watch("bio");

  const handleFilePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: ProfileInput) => {
    setIsUpdating(true);

    const updatePromise = async () => {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("bio", data.bio);

      if (data.avatar?.[0]) {
        formData.append("avatar", data.avatar[0]);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/update`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      return await response.json();
    };

    toast.promise(updatePromise(), {
      loading: "Synchronizing with Archive...",
      success: "Identity Updated Successfully.",
      error: (err) => `${err.message}`,
    });

    setIsUpdating(false);
  };

  const inputClass =
    "w-full bg-transparent shadow-none border-0 border-b border-white/20 py-3 font-jakarta text-sm text-white outline-none focus:border-brand focus:shadow-none focus:ring-0 transition-all duration-500 placeholder:text-white/20 hover:border-white/40";
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-20"
    >
      <div className="lg:col-span-7 space-y-20">
        {/* Public Persona */}
        <fieldset className="space-y-12 border-none p-0">
          <legend className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-brand mb-8">
            Public Persona
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
            <div>
              <Input
                label="First Name"
                className={inputClass}
                {...register("firstName", {
                  required: "First name cannot be empty",
                })}
                error={errors.firstName?.message as string}
              />
            </div>

            <Input
              label="Last Name"
              className={inputClass}
              {...register("lastName", {
                required: "Last name cannot be empty",
              })}
              error={errors.lastName?.message as string}
            />

            <div className="md:col-span-2">
              <Input
                label="Email"
                className={`${inputClass} text-muted! cursor-not-allowed`}
                {...register("email")}
                disabled
              />
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-end">
                <label
                  htmlFor="philosophy"
                  className="font-jakarta text-[9px] uppercase tracking-widest text-dim font-bold"
                >
                  Curation Philosophy
                </label>
                <span
                  className={`text-[8px] font-jakarta uppercase transition-colors duration-300 ${
                    (bio?.length || 0) > 480 ? "text-brand" : "text-dim"
                  }`}
                >
                  {bio?.length || 0} / 500
                </span>
              </div>
              <textarea
                id="philosophy"
                rows={4}
                maxLength={500}
                className={`${inputClass} leading-relaxed resize-none ${
                  errors.bio ? "border-brand/50" : "border-glass"
                }`}
                placeholder="Describe your approach to acquiring art..."
                {...register("bio", {
                  maxLength: {
                    value: 500,
                    message: "Philosophy cannot exceed 500 characters",
                  },
                })}
              />
              {errors.bio && (
                <p className="text-[9px] text-brand uppercase tracking-widest font-bold">
                  {errors.bio.message as string}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <Button
          type="submit"
          title={isUpdating ? "Archiving..." : "Update Portfolio"}
          className="h-14 px-10 shadow-neon"
          disabled={isUpdating}
        />
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
              <div className="relative w-24 h-24 rounded-full overflow-hidden border border-glass group">
                {previewUrl || user.avatar ? (
                  <Image
                    src={previewUrl || user.avatar}
                    alt="Collector Avatar Preview"
                    fill
                    className="object-cover grayscale opacity-50 group-hover:opacity-30 transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl text-brand font-extrabold uppercase">
                    {user.firstName.slice(0, 1)}
                    {user.lastName.slice(0, 1)}
                  </div>
                )}
                <Input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  {...register("avatar", { onChange: handleFilePreview })}
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer bg-black/20 hover:bg-black/50 text-white/50 hover:text-brand transition-all duration-300"
                >
                  <LuPencil size={24} />
                </label>
              </div>
              <h2 className="font-luxury text-4xl capitalize">
                {`${firstName} ${lastName}` ||
                  `${user.firstName} ${user.lastName}`}
              </h2>
              <div className="flex items-center gap-2">
                <LuShieldCheck
                  className="text-brand"
                  size={14}
                  aria-hidden="true"
                />
                <p className="font-jakarta text-[9px] uppercase tracking-[0.4em] text-brand font-bold">
                  Verified Curator
                </p>
              </div>
            </header>

            <div className="space-y-4">
              <p className="font-jakarta text-[10px] uppercase tracking-widest text-dim">
                Philosophy
              </p>
              <p className="font-jakarta text-xs text-muted leading-relaxed italic">
                {bio || user.bio || "Describe your approach..."}
              </p>
            </div>

            <div className="pt-8 border-t border-glass flex justify-between items-center">
              <div className="space-y-1">
                <p className="font-jakarta text-[8px] uppercase tracking-widest text-dim">
                  Email
                </p>
                <p className="font-luxury text-xl text-brand">{user.email}</p>
              </div>
            </div>
          </article>
        </div>
      </aside>
    </form>
  );
};

export default CollectorProfileForm;
