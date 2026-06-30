"use client";

import { useEffect, useState } from "react";
import { usePointerFine } from "@/hooks/use-pointer-fine";

type CursorMode = "default" | "hover" | "press";

export function CursorGlow() {
  const enabled = usePointerFine();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState<CursorMode>("default");
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("cursor-glow-active");

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      const el = e.target as HTMLElement;
      const interactive = el.closest(
        "a, button, input, textarea, select, [role='button'], label",
      );
      setMode(interactive ? "hover" : "default");
    };

    const onDown = () => setMode("press");
    const onUp = () => setMode("default");

    let frame = 0;
    const tick = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      setPos({ x: current.x, y: current.y });
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    frame = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("cursor-glow-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringClass =
    mode === "press"
      ? "cursor-glow-ring--press"
      : mode === "hover"
        ? "cursor-glow-ring--hover"
        : "";

  const dotClass =
    mode === "press"
      ? "cursor-glow-dot--press"
      : mode === "hover"
        ? "cursor-glow-dot--hover"
        : "";

  return (
    <>
      <div
        className={`cursor-glow-ring pointer-events-none fixed z-[90] ${ringClass}`}
        aria-hidden
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className={`cursor-glow-dot pointer-events-none fixed z-[91] ${dotClass}`}
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
