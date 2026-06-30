"use client";

import { useState } from "react";
import { CinematicReveal } from "@/components/project/cinematic-reveal";
import { ZoomableImage, FullscreenViewer } from "@/components/project/image-viewer";
import type { GalleryImage } from "@/types/project-detail";

interface ProjectGalleryProps {
  images: GalleryImage[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const openViewer = (index: number) => {
    setViewerIndex(index);
    setViewerOpen(true);
  };

  return (
    <>
      <div className="grid-2 gap-4 md:gap-6">
        {images.map((image, index) => (
          <CinematicReveal
            key={image.id}
            delay={index * 0.08}
            direction={index % 3 === 0 ? "scale" : "up"}
            className={image.aspect === "wide" ? "col-span-full" : ""}
          >
            <ZoomableImage
              image={image}
              onOpen={() => openViewer(index)}
            />
          </CinematicReveal>
        ))}
      </div>

      <FullscreenViewer
        images={images}
        initialIndex={viewerIndex}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </>
  );
}
