"use client";

import { useEffect, useState } from "react";
import { usePointerFine } from "@/hooks/use-pointer-fine";

export function CursorGlow() {
  const enabled = usePointerFine();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("cursor-glow-active");

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    let frame = 0;
    const tick = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      setPos({ x: current.x, y: current.y });
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("cursor-glow-active");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        className="cursor-glow-ring pointer-events-none fixed z-[90]"
        aria-hidden
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="cursor-glow-dot pointer-events-none fixed z-[91]"
        aria-hidden
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
