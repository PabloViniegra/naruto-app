import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ClanCardSkeletonProps {
  size?: "small" | "medium" | "large";
  className?: string;
  style?: React.CSSProperties;
}

function ClanCardSkeleton({
  size = "small",
  className,
  style,
}: ClanCardSkeletonProps) {
  const sizeClasses = {
    large: "col-span-2 row-span-2",
    medium: "col-span-2 row-span-1",
    small: "col-span-1 row-span-1",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/50 bg-card animate-in fade-in duration-500",
        sizeClasses[size],
        className
      )}
      style={style}
    >
      {/* Gradient background skeleton */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/30" />

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
          <Skeleton
            className={cn(
              "h-6 w-24",
              size === "large" && "h-8 w-32",
              size === "medium" && "h-7 w-28"
            )}
          />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>

        {/* Footer with avatar placeholders */}
        <div className="mt-4 flex -space-x-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className={cn(
                "rounded-full border-2 border-background",
                size === "large" ? "h-12 w-12" : "h-10 w-10"
              )}
              style={{ zIndex: 4 - i }}
            />
          ))}
          <Skeleton
            className={cn(
              "rounded-full border-2 border-background",
              size === "large" ? "h-12 w-12" : "h-10 w-10"
            )}
          />
        </div>

        {/* Large card extra content */}
        {size === "large" && (
          <div className="mt-4">
            <Skeleton className="h-4 w-48" />
          </div>
        )}
      </div>
    </div>
  );
}

interface ClansSkeletonProps {
  count?: number;
  className?: string;
}

export function ClansSkeleton({ count = 12, className }: ClansSkeletonProps) {
  // Generate a pattern of sizes for visual interest
  const sizes: ("small" | "medium" | "large")[] = [];
  for (let i = 0; i < count; i++) {
    if (i % 7 === 0) {
      sizes.push("large");
    } else if (i % 4 === 2) {
      sizes.push("medium");
    } else {
      sizes.push("small");
    }
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
      {sizes.map((size, index) => (
        <ClanCardSkeleton
          key={index}
          size={size}
          style={{ animationDelay: `${index * 50}ms` }}
        />
      ))}
    </div>
  );
}

export { ClanCardSkeleton };
