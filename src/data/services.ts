export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    id: "brand-identity",
    title: "Brand Identity",
    description:
      "Complete visual systems — logotypes, typography, color logic in monochrome, and brand guidelines.",
    tags: ["Logotype", "Guidelines", "Systems"],
  },
  {
    id: "editorial",
    title: "Editorial Design",
    description:
      "Magazines, lookbooks, and publications with refined grid systems and typographic hierarchy.",
    tags: ["Layout", "Typography", "Print"],
  },
  {
    id: "art-direction",
    title: "Art Direction",
    description:
      "Campaign concepts, visual narratives, and creative direction for brands that demand distinction.",
    tags: ["Campaigns", "Concept", "Direction"],
  },
  {
    id: "digital",
    title: "Digital Design",
    description:
      "Premium web experiences, interfaces, and digital touchpoints with cinematic interaction design.",
    tags: ["UI", "Web", "Motion"],
  },
];
