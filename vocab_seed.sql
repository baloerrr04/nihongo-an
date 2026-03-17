-- Seed Data for Vocabulary
INSERT INTO public.quiz_questions (module_type, level, question, answer, options) VALUES
-- Vocabulary N5
('vocabulary', 'N5', 'Sensei', 'Teacher', '["Student", "Friend", "Doctor"]'::jsonb),
('vocabulary', 'N5', 'Gakusei', 'Student', '["Teacher", "Engineer", "Nurse"]'::jsonb),
('vocabulary', 'N5', 'Tomodachi', 'Friend', '["Family", "Enemy", "Stranger"]'::jsonb),
('vocabulary', 'N5', 'Kazoku', 'Family', '["Team", "Staff", "Audience"]'::jsonb),
('vocabulary', 'N5', 'Mizu', 'Water', '["Tea", "Milk", "Juice"]'::jsonb),
('vocabulary', 'N5', 'Gohan', 'Meal/Rice', '["Bread", "Noodle", "Soup"]'::jsonb),
('vocabulary', 'N5', 'Hon', 'Book', '["Pen", "Paper", "Library"]'::jsonb),
('vocabulary', 'N5', 'Kuruma', 'Car', '["Bike", "Train", "Plane"]'::jsonb);
