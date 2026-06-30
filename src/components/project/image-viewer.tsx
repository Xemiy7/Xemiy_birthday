"use client";

import { useCallback, useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { MonochromePlaceholder } from "@/components/shared/monochrome-placeholder";
import type { GalleryImage } from "@/types/project-detail";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

const aspectClasses: Record<GalleryImage["aspect"], string> = {
  landscape: "aspect-[16/10]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

interface FullscreenViewerProps {
  images: GalleryImage[];
  initialIndex: number;
  open: boolean;
  onClose: () => void;
}

export function FullscreenViewer({
  images,
  initialIndex,
  open,
  onClose,
}: FullscreenViewerProps) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, goNext, goPrev]);

  const current = images[index];

  return (
    <AnimatePresence>
      {open && current && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.normal }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-mono-1000/95 backdrop-blur-xl"
          role="dialog"
          aria-modal
          aria-label="Image viewer"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute right-6 top-6 z-10 flex size-11 items-center justify-center rounded-full glass pressable transition-premium hover:bg-white/12 hover:scale-105"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-4 z-10 flex size-11 items-center justify-center rounded-full glass pressable transition-premium hover:bg-white/12 hover:scale-105 md:left-8"
          >
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-4 z-10 flex size-11 items-center justify-center rounded-full glass pressable transition-premium hover:bg-white/12 hover:scale-105 md:right-8"
          >
            <ChevronRight className="size-5" strokeWidth={1.5} />
          </button>

          <m.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            transition={{ duration: duration.cinematic, ease: easing.premium }}
            className="mx-16 flex max-h-[85vh] max-w-5xl flex-col items-center"
          >
            <div className={cn("image-frame w-full overflow-hidden rounded-xl", aspectClasses[current.aspect])}>
              <MonochromePlaceholder
                variant={current.variant}
                className="h-full w-full"
                label={current.caption}
              />
            </div>
            <p className="text-caption mt-4 text-center">{current.caption}</p>
            <p className="text-mono mt-1 text-muted-foreground">
              {index + 1} / {images.length}
            </p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

interface ZoomableImageProps {
  image: GalleryImage;
  onOpen: () => void;
  className?: string;
}

export function ZoomableImage({ image, onOpen, className }: ZoomableImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View ${image.caption} fullscreen`}
      className={cn(
        "group image-frame image-shine relative w-full overflow-hidden rounded-xl text-left pressable",
        aspectClasses[image.aspect],
        className,
      )}
    >
      <m.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: duration.slow, ease: easing.premium }}
      >
        <MonochromePlaceholder
          variant={image.variant}
          className="h-full w-full"
          label={image.caption}
        />
      </m.div>

      <div className="absolute inset-0 bg-mono-1000/0 transition-colors duration-500 group-hover:bg-mono-1000/20" />

      <m.div
        className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full glass opacity-0 group-hover:opacity-100"
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
        transition={{ duration: duration.fast }}
      >
        <ZoomIn className="size-4" strokeWidth={1.5} />
      </m.div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-mono-1000/70 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="text-caption">{image.caption}</p>
      </div>
    </button>
  );
}
