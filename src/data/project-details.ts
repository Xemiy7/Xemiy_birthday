import type { PortfolioItem } from "@/types/portfolio";
import type { ProjectDetail } from "@/types/project-detail";
import { portfolioItems } from "./portfolio";

const softwareByCategory: Record<PortfolioItem["category"], string[]> = {
  Branding: ["Illustrator", "Photoshop", "Figma"],
  Packaging: ["Illustrator", "Blender", "Photoshop"],
  Flyers: ["Illustrator", "InDesign", "Photoshop"],
  "UI Design": ["Figma", "After Effects", "Principle"],
  "Social Media": ["Figma", "Photoshop", "Canva"],
  Logo: ["Illustrator", "Figma"],
  Print: ["InDesign", "Illustrator", "Photoshop"],
  "Motion Graphics": ["After Effects", "Cinema 4D", "Premiere Pro"],
};

const clients = [
  "Noir Atelier Ltd.",
  "Form Studio Co.",
  "Pulse Events",
  "Vertex Financial",
  "Aura Beauty Group",
  "Penmark Design",
  "Monolith Publishing",
  "Drift Studios",
  "Silhouette Fashion",
  "Ember Roasters",
];

function buildGallery(slug: string, index: number): ProjectDetail["gallery"] {
  const aspects: ProjectDetail["gallery"][number]["aspect"][] = [
    "landscape",
    "portrait",
    "square",
    "wide",
    "landscape",
    "portrait",
  ];

  return aspects.map((aspect, i) => ({
    id: `${slug}-img-${i + 1}`,
    variant: (((index + i) % 4) + 1) as 1 | 2 | 3 | 4,
    aspect,
    caption: `Frame ${i + 1} — ${aspect} composition`,
  }));
}

function getRelatedSlugs(slug: string, category: PortfolioItem["category"]): string[] {
  return portfolioItems
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, 3)
    .map((p) => p.slug);
}

export function buildProjectDetail(item: PortfolioItem, index: number): ProjectDetail {
  return {
    slug: item.slug,
    title: item.title,
    client: clients[index % clients.length],
    category: item.category,
    year: item.year,
    software: softwareByCategory[item.category],
    description: item.description,
    longDescription: `${item.description} This project was approached with editorial rigor and a commitment to monochrome restraint. Every element — from typography to negative space — was considered with intention, resulting in a visual system that feels timeless, premium, and unmistakably refined.`,
    tags: item.tags,
    gallery: buildGallery(item.slug, index),
    beforeAfter: {
      beforeVariant: (((index % 4) + 1)) as 1 | 2 | 3 | 4,
      afterVariant: (((index + 2) % 4) + 1) as 1 | 2 | 3 | 4,
      label: "Before & After — Brand Evolution",
    },
    relatedSlugs: getRelatedSlugs(item.slug, item.category),
    sections: [
      { id: "overview", label: "Overview" },
      { id: "gallery", label: "Gallery" },
      { id: "before-after", label: "Before / After" },
      { id: "related", label: "Related" },
    ],
  };
}

export const projectDetails: ProjectDetail[] = portfolioItems.map(buildProjectDetail);

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails.find((p) => p.slug === slug);
}

export function getRelatedProjects(slugs: string[]): PortfolioItem[] {
  return slugs
    .map((s) => portfolioItems.find((p) => p.slug === s))
    .filter((p): p is PortfolioItem => p !== undefined);
}
