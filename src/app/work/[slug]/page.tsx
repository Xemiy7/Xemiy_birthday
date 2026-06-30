import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { getProjectDetail, getRelatedProjects } from "@/data/project-details";
import { portfolioItems } from "@/data/portfolio";
import { ProjectDetailPage } from "@/components/project/project-detail-page";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) return {};

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/work/${slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectDetail(slug);

  if (!project) notFound();

  const related = getRelatedProjects(project.relatedSlugs);

  return <ProjectDetailPage project={project} related={related} />;
}
