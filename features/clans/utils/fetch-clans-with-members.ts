import { fetchData } from "@/lib/api";
import type { Character } from "@/types";
import type { Clan, ClansResponse, ClanMember, ClanWithMembers } from "../types";

const MAX_MEMBERS_TO_FETCH = 4;
const CACHE_REVALIDATE = 60;

interface FetchClansWithMembersResult {
  clans: ClanWithMembers[];
  currentPage: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

async function fetchCharacterImage(characterId: number): Promise<ClanMember | null> {
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

async function fetchClanMembers(clan: Clan): Promise<ClanMember[]> {
  const characterIds = clan.characters.slice(0, MAX_MEMBERS_TO_FETCH);

  const results = await Promise.allSettled(
    characterIds.map((id) => fetchCharacterImage(id))
  );

  const members: ClanMember[] = [];

  for (const result of results) {
    if (result.status === "fulfilled" && result.value !== null) {
      members.push(result.value);
    }
  }

  return members;
}

export async function fetchClansWithMembers(
  page: number = 1
): Promise<FetchClansWithMembersResult> {
  const response = await fetchData<ClansResponse>(`/clans?page=${page}`, {
    revalidate: CACHE_REVALIDATE,
    tags: ["clans", `clans-page-${page}`],
  });

  const { clans, currentPage, pageSize, total } = response;
  const totalPages = Math.ceil(total / pageSize);

  // Fetch all clan members in parallel
  const clansWithMembersPromises = clans.map(async (clan): Promise<ClanWithMembers> => {
    const members = await fetchClanMembers(clan);
    return {
      ...clan,
      members,
    };
  });

  const clansWithMembers = await Promise.all(clansWithMembersPromises);

  return {
    clans: clansWithMembers,
    currentPage,
    pageSize,
    total,
    totalPages,
  };
}
