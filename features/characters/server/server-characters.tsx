import { Suspense } from "react";
import { fetchData } from "@/lib/api";
import { CharactersList } from "@/features/characters/client/characters-list";
import {
  CharactersSkeleton,
  CharactersPagination,
} from "@/features/characters/components";
import { filterCharacters } from "@/features/characters/utils";
import type { CharactersResponse } from "@/types";

interface ServerCharactersProps {
  searchQuery?: string;
  page?: number;
}

async function CharactersContent({
  searchQuery,
  page = 1,
}: {
  searchQuery?: string;
  page?: number;
}) {
  const response = await fetchData<CharactersResponse>(
    `/characters?page=${page}`
  );
  const { characters, total, pageSize } = response;
  const totalPages = Math.ceil(total / pageSize);

  const filteredCharacters = searchQuery
    ? filterCharacters(characters, searchQuery)
    : characters;

  // Hide pagination when searching (filtering is client-side on current page)
  const showPagination = !searchQuery && totalPages > 1;

  return (
    <div className="flex flex-col gap-8">
      <CharactersList characters={filteredCharacters} />
      {showPagination && (
        <CharactersPagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}

export function ServerCharacters({
  searchQuery,
  page = 1,
}: ServerCharactersProps) {
  return (
    <Suspense key={page} fallback={<CharactersSkeleton count={8} />}>
      <CharactersContent searchQuery={searchQuery} page={page} />
    </Suspense>
  );
}
