"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({
  children,
  className,
  strength = 0.28,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFine();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!pointerFine || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!pointerFine) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </m.div>
  );
}
