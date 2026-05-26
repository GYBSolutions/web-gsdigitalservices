import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "brand" | "warm" | "cool" | "rainbow";
}

const gradientMap = {
  brand: "from-brand-400 via-brand-300 to-indigo-400",
  warm: "from-orange-400 via-pink-400 to-brand-400",
  cool: "from-cyan-400 via-blue-400 to-brand-400",
  rainbow: "from-brand-400 via-pink-400 to-orange-400",
};

export function GradientText({
  children,
  className,
  variant = "brand",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradientMap[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
