"use client";

import { EntityPagination } from "@/components/shared";

interface ClansPaginationProps {
    currentPage: number;
    totalPages: number;
}

export function ClansPagination({
    currentPage,
    totalPages,
}: ClansPaginationProps) {
    return (
        <EntityPagination
            currentPage={currentPage}
            totalPages={totalPages}
            ariaLabel="Clans pagination"
        />
    );
}
