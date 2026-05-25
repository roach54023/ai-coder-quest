import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 通过 cookie 判断是否登录
  const sessionCookie = getSessionCookie(request);
  const isLoggedIn = !!sessionCookie;

  // 受保护的路由
  const protectedPaths = ["/dashboard", "/levels", "/profile", "/share", "/admin"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // 未登录用户访问受保护页面 → 重定向到登录
  if (isProtected && !isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // 已登录用户访问登录/注册页面 → 重定向到 dashboard
  if ((pathname === "/login" || pathname === "/register") && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/levels/:path*",
    "/profile/:path*",
    "/share/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
