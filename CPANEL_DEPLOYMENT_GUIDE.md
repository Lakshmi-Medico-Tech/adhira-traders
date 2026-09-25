# 🚀 ADHIRA PYROTECH BILLING SOFTWARE — cPanel Hosting & Database Guide

This comprehensive guide shows you how to host your Adhira Pyrotech Billing Software on your **cPanel hosting** so it runs **24/7/365 with ZERO loading delays**, uses your **cPanel MySQL database (or persistent JSON)**, and keeps all your quotations, invoices, customers, and 141 products permanently safe for a lifetime.

---

## 📋 What Was Done For You

1. **cPanel PHP & MySQL Backend Added**:
   - `api.php`: Fast, reliable API backend supporting MySQL with automatic fallback to `data/db.json`.
   - `config.php`: Easy database credential configuration.
   - `.htaccess`: URL rewriting and security file protection.
   - `db_schema.sql`: Pre-configured table schema for MySQL.
2. **Removed 1-Tap Pills Area**: The quick pills area has been cleanly removed to give maximum space to quotation line items.
3. **Unified Search + Add + Type Boxes Added Across All Pages**:
   - **Quotation Line Items**: Smart combobox where you can type to search, pick from the dropdown, or type a custom product directly into the same box.
   - **Quotations, Invoices, Customers, Products Pages**: Unified `[ 🔍 Search / Type ... | + Add Button ]` toolbar.
4. **Perfect A4 PDF & Print-Only Engine**:
   - When clicking **"Print PDF Only"**, an isolated iframe prints *strictly* the A4 invoice/quotation sheet (210mm x 297mm) without any website toolbars, buttons, or page elements.
5. **WhatsApp & Email PDF Auto-Dispatch**:
   - Generates and downloads the real high-res A4 PDF file directly to your computer/phone first, and then immediately opens WhatsApp / Email pre-filled with the exact details ready to attach and send.
6. **All 141 Fireworks Products Saved**:
   - All 131 products from `Thais Price.pdf` + original 10 seed products across 24 categories are loaded in the database.

---

## 🛠️ Step-by-Step cPanel Deployment Guide

### STEP 1: Compress the Project Files
On your computer, select all files in `c:\adhira billing software\adhira_pyrotech_billing` **EXCEPT** `node_modules` and `.git`:
- `index.html`
- `app.js`
- `styles.css`
- `api.php`
- `config.php`
- `.htaccess`
- `db_schema.sql`
- `data/` folder (contains `db.json`)
- `assets/` folder

Right-click and create a ZIP file named `adhira_billing.zip`.

---

### STEP 2: Upload to cPanel File Manager
1. Log in to your **cPanel account**.
2. Click **File Manager**.
3. Open `public_html` (or create a subfolder like `public_html/billing`).
4. Click **Upload** at the top and upload `adhira_billing.zip`.
5. Once uploaded, right-click `adhira_billing.zip` and click **Extract**.
6. Ensure `data/` folder has permission `0755` or `0777` so PHP can save data.

---

### STEP 3: Setup MySQL Database in cPanel (Optional but Recommended)
*Note: If you skip this step, the app will automatically store everything in `data/db.json` permanently on your cPanel server.*

To connect to cPanel MySQL:
1. In cPanel, click **MySQL Databases**.
2. **Create New Database**: e.g., `yourusername_adhira_db`.
3. **Create New User**: e.g., `yourusername_adhira_user` with a strong password.
4. **Add User to Database**: Select the user and database, check **ALL PRIVILEGES**, and click **Make Changes**.
5. Go to **phpMyAdmin** from cPanel, select your database `yourusername_adhira_db`, go to the **Import** tab, and upload `db_schema.sql` (or just let `api.php` automatically create the table on first run).
6. Open `config.php` in File Manager (Edit) and enter your credentials:
```php
return [
    'db_host' => 'localhost',
    'db_port' => '3306',
    'db_name' => 'yourusername_adhira_db',
    'db_user' => 'yourusername_adhira_user',
    'db_pass' => 'your_strong_password_here',
];
```
7. Click **Save Changes**.

---

### STEP 4: Open Your Billing Software!
Visit your domain:
```
https://yourdomain.com/
```
(or `https://yourdomain.com/billing/` if placed in a subfolder).

You will see:
- 🟢 **"Realtime Synced"** badge in the top right.
- All **141 products** loaded across all **24 categories**.
- Fast, instant loading with **zero sleep delays**.
- Permanent storage in your cPanel server.
- Universal search-add-type boxes.
- Clean A4 PDF export and WhatsApp/Email dispatch.
