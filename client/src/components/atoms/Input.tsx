"use client";

import React, { forwardRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs"; // Added slash icon

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  ariaLabel?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      className = "",
      id,
      type = "text",
      icon,
      onIconClick,
      ariaLabel,
      error,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const isPassword = type === "password";
    const currentType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className="flex flex-col space-y-2 w-full group">
        {label && (
          <label
            htmlFor={inputId}
            className={`text-[10px] uppercase tracking-[0.2em] font-jakarta font-bold transition-colors duration-300 ml-1 
              ${
                error
                  ? "text-red-400"
                  : "text-white/60 group-focus-within:text-brand"
              }`}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <input
            ref={ref}
            id={inputId}
            type={currentType}
            className={`
              w-full bg-surface text-white font-jakarta text-sm
              px-4 py-4 rounded-none border transition-all duration-500 ease-out
              placeholder:text-white/40 focus:outline-none focus:bg-bg-tertiary
              ${icon || isPassword ? "pr-12" : ""}
              ${
                error
                  ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                  : "border-border-glass focus:border-brand focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]"
              }
              ${className}
            `}
            {...props}
          />

          {/* Automatic Toggle for Passwords OR Custom Icon for other inputs */}
          {(isPassword || icon) && (
            <button
              type="button"
              aria-label={
                ariaLabel || (showPassword ? "Hide password" : "Show password")
              }
              className="absolute right-2 flex items-center justify-center w-11 h-11 text-dim hover:text-brand transition-colors duration-300 cursor-pointer"
              onClick={
                isPassword ? () => setShowPassword(!showPassword) : onIconClick
              }
            >
              <span aria-hidden="true">
                {isPassword ? (
                  showPassword ? (
                    <BsEyeSlash size={18} />
                  ) : (
                    <BsEye size={18} />
                  )
                ) : (
                  icon
                )}
              </span>
            </button>
          )}
        </div>

        <div className="min-h-4">
          {error && (
            <p className="text-[10px] text-red-400 font-jakarta italic tracking-wider">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
