interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

// Logo size
const Logo = ({ size = "md", className = "" }: LogoProps) => {
  const logoSize = {
    xs: "text-[10px]",
    sm: "text-sm",
    md: "text-xl",
    lg: "text-4xl",
    xl: "text-6xl",
  };

  return (
    <div
      className={`flex items-center select-none ${className}`}
      aria-label="Artora Protocol Home"
    >
      <div
        className={`
          font-luxury italic font-light tracking-[0.5em] uppercase text-white
          ${logoSize[size]}
        `}
      >
        Artora
      </div>
    </div>
  );
};

export default Logo;
