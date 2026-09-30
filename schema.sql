-- ==============================================================================
-- Aluvantis Cloudflare D1 Database Schema
-- Architecture: 3-Column Zero-Knowledge Encrypted Storage + Delta Matrix Updates
-- ==============================================================================

-- 1. Table 1: telegram_bot_ai
-- Columns: id (UUID), data (JSON user info), chat (JSON client-encrypted chat history)
CREATE TABLE IF NOT EXISTS telegram_bot_ai (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  chat TEXT NOT NULL
);

-- 2. Table 2: telegram_bot_tracking
-- Columns: id (UUID), user_metadata (JSON device time, IP, MAC address, VPN, geo, topics)
CREATE TABLE IF NOT EXISTS telegram_bot_tracking (
  id TEXT PRIMARY KEY,
  user_metadata TEXT NOT NULL
);

-- 3. Table 3: site_content (Pricing & Text manager)
-- Columns: id (UUID/Slug), key (Unique identifier), data (JSON content payload)
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  data TEXT NOT NULL
);

-- Indices for ultra-fast lookup
CREATE INDEX IF NOT EXISTS idx_content_key ON site_content(key);

-- Initial seed data for pricing plans
INSERT OR IGNORE INTO site_content (id, key, data) VALUES 
('1', 'plan_starter', '{"name":"Starter","price":"4 800 000","currency":"so''m","limit":"48 soatda tayyor","features":["1 ta premium sahifa","Mobil optimizatsiya","Telegram integratsiyasi","Bepul hosting"]}'),
('2', 'plan_pro', '{"name":"Pro Ko''p tarmoqli","price":"9 500 000","currency":"so''m","limit":"72 soatda tayyor","features":["5 tagacha sahifalar","3 oylik bepul kafolat","Dizayn animatsiyalar","CRM integratsiya","D1 & KV ulanishi"]}'),
('3', 'plan_premium', '{"name":"Ekotizim / Portal","price":"14 500 000","currency":"so''m","limit":"7 kun muddat","features":["Cheksiz sahifalar","D1 bazali server","Telegram bot + AI","Google Cloud ulanish","Wildcard subdomenlar"]}');
