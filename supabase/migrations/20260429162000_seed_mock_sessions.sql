-- Seed initial LIVE sessions targeting generated session_types

INSERT INTO sessions (type_id, title, description, max_slots, pricing, location, status)
VALUES 
  (
    (SELECT id FROM session_types WHERE name = '1-on-1 Personal Coaching' LIMIT 1),
    'Morning Protocol Matrix',
    'Customized strength loading parameters to optimize morning performance block.',
    1, 150.00, 'Sector A Command Center', 'active'
  ),
  (
    (SELECT id FROM session_types WHERE name = 'High-Intensity Interval Training (HIIT)' LIMIT 1),
    'Tactical Heart-Rate Optimization',
    'High intensity intervals forcing metabolic thresholds beyond baseline outputs.',
    8, 45.00, 'Outdoor Training Grid', 'active'
  ),
  (
    (SELECT id FROM session_types WHERE name = 'Strength & Conditioning' LIMIT 1),
    'Compound Hypertrophy Deep Dive',
    'Heavily monitored session calibrating deadlifts and primary compound chains.',
    4, 85.00, 'Main Weight Floor', 'active'
  ),
  (
    (SELECT id FROM session_types WHERE name = 'Nutrition Consultation' LIMIT 1),
    'Dietary Blueprint Architecture',
    'Complete recalculation of incoming macronutrients and supplemental phasing.',
    1, 95.00, 'Consultation Deck / Virtual', 'active'
  ),
  (
    (SELECT id FROM session_types WHERE name = 'Yoga & Mobility' LIMIT 1),
    'Systematic Recovery Flow',
    'Controlled cooldown parameters maximizing range-of-motion metrics.',
    12, 35.00, 'Studio Delta', 'active'
  ),
  (
    (SELECT id FROM session_types WHERE name = 'Virtual Technique Audit' LIMIT 1),
    'Remote Form Optimization',
    'Digital session analyzing previously captured physical data arrays.',
    1, 75.00, 'Digital Protocol / Zoom', 'active'
  )
;
