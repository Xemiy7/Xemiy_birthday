"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { m } from "framer-motion";
import { TextReveal } from "@/components/animations/text-reveal";
import { SceneBackdrop } from "@/components/three/scene-backdrop";
import { PortfolioFilters } from "@/components/portfolio/portfolio-filters";
import { PortfolioSearch } from "@/components/portfolio/portfolio-search";
import { PortfolioMasonry } from "@/components/portfolio/portfolio-masonry";
import { PortfolioSkeletonGrid } from "@/components/portfolio/portfolio-skeleton";
import { usePortfolio } from "@/hooks/use-portfolio";
import { easing, duration } from "@/lib/design-system";

const WorksScene = dynamic(
  () =>
    import("@/components/three/scenes/works-scene").then(
      (mod) => mod.WorksScene,
    ),
  { ssr: false },
);

export function PortfolioPage() {
  const [mounted, setMounted] = useState(false);
  const {
    category,
    setCategory,
    query,
    setQuery,
    visible,
    filteredCount,
    hasMore,
    isLoading,
    loadMore,
    saved,
    toggleSave,
  } = usePortfolio();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen pt-24 pb-16 md:pt-28">
      <SceneBackdrop
        className="!absolute top-0 left-0 right-0 h-[min(55vh,480px)]"
        opacity={0.32}
        camera={{ position: [0, 0, 4.5], fov: 40 }}
      >
        <WorksScene />
      </SceneBackdrop>

      <div className="relative grid-container stack-xl">
        <header className="stack-lg max-w-3xl">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.cinematic, ease: easing.premium }}
          >
            <p className="text-overline mb-4">Portfolio</p>
            <TextReveal
              as="h1"
              text="Explore the Work"
              className="text-display-lg text-foreground"
            />
            <p className="text-body-lg mt-6 text-muted-foreground">
              A curated collection of branding, packaging, digital design, and
              motion — discover projects that inspire.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: duration.cinematic,
              delay: 0.15,
              ease: easing.premium,
            }}
            className="stack-md"
          >
            <PortfolioSearch value={query} onChange={setQuery} />
            <PortfolioFilters
              active={category}
              onChange={setCategory}
              count={filteredCount}
            />
          </m.div>
        </header>

        {!mounted ? (
          <PortfolioSkeletonGrid count={12} />
        ) : (
          <PortfolioMasonry
            items={visible}
            hasMore={hasMore}
            isLoading={isLoading}
            onLoadMore={loadMore}
            saved={saved}
            onSave={toggleSave}
          />
        )}
      </div>
    </div>
  );
}
