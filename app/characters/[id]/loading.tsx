import { MainContainer } from "@/core";
import { CharacterDetailSkeleton } from "@/features/characters";

export default function CharacterDetailLoading() {
  return (
    <MainContainer>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <CharacterDetailSkeleton />
      </div>
    </MainContainer>
  );
}
