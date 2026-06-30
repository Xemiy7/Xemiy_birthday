import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type ImageAspect = "portrait" | "landscape" | "square" | "cinematic" | "auto";

interface PremiumImageProps extends Omit<ImageProps, "className"> {
  aspect?: ImageAspect;
  frame?: boolean;
  reveal?: boolean;
  overlay?: boolean;
  className?: string;
  containerClassName?: string;
}

const aspectClasses: Record<Exclude<ImageAspect, "auto">, string> = {
  portrait: "image-portrait",
  landscape: "image-landscape",
  square: "image-square",
  cinematic: "image-cinematic",
};

export function PremiumImage({
  aspect = "landscape",
  frame = true,
  reveal = true,
  overlay = false,
  className,
  containerClassName,
  alt,
  ...props
}: PremiumImageProps) {
  return (
    <div
      className={cn(
        frame && "image-frame",
        reveal && "image-reveal",
        aspect !== "auto" && aspectClasses[aspect],
        "relative w-full",
        containerClassName,
      )}
    >
      <Image
        alt={alt}
        className={cn("image-cover", className)}
        {...props}
      />
      {overlay && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mono-1000/60 via-transparent to-transparent"
          aria-hidden
        />
      )}
    </div>
  );
}
