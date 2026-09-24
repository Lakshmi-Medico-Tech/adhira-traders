# ADHIRA PYROTECH — Advanced GST Quotation & Billing Management System
**Sivakasi, Tamil Nadu**

A commercial-grade, GST-compliant B2B business management web application engineered specifically for **ADHIRA PYROTECH** (Fireworks Manufacturers & Traders, Sivakasi).

---

## 🌟 Highlights & Key Features

### 1. Brand Identity & Design System
- **Official Branding**: Built around the official **ADHIRA PYROTECH** logo (`assets/adhira-logo.jpg`).
- **Corporate Palette**: Deep Navy (`#0c1033`, `#17205a`) and Festive Gold/Amber (`#f59e0b`, `#fbbf24`).
- **Typography**: Google Fonts **Outfit** (headings & document titles) and **Inter** (tables, figures, and data).
- **Responsive Layout**: Desktop sidebar navigation with mobile bottom navigation bar and touch-friendly controls.

### 2. Company & Seller Master
- Initialized with GST certificate credentials:
  - **Trade Name**: `ADHIRA PYROTECH` (Cert: `ATHIRA TRADERS`)
  - **Legal Name**: `MURUGAN SELVARAJ` (Proprietor)
  - **GSTIN**: `33QRQPS0659E1Z4`
  - **Address**: `8/444, Unnamed Road, Near Sri Jaishnavi Stores, Gandhinagar, Anaiyur, Sivakasi, Tamil Nadu - 626124`
  - **Bank Details**: State Bank of India, A/c: `39485712093`, IFSC: `SBIN0000918`, UPI: `adhirapyro@sbi`
- Completely editable in **Settings** without altering past historical documents.

### 3. Customer & Shop Master
- Preloaded with sample customer from the reference invoice:
  - **MB & SONS** (`36JNYPS8775N1Z5`), Sangareddy, Telangana (`36`).
  - **SRI VELAN FIREWORKS** (`33AAAPL1234A1Z5`), Madurai, Tamil Nadu (`33`).
- **GSTIN Auto-Fill & Duplicate Detection**:
  - Typing or selecting an existing customer automatically populates billing address, shipping address, state, and contact details.
  - Detects duplicate GSTIN entries and prevents accidental duplicates.
  - Soft-deletes customers with linked quotations/invoices to protect document integrity.

### 4. Fireworks Product & Categories Master
- Preloaded with all 10 seed products:
  1. **Fog (Smoke)** — Box: 1 (3 Pcs), Rate: ₹75, Case Rate: 110, HSN: 3604, GST: 18%
  2. **Mini Smoke** — Box: 1 (3 Pcs), Rate: ₹60, Case Rate: 140, HSN: 3604, GST: 18%
  3. **Thunder (Crackling)** — Box: 1 (3 Pcs), Rate: ₹75, Case Rate: 110, HSN: 3604, GST: 18%
  4. **Thunder (Red & Green)** — Box: 1 (3 Pcs), Rate: ₹75, Case Rate: 110, HSN: 3604, GST: 18%
  5. **Hand Shower (Water Queen)** — Box: 1 (3 Pcs), Rate: ₹75, Case Rate: 110, HSN: 3604, GST: 18%
  6. **Mony Bank** — Box: 1 (3 Pcs), Rate: ₹60, Case Rate: 118, HSN: 3604, GST: 18%
  7. **Crackling (Fountain 4”)** — Box: 1 (3 Pcs), Rate: ₹100, Case Rate: 75, HSN: 3604, GST: 18%
  8. **Selfi Stick** — Box: 1 (5 Pcs), Rate: ₹40, Case Rate: 140, HSN: 3604, GST: 18%
  9. **Bat & Ball** — Box: 1 Pcs, Rate: ₹120, Case Rate: 80, HSN: 3604, GST: 18%
  10. **Adhira Crackling** — Box: 1 (4 Pcs), Rate: ₹100, Case Rate: 110, HSN: 3604, GST: 18%
- **Dedicated Categories Page**: Create, rename, delete categories with live product count badges and catalog linkage.
- Product categories, image upload with automatic client-side compression, Grid/Table view toggles, and duplication.

