"use client";

import { m } from "framer-motion";
import { portfolioCategories } from "@/types/portfolio";
import type { PortfolioCategory } from "@/types/portfolio";
import { cn } from "@/lib/utils";

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

      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {portfolioCategories.map((category) => {
          const isActive = active === category;

          return (
            <m.button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              whileTap={{ scale: 0.96 }}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-overline transition-premium",
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-white/12 bg-white/4 text-muted-foreground hover:border-white/25 hover:text-foreground",
              )}
            >
              {category}
            </m.button>
          );
        })}
      </div>
    </div>
  );
}
