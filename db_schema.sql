-- ==========================================================
-- ATHIRA CRACKERS / ADHIRA PYROTECH - E-COMMERCE DATABASE
-- Complete MySQL Schema for cPanel / phpMyAdmin
-- Compatible with MySQL 5.7+ / MariaDB 10.3+ / MySQL 8.0+
-- ==========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------
-- 1. Table: settings
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(100) UNIQUE NOT NULL,
  `setting_value` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 2. Table: categories
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `sort_order` INT DEFAULT 0,
  `position` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 3. Table: products (with both image and video fields)
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `cat_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) DEFAULT '',
  `orig_price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `sale_price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `img` VARCHAR(500) DEFAULT '',
  `video` VARCHAR(500) DEFAULT '',
  `position` INT DEFAULT 0,
  `out_of_stock` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_cat (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 4. Table: banners
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `img` VARCHAR(500) NOT NULL,
  `title` VARCHAR(255) DEFAULT '',
  `subtitle` VARCHAR(255) DEFAULT '',
  `link` VARCHAR(500) DEFAULT '',
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 4b. Table: combos (Top offers / Combo packs)
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `combos`;
CREATE TABLE `combos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `items` TEXT,
  `rate` DECIMAL(10,2) DEFAULT 0.00,
  `orig_price` DECIMAL(10,2) DEFAULT 0.00,
  `sale_price` DECIMAL(10,2) DEFAULT 0.00,
  `img` VARCHAR(500) DEFAULT '',
  `video` VARCHAR(500) DEFAULT '',
  `position` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 4c. Table: giftboxes (VIP and festive Gift Boxes)
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `giftboxes`;
CREATE TABLE `giftboxes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `items` TEXT,
  `rate` DECIMAL(10,2) DEFAULT 0.00,
  `orig_price` DECIMAL(10,2) DEFAULT 0.00,
  `sale_price` DECIMAL(10,2) DEFAULT 0.00,
  `img` VARCHAR(500) DEFAULT '',
  `video` VARCHAR(500) DEFAULT '',
  `position` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 5. Table: orders
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(50) UNIQUE NOT NULL,
  `customer_name` VARCHAR(255) NOT NULL,
  `customer_phone` VARCHAR(50) NOT NULL,
  `customer_email` VARCHAR(255) DEFAULT '',
  `customer_address` TEXT NOT NULL,
  `city` VARCHAR(100) DEFAULT '',
  `state` VARCHAR(100) DEFAULT '',
  `pincode` VARCHAR(20) DEFAULT '',
  `items_json` LONGTEXT NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `discount_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `total_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `payment_method` VARCHAR(50) DEFAULT 'COD',
  `status` VARCHAR(50) DEFAULT 'Pending',
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 6. Insert Default Settings
-- ----------------------------------------------------------
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('site_title', 'ATHIRA CRACKERS - Sivakasi Wholesale Fireworks') ON DUPLICATE KEY UPDATE `setting_value`='ATHIRA CRACKERS - Sivakasi Wholesale Fireworks';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('brand_name', 'ATHIRA CRACKERS') ON DUPLICATE KEY UPDATE `setting_value`='ATHIRA CRACKERS';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('company_name', 'Athira Crackers / Adhira Pyrotech') ON DUPLICATE KEY UPDATE `setting_value`='Athira Crackers / Adhira Pyrotech';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('tagline', 'Buy Genuine Sivakasi Crackers Online at Direct Factory Wholesale Price') ON DUPLICATE KEY UPDATE `setting_value`='Buy Genuine Sivakasi Crackers Online at Direct Factory Wholesale Price';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('logo', './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg') ON DUPLICATE KEY UPDATE `setting_value`='./storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('phones', '["+918940855376","+919443959680"]') ON DUPLICATE KEY UPDATE `setting_value`='["+918940855376","+919443959680"]';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('whatsapp', '+918940855376') ON DUPLICATE KEY UPDATE `setting_value`='+918940855376';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('address', 'Sivakasi, Tamil Nadu - 626123') ON DUPLICATE KEY UPDATE `setting_value`='Sivakasi, Tamil Nadu - 626123';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('email', 'sales@adhirapyrotech.com') ON DUPLICATE KEY UPDATE `setting_value`='sales@adhirapyrotech.com';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('min_order_amount', '1000') ON DUPLICATE KEY UPDATE `setting_value`='1000';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('discount_percent', '85') ON DUPLICATE KEY UPDATE `setting_value`='85';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('notice_text', '💥 DIWALI 2026 MEGA SALE IS LIVE! ENJOY UP TO 85% DISCOUNT ON FACTORY RATES! 💥') ON DUPLICATE KEY UPDATE `setting_value`='💥 DIWALI 2026 MEGA SALE IS LIVE! ENJOY UP TO 85% DISCOUNT ON FACTORY RATES! 💥';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('upi_id', 'adhira@upi') ON DUPLICATE KEY UPDATE `setting_value`='adhira@upi';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('bank_details', 'Account Name: Athira Crackers
Bank: State Bank of India
IFSC: SBIN0001234') ON DUPLICATE KEY UPDATE `setting_value`='Account Name: Athira Crackers
Bank: State Bank of India
IFSC: SBIN0001234';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('admin_username', 'admin') ON DUPLICATE KEY UPDATE `setting_value`='admin';
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES ('admin_password', 'admin') ON DUPLICATE KEY UPDATE `setting_value`='admin';


-- ----------------------------------------------------------
-- 7. Insert Categories
-- ----------------------------------------------------------
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (1, 'SOUND CRACKERS', 1);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (2, 'GROUND CHAKKARS', 2);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (3, 'FLOWER POTS', 3);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (4, 'BIJILI CRACKERS', 4);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (5, 'TWINKLING STARS', 5);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (6, 'SPL FOUNTAINS', 6);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (7, 'BOMBS', 7);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (8, 'STAR FOUNTAINS', 8);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (9, 'FANCY  NOVELTIES', 9);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (10, 'PEACOCK', 10);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (11, 'COLOR MATCH', 11);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (12, 'REPEATING SHOTS', 12);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (13, 'SPARKLERS', 13);

-- ----------------------------------------------------------
-- 8. Insert Banners
-- ----------------------------------------------------------
INSERT INTO `banners` (`id`, `img`, `title`, `subtitle`) VALUES (1, './storage/banners/RjYgjasaT8W338t5DL0zfZu4wgAtGtDznzdKtY7B.png', 'Diwali Crackers Sale 2026', 'Direct Factory Wholesale Sivakasi Crackers');
INSERT INTO `banners` (`id`, `img`, `title`, `subtitle`) VALUES (2, './storage/banners/pZ3e8v8nQjytrS9gaWDEShVXHrzVr3Alz9fjciWZ.png', 'Super Saver Combos', 'Up to 85% OFF on Family Packs');
INSERT INTO `banners` (`id`, `img`, `title`, `subtitle`) VALUES (3, './storage/banners/FkDa6E6aomlgfvRWcXE4SvezqXyOSYKBDlmQ9yCJ.png', 'Genuine Brand Guarantee', '100% Safe & Tested Sivakasi Fireworks');

-- ----------------------------------------------------------
-- 9. Insert Products (Total: 127)
-- ----------------------------------------------------------
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (1, 1, '6"  Lion 25 Ply', '1 pkt', 710, 71, './storage/products/5 Laxmi.jpeg', 'https://youtube.com/shorts/lkzDSvMvhek?si=pb4FfJ5ZN-bnsvSN', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (2, 1, '5" Lakshmi / Gorilla / Lady/Jallikattu', '1 pkt', 510, 51, './storage/products/Y8z7rruTW3j7bq4ybNp3tZjokssP5PUNoT1LSYlw.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (3, 1, '4" Dlx Lakshmi / Elephant / Lady', '1 pkt', 280, 28, './storage/products/4 Dlx Laxmi.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (4, 1, '4" Laxmi Crackers', '1 pkt', 200, 20, './storage/products/6 Laxmi.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (5, 1, '4" Gold Laxmi / spaiter', '1 pkt', 300, 30, './storage/products/Gold laxm.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (6, 1, '2"Sound', '1 pkt', 280, 28, './storage/products/2 Sound Crcakers.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (7, 1, '2 3/4"Kuruvi', '1 pkt', 70, 7, './storage/products/3.5 Laxm.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (8, 1, '3 1/2"Lakshmi', '1 pkt', 150, 15, './storage/products/6 Laxmi.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (9, 2, 'Ground Chakkar Special', '1 box', 750, 75, './storage/products/Ground Chakkar Spl.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (10, 2, 'Ground Chakkar Deluxe', '1 box', 1300, 130, './storage/products/WhatsApp Image 2026-08-14 at 4.06.20 PM.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (11, 2, 'Ground Chakkar Ashoke', '1 box', 650, 65, './storage/products/Ground Chakkar Ashola.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (12, 2, 'Chakkar Spinner Special', '1 box', 1400, 140, './storage/products/Spinnar Spl.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (13, 2, 'Chakkar Spinner Deluxe', '1 box', 1800, 180, './storage/products/Spinnar Super Dlx.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (14, 2, 'Ground Chakkar Big 10&#039;s', '1 box', 400, 40, './storage/products/Ground Chakkar Big.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (15, 3, 'Flower Pots Big', '1 box', 700, 70, './storage/products/Flowerpot Big.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (16, 3, 'Flower Pots Special', '1 box', 800, 80, './storage/products/Flowerpot Special.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (17, 3, 'Flower Pots Ashoka', '1 box', 1200, 120, './storage/products/Flowerpot Ashoka.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (18, 3, 'Flower Pots Deluxe (5 pcs)', '1 box', 1600, 160, './storage/products/WhatsApp Image 2026-08-14 at 4.04.34 PM.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (19, 3, 'Super Deluxe (2 pcs)', '1 box', 1200, 120, './storage/products/Flower Pot 2 Pce.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (20, 3, 'Flower Pots Colorkoti Deluxe', '1 box', 2900, 290, './storage/products/WhatsApp Image 2026-08-14 at 4.03.50 PM.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (21, 3, 'Lucky Red & Green', '1 box', 1600, 160, './storage/products/Lucky.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (22, 3, 'Rangeela', '1 box', 1600, 160, './storage/products/Rangela.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (23, 3, 'Colour Koti', '1 box', 1800, 180, './storage/products/Colorkoti.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (24, 4, 'Stripped Bijili 100 pcs', '1 bag', 350, 35, './storage/products/Stripped Bijili.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (25, 4, 'Bijili Red 100 pcs', '1 bag', 300, 30, './storage/products/Red Bijili.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (26, 5, '1 1/2" Twinkling Star', '1 box', 200, 20, './storage/products/1.5 Twinkling Star.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (27, 5, '4" Twinkling Star', '1 box', 600, 60, './storage/products/4 Twinkling Star.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (28, 6, 'Mottu Patlu (6 Function Fountain)', '1 box', 3000, 300, './storage/products/Mottu Pottlu.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (29, 6, '4 x 4 Wheel', '1 box', 1600, 160, './storage/products/4x4 Wheel.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (30, 6, 'Emu Egg (2 pcs)', '1 box', 1800, 180, './storage/products/Emu Egg.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (31, 6, 'Pistol 5g (2 pcs)', '1 box', 2300, 230, './storage/products/ABVKleWyw8A8X7cW7sjQYQrklXMECVUBsu3JQ04l.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (32, 6, 'Wire Chakkar', '1 box', 1800, 180, './storage/products/Wire Chakkar.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (33, 6, 'Mini Siren (5 pcs)', '1 box', 1300, 130, './storage/products/Mini Siren.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (34, 6, 'Siren (3 pcs)', '1 box', 1500, 150, './storage/products/Hxf14FzA5fVwcPmDyvzYGI5agpJvdysTw0Ymmt0j.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (35, 6, '900 CC Fountain', '1 box', 2000, 200, './storage/products/900 cc.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (36, 6, 'Tri Colour (5 pcs)', '1 box', 2500, 250, './storage/products/Tricolor Fountain.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (37, 6, 'Color Smoke', '1 box', 1200, 120, './storage/products/Color Smoke.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (38, 6, 'Madurai Malli', '1 box', 2000, 200, './storage/products/Madhurai Malli.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (39, 6, 'Smoke Cylinder', '1 box', 1800, 180, './storage/products/Smoke Cylinder Bom.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (40, 6, 'Helicopter', '1 box', 900, 90, './storage/products/Helicopter.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (41, 6, 'Drone', '1 box', 1500, 150, './storage/products/Drone.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (42, 6, 'Photo Flash', '1 box', 600, 60, './storage/products/Photo Flash.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (43, 6, 'kit kat', '1 box', 300, 30, './storage/products/q4gH5pAB2GiNFw73hs7SjwKjuIcDsYlpHzLKzprE.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (44, 6, 'Chit Put', '1 box', 500, 50, './storage/products/WhatsApp Image 2026-08-14 at 4.05.15 PM.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (45, 6, 'Pyro Dance (10 Pce)', '1 box', 1000, 100, './storage/products/Pyro Dance.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (46, 6, 'Butterfly (10 pce)', '1 box', 800, 80, './storage/products/Dancing Butterfly.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (47, 6, '7 Shot', '1 box', 900, 90, './storage/products/cdTft92Fk2jK9Vsm2SDam07IznTVQwGJaBHykdq3.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (48, 6, 'Star King', '1 box', 900, 90, './storage/products/Star King.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (49, 6, 'High Voltage (2 pce )', '1 box', 1600, 160, './storage/products/High Voldage.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (50, 6, '90 Wats', '1 box', 1200, 120, './storage/products/90 Watts.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (51, 6, 'Old is Gold (25 Pce)', '1 box', 1200, 120, './storage/products/Old Is Gold.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (52, 6, 'Black Money (5 Pce)', '1 box', 2500, 250, './storage/products/Black Money.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (53, 6, 'Money Bank (2 Pce)', '1 box', 1600, 160, './storage/products/Money in The Bank.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (54, 6, 'King Star Full Crackling 3 Pipe', '1 box', 2300, 230, './storage/products/King Star.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (55, 6, 'Beer Tin', '1 box', 1000, 100, './storage/products/Beer Tin.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (56, 6, 'Penta Magic (5 pcs)', '1 box', 1300, 130, './storage/products/Penta Magic.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (120, 6, 'CRACKLING FOUNTAIN', '', 1800, 180, './storage/products/Q00phR5r1yAwxqv2MOUTCeEPuC3IqPqL0137Iyku.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (121, 6, 'Monkey Star crackling (5pcs)', '', 2000, 200, './storage/products/lElGtGWtdFDMzRP5iyUsiay0u4G9Ec58doZgxF4m.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (122, 6, 'Once More', '', 2000, 200, './storage/products/xBT8jkE2zNsGS2CxZtAsGUtbN4mu65RSingaWm4M.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (124, 6, 'ICone', '', 1600, 160, './storage/products/w5x1lfYsT5poYtlRqRBd8fJK8Xci8SxBt1XCgSgQ.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (125, 6, 'Sky Emperor', '', 2000, 200, './storage/products/41NmutcFyzslWEvAe7vCB7E7XS8rAzQpU4RVpe9h.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (126, 6, 'Monkey Mania', '', 1600, 160, './storage/products/1eEsMSYVU7vdbcE5eqdjG7mWiQezcmpHtc5H8QZm.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (127, 6, 'Rose Thunder', '', 1800, 180, './storage/products/hADSB6t5vA5HyJpn8cWnMmcNSMcb9DkPcaeoCXX1.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (57, 7, 'DTS Bomb', '1 box', 2500, 250, './storage/products/GMHJ43MJKx7w9DlQx13kfJxkWFxuWoT0O7IAHdOG.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (58, 7, 'Digital Bomb', '1 box', 2300, 230, './storage/products/Digital Bomb.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (59, 7, 'Classic Bomb Green', '1 box', 1400, 140, './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (60, 7, 'Agmi Bomb', '1 box', 1850, 185, './storage/products/Agni Bom.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (61, 7, 'Mini Bullet', '1 box', 300, 30, './storage/products/Mini Bullet.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (62, 7, '1/4 kg Ati All', '1 box', 400, 40, './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (63, 7, '1/2 kg Ati All', '1 box', 800, 80, './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (64, 7, '1 kg Ati All', '1 box', 1600, 160, './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (116, 7, '1 K', '1 box', 1600, 160, './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (117, 7, '2 K', '1 box', 3200, 320, './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (118, 7, '5 K', '1 box', 8000, 800, './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (119, 7, '10 K', '1 box', 16000, 1600, './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (123, 7, '100 Wala', '', 400, 40, './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (130, 7, 'King of king', '1 box', 1200, 120, './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (65, 8, 'Peacock Fethers (5 pcs)', '1 box', 810, 81, './storage/products/Feathers.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (66, 8, 'Gold Peacock Fethers (5 pcs)', '1 box', 810, 81, './storage/products/Feathers.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (67, 8, 'Pink Rain (5 pcs)', '1 box', 1600, 160, './storage/products/Pink Rain.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (68, 8, 'Popcorn Rain (5 pcs)', '1 box', 1700, 170, './storage/products/Pop Corn.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (69, 8, 'Crackling Rain (5 pcs)', '1 box', 1800, 180, './storage/products/Crackling Rain.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (70, 8, 'Silver Rain (5 pcs)', '1 box', 1500, 150, './storage/products/Silver Rain.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (71, 8, 'Star Light (5 pcs)', '1 box', 900, 90, './storage/products/Star Light.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (72, 8, 'Moon Light (5 pcs)', '1 box', 900, 90, './storage/products/Moon Light.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (73, 8, 'Sun Light (5 pcs)', '1 box', 900, 90, './storage/products/Sun Light.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (74, 8, 'Binion Fountain (5 Pcs)', '1 box', 1500, 150, './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (75, 8, 'Dora (5 pcs)', '1 box', 1500, 150, './storage/products/Dora Singer.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (76, 8, 'Avengers (5 pcs)', '1 box', 900, 90, './storage/products/Avengers.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (77, 9, '1" Chotta', '1 pce', 350, 35, './storage/products/1 Chotta Fancy.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (78, 9, '2" Single', '1 pce', 1000, 100, './storage/products/EPMzaWzo54fgTOKuY8MduzlpwSsoAn7pmCH7CLIo.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (79, 9, '2" (3 pcs)', '1 pce', 2200, 220, './storage/products/Yt5fcTNOSV7ag4Llc7Zctl3OtATQ8jGslODzC1nX.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (80, 9, '2" 3 Step (3 Pce)', '1 pce', 3600, 360, './storage/products/Starvel 3 Step 3 Pce.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (81, 9, '3" (Single)', '1 pce', 2000, 200, './storage/products/3 Inch Pipe.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (82, 9, '3 1/2" Single RR', '1 pce', 2800, 280, './storage/products/RR 3 .5 Pipe.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (83, 9, '3 1/2" Pipe RR  (2 Pce)', '2 pce', 5600, 560, './storage/products/RR 3.5 (2 Pce) Pipe.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (84, 9, '3 1/2" Single', '1 pce', 2600, 260, './storage/products/3.5 Inch Pipe.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (85, 9, '4" 7 Step', '1 pce', 4000, 400, './storage/products/4-7Step.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (86, 9, '4" Single', '1 pce', 3500, 350, './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (87, 9, '5" HD SERIOUS Single (2 Pce)', '1 pce', 10000, 1000, './storage/products/LRD9KkxePB7ZQEc6wtgYqLSqjEWyl64UwnOGAW9J.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (88, 9, '6" TRAIN SERIOUS Single (2 Pce)', '2 pce', 12000, 1200, './storage/products/RR 6 Pipe.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (90, 10, 'Bada Peacock', '1 box', 3500, 350, './storage/products/Bada Peacock.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (91, 10, 'Mega peacock', '1 box', 1500, 150, './storage/products/Peacock.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (92, 11, 'Sachin Color Match', '1 box', 800, 80, './storage/products/WhatsApp Image 2026-08-14 at 4.03.21 PM.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (93, 11, 'Lion Color Match', '1 box', 1300, 130, './storage/products/WhatsApp Image 2026-08-14 at 4.02.56 PM.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (94, 11, 'Royal Color Match', '1 box', 2000, 200, './storage/products/WhatsApp Image 2026-08-14 at 4.02.42 PM.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (95, 12, '12 Shots', '1 box', 1600, 160, './storage/products/fDh7KYng85MZIgnjFF5n12LqZOSrcjTRnZcqrA8G.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (96, 12, '15" Shots', '1 box', 2500, 250, './storage/products/15 Shot.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (97, 12, '25" Shots', '1 box', 3500, 350, './storage/products/Xt4twpoCRMR1HHCPi5UVmIe16ZmQfyAm0gZflsy2.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (98, 12, '30" Shots Alaska', '1 box', 3800, 380, './storage/products/Q9IUbbAmrBNLUyfQyYPILPJPebg0jdY6F4jj1FJS.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (99, 12, '30" Shots Doolve', '1 box', 4000, 400, './storage/products/30 Shot Doolve.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (100, 12, 'Seeti Maar Whizling 36 Shots Mini', '1 box', 2500, 250, './storage/products/Seeti Mar 36 Shot.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (101, 12, '60" Shots Emirates', '1 box', 7600, 760, './storage/products/Fqs9kYhjW9azR1WCUAbiVE1HDhWm2E85xXxemN4n.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (102, 12, '60" Shots Doolve', '1 box', 8000, 800, './storage/products/60 Shot Doolve.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (103, 12, '100 Shots Doolve', '1 box', 14000, 1400, './storage/products/100 Shot.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (104, 12, '120" Shots Air Asia', '1 box', 15200, 1520, './storage/products/120 Shot Isha.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (105, 12, '120" shots Doolve', '1 box', 16000, 1600, './storage/products/120 Shot.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (106, 12, '150" Shots Crackling Color', '1 box', 18000, 1800, './storage/products/150 Shot Crackling.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (107, 12, '240 Shots Doolve', '1 box', 32000, 3200, './storage/products/240 Shot.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (108, 13, '7 Cm (Mixing)', '1 box', 100, 10, './storage/products/7 CM Sparklers.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (109, 13, '10 Cm (Mixing)', '1 box', 200, 20, './storage/products/eonItJDiickzfqA1zyMvmou1bxRh1PZcShNED0mG.jpg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (110, 13, '12 Cm (Mixing)', '1 box', 300, 30, './storage/products/12 CM Sparklers.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (111, 13, '15 Cm (Mixing)', '1 box', 400, 40, './storage/products/15 CM Sparklers.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (112, 13, '30 Cm (Mixing)', '1 box', 400, 40, './storage/products/30 CM Sparklers.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (113, 13, '50 Cm (Electric)', '1 box', 1500, 150, './storage/products/50 Cm Sparklers.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (114, 13, '50 Cm (Color)', '1 box', 1800, 180, './storage/products/50 Cm Sparklers.jpeg', '', 0);
INSERT INTO `products` (`id`, `cat_id`, `name`, `description`, `orig_price`, `sale_price`, `img`, `video`, `out_of_stock`) VALUES (115, 13, 'Roalting Sparklers Mixing', '1 box', 1800, 180, './storage/settings/1dVKPAvNvSAiZk8gzzVIfDTufU4ro55lzQZUxS2n.jpg', '', 0);

-- ----------------------------------------------------------
-- 8. Insert Default Combos
-- ----------------------------------------------------------
INSERT INTO `combos` (`id`, `name`, `items`, `rate`, `orig_price`, `sale_price`, `img`, `video`, `position`) VALUES 
(1, 'Family Mega Dhamaka Combo', '10 Pcs Sky Shot, 20 Pcs Sound Crackers, 5 Flower Pots, 5 Chakkars, 1 Box Sparklers', 750.00, 3500.00, 750.00, './storage/banners/pZ3e8v8nQjytrS9gaWDEShVXHrzVr3Alz9fjciWZ.png', 'https://youtube.com/shorts/lkzDSvMvhek?si=pb4FfJ5ZN-bnsvSN', 1),
(2, 'Kids Special Color Combo', '10 Twinkling Stars, 2 Cartoon Fountains, 5 Color Matches, 5 Flower Pots', 490.00, 2200.00, 490.00, './storage/products/Mottu Pottlu.jpeg', '', 2);

-- ----------------------------------------------------------
-- 9. Insert Default Gift Boxes
-- ----------------------------------------------------------
INSERT INTO `giftboxes` (`id`, `name`, `items`, `rate`, `orig_price`, `sale_price`, `img`, `video`, `position`) VALUES 
(1, 'Athira Royal 35 Items Gift Box', '35 Assorted Sivakasi Fireworks including Sky Shots, Ground Chakkars, Flower Pots, Sparklers & Bijili', 1250.00, 5500.00, 1250.00, './storage/banners/FkDa6E6aomlgfvRWcXE4SvezqXyOSYKBDlmQ9yCJ.png', '', 1),
(2, 'Diwali Gold 50 Items VIP Gift Box', '50 Premium Crackers with Repeating Shots, Peacock Fountains, Electric Sparklers, Bombs & Novelties', 1999.00, 9000.00, 1999.00, './storage/banners/RjYgjasaT8W338t5DL0zfZu4wgAtGtDznzdKtY7B.png', '', 2);

SET FOREIGN_KEY_CHECKS = 1;
-- End of Schema
