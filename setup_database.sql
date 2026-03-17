-- 1. Create profiles table
CREATE TABLE public.profiles (
  id UUID references auth.users on delete cascade not null primary key,
  username TEXT unique,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE default timezone('utc'::text, now()) not null,
  updated_at TIMESTAMP WITH TIME ZONE default timezone('utc'::text, now()) not null
);

-- Note: We are skipping RLS (Row Level Security) and policies per user request.

-- Set up a trigger to automatically create a profile entry when a new user signs up
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Create learning_progress table
CREATE TABLE public.learning_progress (
  id UUID default gen_random_uuid() primary key,
  user_id UUID references public.profiles(id) on delete cascade not null,
  module_type TEXT not null, -- 'hiragana', 'katakana', 'kanji', 'vocabulary', 'grammar'
  level TEXT not null,       -- 'N5', 'N4', 'basic'
  score INTEGER default 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE default timezone('utc'::text, now()) not null
);

-- 3. Create quiz_questions table
CREATE TABLE public.quiz_questions (
  id UUID default gen_random_uuid() primary key,
  module_type TEXT not null,
  level TEXT not null,
  question TEXT not null,
  answer TEXT not null,
  options JSONB not null default '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE default timezone('utc'::text, now()) not null
);

-- 4. Create user_streaks table
CREATE TABLE public.user_streaks (
  id UUID default gen_random_uuid() primary key,
  user_id UUID references public.profiles(id) on delete cascade not null,
  current_streak INTEGER default 0,
  longest_streak INTEGER default 0,
  last_activity_date DATE default CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE default timezone('utc'::text, now()) not null,
  updated_at TIMESTAMP WITH TIME ZONE default timezone('utc'::text, now()) not null
);
