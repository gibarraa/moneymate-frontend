import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { BudgetIcon, CheckIcon, PlusIcon } from "@/components/ui/Icons";
import { Input } from "@/components/ui/Input";
import { useFinance } from "@/context/FinanceContext";
import { useToast } from "@/context/ToastContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import { formatCurrency } from "@/utils/currency";

const categoryOptions = [
  ["food", "Comida"],
  ["transport", "Transporte"],
  ["leisure", "Entretenimiento"],
  ["services", "Servicios"],
  ["health", "Salud"],
];

const getBudgetTone = (ratio: number) => {
  if (ratio <= 60) return "success";
  if (ratio <= 85) return "warning";
  if (ratio <= 100) return "danger";
  return "danger";
};

const getBudgetBarColor = (ratio: number) => {
  if (ratio <= 60) return "bg-primary";
  if (ratio <= 85) return "bg-amber-300";
  if (ratio <= 100) return "bg-orange-300";
  return "bg-rose-300";
};

export const BudgetsPage = () => {
  usePageMeta("Presupuestos");

  const { snapshot, saveBudget } = useFinance();
  const { notify } = useToast();
  const [categoryId, setCategoryId] = useState("food");
  const [limit, setLimit] = useState("");

  if (!snapshot) {
    return null;
  }

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const category = categoryOptions.find(([id]) => id === categoryId)?.[1] ?? "General";
    await saveBudget({ categoryId, category, limit: Number(limit) });
    setLimit("");
    notify({
      title: "Presupuesto guardado",
      description: "Ya puedes monitorear cuánto has usado en esa categoría.",
      tone: "success",
    });
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="space-y-4">
        {snapshot.budgets.length === 0 ? (
          <EmptyState
            icon={<BudgetIcon className="h-6 w-6" />}
            title="Todavía no hay presupuestos"
            description="Crea un límite por categoría para vigilar tu gasto mensual."
          />
        ) : (
          snapshot.budgets.map((budget) => {
            const ratio = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;

            return (
              <article
                key={budget.id}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-display text-2xl text-white">{budget.category}</h2>
                    <p className="mt-2 text-sm text-slate-400">
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                    </p>
                  </div>
                  <Badge tone={getBudgetTone(ratio)}>
                    {ratio.toFixed(0)}% usado
                  </Badge>
                </div>

                <div className="mt-5 h-3 rounded-full bg-slate-950/45">
                  <div
                    className={`h-full rounded-full ${getBudgetBarColor(ratio)}`}
                    style={{ width: `${Math.min(ratio, 100)}%` }}
                  />
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                  <CheckIcon className="h-4 w-4 text-primary" />
                  {ratio > 100
                    ? "Excedido"
                    : "Dentro"}
                </div>
              </article>
            );
          })
        )}
      </section>

      <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
        <h2 className="font-display text-xl text-white">Nuevo presupuesto</h2>

        <form onSubmit={handleCreate} className="mt-6 space-y-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-200">Categoría</span>
            <select
              className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-white outline-none"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
            >
              {categoryOptions.map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <Input
            label="Límite mensual"
            type="number"
            min="0"
            placeholder="3000"
            value={limit}
            onChange={(event) => setLimit(event.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            <PlusIcon className="h-4 w-4" />
            Guardar presupuesto
          </Button>
        </form>
      </section>
    </div>
  );
};
