"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { toast } from "sonner";

const LogoutButton = () => {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    const logoutPromise = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Could not terminate session.");
      }

      window.location.href = "/login";
      return await response.json();
    };

    toast.promise(logoutPromise, {
      loading: "Securing the Vault...",
      success: "Session terminated.",
      error: (err) => err.message,
    });
  };

  return (
    <button
      className="flex items-center gap-3 text-[10px] text-red-500/80 hover:text-red-400 font-bold text-sm uppercase tracking-widest transition-colors disabled:opacity-50"
      onClick={handleLogout}
      disabled={isLoading}
    >
      <LuLogOut size={14} />
      <span>{isLoading ? "Exiting..." : "Logout"}</span>
    </button>
  );
};

export default LogoutButton;
