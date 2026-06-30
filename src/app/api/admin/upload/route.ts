import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary is not configured." },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "xemiy/projects";

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (buffer.length > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds 10MB." }, { status: 400 });
    }

    const result = await uploadToCloudinary(buffer, folder);

    return NextResponse.json({
      url: result.url,
      publicId: result.publicId,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
