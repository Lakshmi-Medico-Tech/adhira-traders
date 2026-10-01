-- ==========================================================================
-- ADHIRA FIRE WORKS & PYROTECH — Supabase PostgreSQL Schema & Storage Setup
-- Sivakasi, Virudhunagar, Tamil Nadu
-- One-click Run in Supabase SQL Editor: https://supabase.com/dashboard/project/ozpkzwkeenxdgqiwcntm/sql
-- ==========================================================================

-- 1. PRIMARY STORE TABLE (Fast JSONB snapshot, 100% offline-to-cloud realtime sync)
CREATE TABLE IF NOT EXISTS public.adhira_store (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.adhira_store ENABLE ROW LEVEL SECURITY;

-- Allow public read/write access via Supabase publishable/anon key
DROP POLICY IF EXISTS "Allow public access to adhira_store" ON public.adhira_store;
CREATE POLICY "Allow public access to adhira_store"
  ON public.adhira_store
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Enable Realtime Broadcast for instant multi-device synchronization
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
      AND schemaname = 'public' 
      AND tablename = 'adhira_store'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.adhira_store;
  END IF;
END $$;


-- 2. SUPABASE STORAGE BUCKET CREATION (For Quotation PDFs, Invoice PDFs & Backups)
-- Bucket: 'adhira-storage' (Public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'adhira-storage', 
  'adhira-storage', 
  true, 
  52428800, -- 50 MB
  ARRAY['application/pdf', 'application/json', 'image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  file_size_limit = 52428800;

-- Storage RLS Policies (Allow Read, Upload, Update, Delete for adhira-storage)
DROP POLICY IF EXISTS "Allow public download from adhira-storage" ON storage.objects;
CREATE POLICY "Allow public download from adhira-storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'adhira-storage');

DROP POLICY IF EXISTS "Allow public upload to adhira-storage" ON storage.objects;
CREATE POLICY "Allow public upload to adhira-storage"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'adhira-storage');

DROP POLICY IF EXISTS "Allow public update in adhira-storage" ON storage.objects;
CREATE POLICY "Allow public update in adhira-storage"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'adhira-storage');

DROP POLICY IF EXISTS "Allow public delete in adhira-storage" ON storage.objects;
CREATE POLICY "Allow public delete in adhira-storage"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'adhira-storage');


-- 3. RELATIONAL SCHEMAS (For direct Supabase Table Editor querying & analytics)

-- Categories Table
CREATE TABLE IF NOT EXISTS public.adhira_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.adhira_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public access to adhira_categories" ON public.adhira_categories;
CREATE POLICY "Allow public access to adhira_categories" ON public.adhira_categories FOR ALL USING (true) WITH CHECK (true);

-- Sellers / Factory Profiles Table
CREATE TABLE IF NOT EXISTS public.adhira_sellers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  legal_name TEXT,
  gstin TEXT,
  reg_arn_ref TEXT,
  pan TEXT,
  phone TEXT,
  alt_phone TEXT,
  email TEXT,
  address1 TEXT,
  address2 TEXT,
  area TEXT,
  city TEXT,
  district TEXT,
  state TEXT,
  state_code TEXT DEFAULT '33',
  pin TEXT,
  bank_name TEXT,
  account_number TEXT,
  branch TEXT,
  ifsc TEXT,
  upi TEXT,
  signatory_name TEXT,
  signatory_designation TEXT,
  is_default BOOLEAN DEFAULT false,
  data_json JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.adhira_sellers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public access to adhira_sellers" ON public.adhira_sellers;
CREATE POLICY "Allow public access to adhira_sellers" ON public.adhira_sellers FOR ALL USING (true) WITH CHECK (true);

-- Customers Table
CREATE TABLE IF NOT EXISTS public.adhira_customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  legal_name TEXT,
  gstin TEXT,
  pan TEXT,
  type TEXT DEFAULT 'Wholesale Dealer',
  contact_person TEXT,
  phone TEXT,
  alt_phone TEXT,
  email TEXT,
  billing_address TEXT,
  shipping_address TEXT,
  city TEXT,
  district TEXT,
  state TEXT,
  state_code TEXT DEFAULT '33',
  pin TEXT,
  payment_terms TEXT DEFAULT 'Advance',
  status TEXT DEFAULT 'Active',
  data_json JSONB,
  created_at TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.adhira_customers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public access to adhira_customers" ON public.adhira_customers;
CREATE POLICY "Allow public access to adhira_customers" ON public.adhira_customers FOR ALL USING (true) WITH CHECK (true);

