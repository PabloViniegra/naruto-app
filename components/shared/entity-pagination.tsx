"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { getVisiblePages, isEllipsis } from "./pagination-utils";

interface EntityPaginationProps {
    currentPage: number;
    totalPages: number;
    /**
     * Optional aria-label for the navigation element.
     * Defaults to "pagination".
     */
    ariaLabel?: string;
}

export function EntityPagination({
    currentPage,
    totalPages,
    ariaLabel = "pagination",
}: EntityPaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createPageUrl = useCallback(
        (page: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", page.toString());
            return `?${params.toString()}`;
        },
        [searchParams]
    );

    const handlePageChange = useCallback(
        (page: number) => {
            router.push(createPageUrl(page));
        },
        [router, createPageUrl]
    );

    const handleKeyDown = useCallback(
        (page: number) => (event: React.KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handlePageChange(page);
            }
        },
        [handlePageChange]
    );

    if (totalPages <= 1) return null;

    const visiblePages = getVisiblePages(currentPage, totalPages);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <Pagination aria-label={ariaLabel}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() =>
                            handlePageChange(Math.max(1, currentPage - 1))
                        }
                        onKeyDown={handleKeyDown(Math.max(1, currentPage - 1))}
                        tabIndex={isFirstPage ? -1 : 0}
                        aria-disabled={isFirstPage}
                        className={
                            isFirstPage ? "pointer-events-none opacity-50" : ""
                        }
                    />
                </PaginationItem>

                {visiblePages.map((page, index) =>
                    isEllipsis(page) ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => handlePageChange(page)}
                                onKeyDown={handleKeyDown(page)}
                                tabIndex={0}
                                isActive={currentPage === page}
                                aria-label={`Go to page ${page}`}
                                aria-current={
                                    currentPage === page ? "page" : undefined
                                }
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() =>
                            handlePageChange(
                                Math.min(totalPages, currentPage + 1)
                            )
                        }
                        onKeyDown={handleKeyDown(
                            Math.min(totalPages, currentPage + 1)
                        )}
                        tabIndex={isLastPage ? -1 : 0}
                        aria-disabled={isLastPage}
                        className={
                            isLastPage ? "pointer-events-none opacity-50" : ""
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
