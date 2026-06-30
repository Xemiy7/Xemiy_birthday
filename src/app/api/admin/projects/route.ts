import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { slugify } from "@/lib/admin/utils";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json([]);
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    data?.map((p) => ({
      ...p,
      gallery_images: Array.isArray(p.gallery_images) ? p.gallery_images : [],
    })) ?? [],
  );
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const slug = body.slug || slugify(body.title);

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("projects")
      .insert({
        slug,
        title: body.title,
        description: body.description,
        long_description: body.long_description || null,
        category: body.category,
        client: body.client || null,
        year: body.year,
        software: body.software ?? [],
        tags: body.tags ?? [],
        cover_image: body.cover_image || null,
        gallery_images: body.gallery_images ?? [],
        before_image: body.before_image || null,
        after_image: body.after_image || null,
        featured: body.featured ?? false,
        size: body.size ?? "medium",
        likes_seed: body.likes_seed ?? 0,
        published: body.published ?? true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}
