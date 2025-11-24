import type {
    EntityWithCharacters,
    EntityMember,
    EntitySize,
    PaginatedResponse,
} from "@/types/shared";

export { getEntitySize } from "@/types/shared";

/**
 * Clan entity with associated character IDs.
 */
export interface Clan extends EntityWithCharacters {}

/**
 * Paginated response for clans.
 */
export type ClansResponse = PaginatedResponse<Clan, "clans">;

/**
 * Clan member with optional image.
 */
export interface ClanMember extends EntityMember {}

/**
 * Clan with fully loaded member data.
 */
export interface ClanWithMembers extends Clan {
    members: ClanMember[];
}

/**
 * Size classification for clans based on member count.
 */
export type ClanSize = EntitySize;

/**
 * Get the size classification for a clan based on member count.
 * @param memberCount - The number of members in the clan.
 * @returns The size classification.
 */
export function getClanSize(memberCount: number): ClanSize {
    if (memberCount >= 10) return "large";
    if (memberCount >= 5) return "medium";
    return "small";
}
