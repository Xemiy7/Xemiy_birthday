"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import dynamic from "next/dynamic";
import { Logo } from "@/components/shared/logo";
import { MouseLight } from "@/components/shared/mouse-light";
import { ScrollIndicator } from "@/components/shared/scroll-indicator";
import { TextReveal } from "@/components/animations/text-reveal";
import { Magnetic } from "@/components/animations/magnetic";
import { Parallax } from "@/components/animations/parallax";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { easing, duration } from "@/lib/design-system";

const SceneCanvas = dynamic(
  () =>
    import("@/components/three/scene-canvas").then((mod) => mod.SceneCanvas),
  { ssr: false },
);

const HeroScene = dynamic(
  () =>
    import("@/components/three/scenes/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false },
);

export function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !bgRef.current) return;

    let frame = 0;
    let offset = 0;

    const animate = () => {
      offset += 0.0004;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${Math.sin(offset) * 2}%, ${Math.cos(offset * 0.7) * 2}%) scale(1.1)`;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden"
    >
      {/* Moving background mesh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Parallax speed={0.12} className="absolute -inset-[20%]">
          <div
            ref={bgRef}
            className="h-full w-full opacity-30"
            style={{
              background: `
              radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 40%),
              radial-gradient(ellipse at 60% 80%, rgba(255,255,255,0.03) 0%, transparent 45%)
            `,
            }}
          />
        </Parallax>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <MouseLight intensity={0.08} />

      {/* 3D floating graphics */}
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 z-[2] hidden md:block">
          <SceneCanvas className="h-full w-full">
            <HeroScene />
          </SceneCanvas>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 grid-container flex flex-1 flex-col justify-center pt-28 pb-8">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <m.div variants={fadeInUp} className="mb-8">
            <Logo priority />
          </m.div>

          <TextReveal
            as="h1"
            text="Design That Speaks Before Words Do"
            className="text-display-2xl mb-8 text-foreground"
            delay={0.2}
          />

          <m.div variants={fadeInUp} className="mb-6 max-w-xl">
            <p className="text-overline mb-4">{siteConfig.role}</p>
            <p className="text-body-lg text-foreground/75">
              Crafting refined visual identities, editorial systems, and
              cinematic brand experiences — exclusively in black and white.
            </p>
          </m.div>

          <m.div
            variants={fadeInUp}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <Link
                href="/work"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
              >
                View Portfolio
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link
                href="/book"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Book Project
              </Link>
            </Magnetic>
          </m.div>
        </m.div>
      </div>

      {/* Scroll indicator */}
      <m.div
        className="relative z-10 flex justify-center pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: duration.cinematic, ease: easing.premium }}
      >
        <ScrollIndicator />
      </m.div>
    </section>
  );
}
