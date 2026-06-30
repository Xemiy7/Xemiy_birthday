"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PinnedSection } from "@/components/animations/pinned-section";
import { Card3D } from "@/components/animations/card-3d";
import { SectionHeader } from "@/components/shared/section-header";
import { processSteps } from "@/data/process";

export function CreativeProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="section-y border-t border-white/8"
    >
      <PinnedSection pinDuration="70%">
        <div className="grid-container stack-xl">
          <ScrollReveal>
            <SectionHeader
              overline="Process"
              title="Creative Process"
              description="A deliberate four-stage framework that transforms vision into refined visual systems."
              align="center"
            />
          </ScrollReveal>

          <div className="relative">
            <div
              className="absolute left-[1.125rem] top-0 hidden h-full w-px bg-white/10 md:left-1/2 md:block md:-translate-x-px"
              aria-hidden
            />

            <div className="stack-lg">
              {processSteps.map((step, index) => (
                <ScrollReveal key={step.step} delay={index * 0.08}>
                  <div
                    className={`grid-12 items-center gap-8 ${
                      index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="col-span-12 md:col-span-5">
                      <span className="text-display-lg text-foreground/15">
                        {step.step}
                      </span>
                    </div>
                    <div className="col-span-12 md:col-span-7">
                      <Card3D intensity={4}>
                        <div className="card card-glass p-8 md:p-10">
                          <h3 className="text-title-md mb-3">{step.title}</h3>
                          <p className="text-body text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </Card3D>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </PinnedSection>
    </section>
  );
}
