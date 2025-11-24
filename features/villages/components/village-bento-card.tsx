import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VillageWithMembers, VillageSize } from "../types";
import { getVillageSize } from "../types";

interface VillageBentoCardProps {
  village: VillageWithMembers;
  index: number;
  className?: string;
}

const gradients = [
  "from-orange-500/20 to-red-500/20",
  "from-blue-500/20 to-cyan-500/20",
  "from-purple-500/20 to-pink-500/20",
  "from-green-500/20 to-emerald-500/20",
  "from-yellow-500/20 to-amber-500/20",
  "from-indigo-500/20 to-violet-500/20",
  "from-rose-500/20 to-fuchsia-500/20",
  "from-teal-500/20 to-sky-500/20",
];

function AvatarStack({
  members,
  totalCount,
  size,
}: {
  members: VillageWithMembers["members"];
  totalCount: number;
  size: VillageSize;
}) {
  const avatarSize = size === "large" ? "h-12 w-12" : "h-10 w-10";
  const textSize = size === "large" ? "text-sm" : "text-xs";

  return (
    <div className="flex -space-x-3">
      {members.slice(0, 4).map((member, i) => (
        <Link
          key={member.id}
          href={`/characters/${member.id}`}
          className={cn(
            "relative rounded-full border-2 border-background overflow-hidden transition-transform duration-300 hover:scale-110 hover:z-10",
            avatarSize
          )}
          style={{ zIndex: 4 - i }}
          title={member.name}
        >
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <div
              className={cn(
                "h-full w-full bg-muted flex items-center justify-center font-bold text-muted-foreground",
                textSize
              )}
            >
              {member.name.charAt(0).toUpperCase()}
            </div>
          )}
        </Link>
      ))}
      {totalCount > 4 && (
        <div
          className={cn(
            "relative rounded-full border-2 border-background bg-muted flex items-center justify-center font-bold text-muted-foreground",
            avatarSize,
            textSize
          )}
          style={{ zIndex: 0 }}
        >
          +{totalCount - 4}
        </div>
      )}
    </div>
  );
}

export function VillageBentoCard({ village, index, className }: VillageBentoCardProps) {
  const size = getVillageSize(village.characters.length);
  const gradientIndex = index % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card",
        "transition-all duration-300 ease-out",
        "hover:border-border hover:shadow-lg",
        className
      )}
    >
      {/* Gradient background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          gradient
        )}
      />

      {/* Content */}
      <div
        className={cn(
          "relative flex h-full flex-col justify-between p-4",
          size === "large" && "p-6",
          size === "medium" && "p-5"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className={cn(
              "font-sans font-bold tracking-tight",
              size === "large" && "text-2xl",
              size === "medium" && "text-xl",
              size === "small" && "text-lg"
            )}
          >
            {village.name}
          </h3>

          {/* Member count badge */}
          <div className="flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur-sm">
            <Users className="h-3 w-3" />
            <span>{village.characters.length}</span>
          </div>
        </div>

        {/* Footer with avatars */}
        <div className={cn("mt-4", size === "large" && "mt-auto")}>
          {village.members.length > 0 ? (
            <AvatarStack
              members={village.members}
              totalCount={village.characters.length}
              size={size}
            />
          ) : (
            <p className="text-sm text-muted-foreground">No members found</p>
          )}
        </div>

        {/* Large card extra content */}
        {size === "large" && (
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              One of the major villages with {village.characters.length} known residents
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
