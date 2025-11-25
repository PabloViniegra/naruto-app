"use client";

import { cn } from "@/lib/utils";
import { CharacterCard } from "@/features/characters/components";
import type { Characters } from "@/types";

interface CharactersListProps {
    characters: Characters;
    className?: string;
}

export function CharactersList({
    characters,
    className,
}: CharactersListProps) {
    if (!characters || characters.length === 0) {
        return (
            <div
                className="flex flex-col items-center justify-center py-12 text-center"
                role="status"
                aria-live="polite"
            >
                <p className="text-lg text-muted-foreground">
                    No characters found
                </p>
                <p className="text-sm text-muted-foreground">
                    Try adjusting your search criteria
                </p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4",
                className
            )}
            role="region"
            aria-live="polite"
            aria-label={`Showing ${characters.length} characters`}
        >
            {characters.map((character, index) => (
                <CharacterCard
                    key={character.id}
                    character={character}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                    style={{ animationDelay: `${index * 50}ms` }}
                />
            ))}
            {/* Screen reader announcement for loaded content */}
            <span className="sr-only" role="status">
                Loaded {characters.length} character
                {characters.length !== 1 ? "s" : ""}
            </span>
        </div>
    );
}
