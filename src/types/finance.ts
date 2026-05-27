export type TransactionType = "income" | "expense";

export interface Account {
  id: string;
  name: string;
  type: "cash" | "bank" | "card" | "wallet";
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  description: string;
  categoryId: string;
  category: string;
  accountId: string;
  accountName: string;
  date: string;
  notes?: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  category: string;
  limit: number;
  spent: number;
  period: "monthly";
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
}

export interface Recommendation {
  id: string;
  title: string;
  message: string;
  tone: "positive" | "neutral" | "alert";
}

export interface ExpenseBreakdownPoint {
  label: string;
  value: number;
  color: string;
}

export interface IncomeExpensePoint {
  label: string;
  income: number;
  expense: number;
}

export interface DashboardMetrics {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  estimatedSavings: number;
  expenseBreakdown: ExpenseBreakdownPoint[];
  incomeExpenseSeries: IncomeExpensePoint[];
  recentTransactions: Transaction[];
  topExpenseCategory: string;
  topExpenseValue: number;
}

export interface ReportSummary {
  monthLabel: string;
  incomeTotal: number;
  expenseTotal: number;
  netTotal: number;
  topExpenseCategory: string;
  recommendation: Recommendation;
}

export interface FinanceSnapshot {
  accounts: Account[];
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  recommendations: Recommendation[];
  lastSynced: string;
}

export interface TransactionDraft {
  amount: number;
  type: TransactionType;
  description: string;
  categoryId: string;
  accountId: string;
  date: string;
  notes?: string;
}

export interface BudgetDraft {
  categoryId: string;
  category: string;
  limit: number;
}

export interface GoalDraft {
  title: string;
  description: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
}
