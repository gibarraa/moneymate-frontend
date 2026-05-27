import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { GoalsIcon, PlusIcon } from "@/components/ui/Icons";
import { Input } from "@/components/ui/Input";
import { useFinance } from "@/context/FinanceContext";
import { useToast } from "@/context/ToastContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import { formatCurrency } from "@/utils/currency";
import { formatShortDate, toInputDate } from "@/utils/date";

export const GoalsPage = () => {
  usePageMeta("Metas");

  const { snapshot, saveGoal } = useFinance();
  const { notify } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("");
  const [deadline, setDeadline] = useState(toInputDate());

  if (!snapshot) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await saveGoal({
      title,
      description,
      targetAmount: Number(targetAmount),
      savedAmount: Number(savedAmount),
      deadline,
    });
    setTitle("");
    setDescription("");
    setTargetAmount("");
    setSavedAmount("");
    setDeadline(toInputDate());
    notify({
      title: "Meta creada",
      description: "Ya puedes monitorear su avance desde esta vista.",
      tone: "success",
    });
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-4">
        {snapshot.goals.length === 0 ? (
          <EmptyState
            icon={<GoalsIcon className="h-6 w-6" />}
            title="Aún no tienes metas de ahorro"
            description="Agrega una meta para hacer visible tu progreso y tu fecha objetivo."
          />
        ) : (
          snapshot.goals.map((goal) => {
            const ratio =
              goal.targetAmount > 0
                ? (goal.savedAmount / goal.targetAmount) * 100
                : 0;

            return (
              <article
                key={goal.id}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-2xl text-white">
                      {goal.title}
                    </h2>
                  </div>
                  <Badge tone={ratio >= 100 ? "success" : "neutral"}>
                    {ratio.toFixed(0)}% completado
                  </Badge>
                </div>

                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-slate-300">
                    {formatCurrency(goal.savedAmount)} / {formatCurrency(goal.targetAmount)}
                  </span>
                  <span className="text-slate-500">
                    Límite {formatShortDate(goal.deadline)}
                  </span>
                </div>

                <div className="mt-3 h-3 rounded-full bg-slate-950/45">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-secondary to-primary"
                    style={{ width: `${Math.min(ratio, 100)}%` }}
                  />
                </div>
              </article>
            );
          })
        )}
      </section>

      <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
        <h2 className="font-display text-xl text-white">Nueva meta</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Título"
            placeholder="Ej. viaje a Monterrey"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-200">Descripción</span>
            <textarea
              className="min-h-[110px] rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-white outline-none"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="¿Qué representa esta meta para ti?"
              required
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Monto objetivo"
              type="number"
              min="0"
              value={targetAmount}
              onChange={(event) => setTargetAmount(event.target.value)}
              required
            />
            <Input
              label="Monto ahorrado"
              type="number"
              min="0"
              value={savedAmount}
              onChange={(event) => setSavedAmount(event.target.value)}
              required
            />
          </div>
          <Input
            label="Fecha límite"
            type="date"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            <PlusIcon className="h-4 w-4" />
            Guardar meta
          </Button>
        </form>
      </section>
    </div>
  );
};
