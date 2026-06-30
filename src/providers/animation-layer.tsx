"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { CursorGlow } from "@/components/animations/cursor-glow";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { easing, duration } from "@/lib/design-system";

const SESSION_KEY = "xemiy-session-loaded";

interface AnimationLayerProps {
  children: React.ReactNode;
}

export function AnimationLayer({ children }: AnimationLayerProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isAdmin = pathname?.startsWith("/admin");
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isAdmin || prefersReducedMotion) return;

    const alreadyLoaded = sessionStorage.getItem(SESSION_KEY);
    if (alreadyLoaded) return;

    setShowLoader(true);
    const start = Date.now();
    const minDuration = 900;

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minDuration - elapsed);
      window.setTimeout(() => {
        setShowLoader(false);
        sessionStorage.setItem(SESSION_KEY, "1");
      }, remaining);
    };

    if (document.readyState === "complete") {
      finish();
      return;
    }

    window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, [isAdmin, prefersReducedMotion]);

  return (
    <>
      {!isAdmin && <CursorGlow />}
      {children}
      <AnimatePresence>
        {showLoader && !isAdmin && (
          <m.div
            key="cinematic-loader"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: duration.cinematic, ease: easing.premium }}
          >
            <m.div
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: duration.slow, ease: easing.premium }}
              className="stack-md items-center"
            >
              <Logo />
              <div className="loader-line" aria-hidden />
              <p className="text-overline text-muted-foreground">xemiy</p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
