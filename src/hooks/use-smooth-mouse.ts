"use client";

import { useEffect, useRef } from "react";
import { usePointerFine } from "@/hooks/use-pointer-fine";

interface SmoothMousePosition {
  x: number;
  y: number;
}

/**
 * RAF-lerped mouse position for cinematic cursor / glow effects.
 * Returns a ref updated every frame — read `.current` in render via state sync.
 */
export function useSmoothMouse(lerp = 0.12) {
  const pointerFine = usePointerFine();
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    if (!pointerFine) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      current.current = {
        x: current.current.x + (target.current.x - current.current.x) * lerp,
        y: current.current.y + (target.current.y - current.current.y) * lerp,
      };
      frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame.current);
    };
  }, [pointerFine, lerp]);

  return { current, enabled: pointerFine };
}
