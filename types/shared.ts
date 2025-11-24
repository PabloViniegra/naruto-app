/**
 * Shared utility types and interfaces for the application.
 */

/**
 * Makes all properties of T recursively optional.
 */
export type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

/**
 * Base entity interface with common id and name properties.
 */
export interface BaseEntity {
    id: number;
    name: string;
}

/**
 * Entity that has associated character IDs.
 */
export interface EntityWithCharacters extends BaseEntity {
    characters: number[];
}

/**
 * Entity member with optional image.
 */
export interface EntityMember extends BaseEntity {
    image: string | null;
}

/**
 * Size classification for entities based on member count.
 */
export type EntitySize = "small" | "medium" | "large";

/**
 * Get the size classification for an entity based on member count.
 * @param memberCount - The number of members in the entity.
 * @returns The size classification.
 */
export function getEntitySize(memberCount: number): EntitySize {
    if (memberCount >= 10) return "large";
    if (memberCount >= 5) return "medium";
    return "small";
}

/**
 * Generic paginated response type.
 * @typeParam T - The type of items in the response.
 * @typeParam K - The key name for the items array (e.g., "characters", "clans").
 */
export type PaginatedResponse<T, K extends string> = {
    [key in K]: T[];
} & {
    currentPage: number;
    pageSize: number;
    total: number;
};

/**
 * Pagination metadata extracted from a paginated response.
 */
export interface PaginationMeta {
    currentPage: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

/**
 * Extract pagination metadata from any paginated response.
 */
export function extractPaginationMeta(response: {
    currentPage: number;
    pageSize: number;
    total: number;
}): PaginationMeta {
    return {
        currentPage: response.currentPage,
        pageSize: response.pageSize,
        total: response.total,
        totalPages: Math.ceil(response.total / response.pageSize),
    };
}
