"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Logo } from "@/components/shared/logo";
import { MainNav } from "@/components/layout/navigation/main-nav";
import { MobileNav } from "@/components/layout/navigation/mobile-nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <m.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-premium glass-subtle",
        scrolled && "glass-strong border-b border-white/8",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
        <Logo priority />

        <MainNav className="hidden md:flex" />
        <MobileNav />
      </div>
    </m.header>
  );
}
