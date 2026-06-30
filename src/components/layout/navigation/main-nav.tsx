"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { mainNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className={cn(className)}>
      <ul className="flex items-center gap-8 md:gap-10">
        {mainNavigation.map((item, index) => {
          const isHash = item.href.includes("#");
          const isActive = isHash
            ? false
            : item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <m.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative text-overline transition-colors-premium",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-500 ease-out",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
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