-- Products Catalog Table (141 Sivakasi Fireworks Products)
CREATE TABLE IF NOT EXISTS public.adhira_products (
  id TEXT PRIMARY KEY,
  item_no TEXT,
  name TEXT NOT NULL,
  short_name TEXT,
  category TEXT,
  hsn TEXT DEFAULT '3604',
  packing TEXT,
  pieces INT DEFAULT 1,
  unit TEXT DEFAULT 'CASE',
  rate NUMERIC(12,2) DEFAULT 0.00,
  disc_rate NUMERIC(12,2) DEFAULT 0.00,
  case_rate NUMERIC(12,2) DEFAULT 0.00,
  gst NUMERIC(5,2) DEFAULT 18.00,
  active BOOLEAN DEFAULT true,
  image TEXT,
  data_json JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.adhira_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public access to adhira_products" ON public.adhira_products;
CREATE POLICY "Allow public access to adhira_products" ON public.adhira_products FOR ALL USING (true) WITH CHECK (true);

-- Quotations Table
CREATE TABLE IF NOT EXISTS public.adhira_quotations (
  id TEXT PRIMARY KEY,
  number TEXT NOT NULL UNIQUE,
  date TEXT NOT NULL,
  valid_until TEXT,
  customer_id TEXT,
  customer_name TEXT,
  customer_gstin TEXT,
  customer_state TEXT,
  customer_state_code TEXT DEFAULT '33',
  seller_id TEXT,
  seller_name TEXT,
  subtotal NUMERIC(14,2) DEFAULT 0.00,
  total_discount NUMERIC(14,2) DEFAULT 0.00,
  taxable_amount NUMERIC(14,2) DEFAULT 0.00,
  cgst NUMERIC(14,2) DEFAULT 0.00,
  sgst NUMERIC(14,2) DEFAULT 0.00,
  igst NUMERIC(14,2) DEFAULT 0.00,
  total_gst NUMERIC(14,2) DEFAULT 0.00,
  round_off NUMERIC(8,2) DEFAULT 0.00,
  grand_total NUMERIC(14,2) DEFAULT 0.00,
  status TEXT DEFAULT 'DRAFT',
  pdf_url TEXT,
  data_json JSONB,
  created_at TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.adhira_quotations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public access to adhira_quotations" ON public.adhira_quotations;
CREATE POLICY "Allow public access to adhira_quotations" ON public.adhira_quotations FOR ALL USING (true) WITH CHECK (true);

-- GST Tax Invoices Table
CREATE TABLE IF NOT EXISTS public.adhira_invoices (
  id TEXT PRIMARY KEY,
  number TEXT NOT NULL UNIQUE,
  date TEXT NOT NULL,
  quotation_ref TEXT,
  customer_id TEXT,
  customer_name TEXT,
  customer_gstin TEXT,
  customer_state TEXT,
  customer_state_code TEXT DEFAULT '33',
  seller_id TEXT,
  seller_name TEXT,
  subtotal NUMERIC(14,2) DEFAULT 0.00,
  total_discount NUMERIC(14,2) DEFAULT 0.00,
  taxable_amount NUMERIC(14,2) DEFAULT 0.00,
  cgst NUMERIC(14,2) DEFAULT 0.00,
  sgst NUMERIC(14,2) DEFAULT 0.00,
  igst NUMERIC(14,2) DEFAULT 0.00,
  total_gst NUMERIC(14,2) DEFAULT 0.00,
  round_off NUMERIC(8,2) DEFAULT 0.00,
  grand_total NUMERIC(14,2) DEFAULT 0.00,
  payment_status TEXT DEFAULT 'PENDING',
  ewb_number TEXT,
  irn TEXT,
  pdf_url TEXT,
  data_json JSONB,
  created_at TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.adhira_invoices ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public access to adhira_invoices" ON public.adhira_invoices;
CREATE POLICY "Allow public access to adhira_invoices" ON public.adhira_invoices FOR ALL USING (true) WITH CHECK (true);

-- Simple / Estimate Bills Table
CREATE TABLE IF NOT EXISTS public.adhira_simple_bills (
  id TEXT PRIMARY KEY,
  number TEXT NOT NULL UNIQUE,
  date TEXT NOT NULL,
  buyer_name TEXT,
  buyer_phone TEXT,
  buyer_address TEXT,
  total_boxes INT DEFAULT 0,
  subtotal NUMERIC(14,2) DEFAULT 0.00,
  discount_amount NUMERIC(14,2) DEFAULT 0.00,
  packing_charge NUMERIC(14,2) DEFAULT 0.00,
  round_off NUMERIC(8,2) DEFAULT 0.00,
  grand_total NUMERIC(14,2) DEFAULT 0.00,
  pdf_url TEXT,
  data_json JSONB,
  created_at TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.adhira_simple_bills ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public access to adhira_simple_bills" ON public.adhira_simple_bills;
CREATE POLICY "Allow public access to adhira_simple_bills" ON public.adhira_simple_bills FOR ALL USING (true) WITH CHECK (true);
