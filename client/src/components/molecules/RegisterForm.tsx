"use client";

import Link from "next/link";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Countdown from "react-countdown";
import {
  registerAction,
  resendOTPAction,
  verifyOTPAction,
} from "@/app/actions/auth";

const RegisterForm = () => {
  const router = useRouter();

  const [registerUserState, registerUserAction, isRegisterUserPending] =
    useActionState(registerAction, { success: false, error: null });

  const [verifyOTPState, verifyEmailOTPAction, isVerifyOTPPending] =
    useActionState(verifyOTPAction, { success: false, error: null });

  const [resendOTPState, resendEmaiOTPAction, isResendOTPPending] =
    useActionState(resendOTPAction, { success: false, error: null });

  const [countdownKey, setCountdownKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "collector",
    },
  });

  const {
    register: registerOTP,
    reset: otpReset,
    handleSubmit: handleSubmitOTP,
    formState: { errors: otpErrors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const selectedRole = watch("role");

  useEffect(() => {
    if (
      registerUserState.success &&
      registerUserState.result.user.verified === false
    ) {
      // Reset coundown when switching to OTP screen
      setCountdownKey((prev) => prev + 1);
      reset();
    }
  }, [registerUserState.success, registerUserState.result?.user.verified]);

  useEffect(() => {
    if (
      verifyOTPState.success &&
      verifyOTPState.result.user.verified === true
    ) {
      otpReset();
      router.push("/artworks");
    }
  }, [verifyOTPState.success, verifyOTPState.result?.user.verified]);

  const onRegisterFormSubmit = (data: any) => {
    startTransition(() => {
      registerUserAction(data);
    });
  };

  const onVerifyOTPFromSubmit = (data: any) => {
    startTransition(() => {
      verifyEmailOTPAction({
        otp: data.otp,
        email: registerUserState.result.user.email,
      });
    });
  };

  const handleResendOTP = () => {
    startTransition(() => {
      resendEmaiOTPAction({ email: registerUserState.result.user.email });
    });

    setCountdownKey((prev) => prev + 1);
  };

  return (
    <>
      {registerUserState.success &&
      registerUserState.result.user.verified === false ? (
        <div className="w-full space-y-6">
          <div className="text-center space-y-2 pb-4">
            <h3 className="font-luxury text-2xl italic">Verify Your Email</h3>
            <p className="font-jakarta text-sm text-text-dim">
              We've sent a verification code to
            </p>
            <p className="font-jakarta text-sm text-brand">
              {registerUserState.result?.user?.email}
            </p>
          </div>

          <form
            onSubmit={handleSubmitOTP(onVerifyOTPFromSubmit)}
            className="space-y-6"
          >
            <Input
              type="number"
              label="Verify OTP"
              placeholder="123456"
              maxLength={6}
              {...registerOTP("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "OTP must be 6 digits",
                },
              })}
              error={otpErrors.otp?.message as string}
            />
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="submit"
                title={isVerifyOTPPending ? "Verifying..." : "Verify OTP"}
                className="h-14"
                disabled={isVerifyOTPPending}
              />
              <Countdown
                key={countdownKey}
                date={Date.now() + 60000} // 60 seconds
                renderer={({ minutes, seconds, completed }) => (
                  <Button
                    type="button"
                    title={
                      isResendOTPPending
                        ? "Sending..."
                        : completed
                        ? "Resend Code"
                        : `Resend in ${minutes}:${seconds
                            .toString()
                            .padStart(2, "0")}`
                    }
                    variant="ghost"
                    disabled={!completed || isResendOTPPending}
                    onClick={handleResendOTP}
                    className="h-14"
                  />
                )}
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-md space-y-10">
          <header className="space-y-3 text-center lg:text-left">
            <h2 className="font-luxury text-4xl text-white italic">
              Begin your journey
            </h2>
            <p className="font-jakarta text-[10px] uppercase tracking-[0.3em] text-brand font-bold">
              Step into the world of Artora
            </p>
          </header>
          <form
            onSubmit={handleSubmit(onRegisterFormSubmit)}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="Swapnil"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  error={errors.firstName?.message as string}
                />
                <Input
                  label="Last Name"
                  placeholder="Sahare"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  error={errors.lastName?.message as string}
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="collector@artora.protocol"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email",
                  },
                })}
                error={errors.email?.message as string}
              />

              <Input
                label="Create Password"
                type="password"
                placeholder="Minimum 8 characters"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters required",
                  },
                })}
                error={errors.password?.message as string}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Repeat security key"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                error={errors.confirmPassword?.message as string}
              />

              <div className="space-y-3">
                <label className="block font-jakarta text-[10px] uppercase tracking-[0.2em] text-text-dim">
                  Select Your Role
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Collector Option */}
                  <label
                    className={`relative flex items-center gap-4 p-4 border cursor-pointer transition-all duration-300 ${
                      selectedRole === "collector"
                        ? "border-brand bg-brand/5"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <input
                      type="radio"
                      value="collector"
                      {...register("role", {
                        required: "Please select a role",
                      })}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedRole === "collector"
                          ? "border-brand"
                          : "border-white/30"
                      }`}
                    >
                      {selectedRole === "collector" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-brand" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-luxury text-lg italic">Collector</p>
                      <p className="font-jakarta text-[9px] text-text-dim uppercase tracking-wider">
                        Buy & collect artworks
                      </p>
                    </div>
                  </label>

                  {/* Artist Option */}
                  <label
                    className={`relative flex items-center gap-4 p-4 border cursor-pointer transition-all duration-300 ${
                      selectedRole === "artist"
                        ? "border-brand bg-brand/5"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <input
                      type="radio"
                      value="artist"
                      {...register("role", {
                        required: "Please select a role",
                      })}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedRole === "artist"
                          ? "border-brand"
                          : "border-white/30"
                      }`}
                    >
                      {selectedRole === "artist" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-brand" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-luxury text-lg italic">Artist</p>
                      <p className="font-jakarta text-[9px] text-dim uppercase tracking-wider">
                        Create & sell artworks
                      </p>
                    </div>
                  </label>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.role.message as string}
                  </p>
                )}
              </div>
            </div>

            <Button
              title={
                isRegisterUserPending
                  ? "Connecting..."
                  : "Initialize Membership"
              }
              type="submit"
              disabled={isRegisterUserPending || registerUserState.success}
              className="h-14 w-full"
            />
          </form>

          {/* Separator */}
          <div className="relative flex items-center py-10" aria-hidden="true">
            <div className="grow border-t border-glass"></div>
            <span className="shrink mx-6 text-[10px] font-jakarta font-bold uppercase tracking-[0.3em] text-dim">
              Fast Track
            </span>
            <div className="grow border-t border-glass"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button
              title="Google"
              ariaLabel="Register using Google"
              variant="outline"
              type="button"
              icon={
                <FaGoogle className="text-muted group-hover:text-brand transition-colors" />
              }
              iconPosition="left"
              className="flex-1 h-14 border-white/10 hover:border-brand/50 transition-all"
            />

            <Button
              title="GitHub"
              ariaLabel="Register using GitHub"
              variant="outline"
              type="button"
              icon={
                <FaGithub className="text-muted group-hover:text-brand transition-colors" />
              }
              iconPosition="left"
              className="flex-1 h-14 border-white/10 hover:border-brand/50 transition-all"
            />
          </div>

          <div className="mt-10 text-center">
            <p className="font-jakarta text-[11px] text-dim uppercase tracking-widest">
              Already registered?{" "}
              <Link
                href="/login"
                className="font-bold hover:text-brand hover:underline hover:underline-offset-8 transition-all duration-500"
              >
                Access Account
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
