"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNavigation } from "@/constants/navigation";
import { useActiveHash } from "@/hooks/use-active-hash";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const activeHash = useActiveHash();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    } else {
      toggleRef.current?.focus();
    }
  }, [open]);

  return (
    <div className="md:hidden">
      <m.button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: duration.fast, ease: easing.premium }}
        className="relative z-50 flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/4 text-foreground transition-premium hover:border-white/20 hover:bg-white/8"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <m.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: duration.fast }}
            >
              <X className="size-5" strokeWidth={1.5} />
            </m.span>
          ) : (
            <m.span
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: duration.fast }}
            >
              <Menu className="size-5" strokeWidth={1.5} />
            </m.span>
          )}
        </AnimatePresence>
      </m.button>

      <AnimatePresence>
        {open && (
          <m.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.slow, ease: easing.premium }}
            className="fixed inset-0 z-40 bg-background/96 backdrop-blur-2xl"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex h-full flex-col items-center justify-center"
            >
              <ul className="flex flex-col items-center gap-10" role="list">
                {mainNavigation.map((item, index) => {
                  const isHash = item.href.includes("#");
                  const hashPart = isHash ? item.href.split("#")[1] : null;
                  const isActive = isHash
                    ? pathname === "/" && activeHash === `#${hashPart}`
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                  return (
                    <m.li
                      key={item.href}
                      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{
                        duration: duration.cinematic,
                        delay: index * 0.07,
                        ease: easing.premium,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "text-sm font-medium tracking-[0.3em] uppercase transition-colors-premium",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    </m.li>
                  );
                })}
              </ul>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
