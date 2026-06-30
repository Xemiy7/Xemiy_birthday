"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { testimonials } from "@/data/testimonials";
import { easing, duration } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-y border-t border-white/8"
    >
      <div className="grid-container stack-xl">
        <ScrollReveal>
          <SectionHeader
            overline="Testimonials"
            title="Words From Clients"
            description="Trusted by creative directors, founders, and editors worldwide."
            align="center"
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="text-display-xl text-foreground/10" aria-hidden>
              &ldquo;
            </span>

            <AnimatePresence mode="wait">
              <m.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: duration.slow, ease: easing.premium }}
                className="stack-md -mt-8"
              >
                <p className="text-display-md text-foreground/90">
                  {current.quote}
                </p>
                <footer className="stack-xs">
                  <cite className="text-headline not-italic">{current.author}</cite>
                  <span className="text-caption">
                    {current.role}, {current.company}
                  </span>
                </footer>
              </m.blockquote>
            </AnimatePresence>

            <div className="mt-12 flex items-center justify-center gap-3">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View testimonial from ${t.author}`}
                  aria-current={active === i ? "true" : undefined}
                  className={cn(
                    "h-px transition-all duration-500",
                    active === i
                      ? "w-10 bg-foreground"
                      : "w-6 bg-white/20 hover:bg-white/40",
                  )}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
