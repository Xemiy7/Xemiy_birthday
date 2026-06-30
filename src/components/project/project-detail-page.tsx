"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { CinematicReveal } from "@/components/project/cinematic-reveal";
import { ProjectSidebar } from "@/components/project/project-sidebar";
import { ProjectGallery } from "@/components/project/project-gallery";
import { BeforeAfterSlider } from "@/components/project/before-after-slider";
import { RelatedWorks } from "@/components/project/related-works";
import { ProjectLikesRegistrar } from "@/components/project/project-likes-registrar";
import { LikeButton } from "@/components/likes/like-button";
import { portfolioItems } from "@/data/portfolio";
import { MonochromePlaceholder } from "@/components/shared/monochrome-placeholder";
import { TextReveal } from "@/components/animations/text-reveal";
import type { ProjectDetail } from "@/types/project-detail";
import type { PortfolioItem } from "@/types/portfolio";
import { easing, duration } from "@/lib/design-system";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function bookUrl(slug: string, title: string) {
  return `/book?type=exact_design&project=${encodeURIComponent(slug)}&title=${encodeURIComponent(title)}`;
}

interface ProjectDetailPageProps {
  project: ProjectDetail;
  related: PortfolioItem[];
}

export function ProjectDetailPage({ project, related }: ProjectDetailPageProps) {
  const portfolioItem = portfolioItems.find((p) => p.slug === project.slug);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration.cinematic, ease: easing.premium }}
    >
      <ProjectLikesRegistrar project={project} />

      {/* Mobile back link */}
      <div className="grid-container pt-24 lg:hidden">
        <Link
          href="/work"
          className="mb-6 inline-flex items-center gap-2 text-caption transition-colors-premium hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.5} />
          All Work
        </Link>
      </div>

      {/* Cover */}
      <CinematicReveal direction="scale" className="w-full">
        <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden md:h-[65vh] lg:h-[75vh]">
          <MonochromePlaceholder
            variant={1}
            className="h-full w-full"
            label={`${project.title} cover`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 grid-container pb-10 md:pb-14">
            <p className="text-overline mb-3">{project.category}</p>
            <TextReveal
              as="h1"
              text={project.title}
              className="text-display-xl max-w-4xl text-foreground"
            />
          </div>
        </div>
      </CinematicReveal>

      {/* Main layout */}
      <div className="grid-container section-y !pt-12">
        <div className="grid-12 gap-12 lg:gap-16">
          {/* Sticky sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <ProjectSidebar
              title={project.title}
              sections={project.sections}
            />
          </div>

          {/* Content */}
          <div className="col-span-12 lg:col-span-9 stack-xl">
            {/* Overview */}
            <section id="overview" className="scroll-mt-28 stack-lg">
              <CinematicReveal>
                <h2 className="text-title-lg">Overview</h2>
              </CinematicReveal>

              <div className="grid-2 gap-8">
                <CinematicReveal delay={0.05} className="stack-md">
                  <MetaRow label="Client" value={project.client} />
                  <MetaRow label="Category" value={project.category} />
                  <MetaRow label="Year" value={String(project.year)} />
                  <div className="stack-xs">
                    <span className="text-overline">Software</span>
                    <div className="flex flex-wrap gap-2">
                      {project.software.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-white/10 px-3 py-1 text-caption"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </CinematicReveal>

                <CinematicReveal delay={0.1} direction="left">
                  <p className="text-body-lg text-muted-foreground">
                    {project.longDescription}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-mono text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    {portfolioItem && (
                      <LikeButton
                        projectId={portfolioItem.id}
                        fallbackCount={portfolioItem.likes}
                        variant="full"
                      />
                    )}

                    <Link
                      href={bookUrl(project.slug, project.title)}
                      className={cn(
                        buttonVariants({ variant: "primary", size: "lg" }),
                        "inline-flex",
                      )}
                    >
                    <Sparkles className="size-4" strokeWidth={1.5} />
                    Book This Design
                  </Link>
                  </div>
                </CinematicReveal>
              </div>
            </section>

            {/* Gallery */}
            <section id="gallery" className="scroll-mt-28 stack-lg border-t border-white/8 pt-12">
              <CinematicReveal>
                <h2 className="text-title-lg">Gallery</h2>
                <p className="text-body-sm mt-2 text-muted-foreground">
                  Click any image to view fullscreen. Hover to zoom.
                </p>
              </CinematicReveal>
              <ProjectGallery images={project.gallery} />
            </section>

            {/* Before / After */}
            <section id="before-after" className="scroll-mt-28 stack-lg border-t border-white/8 pt-12">
              <CinematicReveal>
                <h2 className="text-title-lg">Before / After</h2>
              </CinematicReveal>
              <CinematicReveal delay={0.1}>
                <BeforeAfterSlider data={project.beforeAfter} />
              </CinematicReveal>
            </section>

            {/* Related */}
            <section id="related" className="scroll-mt-28 stack-lg border-t border-white/8 pt-12">
              <CinematicReveal>
                <h2 className="text-title-lg">Related Work</h2>
                <p className="text-body-sm mt-2 text-muted-foreground">
                  More projects in {project.category}.
                </p>
              </CinematicReveal>
              <RelatedWorks projects={related} />
            </section>
          </div>
        </div>
      </div>
    </m.div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/8 pb-4">
      <span className="text-overline">{label}</span>
      <span className="text-body-sm text-right">{value}</span>
    </div>
  );
}
