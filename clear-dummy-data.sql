-- Clear dummy data from WAFI database
-- Run this in Supabase SQL Editor

-- Delete sample stories (the Africa examples)
DELETE FROM stories;

-- Delete sample water statistics (keeps structure, removes 0 values)
DELETE FROM water_statistics;

-- Optional: If you want to keep the state rankings but reset scores to 0:
UPDATE wash_state_rankings SET 
    water_access = 0,
    sanitation = 0,
    hygiene = 0,
    total_points = 0;

-- Verify tables are clean
SELECT 'stories' as table_name, COUNT(*) as count FROM stories
UNION ALL
SELECT 'water_statistics', COUNT(*) FROM water_statistics;
