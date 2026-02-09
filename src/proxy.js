import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("session")?.value;

  // If signed in and on auth pages, redirect to dashboard
  if ((pathname === "/admin/sign-in" || pathname === "/admin/forget-password") && sessionCookie) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Protect admin routes (except auth pages)
  if (pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/sign-in") &&
    !pathname.startsWith("/admin/forget-password")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
