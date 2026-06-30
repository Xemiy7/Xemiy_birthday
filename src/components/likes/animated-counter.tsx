"use client";

import { useEffect, useRef } from "react";
import { m, useSpring, useTransform, motionValue } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const motionVal = useRef(motionValue(value));
  const spring = useSpring(motionVal.current, {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    motionVal.current.set(value);
  }, [value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = String(v);
      }
    });
    return unsubscribe;
  }, [rounded]);

  return (
    <m.span ref={displayRef} className={className}>
      {value}
    </m.span>
  );
}
