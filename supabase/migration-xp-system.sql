-- XP System Migration
-- Run this in Supabase SQL Editor

-- 1. Add total_xp to user_profiles
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS total_xp INTEGER NOT NULL DEFAULT 0;

-- 2. Add xp_earned to user_progress (how much XP this level gave the user)
ALTER TABLE public.user_progress
  ADD COLUMN IF NOT EXISTS xp_earned INTEGER NOT NULL DEFAULT 0;

-- 3. Index for leaderboard queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_total_xp ON public.user_profiles(total_xp DESC);
