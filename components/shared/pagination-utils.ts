/**
 * Pagination utilities for generating visible page numbers.
 * Pure functions for easy testing.
 */

export type PageItem = number | "ellipsis";

/**
 * Calculate which pages should be visible in the pagination component.
 * This is a pure function that can be easily unit tested.
 *
 * @param currentPage - The currently active page.
 * @param totalPages - The total number of pages.
 * @returns An array of page numbers and ellipsis markers.
 */
export function getVisiblePages(
    currentPage: number,
    totalPages: number
): PageItem[] {
    if (totalPages <= 1) return [1];

    const pages: PageItem[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    // Always show first page
    pages.push(1);

    if (showEllipsisStart) {
        pages.push("ellipsis");
    }

    // Show pages around current page
    for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
    ) {
        if (!pages.includes(i)) {
            pages.push(i);
        }
    }

    if (showEllipsisEnd) {
        pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1 && !pages.includes(totalPages)) {
        pages.push(totalPages);
    }

    return pages;
}

/**
 * Check if a page item is an ellipsis marker.
 */
export function isEllipsis(item: PageItem): item is "ellipsis" {
    return item === "ellipsis";
}
