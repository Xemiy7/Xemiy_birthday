"use client";

import { useRef, type ReactNode } from "react";
import { m, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { easing, duration } from "@/lib/design-system";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={
        isInView
          ? { clipPath: "inset(0% 0 0 0)" }
          : { clipPath: "inset(100% 0 0 0)" }
      }
      transition={{ duration: duration.dramatic, delay, ease: easing.dramatic }}
    >
      <m.div
        initial={{ scale: 1.08, filter: "blur(6px)" }}
        animate={
          isInView
            ? { scale: 1, filter: "blur(0px)" }
            : { scale: 1.08, filter: "blur(6px)" }
        }
        transition={{ duration: duration.dramatic, delay, ease: easing.premium }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
