"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Heart } from "lucide-react";
import { AnimatedCounter } from "@/components/likes/animated-counter";
import { LikeParticles } from "@/components/likes/like-particles";
import { useLikesOptional } from "@/providers/likes-provider";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

type LikeButtonVariant = "icon" | "badge" | "full";

interface LikeButtonProps {
  projectId: string;
  fallbackCount?: number;
  variant?: LikeButtonVariant;
  className?: string;
  showCount?: boolean;
}

export function LikeButton({
  projectId,
  fallbackCount = 0,
  variant = "icon",
  className,
  showCount = true,
}: LikeButtonProps) {
  const likes = useLikesOptional();
  const [particleTrigger, setParticleTrigger] = useState(0);

  const isLiked = likes?.isLiked(projectId) ?? false;
  const count = likes?.getCount(projectId, fallbackCount) ?? fallbackCount;
  const isToggling = likes?.isToggling(projectId) ?? false;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!likes || isToggling) return;

    const wasLiked = isLiked;
    await likes.toggleLike(projectId);

    if (!wasLiked) {
      setParticleTrigger((t) => t + 1);
    }
  };

  if (variant === "badge") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={!likes || isToggling}
        aria-label={isLiked ? "Unlike" : "Like"}
        aria-pressed={isLiked}
        className={cn(
          "relative flex items-center gap-1.5 rounded-full bg-mono-1000/60 px-2.5 py-1 text-caption backdrop-blur-sm transition-premium hover:bg-mono-1000/80",
          className,
        )}
      >
        <m.div
          animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.4, ease: easing.premium }}
        >
          <Heart
            className={cn(
              "size-3 transition-colors-premium",
              isLiked ? "fill-foreground text-foreground" : "",
            )}
            strokeWidth={1.5}
          />
        </m.div>
        {showCount && <AnimatedCounter value={count} />}
        <LikeParticles trigger={particleTrigger} />
      </button>
    );
  }

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={!likes || isToggling}
        aria-label={isLiked ? "Unlike project" : "Like project"}
        aria-pressed={isLiked}
        className={cn(
          "relative flex items-center gap-2 rounded-full border px-5 py-2.5 text-caption transition-premium",
          isLiked
            ? "border-foreground/30 bg-white/8"
            : "border-white/15 bg-white/4 hover:border-white/25 hover:bg-white/6",
          className,
        )}
      >
        <m.div
          className="relative"
          animate={isLiked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
          transition={{ duration: 0.45, ease: easing.premium }}
        >
          <Heart
            className={cn(
              "size-4 transition-colors-premium",
              isLiked ? "fill-foreground text-foreground" : "text-foreground/80",
            )}
            strokeWidth={1.5}
          />
          <LikeParticles trigger={particleTrigger} />
        </m.div>
        {showCount && (
          <>
            <AnimatedCounter value={count} />
            <span className="text-muted-foreground">
              {count === 1 ? "like" : "likes"}
            </span>
          </>
        )}
      </button>
    );
  }

  // icon variant (default)
  return (
    <m.button
      type="button"
      onClick={handleClick}
      disabled={!likes || isToggling}
      aria-label={isLiked ? "Unlike project" : "Like project"}
      aria-pressed={isLiked}
      whileTap={{ scale: 0.85 }}
      className={cn(
        "relative flex size-9 items-center justify-center rounded-full glass transition-premium hover:bg-white/12",
        className,
      )}
    >
      <m.div
        animate={isLiked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, ease: easing.premium }}
      >
        <Heart
          className={cn(
            "size-4 transition-colors-premium",
            isLiked ? "fill-foreground text-foreground" : "text-foreground/80",
          )}
          strokeWidth={1.5}
        />
      </m.div>
      <LikeParticles trigger={particleTrigger} />
    </m.button>
  );
}
