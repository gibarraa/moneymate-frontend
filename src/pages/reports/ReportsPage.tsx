import { Button } from "@/components/ui/Button";
import { ReportsIcon, SparklesIcon } from "@/components/ui/Icons";
import { useFinance, useReportSummary } from "@/context/FinanceContext";
import { useToast } from "@/context/ToastContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import { formatCurrency } from "@/utils/currency";

export const ReportsPage = () => {
  usePageMeta("Reportes");

  const summary = useReportSummary();
  const { snapshot } = useFinance();
  const { notify } = useToast();

  if (!summary || !snapshot) {
    return null;
  }

  const handleGenerate = () => {
    const content = [
      `Reporte mensual MoneyMate - ${summary.monthLabel}`,
      "",
      `Ingresos: ${formatCurrency(summary.incomeTotal)}`,
      `Egresos: ${formatCurrency(summary.expenseTotal)}`,
      `Balance neto: ${formatCurrency(summary.netTotal)}`,
      `Mayor gasto: ${summary.topExpenseCategory}`,
      "",
      `Recomendación: ${summary.recommendation.title}`,
      summary.recommendation.message,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "moneymate-reporte-mensual.txt";
    link.click();
    URL.revokeObjectURL(url);

    notify({
      title: "Reporte generado",
      description: "Se descargó un resumen mensual listo para compartir.",
      tone: "success",
    });
  };

  return (
    <div className="grid gap-5">
      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Mes</p>
          <h2 className="mt-2 font-display text-2xl text-white">{summary.monthLabel}</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Ingresos", summary.incomeTotal],
              ["Egresos", summary.expenseTotal],
              ["Neto", summary.netTotal],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/8 bg-slate-950/35 p-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  {label}
                </p>
                <p className="mt-3 font-display text-2xl text-white">
                  {formatCurrency(Number(value))}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-primary/16 bg-gradient-to-br from-secondary/12 via-white/5 to-primary/10 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/14 text-primary">
              <SparklesIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Tip</p>
              <h2 className="mt-2 font-display text-xl text-white">{summary.recommendation.title}</h2>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Mayor gasto</p>
              <h3 className="mt-2 font-display text-xl text-white">Categoría</h3>
            </div>
            <ReportsIcon className="h-6 w-6 text-slate-400" />
          </div>

          <p className="mt-6 font-display text-4xl text-white">{summary.topExpenseCategory}</p>
        </article>

        <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Exportar</p>
          <h3 className="mt-2 font-display text-xl text-white">Reporte</h3>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={handleGenerate}>
              <ReportsIcon className="h-4 w-4" />
              Descargar
            </Button>
            <Button variant="secondary" onClick={() => window.print()}>
              Imprimir
            </Button>
          </div>
        </article>
      </section>
    </div>
  );
};
