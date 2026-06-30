"use client";

import { Search, X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PortfolioSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function PortfolioSearch({ value, onChange }: PortfolioSearchProps) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        strokeWidth={1.5}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects, tags, categories..."
        aria-label="Search portfolio"
        className={cn(
          "w-full rounded-full border border-white/10 bg-white/4 py-3 pr-12 pl-11",
          "text-body-sm text-foreground placeholder:text-muted-foreground",
          "transition-premium outline-none",
          "focus:border-white/25 focus:bg-white/6 focus:ring-0",
        )}
      />
      <AnimatePresence>
        {value && (
          <m.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors-premium hover:bg-white/8 hover:text-foreground"
          >
            <X className="size-4" strokeWidth={1.5} />
          </m.button>
        )}
      </AnimatePresence>
    </div>
  );
}
