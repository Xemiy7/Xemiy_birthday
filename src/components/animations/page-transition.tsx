"use client";

import { AnimatePresence, m } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { blurFade } from "@/lib/animations/motion-variants";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={pathname}
        variants={blurFade}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex-1"
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
