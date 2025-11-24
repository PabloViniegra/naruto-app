import type {
    EntityWithCharacters,
    EntityMember,
    EntitySize,
    PaginatedResponse,
} from "@/types/shared";

export { getEntitySize } from "@/types/shared";

/**
 * Village entity with associated character IDs.
 */
export interface Village extends EntityWithCharacters {}

/**
 * Paginated response for villages.
 */
export type VillagesResponse = PaginatedResponse<Village, "villages">;

/**
 * Village member with optional image.
 */
export interface VillageMember extends EntityMember {}

/**
 * Village with fully loaded member data.
 */
export interface VillageWithMembers extends Village {
    members: VillageMember[];
}

/**
 * Size classification for villages based on member count.
 */
export type VillageSize = EntitySize;

/**
 * Get the size classification for a village based on member count.
 * @param memberCount - The number of members in the village.
 * @returns The size classification.
 */
export function getVillageSize(memberCount: number): VillageSize {
    if (memberCount >= 10) return "large";
    if (memberCount >= 5) return "medium";
    return "small";
}
