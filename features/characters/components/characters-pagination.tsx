"use client";

import { EntityPagination } from "@/components/shared";

interface CharactersPaginationProps {
    currentPage: number;
    totalPages: number;
}

export function CharactersPagination({
    currentPage,
    totalPages,
}: CharactersPaginationProps) {
    return (
        <EntityPagination
            currentPage={currentPage}
            totalPages={totalPages}
            ariaLabel="Characters pagination"
        />
    );
}
