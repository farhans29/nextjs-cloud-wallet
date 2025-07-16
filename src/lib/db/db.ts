// // Types for Cloudflare D1
// type D1Result<T = unknown> = {
//     results?: T[];
//     success: boolean;
//     error?: string;
//     meta?: any;
// };

// type D1Database = {
//     prepare: (query: string) => D1PreparedStatement;
//     dump: () => Promise<ArrayBuffer>;
//     batch: <T = unknown>(
//         statements: D1PreparedStatement[]
//     ) => Promise<D1Result<T>[]>;
//     exec: (query: string) => Promise<D1ExecResult>;
// };

// type D1PreparedStatement = {
//     bind: (...values: any[]) => D1PreparedStatement;
//     all: <T = any>() => Promise<D1Result<T>>;
//     run: () => Promise<D1ExecResult>;
//     first: <T = any>(columnName?: string) => Promise<T>;
// };

// type D1ExecResult = {
//     count: number;
//     duration: number;
// };

// // This is the type for the API response
// type ApiResponse = {
//     error?: string;
//     details?: string;
//     data?: any;
// };

// // This is the type for the request body
// type QueryRequest = {
//     sql?: string;
//     params?: any[];
//     init?: boolean;
// };

// // Initialize the database
// export async function initDatabase(env: Env): Promise<ApiResponse> {
//     try {
//         if (!env.WALLET_D1_DB) {
//             throw new Error("Database binding not found");
//         }
//         await env.WALLET_D1_DB.prepare(
//             `
//       CREATE TABLE IF NOT EXISTS transactions (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         amount DECIMAL(10, 2) NOT NULL,
//         description TEXT,
//         type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
//         category TEXT,
//         date TEXT DEFAULT CURRENT_TIMESTAMP
//       )
//     `
//         ).run();
//         return { data: "Database initialized" };
//     } catch (error) {
//         console.error("db.ts Database initialization failed:", error);
//         throw error;
//     }
// }

// // Execute a database query
// export async function queryDatabase<T = any>(
//     sql: string,
//     params: any[] = [],
//     env: Env
// ): Promise<D1Result<T>> {
//     try {
//         if (!env.WALLET_D1_DB) {
//             throw new Error("Database binding not found");
//         }
//         const stmt = env.WALLET_D1_DB.prepare(sql);
//         const result = await stmt.bind(...params).all<T>();
//         return result;
//     } catch (error) {
//         console.error("db.ts Database query failed:", error);
//         throw error;
//     }
// }
