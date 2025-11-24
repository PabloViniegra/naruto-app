import { MainContainer } from "@/core";
import { CharactersSkeleton } from "@/features/characters";

export default function CharactersLoading() {
  return (
    <MainContainer>
      <div className="flex flex-col gap-8 py-8">
        <div className="flex flex-col gap-2">
          <div className="h-9 w-48 animate-pulse rounded bg-muted" />
          <div className="h-5 w-80 animate-pulse rounded bg-muted" />
        </div>

        <CharactersSkeleton count={8} />
      </div>
    </MainContainer>
  );
}
