import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// this is the middleware that will run on every request

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyEmail";

  const token = req.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    // if the user is logged in and trying to access login or signup page, redirect to profile
    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }

  if (!isPublicPath && !token) {
    // if the user is not logged in and trying to access a protected page, redirect to login
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/:path*",
    "/login",
    "/signup",
    "/verifyEmail"
  ]
};
