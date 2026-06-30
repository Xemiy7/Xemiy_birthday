"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({ children, className, speed = 0.25 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (prefersReducedMotion || isMobile || !ref.current) return;

    registerGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => speed * 80,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile, speed]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
