import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge class names using clsx and tailwind-merge.
 * @param inputs - Class values to merge.
 * @returns Merged class string.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Converts a value to an array.
 * Handles null, undefined, and arrays.
 *
 * @overload
 * @param value - A value of type T, an array of T, null, or undefined.
 * @returns An array of T (empty array for null/undefined).
 */
export function toArray<T>(value: T | T[] | null | undefined): T[];

/**
 * Converts a value to an array.
 * Handles null, undefined, and arrays.
 *
 * @param value - A value, an array, null, or undefined.
 * @returns An array (empty array for null/undefined).
 */
export function toArray<T>(value: T | T[] | null | undefined): T[] {
    if (value === null || value === undefined) return [];
    return Array.isArray(value) ? value : [value];
}
