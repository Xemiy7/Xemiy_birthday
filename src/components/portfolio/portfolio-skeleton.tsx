"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { PortfolioSize } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const sizeHeights: Record<PortfolioSize, string> = {
  short: "h-44",
  medium: "h-64",
  tall: "h-80",
  wide: "h-52",
};

interface PortfolioSkeletonProps {
  size?: PortfolioSize;
  className?: string;
}

export function PortfolioSkeleton({
  size = "medium",
  className,
}: PortfolioSkeletonProps) {
  return (
    <div className={cn("break-inside-avoid mb-4", className)}>
      <Skeleton
        variant="image"
        className={cn("w-full rounded-2xl", sizeHeights[size])}
      />
      <div className="mt-3 stack-xs px-1">
        <Skeleton variant="text" className="h-4 w-2/3" />
        <Skeleton variant="text" className="h-3 w-1/3" />
      </div>
    </div>
  );
}

interface PortfolioSkeletonGridProps {
  count?: number;
}

export function PortfolioSkeletonGrid({ count = 8 }: PortfolioSkeletonGridProps) {
  const sizes: PortfolioSize[] = ["short", "medium", "tall", "wide"];

  return (
    <div className="columns-2 gap-4 md:columns-3 lg:columns-4 xl:columns-5">
      {Array.from({ length: count }).map((_, i) => (
        <PortfolioSkeleton key={i} size={sizes[i % sizes.length]} />
      ))}
    </div>
  );
}
