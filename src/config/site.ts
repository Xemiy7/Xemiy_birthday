export const siteConfig = {
  name: "xemiy",
  title: "xemiy — Graphics Designer",
  description:
    "Premium visual identity, brand systems, and editorial design by xemiy.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/images/xemiy-wordmark.png",
  creator: "xemiy",
  role: "Graphics Designer",
  keywords: [
    "xemiy",
    "graphics designer",
    "brand identity",
    "visual design",
    "portfolio",
    "creative direction",
  ],
  locale: "en_US",
  themeColor: "#0a0a0a",
  logos: {
    wordmark: "/images/xemiy-wordmark.png",
    icon: "/images/xemiy-icon.png",
  },
} as const;

export type SiteConfig = typeof siteConfig;
