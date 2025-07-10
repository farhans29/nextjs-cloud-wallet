export type Transaction = {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
};

export type CategorySpending = {
  name: string;
  amount: number;
  percentage: number;
  icon: React.ReactNode;
};

export interface SummaryData {
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  savingsRate: number;
}
