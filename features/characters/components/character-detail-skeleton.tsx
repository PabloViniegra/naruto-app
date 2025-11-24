import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CharacterDetailSkeletonProps {
  className?: string;
}

export function CharacterDetailSkeleton({
  className,
}: CharacterDetailSkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      {/* Back button skeleton */}
      <div className="animate-in fade-in duration-300">
        <Skeleton className="h-9 w-40" />
      </div>

      {/* Hero Header skeleton - Profile style */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="overflow-hidden">
          {/* Background gradient skeleton */}
          <Skeleton className="h-32 w-full rounded-none sm:h-40" />

          {/* Profile content skeleton */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
              {/* Image skeleton */}
              <div className="-mt-16 sm:-mt-20">
                <Skeleton className="h-32 w-32 rounded-2xl border-4 border-background sm:h-40 sm:w-40" />
              </div>

              {/* Name and info skeleton */}
              <div className="flex flex-1 flex-col gap-3 pb-2">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-9 w-64 sm:h-10" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-7 w-28 rounded-full" />
                </div>
              </div>

              {/* Quick stats skeleton */}
              <div className="flex gap-6 border-t pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Personal info card skeleton */}
        <Card
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: "100ms", animationFillMode: "both" }}
        >
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-44" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nature types skeleton */}
        <Card
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: "150ms", animationFillMode: "both" }}
        >
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Family skeleton */}
        <Card
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: "200ms", animationFillMode: "both" }}
        >
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-20" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-5 w-28" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teams skeleton */}
        <Card
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: "250ms", animationFillMode: "both" }}
        >
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-20" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-28 rounded-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jutsu section skeleton */}
      <Card
        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{ animationDelay: "300ms", animationFillMode: "both" }}
      >
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-28" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom grid skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: "350ms", animationFillMode: "both" }}
        >
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: "400ms", animationFillMode: "both" }}
        >
          <CardHeader className="pb-4">
            <Skeleton className="h-6 w-28" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-16" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-7 w-28 rounded-md" />
                  <Skeleton className="h-7 w-24 rounded-md" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-16" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-7 w-32 rounded-md" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
