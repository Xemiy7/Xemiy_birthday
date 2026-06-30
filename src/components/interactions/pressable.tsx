"use client";

import { m, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

type PressableProps = HTMLMotionProps<"div"> & {
  tapScale?: number;
};

/** Subtle spring press feedback for wrapped interactives. */
export function Pressable({
  children,
  className,
  tapScale = 0.97,
  ...props
}: PressableProps) {
  return (
    <m.div
      className={cn("inline-flex", className)}
      whileTap={{ scale: tapScale }}
      transition={{ duration: duration.fast, ease: easing.premium }}
      {...props}
    >
      {children}
    </m.div>
  );
}
