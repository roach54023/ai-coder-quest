-- Migration: 从 Supabase Auth 迁移到 NextAuth
-- 运行此 SQL 在 Supabase SQL Editor 中

-- 1. 为 user_profiles 添加新字段（支持账号密码登录）
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS email TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS username TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS password_hash TEXT,
  ADD COLUMN IF NOT EXISTS password_salt TEXT;

-- 2. 创建 OAuth 账号关联表
CREATE TABLE IF NOT EXISTS public.oauth_accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  provider_email TEXT,
  provider_name TEXT,
  provider_avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(provider, provider_account_id)
);

CREATE INDEX IF NOT EXISTS idx_oauth_accounts_user_id ON public.oauth_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_oauth_accounts_provider ON public.oauth_accounts(provider, provider_account_id);

-- 3. RLS 策略
ALTER TABLE public.oauth_accounts ENABLE ROW LEVEL SECURITY;

-- 允许通过 service_role 访问（我们的 API 使用 admin client）
CREATE POLICY "Service role full access on oauth_accounts"
  ON public.oauth_accounts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 4. 更新 user_profiles 的主键类型（从 UUID 改为 TEXT，兼容 NextAuth 生成的 ID）
-- 注意：如果已有数据，需要先备份再迁移
-- 如果是全新项目，可以直接修改：
-- ALTER TABLE public.user_profiles ALTER COLUMN id TYPE TEXT;

-- 5. 移除 user_profiles 对 auth.users 的外键约束（不再依赖 Supabase Auth）
-- ALTER TABLE public.user_profiles DROP CONSTRAINT IF EXISTS user_profiles_id_fkey;

-- 6. 更新 user_progress 和 submissions 的外键（改为引用 user_profiles）
-- 注意：需要先删除旧约束再添加新约束
-- ALTER TABLE public.user_progress DROP CONSTRAINT IF EXISTS user_progress_user_id_fkey;
-- ALTER TABLE public.user_progress ADD CONSTRAINT user_progress_user_id_fkey
--   FOREIGN KEY (user_id) REFERENCES public.user_profiles(id) ON DELETE CASCADE;

-- 注意：以上注释掉的 ALTER 语句需要根据实际情况执行
-- 如果是全新项目，建议使用下面的完整 schema 替代
