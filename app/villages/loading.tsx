import { MainContainer } from "@/core";
import { VillagesSkeleton } from "@/features/villages";

export default function VillagesLoading() {
  return (
    <MainContainer>
      <div className="flex flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <div className="h-10 w-48 animate-pulse rounded bg-muted" />
          <div className="h-5 w-96 max-w-full animate-pulse rounded bg-muted" />
        </div>

        <VillagesSkeleton count={12} />
      </div>
    </MainContainer>
  );
}
