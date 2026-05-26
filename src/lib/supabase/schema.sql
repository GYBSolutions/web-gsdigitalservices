-- ============================================================
-- Seijas Digital Services — Admin CMS Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Hero / site settings
CREATE TABLE IF NOT EXISTS site_settings (
  key   TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id         TEXT PRIMARY KEY,
  slug       TEXT UNIQUE NOT NULL,
  data       JSONB NOT NULL,
  featured   BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id         TEXT PRIMARY KEY,
  data       JSONB NOT NULL,
  featured   BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id         TEXT PRIMARY KEY,
  data       JSONB NOT NULL,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS so the service role can read/write freely
-- (the admin uses the service role key server-side)
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects       DISABLE ROW LEVEL SECURITY;
ALTER TABLE services       DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials   DISABLE ROW LEVEL SECURITY;
