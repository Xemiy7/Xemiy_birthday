"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { mainNavigation } from "@/constants/navigation";
import { useActiveHash } from "@/hooks/use-active-hash";
import { cn } from "@/lib/utils";
import { easing, duration } from "@/lib/design-system";

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const activeHash = useActiveHash();

  return (
    <nav aria-label="Main navigation" className={cn(className)}>
      <ul className="flex items-center gap-8 md:gap-10">
        {mainNavigation.map((item, index) => {
          const isHash = item.href.includes("#");
          const hashPart = isHash ? item.href.split("#")[1] : null;

          const isActive = isHash
            ? pathname === "/" && activeHash === `#${hashPart}`
            : item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <m.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: duration.cinematic,
                  delay: 0.15 + index * 0.08,
                  ease: easing.premium,
                }}
              >
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "nav-link group relative",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  <m.span
                    className="absolute -bottom-1 left-0 h-px bg-foreground"
                    initial={false}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: duration.slow, ease: easing.premium }}
                    aria-hidden
                  />
                </Link>
              </m.div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
