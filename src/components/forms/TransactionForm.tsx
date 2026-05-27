import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Account, Transaction, TransactionDraft } from "@/types/finance";
import { toInputDate } from "@/utils/date";

const categories = [
  { id: "salary", label: "Sueldo" },
  { id: "freelance", label: "Freelance" },
  { id: "food", label: "Comida" },
  { id: "transport", label: "Transporte" },
  { id: "leisure", label: "Entretenimiento" },
  { id: "services", label: "Servicios" },
  { id: "health", label: "Salud" },
  { id: "savings", label: "Ahorro" },
];

interface TransactionFormProps {
  accounts: Account[];
  editingTransaction?: Transaction | null;
  onCancel: () => void;
  onSubmit: (draft: TransactionDraft, currentId?: string) => Promise<void>;
}

const emptyDraft: TransactionDraft = {
  amount: 0,
  type: "expense",
  description: "",
  categoryId: "food",
  accountId: "account-main",
  date: toInputDate(),
  notes: "",
};

export const TransactionForm = ({
  accounts,
  editingTransaction,
  onCancel,
  onSubmit,
}: TransactionFormProps) => {
  const [draft, setDraft] = useState<TransactionDraft>(emptyDraft);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!editingTransaction) {
      setDraft({
        ...emptyDraft,
        accountId: accounts[0]?.id ?? emptyDraft.accountId,
      });
      return;
    }

    setDraft({
      amount: editingTransaction.amount,
      type: editingTransaction.type,
      description: editingTransaction.description,
      categoryId: editingTransaction.categoryId,
      accountId: editingTransaction.accountId,
      date: toInputDate(editingTransaction.date),
      notes: editingTransaction.notes ?? "",
    });
  }, [accounts, editingTransaction]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await onSubmit(draft, editingTransaction?.id);
      setDraft({
        ...emptyDraft,
        accountId: accounts[0]?.id ?? emptyDraft.accountId,
      });
      onCancel();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Formulario
          </p>
          <h3 className="mt-2 font-display text-xl text-white">
            {editingTransaction ? "Editar movimiento" : "Nuevo movimiento"}
          </h3>
        </div>
        <div className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-300">
          {draft.type === "income" ? "Ingreso" : "Egreso"}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Input
          label="Descripción"
          placeholder="Ej. pago de internet"
          value={draft.description}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
          required
        />
        <Input
          label="Monto"
          type="number"
          min="0"
          step="0.01"
          value={draft.amount || ""}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              amount: Number(event.target.value),
            }))
          }
          required
        />

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-200">Tipo</span>
          <select
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-emerald-300/40"
            value={draft.type}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                type: event.target.value as TransactionDraft["type"],
              }))
            }
          >
            <option value="expense">Egreso</option>
            <option value="income">Ingreso</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-200">Categoría</span>
          <select
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-emerald-300/40"
            value={draft.categoryId}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                categoryId: event.target.value,
              }))
            }
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-200">Cuenta</span>
          <select
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-emerald-300/40"
            value={draft.accountId}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                accountId: event.target.value,
              }))
            }
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </label>

        <Input
          label="Fecha"
          type="date"
          value={draft.date}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              date: event.target.value,
            }))
          }
          required
        />
      </div>

      <label className="mt-4 flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-200">Notas</span>
        <textarea
          className="min-h-[110px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/40"
          placeholder="Agrega contexto útil para este movimiento"
          value={draft.notes}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              notes: event.target.value,
            }))
          }
        />
      </label>

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Guardando..." : editingTransaction ? "Actualizar" : "Crear movimiento"}
        </Button>
      </div>
    </form>
  );
};
