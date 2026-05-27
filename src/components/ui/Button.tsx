import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-secondary to-primary text-slate-950 hover:brightness-105 shadow-[0_14px_32px_rgba(44,183,190,0.28)]",
  secondary:
    "border border-white/10 bg-white/6 text-white hover:border-secondary/40 hover:bg-secondary/10",
  ghost: "bg-transparent text-slate-300 hover:bg-white/6 hover:text-white",
  danger:
    "border border-danger/25 bg-danger/12 text-rose-100 hover:bg-danger/20",
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
      "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60",
      variantStyles[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
