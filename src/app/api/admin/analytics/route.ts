import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import type { AdminAnalytics } from "@/types/admin";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const empty: AdminAnalytics = {
    totalProjects: 0,
    featuredProjects: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalLikes: 0,
    publishedProjects: 0,
  };

  if (!isSupabaseConfigured()) {
    return NextResponse.json(empty);
  }

  try {
    const supabase = createServerClient();

    const [
      projectsRes,
      featuredRes,
      publishedRes,
      bookingsRes,
      pendingRes,
      likesRes,
    ] = await Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }).eq("featured", true),
      supabase.from("projects").select("id", { count: "exact", head: true }).eq("published", true),
      supabase.from("bookings").select("id", { count: "exact", head: true }),
      supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("project_likes").select("id", { count: "exact", head: true }),
    ]);

    return NextResponse.json({
      totalProjects: projectsRes.count ?? 0,
      featuredProjects: featuredRes.count ?? 0,
      publishedProjects: publishedRes.count ?? 0,
      totalBookings: bookingsRes.count ?? 0,
      pendingBookings: pendingRes.count ?? 0,
      totalLikes: likesRes.count ?? 0,
    } satisfies AdminAnalytics);
  } catch {
    return NextResponse.json(empty);
  }
}
