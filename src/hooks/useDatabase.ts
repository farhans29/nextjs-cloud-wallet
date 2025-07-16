import { useState, useCallback, useEffect } from "react";

type QueryResult<T = any> = {
    data: T | null;
    loading: boolean;
    error: Error | null;
    execute: (sql: string, params?: any[]) => Promise<T>;
};

type ApiResponse = {
    error?: string;
    [key: string]: any;
};

export function useDatabase(): QueryResult {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [initialized, setInitialized] = useState<boolean>(false);

    // Initialize database on first use
    useEffect(() => {
        if (!initialized) {
            fetch("/api/db", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ init: true }),
            })
                .then(() => setInitialized(true))
                .catch((err) =>
                    console.error("Database initialization failed:", err)
                );
        }
    }, [initialized]);

    const execute = useCallback(
        async (sql: string, params: any[] = []) => {
            setLoading(true);
            setError(null);

            try {
                // Ensure database is initialized
                if (!initialized) {
                    throw new Error("Database is not initialized");
                }

                const response = await fetch("/api/db", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        sql,
                        params,
                    }),
                });

                if (!response.ok) {
                    const errorData = (await response.json()) as ApiResponse;
                    throw new Error(
                        `useDatabase.ts Database query failed: ${
                            errorData.error ||
                            errorData.details ||
                            response.statusText
                        }`
                    );
                }

                const result = await response.json();
                setData(result);
                return result;
            } catch (err) {
                const error =
                    err instanceof Error
                        ? err
                        : new Error("An unknown error occurred");
                setError(error);
                throw error;
            } finally {
                setLoading(false);
            }
        },
        [initialized]
    );

    return { data, loading, error, execute };
}

// Example hook for common operations
export function useTransactions() {
    const { execute, ...rest } = useDatabase();

    const getTransactions = useCallback(async () => {
        return execute("SELECT * FROM transactions ORDER BY date DESC");
    }, [execute]);

    const addTransaction = useCallback(
        async (transaction: {
            amount: number;
            description: string;
            type: "income" | "expense";
            category: string;
        }) => {
            return execute(
                "INSERT INTO transactions (amount, description, type, category) VALUES (?, ?, ?, ?)",
                [
                    transaction.amount,
                    transaction.description,
                    transaction.type,
                    transaction.category,
                ]
            );
        },
        [execute]
    );

    return {
        ...rest,
        getTransactions,
        addTransaction,
    };
}
