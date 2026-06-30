"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const SceneCanvas = dynamic(
  () => import("./scene-canvas").then((mod) => mod.SceneCanvas),
  { ssr: false },
);

interface SceneBackdropProps {
  children: ReactNode;
  className?: string;
  opacity?: number;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
}

/**
 * Absolute-positioned, pointer-events-none 3D layer.
 * Skipped on mobile and when reduced motion is preferred.
 */
export function SceneBackdrop({
  children,
  className,
  opacity = 1,
  camera,
}: SceneBackdropProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (prefersReducedMotion || !isDesktop) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      style={{ opacity }}
      aria-hidden
    >
      <SceneCanvas className="h-full w-full" camera={camera}>
        {children}
      </SceneCanvas>
    </div>
  );
}
