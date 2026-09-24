# ADHIRA PYROTECH — MULTI-DEVICE & LIVE HOSTING GUIDE

## 🎯 What Has Been Set Up

Your Adhira Pyrotech Billing & Quotation software now has a **Real Central Database** (`data/db.json`) and **Express REST API Server** (`server.js`).

1. **Shared Realtime Database**:
   - Any quotation, customer, product, category, or seller added on ANY phone, tablet, or laptop is automatically saved to the central server database (`data/db.json`).
   - Every connected device auto-syncs every few seconds. If someone creates a quotation on a mobile phone, it appears on the billing counter computer immediately!
   - Offline safety: Local storage is maintained as cache, so if Wi-Fi disconnects, work is never lost.

2. **Dashboard Multi-Device Banner & QR Code**:
   - The topbar shows a live status badge: **🟢 Realtime Synced**.
   - The dashboard includes a **📱 Central Realtime Database Active** banner.
   - Click **📲 Scan Mobile QR Code** to view an interactive QR code you can scan with any phone camera to immediately open the app.

---

## 🚀 How to Open on Other Devices (Phone, Tablet, Laptop)

### Method 1: On Same Wi-Fi Network (Fastest & Simplest)

1. Make sure both your computer and phone are connected to the same Wi-Fi router / mobile hotspot.
2. On your computer, your server address is:
   ```
   http://10.64.104.66:3000
   ```
3. Open Safari or Chrome on your mobile phone and type:
   `http://10.64.104.66:3000`
   **OR** simply click **"Scan Mobile QR Code"** on the dashboard and point your phone camera at the screen!

---

### Method 2: Live Internet Access (Outside Office / Mobile 4G & 5G)

If you are away from the office or travelling and want to bill from mobile data:

1. Double-click **`START_LIVE_INTERNET_TUNNEL.bat`** (or run `npm run live` in terminal).
2. It will display a live secure HTTPS URL (e.g., `https://your-app.loca.lt`).
3. You can open that URL on any smartphone or laptop anywhere in India!

---

### Method 3: 24/7 Free Cloud Hosting (Railway or Render)

If you want the billing system to be permanently online 24/7 without needing your laptop to stay powered on:

1. Create a free account on [Render.com](https://render.com) or [Railway.app](https://railway.app).
2. Connect your project folder / GitHub repository.
3. Set Start Command to: `npm start`
4. You will get a permanent free URL like `https://adhira-pyrotech-billing.onrender.com` that works 24/7 on all devices!

---

## 💾 Automatic Backups

- Click the sync badge or use the Multi-Device modal to click **"💾 Create Backup"**.
- Timestamped backup files are automatically created in the `backups/` folder.
- You can also export full JSON backups from the Settings page anytime.

---

## 🛠️ Quick Desktop Launcher

Inside the `c:\adhira billing software\adhira_pyrotech_billing\` folder:
- **`START_ADHIRA_SERVER.bat`**: Double-click to start the server and open your browser automatically.
- **`START_LIVE_INTERNET_TUNNEL.bat`**: Double-click for instant live public access.
