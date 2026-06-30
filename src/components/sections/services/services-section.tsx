"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-y border-t border-white/8"
    >
      <div className="grid-container stack-xl">
        <ScrollReveal>
          <SectionHeader
            overline="Services"
            title="What I Create"
            description="End-to-end design services for brands that demand visual excellence."
          />
        </ScrollReveal>

        <div className="grid-2">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 0.08}>
              <Card variant="glass" padding="lg" className="h-full hover-lift">
                <CardHeader>
                  <span className="text-mono text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-overline"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
