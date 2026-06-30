"use client";

import { useRef, type ReactNode } from "react";
import { m, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { easing, duration } from "@/lib/design-system";

interface CinematicRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "scale";
}

export function CinematicReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: CinematicRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const prefersReducedMotion = usePrefersReducedMotion();

  const hidden = {
    up: { opacity: 0, y: 32, filter: "blur(8px)" },
    left: { opacity: 0, x: -28, filter: "blur(6px)" },
    scale: { opacity: 0, scale: 0.97, filter: "blur(8px)" },
  };

  const visible = {
    up: { opacity: 1, y: 0, filter: "blur(0px)" },
    left: { opacity: 1, x: 0, filter: "blur(0px)" },
    scale: { opacity: 1, scale: 1, filter: "blur(0px)" },
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      className={cn(className)}
      initial={hidden[direction]}
      animate={isInView ? visible[direction] : hidden[direction]}
      transition={{
        duration: duration.dramatic,
        delay,
        ease: easing.premium,
      }}
    >
      {children}
    </m.div>
  );
}
