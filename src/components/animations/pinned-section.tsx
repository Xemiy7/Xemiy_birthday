"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapPlugins } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface PinnedSectionProps {
  children: ReactNode;
  className?: string;
  /** Scroll distance while pinned, e.g. "150%" or "+=800" */
  pinDuration?: string;
  pinSpacing?: boolean;
}

export function PinnedSection({
  children,
  className,
  pinDuration = "120%",
  pinSpacing = true,
}: PinnedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (prefersReducedMotion || !isDesktop || !containerRef.current || !pinRef.current) {
      return;
    }

    registerGsapPlugins();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${pinDuration}`,
        pin: pinRef.current,
        pinSpacing,
        anticipatePin: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isDesktop, pinDuration, pinSpacing]);

  return (
    <div ref={containerRef} className={cn(className)}>
      <div ref={pinRef}>{children}</div>
    </div>
  );
}
