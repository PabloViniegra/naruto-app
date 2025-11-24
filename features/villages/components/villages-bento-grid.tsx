"use client";

import { cn } from "@/lib/utils";
import { AnimatedBentoItem } from "@/components/AnimatedBentoItem";
import type { VillageWithMembers } from "../types";
import { getVillageSize } from "../types";
import { VillageBentoCard } from "./village-bento-card";

interface VillagesBentoGridProps {
  villages: VillageWithMembers[];
  className?: string;
}

function getSizeClasses(memberCount: number): string {
  const size = getVillageSize(memberCount);
  switch (size) {
    case "large":
      return "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2";
    case "medium":
      return "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1";
    case "small":
    default:
      return "col-span-1 row-span-1";
  }
}

export function VillagesBentoGrid({ villages, className }: VillagesBentoGridProps) {
  if (villages.length === 0) {
    return (
      <div className="flex min-h-[30vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-xl font-medium text-muted-foreground">
          No villages found
        </p>
        <p className="text-sm text-muted-foreground">
          Try checking back later or adjusting your search
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(180px,1fr)] gap-4",
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-4",
        className
      )}
    >
      {villages.map((village, index) => (
        <AnimatedBentoItem
          key={village.id}
          index={index}
          className={getSizeClasses(village.characters.length)}
        >
          <VillageBentoCard village={village} index={index} />
        </AnimatedBentoItem>
      ))}
    </div>
  );
}
