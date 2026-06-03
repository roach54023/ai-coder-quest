import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

// 导出常用方法
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;
