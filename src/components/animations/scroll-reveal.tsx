"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  blur?: boolean;
  y?: number;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  blur = true,
  y,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const offsetY = y ?? (isMobile ? 20 : 40);
  const blurAmount = isMobile ? 6 : 12;

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    registerGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: offsetY,
          filter: blur ? `blur(${blurAmount}px)` : "blur(0px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: isMobile ? 0.9 : 1.15,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: isMobile ? "top 92%" : "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => ctx.revert();
  }, [prefersReducedMotion, blur, offsetY, blurAmount, isMobile, delay]);

  return (
    <div
      ref={ref}
      className={cn(
        prefersReducedMotion || isMobile ? "" : "will-change-transform",
        className,
      )}
    >
      {children}
    </div>
  );
}
