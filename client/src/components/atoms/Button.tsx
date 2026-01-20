import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  variant?: "primary" | "outline" | "ghost";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit";
  ariaLabel?: string;
}

const Button = ({
  title,
  variant = "primary",
  icon,
  iconPosition = "left",
  className = "",
  type = "button",
  ariaLabel,
  ...props
}: ButtonProps) => {
  const variantStyles = {
    primary:
      "bg-white text-black hover:bg-brand hover:text-white hover:shadow-neon",
    outline:
      "bg-transparent border border-white/20 text-white hover:border-brand hover:text-brand",
    ghost: "bg-transparent text-muted hover:text-white hover:bg-surface",
  };

  return (
    <button
      className={`
        relative group flex items-center justify-center gap-3 px-8 py-4 
        font-jakarta font-bold text-[11px] uppercase tracking-[0.2em] 
        rounded-none transition-all duration-500 ease-out active:scale-95 
        disabled:opacity-50 disabled:cursor-not-allowed
        min-w-11 min-h-11 
        ${variantStyles[variant]} ${className}
      `}
      type={type}
      aria-label={ariaLabel || title}
      {...props}
    >
      {/* Icon Left */}
      {icon && iconPosition === "left" && (
        <span className="text-base transition-transform duration-500 group-hover:-translate-x-1">
          {icon}
        </span>
      )}

      {/* Button Text */}
      {title && <span className="relative z-10">{title}</span>}

      {/* Icon Right */}
      {icon && iconPosition === "right" && (
        <span className="text-base transition-transform duration-500 group-hover:translate-x-1">
          {icon}
        </span>
      )}

      {/* Bottom border animation */}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-500 group-hover:w-full" />
    </button>
  );
};

export default Button;
