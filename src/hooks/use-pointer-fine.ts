"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** True on desktop with fine pointer — safe for cursor, magnetic, 3D hover. */
export function usePointerFine(): boolean {
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = usePrefersReducedMotion();
  return fine && !reduced;
}
