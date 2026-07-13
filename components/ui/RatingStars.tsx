// components/ui/RatingStars.tsx
import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

const sizeMap = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export function RatingStars({
  rating,
  max = 5,
  size = "sm",
  showValue = false,
  reviewCount,
  className,
}: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = rating >= i + 1;
          const partial = !filled && rating > i;
          return (
            <Star
              key={i}
              className={cn(
                sizeMap[size],
                "transition-colors",
                filled
                  ? "fill-amber-400 text-amber-400"
                  : partial
                  ? "fill-amber-400/40 text-amber-400/60"
                  : "fill-transparent text-white/15"
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span
          className={cn(
            "font-semibold text-amber-400",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            size === "lg" && "text-base"
          )}
        >
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span
          className={cn(
            "text-[var(--text-muted)]",
            size === "sm" && "text-xs",
            size === "md" && "text-xs",
            size === "lg" && "text-sm"
          )}
        >
          ({reviewCount.toLocaleString('en-US')})
        </span>
      )}
    </div>
  );
}
