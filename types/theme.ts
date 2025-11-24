/**
 * Theme-related types and utilities.
 */

/**
 * Available theme options.
 */
export const THEMES = ["light", "dark", "system"] as const;

/**
 * Valid theme type.
 */
export type Theme = (typeof THEMES)[number];

/**
 * Type guard to check if a value is a valid theme.
 * @param value - The value to check.
 * @returns True if the value is a valid theme.
 */
export function isValidTheme(value: unknown): value is Theme {
    return (
        typeof value === "string" &&
        THEMES.includes(value as Theme)
    );
}

/**
 * Get a valid theme from an unknown value, with a fallback.
 * @param value - The value to validate.
 * @param fallback - The fallback theme if validation fails.
 * @returns A valid theme.
 */
export function getTheme(value: unknown, fallback: Theme = "system"): Theme {
    return isValidTheme(value) ? value : fallback;
}
