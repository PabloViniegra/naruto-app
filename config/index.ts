/**
 * Validates that required environment variables are defined.
 * Logs warnings in development mode if variables are missing.
 */
function validateEnv(): void {
    const isDev = process.env.NODE_ENV === "development";

    if (!process.env.NEXT_API_URL) {
        if (isDev) {
            console.warn(
                "[Config Warning] NEXT_API_URL is not defined. API calls may fail."
            );
        }
    }
}

// Validate environment on module load (only runs once)
validateEnv();

/**
 * Base URL for the Naruto API.
 * Should be defined in environment variables as NEXT_API_URL.
 */
export const API_BASE_URL = process.env.NEXT_API_URL;

/**
 * Maximum page number allowed for pagination.
 * Used to prevent invalid page requests.
 */
export const MAX_PAGE_NUMBER = 1000;

/**
 * Default page size for paginated requests.
 */
export const DEFAULT_PAGE_SIZE = 20;
