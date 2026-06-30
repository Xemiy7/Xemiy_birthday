"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { cn } from "@/lib/utils";

interface ImageDistortionProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function ImageDistortion({
  children,
  className,
  intensity = 4,
}: ImageDistortionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFine();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const skewX = useTransform(smoothY, [0, 1], [intensity, -intensity]);
  const skewY = useTransform(smoothX, [0, 1], [-intensity, intensity]);
  const scale = useTransform(smoothX, [0, 0.5, 1], [1.02, 1.04, 1.02]);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!pointerFine || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  if (!pointerFine) {
    return (
      <div className={cn("overflow-hidden", className)}>{children}</div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden", className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <m.div style={{ skewX, skewY, scale }} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}
