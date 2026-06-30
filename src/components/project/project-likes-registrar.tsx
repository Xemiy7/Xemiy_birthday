"use client";

import { portfolioItems } from "@/data/portfolio";
import { useRegisterProjectLikes } from "@/hooks/use-register-project-likes";
import type { ProjectDetail } from "@/types/project-detail";

export function ProjectLikesRegistrar({ project }: { project: ProjectDetail }) {
  const portfolioItem = portfolioItems.find((p) => p.slug === project.slug);
  const projectId = portfolioItem?.id;

  useRegisterProjectLikes(projectId ? [projectId] : []);

  return null;
}
