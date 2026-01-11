import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/artworks"];
  const authRoutes = ["/login", "/register"];
  const protectedRoutes = [
    "/artists",
    "/auctions",
    "/checkout",
    "/dashboard",
    "/admin",
  ];

  const isHomePage = pathname === "/";
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check authentication status
  const authResult = token ? await isAuthenticated(token.value) : null;

  const requestHeaders = new Headers(request.headers);
  if (authResult?.isAuthenticated && authResult.user) {
    requestHeaders.set("x-user-id", authResult.user.userId);
    requestHeaders.set("x-user-role", authResult.user.role);
  }

  // Allow public routes for everyone
  if (isHomePage || isPublicRoute) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // If user logged in and trying to access auth page redirect them to artworks
  if (isAuthRoute && authResult?.isAuthenticated) {
    return NextResponse.redirect(new URL("/artworks", request.url));
  }

  // If user is not logged in and trying to access auth pages allow them
  if (isAuthRoute && !authResult?.isAuthenticated) {
    return NextResponse.next();
  }

  // If user is not logged in and trying to access protected routes redirect to login
  if (!token || !authResult?.isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
