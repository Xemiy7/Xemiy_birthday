"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal } from "@/components/animations/image-reveal";
import { Parallax } from "@/components/animations/parallax";
import { Card3D } from "@/components/animations/card-3d";
import { ImageDistortion } from "@/components/animations/image-distortion";
import { MonochromePlaceholder } from "@/components/shared/monochrome-placeholder";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

export function ProjectCard({ project, index, className }: ProjectCardProps) {
  const variant = ((index % 4) + 1) as 1 | 2 | 3 | 4;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn("group block", className)}
    >
      <Card3D intensity={5}>
        <ImageReveal delay={index * 0.08}>
          <div className="image-frame image-landscape image-reveal image-shine relative">
            <ImageDistortion intensity={3}>
              <Parallax speed={0.12}>
                <MonochromePlaceholder
                  variant={variant}
                  className="aspect-[16/10] w-full transition-transform duration-[var(--duration-dramatic)] ease-[var(--ease-premium)] group-hover:scale-[1.02]"
                  label={project.title}
                />
              </Parallax>
            </ImageDistortion>
            <div className="absolute inset-0 bg-gradient-to-t from-mono-1000/70 via-mono-1000/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
            <div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </div>
          </div>
        </ImageReveal>
      </Card3D>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="stack-xs">
          <h3 className="text-title-sm transition-colors-premium group-hover:text-foreground/80">
            {project.title}
          </h3>
          <p className="text-caption">{project.category}</p>
        </div>
        <span className="text-mono text-muted-foreground">{project.year}</span>
      </div>
    </Link>
  );
}
