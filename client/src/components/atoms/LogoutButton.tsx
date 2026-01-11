"use client";

import { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

const LogoutButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (response.ok) {
        router.replace("/login");
      }
    } catch (error) {
      console.log("Logout failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="text-white/40 hover:text-red-400 transition-colors"
      onClick={handleLogout}
      disabled={isLoading}
    >
      <LuLogOut size={18} />
    </button>
  );
};

export default LogoutButton;
