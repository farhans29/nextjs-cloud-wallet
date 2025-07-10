import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Minus,
  PiggyBank,
  Target,
  Clock,
  TrendingUp,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function SavingsPage() {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen">
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Savings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
              <h1 className="text-2xl font-semibold">Savings Goals</h1>
            </div>
            <Button size="sm" className="h-8 gap-1">
              <Plus className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                New Goal
              </span>
            </Button>
          </header>

          <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Saved
                  </CardTitle>
                  <PiggyBank className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,345.67</div>
                  <p className="text-xs text-muted-foreground">
                    +$1,234.56 (12%) last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Monthly Goal
                  </CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,200.00</div>
                  <p className="text-xs text-muted-foreground">
                    $856.42 remaining
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Next Goal
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Vacation</div>
                  <p className="text-xs text-muted-foreground">
                    $3,200 of $5,000 (64%)
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Interest Earned
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$56.78</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Savings Progress</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[300px]">
                  <p className="text-muted-foreground">
                    Savings progress chart will be displayed here
                  </p>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "New Laptop",
                      target: 1200,
                      current: 850,
                      deadline: "2023-12-15",
                    },
                    {
                      name: "Emergency Fund",
                      target: 10000,
                      current: 6500,
                      deadline: "2024-06-30",
                    },
                    {
                      name: "Car Down Payment",
                      target: 5000,
                      current: 3200,
                      deadline: "2024-03-15",
                    },
                  ].map((goal, index) => {
                    const progress = Math.min(
                      100,
                      (goal.current / goal.target) * 100
                    );
                    const daysLeft = Math.ceil(
                      (new Date(goal.deadline).getTime() - Date.now()) /
                        (1000 * 60 * 60 * 24)
                    );

                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{goal.name}</h3>
                          <span className="text-sm text-muted-foreground">
                            ${goal.current.toLocaleString()} of $
                            {goal.target.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{progress.toFixed(0)}% complete</span>
                          <span>{daysLeft} days left</span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Transactions</CardTitle>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      View All
                    </span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      date: "2023-11-15",
                      description: "Monthly Savings",
                      amount: 500,
                      type: "deposit",
                    },
                    {
                      id: 2,
                      date: "2023-11-10",
                      description: "Side Hustle Income",
                      amount: 350,
                      type: "deposit",
                    },
                    {
                      id: 3,
                      date: "2023-11-05",
                      description: "Investment Returns",
                      amount: 128.45,
                      type: "interest",
                    },
                    {
                      id: 4,
                      date: "2023-10-30",
                      description: "Emergency Fund",
                      amount: 200,
                      type: "withdrawal",
                    },
                  ].map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-lg ${
                            transaction.type === "deposit"
                              ? "bg-green-100 text-green-600"
                              : transaction.type === "withdrawal"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {transaction.type === "deposit" && (
                            <Plus className="h-5 w-5" />
                          )}
                          {transaction.type === "withdrawal" && (
                            <Minus className="h-5 w-5" />
                          )}
                          {transaction.type === "interest" && (
                            <TrendingUp className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`font-medium ${
                          transaction.type === "withdrawal"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {transaction.type === "withdrawal" ? "-" : "+"}$
                        {transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
