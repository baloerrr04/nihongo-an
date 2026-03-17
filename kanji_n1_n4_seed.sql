-- Seed Data for Kanji N1-N4
INSERT INTO public.quiz_questions (module_type, level, question, answer, options) VALUES
-- Kanji N4
('kanji', 'N4', '試験', 'exam', '["book", "teacher", "school"]'::jsonB),
('kanji', 'N4', '理由', 'reason', '["result", "freedom", "travel"]'::jsonB),
('kanji', 'N4', '地図', 'map', '["picture", "magazine", "library"]'::jsonB),
('kanji', 'N4', '料理', 'cooking', '["cleaning", "shopping", "washing"]'::jsonB),
('kanji', 'N4', '世界', 'world', '["country", "city", "village"]'::jsonB),

-- Kanji N3
('kanji', 'N3', '希望', 'hope', '["fear", "danger", "memory"]'::jsonB),
('kanji', 'N3', '習慣', 'habit', '["culture", "knowledge", "ability"]'::jsonB),
('kanji', 'N3', '複雑', 'complex', '["simple", "easy", "short"]'::jsonB),
('kanji', 'N3', '解決', 'solution', '["problem", "question", "answer"]'::jsonB),
('kanji', 'N3', '環境', 'environment', '["situation", "society", "nature"]'::jsonB),

-- Kanji N2
('kanji', 'N2', '傾向', 'tendency', '["direction", "purpose", "influence"]'::jsonB),
('kanji', 'N2', '貴重', 'precious', '["cheap", "common", "useless"]'::jsonB),
('kanji', 'N2', '規模', 'scale', '["limit", "range", "area"]'::jsonB),
('kanji', 'N2', '検討', 'consideration', '["decision", "reaction", "suggestion"]'::jsonB),
('kanji', 'N2', '豊富', 'abundant', '["poor", "small", "rare"]'::jsonB),

-- Kanji N1
('kanji', 'N1', '謙遜', 'humility', '["pride", "anger", "greed"]'::jsonB),
('kanji', 'N1', '緻密', 'precise', '["vague", "rough", "simple"]'::jsonB),
('kanji', 'N1', '妥協', 'compromise', '["conflict", "promise", "victory"]'::jsonB),
('kanji', 'N1', '示唆', 'suggestion', '["order", "refusal", "warning"]'::jsonB),
('kanji', 'N1', '擁護', 'protection', '["attack", "criticism", "neglect"]'::jsonB);
