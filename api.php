<?php
/**
 * ==========================================================================
 * ADHIRA FIRE WORKS & PYROTECH — cPanel Commercial PHP & MySQL API Backend
 * Sivakasi, Tamil Nadu
 * Supports MySQL Database (phpMyAdmin) with automatic fallback to JSON file
 * ==========================================================================
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Load optional MySQL configuration
$configFile = __DIR__ . '/config.php';
$config = [];
if (file_exists($configFile)) {
    $config = include $configFile;
}

$dbFile = __DIR__ . '/data/db.json';
$backupDir = __DIR__ . '/backups';

if (!is_dir(__DIR__ . '/data')) {
    @mkdir(__DIR__ . '/data', 0755, true);
}
if (!is_dir($backupDir)) {
    @mkdir($backupDir, 0755, true);
}

// Database Connection Helper (PDO MySQL with fallback to File)
function ensureDatabaseSchema($pdo) {
    if (!$pdo) return;
    
    $tables = [
        'adhira_store' => "CREATE TABLE IF NOT EXISTS `adhira_store` (
            `key` VARCHAR(64) PRIMARY KEY,
            `data` LONGTEXT NOT NULL,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",

        'adhira_categories' => "CREATE TABLE IF NOT EXISTS `adhira_categories` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(191) NOT NULL UNIQUE,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",

        'adhira_sellers' => "CREATE TABLE IF NOT EXISTS `adhira_sellers` (
            `id` VARCHAR(64) PRIMARY KEY,
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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",

        'adhira_customers' => "CREATE TABLE IF NOT EXISTS `adhira_customers` (
            `id` VARCHAR(64) PRIMARY KEY,
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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",

        'adhira_products' => "CREATE TABLE IF NOT EXISTS `adhira_products` (
            `id` VARCHAR(64) PRIMARY KEY,
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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",

        'adhira_quotations' => "CREATE TABLE IF NOT EXISTS `adhira_quotations` (
            `id` VARCHAR(64) PRIMARY KEY,
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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",

        'adhira_invoices' => "CREATE TABLE IF NOT EXISTS `adhira_invoices` (
            `id` VARCHAR(64) PRIMARY KEY,
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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",

        'adhira_simple_bills' => "CREATE TABLE IF NOT EXISTS `adhira_simple_bills` (
            `id` VARCHAR(64) PRIMARY KEY,
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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    ];

    foreach ($tables as $name => $tableSql) {
        try {
            $pdo->exec($tableSql);
        } catch (Exception $e) {
            error_log("[Adhira cPanel] Table {$name} creation warning: " . $e->getMessage());
        }
    }
}

// Synchronize all individual entities into real relational MySQL tables
function syncRelationalTables($pdo, $data) {
    if (!$pdo || !is_array($data)) return false;
    try {
        // 1. Categories
        if (!empty($data['categories']) && is_array($data['categories'])) {
            $catStmt = $pdo->prepare("INSERT INTO `adhira_categories` (`name`) VALUES (:name) ON DUPLICATE KEY UPDATE `name` = VALUES(`name`)");
            foreach ($data['categories'] as $cat) {
                if (!empty($cat) && is_string($cat)) {
                    $catStmt->execute([':name' => trim($cat)]);
                }
            }
        }

        // 2. Sellers & Company ("From")
        $sellerStmt = $pdo->prepare("
            INSERT INTO `adhira_sellers` (
                `id`, `name`, `legal_name`, `gstin`, `reg_arn_ref`, `pan`, `phone`, `alt_phone`, `email`,
                `address1`, `address2`, `area`, `city`, `district`, `state`, `state_code`, `pin`,
                `bank_name`, `account_number`, `branch`, `ifsc`, `upi`, `signatory_name`, `signatory_designation`,
                `is_default`, `data_json`
            ) VALUES (
                :id, :name, :legal_name, :gstin, :reg_arn_ref, :pan, :phone, :alt_phone, :email,
                :address1, :address2, :area, :city, :district, :state, :state_code, :pin,
                :bank_name, :account_number, :branch, :ifsc, :upi, :signatory_name, :signatory_designation,
                :is_default, :data_json
            ) ON DUPLICATE KEY UPDATE
                `name` = VALUES(`name`),
                `legal_name` = VALUES(`legal_name`),
                `gstin` = VALUES(`gstin`),
                `reg_arn_ref` = VALUES(`reg_arn_ref`),
                `pan` = VALUES(`pan`),
                `phone` = VALUES(`phone`),
                `alt_phone` = VALUES(`alt_phone`),
                `email` = VALUES(`email`),
                `address1` = VALUES(`address1`),
                `address2` = VALUES(`address2`),
                `area` = VALUES(`area`),
                `city` = VALUES(`city`),
                `district` = VALUES(`district`),
                `state` = VALUES(`state`),
                `state_code` = VALUES(`state_code`),
                `pin` = VALUES(`pin`),
                `bank_name` = VALUES(`bank_name`),
                `account_number` = VALUES(`account_number`),
                `branch` = VALUES(`branch`),
                `ifsc` = VALUES(`ifsc`),
                `upi` = VALUES(`upi`),
                `signatory_name` = VALUES(`signatory_name`),
                `signatory_designation` = VALUES(`signatory_designation`),
                `is_default` = VALUES(`is_default`),
                `data_json` = VALUES(`data_json`)
        ");

        $sellers = !empty($data['sellers']) && is_array($data['sellers']) ? $data['sellers'] : [];
        if (empty($sellers) && !empty($data['company']) && is_array($data['company'])) {
            $sellers = [array_merge($data['company'], ['id' => 'SELLER-001', 'isDefault' => true])];
        }
        foreach ($sellers as $s) {
            if (empty($s['id'])) continue;
            $sellerStmt->execute([
                ':id' => $s['id'],
                ':name' => $s['name'] ?? '',
                ':legal_name' => $s['legalName'] ?? ($s['legal_name'] ?? ''),
                ':gstin' => $s['gstin'] ?? '',
                ':reg_arn_ref' => $s['regArnRef'] ?? '',
                ':pan' => $s['pan'] ?? '',
                ':phone' => $s['phone'] ?? '',
                ':alt_phone' => $s['altPhone'] ?? '',
                ':email' => $s['email'] ?? '',
                ':address1' => $s['address1'] ?? ($s['address'] ?? ''),
                ':address2' => $s['address2'] ?? '',
                ':area' => $s['area'] ?? '',
                ':city' => $s['city'] ?? '',
                ':district' => $s['district'] ?? '',
                ':state' => $s['state'] ?? '',
                ':state_code' => $s['stateCode'] ?? '33',
                ':pin' => $s['pin'] ?? '',
                ':bank_name' => $s['bankName'] ?? '',
                ':account_number' => $s['accountNumber'] ?? '',
                ':branch' => $s['branch'] ?? '',
                ':ifsc' => $s['ifsc'] ?? '',
                ':upi' => $s['upi'] ?? '',
                ':signatory_name' => $s['signatoryName'] ?? ($s['signatory'] ?? ''),
                ':signatory_designation' => $s['signatoryDesignation'] ?? 'Proprietor',
                ':is_default' => !empty($s['isDefault']) ? 1 : 0,
                ':data_json' => json_encode($s, JSON_UNESCAPED_UNICODE)
            ]);
        }

        // 3. Customers ("To")
        if (!empty($data['customers']) && is_array($data['customers'])) {
            $custStmt = $pdo->prepare("
                INSERT INTO `adhira_customers` (
                    `id`, `name`, `legal_name`, `gstin`, `pan`, `type`, `contact_person`, `phone`, `alt_phone`,
                    `email`, `billing_address`, `shipping_address`, `city`, `district`, `state`, `state_code`,
                    `pin`, `payment_terms`, `status`, `data_json`, `created_at`
                ) VALUES (
                    :id, :name, :legal_name, :gstin, :pan, :type, :contact_person, :phone, :alt_phone,
                    :email, :billing_address, :shipping_address, :city, :district, :state, :state_code,
                    :pin, :payment_terms, :status, :data_json, :created_at
                ) ON DUPLICATE KEY UPDATE
                    `name` = VALUES(`name`),
                    `legal_name` = VALUES(`legal_name`),
                    `gstin` = VALUES(`gstin`),
                    `pan` = VALUES(`pan`),
                    `type` = VALUES(`type`),
                    `contact_person` = VALUES(`contact_person`),
                    `phone` = VALUES(`phone`),
                    `alt_phone` = VALUES(`alt_phone`),
                    `email` = VALUES(`email`),
                    `billing_address` = VALUES(`billing_address`),
                    `shipping_address` = VALUES(`shipping_address`),
                    `city` = VALUES(`city`),
                    `district` = VALUES(`district`),
                    `state` = VALUES(`state`),
                    `state_code` = VALUES(`state_code`),
                    `pin` = VALUES(`pin`),
                    `payment_terms` = VALUES(`payment_terms`),
                    `status` = VALUES(`status`),
                    `data_json` = VALUES(`data_json`)
            ");

            foreach ($data['customers'] as $c) {
                if (empty($c['id'])) continue;
                $custStmt->execute([
                    ':id' => $c['id'],
                    ':name' => $c['name'] ?? '',
                    ':legal_name' => $c['legalName'] ?? ($c['name'] ?? ''),
                    ':gstin' => $c['gstin'] ?? '',
                    ':pan' => $c['pan'] ?? '',
                    ':type' => $c['type'] ?? 'Wholesale Dealer',
                    ':contact_person' => $c['contactPerson'] ?? '',
                    ':phone' => $c['phone'] ?? '',
                    ':alt_phone' => $c['altPhone'] ?? '',
                    ':email' => $c['email'] ?? '',
                    ':billing_address' => $c['billingAddress'] ?? '',
                    ':shipping_address' => $c['shippingAddress'] ?? '',
                    ':city' => $c['city'] ?? '',
                    ':district' => $c['district'] ?? '',
                    ':state' => $c['state'] ?? '',
                    ':state_code' => $c['stateCode'] ?? '33',
                    ':pin' => $c['pin'] ?? '',
                    ':payment_terms' => $c['paymentTerms'] ?? 'Advance',
                    ':status' => $c['status'] ?? 'Active',
                    ':data_json' => json_encode($c, JSON_UNESCAPED_UNICODE),
                    ':created_at' => $c['createdAt'] ?? date('c')
                ]);
            }
        }

        // 4. Products (All Fireworks Products)
        if (!empty($data['products']) && is_array($data['products'])) {
            $prodStmt = $pdo->prepare("
                INSERT INTO `adhira_products` (
                    `id`, `item_no`, `name`, `short_name`, `category`, `hsn`, `packing`, `pieces`, `unit`,
                    `rate`, `disc_rate`, `case_rate`, `gst`, `active`, `data_json`
                ) VALUES (
                    :id, :item_no, :name, :short_name, :category, :hsn, :packing, :pieces, :unit,
                    :rate, :disc_rate, :case_rate, :gst, :active, :data_json
                ) ON DUPLICATE KEY UPDATE
                    `item_no` = VALUES(`item_no`),
                    `name` = VALUES(`name`),
                    `short_name` = VALUES(`short_name`),
                    `category` = VALUES(`category`),
                    `hsn` = VALUES(`hsn`),
                    `packing` = VALUES(`packing`),
                    `pieces` = VALUES(`pieces`),
                    `unit` = VALUES(`unit`),
                    `rate` = VALUES(`rate`),
                    `disc_rate` = VALUES(`disc_rate`),
                    `case_rate` = VALUES(`case_rate`),
                    `gst` = VALUES(`gst`),
                    `active` = VALUES(`active`),
                    `data_json` = VALUES(`data_json`)
            ");

            foreach ($data['products'] as $p) {
                if (empty($p['id'])) continue;
                $prodStmt->execute([
                    ':id' => $p['id'],
                    ':item_no' => $p['itemNo'] ?? null,
                    ':name' => $p['name'] ?? '',
                    ':short_name' => $p['shortName'] ?? ($p['name'] ?? ''),
                    ':category' => $p['category'] ?? '',
                    ':hsn' => $p['hsn'] ?? '3604',
                    ':packing' => $p['packing'] ?? '',
                    ':pieces' => !empty($p['pieces']) ? (int)$p['pieces'] : 1,
                    ':unit' => $p['unit'] ?? 'CASE',
                    ':rate' => !empty($p['rate']) ? (float)$p['rate'] : 0.00,
                    ':disc_rate' => !empty($p['discRate']) ? (float)$p['discRate'] : 0.00,
                    ':case_rate' => !empty($p['caseRate']) ? (float)$p['caseRate'] : 0.00,
                    ':gst' => isset($p['gst']) ? (float)$p['gst'] : 18.00,
                    ':active' => !empty($p['active']) ? 1 : 0,
                    ':data_json' => json_encode($p, JSON_UNESCAPED_UNICODE)
                ]);
            }
        }

        // 5. Quotations
        if (!empty($data['quotations']) && is_array($data['quotations'])) {
            $quoteStmt = $pdo->prepare("
                INSERT INTO `adhira_quotations` (
                    `id`, `number`, `date`, `valid_until`, `customer_id`, `customer_name`, `seller_name`,
                    `subtotal`, `discount_total`, `taxable`, `gst_total`, `cgst`, `sgst`, `igst`,
                    `round_off`, `grand_total`, `status`, `data_json`, `created_at`
                ) VALUES (
                    :id, :number, :date, :valid_until, :customer_id, :customer_name, :seller_name,
                    :subtotal, :discount_total, :taxable, :gst_total, :cgst, :sgst, :igst,
                    :round_off, :grand_total, :status, :data_json, :created_at
                ) ON DUPLICATE KEY UPDATE
                    `number` = VALUES(`number`),
                    `date` = VALUES(`date`),
                    `valid_until` = VALUES(`valid_until`),
                    `customer_id` = VALUES(`customer_id`),
                    `customer_name` = VALUES(`customer_name`),
                    `seller_name` = VALUES(`seller_name`),
                    `subtotal` = VALUES(`subtotal`),
                    `discount_total` = VALUES(`discount_total`),
                    `taxable` = VALUES(`taxable`),
                    `gst_total` = VALUES(`gst_total`),
                    `cgst` = VALUES(`cgst`),
                    `sgst` = VALUES(`sgst`),
                    `igst` = VALUES(`igst`),
                    `round_off` = VALUES(`round_off`),
                    `grand_total` = VALUES(`grand_total`),
                    `status` = VALUES(`status`),
                    `data_json` = VALUES(`data_json`)
            ");

            foreach ($data['quotations'] as $q) {
                if (empty($q['id'])) continue;
                $quoteStmt->execute([
                    ':id' => $q['id'],
                    ':number' => $q['number'] ?? $q['id'],
                    ':date' => $q['date'] ?? date('Y-m-d'),
                    ':valid_until' => $q['validUntil'] ?? null,
                    ':customer_id' => $q['customerId'] ?? ($q['customer']['id'] ?? null),
                    ':customer_name' => $q['customer']['name'] ?? ($q['customerName'] ?? ''),
                    ':seller_name' => $q['seller']['name'] ?? '',
                    ':subtotal' => !empty($q['subtotal']) ? (float)$q['subtotal'] : 0.00,
                    ':discount_total' => !empty($q['discountTotal']) ? (float)$q['discountTotal'] : 0.00,
                    ':taxable' => !empty($q['taxable']) ? (float)$q['taxable'] : 0.00,
                    ':gst_total' => !empty($q['gstTotal']) ? (float)$q['gstTotal'] : 0.00,
                    ':cgst' => !empty($q['cgst']) ? (float)$q['cgst'] : 0.00,
                    ':sgst' => !empty($q['sgst']) ? (float)$q['sgst'] : 0.00,
                    ':igst' => !empty($q['igst']) ? (float)$q['igst'] : 0.00,
                    ':round_off' => !empty($q['roundOff']) ? (float)$q['roundOff'] : 0.00,
                    ':grand_total' => !empty($q['grandTotal']) ? (float)$q['grandTotal'] : 0.00,
                    ':status' => $q['status'] ?? 'Draft',
                    ':data_json' => json_encode($q, JSON_UNESCAPED_UNICODE),
                    ':created_at' => $q['createdAt'] ?? date('c')
                ]);
            }
        }

        // 6. Invoices
        if (!empty($data['invoices']) && is_array($data['invoices'])) {
            $invStmt = $pdo->prepare("
                INSERT INTO `adhira_invoices` (
                    `id`, `number`, `date`, `quotation_id`, `quotation_number`, `customer_id`,
                    `customer_name`, `seller_name`, `grand_total`, `payment_status`, `status`,
                    `eway_no`, `vehicle_no`, `data_json`, `created_at`
                ) VALUES (
                    :id, :number, :date, :quotation_id, :quotation_number, :customer_id,
                    :customer_name, :seller_name, :grand_total, :payment_status, :status,
                    :eway_no, :vehicle_no, :data_json, :created_at
                ) ON DUPLICATE KEY UPDATE
                    `number` = VALUES(`number`),
                    `date` = VALUES(`date`),
                    `quotation_id` = VALUES(`quotation_id`),
                    `quotation_number` = VALUES(`quotation_number`),
                    `customer_id` = VALUES(`customer_id`),
                    `customer_name` = VALUES(`customer_name`),
                    `seller_name` = VALUES(`seller_name`),
                    `grand_total` = VALUES(`grand_total`),
                    `payment_status` = VALUES(`payment_status`),
                    `status` = VALUES(`status`),
                    `eway_no` = VALUES(`eway_no`),
                    `vehicle_no` = VALUES(`vehicle_no`),
                    `data_json` = VALUES(`data_json`)
            ");

            foreach ($data['invoices'] as $inv) {
                if (empty($inv['id'])) continue;
                $invStmt->execute([
                    ':id' => $inv['id'],
                    ':number' => $inv['number'] ?? $inv['id'],
                    ':date' => $inv['date'] ?? date('Y-m-d'),
                    ':quotation_id' => $inv['quotationId'] ?? null,
                    ':quotation_number' => $inv['quotationNumber'] ?? null,
                    ':customer_id' => $inv['customerId'] ?? ($inv['customer']['id'] ?? null),
                    ':customer_name' => $inv['customer']['name'] ?? ($inv['customerName'] ?? ''),
                    ':seller_name' => $inv['seller']['name'] ?? '',
                    ':grand_total' => !empty($inv['grandTotal']) ? (float)$inv['grandTotal'] : 0.00,
                    ':payment_status' => $inv['paymentStatus'] ?? 'Pending',
                    ':status' => $inv['status'] ?? 'Issued',
                    ':eway_no' => $inv['ewayNo'] ?? null,
                    ':vehicle_no' => $inv['vehicleNo'] ?? null,
                    ':data_json' => json_encode($inv, JSON_UNESCAPED_UNICODE),
                    ':created_at' => $inv['createdAt'] ?? date('c')
                ]);
            }
        }

        // 7. Simple Bills (Non-GST Estimates)
        if (!empty($data['simpleBills']) && is_array($data['simpleBills'])) {
            $sbStmt = $pdo->prepare("
                INSERT INTO `adhira_simple_bills` (
                    `id`, `number`, `date`, `copy_type`, `customer_name`, `customer_city`, `customer_phone`,
                    `factory_name`, `total_cases`, `subtotal`, `packing_percent`, `packing_charge`,
                    `round_off`, `grand_total`, `data_json`, `created_at`
                ) VALUES (
                    :id, :number, :date, :copy_type, :customer_name, :customer_city, :customer_phone,
                    :factory_name, :total_cases, :subtotal, :packing_percent, :packing_charge,
                    :round_off, :grand_total, :data_json, :created_at
                ) ON DUPLICATE KEY UPDATE
                    `number` = VALUES(`number`),
                    `date` = VALUES(`date`),
                    `copy_type` = VALUES(`copy_type`),
                    `customer_name` = VALUES(`customer_name`),
                    `customer_city` = VALUES(`customer_city`),
                    `customer_phone` = VALUES(`customer_phone`),
                    `factory_name` = VALUES(`factory_name`),
                    `total_cases` = VALUES(`total_cases`),
                    `subtotal` = VALUES(`subtotal`),
                    `packing_percent` = VALUES(`packing_percent`),
                    `packing_charge` = VALUES(`packing_charge`),
                    `round_off` = VALUES(`round_off`),
                    `grand_total` = VALUES(`grand_total`),
                    `data_json` = VALUES(`data_json`)
            ");

            foreach ($data['simpleBills'] as $sb) {
                if (empty($sb['id'])) continue;
                $sbStmt->execute([
                    ':id' => $sb['id'],
                    ':number' => $sb['number'] ?? $sb['id'],
                    ':date' => $sb['date'] ?? date('Y-m-d'),
                    ':copy_type' => $sb['copyType'] ?? '(EXTRA COPY)',
                    ':customer_name' => $sb['customer']['name'] ?? ($sb['customerName'] ?? ''),
                    ':customer_city' => $sb['customer']['cityPin'] ?? ($sb['customer']['city'] ?? ''),
                    ':customer_phone' => $sb['customer']['phone'] ?? ($sb['customer']['gstin'] ?? ''),
                    ':factory_name' => $sb['factory']['name'] ?? ($sb['forFactory'] ?? ''),
                    ':total_cases' => !empty($sb['totalCases']) ? (int)$sb['totalCases'] : 0,
                    ':subtotal' => !empty($sb['subtotal']) ? (float)$sb['subtotal'] : 0.00,
                    ':packing_percent' => isset($sb['packingChargePercent']) ? (float)$sb['packingChargePercent'] : 3.00,
                    ':packing_charge' => !empty($sb['packingChargeAmount']) ? (float)$sb['packingChargeAmount'] : 0.00,
                    ':round_off' => !empty($sb['roundOff']) ? (float)$sb['roundOff'] : 0.00,
                    ':grand_total' => !empty($sb['netAmount']) ? (float)$sb['netAmount'] : 0.00,
                    ':data_json' => json_encode($sb, JSON_UNESCAPED_UNICODE),
                    ':created_at' => $sb['createdAt'] ?? date('c')
                ]);
            }
        }
        return true;
    } catch (Exception $e) {
        error_log("[Adhira cPanel] Relational tables sync error: " . $e->getMessage());
        return false;
    }
}

// Database Connection Helper (PDO MySQL with fallback to File)
function getDbConnection($config) {
    if (!empty($config['db_name']) && !empty($config['db_user'])) {
        try {
            $host = !empty($config['db_host']) ? $config['db_host'] : 'localhost';
            $port = !empty($config['db_port']) ? $config['db_port'] : '3306';
            $dsn = "mysql:host={$host};port={$port};dbname={$config['db_name']};charset=utf8mb4";
            $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'] ?? '', [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_TIMEOUT => 5,
                PDO::MYSQL_ATTR_MULTI_STATEMENTS => true
            ]);

            ensureDatabaseSchema($pdo);
            return $pdo;
        } catch (Exception $e) {
            error_log("[Adhira cPanel] MySQL connection failed, using file fallback: " . $e->getMessage());
        }
    }
    return null;
}

$pdo = getDbConnection($config);

// Route parsing
$requestUri = $_SERVER['REQUEST_URI'] ?? '';
$path = parse_url($requestUri, PHP_URL_PATH);
$action = $_GET['action'] ?? '';

// Determine route
$isDbRoute = ($action === 'db' || strpos($path, '/api/db') !== false);
$isPingRoute = ($action === 'ping' || strpos($path, '/api/ping') !== false);
$isHealthRoute = ($action === 'health' || strpos($path, '/api/health') !== false);
$isInfoRoute = ($action === 'info' || strpos($path, '/api/info') !== false);
$isBackupRoute = ($action === 'backup' || strpos($path, '/api/backup') !== false);
$isTestDbRoute = ($action === 'test-db' || strpos($path, '/api/test-db') !== false);

// 1. PING & HEALTH ROUTE
if ($isPingRoute || $isHealthRoute) {
    header('Content-Type: application/json');
    header('Cache-Control: no-cache, no-store');
    echo json_encode([
        'status' => 'ok',
        'server' => 'cPanel PHP ' . PHP_VERSION,
        'database' => $pdo ? 'cpanel_mysql' : 'cpanel_json_file',
        'timestamp' => date('c')
    ]);
    exit;
}

// 2. INFO & TEST-DB ROUTE
if ($isInfoRoute || $isTestDbRoute) {
    header('Content-Type: application/json');
    if ($pdo) {
        $counts = [];
        $tables = ['adhira_categories', 'adhira_products', 'adhira_customers', 'adhira_sellers', 'adhira_quotations', 'adhira_invoices', 'adhira_simple_bills', 'adhira_store'];
        foreach ($tables as $tbl) {
            try {
                $c = $pdo->query("SELECT COUNT(*) FROM `{$tbl}`")->fetchColumn();
                $counts[$tbl] = (int)$c;
            } catch (Exception $e) {
                $counts[$tbl] = 'Missing: ' . $e->getMessage();
            }
        }
        echo json_encode([
            'status' => 'ok',
            'server' => 'cPanel Apache / LiteSpeed (PHP ' . PHP_VERSION . ')',
            'mysql_connected' => true,
            'db_name' => $config['db_name'] ?? 'configured',
            'db_host' => $config['db_host'] ?? 'localhost',
            'tables' => $counts,
            'storage' => 'cpanel_mysql',
            'dbStorageType' => 'cpanel_mysql',
            'hasDb' => true,
            'isPersistent' => true,
            'message' => 'Connected to cPanel MySQL! All billing tables are active and synchronized.'
        ]);
    } else {
        $hasCreds = !empty($config['db_name']) && !empty($config['db_user']);
        echo json_encode([
            'status' => $hasCreds ? 'error' : 'ok',
            'server' => 'cPanel Apache / LiteSpeed (PHP ' . PHP_VERSION . ')',
            'mysql_connected' => false,
            'dbStorageType' => 'cpanel_json_file',
            'storage' => 'cpanel_json_file',
            'hasDb' => file_exists($dbFile),
            'isPersistent' => true,
            'dataFileExists' => file_exists($dbFile),
            'dataFileWritable' => is_writable(__DIR__ . '/data') || is_writable($dbFile),
            'message' => $hasCreds
                ? 'MySQL credentials failed to connect. Check db_name, db_user, db_pass in config.php.'
                : 'MySQL is not configured in config.php. System is running safely on permanent JSON file storage (data/db.json).'
        ]);
    }
    exit;
}

// 3. GET DATABASE
if ($isDbRoute && $_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    
    // Check MySQL first if connected
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT `data` FROM `adhira_store` WHERE `key` = 'main_db' LIMIT 1");
            $stmt->execute();
            $row = $stmt->fetch();
            if ($row && !empty($row['data'])) {
                $decoded = json_decode($row['data'], true);
                if ($decoded) {
                    echo json_encode([
                        'initialized' => true,
                        'data' => $decoded,
                        'source' => 'cpanel_mysql'
                    ]);
                    exit;
                }
            }

            // If MySQL table is empty, seed from local db.json if available
            if (file_exists($dbFile)) {
                $raw = file_get_contents($dbFile);
                $seed = json_decode($raw, true);
                if ($seed) {
                    $insertStmt = $pdo->prepare("INSERT INTO `adhira_store` (`key`, `data`) VALUES ('main_db', :data) ON DUPLICATE KEY UPDATE `data` = VALUES(`data`)");
                    $insertStmt->execute([':data' => $raw]);
                    syncRelationalTables($pdo, $seed);
                    echo json_encode([
                        'initialized' => true,
                        'data' => $seed,
                        'source' => 'cpanel_mysql_seeded'
                    ]);
                    exit;
                }
            }
        } catch (Exception $e) {
            error_log("[Adhira cPanel] MySQL read error: " . $e->getMessage());
        }
    }

    // Fallback to local JSON file
    if (!file_exists($dbFile)) {
        echo json_encode(['initialized' => false, 'message' => 'No database file initialized yet']);
        exit;
    }

    $raw = @file_get_contents($dbFile);
    $decoded = json_decode($raw, true);
    if ($decoded === null) {
        http_response_code(500);
        echo json_encode(['error' => 'Database file corrupted or unreadable']);
        exit;
    }

    echo json_encode([
        'initialized' => true,
        'data' => $decoded,
        'source' => 'cpanel_json_file'
    ]);
    exit;
}

// 4. SAVE DATABASE
if ($isDbRoute && $_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data || !is_array($data)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON database payload']);
        exit;
    }

    $savedToMySQL = false;
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO `adhira_store` (`key`, `data`) VALUES ('main_db', :data) ON DUPLICATE KEY UPDATE `data` = VALUES(`data`)");
            $stmt->execute([':data' => $rawInput]);
            $savedToMySQL = true;
            // Also update all individual tables in MySQL (categories, products, customers, sellers, quotations, invoices)
            syncRelationalTables($pdo, $data);
        } catch (Exception $e) {
            error_log("[Adhira cPanel] MySQL save error: " . $e->getMessage());
        }
    }

    // Atomic write to local file for backup/cache
    $tempFile = $dbFile . '.tmp';
    $fileSaved = false;
    if (@file_put_contents($tempFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false) {
        @rename($tempFile, $dbFile);
        $fileSaved = true;
    }

    echo json_encode([
        'success' => true,
        'timestamp' => date('c'),
        'storage' => $savedToMySQL ? 'cpanel_mysql' : 'cpanel_json_file',
        'savedToMySQL' => $savedToMySQL,
        'savedToFile' => $fileSaved
    ]);
    exit;
}

// 5. BACKUP DATABASE
if ($isBackupRoute && $_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $timestamp = date('Y-m-d_H-i-s');
    $backupPath = $backupDir . "/db_backup_{$timestamp}.json";

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT `data` FROM `adhira_store` WHERE `key` = 'main_db' LIMIT 1");
            $stmt->execute();
            $row = $stmt->fetch();
            if ($row && !empty($row['data'])) {
                @file_put_contents($backupPath, $row['data']);
                echo json_encode(['success' => true, 'backupFile' => basename($backupPath), 'source' => 'cpanel_mysql']);
                exit;
            }
        } catch (Exception $e) {
            error_log("Backup from MySQL failed: " . $e->getMessage());
        }
    }

    if (file_exists($dbFile)) {
        @copy($dbFile, $backupPath);
        echo json_encode(['success' => true, 'backupFile' => basename($backupPath), 'source' => 'cpanel_file']);
        exit;
    }

    http_response_code(404);
    echo json_encode(['error' => 'No database file to backup']);
    exit;
}

// 6. GMAIL SMTP HELPER
function sendGmailSmtp($to, $subject, $htmlBody) {
    $host = 'ssl://smtp.gmail.com';
    $port = 465;
    $user = 'lakshmimedicotech25@gmail.com';
    $pass = 'tlzn yihv pnex igaq';

    $socket = @fsockopen($host, $port, $errno, $errstr, 12);
    if (!$socket) {
        return false;
    }

    $read = function($expectedCode) use ($socket) {
        $response = '';
        while ($str = fgets($socket, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) === ' ') break;
        }
        return substr($response, 0, 3) === $expectedCode;
    };

    if (!$read('220')) { fclose($socket); return false; }
    fputs($socket, "EHLO localhost\r\n");
    if (!$read('250')) { fclose($socket); return false; }
    fputs($socket, "AUTH LOGIN\r\n");
    if (!$read('334')) { fclose($socket); return false; }
    fputs($socket, base64_encode($user) . "\r\n");
    if (!$read('334')) { fclose($socket); return false; }
    fputs($socket, base64_encode($pass) . "\r\n");
    if (!$read('235')) { fclose($socket); return false; }
    fputs($socket, "MAIL FROM: <{$user}>\r\n");
    if (!$read('250')) { fclose($socket); return false; }
    fputs($socket, "RCPT TO: <{$to}>\r\n");
    if (!$read('250')) { fclose($socket); return false; }
    fputs($socket, "DATA\r\n");
    if (!$read('354')) { fclose($socket); return false; }

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: ADHIRA PYROTECH Security <{$user}>\r\n";
    $headers .= "To: {$to}\r\n";
    $headers .= "Subject: {$subject}\r\n";
    $headers .= "Date: " . date('r') . "\r\n";

    fputs($socket, "{$headers}\r\n{$htmlBody}\r\n.\r\n");
    if (!$read('250')) { fclose($socket); return false; }
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    return true;
}

// 7. SEND OTP ROUTE
if ($action === 'send-otp' || $action === 'auth/send-otp' || strpos($path, '/api/auth/send-otp') !== false) {
    header('Content-Type: application/json');
    $otp = (string) rand(100000, 999999);
    $targetEmail = 'lakshmimedicotech25@gmail.com';
    $otpData = [
        'otp' => $otp,
        'expiresAt' => time() + 600
    ];
    @file_put_contents(__DIR__ . '/data/active_otp.json', json_encode($otpData));

    $html = "
      <div style='font-family: Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;'>
        <div style='text-align: center; margin-bottom: 20px;'>
          <h2 style='color: #0c1033; margin: 0 0 6px;'>ADHIRA FIRE WORKS & PYROTECH</h2>
          <p style='color: #64748b; font-size: 13px; margin: 0;'>Sivakasi, Tamil Nadu — Billing Admin Portal</p>
        </div>
        <div style='background: #f8fafc; border-radius: 8px; padding: 18px; text-align: center; border: 1px dashed #cbd5e1; margin-bottom: 20px;'>
          <p style='font-size: 13px; color: #475569; margin: 0 0 10px;'>Your One-Time Security Passcode (OTP) to update Admin credentials is:</p>
          <div style='font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #1e2978; font-family: monospace;'>{$otp}</div>
          <p style='font-size: 12px; color: #94a3b8; margin: 10px 0 0;'>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
        </div>
        <p style='font-size: 12px; color: #64748b; line-height: 1.5;'>
          If you did not request to change your credentials, please ensure your system is secure.
        </p>
        <hr style='border: none; border-top: 1px solid #f1f5f9; margin: 20px 0;' />
        <div style='font-size: 11px; color: #94a3b8; text-align: center;'>
          ADHIRA PYROTECH Commercial Billing System • Sivakasi, Tamil Nadu
        </div>
      </div>
    ";

    $sent = sendGmailSmtp($targetEmail, "Your ADHIRA PYROTECH Admin Verification Code: {$otp}", $html);
    if ($sent) {
        echo json_encode(['success' => true, 'message' => "Verification OTP sent to {$targetEmail}", 'expiresInMinutes' => 10]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to connect to Gmail SMTP']);
    }
    exit;
}

// 8. VERIFY OTP ROUTE
if ($action === 'verify-otp' || $action === 'auth/verify-otp' || strpos($path, '/api/auth/verify-otp') !== false) {
    header('Content-Type: application/json');
    $input = json_decode(file_get_contents('php://input'), true);
    $otp = trim($input['otp'] ?? '');
    $otpFile = __DIR__ . '/data/active_otp.json';

    if (!file_exists($otpFile)) {
        http_response_code(400);
        echo json_encode(['valid' => false, 'message' => 'No active OTP found.']);
        exit;
    }

    $record = json_decode(file_get_contents($otpFile), true);
    if (time() > ($record['expiresAt'] ?? 0)) {
        @unlink($otpFile);
        http_response_code(400);
        echo json_encode(['valid' => false, 'message' => 'OTP has expired.']);
        exit;
    }

    if (($record['otp'] ?? '') !== $otp) {
        http_response_code(400);
        echo json_encode(['valid' => false, 'message' => 'Incorrect OTP.']);
        exit;
    }

    echo json_encode(['valid' => true, 'message' => 'OTP verified successfully.']);
    exit;
}

// 9. CHANGE CREDENTIALS ROUTE
if ($action === 'change-credentials' || $action === 'auth/change-credentials' || strpos($path, '/api/auth/change-credentials') !== false) {
    header('Content-Type: application/json');
    $input = json_decode(file_get_contents('php://input'), true);
    $newUsername = trim($input['newUsername'] ?? '');
    $newPassword = trim($input['newPassword'] ?? '');
    $adminEmail = trim($input['adminEmail'] ?? '');

    if (empty($newUsername) || empty($newPassword)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'New username and password are required.']);
        exit;
    }

    // Update in dbFile
    $db = file_exists($dbFile) ? json_decode(file_get_contents($dbFile), true) : [];
    if (!isset($db['auth'])) $db['auth'] = [];
    $db['auth']['username'] = $newUsername;
    $db['auth']['password'] = $newPassword;
    if (!empty($adminEmail)) {
        $db['auth']['adminEmail'] = $adminEmail;
    }
    $db['auth']['lastUpdated'] = date('c');

    @file_put_contents($dbFile, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO `adhira_store` (`key`, `data`) VALUES ('main_db', :data) ON DUPLICATE KEY UPDATE `data` = VALUES(`data`)");
            $stmt->execute([':data' => json_encode($db)]);
        } catch (Exception $e) {}
    }

    $otpFile = __DIR__ . '/data/active_otp.json';
    if (file_exists($otpFile)) @unlink($otpFile);

    echo json_encode(['success' => true, 'message' => 'Admin credentials updated successfully!']);
    exit;
}

// 9.5 LOGIN ROUTE
if ($action === 'login' || $action === 'auth/login' || strpos($path, '/api/auth/login') !== false) {
    header('Content-Type: application/json');
    $input = json_decode(file_get_contents('php://input'), true);
    $user = trim($input['username'] ?? '');
    $pass = trim($input['password'] ?? '');

    $storedUsername = 'admin';
    $storedPassword = 'admin';

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT `data` FROM `adhira_store` WHERE `key` = 'main_db' LIMIT 1");
            $stmt->execute();
            $row = $stmt->fetch();
            if ($row && !empty($row['data'])) {
                $dec = json_decode($row['data'], true);
                if (!empty($dec['auth']['username'])) $storedUsername = $dec['auth']['username'];
                if (!empty($dec['auth']['password'])) $storedPassword = $dec['auth']['password'];
            }
        } catch (Exception $e) {}
    }
    if (file_exists($dbFile)) {
        $dec = json_decode(file_get_contents($dbFile), true);
        if (!empty($dec['auth']['username'])) $storedUsername = $dec['auth']['username'];
        if (!empty($dec['auth']['password'])) $storedPassword = $dec['auth']['password'];
    }

    if ($user === $storedUsername && $pass === $storedPassword) {
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'username' => $storedUsername,
                'role' => 'Admin'
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid username or password.'
        ]);
    }
    exit;
}

// 10. E-WAY BILL & E-INVOICE ARCHITECTURE ROUTES
if ($action === 'generate-ewb' || strpos($path, '/api/eway-bills/generate') !== false) {
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'status' => 'UNCONFIGURED',
        'error' => 'Government E-Way Bill integration is not configured.',
        'message' => 'Official NIC/GSP API credentials must be configured in Settings to generate official government E-Way Bills. No fake EWB numbers are generated.',
        'officialResponse' => null
    ]);
    exit;
}

if ($action === 'generate-einv' || strpos($path, '/api/einvoices/generate') !== false) {
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'status' => 'UNCONFIGURED',
        'error' => 'Government E-Invoice integration is not configured.',
        'message' => 'Official IRP / GSP API credentials must be configured in Settings to generate official government IRN. No fake IRNs are generated.',
        'officialResponse' => null
    ]);
    exit;
}

// Default fallback
header('Content-Type: application/json');
echo json_encode(['message' => 'Adhira Pyrotech cPanel Backend Active', 'version' => '2.0.0']);

