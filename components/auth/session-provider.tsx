"use client";

/**
 * Better Auth 不需要 SessionProvider 包裹
 * 保留此组件作为兼容层，直接渲染 children
 */
export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
