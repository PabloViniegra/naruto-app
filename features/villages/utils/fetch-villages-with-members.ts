import { fetchData } from "@/lib/api";
import type { Character } from "@/types";
import type { Village, VillagesResponse, VillageMember, VillageWithMembers } from "../types";

const MAX_MEMBERS_TO_FETCH = 4;
const CACHE_REVALIDATE = 60;

interface FetchVillagesWithMembersResult {
  villages: VillageWithMembers[];
  currentPage: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

async function fetchCharacterImage(characterId: number): Promise<VillageMember | null> {
  try {
    const character = await fetchData<Character>(`/characters/${characterId}`, {
      revalidate: CACHE_REVALIDATE,
      tags: [`character-${characterId}`],
    });

    return {
      id: character.id,
      name: character.name,
      image: character.images?.[0] ?? null,
    };
  } catch {
    return null;
  }
}

async function fetchVillageMembers(village: Village): Promise<VillageMember[]> {
  const characterIds = village.characters.slice(0, MAX_MEMBERS_TO_FETCH);

  const results = await Promise.allSettled(
    characterIds.map((id) => fetchCharacterImage(id))
  );

  const members: VillageMember[] = [];

  for (const result of results) {
    if (result.status === "fulfilled" && result.value !== null) {
      members.push(result.value);
    }
  }

  return members;
}

export async function fetchVillagesWithMembers(
  page: number = 1
): Promise<FetchVillagesWithMembersResult> {
  const response = await fetchData<VillagesResponse>(`/villages?page=${page}`, {
    revalidate: CACHE_REVALIDATE,
    tags: ["villages", `villages-page-${page}`],
  });

  const { villages, currentPage, pageSize, total } = response;
  const totalPages = Math.ceil(total / pageSize);

  // Fetch all village members in parallel
  const villagesWithMembersPromises = villages.map(async (village): Promise<VillageWithMembers> => {
    const members = await fetchVillageMembers(village);
    return {
      ...village,
      members,
    };
  });

  const villagesWithMembers = await Promise.all(villagesWithMembersPromises);

  return {
    villages: villagesWithMembers,
    currentPage,
    pageSize,
    total,
    totalPages,
  };
}
