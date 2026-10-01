-- ==========================================================================
-- ADHIRA FIRE WORKS & PYROTECH — cPanel MySQL Relational Database Schema
-- Sivakasi, Virudhunagar, Tamil Nadu
-- Supports direct phpMyAdmin viewing & querying of all billing entities
-- ==========================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. MASTER KEY-VALUE STORE (Fast hydration & settings snapshot)
CREATE TABLE IF NOT EXISTS `adhira_store` (
  `key` VARCHAR(64) NOT NULL,
  `data` LONGTEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. PRODUCT CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS `adhira_categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL UNIQUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. FACTORY / SELLER ("FROM") PROFILES TABLE
CREATE TABLE IF NOT EXISTS `adhira_sellers` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `legal_name` VARCHAR(255) DEFAULT NULL,
  `gstin` VARCHAR(32) DEFAULT NULL,
  `reg_arn_ref` VARCHAR(64) DEFAULT NULL,
  `pan` VARCHAR(32) DEFAULT NULL,
  `phone` VARCHAR(64) DEFAULT NULL,
  `alt_phone` VARCHAR(64) DEFAULT NULL,
  `email` VARCHAR(128) DEFAULT NULL,
  `address1` TEXT DEFAULT NULL,
  `address2` TEXT DEFAULT NULL,
  `area` VARCHAR(128) DEFAULT NULL,
  `city` VARCHAR(128) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `state` VARCHAR(128) DEFAULT NULL,
  `state_code` VARCHAR(8) DEFAULT '33',
  `pin` VARCHAR(32) DEFAULT NULL,
  `bank_name` VARCHAR(128) DEFAULT NULL,
  `account_number` VARCHAR(64) DEFAULT NULL,
  `branch` VARCHAR(128) DEFAULT NULL,
  `ifsc` VARCHAR(64) DEFAULT NULL,
  `upi` VARCHAR(128) DEFAULT NULL,
  `signatory_name` VARCHAR(128) DEFAULT NULL,
  `signatory_designation` VARCHAR(128) DEFAULT NULL,
  `is_default` TINYINT(1) DEFAULT 0,
  `data_json` LONGTEXT DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. CUSTOMERS ("TO") TABLE
CREATE TABLE IF NOT EXISTS `adhira_customers` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `legal_name` VARCHAR(255) DEFAULT NULL,
  `gstin` VARCHAR(32) DEFAULT NULL,
  `pan` VARCHAR(32) DEFAULT NULL,
  `type` VARCHAR(64) DEFAULT 'Wholesale Dealer',
  `contact_person` VARCHAR(128) DEFAULT NULL,
  `phone` VARCHAR(64) DEFAULT NULL,
  `alt_phone` VARCHAR(64) DEFAULT NULL,
  `email` VARCHAR(128) DEFAULT NULL,
  `billing_address` TEXT DEFAULT NULL,
  `shipping_address` TEXT DEFAULT NULL,
  `city` VARCHAR(128) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `state` VARCHAR(128) DEFAULT NULL,
  `state_code` VARCHAR(8) DEFAULT '33',
  `pin` VARCHAR(32) DEFAULT NULL,
  `payment_terms` VARCHAR(64) DEFAULT 'Advance',
  `status` VARCHAR(32) DEFAULT 'Active',
  `data_json` LONGTEXT DEFAULT NULL,
  `created_at` VARCHAR(64) DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_cust_gstin` (`gstin`),
  INDEX `idx_cust_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. PRODUCTS MASTER CATALOG TABLE (All 141 Fireworks Products)
CREATE TABLE IF NOT EXISTS `adhira_products` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `item_no` VARCHAR(32) DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  `short_name` VARCHAR(255) DEFAULT NULL,
  `category` VARCHAR(128) DEFAULT NULL,
  `hsn` VARCHAR(32) DEFAULT '3604',
  `packing` VARCHAR(64) DEFAULT NULL,
  `pieces` INT DEFAULT 1,
  `unit` VARCHAR(32) DEFAULT 'CASE',
  `rate` DECIMAL(12,2) DEFAULT 0.00,
  `disc_rate` DECIMAL(12,2) DEFAULT 0.00,
  `case_rate` DECIMAL(12,2) DEFAULT 0.00,
  `gst` DECIMAL(5,2) DEFAULT 18.00,
  `active` TINYINT(1) DEFAULT 1,
  `data_json` LONGTEXT DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_prod_category` (`category`),
  INDEX `idx_prod_name` (`name`(64))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. QUOTATIONS TABLE
CREATE TABLE IF NOT EXISTS `adhira_quotations` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `number` VARCHAR(64) NOT NULL UNIQUE,
  `date` VARCHAR(32) DEFAULT NULL,
  `valid_until` VARCHAR(32) DEFAULT NULL,
  `customer_id` VARCHAR(64) DEFAULT NULL,
  `customer_name` VARCHAR(255) DEFAULT NULL,
  `seller_name` VARCHAR(255) DEFAULT NULL,
  `subtotal` DECIMAL(14,2) DEFAULT 0.00,
  `discount_total` DECIMAL(14,2) DEFAULT 0.00,
  `taxable` DECIMAL(14,2) DEFAULT 0.00,
  `gst_total` DECIMAL(14,2) DEFAULT 0.00,
  `cgst` DECIMAL(14,2) DEFAULT 0.00,
  `sgst` DECIMAL(14,2) DEFAULT 0.00,
  `igst` DECIMAL(14,2) DEFAULT 0.00,
  `round_off` DECIMAL(8,2) DEFAULT 0.00,
  `grand_total` DECIMAL(14,2) DEFAULT 0.00,
  `status` VARCHAR(64) DEFAULT 'Draft',
  `data_json` LONGTEXT DEFAULT NULL,
  `created_at` VARCHAR(64) DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_quote_customer` (`customer_id`),
  INDEX `idx_quote_date` (`date`),
  INDEX `idx_quote_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. TAX INVOICES TABLE
CREATE TABLE IF NOT EXISTS `adhira_invoices` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `number` VARCHAR(64) NOT NULL UNIQUE,
  `date` VARCHAR(32) DEFAULT NULL,
  `quotation_id` VARCHAR(64) DEFAULT NULL,
  `quotation_number` VARCHAR(64) DEFAULT NULL,
  `customer_id` VARCHAR(64) DEFAULT NULL,
  `customer_name` VARCHAR(255) DEFAULT NULL,
  `seller_name` VARCHAR(255) DEFAULT NULL,
  `grand_total` DECIMAL(14,2) DEFAULT 0.00,
  `payment_status` VARCHAR(64) DEFAULT 'Pending',
  `status` VARCHAR(64) DEFAULT 'Issued',
  `eway_no` VARCHAR(64) DEFAULT NULL,
  `vehicle_no` VARCHAR(64) DEFAULT NULL,
  `data_json` LONGTEXT DEFAULT NULL,
  `created_at` VARCHAR(64) DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_inv_date` (`date`),
  INDEX `idx_inv_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. SIMPLE BILLS (NON-GST FACTORY ESTIMATES) TABLE
CREATE TABLE IF NOT EXISTS `adhira_simple_bills` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `number` VARCHAR(64) NOT NULL,
  `date` VARCHAR(32) DEFAULT NULL,
  `copy_type` VARCHAR(64) DEFAULT '(EXTRA COPY)',
  `customer_name` VARCHAR(255) DEFAULT NULL,
  `customer_city` VARCHAR(128) DEFAULT NULL,
  `customer_phone` VARCHAR(64) DEFAULT NULL,
  `factory_name` VARCHAR(255) DEFAULT NULL,
  `total_cases` INT DEFAULT 0,
  `subtotal` DECIMAL(14,2) DEFAULT 0.00,
  `packing_percent` DECIMAL(5,2) DEFAULT 3.00,
  `packing_charge` DECIMAL(14,2) DEFAULT 0.00,
  `round_off` DECIMAL(8,2) DEFAULT 0.00,
  `grand_total` DECIMAL(14,2) DEFAULT 0.00,
  `data_json` LONGTEXT DEFAULT NULL,
  `created_at` VARCHAR(64) DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_sb_date` (`date`),
  INDEX `idx_sb_number` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
