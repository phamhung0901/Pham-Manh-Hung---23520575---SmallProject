import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/api/admin")) {
    const apiKey = process.env.ADMIN_API_KEY;
    const headerKey = req.headers.get("x-api-key");
    if (!apiKey || headerKey !== apiKey) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
