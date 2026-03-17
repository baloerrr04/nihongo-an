-- Disable RLS on all tables to allow the app to fetch data without complex policies
-- This is done because RLS was "skipped" during setup, but Supabase may have enabled it by default.

ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaks DISABLE ROW LEVEL SECURITY;

-- Grant all permissions to the anon and authenticated roles for development
GRANT ALL ON TABLE public.profiles TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.learning_progress TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.quiz_questions TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.user_streaks TO anon, authenticated, service_role;

-- Ensure sequences are also accessible
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
