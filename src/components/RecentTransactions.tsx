import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/finance";
import { DollarSign, ShoppingCart } from "lucide-react";

type RecentTransactionsProps = {
  transactions: Transaction[];
};

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-muted">
                  {transaction.type === 'income' ? (
                    <DollarSign className="h-4 w-4 text-green-500" />
                  ) : (
                    <ShoppingCart className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
              </div>
              <span 
                className={`font-medium ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-foreground'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                ${transaction.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-4" size="sm">
          View All Transactions
        </Button>
      </CardContent>
    </Card>
  );
}
