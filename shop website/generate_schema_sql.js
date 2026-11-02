const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

function esc(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val;
  if (typeof val === 'boolean') return val ? 1 : 0;
  if (typeof val === 'object') val = JSON.stringify(val);
  return "'" + String(val).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r/g, '\\r').replace(/\n/g, '\\n') + "'";
}

let sql = '';
sql += '-- ==========================================================\n';
sql += '-- ATHIRA CRACKERS & ADHIRA PYROTECH - CPANEL MYSQL DUMP\n';
sql += '-- Database: virtexeindia_adhira_db\n';
sql += '-- Generated for 1-Click Import in phpMyAdmin\n';
sql += '-- ==========================================================\n\n';
sql += 'SET NAMES utf8mb4;\n';
sql += 'SET FOREIGN_KEY_CHECKS = 0;\n\n';

// 1. Settings
sql += '-- ----------------------------------------------------------\n';
sql += '-- 1. Table: settings\n';
sql += '-- ----------------------------------------------------------\n';
sql += 'DROP TABLE IF EXISTS `settings`;\n';
sql += 'CREATE TABLE `settings` (\n';
sql += '  `id` INT AUTO_INCREMENT PRIMARY KEY,\n';
sql += '  `setting_key` VARCHAR(100) UNIQUE NOT NULL,\n';
sql += '  `setting_value` LONGTEXT,\n';
sql += '  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n';
sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n';

if (db.settings) {
  for (const [k, v] of Object.entries(db.settings)) {
    sql += `INSERT INTO \`settings\` (\`setting_key\`, \`setting_value\`) VALUES (${esc(k)}, ${esc(v)}) ON DUPLICATE KEY UPDATE \`setting_value\`=VALUES(\`setting_value\`);\n`;
  }
}
sql += '\n';

// 2. Categories
sql += '-- ----------------------------------------------------------\n';
sql += `-- 2. Table: categories (${db.categories.length} categories)\n`;
sql += '-- ----------------------------------------------------------\n';
sql += 'DROP TABLE IF EXISTS `categories`;\n';
sql += 'CREATE TABLE `categories` (\n';
sql += '  `id` INT AUTO_INCREMENT PRIMARY KEY,\n';
sql += '  `name` VARCHAR(255) NOT NULL,\n';
sql += '  `sort_order` INT DEFAULT 0,\n';
sql += '  `position` INT DEFAULT 0,\n';
sql += '  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n';
sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n';

db.categories.forEach(c => {
  sql += `INSERT INTO \`categories\` (\`id\`, \`name\`, \`sort_order\`, \`position\`) VALUES (${c.id}, ${esc(c.name)}, ${c.sort_order || 0}, ${c.position || c.sort_order || 0}) ON DUPLICATE KEY UPDATE \`name\`=VALUES(\`name\`), \`sort_order\`=VALUES(\`sort_order\`), \`position\`=VALUES(\`position\`);\n`;
});
sql += '\n';

// 3. Products
sql += '-- ----------------------------------------------------------\n';
sql += `-- 3. Table: products (${db.products.length} products)\n`;
sql += '-- ----------------------------------------------------------\n';
sql += 'DROP TABLE IF EXISTS `products`;\n';
sql += 'CREATE TABLE `products` (\n';
sql += '  `id` INT AUTO_INCREMENT PRIMARY KEY,\n';
sql += '  `cat_id` INT NOT NULL DEFAULT 0,\n';
sql += '  `name` VARCHAR(255) NOT NULL,\n';
sql += '  `description` VARCHAR(255) DEFAULT "",\n';
sql += '  `orig_price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,\n';
sql += '  `sale_price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,\n';
sql += '  `img` VARCHAR(500) DEFAULT "",\n';
sql += '  `video` VARCHAR(500) DEFAULT "",\n';
sql += '  `position` INT DEFAULT 0,\n';
sql += '  `out_of_stock` TINYINT(1) DEFAULT 0,\n';
sql += '  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n';
sql += '  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n';
sql += '  INDEX idx_cat (`cat_id`),\n';
sql += '  INDEX idx_pos (`position`)\n';
sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n';

