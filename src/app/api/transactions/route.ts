import { NextResponse } from "next/server";
import { queryDatabase } from "@/lib/db/db";
import { querySqlite } from "@/lib/db/db.sqlite";

function isLocal() {
    return process.env.NODE_ENV === "development";
}

// Error types
type ApiError = {
    error?: string;
    details?: string;
    status?: number;
};

// Error type for validation errors
type ValidationError = {
    error?: string;
    field?: string;
    status?: number;
    details?: string;
};

// Type for transaction request body
type TransactionRequestBody = {
    amount?: number;
    description?: string;
    type?: string;
    category?: string;
};

// Helper functions for consistent error responses
function validationError(field: string, message: string): ApiError {
    return {
        error: "Validation failed",
        details: `${field}: ${message}`,
        status: 400,
    };
}

// Helper function for not found errors
function notFoundError(message: string): ApiError {
    return {
        error: "Not found",
        details: message,
        status: 404,
    };
}

// Helper function for general error handling
function handleError(error: any): ApiError {
    console.error("API Error:", error);

    if (error instanceof Error) {
        if (error.message.includes("no such table")) {
            return {
                error: "Database error",
                details:
                    "Database table not found. Please initialize the database first.",
                status: 500,
            };
        }
        if (error.message.includes("constraint failed")) {
            return {
                error: "Constraint violation",
                details: error.message,
                status: 400,
            };
        }
    }

    return {
        error: "Database operation failed",
        details: error instanceof Error ? error.message : String(error),
        status: 500,
    };
}

// Helper function for sending error responses
function sendErrorResponse(error: ApiError | ValidationError) {
    return NextResponse.json(
        {
            error: error.error,
            details: error.details,
        },
        { status: error.status }
    );
}

// Helper function to get the database handler based on environment
async function getDbHandler(isLocal: boolean, request?: Request) {
    if (isLocal) {
        return querySqlite;
    } else {
        // @ts-ignore
        const env = (request as any)?.env || process.env;
        if (!env.WALLET_D1_DB) {
            throw new Error("Database binding not found");
        }
        return (sql: string, params: any[] = []) =>
            queryDatabase(sql, params, env);
    }
}

// GET handler for fetching all transactions
// Response:
// {
//     "results": [
//         {
//             "id": 1,
//             "amount": 100,
//             "description": "Test transaction",
//             "type": "expense",
//             "category": "Food"
//         }
//     ],
//     "success": true
// }
// @ts-ignore
export async function GET(request: Request) {
    try {
        const queryHandler = await getDbHandler(isLocal());
        const rows = await queryHandler("SELECT * FROM transactions");
        return NextResponse.json({ results: rows, success: true });
    } catch (error) {
        return sendErrorResponse(handleError(error));
    }
}

// POST handler for creating a new transaction
// Request Body:
// {
//     "amount": 100,
//     "description": "Test transaction",
//     "type": "expense",
//     "category": "Food"
// }
// @ts-ignore
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount, description, type, category } =
            body as TransactionRequestBody;

        // Validate required fields
        if (amount === undefined || typeof amount !== "number") {
            return sendErrorResponse(
                validationError(
                    "amount",
                    "Amount is required and must be a number"
                )
            );
        }
        if (!description || typeof description !== "string") {
            return sendErrorResponse(
                validationError(
                    "description",
                    "Description is required and must be a string"
                )
            );
        }
        if (!type || !["income", "expense"].includes(type)) {
            return sendErrorResponse(
                validationError(
                    "type",
                    "Type must be either 'income' or 'expense'"
                )
            );
        }

        const queryHandler = await getDbHandler(isLocal(), request);
        await queryHandler(
            "INSERT INTO transactions (amount, description, type, category) VALUES (?, ?, ?, ?)",
            [amount, description, type, category || null]
        );

        // Return the newly created transaction
        const rows = await queryHandler(
            "SELECT * FROM transactions ORDER BY id DESC LIMIT 1"
        );
        if (!rows) {
            throw new Error("Failed to create transaction");
        }
        return NextResponse.json({ results: rows, success: true });
    } catch (error) {
        return sendErrorResponse(handleError(error));
    }
}

// PATCH handler for updating an existing transaction
// Request Body:
// {
//     "amount": 100,
//     "description": "Test transaction",
//     "type": "expense",
//     "category": "Food"
// }
// @ts-ignore
export async function PATCH(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return sendErrorResponse(
                validationError("id", "Transaction ID is required")
            );
        }

        const body = await request.json();
        const { amount, description, type, category } =
            body as TransactionRequestBody;

        // Validate at least one field is being updated
        const updateFields = { amount, description, type, category };
        const updateCount = Object.values(updateFields).filter(Boolean).length;
        if (updateCount === 0) {
            return sendErrorResponse(
                validationError(
                    "fields",
                    "At least one field must be provided for update"
                )
            );
        }

        // Validate transaction type if provided
        if (type && !["income", "expense"].includes(type)) {
            return sendErrorResponse(
                validationError(
                    "type",
                    "Type must be either 'income' or 'expense'"
                )
            );
        }

        const queryHandler = await getDbHandler(isLocal(), request);

        // Check if transaction exists before updating
        const existing = await queryHandler(
            "SELECT id FROM transactions WHERE id = ?",
            [id]
        );
        if (!existing) {
            return sendErrorResponse(
                notFoundError(`Transaction with ID ${id} not found`)
            );
        }

        // Build update query based on provided fields
        const updates = [];
        const params = [];
        if (amount !== undefined)
            updates.push("amount = ?"), params.push(amount);
        if (description !== undefined)
            updates.push("description = ?"), params.push(description);
        if (type !== undefined) updates.push("type = ?"), params.push(type);
        if (category !== undefined)
            updates.push("category = ?"), params.push(category);
        params.push(id);

        await queryHandler(
            `UPDATE transactions SET ${updates.join(", ")} WHERE id = ?`,
            params
        );

        // Return the updated transaction
        const rows = await queryHandler(
            "SELECT * FROM transactions WHERE id = ?",
            [id]
        );
        return NextResponse.json({ results: rows, success: true });
    } catch (error) {
        return sendErrorResponse(handleError(error));
    }
}

// DELETE handler for deleting a transaction
// @ts-ignore
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return sendErrorResponse(
                validationError("id", "Transaction ID is required")
            );
        }

        const queryHandler = await getDbHandler(isLocal());

        // Check if transaction exists before deleting
        const existing = await queryHandler(
            "SELECT id FROM transactions WHERE id = ?",
            [id]
        );
        if (!existing) {
            return sendErrorResponse(
                notFoundError(`Transaction with ID ${id} not found`)
            );
        }

        await queryHandler("DELETE FROM transactions WHERE id = ?", [id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        return sendErrorResponse(handleError(error));
    }
}
