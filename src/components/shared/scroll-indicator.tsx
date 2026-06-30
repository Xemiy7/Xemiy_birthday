"use client";

import { m } from "framer-motion";

export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-overline">Scroll</span>
      <div className="relative h-12 w-px overflow-hidden bg-white/10">
        <m.div
          className="absolute inset-x-0 top-0 h-1/2 bg-white/60"
          animate={{ y: ["-100%", "200%"] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </div>
  );
}
