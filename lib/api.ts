import { API_BASE_URL } from "@/config";
import type { ZodSchema, ZodError } from "zod";

/**
 * Custom error class for API-related errors.
 * Provides static helper methods for common error checks.
 */
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public statusText: string
    ) {
        super(message);
        this.name = "ApiError";
    }

    /**
     * Type guard to check if an error is an ApiError.
     */
    static isApiError(error: unknown): error is ApiError {
        return error instanceof ApiError;
    }

    /**
     * Check if the error is a 404 Not Found error.
     */
    static is404(error: unknown): boolean {
        return ApiError.isApiError(error) && error.status === 404;
    }

    /**
     * Check if the error is a server error (5xx).
     */
    static isServerError(error: unknown): boolean {
        return ApiError.isApiError(error) && error.status >= 500;
    }

    /**
     * Check if the error is a client error (4xx).
     */
    static isClientError(error: unknown): boolean {
        return (
            ApiError.isApiError(error) &&
            error.status >= 400 &&
            error.status < 500
        );
    }
}

/**
 * Custom error class for Zod validation errors.
 */
export class ValidationError extends Error {
    constructor(
        message: string,
        public zodError: ZodError
    ) {
        super(message);
        this.name = "ValidationError";
    }

    /**
     * Type guard to check if an error is a ValidationError.
     */
    static isValidationError(error: unknown): error is ValidationError {
        return error instanceof ValidationError;
    }
}

interface FetchOptions<T> {
    revalidate?: number;
    tags?: string[];
    /**
     * Optional Zod schema to validate the response.
     * If provided, the response will be parsed and validated against this schema.
     */
    schema?: ZodSchema<T>;
}

/**
 * Generic fetch function with optional Zod validation.
 *
 * @typeParam T - The expected return type.
 * @param url - The API endpoint to fetch from.
 * @param options - Fetch options including revalidation, tags, and optional Zod schema.
 * @returns The fetched and optionally validated data.
 * @throws {ApiError} When the HTTP response is not ok.
 * @throws {ValidationError} When Zod validation fails.
 */
export async function fetchData<T>(
    url: string,
    options: FetchOptions<T> = {}
): Promise<T> {
    const { revalidate = 60, tags, schema } = options;

    // Remove trailing slash from base URL and leading slash from url to avoid double slashes
    const baseUrl = API_BASE_URL?.replace(/\/$/, "") || "";
    const endpoint = url.startsWith("/") ? url : `/${url}`;

    const response = await fetch(`${baseUrl}${endpoint}`, {
        next: {
            revalidate,
            tags,
        },
    });

    if (!response.ok) {
        throw new ApiError(
            `Failed to fetch ${endpoint}`,
            response.status,
            response.statusText
        );
    }

    const data = await response.json();

    // If a schema is provided, validate the data
    if (schema) {
        const result = schema.safeParse(data);
        if (!result.success) {
            throw new ValidationError(
                `Validation failed for ${endpoint}: ${result.error.message}`,
                result.error
            );
        }
        return result.data;
    }

    return data as T;
}
