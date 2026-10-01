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

### Step 2: Create MySQL Database & User in cPanel
1. In cPanel, click **MySQL Database Wizard**.
2. **Step 1:** Enter a database name (e.g. `cpaneluser_athiradb`) and click *Next Step*.
3. **Step 2:** Create a database user (e.g. `cpaneluser_athirauser`), generate a strong password, and click *Create User*.
4. **Step 3:** Check the box **ALL PRIVILEGES** and click *Make Changes*.
5. Save your Database Name, Username, and Password for Step 4.

---

### Step 3: Import Database Schema via phpMyAdmin
1. In cPanel, click on **phpMyAdmin**.
2. Select your newly created database from the left sidebar.
3. Click the **Import** tab at the top.
4. Click **Choose File** and select `db_schema.sql`.
5. Click **Import** (or **Go**) at the bottom.
6. All 5 tables will be created:
   - `settings`
   - `categories`
   - `products` (supports both image and video)
   - `banners`
   - `orders`

---

### Step 4: Configure `api.php` with MySQL Credentials
1. In cPanel File Manager, right-click `api.php` and click **Edit**.
2. Update lines 20–23 with your database details:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'your_cpaneluser_athiradb');
   define('DB_USER', 'your_cpaneluser_athirauser');
   define('DB_PASS', 'your_database_password');
   define('DB_CHARSET', 'utf8mb4');
   ```
3. Save changes.
   *(Note: If MySQL credentials are not provided or connection fails, `api.php` automatically falls back to `database.json` so your website never crashes!)*

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
