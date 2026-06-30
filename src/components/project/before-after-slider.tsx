"use client";

import { useCallback, useRef, useState } from "react";
import { m } from "framer-motion";
import { MonochromePlaceholder } from "@/components/shared/monochrome-placeholder";
import type { BeforeAfterPair } from "@/types/project-detail";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

interface BeforeAfterSliderProps {
  data: BeforeAfterPair;
  className?: string;
}

export function BeforeAfterSlider({ data, className }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = () => setIsDragging(false);

  return (
    <div className={cn("stack-sm", className)}>
      <p className="text-overline">{data.label}</p>

      <div
        ref={containerRef}
        className="image-frame relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        aria-label="Before and after comparison"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* After (full) */}
        <div className="absolute inset-0">
          <MonochromePlaceholder
            variant={data.afterVariant}
            className="h-full w-full"
            label="After"
          />
          <span className="absolute right-4 top-4 rounded-full glass px-3 py-1 text-overline">
            After
          </span>
        </div>

        {/* Before (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <MonochromePlaceholder
            variant={data.beforeVariant}
            className="h-full w-full"
            label="Before"
          />
          <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-overline">
            Before
          </span>
        </div>

        {/* Divider handle */}
        <m.div
          className="absolute inset-y-0 z-10 w-px bg-white/80"
          style={{ left: `${position}%` }}
          animate={{ opacity: isDragging ? 1 : 0.7 }}
        >
          <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-mono-1000/80 backdrop-blur-sm">
            <div className="flex gap-0.5">
              <span className="h-3 w-px bg-white/60" />
              <span className="h-3 w-px bg-white/60" />
            </div>
          </div>
        </m.div>
      </div>

      <p className="text-caption text-center">
        Drag to compare — {Math.round(position)}%
      </p>
    </div>
  );
}
