import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Character } from "@/types";
import { CharacterImage } from "./character-image";

interface CharacterCardProps {
  character: Character;
  className?: string;
  style?: React.CSSProperties;
}

export function CharacterCard({ character, className, style }: CharacterCardProps) {
  const imageUrl = character.images?.[0] ?? "";
  const clan = character.personal?.clan ?? "Unknown Clan";
  const affiliation = character.personal?.affiliation?.[0] ?? "Unknown Village";
  const jutsuCount = character.jutsu?.length ?? 0;

  return (
    <Link href={`/characters/${character.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl">
      <Card
        className={cn(
          "group overflow-hidden transition-all duration-300 ease-out hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 cursor-pointer h-full",
          className
        )}
        style={style}
      >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        <CharacterImage
          src={imageUrl}
          alt={character.name}
          className="absolute inset-0"
        />
      </div>
      <CardHeader className="pb-2 px-3 pt-3 sm:px-6 sm:pt-6">
        <CardTitle className="truncate text-base sm:text-lg leading-tight">{character.name}</CardTitle>
        <CardDescription className="truncate text-xs sm:text-sm">{clan}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-xs sm:text-sm px-3 pb-3 sm:px-6 sm:pb-6">
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground shrink-0">Village</span>
          <span className="truncate text-right">{affiliation}</span>
        </div>
        {jutsuCount > 0 && (
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground shrink-0">Jutsu</span>
            <span className="shrink-0">{jutsuCount} techniques</span>
          </div>
        )}
        {character.personal?.sex && (
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground shrink-0">Sex</span>
            <span>{character.personal.sex}</span>
          </div>
        )}
        {character.natureType && character.natureType.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {character.natureType.slice(0, 3).map((nature) => (
              <span
                key={nature}
                className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground min-h-[28px]"
              >
                {nature}
              </span>
            ))}
            {character.natureType.length > 3 && (
              <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground min-h-[28px]">
                +{character.natureType.length - 3}
              </span>
            )}
          </div>
        )}
      </CardContent>
      </Card>
    </Link>
  );
}
