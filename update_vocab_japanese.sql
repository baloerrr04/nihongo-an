-- Update Vocabulary Questions to Hiragana/Kanji
-- First, clear out old Romaji-based vocabulary to avoid duplicates
DELETE FROM public.quiz_questions WHERE module_type = 'vocabulary';

-- Insert new Japanese-localized Vocabulary
INSERT INTO public.quiz_questions (module_type, level, question, answer, options) VALUES
('vocabulary', 'N5', '先生 (せんせい)', 'Teacher', '["学生", "友達", "医者"]'::jsonb),
('vocabulary', 'N5', '学生 (がくせい)', 'Student', '["先生", "エンジニア", "看護師"]'::jsonb),
('vocabulary', 'N5', '友達 (ともだち)', 'Friend', '["家族", "敵", "知らない人"]'::jsonb),
('vocabulary', 'N5', '家族 (かぞく)', 'Family', '["チーム", "スタッフ", "観客"]'::jsonb),
('vocabulary', 'N5', '水 (みず)', 'Water', '["お茶", "ミルク", "ジュース"]'::jsonb),
('vocabulary', 'N5', 'ご飯 (ごはん)', 'Meal/Rice', '["パン", "ラーメン", "スープ"]'::jsonb),
('vocabulary', 'N5', '本 (ほん)', 'Book', '["ペン", "紙", "図書館"]'::jsonb),
('vocabulary', 'N5', '車 (くるま)', 'Car', '["自転車", "電車", "飛行機"]'::jsonb),
('vocabulary', 'N5', '行く (いく)', 'to go', '["来る", "いる", "寝る"]'::jsonb),
('vocabulary', 'N5', '来る (くる)', 'to come', '["行く", "いる", "帰る"]'::jsonb),
('vocabulary', 'N5', '食べる (たべる)', 'to eat', '["飲む", "寝る", "走る"]'::jsonb),
('vocabulary', 'N5', '飲む (のむ)', 'to drink', '["食べる", "話す", "読む"]'::jsonb),
('vocabulary', 'N5', '見る (みる)', 'to see', '["聞く", "触る", "感じる"]'::jsonb),
('vocabulary', 'N5', '聞く (きく)', 'to listen/ask', '["見る", "話す", "読む"]'::jsonb),
('vocabulary', 'N5', '話す (はなす)', 'to speak', '["読む", "書く", "聞く"]'::jsonb),
('vocabulary', 'N5', '読む (よむ)', 'to read', '["話す", "書く", "聞く"]'::jsonb),
('vocabulary', 'N5', '書く (かく)', 'to write', '["読む", "描く", "話す"]'::jsonb),
('vocabulary', 'N5', '寝る (ねる)', 'to sleep', '["起きる", "夢を見る", "走る"]'::jsonb),
('vocabulary', 'N5', '私 (わたし)', 'I/Me', '["あなた", "彼", "彼女"]'::jsonb),
('vocabulary', 'N5', 'あなた', 'You', '["私", "彼", "彼女"]'::jsonb),
('vocabulary', 'N5', '学校 (がっこう)', 'School', '["会社", "家", "公園"]'::jsonb),
('vocabulary', 'N5', '会社 (かいしゃ)', 'Company', '["学校", "家", "駅"]'::jsonb),
('vocabulary', 'N5', '日本語 (にほんご)', 'Japanese', '["英語", "中国語", "韓国語"]'::jsonb),
('vocabulary', 'N5', '今日 (きょう)', 'Today', '["明日", "昨日", "毎日"]'::jsonb),
('vocabulary', 'N5', '明日 (あした)', 'Tomorrow', '["今日", "昨日", "毎日"]'::jsonb),
('vocabulary', 'N5', '昨日 (きのう)', 'Yesterday', '["今日", "明日", "毎日"]'::jsonb);
