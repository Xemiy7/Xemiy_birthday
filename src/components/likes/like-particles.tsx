"use client";

import { m } from "framer-motion";
import { easing } from "@/lib/design-system";

interface LikeParticlesProps {
  trigger: number;
}

const PARTICLE_COUNT = 8;

export function LikeParticles({ trigger }: LikeParticlesProps) {
  if (trigger === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        const distance = 20 + Math.random() * 16;

        return (
          <m.span
            key={`${trigger}-${i}`}
            className="absolute left-1/2 top-1/2 size-1 rounded-full bg-foreground"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance - 12,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.6 + Math.random() * 0.2,
              ease: easing.premium,
            }}
          />
        );
      })}
    </div>
  );
}
