import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import type { BookingSubmission } from "@/types/booking";

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Booking system is not configured. Please set Supabase environment variables.",
        },
        { status: 503 },
      );
    }

    const body = (await request.json()) as BookingSubmission;

    const required = [
      "bookingType",
      "name",
      "email",
      "phone",
      "country",
      "projectType",
      "budget",
      "description",
      "preferredStyle",
    ] as const;

    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 },
      );
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        booking_type: body.bookingType,
        project_slug: body.projectSlug ?? null,
        project_title: body.projectTitle ?? null,
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        country: body.country,
        project_type: body.projectType,
        budget: body.budget,
        deadline: body.deadline || null,
        description: body.description.trim(),
        preferred_style: body.preferredStyle,
        attachment_urls: body.attachmentUrls ?? [],
        reference_image_urls: body.referenceImageUrls ?? [],
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase booking insert error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to save booking. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      message: "Booking submitted successfully.",
    });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
