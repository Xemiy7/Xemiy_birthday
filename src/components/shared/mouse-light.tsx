"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePointerFine } from "@/hooks/use-pointer-fine";

interface MouseLightProps {
  className?: string;
  intensity?: number;
}

export function MouseLight({ className, intensity = 0.1 }: MouseLightProps) {
  const pointerFine = usePointerFine();
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const target = { x: 50, y: 50 };
  const current = { x: 50, y: 50 };

  useEffect(() => {
    if (!pointerFine) return;

    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth) * 100;
      target.y = (e.clientY / window.innerHeight) * 100;
    };

    let frame = 0;
    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      setPos({ x: current.x, y: current.y });
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [pointerFine]);

  if (!pointerFine) return null;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[1]", className)}
      aria-hidden
      style={{
        background: `radial-gradient(520px circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,${intensity}) 0%, transparent 62%)`,
      }}
    />
  );
}
