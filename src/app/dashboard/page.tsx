"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mock data for the dashboard
  const stats = {
    balance: 4521.75,
    income: 3250.0,
    expenses: 1278.25,
    savings: 1972.5,
  };

  const recentTransactions = [
    {
      id: 1,
      description: "Grocery Store",
      amount: 85.2,
      category: "Food",
      date: "2025-07-10",
      type: "expense",
    },
    {
      id: 2,
      description: "Monthly Salary",
      amount: 3200.0,
      category: "Income",
      date: "2025-07-01",
      type: "income",
    },
    {
      id: 3,
      description: "Electric Bill",
      amount: 65.4,
      category: "Utilities",
      date: "2025-07-05",
      type: "expense",
    },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur-sm">
            <div className="flex w-full items-center gap-2 px-4">
              <SidebarTrigger />
              <Breadcrumb className="flex-1">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* NAV ACTIONS AFTER BRANDING */}
            {/* <div className="flex items-center gap-2 px-4">
              <NavActions />
            </div> */}
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 pt-16 md:pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Balance"
              value={stats.balance}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              }
              change="+20.1% from last month"
            />
            <StatCard
              title="Income"
              value={stats.income}
              isIncome={true}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M5 12h14m-7-7v14m0 0l7-7m-7 7l-7-7" />
                </svg>
              }
              change="+12% from last month"
            />
            <StatCard
              title="Expenses"
              value={-stats.expenses}
              isExpense={true}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M5 12h14m-7 7V5m0 0l-7 7m7-7l7 7" />
                </svg>
              }
              change="+8.2% from last month"
            />
            <StatCard
              title="Savings"
              value={stats.savings}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              }
              change="+5.4% from last month"
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Recent Transactions
                </CardTitle>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Plus className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Transaction
                  </span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          {transaction.type === "income" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 text-green-500"
                            >
                              <path d="M5 12h14m-7-7v14m0 0l7-7m-7 7l-7-7" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 text-red-500"
                            >
                              <path d="M5 12h14m-7 7V5m0 0l-7 7m7-7l7 7" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.category} •{" "}
                            {isClient
                              ? new Date(transaction.date).toLocaleDateString()
                              : transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium ${
                            transaction.type === "income"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}$
                          {transaction.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Spending by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      category: "Food",
                      amount: 385.2,
                      percentage: 45,
                      color: "bg-blue-500",
                    },
                    {
                      category: "Utilities",
                      amount: 165.4,
                      percentage: 30,
                      color: "bg-green-500",
                    },
                    {
                      category: "Shopping",
                      amount: 210.75,
                      percentage: 25,
                      color: "bg-yellow-500",
                    },
                    {
                      category: "Entertainment",
                      amount: 75.3,
                      percentage: 15,
                      color: "bg-purple-500",
                    },
                    {
                      category: "Others",
                      amount: 50.0,
                      percentage: 10,
                      color: "bg-gray-500",
                    },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {item.category}
                        </span>
                        <span className="text-sm font-medium">
                          ${item.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  change,
  isIncome,
  isExpense,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  change: string;
  isIncome?: boolean;
  isExpense?: boolean;
}) {
  const isNegative = value < 0;
  const displayValue = Math.abs(value);

  let valueColor = "";
  if (isIncome) valueColor = "text-green-500";
  else if (isExpense) valueColor = "text-red-500";
  else if (isNegative) valueColor = "text-red-500";
  else valueColor = "text-green-500";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueColor}`}>
          {isNegative ? "-" : ""}${displayValue.toFixed(2)}
        </div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}