db.products.forEach(p => {
  sql += `INSERT INTO \`products\` (\`id\`, \`cat_id\`, \`name\`, \`description\`, \`orig_price\`, \`sale_price\`, \`img\`, \`video\`, \`position\`, \`out_of_stock\`) VALUES (${p.id}, ${p.cat_id}, ${esc(p.name)}, ${esc(p.description || p.desc || '')}, ${p.orig_price || 0}, ${p.sale_price || 0}, ${esc(p.img || '')}, ${esc(p.video || '')}, ${p.position || p.id}, ${p.out_of_stock ? 1 : 0}) ON DUPLICATE KEY UPDATE \`cat_id\`=VALUES(\`cat_id\`), \`name\`=VALUES(\`name\`), \`description\`=VALUES(\`description\`), \`orig_price\`=VALUES(\`orig_price\`), \`sale_price\`=VALUES(\`sale_price\`), \`img\`=VALUES(\`img\`), \`video\`=VALUES(\`video\`), \`position\`=VALUES(\`position\`), \`out_of_stock\`=VALUES(\`out_of_stock\`);\n`;
});
sql += '\n';

// 4. Banners
sql += '-- ----------------------------------------------------------\n';
sql += '-- 4. Table: banners\n';
sql += '-- ----------------------------------------------------------\n';
sql += 'DROP TABLE IF EXISTS `banners`;\n';
sql += 'CREATE TABLE `banners` (\n';
sql += '  `id` INT AUTO_INCREMENT PRIMARY KEY,\n';
sql += '  `img` VARCHAR(500) NOT NULL DEFAULT "",\n';
sql += '  `title` VARCHAR(255) DEFAULT "",\n';
sql += '  `subtitle` VARCHAR(255) DEFAULT "",\n';
sql += '  `link` VARCHAR(500) DEFAULT "",\n';
sql += '  `sort_order` INT DEFAULT 0,\n';
sql += '  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n';
sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n';

(db.banners || []).forEach(b => {
  sql += `INSERT INTO \`banners\` (\`id\`, \`img\`, \`title\`, \`subtitle\`, \`link\`, \`sort_order\`) VALUES (${b.id}, ${esc(b.img)}, ${esc(b.title || '')}, ${esc(b.subtitle || '')}, ${esc(b.link || '')}, ${b.sort_order || 0}) ON DUPLICATE KEY UPDATE \`img\`=VALUES(\`img\`), \`title\`=VALUES(\`title\`), \`subtitle\`=VALUES(\`subtitle\`), \`link\`=VALUES(\`link\`), \`sort_order\`=VALUES(\`sort_order\`);\n`;
});
sql += '\n';

// 5. Combos
sql += '-- ----------------------------------------------------------\n';
sql += '-- 5. Table: combos\n';
sql += '-- ----------------------------------------------------------\n';
sql += 'DROP TABLE IF EXISTS `combos`;\n';
sql += 'CREATE TABLE `combos` (\n';
sql += '  `id` INT AUTO_INCREMENT PRIMARY KEY,\n';
sql += '  `name` VARCHAR(255) NOT NULL,\n';
sql += '  `items` TEXT,\n';
sql += '  `rate` DECIMAL(10,2) DEFAULT 0.00,\n';
sql += '  `orig_price` DECIMAL(10,2) DEFAULT 0.00,\n';
sql += '  `sale_price` DECIMAL(10,2) DEFAULT 0.00,\n';
sql += '  `img` VARCHAR(500) DEFAULT "",\n';
sql += '  `video` VARCHAR(500) DEFAULT "",\n';
sql += '  `position` INT DEFAULT 0,\n';
sql += '  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n';
sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n';

(db.combos || []).forEach(cb => {
  sql += `INSERT INTO \`combos\` (\`id\`, \`name\`, \`items\`, \`rate\`, \`orig_price\`, \`sale_price\`, \`img\`, \`video\`, \`position\`) VALUES (${cb.id}, ${esc(cb.name)}, ${esc(cb.items || '')}, ${cb.rate || cb.sale_price || 0}, ${cb.orig_price || 0}, ${cb.sale_price || cb.rate || 0}, ${esc(cb.img || '')}, ${esc(cb.video || '')}, ${cb.position || cb.id}) ON DUPLICATE KEY UPDATE \`name\`=VALUES(\`name\`), \`items\`=VALUES(\`items\`), \`rate\`=VALUES(\`rate\`), \`orig_price\`=VALUES(\`orig_price\`), \`sale_price\`=VALUES(\`sale_price\`), \`img\`=VALUES(\`img\`), \`video\`=VALUES(\`video\`), \`position\`=VALUES(\`position\`);\n`;
});
sql += '\n';

