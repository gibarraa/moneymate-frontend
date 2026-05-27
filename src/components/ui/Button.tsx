import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald-400 text-slate-950 hover:bg-emerald-300 shadow-[0_12px_30px_rgba(52,211,153,0.28)]",
  secondary:
    "border border-white/10 bg-white/6 text-white hover:border-sky-300/40 hover:bg-sky-300/10",
  ghost: "bg-transparent text-slate-300 hover:bg-white/6 hover:text-white",
  danger:
    "border border-rose-400/25 bg-rose-400/12 text-rose-100 hover:bg-rose-400/20",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300/50 disabled:cursor-not-allowed disabled:opacity-60",
      variantStyles[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
