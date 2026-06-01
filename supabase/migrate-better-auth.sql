-- AI Coder Quest - Schema for Better Auth
-- User references point to public."user"(id) instead of auth.users(id)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles (references Better Auth user table)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id TEXT PRIMARY KEY REFERENCES public."user"(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  username TEXT,
  avatar_url TEXT,
  current_rank_id TEXT DEFAULT 'rank_0',
  total_time_seconds INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chapters
CREATE TABLE IF NOT EXISTS public.chapters (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  order_index INTEGER NOT NULL,
  rank_unlocked_id TEXT,
  estimated_total_minutes INTEGER DEFAULT 0,
  completion_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Levels
CREATE TABLE IF NOT EXISTS public.levels (
  id TEXT PRIMARY KEY,
  chapter_id TEXT NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  page_title TEXT,
  order_index INTEGER NOT NULL,
  is_delivery BOOLEAN DEFAULT FALSE,
  verification_type TEXT NOT NULL CHECK (verification_type IN ('regex', 'url_check', 'github_url', 'checklist', 'composite')),
  verification_config JSONB DEFAULT '{}',
  estimated_minutes INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ranks
CREATE TABLE IF NOT EXISTS public.ranks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  salary TEXT,
  badge_color TEXT DEFAULT '#9CA3AF',
  chapter_id TEXT REFERENCES public.chapters(id),
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Progress
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES public."user"(id) ON DELETE CASCADE,
  level_id TEXT NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'locked' CHECK (status IN ('locked', 'unlocked', 'in_progress', 'completed', 'skipped')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, level_id)
);

-- Submissions
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES public."user"(id) ON DELETE CASCADE,
  level_id TEXT NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
  submission_type TEXT NOT NULL,
  text_content TEXT,
  url_content TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'auto_passed', 'auto_failed')),
  auto_verification_result JSONB,
  admin_notes TEXT,
  reviewed_by TEXT REFERENCES public."user"(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rank Unlocks
CREATE TABLE IF NOT EXISTS public.rank_unlocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES public."user"(id) ON DELETE CASCADE,
  rank_id TEXT NOT NULL REFERENCES public.ranks(id),
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  share_url TEXT,
  UNIQUE(user_id, rank_id)
);

-- Achievements
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  condition_type TEXT NOT NULL,
  condition_config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Achievements
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES public."user"(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL REFERENCES public.achievements(id),
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_level_id ON public.user_progress(level_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_level_id ON public.submissions(level_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);
CREATE INDEX IF NOT EXISTS idx_levels_chapter_id ON public.levels(chapter_id);
CREATE INDEX IF NOT EXISTS idx_rank_unlocks_user_id ON public.rank_unlocks(user_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE OR REPLACE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON public.user_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
