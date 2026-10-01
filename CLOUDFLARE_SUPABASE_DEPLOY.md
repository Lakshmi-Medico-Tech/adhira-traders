# 🚀 Adhira Pyrotech Billing — Cloudflare Pages + Supabase Deployment Guide

## Architecture Overview

```
Browser (Cloudflare CDN)
  ↓  loads static files (HTML / CSS / JS)
app.js  ←→  supabaseClient.js  ←→  Supabase Cloud DB
              ↑ Realtime WebSocket keeps all devices in sync
```

| Layer | Technology | Purpose |
|---|---|---|
| **Hosting** | Cloudflare Pages | Free global CDN, instant HTTPS |
| **Database** | Supabase PostgreSQL | Cloud database (free tier: 500 MB) |
| **Realtime** | Supabase Realtime | Instant multi-device sync |
| **Storage** | Supabase Storage | PDF & backup file uploads |

---

## STEP 1 — Set up Supabase Tables

1. Open your Supabase project → **SQL Editor**
   URL: `https://supabase.com/dashboard/project/ozpkzwkeenxdgqiwcntm/sql`

2. Click **+ New query**, paste the entire contents of `supabase_schema.sql` and click **Run**.

3. You should see tables created:
   - `adhira_store` — main JSONB database (RLS open, Realtime enabled)
   - `adhira_products`, `adhira_customers`, `adhira_quotations`, `adhira_invoices`, `adhira_simple_bills`
   - Storage bucket `adhira-storage` (50 MB, public)

NOTE: You only need to run this SQL **once**. It uses `CREATE TABLE IF NOT EXISTS` so it is safe to re-run.

---

## STEP 2 — Push Code to GitHub

1. Create a new **private** GitHub repo (e.g. `adhira-pyrotech-billing`)

2. In your project folder run:
```powershell
git add .
git commit -m "feat: Add Supabase + Cloudflare Pages support"
git remote add origin https://github.com/<YOUR_USERNAME>/adhira-pyrotech-billing.git
git push -u origin main
```

CAUTION: `.env` and `.env.local` are already in `.gitignore` — never commit these files. Your Supabase key is embedded inside `supabaseClient.js` as the **publishable** (anon) key; this is safe as Supabase RLS controls access.

---

## STEP 3 — Deploy to Cloudflare Pages

1. Go to https://dash.cloudflare.com → Pages
2. Click **Create a project** → **Connect to Git**
3. Select your GitHub repository `adhira-pyrotech-billing`
4. Configure build settings:

| Setting | Value |
|---|---|
| **Framework preset** | None |
| **Build command** | (leave blank) |
| **Build output directory** | `/` |
| **Root directory** | `/` |

5. Click **Save and Deploy** — done! Cloudflare will give you a URL like:
   `https://adhira-pyrotech-billing.pages.dev`

---

## STEP 4 — (Optional) Add a Custom Domain

1. In your Cloudflare Pages project → **Custom domains**
2. Add your domain e.g. `billing.adhirapyrotech.com`
3. Update DNS in your domain registrar to point to Cloudflare

---

## STEP 5 — Test Deployment

Open your Cloudflare URL in a browser. You should see:
- Login page loads
- Sync badge shows **"Cloud Synced ☁"** (Supabase connected)
- All your data (products, bills, etc.) appears after first sync

TIP: Open the app in **two browser tabs** — changes in one tab should appear in the other within 1-2 seconds via Supabase Realtime!

---

## How Data Sync Works

```
On every Save:
  1. localStorage + IndexedDB (instant local cache)
  2. → Supabase JSONB upsert (cloud persist)
  3. → Supabase Realtime broadcasts to all connected devices

On App Load:
  1. Load from localStorage (instant display)
  2. → Fetch from Supabase (merge + resolve conflicts)
  3. → Start Realtime subscription
  4. → 30-second polling fallback safety net
```

---

## Files Created / Changed

| File | Purpose |
|---|---|
| `supabaseClient.js` | Browser Supabase adapter (DB + Storage + Realtime) |
| `assets/supabase.js` | Supabase JS SDK (UMD build, ~218 KB) |
| `supabase_schema.sql` | Run once in Supabase SQL Editor |
| `wrangler.toml` | Cloudflare Pages config |
| `_headers` | Security headers for CDN |
| `_redirects` | SPA fallback routing |
| `index.html` | Updated to load Supabase SDK |
| `app.js` | pushDbToServer and syncFromServer now use Supabase first |

---

## Supabase Free Tier Limits

| Resource | Free Tier |
|---|---|
| **Database** | 500 MB |
| **Storage** | 1 GB |
| **Realtime** | Unlimited connections |
| **API requests** | Unlimited |
| **Bandwidth** | 5 GB / month |

This is more than enough for Adhira Pyrotech billing volume.

---

## Offline / Local Dev (unchanged)

Your app still works fully offline and on local Node.js:
- `npm run dev` serves on `http://localhost:3000`
- Data saves to `data/db.json` AND Supabase simultaneously
- If Supabase is unreachable, localStorage + IndexedDB keeps everything safe
