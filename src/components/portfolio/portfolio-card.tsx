"use client";

import { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Bookmark } from "lucide-react";
import { LikeButton } from "@/components/likes/like-button";
import { Card3D } from "@/components/animations/card-3d";
import { ImageDistortion } from "@/components/animations/image-distortion";
import { MonochromePlaceholder } from "@/components/shared/monochrome-placeholder";
import type { PortfolioItem } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

const sizeHeights: Record<PortfolioItem["size"], string> = {
  short: "h-44 sm:h-48",
  medium: "h-64 sm:h-72",
  tall: "h-80 sm:h-96",
  wide: "h-52 sm:h-56",
};

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  isSaved: boolean;
  onSave: () => void;
}

export function PortfolioCard({
  item,
  index,
  isSaved,
  onSave,
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const placeholderVariant = ((index % 4) + 1) as 1 | 2 | 3 | 4;

  return (
    <m.article
      layout
      layoutId={`card-${item.id}`}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{
        duration: duration.cinematic,
        delay: (index % 8) * 0.05,
        ease: easing.premium,
      }}
      className="group break-inside-avoid mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card3D intensity={5}>
        <div
          className={cn(
            "image-frame image-shine relative overflow-hidden rounded-2xl",
            sizeHeights[item.size],
          )}
        >
          <Link
            href={`/work/${item.slug}`}
            className="absolute inset-0 z-[1]"
            aria-label={`View ${item.title}`}
          />

          <ImageDistortion intensity={2.5} className="absolute inset-0 z-0">
            <m.div
              className="h-full w-full"
              animate={{ scale: isHovered ? 1.04 : 1 }}
              transition={{ duration: duration.slow, ease: easing.premium }}
            >
              <MonochromePlaceholder
                variant={placeholderVariant}
                className="h-full w-full"
                label={item.title}
              />
            </m.div>
          </ImageDistortion>

        <AnimatePresence>
          {isHovered && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.fast }}
              className="absolute inset-0 glass-strong"
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-mono-1000/80 via-mono-1000/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

        <div className="absolute inset-x-0 top-0 z-[2] flex items-center justify-between p-3">
          <m.span
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -8 }}
            transition={{ duration: duration.normal, ease: easing.premium }}
            className="rounded-full glass px-3 py-1 text-overline"
          >
            {item.category}
          </m.span>

          <div className="relative z-[2] flex gap-2">
            <div onClick={(e) => e.preventDefault()} onKeyDown={(e) => e.stopPropagation()}>
              <LikeButton
                projectId={item.id}
                fallbackCount={item.likes}
                variant="icon"
              />
            </div>

            <m.button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSave();
              }}
              aria-label={isSaved ? "Unsave project" : "Save project"}
              whileTap={{ scale: 0.85 }}
              className="flex size-9 items-center justify-center rounded-full glass transition-premium hover:bg-white/12"
            >
              <m.div
                animate={
                  isSaved
                    ? { y: [0, -4, 0], scale: [1, 1.2, 1] }
                    : { y: 0, scale: 1 }
                }
                transition={{ duration: 0.45, ease: easing.premium }}
              >
                <Bookmark
                  className={cn(
                    "size-4 transition-colors-premium",
                    isSaved
                      ? "fill-foreground text-foreground"
                      : "text-foreground/80",
                  )}
                  strokeWidth={1.5}
                />
              </m.div>
            </m.button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-4">
          <m.div
            initial={false}
            animate={{ y: isHovered ? 0 : 8, opacity: isHovered ? 1 : 0.85 }}
            transition={{ duration: duration.normal, ease: easing.premium }}
            className="stack-xs"
          >
            <h3 className="text-title-sm line-clamp-1">{item.title}</h3>
            <p className="text-caption line-clamp-2 opacity-80">
              {item.description}
            </p>
          </m.div>

          <m.span
            className="mt-3 flex items-center gap-2 text-overline text-foreground"
            initial={false}
            animate={{ x: isHovered ? 0 : -4, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: duration.normal, ease: easing.premium }}
          >
            View Project
            <m.span
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: duration.normal, ease: easing.premium }}
            >
              <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
            </m.span>
          </m.span>
        </div>

        <m.div
          className="absolute bottom-4 right-4 z-[2]"
          initial={false}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: duration.fast }}
        >
          <LikeButton
            projectId={item.id}
            fallbackCount={item.likes}
            variant="badge"
          />
        </m.div>
        </div>
      </Card3D>

      <div className="mt-3 flex items-center justify-between px-1 md:hidden">
        <span className="text-caption">{item.category}</span>
        <span className="text-mono text-caption">{item.year}</span>
      </div>
    </m.article>
  );
}
