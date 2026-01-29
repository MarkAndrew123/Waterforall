-- WAFI Database Schema for Supabase
-- Run this in the Supabase SQL Editor

-- Water Projects Table
CREATE TABLE IF NOT EXISTS water_projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  project_type TEXT NOT NULL,
  people_served INTEGER NOT NULL,
  status TEXT NOT NULL,
  completion INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Water Statistics Table
CREATE TABLE IF NOT EXISTS water_statistics (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  value INTEGER NOT NULL,
  label TEXT NOT NULL,
  year INTEGER NOT NULL,
  region TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community Stories Table
CREATE TABLE IF NOT EXISTS stories (
  id SERIAL PRIMARY KEY,
  caption TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  author_name TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- WASH State Rankings Table (for the League)
CREATE TABLE IF NOT EXISTS wash_state_rankings (
  id SERIAL PRIMARY KEY,
  state_name TEXT NOT NULL UNIQUE,
  water_access DECIMAL(5,2) DEFAULT 0,
  sanitation DECIMAL(5,2) DEFAULT 0,
  hygiene DECIMAL(5,2) DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  rank_position INTEGER,
  change_direction TEXT DEFAULT 'same', -- 'up', 'down', 'same'
  zone TEXT DEFAULT 'safe', -- 'promotion', 'safe', 'relegation'
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial state data for all 37 Nigerian states
INSERT INTO wash_state_rankings (state_name, rank_position, zone) VALUES
  ('FCT Abuja', 1, 'promotion'),
  ('Abia State', 2, 'promotion'),
  ('Adamawa State', 3, 'promotion'),
  ('Akwa Ibom State', 4, 'promotion'),
  ('Anambra State', 5, 'promotion'),
  ('Bauchi State', 6, 'safe'),
  ('Bayelsa State', 7, 'safe'),
  ('Benue State', 8, 'safe'),
  ('Borno State', 9, 'safe'),
  ('Cross River State', 10, 'safe'),
  ('Delta State', 11, 'safe'),
  ('Ebonyi State', 12, 'safe'),
  ('Edo State', 13, 'safe'),
  ('Ekiti State', 14, 'safe'),
  ('Enugu State', 15, 'safe'),
  ('Gombe State', 16, 'safe'),
  ('Imo State', 17, 'safe'),
  ('Jigawa State', 18, 'safe'),
  ('Kaduna State', 19, 'safe'),
  ('Kano State', 20, 'safe'),
  ('Katsina State', 21, 'safe'),
  ('Kebbi State', 22, 'safe'),
  ('Kogi State', 23, 'safe'),
  ('Kwara State', 24, 'safe'),
  ('Lagos State', 25, 'safe'),
  ('Nasarawa State', 26, 'safe'),
  ('Niger State', 27, 'safe'),
  ('Ogun State', 28, 'safe'),
  ('Ondo State', 29, 'safe'),
  ('Osun State', 30, 'safe'),
  ('Oyo State', 31, 'safe'),
  ('Plateau State', 32, 'safe'),
  ('Rivers State', 33, 'relegation'),
  ('Sokoto State', 34, 'relegation'),
  ('Taraba State', 35, 'relegation'),
  ('Yobe State', 36, 'relegation'),
  ('Zamfara State', 37, 'relegation')
ON CONFLICT (state_name) DO NOTHING;

-- Insert initial statistics
INSERT INTO water_statistics (category, value, label, year) VALUES
  ('clean_water_access', 0, 'People with Clean Water Access', 2025),
  ('schools_water', 0, 'Schools with Clean Water', 2025),
  ('decent_toilets', 0, 'Households with Improved Sanitation', 2025),
  ('health_hygiene', 0, 'Health Facilities with WASH', 2025),
  ('total_projects', 0, 'Total Projects', 2025),
  ('water_flowing', 0, 'Water Points Functional (%)', 2025),
  ('active_states', 37, 'Participating States', 2025),
  ('funding_raised', 0, 'Investments (₦)', 2025);

-- Insert sample stories
INSERT INTO stories (caption, description, image_url, author_name, location) VALUES
  ('Clean water flows in Kisumu!', 'After months of collaborative work with the local community, the new borehole in Kisumu, Kenya is operational. Over 500 families now have direct access to clean, safe drinking water.', 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=2070&auto=format&fit=crop', 'Sarah Amadi', 'Kisumu, Kenya'),
  ('Hygiene education saves lives.', 'Our hygiene workshop in rural Ghana was a massive success. We trained 50 community health volunteers who will now teach proper handwashing techniques.', 'https://images.unsplash.com/photo-1541976844346-f18aeac57230?q=80&w=2070&auto=format&fit=crop', 'Kwame Osei', 'Volta Region, Ghana'),
  ('New solar pump installed in Rwanda.', 'The installation of the solar-powered water pump is complete! This sustainable solution ensures a reliable water supply for the health clinic.', 'https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?q=80&w=1974&auto=format&fit=crop', 'Jean-Paul Uwimana', 'Musanze, Rwanda'),
  ('Empowering women through water access.', 'With the new well in place, women in this Nigerian village have reclaimed hours of their day previously spent fetching water.', 'https://images.unsplash.com/photo-1533615128004-94e82df23f13?q=80&w=2070&auto=format&fit=crop', 'Ngozi Okafor', 'Enugu State, Nigeria'),
  ('Sanitation facilities for the local school.', 'We are proud to hand over the newly constructed gender-separated latrines to the primary school.', 'https://images.unsplash.com/photo-1455620611406-966ca6889d80?q=80&w=2070&auto=format&fit=crop', 'David Moyo', 'Lilongwe, Malawi');

-- Enable Row Level Security (optional, for public read access)
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE water_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE wash_state_rankings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON stories FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON water_statistics FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON wash_state_rankings FOR SELECT USING (true);
