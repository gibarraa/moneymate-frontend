import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/context/AuthContext";
import {
  calculateDashboardMetrics,
  calculateReportSummary,
  financeService,
} from "@/services/financeService";
import type {
  BudgetDraft,
  FinanceSnapshot,
  GoalDraft,
  TransactionDraft,
} from "@/types/finance";

interface FinanceContextValue {
  snapshot: FinanceSnapshot | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
  saveTransaction: (draft: TransactionDraft, currentId?: string) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  saveBudget: (draft: BudgetDraft, currentId?: string) => Promise<void>;
  saveGoal: (draft: GoalDraft, currentId?: string) => Promise<void>;
}

const FinanceContext = createContext<FinanceContextValue | null>(null);

export const FinanceProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();
  const [snapshot, setSnapshot] = useState<FinanceSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const nextSnapshot = await financeService.getSnapshot();
      setSnapshot(nextSnapshot);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setSnapshot(null);
      setIsLoading(false);
      return;
    }

    void refresh();
  }, [isAuthenticated]);

  const saveTransaction: FinanceContextValue["saveTransaction"] = async (
    draft,
    currentId,
  ) => {
    const nextSnapshot = await financeService.saveTransaction(draft, currentId);
    setSnapshot(nextSnapshot);
  };

  const deleteTransaction: FinanceContextValue["deleteTransaction"] = async (
    id,
  ) => {
    const nextSnapshot = await financeService.deleteTransaction(id);
    setSnapshot(nextSnapshot);
  };

  const saveBudget: FinanceContextValue["saveBudget"] = async (
    draft,
    currentId,
  ) => {
    const nextSnapshot = await financeService.saveBudget(draft, currentId);
    setSnapshot(nextSnapshot);
  };

  const saveGoal: FinanceContextValue["saveGoal"] = async (
    draft,
    currentId,
  ) => {
    const nextSnapshot = await financeService.saveGoal(draft, currentId);
    setSnapshot(nextSnapshot);
  };

  return (
    <FinanceContext.Provider
      value={{
        snapshot,
        isLoading,
        refresh,
        saveTransaction,
        deleteTransaction,
        saveBudget,
        saveGoal,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error("useFinance must be used within FinanceProvider");
  }

  return context;
};

export const useFinanceMetrics = () => {
  const { snapshot } = useFinance();

  return snapshot ? calculateDashboardMetrics(snapshot) : null;
};

export const useReportSummary = () => {
  const { snapshot } = useFinance();

  return snapshot ? calculateReportSummary(snapshot) : null;
};
