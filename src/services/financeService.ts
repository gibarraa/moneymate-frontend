import type {
  Account,
  Budget,
  BudgetDraft,
  DashboardMetrics,
  ExpenseBreakdownPoint,
  FinanceSnapshot,
  Goal,
  GoalDraft,
  Recommendation,
  ReportSummary,
  Transaction,
  TransactionDraft,
} from "@/types/finance";

const STORAGE_KEY = "moneymate_finance_snapshot";

const palette = [
  "#34d399",
  "#7dd3fc",
  "#fbbf24",
  "#fb7185",
  "#a78bfa",
  "#38bdf8",
];

const startOfMonth = (date = new Date()) => {
  const clone = new Date(date);
  clone.setDate(1);
  clone.setHours(0, 0, 0, 0);
  return clone;
};

const toIso = (date: Date) => date.toISOString();

const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return toIso(date);
};

const monthsAgo = (months: number) => {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  date.setDate(12);
  return date;
};

const defaultAccounts: Account[] = [
  { id: "account-main", name: "Cuenta principal", type: "bank" },
  { id: "account-wallet", name: "Wallet digital", type: "wallet" },
  { id: "account-cash", name: "Efectivo", type: "cash" },
];

const defaultBudgets: Budget[] = [
  {
    id: "budget-food",
    categoryId: "food",
    category: "Comida",
    limit: 4200,
    spent: 3150,
    period: "monthly",
  },
  {
    id: "budget-transport",
    categoryId: "transport",
    category: "Transporte",
    limit: 1800,
    spent: 1140,
    period: "monthly",
  },
  {
    id: "budget-leisure",
    categoryId: "leisure",
    category: "Entretenimiento",
    limit: 2500,
    spent: 2250,
    period: "monthly",
  },
];

const defaultGoals: Goal[] = [
  {
    id: "goal-laptop",
    title: "Comprar laptop",
    description: "Cambiar el equipo de trabajo antes de fin de verano.",
    targetAmount: 25000,
    savedAmount: 12800,
    deadline: new Date(new Date().getFullYear(), 8, 30).toISOString(),
  },
  {
    id: "goal-emergency",
    title: "Fondo de emergencia",
    description: "Completar tres meses de gastos esenciales.",
    targetAmount: 60000,
    savedAmount: 29200,
    deadline: new Date(new Date().getFullYear(), 11, 15).toISOString(),
  },
];

const defaultRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    title: "Recorta impulsos",
    message:
      "Tus gastos variables crecieron esta semana. Define un límite rápido para comida y ocio para recuperar margen.",
    tone: "alert",
  },
  {
    id: "rec-2",
    title: "Acelera tu meta",
    message:
      "Si apartas 8% extra de tus ingresos del mes, tu meta de laptop se adelanta casi tres semanas.",
    tone: "positive",
  },
];

const defaultTransactions = (): Transaction[] => [
  {
    id: "tx-1",
    amount: 18500,
    type: "income",
    description: "Pago de quincena",
    categoryId: "salary",
    category: "Sueldo",
    accountId: "account-main",
    accountName: "Cuenta principal",
    date: daysAgo(2),
  },
  {
    id: "tx-2",
    amount: 820,
    type: "expense",
    description: "Súper semanal",
    categoryId: "food",
    category: "Comida",
    accountId: "account-main",
    accountName: "Cuenta principal",
    date: daysAgo(1),
  },
  {
    id: "tx-3",
    amount: 490,
    type: "expense",
    description: "Gasolina",
    categoryId: "transport",
    category: "Transporte",
    accountId: "account-wallet",
    accountName: "Wallet digital",
    date: daysAgo(4),
  },
  {
    id: "tx-4",
    amount: 2300,
    type: "income",
    description: "Freelance UI",
    categoryId: "freelance",
    category: "Freelance",
    accountId: "account-main",
    accountName: "Cuenta principal",
    date: daysAgo(9),
  },
  {
    id: "tx-5",
    amount: 680,
    type: "expense",
    description: "Cena con amigos",
    categoryId: "leisure",
    category: "Entretenimiento",
    accountId: "account-wallet",
    accountName: "Wallet digital",
    date: daysAgo(10),
  },
  {
    id: "tx-6",
    amount: 1250,
    type: "expense",
    description: "Pago de internet",
    categoryId: "services",
    category: "Servicios",
    accountId: "account-main",
    accountName: "Cuenta principal",
    date: daysAgo(16),
  },
  {
    id: "tx-7",
    amount: 18700,
    type: "income",
    description: "Pago de quincena",
    categoryId: "salary",
    category: "Sueldo",
    accountId: "account-main",
    accountName: "Cuenta principal",
    date: daysAgo(18),
  },
  {
    id: "tx-8",
    amount: 340,
    type: "expense",
    description: "Café y coworking",
    categoryId: "food",
    category: "Comida",
    accountId: "account-cash",
    accountName: "Efectivo",
    date: daysAgo(22),
  },
];

