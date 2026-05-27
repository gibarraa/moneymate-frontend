import { SummaryCard } from "@/components/cards/SummaryCard";
import { ExpenseChart } from "@/components/charts/ExpenseChart";
import { IncomeExpenseChart } from "@/components/charts/IncomeExpenseChart";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  BudgetIcon,
  SparklesIcon,
  TransactionsIcon,
  WalletIcon,
} from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeleton";
import { useFinance, useFinanceMetrics } from "@/context/FinanceContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import { formatShortDate } from "@/utils/date";
import { formatCurrency } from "@/utils/currency";

export const DashboardPage = () => {
  usePageMeta("Dashboard");

  const { snapshot, isLoading } = useFinance();
  const metrics = useFinanceMetrics();

  if (isLoading || !metrics || !snapshot) {
    return (
      <div className="grid gap-5">
        <div className="grid gap-5 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-44 rounded-[1.75rem]" />
          ))}
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <Skeleton className="h-[25rem] rounded-[1.75rem]" />
          <Skeleton className="h-[25rem] rounded-[1.75rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <section className="grid gap-5 xl:grid-cols-4">
        <SummaryCard
          title="Balance"
          amount={metrics.totalBalance}
          trend="+8%"
          trendDirection="up"
          icon={<WalletIcon className="h-6 w-6" />}
        />
        <SummaryCard
          title="Ingresos"
          amount={metrics.monthlyIncome}
          trend="Mes"
          trendDirection="up"
          icon={<TransactionsIcon className="h-6 w-6" />}
        />
        <SummaryCard
          title="Egresos"
          amount={metrics.monthlyExpenses}
          trend="3 rubros"
          trendDirection="down"
          icon={<BudgetIcon className="h-6 w-6" />}
        />
        <SummaryCard
          title="Ahorro"
          amount={metrics.estimatedSavings}
          trend="Libre"
          trendDirection="up"
          icon={<SparklesIcon className="h-6 w-6" />}
        />
      </section>

      {snapshot.transactions.length === 0 ? (
        <EmptyState
          icon={<TransactionsIcon className="h-6 w-6" />}
          title="Aún no tienes movimientos"
          description="Agrega tu primer ingreso o egreso para empezar a visualizar tendencias y recomendaciones."
        />
      ) : (
        <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <IncomeExpenseChart data={metrics.incomeExpenseSeries} />
          <ExpenseChart data={metrics.expenseBreakdown} />
        </section>
      )}

      <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Últimos</p>
              <h3 className="mt-2 font-display text-xl text-white">Movimientos</h3>
            </div>
            <Badge tone="neutral">Top 5</Badge>
          </div>

          <div className="mt-5 space-y-3">
            {metrics.recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-4 rounded-3xl border border-white/6 bg-slate-950/35 px-4 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{transaction.description}</p>
                  <p className="truncate mt-1 text-xs text-slate-500">
                    {transaction.category} • {formatShortDate(transaction.date)}
                  </p>
                </div>
                <p
                  className={`shrink-0 text-sm font-semibold ${
                    transaction.type === "income"
                      ? "text-primary"
                      : "text-rose-200"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
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
              <h3 className="mt-2 font-display text-xl text-white">
                {snapshot.recommendations[0]?.title}
              </h3>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Mayor gasto</p>
              <p className="mt-3 font-display text-2xl text-white">
                {metrics.topExpenseCategory}
              </p>
              <p className="mt-1 text-sm text-slate-400">{formatCurrency(metrics.topExpenseValue)}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Metas</p>
              <p className="mt-3 font-display text-2xl text-white">
                {snapshot.goals.length}
              </p>
              <p className="mt-1 text-sm text-slate-400">Activas</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};
