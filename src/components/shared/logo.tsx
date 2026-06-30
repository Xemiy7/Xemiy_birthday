import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoVariant = "wordmark" | "icon";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}

const sizes = {
  wordmark: { width: 140, height: 40, hero: { width: 420, height: 120 } },
  icon: { width: 32, height: 32 },
} as const;

export function Logo({
  variant = "wordmark",
  className,
  priority = false,
}: LogoProps) {
  const src =
    variant === "wordmark"
      ? siteConfig.logos.wordmark
      : siteConfig.logos.icon;

  const { width, height } = sizes[variant];

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — Home`}
      className={cn(
        "relative inline-flex shrink-0 transition-opacity duration-500 hover:opacity-70",
        className,
      )}
    >
      <Image
        src={src}
        alt={siteConfig.name}
        width={width}
        height={height}
        priority={priority}
        className={cn(
          "object-contain",
          variant === "wordmark" ? "h-7 w-auto md:h-8" : "h-8 w-8",
          className,
        )}
      />
    </Link>
  );
}

interface HeroLogoProps {
  className?: string;
}

export function HeroLogo({ className }: HeroLogoProps) {
  const { width, height } = sizes.wordmark.hero;

  return (
    <div className={cn("relative", className)}>
      <Image
        src={siteConfig.logos.wordmark}
        alt={siteConfig.name}
        width={width}
        height={height}
        priority
        className="h-auto w-full max-w-[min(90vw,28rem)] object-contain md:max-w-[32rem]"
      />
    </div>
  );
}
