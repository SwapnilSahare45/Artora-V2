import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Check authentication status
  const authResult = token ? await isAuthenticated(token.value) : null;
  const requestHeaders = new Headers(request.headers);
  const userRole = authResult?.user?.role;

  if (authResult?.isAuthenticated && authResult.user) {
    requestHeaders.set("x-user-id", authResult.user.userId);
    requestHeaders.set("x-user-role", authResult.user.role);
  }

  // Define Route Categories
  const publicRoutes = ["/artworks"];
  const authRoutes = ["/login", "/register"];

  const isHomePage = pathname === "/";
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = pathname.startsWith("/admin");

  // Allow public routes for everyone
  if (isHomePage || isPublicRoute) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Handle Auth Routes
  if (isAuthRoute) {
    // Admin login redirect
    if (authResult?.isAuthenticated && userRole === "admin") {
      return NextResponse.redirect(new URL("/admin/verification", request.url));
    }

    // Normal users redirect
    if (authResult?.isAuthenticated) {
      return NextResponse.redirect(new URL("/artworks", request.url));
    }
    return NextResponse.next();
  }

  // Global Authentication Check for all other routes
  if (!authResult?.isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-Based Access Control

  // Helper for "Not Found" illusion
  // Using "rewrite" to keep the URL exactly same to make it page simply doesn't exit at all
  const notFound = () => NextResponse.rewrite(new URL("/404", request.url));

  // Admin can only access admin routes
  if (userRole === "admin") {
    if (!isAdminRoute) return notFound();
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (isAdminRoute && userRole !== "admin") return notFound();

  // Artist cannot access /checkout or /dashboard/collector
  if (userRole === "artist") {
    const forbiddenForArtists = ["/checkout", "/dashboard/collector"];
    if (forbiddenForArtists.some((route) => pathname.startsWith(route))) {
      // For redirect to /artworks
      // return NextResponse.redirect(new URL("/artworks", request.url));

      // For Not Found illusion
      return notFound();
    }
  }

  //Collector cannot access /dashboard/artist
  if (userRole === "collector") {
    const forbiddenForCollector = ["/dashboard/artist"];
    if (forbiddenForCollector.some((route) => pathname.startsWith(route))) {
      // For redirect to /artworks
      // return NextResponse.redirect(new URL("/artworks", request.url));

      // For Not Found illusion
      return notFound();
    }
  }

  // Allow everything else
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Common image extensions (webp, png, jpg, svg, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:webp|png|jpg|jpeg|gif|svg|svgz|ico|tiff|bmp)).*)",
  ],
};
