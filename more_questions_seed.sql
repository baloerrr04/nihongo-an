-- Comprehensive Seed Data for All Modules
INSERT INTO public.quiz_questions (module_type, level, question, answer, options) VALUES
-- Hiragana
('hiragana', 'basic', 'さ', 'sa', '["si", "su", "se"]'::jsonb),
('hiragana', 'basic', 'し', 'shi', '["sa", "su", "so"]'::jsonb),
('hiragana', 'basic', 'す', 'su', '["sa", "si", "se"]'::jsonb),
('hiragana', 'basic', 'せ', 'se', '["sa", "si", "so"]'::jsonb),
('hiragana', 'basic', 'そ', 'so', '["sa", "su", "se"]'::jsonb),
('hiragana', 'basic', 'た', 'ta', '["chi", "tsu", "te"]'::jsonb),
('hiragana', 'basic', 'ち', 'chi', '["ta", "tsu", "to"]'::jsonb),
('hiragana', 'basic', 'つ', 'tsu', '["ta", "chi", "te"]'::jsonb),
('hiragana', 'basic', 'な', 'na', '["ni", "nu", "ne"]'::jsonb),
('hiragana', 'basic', 'に', 'ni', '["na", "nu", "no"]'::jsonb),

-- Katakana
('katakana', 'basic', 'サ', 'sa', '["si", "su", "se"]'::jsonb),
('katakana', 'basic', 'シ', 'shi', '["sa", "su", "so"]'::jsonb),
('katakana', 'basic', 'ス', 'su', '["sa", "si", "se"]'::jsonb),
('katakana', 'basic', 'セ', 'se', '["sa", "si", "so"]'::jsonb),
('katakana', 'basic', 'ソ', 'so', '["sa", "su", "se"]'::jsonb),
('katakana', 'basic', 'タ', 'ta', '["chi", "tsu", "te"]'::jsonb),
('katakana', 'basic', 'チ', 'chi', '["ta", "tsu", "to"]'::jsonb),
('katakana', 'basic', 'ツ', 'tsu', '["ta", "chi", "te"]'::jsonb),
('katakana', 'basic', 'ナ', 'na', '["ni", "nu", "ne"]'::jsonb),
('katakana', 'basic', 'ニ', 'ni', '["na", "nu", "no"]'::jsonb),

-- Kanji N5
('kanji', 'N5', '大', 'large', '["small", "middle", "extra"]'::jsonb),
('kanji', 'N5', '小', 'small', '["large", "middle", "tiny"]'::jsonb),
('kanji', 'N5', '中', 'middle', '["large", "small", "inner"]'::jsonb),
('kanji', 'N5', '山', 'mountain', '["river", "field", "ocean"]'::jsonb),
('kanji', 'N5', '川', 'river', '["mountain", "field", "lake"]'::jsonb),
('kanji', 'N5', '田', 'rice field', '["mountain", "river", "forest"]'::jsonb),
('kanji', 'N5', '上', 'up', '["down", "left", "right"]'::jsonb),
('kanji', 'N5', '下', 'down', '["up", "left", "right"]'::jsonb),
('kanji', 'N5', '左', 'left', '["right", "up", "down"]'::jsonb),
('kanji', 'N5', '右', 'right', '["left", "up", "down"]'::jsonb),

-- Vocabulary N5
('vocabulary', 'N5', 'Iku', 'to go', '["to come", "to stay", "to sleep"]'::jsonb),
('vocabulary', 'N5', 'Kuru', 'to come', '["to go", "to stay", "to leave"]'::jsonb),
('vocabulary', 'N5', 'Taberu', 'to eat', '["to drink", "to sleep", "to run"]'::jsonb),
('vocabulary', 'N5', 'Nomu', 'to drink', '["to eat", "to speak", "to read"]'::jsonb),
('vocabulary', 'N5', 'Miru', 'to see', '["to hear", "to touch", "to feel"]'::jsonb),
('vocabulary', 'N5', 'Kiku', 'to listen/ask', '["to see", "to speak", "to read"]'::jsonb),
('vocabulary', 'N5', 'Hanasu', 'to speak', '["to read", "to write", "to listen"]'::jsonb),
('vocabulary', 'N5', 'Yomu', 'to read', '["to speak", "to write", "to hear"]'::jsonb),
('vocabulary', 'N5', 'Kaku', 'to write', '["to read", "to draw", "to speak"]'::jsonb),
('vocabulary', 'N5', 'Neru', 'to sleep', '["to wake", "to dream", "to run"]'::jsonb),

-- Grammar N5
('grammar', 'N5', 'ここは___です。', '教室', '["学生", "先生", "本"]'::jsonb),
('grammar', 'N5', '田中さんは___です。', '日本人', '["日本", "日本に", "日本を"]'::jsonb),
('grammar', 'N5', 'これは___ですか。', '何', '["どこ", "だれ", "いつ"]'::jsonb),
('grammar', 'N5', 'トイレは___ですか。', 'どこ', '["何", "だれ", "いつ"]'::jsonb),
('grammar', 'N5', 'あの方は___ですか。', 'だれ', '["何", "どこ", "いつ"]'::jsonb),
('grammar', 'N5', '___日本へ来ましたか。', 'いつ', '["何", "どこ", "だれ"]'::jsonb),
('grammar', 'N5', '机___上にあります。', 'の', '["は", "が", "に"]'::jsonb),
('grammar', 'N5', 'かばん___中にあります。', 'の', '["は", "が", "に"]'::jsonb),
('grammar', 'N5', '___に猫がいます。', '庭', '["私", "本", "車"]'::jsonb),
('grammar', 'N5', '箱___中に何がありますか。', 'の', '["は", "を", "に"]'::jsonb);
