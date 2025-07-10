"use client";

import { useState } from "react";
import { Transaction, CategorySpending, SummaryData } from "@/types/finance";
import { Header } from "./Header";
import { SummaryCards } from "./SummaryCards";
import { RecentTransactions } from "./RecentTransactions";
import { SpendingByCategory } from "./SpendingByCategory";
import { 
  Utensils, 
  Home, 
  Bus, 
  ShoppingCart, 
  Gift 
} from "lucide-react";

const defaultTransactions: Transaction[] = [
  { id: 1, description: 'Grocery Store', amount: 85.20, category: 'Food', date: '2025-07-09', type: 'expense' },
  { id: 2, description: 'Monthly Salary', amount: 3200.00, category: 'Income', date: '2025-07-01', type: 'income' },
  { id: 3, description: 'Electric Bill', amount: 65.40, category: 'Utilities', date: '2025-07-05', type: 'expense' },
  { id: 4, description: 'Restaurant', amount: 42.50, category: 'Food', date: '2025-07-07', type: 'expense' },
  { id: 5, description: 'Public Transport', amount: 35.00, category: 'Transport', date: '2025-07-08', type: 'expense' },
];

const defaultCategorySpending: CategorySpending[] = [
  { name: 'Food', amount: 127.70, percentage: 35, icon: <Utensils className="h-4 w-4" /> },
  { name: 'Utilities', amount: 65.40, percentage: 18, icon: <Home className="h-4 w-4" /> },
  { name: 'Transport', amount: 35.00, icon: <Bus className="h-4 w-4" />, percentage: 10 },
  { name: 'Shopping', amount: 0, percentage: 0, icon: <ShoppingCart className="h-4 w-4" /> },
  { name: 'Other', amount: 0, percentage: 0, icon: <Gift className="h-4 w-4" /> },
];

export function FinanceDashboard() {
  const [transactions] = useState<Transaction[]>(defaultTransactions);
  const [categorySpending] = useState<CategorySpending[]>(defaultCategorySpending);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;

  const summaryData: SummaryData = {
    totalIncome,
    totalExpenses,
    savings,
    savingsRate
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SummaryCards data={summaryData} />
        <div className="grid gap-8 md:grid-cols-2">
          <RecentTransactions transactions={transactions} />
          <SpendingByCategory categories={categorySpending} />
        </div>
      </main>
    </div>
  );
}
