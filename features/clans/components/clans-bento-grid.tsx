"use client";

import { cn } from "@/lib/utils";
import { AnimatedBentoItem } from "@/components/AnimatedBentoItem";
import type { ClanWithMembers } from "../types";
import { getClanSize } from "../types";
import { ClanBentoCard } from "./clan-bento-card";

interface ClansBentoGridProps {
  clans: ClanWithMembers[];
  className?: string;
}

function getSizeClasses(memberCount: number): string {
  const size = getClanSize(memberCount);
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

export function ClansBentoGrid({ clans, className }: ClansBentoGridProps) {
  if (clans.length === 0) {
    return (
      <div className="flex min-h-[30vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-xl font-medium text-muted-foreground">
          No clans found
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
      {clans.map((clan, index) => (
        <AnimatedBentoItem
          key={clan.id}
          index={index}
          className={getSizeClasses(clan.characters.length)}
        >
          <ClanBentoCard clan={clan} index={index} />
        </AnimatedBentoItem>
      ))}
    </div>
  );
}
