import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { createAdminClient } from "@/lib/supabase/admin";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),

  // 内置邮箱密码认证
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  // 用户创建后自动同步到 user_profiles 表
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const supabase = createAdminClient();
          // 创建用户档案
          await supabase.from("user_profiles").upsert({
            id: user.id,
            display_name: user.name || user.email?.split("@")[0] || "用户",
            email: user.email || null,
            username: user.email || user.id,
            avatar_url: user.image || null,
            current_rank_id: "rank_0",
          }, { onConflict: "id" });
          // 解锁第一关
          await supabase.from("user_progress").upsert({
            user_id: user.id,
            level_id: "0-1",
            status: "unlocked",
          }, { onConflict: "user_id,level_id" });
        },
      },
    },
  },

  // 社交登录
  socialProviders: {
    github: {
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    },
  },

  // 会话配置
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 天
    updateAge: 60 * 60 * 24, // 每天更新一次
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 分钟缓存
    },
  },

  // 基础 URL
  baseURL: process.env.BETTER_AUTH_URL || process.env.AUTH_URL || "http://localhost:3000",
});
