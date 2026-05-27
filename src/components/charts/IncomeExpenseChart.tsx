import type { IncomeExpensePoint } from "@/types/finance";
import { formatCurrency } from "@/utils/currency";

interface IncomeExpenseChartProps {
  data: IncomeExpensePoint[];
}

export const IncomeExpenseChart = ({ data }: IncomeExpenseChartProps) => {
  const maxValue = Math.max(
    1,
    ...data.flatMap((item) => [item.income, item.expense]),
  );

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Flujo</p>
          <h3 className="mt-2 font-display text-xl text-white">Ingresos / egresos</h3>
        </div>
        <div className="flex shrink-0 gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Ing
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            Egr
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-6 gap-2 sm:gap-4">
        {data.map((item) => (
          <div key={item.label} className="flex min-w-0 flex-col items-center gap-3">
            <div className="flex h-44 w-full items-end justify-center gap-1 rounded-3xl bg-slate-950/40 px-1.5 py-4 sm:h-52 sm:gap-2 sm:px-2">
              <div
                className="w-3 rounded-full bg-primary/90 sm:w-5"
                style={{ height: `${(item.income / maxValue) * 100}%` }}
                title={formatCurrency(item.income)}
              />
              <div
                className="w-3 rounded-full bg-secondary/90 sm:w-5"
                style={{ height: `${(item.expense / maxValue) * 100}%` }}
                title={formatCurrency(item.expense)}
              />
            </div>
            <div className="w-full text-center">
              <p className="truncate text-xs font-semibold text-slate-200 sm:text-sm">{item.label}</p>
              <p className="truncate text-[10px] text-slate-500 sm:text-[11px]">
                {formatCurrency(item.income - item.expense)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
