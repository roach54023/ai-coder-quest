-- Migration: Add 'skipped' status to user_progress
-- Run this in Supabase SQL Editor to update the existing constraint

ALTER TABLE public.user_progress
  DROP CONSTRAINT IF EXISTS user_progress_status_check;

ALTER TABLE public.user_progress
  ADD CONSTRAINT user_progress_status_check
  CHECK (status IN ('locked', 'unlocked', 'in_progress', 'completed', 'skipped'));
