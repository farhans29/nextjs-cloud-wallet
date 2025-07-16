import { NextResponse } from "next/server";
import { querySqlite } from "@/lib/db/db.sqlite"; // Use the correct import path for your project

export async function GET() {
    const start = Date.now();

    // DB health check
    let dbConnected = false;
    let dbError: string | null = null;
    try {
        await querySqlite("SELECT 1");
        dbConnected = true;
    } catch (err: any) {
        dbConnected = false;
        dbError = err?.message || "Unknown error";
    }

    const end = Date.now();

    return NextResponse.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        responseTimeMs: end - start,
        db: {
            connected: dbConnected,
            error: dbError,
        },
        message: "API is running",
    });
}
