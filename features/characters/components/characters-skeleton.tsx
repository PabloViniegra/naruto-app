import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CharacterCardSkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

function CharacterCardSkeleton({ className, style }: CharacterCardSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden animate-in fade-in duration-500", className)} style={style}>
      {/* Image skeleton */}
      <Skeleton className="aspect-[3/4] w-full rounded-none" />
      <CardHeader className="pb-2">
        {/* Title skeleton */}
        <Skeleton className="h-5 w-3/4" />
        {/* Description skeleton */}
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Stats rows */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-12" />
        </div>
        {/* Nature type badges skeleton */}
        <div className="flex flex-wrap gap-1 pt-2">
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-5 w-12 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

interface CharactersSkeletonProps {
  count?: number;
  className?: string;
}

export function CharactersSkeleton({
  count = 8,
  className,
}: CharactersSkeletonProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <CharacterCardSkeleton
          key={index}
          style={{ animationDelay: `${index * 75}ms` }}
        />
      ))}
    </div>
  );
}

export { CharacterCardSkeleton };
