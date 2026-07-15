// components/ui/PremiumIcon.tsx
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumIconProps {
  icon: LucideIcon;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  glow?: boolean;
}

const sizeMap = {
  sm: { container: "w-10 h-10 rounded-lg", icon: "w-5 h-5" },
  md: { container: "w-14 h-14 rounded-xl", icon: "w-7 h-7" },
  lg: { container: "w-20 h-20 rounded-2xl", icon: "w-10 h-10" },
  xl: { container: "w-28 h-28 rounded-[2rem]", icon: "w-14 h-14" },
};

export function PremiumIcon({ icon: Icon, color = "#7c3aed", size = "md", className, glow = true }: PremiumIconProps) {
  const { container, icon: iconSize } = sizeMap[size];
  
  return (
    <div 
      className={cn("relative flex items-center justify-center flex-shrink-0", container, className)}
      style={{
        background: `linear-gradient(135deg, ${color}22 0%, ${color}05 100%)`,
        border: `1px solid ${color}44`,
        boxShadow: glow ? `0 8px 32px -8px ${color}40, inset 0 0 16px -8px ${color}40` : `inset 0 0 16px -8px ${color}40`,
      }}
    >
      {/* Inner glow mask */}
      <div 
        className="absolute inset-0 opacity-50 rounded-inherit"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}40 0%, transparent 70%)`
        }}
      />
      
      {/* Icon */}
      <Icon 
        className={cn("relative z-10 transition-transform duration-300", iconSize)}
        style={{ 
          color: color, 
          filter: glow ? `drop-shadow(0 0 8px ${color}80)` : undefined 
        }}
      />
    </div>
  );
}
