import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { portfolioItems } from "@/data/portfolio";

const defaultCounts = Object.fromEntries(
  portfolioItems.map((p) => [p.id, p.likes]),
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids")?.split(",").filter(Boolean) ?? [];
    const visitorId = searchParams.get("visitorId") ?? "";

    if (!isSupabaseConfigured()) {
      const counts: Record<string, number> = {};
      for (const id of ids) counts[id] = defaultCounts[id] ?? 0;
      return NextResponse.json({ counts, liked: [] });
    }

    const supabase = createServerClient();

    const counts: Record<string, number> = {};
    for (const id of ids) {
      counts[id] = defaultCounts[id] ?? 0;
    }

    if (ids.length > 0) {
      const { data: countRows } = await supabase
        .from("project_like_counts")
        .select("project_id, count")
        .in("project_id", ids);

      countRows?.forEach((row) => {
        const base = defaultCounts[row.project_id] ?? 0;
        counts[row.project_id] = base + Number(row.count);
      });
    }

    let liked: string[] = [];
    if (visitorId && ids.length > 0) {
      const { data: likeRows } = await supabase
        .from("project_likes")
        .select("project_id")
        .eq("visitor_id", visitorId)
        .in("project_id", ids);

      liked = likeRows?.map((r) => r.project_id) ?? [];
    }

    return NextResponse.json({ counts, liked });
  } catch (err) {
    console.error("Likes GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch likes." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Likes not configured." },
        { status: 503 },
      );
    }

    const { projectId, visitorId, action } = await request.json();

    if (!projectId || !visitorId) {
      return NextResponse.json(
        { error: "Missing projectId or visitorId." },
        { status: 400 },
      );
    }

    const supabase = createServerClient();

    if (action === "unlike") {
      const { error } = await supabase
        .from("project_likes")
        .delete()
        .eq("project_id", projectId)
        .eq("visitor_id", visitorId);

      if (error) throw error;
      return NextResponse.json({ success: true, liked: false });
    }

    const { error } = await supabase.from("project_likes").insert({
      project_id: projectId,
      visitor_id: visitorId,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Already liked.", liked: true },
          { status: 409 },
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true, liked: true });
  } catch (err) {
    console.error("Likes POST error:", err);
    return NextResponse.json(
      { error: "Failed to update like." },
      { status: 500 },
    );
  }
}
