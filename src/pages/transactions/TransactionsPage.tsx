import { useDeferredValue, useState } from "react";
import { TransactionForm } from "@/components/forms/TransactionForm";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  CalendarIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TransactionsIcon,
  TrashIcon,
} from "@/components/ui/Icons";
import { useFinance } from "@/context/FinanceContext";
import { useToast } from "@/context/ToastContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import type { Transaction } from "@/types/finance";
import { formatCurrency } from "@/utils/currency";
import { formatShortDate } from "@/utils/date";

export const TransactionsPage = () => {
  usePageMeta("Movimientos");

  const { snapshot, saveTransaction, deleteTransaction } = useFinance();
  const { notify } = useToast();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const deferredSearch = useDeferredValue(search);

  if (!snapshot) {
    return null;
  }

  const categories = Array.from(
    new Map(
      snapshot.transactions.map((transaction) => [
        transaction.categoryId,
        transaction.category,
      ]),
    ).entries(),
  );

  const filteredTransactions = snapshot.transactions.filter((transaction) => {
    const matchesType =
      typeFilter === "all" ? true : transaction.type === typeFilter;
    const matchesCategory =
      categoryFilter === "all"
        ? true
        : transaction.categoryId === categoryFilter;
    const matchesSearch =
      deferredSearch.trim() === ""
        ? true
        : `${transaction.description} ${transaction.category} ${transaction.accountName}`
            .toLowerCase()
            .includes(deferredSearch.toLowerCase());
    const matchesDate = dateFilter
      ? transaction.date.slice(0, 10) === dateFilter
      : true;

    return matchesType && matchesCategory && matchesSearch && matchesDate;
  });

  const handleDelete = async (transaction: Transaction) => {
    const confirmed = window.confirm(
      `¿Eliminar el movimiento "${transaction.description}"?`,
    );

    if (!confirmed) {
      return;
    }

    await deleteTransaction(transaction.id);
    notify({
      title: "Movimiento eliminado",
      description: "La lista y los presupuestos se actualizaron al instante.",
      tone: "info",
    });
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Historial inteligente
            </p>
            <h2 className="mt-2 font-display text-xl text-white">
              Todos tus movimientos
            </h2>
          </div>
          <Badge tone="neutral">{filteredTransactions.length} resultados</Badge>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-4">
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-slate-400">
            <SearchIcon className="h-4 w-4" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              placeholder="Buscar movimiento"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <select
            className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-white outline-none"
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option value="all">Todos los tipos</option>
            <option value="income">Ingresos</option>
            <option value="expense">Egresos</option>
          </select>

          <select
            className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-white outline-none"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="all">Todas las categorías</option>
            {categories.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-slate-400">
            <CalendarIcon className="h-4 w-4" />
            <input
              type="date"
              className="w-full bg-transparent text-white outline-none"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
            />
          </label>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              icon={<TransactionsIcon className="h-6 w-6" />}
              title="No encontramos movimientos"
              description="Prueba ajustando los filtros o crea tu primer ingreso o egreso."
            />
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {filteredTransactions.map((transaction) => (
              <article
                key={transaction.id}
                className="rounded-3xl border border-white/8 bg-slate-950/35 p-4"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {transaction.description}
                      </h3>
                      <Badge
                        tone={
                          transaction.type === "income" ? "success" : "danger"
                        }
                      >
                        {transaction.type === "income" ? "Ingreso" : "Egreso"}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">
                      {transaction.category} • {transaction.accountName} •{" "}
                      {formatShortDate(transaction.date)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <p
                      className={`text-lg font-semibold ${
                        transaction.type === "income"
                          ? "text-emerald-200"
                          : "text-rose-200"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>

                    <Button
                      variant="ghost"
                      className="px-3 py-2"
                      onClick={() => setEditingTransaction(transaction)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="danger"
                      className="px-3 py-2"
                      onClick={() => void handleDelete(transaction)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex justify-end">
          <Button
            variant="secondary"
            onClick={() => setEditingTransaction(null)}
            className="w-full justify-center xl:w-auto"
          >
            <PlusIcon className="h-4 w-4" />
            Nuevo movimiento
          </Button>
        </div>
        <TransactionForm
          accounts={snapshot.accounts}
          editingTransaction={editingTransaction}
          onCancel={() => setEditingTransaction(null)}
          onSubmit={async (draft, currentId) => {
            await saveTransaction(draft, currentId);
            notify({
              title: currentId ? "Movimiento actualizado" : "Movimiento creado",
              description:
                "La tabla, el dashboard y los presupuestos ya reflejan el cambio.",
              tone: "success",
            });
          }}
        />
      </section>
    </div>
  );
};
