"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { blurReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <m.div
      className={cn(className)}
      variants={blurReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay }}
    >
      {children}
    </m.div>
  );
}
