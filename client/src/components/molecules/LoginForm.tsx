"use client";

import Link from "next/link";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle login submit
  const onFormSubmit = async (data: any) => {
    const loginPromise = async () => {
      // API call
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include", // Allow cookies handling
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Access Denied");
      }

      // Clear form fields after successful login
      reset();

      // Redirect user based on role
      result.user.role === "admin"
        ? (window.location.href = "/admin/moderation")
        : (window.location.href = "/artworks");

      return result;
    };

    toast.promise(loginPromise(), {
      loading: "Validating Credentials...",
      success: (data) => `${data.message}`,
      error: (err) => `${err.message}`,
    });
  };

  return (
    <div className="w-full">
      {/* Login form */}
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
        <div className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="collector@artora.com"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message as string}
          />

          <div className="space-y-2">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message as string}
            />

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-[10px] uppercase tracking-[0.2em] text-dim hover:text-brand transition-all duration-300"
              >
                Reset Credentials?
              </Link>
            </div>
          </div>
        </div>

        <Button title={"Enter Gallery"} type="submit" className="h-14 w-full" />
      </form>

      {/* Separator */}
      <div className="relative flex items-center py-10">
        <div className="grow border-t border-glass"></div>
        <span className="shrink mx-6 text-[10px] font-jakarta font-bold uppercase tracking-[0.3em] text-dim">
          Fast Track
        </span>
        <div className="grow border-t border-glass"></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Button
          title="Google"
          ariaLabel="Login with Google"
          variant="outline"
          icon={
            <FaGoogle className="text-muted group-hover:text-brand transition-colors" />
          }
          iconPosition="left"
          className="flex-1 h-14 border-glass hover:border-brand/50 transition-all duration-700"
        />

        <Button
          title="GitHub"
          ariaLabel="Login with GitHub"
          variant="outline"
          icon={
            <FaGithub className="text-muted group-hover:text-brand transition-colors" />
          }
          iconPosition="left"
          className="flex-1 h-14 border-glass hover:border-brand/50 transition-all duration-700"
        />
      </div>

      <div className="mt-10 text-center">
        <p className="font-jakarta text-[11px] text-muted uppercase tracking-widest">
          New to the collection?{" "}
          <Link
            href="/register"
            className="font-bold hover:text-brand hover:underline hover:underline-offset-8 transition-all duration-500"
          >
            Create Artist Profile
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
