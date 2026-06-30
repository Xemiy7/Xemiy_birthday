"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function Card3D({
  children,
  className,
  intensity = 7,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFine();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 22 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!pointerFine || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * intensity);
    rotateX.set(-y * intensity);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  if (!pointerFine) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      className={cn("card-3d", className)}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </m.div>
  );
}
