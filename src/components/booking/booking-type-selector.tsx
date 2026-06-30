"use client";

import { m } from "framer-motion";
import type { BookingType } from "@/types/booking";
import { bookingTypes } from "@/constants/booking";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";
import { Sparkles, PenLine } from "lucide-react";

interface BookingTypeSelectorProps {
  value: BookingType;
  onChange: (type: BookingType) => void;
  projectTitle?: string;
}

const icons = {
  exact_design: Sparkles,
  new_project: PenLine,
};

export function BookingTypeSelector({
  value,
  onChange,
  projectTitle,
}: BookingTypeSelectorProps) {
  return (
    <div className="grid-2 gap-4">
      {bookingTypes.map((type) => {
        const Icon = icons[type.id];
        const isActive = value === type.id;
        const isExact = type.id === "exact_design";

        return (
          <m.button
            key={type.id}
            type="button"
            onClick={() => onChange(type.id)}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative rounded-2xl border p-6 text-left transition-premium stack-sm",
              isActive
                ? "border-foreground/30 bg-white/6 shadow-glow"
                : "border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/4",
            )}
          >
            {isActive && (
              <m.div
                layoutId="booking-type-indicator"
                className="absolute inset-0 rounded-2xl border border-white/20"
                transition={{ duration: duration.normal, ease: easing.premium }}
              />
            )}

            <div className="relative flex items-center gap-3">
              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border transition-premium",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-white/15 text-muted-foreground",
                )}
              >
                <Icon className="size-4" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-title-sm">{type.title}</p>
                {isExact && projectTitle && isActive && (
                  <p className="text-caption mt-0.5 text-muted-foreground">
                    {projectTitle}
                  </p>
                )}
              </div>
            </div>

            <p className="relative text-body-sm text-muted-foreground">
              {type.description}
            </p>
          </m.button>
        );
      })}
    </div>
  );
}
