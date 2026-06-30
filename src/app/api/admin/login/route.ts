import { NextResponse } from "next/server";
import {
  COOKIE_NAME,
  createAdminToken,
  validateAdminPassword,
} from "@/lib/admin/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || !validateAdminPassword(password)) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = await createAdminToken();
    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
