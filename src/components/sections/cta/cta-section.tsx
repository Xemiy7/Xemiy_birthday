"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Magnetic } from "@/components/animations/magnetic";
import { SceneBackdrop } from "@/components/three/scene-backdrop";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AmbientScene = dynamic(
  () =>
    import("@/components/three/scenes/ambient-scene").then(
      (mod) => mod.AmbientScene,
    ),
  { ssr: false },
);

export function CtaSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-y border-t border-white/8"
    >
      <div className="grid-container">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 glass-strong px-8 py-20 text-center md:px-16 md:py-28">
            <SceneBackdrop opacity={0.45} camera={{ position: [0, 0, 4], fov: 38 }}>
              <AmbientScene />
            </SceneBackdrop>
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              aria-hidden
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)",
              }}
            />

            <div className="relative stack-lg mx-auto max-w-3xl items-center">
              <p className="text-overline">Start a Project</p>
              <TextReveal
                as="h2"
                text="Let's Create Something Timeless"
                className="text-display-lg justify-center text-foreground"
              />
              <p className="text-body-lg max-w-lg text-muted-foreground">
                Available for brand identity, editorial design, and creative
                direction. Tell me about your vision.
              </p>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center">
                <Magnetic>
                  <Link
                    href="/book"
                    className={cn(buttonVariants({ variant: "primary", size: "xl" }))}
                  >
                    Book Project
                  </Link>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <Link
                    href="/work"
                    className={cn(buttonVariants({ variant: "ghost", size: "xl" }))}
                  >
                    View Portfolio
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
