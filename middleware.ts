import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const ProtectedRoutes = ["/home", "/task", "/invitations", "/profile"];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  const { pathname } = request.nextUrl;

  if (
    !isLoggedIn &&
    ProtectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (isLoggedIn && (pathname === "/auth" || pathname === "/")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (pathname === "/" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
