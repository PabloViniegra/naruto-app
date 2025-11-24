/**
 * Shared Next.js page props types.
 */

/**
 * Props for pages with search parameters.
 * @typeParam T - The shape of the search parameters object.
 */
export interface PageWithSearchParams<T extends Record<string, string | undefined>> {
    searchParams: Promise<T>;
}

/**
 * Props for pages with URL parameters.
 * @typeParam T - The shape of the URL parameters object.
 */
export interface PageWithParams<T extends Record<string, string>> {
    params: Promise<T>;
}

/**
 * Props for pages with both URL and search parameters.
 * @typeParam P - The shape of the URL parameters object.
 * @typeParam S - The shape of the search parameters object.
 */
export interface PageWithParamsAndSearchParams<
    P extends Record<string, string>,
    S extends Record<string, string | undefined>,
> {
    params: Promise<P>;
    searchParams: Promise<S>;
}

/**
 * Common search params for paginated pages.
 */
export interface PaginatedSearchParams {
    page?: string;
}

/**
 * Common search params for searchable and paginated pages.
 */
export interface SearchablePageParams extends PaginatedSearchParams {
    q?: string;
}

/**
 * Common params for pages with an ID.
 */
export interface IdParams {
    id: string;
}
