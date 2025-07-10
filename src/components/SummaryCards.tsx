import { DollarSign, PiggyBank, Wallet, CreditCard } from "lucide-react";
import { SummaryCard } from "./SummaryCard";
import { SummaryData } from "@/types/finance";

type SummaryCardsProps = {
  data: SummaryData;
};

export function SummaryCards({ data }: SummaryCardsProps) {
  const { totalIncome, totalExpenses, savings, savingsRate } = data;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <SummaryCard
        title="Total Balance"
        value={(totalIncome - totalExpenses).toLocaleString('en-US', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        })}
        subtitle="+2.5% from last month"
        icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
      />
      <SummaryCard
        title="Income"
        value={totalIncome.toLocaleString('en-US', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        })}
        subtitle="+10.1% from last month"
        icon={<DollarSign className="h-4 w-4 text-green-500" />}
        valueClassName="text-green-600"
      />
      <SummaryCard
        title="Expenses"
        value={totalExpenses.toLocaleString('en-US', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        })}
        subtitle="+5.3% from last month"
        icon={<CreditCard className="h-4 w-4 text-red-500" />}
        valueClassName="text-red-600"
      />
      <SummaryCard
        title="Savings"
        value={`${savingsRate.toFixed(1)}%`}
        subtitle={`$${savings.toLocaleString('en-US', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        })} saved`}
        icon={<PiggyBank className="h-4 w-4 text-blue-500" />}
        valueClassName="text-blue-600"
      />
    </div>
  );
}
