import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetadata = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "",
  noIndex = false,
}: PageMetadata = {}): Metadata {
  const pageTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title;
  const url = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      title: pageTitle,
      description,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [siteConfig.ogImage],
    },
  };
}
