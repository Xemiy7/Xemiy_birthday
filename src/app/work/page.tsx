import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PortfolioPage } from "@/components/portfolio/portfolio-page";

export const metadata: Metadata = createMetadata({
  title: "Work",
  description:
    "Explore xemiy's portfolio — branding, packaging, UI design, motion graphics, and more.",
  path: "/work",
});

export default function WorkPage() {
  return <PortfolioPage />;
}
