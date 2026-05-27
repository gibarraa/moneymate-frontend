import type { ExpenseBreakdownPoint } from "@/types/finance";
import { formatCurrency } from "@/utils/currency";

interface ExpenseChartProps {
  data: ExpenseBreakdownPoint[];
}

export const ExpenseChart = ({ data }: ExpenseChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Gasto</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <h3 className="font-display text-xl text-white">Categorías</h3>
        <p className="text-xs text-slate-400">{data.length}</p>
      </div>

      <div className="mt-6 space-y-4">
        {data.map((item) => {
          const ratio = total > 0 ? (item.value / total) * 100 : 0;

          return (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-slate-200">{item.label}</span>
                </div>
                <span className="shrink-0 text-slate-400">{formatCurrency(item.value)}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-950/50">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${ratio}%`,
                    background: `linear-gradient(90deg, ${item.color} 0%, rgba(255,255,255,0.85) 100%)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
