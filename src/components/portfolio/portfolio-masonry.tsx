"use client";

import { useCallback } from "react";
import { AnimatePresence, LayoutGroup, m } from "framer-motion";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { PortfolioSkeletonGrid } from "@/components/portfolio/portfolio-skeleton";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useRegisterProjectLikes } from "@/hooks/use-register-project-likes";
import { Loading } from "@/components/shared/loading";
import type { PortfolioItem } from "@/types/portfolio";

interface PortfolioMasonryProps {
  items: PortfolioItem[];
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  saved: Set<string>;
  onSave: (id: string) => void;
}

export function PortfolioMasonry({
  items,
  hasMore,
  isLoading,
  onLoadMore,
  saved,
  onSave,
}: PortfolioMasonryProps) {
  useRegisterProjectLikes(items.map((item) => item.id));
  const handleLoadMore = useCallback(() => {
    onLoadMore();
  }, [onLoadMore]);

  const sentinelRef = useInfiniteScroll(handleLoadMore, hasMore && !isLoading);

  if (items.length === 0 && !isLoading) {
    return (
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[40vh] flex-col items-center justify-center text-center stack-sm"
      >
        <p className="text-title-sm">No projects found</p>
        <p className="text-caption">Try adjusting your search or filter.</p>
      </m.div>
    );
  }

  return (
    <>
      <LayoutGroup>
        <m.div
          layout
          className="columns-2 gap-4 md:columns-3 lg:columns-4 xl:columns-5"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                isSaved={saved.has(item.id)}
                onSave={() => onSave(item.id)}
              />
            ))}
          </AnimatePresence>
        </m.div>
      </LayoutGroup>

      <div ref={sentinelRef} className="mt-8 flex justify-center py-8">
        {isLoading && (
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="stack-md w-full"
          >
            <div className="flex justify-center">
              <Loading variant="dots" label="Loading more projects" />
            </div>
            <PortfolioSkeletonGrid count={5} />
          </m.div>
        )}

        {!hasMore && items.length > 0 && (
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-caption"
          >
            You&apos;ve seen all {items.length} projects
          </m.p>
        )}
      </div>
    </>
  );
}