### 5. Advanced Quotation & Billing Engine
- **From Details (Seller / Factory)**: Every quotation includes an editable "0. From" section (Factory Name, GSTIN `33QRQPS0659E1Z4`, ARN Reference `AA330426046300R_RC13042026`, Address, Phone, Email) preloaded from Settings with 1-click Reset.
- **To Details (Customer / Shop)**: Rapid 15-digit GSTIN lookup auto-fills customer details and state code, with searchable dropdown of all saved shops in the database. New customer entries and edits are saved permanently in `localStorage` DB.
- **Configurable Numbering**: Indian Financial Year format (e.g. `QT/2026-27/0001`, `INV/2026-27/0001`).
- **Mathematical Precision & GST Rules**:
  - Interstate (Outside TN, e.g. Telangana 36): Applies **IGST (18%)**, CGST = 0, SGST = 0.
  - Intrastate (Tamil Nadu 33): Applies **CGST (9%) + SGST (9%)**, IGST = 0.
  - User reference invoice verified: ₹10,500 Taxable + ₹1,890 IGST = ₹12,390 Grand Total.
  - Decimal-safe rounding and Round Off adjustment.
  - Indian Amount in Words (Crores, Lakhs, Thousands, Hundreds).
- **Autosave Drafts**: Automatic background saving every 2.5 seconds to prevent accidental data loss.
- **Historical Immutability**: Stores frozen snapshots of seller, customer, items, tax summary, and bank details inside every document.

### 6. Commercial A4 PDF Engine
- Strict A4 dimensions (`210mm x 297mm`, `794px x 1123px`).
- Subtle centered watermark of the **ADHIRA PYROTECH** logo.
- Header with trade name, Sivakasi address, GSTIN, Phone, Email.
- Two-column Bill To & Ship To.
- Transport & Dispatch details bar (Customer PO, Payment Terms, Dispatch Through, Vehicle No).
- Professional fireworks items table with HSN/SAC, packing, rate, discount, taxable, GST.
- **HSN/SAC Tax Liability Breakdown Table** (HSN, Taxable Value, CGST/SGST/IGST, Total Tax).
- Grand Total card highlighted with navy background & gold accents.
- Bank details & UPI ID, Declaration, Terms & Conditions, Authorised Signatory box.
- Interactive modal with Zoom In/Out, Download PDF (via `html2pdf.js`), Print / Save as PDF (`window.print()`), WhatsApp Share, Email Share.

### 7. Tax Invoices & E-Way Bill Integration
- 1-click **Convert to Invoice** workflow.
- Assigns formal invoice number (`INV/2026-27/0001`), copies frozen snapshots, preserves quotation, and triggers celebratory confetti.
- Optional fields for E-Way Bill Number, Date, Transporter Name, and Vehicle Number.

### 8. Analytics & Global Search
- Real-time KPI dashboard: Total Quotations, Taxable Value, GST Liability, Grand Total.
- GST breakdown report for GSTR-1 preparation.
- Top selling products and customer sales volume summary.
- CSV export for Quotations, Invoices, Customers, Products, and GST Reports.
- **Spotlight Search** (`Ctrl+K` or `/`): Debounced instant search across all entities.

### 9. User Roles & Security
- **Admin**: Full master editing, document sequence customization, deletions, and JSON backup/restore.
- **Staff**: Issue/edit quotations, view records, print PDFs, convert invoices; restricted from deleting master records or changing company GSTIN.

---

## 🚀 Running the Application

### Option 1: Standalone Node Server (Recommended)
```bash
node server.js
```
Open **[http://localhost:3000](http://localhost:3000)** in any modern web browser.

### Option 2: Direct File Open
Simply double-click or open `index.html` in Chrome, Edge, Safari, or Firefox. All assets and libraries (`html2pdf.bundle.min.js`, `confetti.min.js`) are bundled locally for 100% offline functionality.

---

## 🧪 Automated Testing
Run the automated test suite verifying tax calculations, Indian words conversion, GSTIN validation, and financial year logic:
```bash
node test_suite.js
```