const createSeedSnapshot = (): FinanceSnapshot => ({
  accounts: defaultAccounts,
  transactions: defaultTransactions(),
  budgets: defaultBudgets,
  goals: defaultGoals,
  recommendations: defaultRecommendations,
  lastSynced: new Date().toISOString(),
});

const readStoredSnapshot = () => {
  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as FinanceSnapshot;
  } catch {
    return null;
  }
};

const syncRecommendations = (recommendations: Recommendation[]) =>
  recommendations.map((recommendation) => {
    const defaultVersion = defaultRecommendations.find(
      (entry) => entry.id === recommendation.id,
    );

    return defaultVersion
      ? { ...recommendation, title: defaultVersion.title, message: defaultVersion.message }
      : recommendation;
  });

const saveSnapshot = (snapshot: FinanceSnapshot) => {
  const next = { ...snapshot, lastSynced: new Date().toISOString() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
};

const byMonthLabel = (date: Date) =>
  new Intl.DateTimeFormat("es-MX", { month: "short" }).format(date);

const buildExpenseBreakdown = (transactions: Transaction[]) => {
  const expenseMap = new Map<string, number>();

  transactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      expenseMap.set(
        transaction.category,
        (expenseMap.get(transaction.category) ?? 0) + transaction.amount,
      );
    });

  return Array.from(expenseMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map<ExpenseBreakdownPoint>(([label, value], index) => ({
      label,
      value,
      color: palette[index % palette.length],
    }));
};

const buildIncomeExpenseSeries = (transactions: Transaction[]) =>
  Array.from({ length: 6 }, (_, index) => {
    const monthDate = monthsAgo(5 - index);
    const month = monthDate.getMonth();
    const year = monthDate.getFullYear();

    const monthTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === month &&
        transactionDate.getFullYear() === year
      );
    });

    return {
      label: byMonthLabel(monthDate),
      income: monthTransactions
        .filter((transaction) => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0),
      expense: monthTransactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0),
    };
  });

export const calculateDashboardMetrics = (
  snapshot: FinanceSnapshot,
): DashboardMetrics => {
  const monthStart = startOfMonth();
  const transactionsThisMonth = snapshot.transactions.filter(
    (transaction) => new Date(transaction.date) >= monthStart,
  );

  const monthlyIncome = transactionsThisMonth
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const monthlyExpenses = transactionsThisMonth
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalBalance = snapshot.transactions.reduce((total, transaction) => {
    return total + (transaction.type === "income" ? transaction.amount : -transaction.amount);
  }, 0);

  const expenseBreakdown = buildExpenseBreakdown(snapshot.transactions);
  const topExpense = expenseBreakdown[0];

  return {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    estimatedSavings: monthlyIncome - monthlyExpenses,
    incomeExpenseSeries: buildIncomeExpenseSeries(snapshot.transactions),
    expenseBreakdown,
    recentTransactions: [...snapshot.transactions]
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .slice(0, 5),
    topExpenseCategory: topExpense?.label ?? "Sin datos",
    topExpenseValue: topExpense?.value ?? 0,
  };
};

