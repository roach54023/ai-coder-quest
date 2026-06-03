import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 通过 cookie 判断是否登录
  const sessionCookie = getSessionCookie(request);
  const isLoggedIn = !!sessionCookie;

  const legacyAppPathMap: Record<string, string> = {
    "/dashboard": "/zh/dashboard",
    "/profile": "/zh/profile",
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

  // If an older English page bundle still points to /zh auth pages, keep users
  // on the English auth flow when the click came from an English public page.
  if ((pathname === "/zh/login" || pathname === "/zh/register") && !isLoggedIn) {
    const referer = request.headers.get("referer");
    if (referer) {
      const refererUrl = new URL(referer);
      const cameFromEnglishPage =
        refererUrl.origin === request.nextUrl.origin &&
        !refererUrl.pathname.startsWith("/zh");

      if (cameFromEnglishPage) {
        const url = request.nextUrl.clone();
        url.pathname = pathname === "/zh/login" ? "/login" : "/register";
        return NextResponse.redirect(url);
      }
    }
  }

  // 受保护的路由（/levels 已移除，教程页公开可访问）
  const protectedPaths = [
    "/dashboard", "/profile", "/share", "/admin",
    "/zh/dashboard", "/zh/profile", "/zh/share", "/zh/admin",
  ];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // 未登录用户访问受保护页面 → 重定向到登录
  if (isProtected && !isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.startsWith("/zh/") ? "/zh/login" : "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // 已登录用户访问登录/注册页面 → 重定向到 dashboard
  const loginPaths = ["/login", "/register", "/zh/login", "/zh/register"];
  if (loginPaths.includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL("/zh/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard",
    "/profile/:path*",
    "/profile",
    "/share/:path*",
    "/share",
    "/admin/:path*",
    "/admin",
    "/login",
    "/register",
    "/zh/dashboard/:path*",
    "/zh/profile/:path*",
    "/zh/share/:path*",
    "/zh/admin/:path*",
    "/zh/login",
    "/zh/register",
  ],
};
