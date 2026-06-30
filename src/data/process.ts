export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "Deep immersion into your brand, audience, and ambition. Research, references, and strategic clarity.",
  },
  {
    step: "02",
    title: "Define",
    description:
      "Concept development and visual direction. Mood, tone, and a singular creative north star.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "Refined execution across every touchpoint. Iteration with precision until every detail earns its place.",
  },
  {
    step: "04",
    title: "Deliver",
    description:
      "Final assets, guidelines, and handoff. A system built to scale with your brand's evolution.",
  },
];
