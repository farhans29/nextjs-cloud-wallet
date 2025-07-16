// src/lib/db/db.sqlite.ts
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database | null = null;

export async function getDb() {
    if (!db) {
        db = await open({
            filename: "./cloud-wallet.db",
            driver: sqlite3.Database,
        });
        // Ensure the table exists
        await db.exec(`
        CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount DECIMAL(10, 2) NOT NULL,
        description TEXT,
        type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
        category TEXT,
        date TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
    }
    return db;
}

export async function querySqlite(sql: string, params: any[] = []) {
    const db = await getDb();
    if (/^select/i.test(sql.trim())) {
        return db.all(sql, params);
    } else {
        return db.run(sql, params);
    }
}
