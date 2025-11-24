import { Suspense } from "react";
import {
  ClansBentoGrid,
  ClansSkeleton,
  ClansPagination,
} from "@/features/clans/components";
import { fetchClansWithMembers } from "@/features/clans/utils";

interface ServerClansProps {
  page?: number;
}

async function ClansContent({ page = 1 }: { page?: number }) {
  const { clans, totalPages, currentPage } = await fetchClansWithMembers(page);

  const showPagination = totalPages > 1;

  return (
    <div className="flex flex-col gap-8">
      <ClansBentoGrid clans={clans} />
      {showPagination && (
        <ClansPagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}

export function ServerClans({ page = 1 }: ServerClansProps) {
  return (
    <Suspense key={page} fallback={<ClansSkeleton count={12} />}>
      <ClansContent page={page} />
    </Suspense>
  );
}
