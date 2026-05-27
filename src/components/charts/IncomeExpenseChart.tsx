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
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Flujo semestral
          </p>
          <h3 className="mt-2 font-display text-xl text-white">
            Ingresos vs egresos
          </h3>
        </div>
        <div className="flex gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            Ingresos
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-300" />
            Egresos
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-6 gap-4">
        {data.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-3">
            <div className="flex h-52 w-full items-end justify-center gap-2 rounded-3xl bg-slate-950/40 px-2 py-4">
              <div
                className="w-5 rounded-full bg-emerald-300/90"
                style={{ height: `${(item.income / maxValue) * 100}%` }}
                title={formatCurrency(item.income)}
              />
              <div
                className="w-5 rounded-full bg-sky-300/90"
                style={{ height: `${(item.expense / maxValue) * 100}%` }}
                title={formatCurrency(item.expense)}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-200">{item.label}</p>
              <p className="text-[11px] text-slate-500">
                {formatCurrency(item.income - item.expense)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
