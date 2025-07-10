"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  BarChart2,
  DollarSign,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function InvestmentsPage() {
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
                    <BreadcrumbPage>Investments</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2 px-4">
              <Button size="sm" className="h-8 gap-1">
                <Plus className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Investment
                </span>
              </Button>
              <NavActions />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 pt-16 md:pt-6">
            {/* FIRST SEGMENT */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Portfolio
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">+20.1%</span> from last
                    month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Gains</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">
                    +$2,345.00
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +10.2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Losses</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">
                    -$1,234.56
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +5.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Performance
                  </CardTitle>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12.3%</div>
                  <p className="text-xs text-muted-foreground">YTD return</p>
                </CardContent>
              </Card>
            </div>

            {/* SECOND SEGMENT */}
            <div></div>

            {/* THIRD SEGMENT */}
            <div className="grid gap-4 mt-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Portfolio Overview</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Portfolio chart will be displayed here
                  </p>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Pie chart will be displayed here
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* FORTH SEGMENT */}
            <div className="mt-6">
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Your Investments</CardTitle>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        View All
                      </span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Tech Stocks",
                        value: 15230.45,
                        change: 5.2,
                        type: "stocks",
                      },
                      {
                        name: "Index Funds",
                        value: 12345.67,
                        change: 2.1,
                        type: "funds",
                      },
                      {
                        name: "Crypto",
                        value: 8765.43,
                        change: -3.4,
                        type: "crypto",
                      },
                      {
                        name: "Bonds",
                        value: 5432.1,
                        change: 1.2,
                        type: "bonds",
                      },
                    ].map((investment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-muted p-2 rounded-lg">
                            {investment.type === "stocks" && (
                              <BarChart2 className="h-4 w-4" />
                            )}
                            {investment.type === "funds" && (
                              <TrendingUp className="h-4 w-4" />
                            )}
                            {investment.type === "crypto" && (
                              <DollarSign className="h-4 w-4" />
                            )}
                            {investment.type === "bonds" && (
                              <TrendingDown className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {investment.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {investment.type.charAt(0).toUpperCase() +
                                investment.type.slice(1)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            $
                            {investment.value.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                          <p
                            className={`text-xs ${
                              investment.change >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {investment.change >= 0 ? "+" : ""}
                            {investment.change}%
                          </p>
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
