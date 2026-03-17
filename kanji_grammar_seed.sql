-- Seed Data for Kanji & Grammar
INSERT INTO public.quiz_questions (module_type, level, question, answer, options) VALUES
-- Kanji N5
('kanji', 'N5', '日', 'day', '["moon", "sun", "year"]'::jsonb),
('kanji', 'N5', '月', 'month', '["day", "sun", "fire"]'::jsonb),
('kanji', 'N5', '火', 'fire', '["water", "wood", "metal"]'::jsonb),
('kanji', 'N5', '水', 'water', '["fire", "earth", "sky"]'::jsonb),
('kanji', 'N5', '木', 'tree', '["metal", "fire", "water"]'::jsonb),
('kanji', 'N5', '金', 'gold', '["silver", "copper", "iron"]'::jsonb),
('kanji', 'N5', '土', 'earth', '["sky", "wind", "ocean"]'::jsonb),
('kanji', 'N5', '人', 'person', '["spirit", "heart", "body"]'::jsonb),

-- Grammar N5
('grammar', 'N5', '私は学生____。', 'です', '["だ", "で", "ます"]'::jsonb),
('grammar', 'N5', 'これは本____。', 'です', '["で", "を", "に"]'::jsonb),
('grammar', 'N5', 'りんご____食べます。', 'を', '["が", "は", "に"]'::jsonb),
('grammar', 'N5', 'テレビ____見ます。', 'を', '["に", "で", "と"]'::jsonb),
('grammar', 'N5', '日本語____話します。', 'を', '["に", "で", "と"]'::jsonb),
('grammar', 'N5', '学校____行きます。', 'へ', '["を", "が", "は"]'::jsonb),
('grammar', 'N5', 'バス____乗ります。', 'に', '["を", "が", "で"]'::jsonb),
('grammar', 'N5', 'ここで___ください。', '待って', '["待ちて", "待て", "待った"]'::jsonb);
