import type { ReactNode } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@/components/ui/Icons";
import { formatCurrency } from "@/utils/currency";

interface SummaryCardProps {
  title: string;
  amount: number;
  trend: string;
  trendDirection: "up" | "down";
  icon: ReactNode;
}

export const SummaryCard = ({
  title,
  amount,
  trend,
  trendDirection,
  icon,
}: SummaryCardProps) => (
  <article className="group rounded-[1.75rem] border border-white/10 bg-white/6 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-white/8">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
          {title}
        </p>
        <p className="mt-4 truncate font-display text-3xl text-white">
          {formatCurrency(amount)}
        </p>
      </div>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/10 text-primary">
        {icon}
      </div>
    </div>
    <div className="mt-5 flex items-center gap-2 text-xs text-slate-300">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full ${
          trendDirection === "up"
            ? "bg-primary/12 text-primary"
            : "bg-rose-400/12 text-rose-200"
        }`}
      >
        {trendDirection === "up" ? (
          <ArrowUpIcon className="h-4 w-4" />
        ) : (
          <ArrowDownIcon className="h-4 w-4" />
        )}
      </span>
      <span className="truncate">{trend}</span>
    </div>
  </article>
);
