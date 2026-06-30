export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseTags(input: string): string[] {
  return input
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function parseSoftware(input: string): string[] {
  return parseTags(input);
}

export const ADMIN_CATEGORIES = [
  "Branding",
  "Packaging",
  "Flyers",
  "UI Design",
  "Social Media",
  "Logo",
  "Print",
  "Motion Graphics",
] as const;

export const ADMIN_SIZES = ["short", "medium", "tall", "wide"] as const;
