"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ImageReveal } from "@/components/animations/image-reveal";
import { ImageDistortion } from "@/components/animations/image-distortion";
import { Parallax } from "@/components/animations/parallax";
import { TextReveal } from "@/components/animations/text-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { MonochromePlaceholder } from "@/components/shared/monochrome-placeholder";
import { siteConfig } from "@/config/site";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-y border-t border-white/8"
    >
      <div className="grid-container">
        <div className="grid-12 items-center gap-12 lg:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <ScrollReveal>
              <SectionHeader
                overline="About"
                title={`The Studio Behind ${siteConfig.name}`}
                description="A graphics design practice rooted in restraint, precision, and the belief that monochrome is not a limitation — it is a discipline."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="mt-10 stack-md max-w-md">
              <p className="text-body text-muted-foreground">
                I craft visual identities and editorial systems for brands that
                value sophistication over noise. Every project is approached
                with editorial rigor and cinematic sensibility.
              </p>
              <p className="text-body text-muted-foreground">
                From logotypes to full brand ecosystems, my work lives in the
                space between art direction and systematic design — always in
                black and white.
              </p>
              <div className="flex gap-10 pt-4">
                <div className="stack-xs">
                  <span className="text-display-md text-foreground">40+</span>
                  <span className="text-caption">Projects</span>
                </div>
                <div className="stack-xs">
                  <span className="text-display-md text-foreground">8</span>
                  <span className="text-caption">Years</span>
                </div>
                <div className="stack-xs">
                  <span className="text-display-md text-foreground">12</span>
                  <span className="text-caption">Awards</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <ImageReveal>
              <ImageDistortion intensity={2}>
                <Parallax speed={0.1}>
                  <div className="image-frame image-portrait mx-auto max-w-md lg:max-w-none">
                    <MonochromePlaceholder
                      variant={2}
                      className="aspect-[3/4] w-full"
                      label="xemiy studio portrait"
                    />
                  </div>
                </Parallax>
              </ImageDistortion>
            </ImageReveal>
          </div>
        </div>

        <ScrollReveal className="mt-20 border-t border-white/8 pt-16">
          <TextReveal
            as="p"
            text="Precision is the ultimate form of luxury."
            className="text-display-lg max-w-3xl text-foreground/90"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
