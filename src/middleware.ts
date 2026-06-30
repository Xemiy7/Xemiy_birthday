import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, verifyAdminToken } from "@/lib/admin/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();

  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/admin/login")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isAuthed = token ? await verifyAdminToken(token) : false;

  if (pathname.startsWith("/api/admin") && !isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !isAuthed) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
