"use client";

import { m } from "framer-motion";
import { portfolioCategories } from "@/types/portfolio";
import type { PortfolioCategory } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

interface PortfolioFiltersProps {
  active: PortfolioCategory;
  onChange: (category: PortfolioCategory) => void;
  count: number;
}

export function PortfolioFilters({
  active,
  onChange,
  count,
}: PortfolioFiltersProps) {
  return (
    <div className="stack-sm">
      <div className="flex items-center justify-between gap-4">
        <p className="text-overline">Filter</p>
        <span className="text-caption">{count} projects</span>
      </div>

      <div
        className="relative flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Filter portfolio by category"
      >
        {portfolioCategories.map((category) => {
          const isActive = active === category;

          return (
            <m.button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(category)}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: duration.fast, ease: easing.premium }}
              className={cn(
                "relative shrink-0 rounded-full border px-4 py-2 text-overline transition-premium pressable",
                isActive
                  ? "border-foreground text-background"
                  : "border-white/12 bg-white/4 text-muted-foreground hover:border-white/25 hover:text-foreground",
              )}
            >
              {isActive && (
                <m.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ duration: duration.normal, ease: easing.premium }}
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  "relative z-[1]",
                  isActive ? "text-background" : undefined,
                )}
              >
                {category}
              </span>
            </m.button>
          );
        })}
      </div>
    </div>
  );
}
