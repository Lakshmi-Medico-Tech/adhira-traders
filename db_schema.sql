-- ==========================================================================
-- ADHIRA FIRE WORKS & PYROTECH — cPanel MySQL Database Schema
-- Sivakasi, Tamil Nadu
-- ==========================================================================

CREATE TABLE IF NOT EXISTS `adhira_store` (
  `key` VARCHAR(64) NOT NULL,
  `data` LONGTEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
