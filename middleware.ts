import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 通过 cookie 判断是否登录
  const sessionCookie = getSessionCookie(request);
  const isLoggedIn = !!sessionCookie;

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
    const target = pathname.startsWith("/zh/") ? "/zh/dashboard" : "/dashboard";
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/share/:path*",
    "/admin/:path*",
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
