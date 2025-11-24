import { Suspense } from "react";
import {
  VillagesBentoGrid,
  VillagesSkeleton,
  VillagesPagination,
} from "@/features/villages/components";
import { fetchVillagesWithMembers } from "@/features/villages/utils";

interface ServerVillagesProps {
  page?: number;
}

async function VillagesContent({ page = 1 }: { page?: number }) {
  const { villages, totalPages, currentPage } = await fetchVillagesWithMembers(page);

  const showPagination = totalPages > 1;

  return (
    <div className="flex flex-col gap-8">
      <VillagesBentoGrid villages={villages} />
      {showPagination && (
        <VillagesPagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}

export function ServerVillages({ page = 1 }: ServerVillagesProps) {
  return (
    <Suspense key={page} fallback={<VillagesSkeleton count={12} />}>
      <VillagesContent page={page} />
    </Suspense>
  );
}
