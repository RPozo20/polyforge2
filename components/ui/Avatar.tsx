// components/ui/Avatar.tsx
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  verified?: boolean;
}

const sizeMap = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-xl",
};

const badgeSizeMap = {
  xs: "w-2 h-2 border",
  sm: "w-3 h-3 border",
  md: "w-4 h-4 border-[1.5px]",
  lg: "w-5 h-5 border-2",
  xl: "w-6 h-6 border-2",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function Avatar({ src, name, size = "md", className, verified }: AvatarProps) {
  return (
    <div className={cn("relative flex-shrink-0", sizeMap[size], className)}>
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          className="rounded-full object-cover"
          sizes="80px"
          unoptimized
        />
      ) : (
        <div
          className={cn(
            "w-full h-full rounded-full flex items-center justify-center font-bold",
            "bg-gradient-to-br from-violet-600 to-violet-900 text-white"
          )}
        >
          {getInitials(name)}
        </div>
      )}
      {verified && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full bg-violet-500 border-[var(--bg-surface)] flex items-center justify-center",
            badgeSizeMap[size]
          )}
          title="Verified Creator"
        >
          <svg
            viewBox="0 0 10 10"
            fill="none"
            className="w-[60%] h-[60%]"
          >
            <path
              d="M2 5L4 7L8 3"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </div>
  );
}
