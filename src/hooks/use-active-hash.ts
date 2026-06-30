"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const HASH_SECTIONS = ["about", "services", "process", "contact", "work"] as const;

/** Tracks which on-page hash section is in view (homepage sections). */
export function useActiveHash() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash(null);
      return;
    }

    const elements = HASH_SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveHash(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return activeHash;
}
