// components/ui/Badge.tsx
import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "gold" | "success" | "danger" | "surface";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantMap: Record<BadgeVariant, string> = {
  primary: "badge-primary",
  gold: "badge-gold",
  success: "badge-success",
  danger: "badge-danger",
  surface: "badge-surface",
};

export function Badge({ variant = "surface", children, className, dot }: BadgeProps) {
  return (
    <span className={cn("badge", variantMap[variant], className)}>
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full flex-shrink-0",
            variant === "primary" && "bg-violet-400",
            variant === "gold" && "bg-amber-400",
            variant === "success" && "bg-green-400",
            variant === "danger" && "bg-red-400",
            variant === "surface" && "bg-slate-400"
          )}
        />
      )}
      {children}
    </span>
  );
}

// Specialized preset badges
export function NewBadge() {
  return (
    <Badge variant="success" dot>
      New
    </Badge>
  );
}

export function HotBadge() {
  return (
    <Badge variant="danger" dot>
      Hot
    </Badge>
  );
}

export function StaffPickBadge() {
  return (
    <Badge variant="gold" dot>
      Staff Pick
    </Badge>
  );
}

export function FeaturedBadge() {
  return (
    <Badge variant="primary" dot>
      Featured
    </Badge>
  );
}
