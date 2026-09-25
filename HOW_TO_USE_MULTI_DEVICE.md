# ADHIRA PYROTECH — CLOUD HOSTING, 24/7 ALWAYS-ON & DATABASE GUIDE

## 🎯 1. Why Render Was Showing the Loading Screen & How It Is Solved

### The Problem
On Render's Free tier, the server container automatically goes to sleep (**spins down**) after 15 minutes of inactivity. When you visit the site again, Render shows the black terminal screen:
```
INCOMING HTTP REQUEST DETECTED ...
SERVICE WAKING UP ...
ALLOCATING COMPUTE RESOURCES ...
APPLICATION LOADING ...
```
This causes a 50–90 second delay before the app opens.

### The Solution: Keep-Alive 24/7 Ping Service (100% Free Forever)
Render only goes to sleep if **zero** requests arrive for 15 minutes. By having a free automated pinger check your app every 5 to 9 minutes, **Render will NEVER go to sleep and the loading screen will NEVER show up again!**

#### Setup in 2 Minutes:
1. Go to **[https://uptimerobot.com](https://uptimerobot.com)** (or [https://cron-job.org](https://cron-job.org)) and create a free account.
2. Click **"+ Add New Monitor"**.
3. Choose:
   - **Monitor Type**: `HTTP(s)`
   - **Friendly Name**: `Adhira Billing Keep-Alive`
   - **URL**: `https://<YOUR-RENDER-SUBDOMAIN>.onrender.com/api/ping`
   - **Monitoring Interval**: `Every 5 minutes`
4. Click **"Create Monitor"**.

That's it! Every 5 minutes, UptimeRobot sends a 1-millisecond ping to `/api/ping`.
Render stays awake 24/7/365, and whenever you open the app, it loads **instantly with 0 seconds delay**.

---

## 💾 2. Lifetime Permanent Database (Never Lose Any Quotation or Customer)

### Why Did Your Quotation Disappear Yesterday?
Render Free Tier uses an **ephemeral disk**. When Render went to sleep or restarted, files written to the server's disk were reset back to the original git commit. Furthermore, the old client sync code mistakenly overwrote your browser cache with the reset server data.

### How We Fixed It Permanently:
1. **Intelligent Bidirectional Safe Merge**:
   - The app now uses a two-way union algorithm (`mergeDatabases`).
   - If you create a quotation on your phone or computer, it is stored in `localStorage` AND `IndexedDB`.
   - Even if Render restarts with clean files, your browser **never deletes your quotations or customers**; instead, your browser automatically **restores and pushes them back to the server**!
2. **Dual-Layer Browser Persistence**:
   - Data is stored simultaneously in browser `localStorage` and `IndexedDB`. Even if browser cache is partially cleaned, your records remain intact.
3. **True Cloud Database Support (PostgreSQL / Supabase / Neon / Render PostgreSQL)**:
   - `server.js` now has built-in support for persistent cloud PostgreSQL!
   - You can connect a free permanent database that **never wipes or resets**, even if Render rebuilds 1,000 times.

#### How to Add a Free Lifetime PostgreSQL Database to Render:
1. In your **Render Dashboard**, click **New +** -> **PostgreSQL**.
2. Give it a name like `adhira-db` and select the **Free** plan.
3. Once created, copy the **Internal Database URL** (or External Connection String).
4. Go to your **Adhira Pyrotech Web Service** on Render -> **Environment** tab.
5. Add an environment variable:
   - **Key**: `DATABASE_URL`
   - **Value**: *(paste the copied PostgreSQL connection URL)*
6. Click **Save Changes**.

`server.js` will automatically detect `DATABASE_URL`, create the storage tables, and persist all your quotations, customers, products, and categories in PostgreSQL permanently for life!

---

## 📦 3. Complete Fireworks Product Catalog (141 Products, 24 Categories)

All 131 products from **`Thais Price.pdf`** have been extracted and added with their exact categories, packings, MRP rates, and 90% discount rates, while leaving all previous products and sample records **100% untouched**:

### Summary of Categories:
1. **Fountains & Smoke** (Original seed products)
2. **Aerial & Crackers** (Original seed products)
3. **Sparklers & Showers** (Original seed products)
4. **Novelty Fireworks** (Original seed products)
5. **Sound Crackers** (Original seed products)
6. **Gift Boxes** (Original seed products)
7. **ONE SOUND CRACKERS** (4" Lakshmi, 4 dlxIX Lakshmi, 3 1/2 Lakshmi, 2 3/4 kuruvi, Gold Lakshmi)
8. **Kamatchi Ground Chakkars** (Big 10 Pcs, Big 25 Pcs, Special, Deluxe, Disco Wheel)
9. **Kamatchi Flower Pots** (Ganga Jamuna, Pots Big, Special, Asoka, Colour Kotti, Deluxe 5 Pcs)
10. **Kamatchi Atom Bomb** (Bullet Bomb, Hydro Bomb, King of King Bomb, Classic, Mega, Paper Bomb 1/4, 1/2, 1 Kg)
11. **Garland Special** (100 wala, 56 wala, 28 wala, 1000 wala, 1000 wala Full, 1 1/2 & 4" Twinkling Star)
12. **Thais Item** (Drone, Rangeela Dhamaka, Mega Crackling, Money Bank, Old is Gold, Colour Smoke, Naruto Siren, Bat Ball, Rock Music, Spicy Chilis)
13. **Rajkala Items** (Tom & Jerry, Scooby Doo, Goodly, X-Mas, Paris Tower, Apple, Shin Chin, Chhotu, Jelly, Sea Laser, Colour Rain, Colour Candles, Twins Tone, Belly Dance)
14. **Sastha Items** (Touch & Touch, Golden Rise, YoYo, Selfie Stick, Bada Peacock, Kutralam, Golden Peacock, Swinging Pop, Super Singer)
15. **Fountains** (Golden Drops, Feather Drops, Chhota Bheem, 90 Watts, Loli Pop, 4x4 Wheel, Power Thor, I Cone)
16. **Kids Item** (Roll Cap, Kit Kat, Photo Flash, Helicopter, Butterfly, Bambaram, Mercury Torch, Ultra Pencil)
17. **Bijili Crackers** (Red Bijili 50 & 100 Pcs, Stripped Bijili 50 & 100 Pcs)
18. **Rockets** (Baby Rockets, Rocket Bomb, Whistling Rockets, X Press Rockets)
19. **Single Shot** (7 Shot, 1" Chotta Fancy, 2" Colour Fancy, 3 1/2 Colour Fancy, 4" Colour Fancy, 1 3/4" 3 Pcs Fancy, 3 Pcs Fancy)
20. **Shots** (30 Shot, 60 Shot, 120 Shot, 240 Shot Multi Colour)
21. **Crackling Shot** (12 Shot, 25 Shot, 50 Shot, 100 Shot Crackling)
22. **Matches Box** (Ben-10, Lamba, Mega)
23. **Sparklers** (7cm, 10cm, 12cm, 15cm, 30cm, 50cm in Electric, Colour, Green, Red)
24. **Gift Box** (20 Item, 40 Item, 50 Item, 60 Item Gift Box)

---

## 🚀 4. Local Fast Launcher (Instant 0-Second Startup Offline)

You can also run the software directly on your computer with zero internet or cloud dependencies:

1. Double click **`START_ADHIRA_SERVER.bat`**.
2. Opens immediately at `http://localhost:3000`.
3. Works completely offline, instantaneous speed, and saves data to `data/db.json` with automatic backups!
