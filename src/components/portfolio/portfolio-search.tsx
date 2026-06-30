"use client";

import { Search, X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

interface PortfolioSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function PortfolioSearch({ value, onChange }: PortfolioSearchProps) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors-premium"
        strokeWidth={1.5}
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects, tags, categories..."
        aria-label="Search portfolio"
        className={cn("field-control-search", value && "pr-12")}
      />
      <AnimatePresence>
        {value && (
          <m.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: duration.fast, ease: easing.premium }}
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground pressable transition-colors-premium hover:bg-white/8 hover:text-foreground"
          >
            <X className="size-4" strokeWidth={1.5} />
          </m.button>
        )}
      </AnimatePresence>
    </div>
  );
}
