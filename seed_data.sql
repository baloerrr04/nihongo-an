-- Seed Data for Hiragana & Katakana
INSERT INTO public.quiz_questions (module_type, level, question, answer, options) VALUES
-- Hiragana Basic
('hiragana', 'basic', 'あ', 'a', '["i", "u", "e"]'::jsonb),
('hiragana', 'basic', 'い', 'i', '["a", "u", "o"]'::jsonb),
('hiragana', 'basic', 'う', 'u', '["a", "e", "o"]'::jsonb),
('hiragana', 'basic', 'え', 'e', '["a", "i", "u"]'::jsonb),
('hiragana', 'basic', 'お', 'o', '["a", "i", "e"]'::jsonb),
('hiragana', 'basic', 'か', 'ka', '["ki", "ku", "ke"]'::jsonb),
('hiragana', 'basic', 'き', 'ki', '["ka", "ku", "ko"]'::jsonb),
('hiragana', 'basic', 'く', 'ku', '["ka", "ki", "ke"]'::jsonb),

-- Katakana Basic
('katakana', 'basic', 'ア', 'a', '["i", "u", "e"]'::jsonb),
('katakana', 'basic', 'イ', 'i', '["a", "u", "o"]'::jsonb),
('katakana', 'basic', 'ウ', 'u', '["a", "e", "o"]'::jsonb),
('katakana', 'basic', 'エ', 'e', '["a", "i", "u"]'::jsonb),
('katakana', 'basic', 'オ', 'o', '["a", "i", "e"]'::jsonb),
('katakana', 'basic', 'カ', 'ka', '["ki", "ku", "ke"]'::jsonb),
('katakana', 'basic', 'キ', 'ki', '["ka", "ku", "ko"]'::jsonb),
('katakana', 'basic', 'ク', 'ku', '["ka", "ki", "ke"]'::jsonb);
