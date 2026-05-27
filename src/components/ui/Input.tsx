import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = ({ label, hint, error, className, ...props }: InputProps) => (
  <label className="flex flex-col gap-2">
    {label ? <span className="text-sm font-medium text-slate-200">{label}</span> : null}
    <input
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/40 focus:bg-white/7",
        error && "border-rose-400/60 focus:border-rose-300/50",
        className,
      )}
      {...props}
    />
    {error ? (
      <span className="text-xs text-rose-300">{error}</span>
    ) : hint ? (
      <span className="text-xs text-slate-500">{hint}</span>
    ) : null}
  </label>
);
