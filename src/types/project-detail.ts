import type { PortfolioCategory } from "./portfolio";

export type GalleryAspect = "landscape" | "portrait" | "square" | "wide";

export interface GalleryImage {
  id: string;
  variant: 1 | 2 | 3 | 4;
  aspect: GalleryAspect;
  caption: string;
}

export interface BeforeAfterPair {
  beforeVariant: 1 | 2 | 3 | 4;
  afterVariant: 1 | 2 | 3 | 4;
  label: string;
}

export interface ProjectSection {
  id: string;
  label: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  client: string;
  category: Exclude<PortfolioCategory, "All">;
  year: number;
  software: string[];
  description: string;
  longDescription: string;
  tags: string[];
  gallery: GalleryImage[];
  beforeAfter: BeforeAfterPair;
  relatedSlugs: string[];
  sections: ProjectSection[];
}
