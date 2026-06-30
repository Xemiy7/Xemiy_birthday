export const portfolioCategories = [
  "All",
  "Branding",
  "Packaging",
  "Flyers",
  "UI Design",
  "Social Media",
  "Logo",
  "Print",
  "Motion Graphics",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export type PortfolioSize = "short" | "medium" | "tall" | "wide";

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: Exclude<PortfolioCategory, "All">;
  year: number;
  description: string;
  size: PortfolioSize;
  likes: number;
  tags: string[];
}
