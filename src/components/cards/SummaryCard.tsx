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
  <article className="group rounded-[1.75rem] border border-white/10 bg-white/6 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/8">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
          {title}
        </p>
        <p className="mt-4 font-display text-3xl text-white">
          {formatCurrency(amount)}
        </p>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/20 to-sky-300/10 text-emerald-200">
        {icon}
      </div>
    </div>
    <div className="mt-5 flex items-center gap-2 text-sm">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full ${
          trendDirection === "up"
            ? "bg-emerald-400/12 text-emerald-200"
            : "bg-rose-400/12 text-rose-200"
        }`}
      >
        {trendDirection === "up" ? (
          <ArrowUpIcon className="h-4 w-4" />
        ) : (
          <ArrowDownIcon className="h-4 w-4" />
        )}
      </span>
      <span className="text-slate-300">{trend}</span>
    </div>
  </article>
);
