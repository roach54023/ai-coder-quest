import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // Check login state from the auth session cookie.
  const sessionCookie = getSessionCookie(request);
  const isLoggedIn = !!sessionCookie;

  const legacyAppPathMap: Record<string, string> = {
    "/share": "/zh/share",
    "/admin": "/zh/admin",
  };

  for (const [legacyPath, zhPath] of Object.entries(legacyAppPathMap)) {
    if (pathname === legacyPath || pathname.startsWith(`${legacyPath}/`)) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(legacyPath, zhPath);
      return NextResponse.redirect(url);
    }
  }

  // Protected routes. Level pages stay public so search engines can index lesson content.
  const protectedPaths = [
    "/dashboard", "/profile", "/share", "/admin",
    "/zh/dashboard", "/zh/profile", "/zh/share", "/zh/admin",
  ];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // Redirect anonymous users to the matching language auth flow.
  if (isProtected && !isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.startsWith("/zh/") ? "/zh/login" : "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Send authenticated users away from auth pages.
  const loginPaths = ["/login", "/register", "/zh/login", "/zh/register"];
  if (loginPaths.includes(pathname) && isLoggedIn) {
    const dashboardPath = pathname.startsWith("/zh/") ? "/zh/dashboard" : "/dashboard";
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml)$).*)",
  ],
};
