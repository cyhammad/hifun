import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("session")?.value;

  // If signed in and on sign-in page, redirect to dashboard
  if (pathname === "/admin/sign-in" && sessionCookie) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Protect admin routes (except sign-in)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/sign-in")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
