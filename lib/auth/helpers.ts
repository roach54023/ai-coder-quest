import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * 获取当前登录用户（服务端组件/API 路由中使用）
 */
export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    return null;
  }
  return {
    id: session.user.id,
    name: session.user.name || null,
    email: session.user.email || null,
    image: session.user.image || null,
  };
}

/**
 * 获取当前用户，如果未登录则抛出错误
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}
