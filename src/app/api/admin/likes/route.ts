import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ counts: [], recent: [] });
  }

  const supabase = createServerClient();

  const [countsRes, recentRes] = await Promise.all([
    supabase
      .from("project_like_counts")
      .select("project_id, count")
      .order("count", { ascending: false }),
    supabase
      .from("project_likes")
      .select("project_id, visitor_id, created_at")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  return NextResponse.json({
    counts: countsRes.data ?? [],
    recent: recentRes.data ?? [],
  });
}
