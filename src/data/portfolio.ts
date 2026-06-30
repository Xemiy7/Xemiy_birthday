import type { PortfolioItem } from "@/types/portfolio";

const sizes: PortfolioItem["size"][] = ["short", "medium", "tall", "wide"];

const items: Omit<PortfolioItem, "id">[] = [
  { slug: "noir-atelier", title: "Noir Atelier", category: "Branding", year: 2025, description: "Luxury identity system with typographic precision.", size: "tall", likes: 284, tags: ["identity", "luxury", "monochrome"] },
  { slug: "form-studio-pack", title: "Form Studio", category: "Packaging", year: 2024, description: "Minimal packaging where texture carries the brand.", size: "medium", likes: 192, tags: ["packaging", "minimal"] },
  { slug: "pulse-flyer", title: "Pulse Festival", category: "Flyers", year: 2024, description: "High-contrast event flyer series.", size: "short", likes: 156, tags: ["event", "poster"] },
  { slug: "vertex-ui", title: "Vertex App", category: "UI Design", year: 2025, description: "Premium fintech interface in black and white.", size: "tall", likes: 341, tags: ["ui", "app", "fintech"] },
  { slug: "aura-social", title: "Aura Social", category: "Social Media", year: 2024, description: "Cohesive social templates for a beauty brand.", size: "medium", likes: 218, tags: ["social", "templates"] },
  { slug: "penmark-logo", title: "Penmark", category: "Logo", year: 2025, description: "Geometric logotype for a design studio.", size: "short", likes: 167, tags: ["logo", "wordmark"] },
  { slug: "monolith-print", title: "Monolith Print", category: "Print", year: 2023, description: "Editorial print collateral for a culture magazine.", size: "wide", likes: 203, tags: ["editorial", "print"] },
  { slug: "drift-motion", title: "Drift Motion", category: "Motion Graphics", year: 2025, description: "Cinematic title sequence in monochrome.", size: "tall", likes: 412, tags: ["motion", "title"] },
  { slug: "silhouette-brand", title: "Silhouette", category: "Branding", year: 2024, description: "Complete brand refresh for a fashion label.", size: "medium", likes: 276, tags: ["fashion", "brand"] },
  { slug: "ember-packaging", title: "Ember Coffee", category: "Packaging", year: 2023, description: "Artisan coffee bag and label system.", size: "short", likes: 189, tags: ["coffee", "packaging"] },
  { slug: "nightwave-flyer", title: "Nightwave", category: "Flyers", year: 2025, description: "Club night flyer collection.", size: "medium", likes: 134, tags: ["nightlife", "flyer"] },
  { slug: "haven-ui", title: "Haven Dashboard", category: "UI Design", year: 2024, description: "Analytics dashboard with refined data visualization.", size: "wide", likes: 298, tags: ["dashboard", "data"] },
  { slug: "luna-social", title: "Luna Skincare", category: "Social Media", year: 2025, description: "Instagram grid system and story templates.", size: "short", likes: 245, tags: ["beauty", "instagram"] },
  { slug: "axis-logo", title: "Axis Labs", category: "Logo", year: 2024, description: "Tech startup logomark and wordmark.", size: "medium", likes: 178, tags: ["tech", "mark"] },
  { slug: "folio-print", title: "Folio Annual", category: "Print", year: 2024, description: "Annual report design with bold typography.", size: "tall", likes: 221, tags: ["annual", "corporate"] },
  { slug: "flux-motion", title: "Flux Reel", category: "Motion Graphics", year: 2024, description: "Showreel graphics and lower thirds.", size: "medium", likes: 367, tags: ["reel", "broadcast"] },
  { slug: "meridian-brand", title: "Meridian", category: "Branding", year: 2023, description: "Hospitality brand identity and signage.", size: "wide", likes: 198, tags: ["hospitality", "signage"] },
  { slug: "vault-packaging", title: "Vault Wines", category: "Packaging", year: 2025, description: "Premium wine label and box design.", size: "tall", likes: 312, tags: ["wine", "luxury"] },
  { slug: "echo-flyer", title: "Echo Sessions", category: "Flyers", year: 2023, description: "Jazz concert poster series.", size: "short", likes: 142, tags: ["music", "jazz"] },
  { slug: "prism-ui", title: "Prism Wallet", category: "UI Design", year: 2025, description: "Mobile wallet app interface design.", size: "medium", likes: 289, tags: ["mobile", "wallet"] },
  { slug: "vogue-social", title: "Vogue Edit", category: "Social Media", year: 2024, description: "Editorial social content for a fashion brand.", size: "tall", likes: 334, tags: ["fashion", "editorial"] },
  { slug: "nexus-logo", title: "Nexus", category: "Logo", year: 2023, description: "Abstract mark for a consultancy firm.", size: "short", likes: 165, tags: ["consulting", "abstract"] },
  { slug: "atlas-print", title: "Atlas Brochure", category: "Print", year: 2025, description: "Corporate brochure with architectural layouts.", size: "medium", likes: 187, tags: ["brochure", "corporate"] },
  { slug: "spark-motion", title: "Spark Intro", category: "Motion Graphics", year: 2023, description: "Brand launch motion graphics package.", size: "wide", likes: 401, tags: ["launch", "animation"] },
  { slug: "onyx-brand", title: "Onyx Collective", category: "Branding", year: 2025, description: "Creative agency identity and stationery.", size: "medium", likes: 256, tags: ["agency", "stationery"] },
  { slug: "bloom-packaging", title: "Bloom Tea", category: "Packaging", year: 2024, description: "Organic tea packaging with botanical motifs.", size: "short", likes: 173, tags: ["tea", "organic"] },
  { slug: "rift-flyer", title: "Rift Gallery", category: "Flyers", year: 2024, description: "Art exhibition opening invitations.", size: "tall", likes: 148, tags: ["art", "gallery"] },
  { slug: "core-ui", title: "Core Platform", category: "UI Design", year: 2023, description: "SaaS platform redesign and design system.", size: "tall", likes: 378, tags: ["saas", "system"] },
  { slug: "pixel-social", title: "Pixel Agency", category: "Social Media", year: 2023, description: "LinkedIn and Twitter content templates.", size: "medium", likes: 196, tags: ["linkedin", "b2b"] },
  { slug: "crest-logo", title: "Crest Capital", category: "Logo", year: 2025, description: "Financial services emblem and wordmark.", size: "medium", likes: 214, tags: ["finance", "emblem"] },
  { slug: "ledger-print", title: "Ledger Journal", category: "Print", year: 2024, description: "Academic journal layout and cover design.", size: "short", likes: 159, tags: ["journal", "academic"] },
  { slug: "wave-motion", title: "Wave Studio", category: "Motion Graphics", year: 2025, description: "Studio ident and transition animations.", size: "medium", likes: 423, tags: ["ident", "studio"] },
  { slug: "haven-brand", title: "Haven Hotels", category: "Branding", year: 2024, description: "Boutique hotel brand and wayfinding.", size: "tall", likes: 267, tags: ["hotel", "wayfinding"] },
  { slug: "grain-packaging", title: "Grain Co.", category: "Packaging", year: 2023, description: "Cereal box redesign with bold graphics.", size: "wide", likes: 181, tags: ["food", "retail"] },
  { slug: "sonic-flyer", title: "Sonic Arena", category: "Flyers", year: 2025, description: "Concert tour promotional materials.", size: "medium", likes: 229, tags: ["concert", "tour"] },
  { slug: "flow-ui", title: "Flow Meditation", category: "UI Design", year: 2024, description: "Wellness app with calming interface patterns.", size: "short", likes: 302, tags: ["wellness", "app"] },
  { slug: "rise-social", title: "Rise Fitness", category: "Social Media", year: 2025, description: "Fitness brand social media campaign.", size: "tall", likes: 278, tags: ["fitness", "campaign"] },
];

export const portfolioItems: PortfolioItem[] = items.map((item, index) => ({
  ...item,
  id: `portfolio-${index + 1}`,
  size: sizes[index % sizes.length],
}));

export const PAGE_SIZE = 12;

export function filterPortfolio(
  items: PortfolioItem[],
  category: string,
  query: string,
): PortfolioItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory =
      category === "All" || item.category === category;

    const matchesQuery =
      !normalizedQuery ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery) ||
      item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesQuery;
  });
}

export function paginatePortfolio(
  items: PortfolioItem[],
  page: number,
  pageSize = PAGE_SIZE,
): PortfolioItem[] {
  return items.slice(0, page * pageSize);
}

export function hasMorePortfolio(
  items: PortfolioItem[],
  page: number,
  pageSize = PAGE_SIZE,
): boolean {
  return page * pageSize < items.length;
}
