import type { PaginatedResponse } from "./shared";

export interface Character {
    id: number;
    name: string;
    images?: string[];
    debut?: Partial<Debut>;
    family?: Partial<Family>;
    jutsu?: string[];
    natureType?: string[];
    personal?: Partial<Personal>;
    rank?: Partial<Rank>;
    tools?: string[];
    voiceActors?: Partial<VoiceActors>;
}

export type Characters = Character[];

export type CharactersResponse = PaginatedResponse<Character, "characters">;

export interface Debut {
    manga: string;
    anime: string;
    novel: string;
    movie: string;
    game: string;
    ova: string;
    appearsIn: string;
}

export interface Family {
    father: string;
    mother: string;
    brother: string;
    daughter: string;
    wife: string;
    son: string;
    sister: string;
    husband: string;
    adoptiveSon: string;
    adoptiveFather: string;
    adoptiveMother: string;
    godfather: string;
    grandfather: string;
    grandmother: string;
    grandchildren: string;
    uncle: string;
    nephew: string;
    cousin: string;
    clone: string;
    depoweredForm: string;
}

export interface Personal {
    birthdate: string;
    sex: string;
    age: Partial<Age>;
    height: Partial<Height>;
    weight: Partial<Weight>;
    bloodType: string;
    kekkeiGenkai: string[];
    classification: string | string[];
    occupation: string | string[];
    affiliation: string[];
    team: string[];
    clan: string;
    titles: string[];
    status: string;
    species: string;
}

export interface Age {
    "Part I": string;
    "Part II": string;
    "Academy Graduate": string;
    "Chunin Promotion": string;
    "Boruto Movie": string;
    "Blank Period": string;
}

export interface Height {
    "Part I": string;
    "Part II": string;
    "Blank Period": string;
    "New Era": string;
}

export interface Weight {
    "Part I": string;
    "Part II": string;
}

export interface Rank {
    ninjaRank: Partial<NinjaRank>;
    ninjaRegistration: string;
}

export interface NinjaRank {
    "Part I": string;
    "Part II": string;
    "Gaiden": string;
}

export interface VoiceActors {
    japanese: string | string[];
    english: string | string[];
}

// Re-export shared types
export type {
    DeepPartial,
    BaseEntity,
    EntityWithCharacters,
    EntityMember,
    EntitySize,
    PaginatedResponse,
    PaginationMeta,
} from "./shared";

export { getEntitySize, extractPaginationMeta } from "./shared";

// Clan types - re-exported from features/clans for convenience
export type {
    Clan,
    ClansResponse,
    ClanMember,
    ClanWithMembers,
    ClanSize,
} from "@/features/clans/types";
