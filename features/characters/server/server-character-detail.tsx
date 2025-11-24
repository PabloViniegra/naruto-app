import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchData, ApiError } from "@/lib/api";
import { CharacterDetail } from "@/features/characters/components/character-detail";
import { CharacterDetailSkeleton } from "@/features/characters/components/character-detail-skeleton";
import type { Character } from "@/types";

interface ServerCharacterDetailProps {
    id: string;
}

async function getCharacter(id: string): Promise<Character> {
    try {
        const character = await fetchData<Character>(`/characters/${id}`, {
            revalidate: 3600,
            tags: [`character-${id}`],
        });

        if (!character) {
            notFound();
        }

        return character;
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            notFound();
        }
        throw error;
    }
}

async function CharacterDetailContent({ id }: { id: string }) {
    const character = await getCharacter(id);
    return <CharacterDetail character={character} />;
}

export function ServerCharacterDetail({ id }: ServerCharacterDetailProps) {
    return (
        <Suspense fallback={<CharacterDetailSkeleton />}>
            <CharacterDetailContent id={id} />
        </Suspense>
    );
}
