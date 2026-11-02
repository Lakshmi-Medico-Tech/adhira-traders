# 🚀 ATHIRA CRACKERS & ADHIRA PYROTECH - CPANEL DEPLOYMENT & USER GUIDE

This guide explains how to deploy and manage your complete e-commerce website, admin control dashboard, 3D cracker animations, and MySQL database flow on your cPanel web hosting.

---

## 📁 1. Files Included in This Package

| File / Folder | Purpose |
| :--- | :--- |
| `index.html` | Customer Storefront with 3D fireworks, video demo player, price list, shopping cart, and WhatsApp order placement. |
| `admin.html` | Comprehensive Admin Dashboard to edit every line of text, products, videos, images, banners, logos, phones, and orders. |
| `api.php` | Dual-mode backend for cPanel (PHP + MySQL with automatic JSON fallback). |
| `db_schema.sql` | Complete MySQL schema with all categories, products, default settings, and orders table ready for phpMyAdmin. |
| `local-server.js` | Built-in Node.js server for offline local development and testing. |
| `START_SHOP_WEBSITE.bat` | Double-click batch script to launch the local server instantly on Windows. |
| `database.json` | Local database storage (pre-populated with 115+ products and categories). |
| `storage/` | Media directory containing all cracker images, banners, logos, and uploaded videos. |

---

## 🌐 2. Step-by-Step cPanel Deployment Guide

### Step 1: Upload Files to cPanel File Manager
1. Log into your **cPanel** account.
2. Open **File Manager** and navigate to your domain's root folder (usually `public_html` or a subdomain folder like `public_html/shop`).
3. Upload all files and folders from this directory:
   - `index.html`
   - `admin.html`
   - `api.php`
   - `database.json`
   - `db_schema.sql`
   - `storage/` (keep all product images and subfolders intact)
4. Ensure folder permissions for `storage/` and `database.json` are writable (e.g., `755` for folders, `644` for files).

---

### Step 2: Database Credentials (Configured & Ready)
Your database credentials have already been configured in `config.php` and `api.php`:
- **Database Host:** `localhost`
- **Database Name:** `virtexeindia_adhira_db`
- **Database User:** `virtexeindia_adhira-db`
- **Database Password:** `Vishnulakshmi2515@`
- **Database Charset:** `utf8mb4`

Ensure in cPanel **MySQL Databases** that user `virtexeindia_adhira-db` is added to database `virtexeindia_adhira_db` with **ALL PRIVILEGES**.

---

### Step 3: Import Database Schema via phpMyAdmin (154 Products & Settings)
1. In cPanel, click on **phpMyAdmin**.
2. Select `virtexeindia_adhira_db` from the left sidebar.
3. Click the **Import** tab at the top.
4. Click **Choose File** and select `db_schema.sql` (generated with `utf8mb4` for full bilingual English & Tamil support).
5. Click **Import** (or **Go**) at the bottom.
6. All 7 tables will be populated with complete live store data:
   - `settings` (Brand name, phone numbers, WhatsApp, UPI, Bank Details, and Google Maps embed code)
   - `categories` (All 22 categories matching the wholesale price list)
   - `products` (All 154 products with bilingual English — Tamil names, original MRPs, 90% wholesale prices, descriptions, Cloudinary images & videos)
   - `banners` (Active festival sale banners)
   - `combos`
   - `giftboxes`
   - `orders` (E-Commerce customer orders table)

---

### Step 4: Verify `config.php` and `api.php`
`config.php` and `api.php` are already pre-configured:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'virtexeindia_adhira_db');
define('DB_USER', 'virtexeindia_adhira-db');
define('DB_PASS', 'Vishnulakshmi2515@');
define('DB_CHARSET', 'utf8mb4');
```
*(Note: If MySQL connection is ever interrupted, `api.php` automatically falls back to `database.json` so your website stays online 24/7!)*

---

## 💻 3. Local Offline Testing (Without cPanel)

You can run the entire system locally on your computer at any time:

1. Double click `START_SHOP_WEBSITE.bat` or run:
   ```bash
   node local-server.js
   ```
2. Open your web browser:
   - **Customer Storefront:** `http://localhost:4000`
   - **Admin Control Panel:** `http://localhost:4000/admin` (or `http://localhost:4000/admin.html`)

---

## 🔐 4. Admin Dashboard Credentials & Capabilities

### Default Login:
- **Username:** `admin`
- **Password:** `admin123`
*(You can change the username and password anytime in the **Settings** tab of the Admin Panel).*

### Admin Dashboard Capabilities:
1. **Change Every Single Line of Content:**
   - Website Title & Brand Name
   - Taglines & Announcements (Marquee header text)
   - WhatsApp Number & Direct Click-to-Chat Link
   - Calling Phone Numbers (Multiple support)
   - Factory / Office Address and Email
   - Minimum Order Value & Discount Percentage
2. **Products Management:**
   - Add new crackers with Category, Original Rate, Wholesale Discounted Rate.
   - Edit, delete, and mark products as *In Stock* or *Out of Stock*.
   - **Dual Media Field (Image & Video):**
     - Upload or paste direct cracker photo URL.
     - Upload or paste cracker burst demo video URL (MP4, WebM, or YouTube Shorts/Videos).
     - Preview image and video side-by-side inside the modal.
3. **Interactive 3D Cracker Fireworks Animation:**
   - Real-time physics canvas fireworks with colorful particle sparks and celebration rockets.
   - Interactive mouse/tap click to burst fireworks on demand.
   - Toggle button in the header to launch celebratory rocket showers.
4. **Banners & Sliders:**
   - Upload and manage homepage hero banners with custom titles and promotional subtitles.
5. **Customer Orders:**
   - Real-time order capture with customer name, phone, address, city, and cracker item list.
   - Update order status: *Pending*, *Confirmed*, *Dispatched*, *Delivered*.
   - Instant WhatsApp button to chat directly with customer regarding their order.
6. **Price List & Quick Order:**
   - Integrated wholesale price list table with quantity inputs and live subtotal calculator.

---

## 🎆 5. Product Image & Video Demonstration

Each cracker product supports both image and video presentation:
- **Customer View:** If a product has a video attached, a glowing **"Video Demo"** badge appears on the thumbnail. Clicking it opens the popup player displaying the cracker bursting in action.
- **Admin View:** The Add/Edit Product modal contains dedicated controls for both Photo and Video, allowing file uploads directly to local storage or external links.

---

## 📞 Support & Customization
Everything is pre-configured and tested for both local Node.js environments and production cPanel Apache/LiteSpeed PHP hosting.
