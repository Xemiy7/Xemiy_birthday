"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CinematicReveal } from "@/components/project/cinematic-reveal";
import { MonochromePlaceholder } from "@/components/shared/monochrome-placeholder";
import type { PortfolioItem } from "@/types/portfolio";
import { easing, duration } from "@/lib/design-system";

interface RelatedWorksProps {
  projects: PortfolioItem[];
}

export function RelatedWorks({ projects }: RelatedWorksProps) {
  if (projects.length === 0) return null;

  return (
    <div className="grid-3 gap-6">
      {projects.map((project, index) => (
        <CinematicReveal key={project.slug} delay={index * 0.1}>
          <Link href={`/work/${project.slug}`} className="group block">
            <div className="image-frame image-landscape relative overflow-hidden rounded-xl">
              <m.div
                className="absolute inset-0"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: duration.slow, ease: easing.premium }}
              >
                <MonochromePlaceholder
                  variant={(((index % 4) + 1) as 1 | 2 | 3 | 4)}
                  className="h-full w-full"
                  label={project.title}
                />
              </m.div>
              <div className="absolute inset-0 bg-gradient-to-t from-mono-1000/70 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
              <div className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full glass opacity-0 transition-opacity group-hover:opacity-100">
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-title-sm">{project.title}</p>
                <p className="text-caption">{project.category}</p>
              </div>
            </div>
          </Link>
        </CinematicReveal>
      ))}
    </div>
  );
}
