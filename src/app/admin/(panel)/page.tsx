"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatsCard } from "@/components/admin/stats-card";
import type { AdminAnalytics } from "@/types/admin";
import { buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const s = stats ?? {
    totalProjects: 0,
    featuredProjects: 0,
    publishedProjects: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalLikes: 0,
  };

  return (
    <div className="stack-xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-display-sm">Dashboard</h1>
          <p className="text-body-sm text-muted-foreground mt-2">
            Portfolio analytics and overview
          </p>
        </div>
        <Link href="/admin/projects/new" className={buttonVariants({ variant: "primary" })}>
          New Project
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatsCard label="Total Projects" value={s.totalProjects} sub={`${s.publishedProjects} published`} />
        <StatsCard label="Featured" value={s.featuredProjects} />
        <StatsCard label="Total Likes" value={s.totalLikes} />
        <StatsCard label="Bookings" value={s.totalBookings} sub={`${s.pendingBookings} pending`} />
        <StatsCard label="Published" value={s.publishedProjects} />
        <StatsCard
          label="Drafts"
          value={s.totalProjects - s.publishedProjects}
        />
      </div>
    </div>
  );
}
