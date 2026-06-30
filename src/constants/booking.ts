import { portfolioCategories } from "@/types/portfolio";

export const bookingTypes = [
  {
    id: "exact_design" as const,
    title: "Book This Exact Design",
    description:
      "Love a project from the portfolio? Request this exact design adapted for your brand.",
  },
  {
    id: "new_project" as const,
    title: "Request a New Project",
    description:
      "Start from scratch with a custom brief tailored to your vision and goals.",
  },
];

export const projectTypes = portfolioCategories.filter((c) => c !== "All");

export const budgetRanges = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Flexible / Discuss",
];

export const preferredStyles = [
  "Minimal & Restrained",
  "Editorial & Typographic",
  "Bold & High Contrast",
  "Luxury & Premium",
  "Modern & Geometric",
  "Organic & Soft",
  "Open to direction",
];

export const countries = [
  "Nigeria",
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Netherlands",
  "United Arab Emirates",
  "South Africa",
  "Ghana",
  "Kenya",
  "Australia",
  "Other",
];

export const PORTFOLIO_INTEREST_MESSAGE =
  "I'm interested in this project.";

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FILES = 5;
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/zip",
];
