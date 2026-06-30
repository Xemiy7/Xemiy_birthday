"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { revealMask } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export function Reveal({ children, className }: RevealProps) {
  return (
    <m.div
      className={cn(className)}
      variants={revealMask}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%" }}
    >
      {children}
    </m.div>
  );
}
