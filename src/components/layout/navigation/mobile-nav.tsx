"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative z-50 flex h-10 w-10 items-center justify-center text-foreground transition-opacity hover:opacity-60"
      >
        {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex h-full flex-col items-center justify-center"
            >
              <ul className="flex flex-col items-center gap-10">
                {mainNavigation.map((item, index) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium tracking-[0.3em] uppercase transition-colors",
                        pathname === item.href
                          ? "text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </ul>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
