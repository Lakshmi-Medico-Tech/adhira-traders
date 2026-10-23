# 🚀 ATHIRA CRACKERS / ADHIRA TRADERS - RENDER & SUPABASE DEPLOYMENT GUIDE

This guide details how to deploy the **Athira Crackers / Adhira Pyrotech Shop Website** to **Render** (`render.com`) connected to a real **Supabase PostgreSQL Database** populated with **100% of your store data** (22 Categories, 154 Products, Settings, Banners).

---

## 📋 Table of Contents
1. [Step 1: Set Up Real Supabase Database with Full Data](#step-1-set-up-real-supabase-database-with-full-data)
2. [Step 2: Get Your Supabase API Credentials](#step-2-get-your-supabase-api-credentials)
3. [Step 3: Push Code to GitHub](#step-3-push-code-to-github)
4. [Step 4: Deploy to Render (Web Service)](#step-4-deploy-to-render-web-service)
5. [Step 5: Verify Your Live Storefront & Admin](#step-5-verify-your-live-storefront--admin)
6. [Troubleshooting & Pro Tips](#troubleshooting--pro-tips)

---

## Step 1: Set Up Real Supabase Database with Full Data

We have prepared `supabase_schema.sql` with the complete database schema, Row Level Security (RLS) policies, and **all 154 products across all 22 categories**.

### Option A: Via Supabase SQL Editor (Recommended - 1 Click, 20 Seconds)
1. Log in to [Supabase](https://supabase.com/dashboard).
2. Create a new project (e.g., `adhira-traders-db`), choose **Singapore / South Asia** as the region, and set a database password.
3. Once the project is created, click **SQL Editor** on the left menu (icon: `>_`).
4. Click **+ New Query**.
5. Open [`supabase_schema.sql`](./supabase_schema.sql) in this directory, copy the **entire file content**, and paste it into the Supabase SQL editor.
6. Click **Run** (green button on bottom right).
7. You will see `Success. No rows returned` or execution confirmed.
   - Go to **Table Editor** on the left:
     - `categories`: **22 rows**
     - `products`: **154 rows**
     - `settings`: Store title, address, phone numbers, discounts
     - `banners`: 4 banners
     - `orders`: Ready for live customer orders

### Option B: Automated Sync Script via Terminal
If you prefer running a script from your computer:
```bash
node seed-supabase.js
```
*(Make sure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are placed in `.env` first).*

---

## Step 2: Get Your Supabase API Credentials

1. In your Supabase Dashboard, go to **Project Settings** (gear icon at the bottom left).
2. Click **API** under Configuration.
3. Copy the two values:
   - **Project URL**: `https://<your-project-id>.supabase.co`
   - **anon / public key**: `eyJhbGciOi...` (or `sb_publishable_...`)

4. Update your local `.env` and `.env.local` files:
```env
SUPABASE_URL=https://<your-project-id>.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

---

## Step 3: Push Code to GitHub

Open PowerShell or terminal in `shop website`:
```bash
git add .
git commit -m "feat: Add Render deployment config, dynamic Supabase bridge and full data seed"
git push origin main
```
*(Or push to `adhira-traders` remote if you use a dedicated repository)*:
```bash
git push adhira-traders main
```

---

## Step 4: Deploy to Render (Web Service)

### Method 1: Using Render Dashboard (Recommended)
1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Click the blue **New +** button at the top right and select **Web Service**.
3. Choose **Build and deploy from a Git repository** and select your repository (`adhira-traders` or `adhira-pyrotech-billing`).
4. Fill in the details:
   - **Name**: `adhira-traders` (or your choice)
   - **Region**: `Singapore` (fastest for India / Tamil Nadu)
   - **Branch**: `main`
   - **Root Directory**:
     - If repo is `adhira-traders`: leave blank (or `.`)
     - If repo is `adhira-pyrotech-billing`: enter `shop website`
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `node local-server.js`
   - **Instance Type**: `Free`
5. Scroll down to **Environment Variables** and add:
   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `SUPABASE_URL` | `https://<your-project-id>.supabase.co` |
   | `SUPABASE_ANON_KEY` | `<your-supabase-anon-key>` |

6. Click **Create Web Service**.
7. Render will clone the repo, start `local-server.js`, and provide your live URL (e.g., `https://adhira-traders.onrender.com`).

---

## Step 5: Verify Your Live Storefront & Admin

Once Render displays **"Live"**:
1. **Storefront**: Open `https://<your-service>.onrender.com/`
   - Notice the products, 22 categories, Diwali discount banners, and genuine factory prices.
2. **Price List**: Open `https://<your-service>.onrender.com/price-list`
   - Real-time price list with instant category filtering and PDF generation.
3. **Admin Dashboard**: Open `https://<your-service>.onrender.com/admin`
   - Default login:
     - Username: `admin`
     - Password: `admin`
   - Go to **Database Status**: It will show **Connected to Supabase PostgreSQL Cloud** with product & category counts!

---

## 💡 Troubleshooting & Pro Tips

- **Render Free Tier Sleep**: On Render Free tier, web services sleep after 15 minutes of inactivity and take 20–30 seconds to wake up on the first visit.
  - *Tip*: You can set up a free monitor on [UptimeRobot](https://uptimerobot.com) pinging your site every 5 minutes to keep it awake 24/7!
- **Zero Downtime Fallback**: If Supabase ever has network latency, the app automatically falls back to `database.json`, ensuring your customers never experience a blank page.
- **Admin Password**: After first login, change the default admin password in the Admin Settings tab.
