"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Plus,
  Calendar,
  Heart,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/projects/new", label: "New Project", icon: Plus },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/likes", label: "Likes", icon: Heart },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/8 glass-strong">
      <div className="border-b border-white/8 p-6">
        <Link href="/admin" className="stack-xs">
          <span className="text-overline">xemiy</span>
          <span className="text-title-sm">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4" aria-label="Admin navigation">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-body-sm transition-premium",
                isActive
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
            >
              <Icon className="size-4" strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/8 p-4">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-body-sm text-muted-foreground transition-premium hover:bg-white/5 hover:text-foreground"
        >
          <LogOut className="size-4" strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
