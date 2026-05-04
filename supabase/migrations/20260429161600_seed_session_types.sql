-- Seed initial categories into session_types
-- This handles initial mockup population for administrative viewing

INSERT INTO session_types (name, description)
VALUES 
  ('1-on-1 Personal Coaching', 'Dedicated individualized session focusing on form, strength goals, and custom programming.'),
  ('High-Intensity Interval Training (HIIT)', 'Cardiovascular-heavy circuit training designed for maximum caloric expenditure.'),
  ('Strength & Conditioning', 'Progressive overload training targeting compounded muscle growth and endurance.'),
  ('Yoga & Mobility', 'Active recovery session emphasizing flexibility, joint health, and breathwork.'),
  ('Nutrition Consultation', 'Administrative audit of macro-nutrient tracking and dietary adjustments.'),
  ('Small Group Circuit', 'High energy group training capped at 4 individuals.'),
  ('Virtual Technique Audit', 'Remote digital session focused exclusively on movement analysis and correction.')
;
