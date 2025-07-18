"use client";

import { Plus, ArrowUpDown, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";

type Transaction = {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: "income" | "expense";
};

import { useTransactions } from "@/hooks/useDatabase";
import { useEffect } from "react";

export default function TransactionsPage() {
    const {
        getTransactions,
        addTransaction,
        data: transactions,
        loading,
        error,
    } = useTransactions();

    useEffect(() => {
        getTransactions();
    }, [getTransactions]);

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
                                        <BreadcrumbPage>
                                            Transactions
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="flex items-center gap-2 px-4">
                            <NavActions />
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div className="relative w-full max-w-md">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search transactions..."
                                    className="pl-9 w-full"
                                />
                            </div>
                            <Button className="h-8 gap-1">
                                <Plus className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Transaction
                                </span>
                            </Button>
                        </div>

                        <Card>
                            <CardHeader className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">
                                        Transaction History
                                    </CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="ml-auto gap-1"
                                    >
                                        <ArrowUpDown className="h-3.5 w-3.5" />
                                        Sort
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-t border-b">
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                                    Date
                                                </th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                                    Description
                                                </th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                                    Category
                                                </th>
                                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td
                                                        colSpan={4}
                                                        className="p-4 text-center"
                                                    >
                                                        Loading...
                                                    </td>
                                                </tr>
                                            ) : error ? (
                                                <tr>
                                                    <td
                                                        colSpan={4}
                                                        className="p-4 text-center text-red-600"
                                                    >
                                                        {error.message}
                                                    </td>
                                                </tr>
                                            ) : transactions &&
                                              Array.isArray(transactions) &&
                                              transactions.length > 0 ? (
                                                transactions.map(
                                                    (
                                                        transaction: Transaction
                                                    ) => (
                                                        <tr
                                                            key={transaction.id}
                                                            className="border-b hover:bg-muted/50"
                                                        >
                                                            <td className="p-4 align-middle">
                                                                {new Date(
                                                                    transaction.date
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        year: "numeric",
                                                                        month: "short",
                                                                        day: "numeric",
                                                                    }
                                                                )}
                                                            </td>
                                                            <td className="p-4 align-middle font-medium">
                                                                {
                                                                    transaction.description
                                                                }
                                                            </td>
                                                            <td className="p-4 align-middle">
                                                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                                                                    {
                                                                        transaction.category
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td
                                                                className={`p-4 text-right align-middle font-medium ${
                                                                    transaction.type ===
                                                                    "income"
                                                                        ? "text-green-600"
                                                                        : "text-foreground"
                                                                }`}
                                                            >
                                                                {transaction.type ===
                                                                "income"
                                                                    ? "+"
                                                                    : "-"}
                                                                $
                                                                {transaction.amount.toFixed(
                                                                    2
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan={4}
                                                        className="p-4 text-center"
                                                    >
                                                        No transactions found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}
