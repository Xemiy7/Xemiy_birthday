"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { easing, duration } from "@/lib/design-system";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = usePrefersReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref} className={cn("flex flex-wrap", className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="mr-[0.3em] inline-flex overflow-hidden pb-[0.1em]">
          <m.span
            className="inline-block"
            initial={{ y: "105%", opacity: 0, filter: "blur(6px)" }}
            animate={
              isInView
                ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                : { y: "105%", opacity: 0, filter: "blur(6px)" }
            }
            transition={{
              duration: duration.cinematic,
              delay: delay + i * 0.05,
              ease: easing.premium,
            }}
          >
            {word}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