// 6. Giftboxes
sql += '-- ----------------------------------------------------------\n';
sql += '-- 6. Table: giftboxes\n';
sql += '-- ----------------------------------------------------------\n';
sql += 'DROP TABLE IF EXISTS `giftboxes`;\n';
sql += 'CREATE TABLE `giftboxes` (\n';
sql += '  `id` INT AUTO_INCREMENT PRIMARY KEY,\n';
sql += '  `name` VARCHAR(255) NOT NULL,\n';
sql += '  `items` TEXT,\n';
sql += '  `rate` DECIMAL(10,2) DEFAULT 0.00,\n';
sql += '  `orig_price` DECIMAL(10,2) DEFAULT 0.00,\n';
sql += '  `sale_price` DECIMAL(10,2) DEFAULT 0.00,\n';
sql += '  `img` VARCHAR(500) DEFAULT "",\n';
sql += '  `video` VARCHAR(500) DEFAULT "",\n';
sql += '  `position` INT DEFAULT 0,\n';
sql += '  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n';
sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n';

(db.giftboxes || []).forEach(gb => {
  sql += `INSERT INTO \`giftboxes\` (\`id\`, \`name\`, \`items\`, \`rate\`, \`orig_price\`, \`sale_price\`, \`img\`, \`video\`, \`position\`) VALUES (${gb.id}, ${esc(gb.name)}, ${esc(gb.items || '')}, ${gb.rate || gb.sale_price || 0}, ${gb.orig_price || 0}, ${gb.sale_price || gb.rate || 0}, ${esc(gb.img || '')}, ${esc(gb.video || '')}, ${gb.position || gb.id}) ON DUPLICATE KEY UPDATE \`name\`=VALUES(\`name\`), \`items\`=VALUES(\`items\`), \`rate\`=VALUES(\`rate\`), \`orig_price\`=VALUES(\`orig_price\`), \`sale_price\`=VALUES(\`sale_price\`), \`img\`=VALUES(\`img\`), \`video\`=VALUES(\`video\`), \`position\`=VALUES(\`position\`);\n`;
});
sql += '\n';

// 7. Orders
sql += '-- ----------------------------------------------------------\n';
sql += '-- 7. Table: orders\n';
sql += '-- ----------------------------------------------------------\n';
sql += 'DROP TABLE IF EXISTS `orders`;\n';
sql += 'CREATE TABLE `orders` (\n';
sql += '  `id` INT AUTO_INCREMENT PRIMARY KEY,\n';
sql += '  `order_number` VARCHAR(50) UNIQUE NOT NULL,\n';
sql += '  `customer_name` VARCHAR(255) NOT NULL DEFAULT "",\n';
sql += '  `customer_phone` VARCHAR(50) NOT NULL DEFAULT "",\n';
sql += '  `customer_email` VARCHAR(255) DEFAULT "",\n';
sql += '  `customer_address` TEXT,\n';
sql += '  `city` VARCHAR(100) DEFAULT "",\n';
sql += '  `state` VARCHAR(100) DEFAULT "Tamil Nadu",\n';
sql += '  `pincode` VARCHAR(20) DEFAULT "",\n';
sql += '  `items_json` LONGTEXT NOT NULL,\n';
sql += '  `subtotal` DECIMAL(10,2) NOT NULL DEFAULT 0.00,\n';
sql += '  `discount_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,\n';
sql += '  `total_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,\n';
sql += '  `payment_method` VARCHAR(50) DEFAULT "COD",\n';
sql += '  `status` VARCHAR(50) DEFAULT "Pending",\n';
sql += '  `notes` TEXT,\n';
sql += '  `order_type` VARCHAR(50) DEFAULT "website",\n';
sql += '  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n';
sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n';

sql += 'SET FOREIGN_KEY_CHECKS = 1;\n';

fs.writeFileSync(path.join(__dirname, 'db_schema.sql'), sql, 'utf8');
console.log('Successfully generated db_schema.sql!');
console.log('Categories:', db.categories.length);
console.log('Products:', db.products.length);
console.log('File size:', sql.length, 'bytes');
