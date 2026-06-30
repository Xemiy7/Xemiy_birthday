"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { ProjectCard } from "@/components/sections/featured-works/project-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { featuredProjects } from "@/data/projects";

export function FeaturedWorksSection() {
  return (
    <section id="work" aria-labelledby="work-heading" className="section-y">
      <div className="grid-container stack-xl">
        <ScrollReveal>
          <SectionHeader
            overline="Selected Work"
            title="Featured Projects"
            description="A curated selection of brand identities, editorial systems, and visual campaigns."
          />
        </ScrollReveal>

        <div className="grid-2 gap-y-12 lg:gap-y-16">
          {featuredProjects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.05}>
              <ProjectCard project={project} index={index} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="flex justify-center pt-4">
          <Link
            href="/work"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            View All Work
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
