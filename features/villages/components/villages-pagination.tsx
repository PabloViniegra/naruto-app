"use client";

import { EntityPagination } from "@/components/shared";

interface VillagesPaginationProps {
    currentPage: number;
    totalPages: number;
}

export function VillagesPagination({
    currentPage,
    totalPages,
}: VillagesPaginationProps) {
    return (
        <EntityPagination
            currentPage={currentPage}
            totalPages={totalPages}
            ariaLabel="Villages pagination"
        />
    );
}
