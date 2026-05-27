import type { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type BadgeTone = "neutral" | "success" | "warning" | "danger";

const toneStyles: Record<BadgeTone, string> = {
  neutral: "bg-white/8 text-slate-200",
  success: "bg-primary/12 text-primary",
  warning: "bg-amber-400/12 text-amber-200",
  danger: "bg-danger/12 text-rose-200",
};

interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
}

export const Badge = ({
  children,
  tone = "neutral",
  className,
}: PropsWithChildren<BadgeProps>) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
      toneStyles[tone],
      className,
    )}
  >
    {children}
  </span>
);