export const calculateReportSummary = (
  snapshot: FinanceSnapshot,
): ReportSummary => {
  const metrics = calculateDashboardMetrics(snapshot);
  return {
    monthLabel: new Intl.DateTimeFormat("es-MX", {
      month: "long",
      year: "numeric",
    }).format(new Date()),
    incomeTotal: metrics.monthlyIncome,
    expenseTotal: metrics.monthlyExpenses,
    netTotal: metrics.estimatedSavings,
    topExpenseCategory: metrics.topExpenseCategory,
    recommendation:
      snapshot.recommendations[0] ?? defaultRecommendations[0],
  };
};

const findAccount = (snapshot: FinanceSnapshot, accountId: string) =>
  snapshot.accounts.find((account) => account.id === accountId) ??
  snapshot.accounts[0];

const categoryLabelFromId = (categoryId: string) =>
  ({
    salary: "Sueldo",
    freelance: "Freelance",
    food: "Comida",
    transport: "Transporte",
    leisure: "Entretenimiento",
    services: "Servicios",
    health: "Salud",
    savings: "Ahorro",
  })[categoryId] ?? "General";

const syncBudgets = (budgets: Budget[], transactions: Transaction[]) =>
  budgets.map((budget) => ({
    ...budget,
    spent: transactions
      .filter(
        (transaction) =>
          transaction.type === "expense" &&
          transaction.categoryId === budget.categoryId,
      )
      .reduce((total, transaction) => total + transaction.amount, 0),
  }));

export const financeService = {
  async getSnapshot() {
    const stored = readStoredSnapshot();

    if (!stored) {
      return saveSnapshot(createSeedSnapshot());
    }

    return saveSnapshot({
      ...stored,
      recommendations: syncRecommendations(stored.recommendations),
    });
  },

  async saveTransaction(draft: TransactionDraft, currentId?: string) {
    const snapshot = await this.getSnapshot();
    const account = findAccount(snapshot, draft.accountId);

    const transaction: Transaction = {
      id: currentId ?? crypto.randomUUID(),
      amount: draft.amount,
      type: draft.type,
      description: draft.description,
      categoryId: draft.categoryId,
      category: categoryLabelFromId(draft.categoryId),
      accountId: account.id,
      accountName: account.name,
      date: new Date(draft.date).toISOString(),
      notes: draft.notes,
    };

    const transactions = currentId
      ? snapshot.transactions.map((item) =>
          item.id === currentId ? transaction : item,
        )
      : [transaction, ...snapshot.transactions];

    return saveSnapshot({
      ...snapshot,
      transactions,
      budgets: syncBudgets(snapshot.budgets, transactions),
    });
  },

  async deleteTransaction(id: string) {
    const snapshot = await this.getSnapshot();
    const transactions = snapshot.transactions.filter((item) => item.id !== id);
    return saveSnapshot({
      ...snapshot,
      transactions,
      budgets: syncBudgets(snapshot.budgets, transactions),
    });
  },

  async saveBudget(draft: BudgetDraft, currentId?: string) {
    const snapshot = await this.getSnapshot();
    const matchingSpent = snapshot.transactions
      .filter(
        (transaction) =>
          transaction.type === "expense" &&
          transaction.categoryId === draft.categoryId,
      )
      .reduce((total, transaction) => total + transaction.amount, 0);

    const budget: Budget = {
      id: currentId ?? crypto.randomUUID(),
      categoryId: draft.categoryId,
      category: draft.category,
      limit: draft.limit,
      spent: matchingSpent,
      period: "monthly",
    };

    const budgets = currentId
      ? snapshot.budgets.map((item) => (item.id === currentId ? budget : item))
      : [...snapshot.budgets, budget];

    return saveSnapshot({ ...snapshot, budgets });
  },

  async saveGoal(draft: GoalDraft, currentId?: string) {
    const snapshot = await this.getSnapshot();
    const goal: Goal = {
      id: currentId ?? crypto.randomUUID(),
      title: draft.title,
      description: draft.description,
      targetAmount: draft.targetAmount,
      savedAmount: draft.savedAmount,
      deadline: new Date(draft.deadline).toISOString(),
    };

    const goals = currentId
      ? snapshot.goals.map((item) => (item.id === currentId ? goal : item))
      : [...snapshot.goals, goal];

    return saveSnapshot({ ...snapshot, goals });
  },
};
