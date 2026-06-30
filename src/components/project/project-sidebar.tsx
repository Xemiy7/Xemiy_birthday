"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { ProjectSection } from "@/types/project-detail";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

interface ProjectSidebarProps {
  title: string;
  sections: ProjectSection[];
}

export function ProjectSidebar({ title, sections }: ProjectSidebarProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 stack-lg">
        <Link
          href="/work"
          className="group flex items-center gap-2 text-caption transition-colors-premium hover:text-foreground"
        >
          <ArrowLeft
            className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
            strokeWidth={1.5}
          />
          All Work
        </Link>

        <div className="stack-sm">
          <p className="text-overline">Project</p>
          <p className="text-title-sm line-clamp-2">{title}</p>
        </div>

        <nav aria-label="Project sections" className="stack-xs border-t border-white/8 pt-6">
          {sections.map((section) => {
            const isActive = active === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollTo(section.id)}
                className={cn(
                  "relative flex w-full items-center py-2 text-left text-caption transition-colors-premium",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <m.span
                  className="absolute -left-4 h-px bg-foreground"
                  initial={false}
                  animate={{ width: isActive ? 12 : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: duration.normal, ease: easing.premium }}
                />
                {section.label}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
