"use client";

import Link from "next/link";
import { m } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function InteractiveCard({
  children,
  className,
  href,
  onClick,
}: InteractiveCardProps) {
  const classes = cn(
    "card card-interactive card-press block",
    className,
  );

  const motionProps = {
    whileHover: { y: -2 },
    transition: { duration: duration.normal, ease: easing.premium },
  };

  if (href) {
    return (
      <m.div {...motionProps}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </m.div>
    );
  }

  return (
    <m.button
      type="button"
      onClick={onClick}
      className={cn(classes, "w-full text-left")}
      {...motionProps}
      whileTap={{ scale: 0.995 }}
    >
      {children}
    </m.button>
  );
}
