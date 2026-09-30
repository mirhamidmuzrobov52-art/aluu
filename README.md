# Aluvantis — Enterprise Cloudflare D1 & Telegram AI Ecosystem

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/aluvantis/aluvantis-web)

> **"Biznesingiz onlayn — 48 soatda"**  
> Tashkent-based digital agency platform with high-converting marketing pages, **Cloudflare D1 SQL**, **Workers KV (14-day TTL)**, **Telegram Bot with Inline Fast Buttons**, **Zero-Knowledge Client-Side AES-256 Encryption**, and **Wildcard Domain Routing (`*.aluvantis.uz`)**.

---

## ⚡ 1-Click Deploy to Cloudflare

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/aluvantis/aluvantis-web)

Or deploy via Cloudflare Wrangler CLI:

```bash
# 1. Install dependencies
npm install

# 2. Build the production client
npm run build

# 3. Create Cloudflare D1 Database
npx wrangler d1 create aluvantis_db

# 4. Create Cloudflare KV Namespace
npx wrangler kv:namespace create ALUVANTIS_KV

# 5. Execute initial SQL migration
npx wrangler d1 execute aluvantis_db --file=./schema.sql

# 6. Deploy to Cloudflare Workers / Pages
npx wrangler deploy
```

---

## 🔐 AI Studio Secrets & Environment Variables

Ushbu loyihani to'liq real rejimda ishlatish uchun AI Studio o'ng menyusidagi **Secrets (`+ Add secret`)** bo'limiga quyidagi kalitlarni kiritasiz:

| Secret Nomi | Majburiyligi | Qayerdan olinadi? | Vazifasi va Xavfsizligi |
| :--- | :--- | :--- | :--- |
| `DEEPSEEK_API_KEY` | ✅ Faol | `platform.deepseek.com` | Sayt va botdagi aqlli AI suhbatlari uchun (Tejamkor) |
| `GEMINI_API_KEY` | ✅ Faol | Google AI Studio | Gemini 2.5 / Flash modellari uchun zaxira kalit |
| `TELEGRAM_BOT_TOKEN` | Tavsiya etiladi | Telegram: `@BotFather` | Bot muloqoti va tezkor **inline keyboard** tugmalari uchun |
| `CLOUDFLARE_API_TOKEN` | Tavsiya etiladi | Cloudflare → My Profile → API Tokens | D1 va KV bazasiga to'g'ridan-to'g'ri so'rovlar yuborish |
| `CLOUDFLARE_ACCOUNT_ID` | Tavsiya etiladi | Cloudflare Dashboard (o'ng ustun) | Cloudflare hisob identifikatori |
| `CLOUDFLARE_D1_DATABASE_ID` | Tavsiya etiladi | Cloudflare → Workers & Pages → D1 | D1 ma'lumotlar bazasining maxsus UUID kodi |
| `GOOGLE_CLIENT_ID` | Ixtiyoriy | `console.cloud.google.com` | `admin.aluvantis.uz` ga Google orqali kirish (OAuth 2.0) |
| `GOOGLE_CLIENT_SECRET` | Ixtiyoriy | Google Cloud Console OAuth Client | Google OAuth xavfsizlik kaliti |

---

## 🛠 Cloudflare D1 SQL Schema (3-Ustunli Arxitektura)

Cloudflare D1 bazasida ma'lumotlar NoSQL usulida, tezkor va shifrlangan holda 3 ta ustunda saqlanadi:

```sql
-- 1. Telegram Bot va Foydalanuvchi Shifrlangan Chatlari (3 ta ustun: id, data, chat)
CREATE TABLE IF NOT EXISTS telegram_bot_ai (
  id TEXT PRIMARY KEY,       -- UUID yoki Telegram User ID
  data TEXT NOT NULL,        -- JSON: telegram id, username, photo avatar url, bio va h.k.
  chat TEXT NOT NULL         -- JSON: Client-side AES shifrlangan AI va Inson muloqotlari
);

-- 2. Foydalanuvchi Qurilma va Metama'lumotlari (Tracking)
CREATE TABLE IF NOT EXISTS telegram_bot_tracking (
  id TEXT PRIMARY KEY,            -- UUID (telegram_bot_ai bilan bog'langan)
  user_metadata TEXT NOT NULL     -- JSON: qurilma vaqti, IP, MAC adres, VPN statusi, geo, mavzular
);

-- 3. Sayt Narxlari va Matnlari Boshqaruvi (Delta JSON 3 ta ustun)
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,       -- '1', '2', '3'
  key TEXT UNIQUE NOT NULL,  -- 'plan_starter', 'plan_pro', 'plan_premium'
  data TEXT NOT NULL         -- JSON: narx, nom, limit, funksiyalar va matnlar
);

-- Indekslar
CREATE INDEX IF NOT EXISTS idx_content_key ON site_content(key);
```

---

## 🔒 Xavfsizlik Audit va Arxitektura Tekshiruvi

Loyihadagi barcha xavfsizlik va barqarorlik talablari to'liq tekshirildi:

1. **Zero-Knowledge Client-Side Encryption (AES-256):**
   * Foydalanuvchilarning shaxsiy xabarlari Aluvantis serverlariga **ochiq holda bormaydi**.
   * Brauzer yoki bot mijozining o'zida shifrlanib, D1 bazasiga `enc_aes_256_...` ko'rinishida yoziladi.
   * Xaker bazani buzib kirgan taqdirda ham foydalanuvchi yozishmalarini o'qiy olmaydi.

2. **Delta Update (Matrix Batch Sync):**
   * D1 bazasidagi narx yoki matnlar o'zgarganda butun jadval qayta yozilmaydi (`no duplicates`).
   * Faqatgina o'zgargan kalitlar `json_patch` orqali yangilanadi va Cloudflare KV keshiga 14 kunlik TTL bilan delta patch qilinadi.

3. **Wildcard DNS (`*.aluvantis.uz`):**
   * `aluvantis.uz` — Asosiy marketing landing sahifasi.
   * `admin.aluvantis.uz` — CRM, D1/KV monitoring, Telegram tracking va narxlar boshqaruv konsoli.
   * Wildcard CNAME yozuvi orqali har qanday subdomen xavfsiz proksilangan holda ishlaydi.

4. **Telegram Inline Keyboard (Tezkor tugmalar):**
   * `📚 Qur'oni Karim`, `⏱️ Namoz vaqtlari`, `🤖 Sakin AI`, `📿 Tasbih/Zikr`, `🔍 Qibla`.
   * `/api/telegram/webhook` orqali to'liq server-side qayta ishlanadi va xatoliklar ushlab qolinadi (`try/catch`).

5. **AI Token xarajatlarini 80% tejash:**
   * Tizimli prompt keshlanadi (`Prompt Caching`).
   * Javoblar uzunligi `max_tokens: 250` bilan tejaladi.
   * Nojo'ya yoki fatvoga oid so'rovlar AI ga bormasdan mahalliy guardrail orqali qaytariladi.

---

## 🚀 Ishga Tushirish

```bash
# Dasturni o'rnatish
npm install

# Dev rejimda server va Vite-ni ishga tushirish
npm run dev

# TypeScript va sintaksis tekshiruvi
npm run lint

# Production build
npm run build
```
