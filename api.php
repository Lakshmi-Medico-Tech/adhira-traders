<?php
/**
 * ATHIRA CRACKERS / ADHIRA PYROTECH - E-COMMERCE API
 * Dual-Mode Backend: MySQL (Production / cPanel) + JSON fallback
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// -------------------------------------------------------------
// 1. DATABASE CONFIGURATION (Supports config.php or fallback)
// -------------------------------------------------------------
if (file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
} elseif (file_exists(__DIR__ . '/../config.php')) {
    require_once __DIR__ . '/../config.php';
}

if (!defined('DB_HOST')) define('DB_HOST', 'localhost');
if (!defined('DB_NAME')) define('DB_NAME', 'athira_crackers_db');
if (!defined('DB_USER')) define('DB_USER', 'root');
if (!defined('DB_PASS')) define('DB_PASS', '');
if (!defined('DB_CHARSET')) define('DB_CHARSET', 'utf8mb4');

define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'admin'); // Default password: admin (changeable anytime in Admin Settings)

$jsonDbFile = __DIR__ . '/database.json';
$pdo = null;
$dbError = null;

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (Exception $e) {
    // MySQL not configured or offline - fallback to database.json
    $pdo = null;
    $dbError = $e->getMessage();
}

// Helper: Read JSON DB
function readJsonDb() {
    global $jsonDbFile;
    if (!file_exists($jsonDbFile)) {
        return ['settings' => [], 'banners' => [], 'categories' => [], 'products' => [], 'orders' => []];
    }
    $content = file_get_contents($jsonDbFile);
    return json_decode($content, true) ?: [];
}

// Helper: Write JSON DB
function writeJsonDb($data) {
    global $jsonDbFile;
    file_put_contents($jsonDbFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
}

// Helper: Get request body
function getJsonInput() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?: [];
}

// Route action
$action = isset($_GET['action']) ? $_GET['action'] : '';

// -------------------------------------------------------------
// 2. ENDPOINTS
// -------------------------------------------------------------

// A. SITE DATA (Settings, Banners, Categories, Products, Combos, Giftboxes)
if ($action === 'site-data') {
    if ($pdo) {
        // From MySQL
        $settingsStmt = $pdo->query("SELECT setting_key, setting_value FROM settings");
        $settings = [];
        while ($row = $settingsStmt->fetch()) {
            $val = $row['setting_value'];
            $decoded = json_decode($val, true);
            $settings[$row['setting_key']] = ($decoded !== null && (is_array($decoded) || is_numeric($decoded))) ? $decoded : $val;
        }

        $banners = $pdo->query("SELECT * FROM banners ORDER BY sort_order ASC, id ASC")->fetchAll();
        $categories = $pdo->query("SELECT * FROM categories ORDER BY position ASC, sort_order ASC, id ASC")->fetchAll();
        $products = $pdo->query("SELECT * FROM products ORDER BY position ASC, cat_id ASC, id ASC")->fetchAll();
        
        // Normalize product types
        foreach ($products as &$p) {
            $p['id'] = (int)$p['id'];
            $p['cat_id'] = (int)$p['cat_id'];
            $p['orig_price'] = (float)$p['orig_price'];
            $p['sale_price'] = (float)$p['sale_price'];
            $p['out_of_stock'] = (bool)$p['out_of_stock'];
            $p['position'] = (int)($p['position'] ?? $p['id']);
        }

        // Try to get combos & giftboxes from MySQL if tables exist
        $combos = [];
        $giftboxes = [];
        try {
            $combos = $pdo->query("SELECT * FROM combos ORDER BY position ASC, id ASC")->fetchAll();
            $giftboxes = $pdo->query("SELECT * FROM giftboxes ORDER BY position ASC, id ASC")->fetchAll();
        } catch (Exception $e) { /* tables might not exist yet */ }

        // Strip admin credentials from public site data for security
        unset($settings['admin_password']);
        unset($settings['admin_username']);

        echo json_encode([
            'success' => true,
            'source' => 'mysql',
            'db_connected' => true,
            'db_name' => defined('DB_NAME') ? DB_NAME : '',
            'settings' => $settings,
            'banners' => $banners,
            'categories' => $categories,
            'products' => $products,
            'combos' => $combos,
            'giftboxes' => $giftboxes
        ]);
        exit;
    } else {
        // From JSON
        $data = readJsonDb();
        $publicSettings = $data['settings'] ?? [];
        unset($publicSettings['admin_password']);
        unset($publicSettings['admin_username']);

        echo json_encode([
            'success' => true,
            'source' => 'json',
            'db_connected' => false,
            'db_error' => $dbError,
            'settings' => $publicSettings,
            'banners' => $data['banners'] ?? [],
            'categories' => $data['categories'] ?? [],
            'products' => $data['products'] ?? [],
            'combos' => $data['combos'] ?? [],
            'giftboxes' => $data['giftboxes'] ?? []
        ]);
        exit;
    }
}

// A2. DATABASE STATUS CHECK
if ($action === 'db-status') {
    $tables = [];
    $tableCounts = [];
    if ($pdo) {
        $requiredTables = ['settings', 'categories', 'products', 'banners', 'combos', 'giftboxes', 'orders'];
        foreach ($requiredTables as $tbl) {
            try {
                $count = $pdo->query("SELECT COUNT(*) FROM `$tbl`")->fetchColumn();
                $tables[$tbl] = true;
                $tableCounts[$tbl] = (int)$count;
            } catch (Exception $e) {
                $tables[$tbl] = false;
                $tableCounts[$tbl] = 0;
            }
        }
    }

    echo json_encode([
        'success' => true,
        'connected' => $pdo !== null,
        'source' => $pdo ? 'mysql' : 'json',
        'db_host' => defined('DB_HOST') ? DB_HOST : 'localhost',
        'db_name' => defined('DB_NAME') ? DB_NAME : '',
        'db_user' => defined('DB_USER') ? DB_USER : '',
        'error' => $dbError,
        'tables' => $tables,
        'table_counts' => $tableCounts
    ]);
    exit;
}

// A3. TEST DATABASE CONNECTION
if ($action === 'test-db') {
    $input = getJsonInput();
    $host = trim($input['db_host'] ?? (defined('DB_HOST') ? DB_HOST : 'localhost'));
    $name = trim($input['db_name'] ?? (defined('DB_NAME') ? DB_NAME : ''));
    $user = trim($input['db_user'] ?? (defined('DB_USER') ? DB_USER : ''));
    $pass = isset($input['db_pass']) ? $input['db_pass'] : (defined('DB_PASS') ? DB_PASS : '');

    try {
        $testDsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";
        $testPdo = new PDO($testDsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 5
        ]);
        $prodCount = 0;
        try {
            $prodCount = (int)$testPdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
        } catch (Exception $ex) {}
        echo json_encode([
            'success' => true,
            'message' => "Successfully connected to cPanel MySQL database '{$name}' at {$host}!",
            'products_count' => $prodCount
        ]);
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'MySQL Connection Failed: ' . $e->getMessage()
        ]);
    }
    exit;
}

// A4. SAVE DATABASE CONFIGURATION TO config.php
if ($action === 'save-db-config') {
    $input = getJsonInput();
    $host = trim($input['db_host'] ?? 'localhost');
    $name = trim($input['db_name'] ?? '');
    $user = trim($input['db_user'] ?? '');
    $pass = $input['db_pass'] ?? '';

    // First test connection
    try {
        $testDsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";
        $testPdo = new PDO($testDsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 5
        ]);
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Connection test failed. Please verify credentials: ' . $e->getMessage()
        ]);
        exit;
    }

    // Write config.php
    $configFile = __DIR__ . '/config.php';
    $configContent = "<?php\n" .
        "/**\n" .
        " * ATHIRA CRACKERS & ADHIRA PYROTECH - CPANEL DATABASE CONFIGURATION\n" .
        " * Saved via Admin Dashboard\n" .
        " */\n\n" .
        "define('DB_HOST', " . var_export($host, true) . ");\n" .
        "define('DB_NAME', " . var_export($name, true) . ");\n" .
        "define('DB_USER', " . var_export($user, true) . ");\n" .
        "define('DB_PASS', " . var_export($pass, true) . ");\n" .
        "define('DB_CHARSET', 'utf8mb4');\n";

    if (@file_put_contents($configFile, $configContent) !== false) {
        echo json_encode([
            'success' => true,
            'message' => "Database connected and config.php successfully saved to cPanel!"
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Connected to MySQL, but failed to write config.php (check folder write permissions).'
        ]);
    }
    exit;
}

// A5. SYNC DATABASE.JSON TO REAL CPANEL MYSQL
if ($action === 'sync-to-mysql') {
    if (!$pdo) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Cannot sync: MySQL database is not connected. ' . ($dbError ?: 'Please configure MySQL in Settings.')
        ]);
        exit;
    }

    $data = readJsonDb();
    $imported = ['categories' => 0, 'products' => 0, 'combos' => 0, 'giftboxes' => 0, 'banners' => 0, 'settings' => 0];

    // Ensure Tables Exist
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `settings` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `setting_key` VARCHAR(100) UNIQUE NOT NULL,
          `setting_value` TEXT,
          `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS `categories` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `name` VARCHAR(255) NOT NULL,
          `sort_order` INT DEFAULT 0,
          `position` INT DEFAULT 0,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS `products` (
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

        CREATE TABLE IF NOT EXISTS `banners` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `img` VARCHAR(500) NOT NULL,
          `title` VARCHAR(255) DEFAULT '',
          `subtitle` VARCHAR(255) DEFAULT '',
          `link` VARCHAR(500) DEFAULT '',
          `sort_order` INT DEFAULT 0,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS `combos` (
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

        CREATE TABLE IF NOT EXISTS `giftboxes` (
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

        CREATE TABLE IF NOT EXISTS `orders` (
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
    ");

    // Sync Settings
    if (!empty($data['settings'])) {
        $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value)");
        foreach ($data['settings'] as $k => $v) {
            $val = is_array($v) ? json_encode($v) : (string)$v;
            $stmt->execute([$k, $val]);
            $imported['settings']++;
        }
    }

    // Sync Categories
    if (!empty($data['categories'])) {
        $stmt = $pdo->prepare("INSERT INTO categories (id, name, sort_order, position) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), sort_order=VALUES(sort_order), position=VALUES(position)");
        foreach ($data['categories'] as $c) {
            $pos = (int)($c['position'] ?? $c['id']);
            $stmt->execute([(int)$c['id'], $c['name'], (int)($c['sort_order'] ?? $pos), $pos]);
            $imported['categories']++;
        }
    }

    // Sync Products
    if (!empty($data['products'])) {
        $stmt = $pdo->prepare("INSERT INTO products (id, cat_id, name, description, orig_price, sale_price, img, video, out_of_stock, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE cat_id=VALUES(cat_id), name=VALUES(name), description=VALUES(description), orig_price=VALUES(orig_price), sale_price=VALUES(sale_price), img=VALUES(img), video=VALUES(video), out_of_stock=VALUES(out_of_stock), position=VALUES(position)");
        foreach ($data['products'] as $p) {
            $pos = (int)($p['position'] ?? $p['id']);
            $desc = $p['desc'] ?? ($p['description'] ?? '');
            $stmt->execute([(int)$p['id'], (int)$p['cat_id'], $p['name'], $desc, (float)$p['orig_price'], (float)$p['sale_price'], $p['img'] ?? '', $p['video'] ?? '', !empty($p['out_of_stock']) ? 1 : 0, $pos]);
            $imported['products']++;
        }
    }

    // Sync Combos
    if (!empty($data['combos'])) {
        $stmt = $pdo->prepare("INSERT INTO combos (id, name, items, rate, orig_price, sale_price, img, video, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), items=VALUES(items), rate=VALUES(rate), orig_price=VALUES(orig_price), sale_price=VALUES(sale_price), img=VALUES(img), video=VALUES(video), position=VALUES(position)");
        foreach ($data['combos'] as $cb) {
            $pos = (int)($cb['position'] ?? $cb['id']);
            $sale = (float)($cb['sale_price'] ?? ($cb['rate'] ?? 0));
            $stmt->execute([(int)$cb['id'], $cb['name'], $cb['items'] ?? '', $sale, (float)($cb['orig_price'] ?? 0), $sale, $cb['img'] ?? '', $cb['video'] ?? '', $pos]);
            $imported['combos']++;
        }
    }

    // Sync Gift Boxes
    if (!empty($data['giftboxes'])) {
        $stmt = $pdo->prepare("INSERT INTO giftboxes (id, name, items, rate, orig_price, sale_price, img, video, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), items=VALUES(items), rate=VALUES(rate), orig_price=VALUES(orig_price), sale_price=VALUES(sale_price), img=VALUES(img), video=VALUES(video), position=VALUES(position)");
        foreach ($data['giftboxes'] as $g) {
            $pos = (int)($g['position'] ?? $g['id']);
            $sale = (float)($g['sale_price'] ?? ($g['rate'] ?? 0));
            $stmt->execute([(int)$g['id'], $g['name'], $g['items'] ?? '', $sale, (float)($g['orig_price'] ?? 0), $sale, $g['img'] ?? '', $g['video'] ?? '', $pos]);
            $imported['giftboxes']++;
        }
    }

    // Sync Banners
    if (!empty($data['banners'])) {
        $stmt = $pdo->prepare("INSERT INTO banners (id, img, title, subtitle) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE img=VALUES(img), title=VALUES(title), subtitle=VALUES(subtitle)");
        foreach ($data['banners'] as $b) {
            $stmt->execute([(int)$b['id'], $b['img'], $b['title'] ?? '', $b['subtitle'] ?? '']);
            $imported['banners']++;
        }
    }

    echo json_encode([
        'success' => true,
        'message' => 'Successfully synchronized all products, categories, combos, giftboxes, and settings into real cPanel MySQL!',
        'imported' => $imported
    ]);
    exit;
}

// B. ADMIN LOGIN
if ($action === 'login') {
    $input = getJsonInput();
    $username = trim($input['username'] ?? '');
    $password = trim($input['password'] ?? '');

    $validUser = ADMIN_USER;
    $validPass = ADMIN_PASS;

    // Check custom credentials from MySQL settings if connected
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'admin_password'");
            $stmt->execute();
            $pVal = $stmt->fetchColumn();
            if (!empty($pVal)) $validPass = $pVal;

            $stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'admin_username'");
            $stmt->execute();
            $uVal = $stmt->fetchColumn();
            if (!empty($uVal)) $validUser = $uVal;
        } catch (Exception $e) {}
    }

    // Check custom password from JSON settings fallback
    $data = readJsonDb();
    if (!empty($data['settings']['admin_password'])) {
        $validPass = $data['settings']['admin_password'];
    }
    if (!empty($data['settings']['admin_username'])) {
        $validUser = $data['settings']['admin_username'];
    }

    if ($username === $validUser && $password === $validPass) {
        $token = bin2hex(random_bytes(24));
        echo json_encode(['success' => true, 'token' => $token, 'username' => $username]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Invalid username or password']);
    }
    exit;
}

// B2. ADMIN CHANGE PASSWORD (Dedicated endpoint with current password verification)
if ($action === 'change-password') {
    $input = getJsonInput();
    $currentInput = trim($input['current_password'] ?? '');
    $newPass = trim($input['new_password'] ?? '');
    $newUser = trim($input['new_username'] ?? '');

    $activeUser = ADMIN_USER;
    $activePass = ADMIN_PASS;

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'admin_password'");
            $stmt->execute();
            $pVal = $stmt->fetchColumn();
            if (!empty($pVal)) $activePass = $pVal;

            $stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'admin_username'");
            $stmt->execute();
            $uVal = $stmt->fetchColumn();
            if (!empty($uVal)) $activeUser = $uVal;
        } catch (Exception $e) {}
    }

    $data = readJsonDb();
    if (!empty($data['settings']['admin_password'])) {
        $activePass = $data['settings']['admin_password'];
    }
    if (!empty($data['settings']['admin_username'])) {
        $activeUser = $data['settings']['admin_username'];
    }

    if ($currentInput !== $activePass) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Current password is incorrect. Verification failed.']);
        exit;
    }

    if (strlen($newPass) < 3) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'New password must be at least 3 characters long.']);
        exit;
    }

    // Save to MySQL
    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?");
        $stmt->execute(['admin_password', $newPass, $newPass]);
        if (!empty($newUser)) {
            $stmt->execute(['admin_username', $newUser, $newUser]);
        }
    }

    // Save to JSON DB
    $data = readJsonDb();
    $data['settings']['admin_password'] = $newPass;
    if (!empty($newUser)) {
        $data['settings']['admin_username'] = $newUser;
    }
    writeJsonDb($data);

    echo json_encode(['success' => true, 'message' => 'Admin password changed successfully!']);
    exit;
}

// C. SAVE / UPDATE SETTINGS
if ($action === 'settings') {
    $input = getJsonInput();

    // Prevent unauthorized password changes via generic settings
    if (!empty($input['admin_password'])) {
        $activePass = ADMIN_PASS;
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'admin_password'");
                $stmt->execute();
                $pVal = $stmt->fetchColumn();
                if (!empty($pVal)) $activePass = $pVal;
            } catch (Exception $e) {}
        }
        $data = readJsonDb();
        if (!empty($data['settings']['admin_password'])) {
            $activePass = $data['settings']['admin_password'];
        }

        $currentInp = trim($input['current_password'] ?? '');
        if ($currentInp !== $activePass) {
            unset($input['admin_password']);
            unset($input['admin_username']);
        }
    }

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?");
        foreach ($input as $k => $v) {
            $val = is_array($v) ? json_encode($v) : (string)$v;
            $stmt->execute([$k, $val, $val]);
        }
    }
    // Also save to JSON
    $data = readJsonDb();
    $data['settings'] = array_merge($data['settings'] ?? [], $input);
    writeJsonDb($data);

    echo json_encode(['success' => true, 'settings' => $data['settings']]);
    exit;
}

// D. PRODUCTS CRUD
if ($action === 'products') {
    $input = getJsonInput();
    $name = trim($input['name'] ?? '');
    $cat_id = (int)($input['cat_id'] ?? 1);
    $desc = trim($input['desc'] ?? $input['description'] ?? '');
    $orig_price = (float)($input['orig_price'] ?? 0);
    $sale_price = (float)($input['sale_price'] ?? 0);
    $img = trim($input['img'] ?? '');
    $video = trim($input['video'] ?? '');
    $out_of_stock = !empty($input['out_of_stock']) ? 1 : 0;
    $position = (int)($input['position'] ?? 0);

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO products (cat_id, name, description, orig_price, sale_price, img, video, out_of_stock, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$cat_id, $name, $desc, $orig_price, $sale_price, $img, $video, $out_of_stock, $position]);
        $newId = (int)$pdo->lastInsertId();

        // Also keep JSON mirror updated
        $data = readJsonDb();
        $data['products'][] = [
            'id' => $newId,
            'cat_id' => $cat_id,
            'name' => $name,
            'desc' => $desc,
            'orig_price' => $orig_price,
            'sale_price' => $sale_price,
            'img' => $img,
            'video' => $video,
            'position' => $position ?: $newId,
            'out_of_stock' => (bool)$out_of_stock
        ];
        writeJsonDb($data);
    } else {
        $data = readJsonDb();
        $maxId = 0;
        foreach ($data['products'] as $p) {
            if ($p['id'] > $maxId) $maxId = $p['id'];
        }
        $newId = $maxId + 1;
        $newProduct = [
            'id' => $newId,
            'cat_id' => $cat_id,
            'name' => $name,
            'desc' => $desc,
            'orig_price' => $orig_price,
            'sale_price' => $sale_price,
            'img' => $img,
            'video' => $video,
            'position' => $position ?: $newId,
            'out_of_stock' => (bool)$out_of_stock
        ];
        $data['products'][] = $newProduct;
        writeJsonDb($data);
    }

    echo json_encode(['success' => true, 'id' => $newId, 'message' => 'Product created successfully']);
    exit;
}

if ($action === 'update-product') {
    $input = getJsonInput();
    $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));
    if (!$id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing product ID']);
        exit;
    }

    $data = readJsonDb();
    $currentProduct = null;
    $productIndex = -1;
    foreach ($data['products'] as $idx => $p) {
        if ($p['id'] === $id) {
            $currentProduct = $p;
            $productIndex = $idx;
            break;
        }
    }

    $name = isset($input['name']) ? trim($input['name']) : ($currentProduct['name'] ?? '');
    $cat_id = isset($input['cat_id']) ? (int)$input['cat_id'] : (int)($currentProduct['cat_id'] ?? 1);
    $desc = isset($input['desc']) ? trim($input['desc']) : (isset($input['description']) ? trim($input['description']) : ($currentProduct['desc'] ?? ''));
    $orig_price = isset($input['orig_price']) ? (float)$input['orig_price'] : (float)($currentProduct['orig_price'] ?? 0);
    $sale_price = isset($input['sale_price']) ? (float)$input['sale_price'] : (float)($currentProduct['sale_price'] ?? 0);
    $img = isset($input['img']) ? trim($input['img']) : ($currentProduct['img'] ?? '');
    $video = isset($input['video']) ? trim($input['video']) : ($currentProduct['video'] ?? '');
    $out_of_stock = isset($input['out_of_stock']) ? (!empty($input['out_of_stock']) ? 1 : 0) : (!empty($currentProduct['out_of_stock']) ? 1 : 0);
    $position = isset($input['position']) ? (int)$input['position'] : (int)($currentProduct['position'] ?? $id);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("UPDATE products SET cat_id=?, name=?, description=?, orig_price=?, sale_price=?, img=?, video=?, out_of_stock=?, position=? WHERE id=?");
            $stmt->execute([$cat_id, $name, $desc, $orig_price, $sale_price, $img, $video, $out_of_stock, $position, $id]);
        } catch (Exception $e) {
            $stmt = $pdo->prepare("UPDATE products SET cat_id=?, name=?, description=?, orig_price=?, sale_price=?, img=?, video=?, out_of_stock=? WHERE id=?");
            $stmt->execute([$cat_id, $name, $desc, $orig_price, $sale_price, $img, $video, $out_of_stock, $id]);
        }
    }

    if ($productIndex !== -1) {
        $data['products'][$productIndex]['name'] = $name;
        $data['products'][$productIndex]['cat_id'] = $cat_id;
        $data['products'][$productIndex]['desc'] = $desc;
        $data['products'][$productIndex]['orig_price'] = $orig_price;
        $data['products'][$productIndex]['sale_price'] = $sale_price;
        $data['products'][$productIndex]['img'] = $img;
        $data['products'][$productIndex]['video'] = $video;
        $data['products'][$productIndex]['out_of_stock'] = (bool)$out_of_stock;
        $data['products'][$productIndex]['position'] = $position;
        writeJsonDb($data);
    }

    echo json_encode(['success' => true, 'message' => 'Product updated successfully']);
    exit;
}

if ($action === 'delete-product') {
    $input = getJsonInput();
    $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));
    if ($pdo) {
        $stmt = $pdo->prepare("DELETE FROM products WHERE id=?");
        $stmt->execute([$id]);
    }
    $data = readJsonDb();
    $data['products'] = array_values(array_filter($data['products'], function($p) use ($id) {
        return $p['id'] !== $id;
    }));
    writeJsonDb($data);

    echo json_encode(['success' => true, 'message' => 'Product deleted successfully']);
    exit;
}

// D2. BULK PRODUCTS UPLOAD / UPDATE
if ($action === 'bulk-products') {
    $input = getJsonInput();
    $products = $input['products'] ?? [];
    $catNameMap = $input['catNameMap'] ?? [];

    $data = readJsonDb();
    if (!isset($data['products']) || !is_array($data['products'])) $data['products'] = [];
    if (!isset($data['categories']) || !is_array($data['categories'])) $data['categories'] = [];

    // Fallback: Populate catNameMap from JSON DB categories
    foreach ($data['categories'] as $c) {
        if (!empty($c['name'])) {
            $key = strtoupper(trim($c['name']));
            if (!isset($catNameMap[$key])) {
                $catNameMap[$key] = (int)$c['id'];
            }
        }
    }

    // Fallback: Populate catNameMap from MySQL categories if available
    if ($pdo) {
        try {
            $catRows = $pdo->query("SELECT id, UPPER(TRIM(name)) as uname FROM categories")->fetchAll();
            foreach ($catRows as $crow) {
                if (!empty($crow['uname']) && !isset($catNameMap[$crow['uname']])) {
                    $catNameMap[$crow['uname']] = (int)$crow['id'];
                }
            }
        } catch (Exception $e) {}
    }

    // Determine current discount percent for auto-calculated sale price
    $discPercent = 85.0;
    if (!empty($data['settings']['discount_percent'])) {
        $discPercent = (float)$data['settings']['discount_percent'];
    }
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT setting_value FROM settings WHERE setting_key = 'discount_percent'");
            $stmt->execute();
            $dVal = $stmt->fetchColumn();
            if ($dVal !== false && is_numeric($dVal)) {
                $discPercent = (float)$dVal;
            }
        } catch (Exception $e) {}
    }

    $added = 0;
    $updated = 0;
    $errors = [];

    foreach ($products as $idx => $p) {
        $rowNum = $p['_row'] ?? ($idx + 2);
        $catKey = strtoupper(trim($p['categoryName'] ?? ''));
        $catId = $catNameMap[$catKey] ?? null;

        if (!$catId && !empty($p['cat_id'])) {
            $catId = (int)$p['cat_id'];
        }

        if (!$catId) {
            $errors[] = "Row {$rowNum}: Category '{$p['categoryName']}' not found";
            continue;
        }

        $name = trim($p['name'] ?? '');
        if (empty($name)) {
            $errors[] = "Row {$rowNum}: Missing product name";
            continue;
        }

        $origPrice = (float)($p['orig_price'] ?? 0);
        $salePrice = (float)($p['sale_price'] ?? 0);
        if ($salePrice <= 0 && $origPrice > 0) {
            $salePrice = round($origPrice * (1 - $discPercent / 100));
        }

        $desc = trim($p['desc'] ?? ($p['description'] ?? ''));
        $img = trim($p['img'] ?? '');
        $video = trim($p['video'] ?? '');
        $outOfStock = !empty($p['out_of_stock']) ? 1 : 0;
        $pId = !empty($p['id']) ? (int)$p['id'] : null;

        if ($pId) {
            // UPDATE EXISTING
            $foundInJson = false;
            foreach ($data['products'] as &$jp) {
                if ((int)$jp['id'] === $pId) {
                    $jp['name'] = $name;
                    $jp['cat_id'] = $catId;
                    $jp['desc'] = $desc;
                    $jp['orig_price'] = $origPrice;
                    $jp['sale_price'] = $salePrice;
                    if (!empty($img)) $jp['img'] = $img;
                    if (!empty($video)) $jp['video'] = $video;
                    $jp['out_of_stock'] = (bool)$outOfStock;
                    $foundInJson = true;
                    break;
                }
            }

            if ($pdo) {
                try {
                    if (!empty($img) && !empty($video)) {
                        $stmt = $pdo->prepare("UPDATE products SET name=?, cat_id=?, description=?, orig_price=?, sale_price=?, img=?, video=?, out_of_stock=? WHERE id=?");
                        $stmt->execute([$name, $catId, $desc, $origPrice, $salePrice, $img, $video, $outOfStock, $pId]);
                    } elseif (!empty($img)) {
                        $stmt = $pdo->prepare("UPDATE products SET name=?, cat_id=?, description=?, orig_price=?, sale_price=?, img=?, out_of_stock=? WHERE id=?");
                        $stmt->execute([$name, $catId, $desc, $origPrice, $salePrice, $img, $outOfStock, $pId]);
                    } elseif (!empty($video)) {
                        $stmt = $pdo->prepare("UPDATE products SET name=?, cat_id=?, description=?, orig_price=?, sale_price=?, video=?, out_of_stock=? WHERE id=?");
                        $stmt->execute([$name, $catId, $desc, $origPrice, $salePrice, $video, $outOfStock, $pId]);
                    } else {
                        $stmt = $pdo->prepare("UPDATE products SET name=?, cat_id=?, description=?, orig_price=?, sale_price=?, out_of_stock=? WHERE id=?");
                        $stmt->execute([$name, $catId, $desc, $origPrice, $salePrice, $outOfStock, $pId]);
                    }
                    $updated++;
                } catch (Exception $e) {
                    if ($foundInJson) {
                        $updated++;
                    } else {
                        $errors[] = "Row {$rowNum}: Error updating product ID {$pId}: " . $e->getMessage();
                    }
                }
            } else {
                if ($foundInJson) {
                    $updated++;
                } else {
                    $errors[] = "Row {$rowNum}: Product ID {$pId} not found to update";
                }
            }
        } else {
            // INSERT NEW
            $position = 0;
            foreach ($data['products'] as $jp) {
                if ((int)($jp['cat_id'] ?? 0) === $catId) {
                    $position++;
                }
            }
            $position++;

            if ($pdo) {
                try {
                    $stmt = $pdo->prepare("INSERT INTO products (cat_id, name, description, orig_price, sale_price, img, video, out_of_stock, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
                    $stmt->execute([$catId, $name, $desc, $origPrice, $salePrice, $img, $video, $outOfStock, $position]);
                    $newId = (int)$pdo->lastInsertId();
                    $data['products'][] = [
                        'id' => $newId,
                        'cat_id' => $catId,
                        'name' => $name,
                        'desc' => $desc,
                        'orig_price' => $origPrice,
                        'sale_price' => $salePrice,
                        'img' => $img,
                        'video' => $video,
                        'position' => $position,
                        'out_of_stock' => (bool)$outOfStock
                    ];
                    $added++;
                } catch (Exception $e) {
                    $errors[] = "Row {$rowNum}: Failed to add product: " . $e->getMessage();
                }
            } else {
                $maxId = 0;
                foreach ($data['products'] as $jp) {
                    if ((int)$jp['id'] > $maxId) $maxId = (int)$jp['id'];
                }
                $newId = $maxId + 1;
                $data['products'][] = [
                    'id' => $newId,
                    'cat_id' => $catId,
                    'name' => $name,
                    'desc' => $desc,
                    'orig_price' => $origPrice,
                    'sale_price' => $salePrice,
                    'img' => $img,
                    'video' => $video,
                    'position' => $position,
                    'out_of_stock' => (bool)$outOfStock
                ];
                $added++;
            }
        }
    }

    writeJsonDb($data);
    echo json_encode(['success' => true, 'added' => $added, 'updated' => $updated, 'errors' => $errors]);
    exit;
}

if ($action === 'reorder-products') {
    $input = getJsonInput();
    $items = $input['items'] ?? [];
    if (empty($items) && !empty($input['orderedIds']) && is_array($input['orderedIds'])) {
        foreach ($input['orderedIds'] as $pos => $pid) {
            $items[] = ['id' => (int)$pid, 'position' => $pos + 1];
        }
    }
    $data = readJsonDb();
    foreach ($items as $it) {
        $itId = (int)($it['id'] ?? 0);
        $itPos = (int)($it['position'] ?? 0);
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE products SET position=? WHERE id=?");
                $stmt->execute([$itPos, $itId]);
            } catch (Exception $e) {}
        }
        foreach ($data['products'] as &$p) {
            if ($p['id'] === $itId) {
                $p['position'] = $itPos;
                break;
            }
        }
    }
    writeJsonDb($data);
    echo json_encode(['success' => true, 'message' => 'Products reordered']);
    exit;
}

// E. CATEGORIES CRUD & REORDERING
if ($action === 'categories') {
    $input = getJsonInput();
    $name = trim($input['name'] ?? '');
    $position = (int)($input['position'] ?? 0);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO categories (name, sort_order, position) VALUES (?, 0, ?)");
            $stmt->execute([$name, $position]);
            $newId = (int)$pdo->lastInsertId();
        } catch (Exception $e) {
            $stmt = $pdo->prepare("INSERT INTO categories (name, sort_order) VALUES (?, 0)");
            $stmt->execute([$name]);
            $newId = (int)$pdo->lastInsertId();
        }
        $data = readJsonDb();
        $data['categories'][] = ['id' => $newId, 'name' => $name, 'position' => $position ?: $newId];
        writeJsonDb($data);
    } else {
        $data = readJsonDb();
        $maxId = 0;
        foreach ($data['categories'] as $c) {
            if ($c['id'] > $maxId) $maxId = $c['id'];
        }
        $newId = $maxId + 1;
        $data['categories'][] = ['id' => $newId, 'name' => $name, 'position' => $position ?: $newId];
        writeJsonDb($data);
    }
    echo json_encode(['success' => true, 'id' => $newId, 'message' => 'Category created']);
    exit;
}

if ($action === 'update-category') {
    $input = getJsonInput();
    $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));
    $data = readJsonDb();
    $currentCat = null;
    $catIdx = -1;
    foreach ($data['categories'] as $idx => $c) {
        if ($c['id'] === $id) {
            $currentCat = $c;
            $catIdx = $idx;
            break;
        }
    }
    $name = isset($input['name']) ? trim($input['name']) : ($currentCat['name'] ?? '');
    $position = isset($input['position']) ? (int)$input['position'] : (int)($currentCat['position'] ?? $id);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("UPDATE categories SET name=?, position=? WHERE id=?");
            $stmt->execute([$name, $position, $id]);
        } catch (Exception $e) {
            $stmt = $pdo->prepare("UPDATE categories SET name=? WHERE id=?");
            $stmt->execute([$name, $id]);
        }
    }
    if ($catIdx !== -1) {
        $data['categories'][$catIdx]['name'] = $name;
        $data['categories'][$catIdx]['position'] = $position;
        writeJsonDb($data);
    }
    echo json_encode(['success' => true, 'message' => 'Category updated']);
    exit;
}

if ($action === 'delete-category') {
    $input = getJsonInput();
    $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));
    if ($pdo) {
        $stmt = $pdo->prepare("DELETE FROM categories WHERE id=?");
        $stmt->execute([$id]);
    }
    $data = readJsonDb();
    $data['categories'] = array_values(array_filter($data['categories'], function($c) use ($id) {
        return $c['id'] !== $id;
    }));
    writeJsonDb($data);
    echo json_encode(['success' => true, 'message' => 'Category deleted']);
    exit;
}

if ($action === 'reorder-categories') {
    $input = getJsonInput();
    $items = $input['items'] ?? [];
    if (empty($items) && !empty($input['orderedIds']) && is_array($input['orderedIds'])) {
        foreach ($input['orderedIds'] as $pos => $cid) {
            $items[] = ['id' => (int)$cid, 'position' => $pos + 1];
        }
    }
    $data = readJsonDb();
    foreach ($items as $it) {
        $itId = (int)($it['id'] ?? 0);
        $itPos = (int)($it['position'] ?? 0);
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE categories SET position=? WHERE id=?");
                $stmt->execute([$itPos, $itId]);
            } catch (Exception $e) {}
        }
        foreach ($data['categories'] as &$c) {
            if ($c['id'] === $itId) {
                $c['position'] = $itPos;
                break;
            }
        }
    }
    writeJsonDb($data);
    echo json_encode(['success' => true, 'message' => 'Categories reordered']);
    exit;
}

// F. BANNERS CRUD
if ($action === 'banners') {
    $input = getJsonInput();
    $img = trim($input['img'] ?? '');
    $title = trim($input['title'] ?? '');
    $subtitle = trim($input['subtitle'] ?? '');

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO banners (img, title, subtitle) VALUES (?, ?, ?)");
        $stmt->execute([$img, $title, $subtitle]);
        $newId = (int)$pdo->lastInsertId();
        $data = readJsonDb();
        $data['banners'][] = ['id' => $newId, 'img' => $img, 'title' => $title, 'subtitle' => $subtitle];
        writeJsonDb($data);
    } else {
        $data = readJsonDb();
        $maxId = 0;
        foreach ($data['banners'] as $b) {
            if ($b['id'] > $maxId) $maxId = $b['id'];
        }
        $newId = $maxId + 1;
        $data['banners'][] = ['id' => $newId, 'img' => $img, 'title' => $title, 'subtitle' => $subtitle];
        writeJsonDb($data);
    }
    echo json_encode(['success' => true, 'id' => $newId, 'message' => 'Banner added']);
    exit;
}

if ($action === 'delete-banner') {
    $input = getJsonInput();
    $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));
    if ($pdo) {
        $stmt = $pdo->prepare("DELETE FROM banners WHERE id=?");
        $stmt->execute([$id]);
    }
    $data = readJsonDb();
    $data['banners'] = array_values(array_filter($data['banners'], function($b) use ($id) {
        return $b['id'] !== $id;
    }));
    writeJsonDb($data);
    echo json_encode(['success' => true, 'message' => 'Banner deleted']);
    exit;
}

// G. COMBO PACKS CRUD & REORDERING
if ($action === 'combos') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = getJsonInput();
        $name = trim($input['name'] ?? '');
        $items = trim($input['items'] ?? '');
        $orig_price = (float)($input['orig_price'] ?? 0);
        $sale_price = (float)($input['sale_price'] ?? $input['rate'] ?? 0);
        $rate = $sale_price;
        $img = trim($input['img'] ?? '');
        $video = trim($input['video'] ?? '');
        $position = (int)($input['position'] ?? 1);

        if ($pdo) {
            try {
                $stmt = $pdo->prepare("INSERT INTO combos (name, items, orig_price, sale_price, rate, img, video, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([$name, $items, $orig_price, $sale_price, $rate, $img, $video, $position]);
                $newId = (int)$pdo->lastInsertId();
            } catch (Exception $e) {
                $newId = time();
            }
        } else {
            $data = readJsonDb();
            if (!isset($data['combos'])) $data['combos'] = [];
            $maxId = 0;
            foreach ($data['combos'] as $c) {
                if ($c['id'] > $maxId) $maxId = $c['id'];
            }
            $newId = $maxId + 1;
            $newCombo = [
                'id' => $newId,
                'name' => $name,
                'items' => $items,
                'orig_price' => $orig_price,
                'sale_price' => $sale_price,
                'rate' => $rate,
                'img' => $img,
                'video' => $video,
                'position' => $position ?: $newId
            ];
            $data['combos'][] = $newCombo;
            writeJsonDb($data);
        }
        echo json_encode(['success' => true, 'id' => $newId, 'message' => 'Combo pack created']);
        exit;
    } else {
        $data = readJsonDb();
        $combos = $data['combos'] ?? [];
        if ($pdo) {
            try {
                $combos = $pdo->query("SELECT * FROM combos ORDER BY position ASC, id ASC")->fetchAll();
            } catch (Exception $e) {}
        }
        echo json_encode(['success' => true, 'combos' => $combos]);
        exit;
    }
}

if ($action === 'update-combo') {
    $input = getJsonInput();
    $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));
    $data = readJsonDb();
    if (!isset($data['combos'])) $data['combos'] = [];
    $current = null;
    $idx = -1;
    foreach ($data['combos'] as $i => $c) {
        if ($c['id'] === $id) { $current = $c; $idx = $i; break; }
    }
    $name = isset($input['name']) ? trim($input['name']) : ($current['name'] ?? '');
    $items = isset($input['items']) ? trim($input['items']) : ($current['items'] ?? '');
    $orig_price = isset($input['orig_price']) ? (float)$input['orig_price'] : (float)($current['orig_price'] ?? 0);
    $sale_price = isset($input['sale_price']) ? (float)$input['sale_price'] : (isset($input['rate']) ? (float)$input['rate'] : (float)($current['sale_price'] ?? 0));
    $rate = $sale_price;
    $img = isset($input['img']) ? trim($input['img']) : ($current['img'] ?? '');
    $video = isset($input['video']) ? trim($input['video']) : ($current['video'] ?? '');
    $position = isset($input['position']) ? (int)$input['position'] : (int)($current['position'] ?? $id);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("UPDATE combos SET name=?, items=?, orig_price=?, sale_price=?, rate=?, img=?, video=?, position=? WHERE id=?");
            $stmt->execute([$name, $items, $orig_price, $sale_price, $rate, $img, $video, $position, $id]);
        } catch (Exception $e) {}
    }
    if ($idx !== -1) {
        $data['combos'][$idx]['name'] = $name;
        $data['combos'][$idx]['items'] = $items;
        $data['combos'][$idx]['orig_price'] = $orig_price;
        $data['combos'][$idx]['sale_price'] = $sale_price;
        $data['combos'][$idx]['rate'] = $rate;
        $data['combos'][$idx]['img'] = $img;
        $data['combos'][$idx]['video'] = $video;
        $data['combos'][$idx]['position'] = $position;
        writeJsonDb($data);
    }
    echo json_encode(['success' => true, 'message' => 'Combo pack updated']);
    exit;
}

if ($action === 'delete-combo') {
    $input = getJsonInput();
    $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("DELETE FROM combos WHERE id=?");
            $stmt->execute([$id]);
        } catch (Exception $e) {}
    }
    $data = readJsonDb();
    if (isset($data['combos'])) {
        $data['combos'] = array_values(array_filter($data['combos'], function($c) use ($id) {
            return $c['id'] !== $id;
        }));
        writeJsonDb($data);
    }
    echo json_encode(['success' => true, 'message' => 'Combo pack deleted']);
    exit;
}

if ($action === 'reorder-combos') {
    $input = getJsonInput();
    $items = $input['items'] ?? [];
    if (empty($items) && !empty($input['orderedIds']) && is_array($input['orderedIds'])) {
        foreach ($input['orderedIds'] as $pos => $cid) {
            $items[] = ['id' => (int)$cid, 'position' => $pos + 1];
        }
    }
    $data = readJsonDb();
    if (!isset($data['combos'])) $data['combos'] = [];
    foreach ($items as $it) {
        $itId = (int)($it['id'] ?? 0);
        $itPos = (int)($it['position'] ?? 0);
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE combos SET position=? WHERE id=?");
                $stmt->execute([$itPos, $itId]);
            } catch (Exception $e) {}
        }
        foreach ($data['combos'] as &$c) {
            if ($c['id'] === $itId) {
                $c['position'] = $itPos;
                break;
            }
        }
    }
    writeJsonDb($data);
    echo json_encode(['success' => true, 'message' => 'Combos reordered']);
    exit;
}

// H. GIFT BOXES CRUD & REORDERING
if ($action === 'giftboxes') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = getJsonInput();
        $name = trim($input['name'] ?? '');
        $items = trim($input['items'] ?? '');
        $orig_price = (float)($input['orig_price'] ?? 0);
        $sale_price = (float)($input['sale_price'] ?? $input['rate'] ?? 0);
        $rate = $sale_price;
        $img = trim($input['img'] ?? '');
        $video = trim($input['video'] ?? '');
        $position = (int)($input['position'] ?? 1);

        if ($pdo) {
            try {
                $stmt = $pdo->prepare("INSERT INTO giftboxes (name, items, orig_price, sale_price, rate, img, video, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([$name, $items, $orig_price, $sale_price, $rate, $img, $video, $position]);
                $newId = (int)$pdo->lastInsertId();
            } catch (Exception $e) {
                $newId = time();
            }
        } else {
            $data = readJsonDb();
            if (!isset($data['giftboxes'])) $data['giftboxes'] = [];
            $maxId = 0;
            foreach ($data['giftboxes'] as $g) {
                if ($g['id'] > $maxId) $maxId = $g['id'];
            }
            $newId = $maxId + 1;
            $newGiftbox = [
                'id' => $newId,
                'name' => $name,
                'items' => $items,
                'orig_price' => $orig_price,
                'sale_price' => $sale_price,
                'rate' => $rate,
                'img' => $img,
                'video' => $video,
                'position' => $position ?: $newId
            ];
            $data['giftboxes'][] = $newGiftbox;
            writeJsonDb($data);
        }
        echo json_encode(['success' => true, 'id' => $newId, 'message' => 'Gift box created']);
        exit;
    } else {
        $data = readJsonDb();
        $giftboxes = $data['giftboxes'] ?? [];
        if ($pdo) {
            try {
                $giftboxes = $pdo->query("SELECT * FROM giftboxes ORDER BY position ASC, id ASC")->fetchAll();
            } catch (Exception $e) {}
        }
        echo json_encode(['success' => true, 'giftboxes' => $giftboxes]);
        exit;
    }
}

if ($action === 'update-giftbox') {
    $input = getJsonInput();
    $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));
    $data = readJsonDb();
    if (!isset($data['giftboxes'])) $data['giftboxes'] = [];
    $current = null;
    $idx = -1;
    foreach ($data['giftboxes'] as $i => $g) {
        if ($g['id'] === $id) { $current = $g; $idx = $i; break; }
    }
    $name = isset($input['name']) ? trim($input['name']) : ($current['name'] ?? '');
    $items = isset($input['items']) ? trim($input['items']) : ($current['items'] ?? '');
    $orig_price = isset($input['orig_price']) ? (float)$input['orig_price'] : (float)($current['orig_price'] ?? 0);
    $sale_price = isset($input['sale_price']) ? (float)$input['sale_price'] : (isset($input['rate']) ? (float)$input['rate'] : (float)($current['sale_price'] ?? 0));
    $rate = $sale_price;
    $img = isset($input['img']) ? trim($input['img']) : ($current['img'] ?? '');
    $video = isset($input['video']) ? trim($input['video']) : ($current['video'] ?? '');
    $position = isset($input['position']) ? (int)$input['position'] : (int)($current['position'] ?? $id);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("UPDATE giftboxes SET name=?, items=?, orig_price=?, sale_price=?, rate=?, img=?, video=?, position=? WHERE id=?");
            $stmt->execute([$name, $items, $orig_price, $sale_price, $rate, $img, $video, $position, $id]);
        } catch (Exception $e) {}
    }
    if ($idx !== -1) {
        $data['giftboxes'][$idx]['name'] = $name;
        $data['giftboxes'][$idx]['items'] = $items;
        $data['giftboxes'][$idx]['orig_price'] = $orig_price;
        $data['giftboxes'][$idx]['sale_price'] = $sale_price;
        $data['giftboxes'][$idx]['rate'] = $rate;
        $data['giftboxes'][$idx]['img'] = $img;
        $data['giftboxes'][$idx]['video'] = $video;
        $data['giftboxes'][$idx]['position'] = $position;
        writeJsonDb($data);
    }
    echo json_encode(['success' => true, 'message' => 'Gift box updated']);
    exit;
}

if ($action === 'delete-giftbox') {
    $input = getJsonInput();
    $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("DELETE FROM giftboxes WHERE id=?");
            $stmt->execute([$id]);
        } catch (Exception $e) {}
    }
    $data = readJsonDb();
    if (isset($data['giftboxes'])) {
        $data['giftboxes'] = array_values(array_filter($data['giftboxes'], function($g) use ($id) {
            return $g['id'] !== $id;
        }));
        writeJsonDb($data);
    }
    echo json_encode(['success' => true, 'message' => 'Gift box deleted']);
    exit;
}

if ($action === 'reorder-giftboxes') {
    $input = getJsonInput();
    $items = $input['items'] ?? [];
    if (empty($items) && !empty($input['orderedIds']) && is_array($input['orderedIds'])) {
        foreach ($input['orderedIds'] as $pos => $gid) {
            $items[] = ['id' => (int)$gid, 'position' => $pos + 1];
        }
    }
    $data = readJsonDb();
    if (!isset($data['giftboxes'])) $data['giftboxes'] = [];
    foreach ($items as $it) {
        $itId = (int)($it['id'] ?? 0);
        $itPos = (int)($it['position'] ?? 0);
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE giftboxes SET position=? WHERE id=?");
                $stmt->execute([$itPos, $itId]);
            } catch (Exception $e) {}
        }
        foreach ($data['giftboxes'] as &$g) {
            if ($g['id'] === $itId) {
                $g['position'] = $itPos;
                break;
            }
        }
    }
    writeJsonDb($data);
    echo json_encode(['success' => true, 'message' => 'Giftboxes reordered']);
    exit;
}

// I. CUSTOMER & MANUAL ORDERS (Place, View, Edit, Delete)
if ($action === 'orders' || $action === 'create-order') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = getJsonInput();
        $orderNumber = 'ATH-' . date('Ymd') . '-' . rand(1000, 9999);
        $customerName = trim($input['name'] ?? $input['customer_name'] ?? '');
        $customerPhone = trim($input['phone'] ?? $input['customer_phone'] ?? '');
        $customerEmail = trim($input['email'] ?? $input['customer_email'] ?? '');
        $customerAddress = trim($input['address'] ?? $input['customer_address'] ?? '');
        $city = trim($input['city'] ?? '');
        $state = trim($input['state'] ?? 'Tamil Nadu');
        $pincode = trim($input['pincode'] ?? '');
        $items = $input['items'] ?? [];
        $subtotal = (float)($input['subtotal'] ?? 0);
        $discountAmount = (float)($input['discount_amount'] ?? 0);
        $totalAmount = (float)($input['total_amount'] ?? $input['total'] ?? 0);
        $paymentMethod = trim($input['payment_method'] ?? 'COD');
        $status = trim($input['status'] ?? 'Pending');
        $notes = trim($input['notes'] ?? '');

        if ($pdo) {
            $stmt = $pdo->prepare("INSERT INTO orders (order_number, customer_name, customer_phone, customer_email, customer_address, city, state, pincode, items_json, subtotal, discount_amount, total_amount, payment_method, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$orderNumber, $customerName, $customerPhone, $customerEmail, $customerAddress, $city, $state, $pincode, json_encode($items), $subtotal, $discountAmount, $totalAmount, $paymentMethod, $status, $notes]);
            $orderId = (int)$pdo->lastInsertId();

            $data = readJsonDb();
            if (!isset($data['orders'])) $data['orders'] = [];
            $newOrder = [
                'id' => $orderId,
                'order_number' => $orderNumber,
                'customer_name' => $customerName,
                'customer_phone' => $customerPhone,
                'customer_email' => $customerEmail,
                'customer_address' => $customerAddress,
                'city' => $city,
                'state' => $state,
                'pincode' => $pincode,
                'items' => $items,
                'subtotal' => $subtotal,
                'discount_amount' => $discountAmount,
                'total_amount' => $totalAmount,
                'payment_method' => $paymentMethod,
                'status' => $status,
                'created_at' => date('Y-m-d H:i:s'),
                'notes' => $notes
            ];
            array_unshift($data['orders'], $newOrder);
            writeJsonDb($data);
        } else {
            $data = readJsonDb();
            if (!isset($data['orders'])) $data['orders'] = [];
            $maxId = 0;
            foreach ($data['orders'] as $o) {
                if ($o['id'] > $maxId) $maxId = $o['id'];
            }
            $orderId = $maxId + 1;
            $newOrder = [
                'id' => $orderId,
                'order_number' => $orderNumber,
                'customer_name' => $customerName,
                'customer_phone' => $customerPhone,
                'customer_email' => $customerEmail,
                'customer_address' => $customerAddress,
                'city' => $city,
                'state' => $state,
                'pincode' => $pincode,
                'items' => $items,
                'subtotal' => $subtotal,
                'discount_amount' => $discountAmount,
                'total_amount' => $totalAmount,
                'payment_method' => $paymentMethod,
                'status' => $status,
                'created_at' => date('Y-m-d H:i:s'),
                'notes' => $notes
            ];
            array_unshift($data['orders'], $newOrder);
            writeJsonDb($data);
        }

        echo json_encode([
            'success' => true,
            'order_id' => $orderId,
            'order_number' => $orderNumber,
            'order' => [
                'id' => $orderId,
                'order_number' => $orderNumber,
                'customer_name' => $customerName,
                'customer_phone' => $customerPhone,
                'customer_address' => $customerAddress,
                'city' => $city,
                'pincode' => $pincode,
                'items' => $items,
                'subtotal' => $subtotal,
                'discount_amount' => $discountAmount,
                'total_amount' => $totalAmount,
                'status' => $status,
                'notes' => $notes
            ],
            'message' => 'Order placed successfully!'
        ]);
        exit;
    } else {
        // GET orders
        if ($pdo) {
            $orders = $pdo->query("SELECT * FROM orders ORDER BY id DESC LIMIT 200")->fetchAll();
            foreach ($orders as &$o) {
                $o['items'] = json_decode($o['items_json'], true) ?: [];
            }
        } else {
            $data = readJsonDb();
            $orders = $data['orders'] ?? [];
        }
        echo json_encode(['success' => true, 'orders' => $orders]);
        exit;
    }
}

if ($action === 'update-order') {
    $input = getJsonInput();
    $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));
    $status = trim($input['status'] ?? 'Pending');

    $data = readJsonDb();
    if (isset($data['orders'])) {
        foreach ($data['orders'] as &$o) {
            if ($o['id'] === $id) {
                $o['status'] = $status;
                if (isset($input['customer_name'])) $o['customer_name'] = trim($input['customer_name']);
                if (isset($input['customer_phone'])) $o['customer_phone'] = trim($input['customer_phone']);
                if (isset($input['customer_address'])) $o['customer_address'] = trim($input['customer_address']);
                if (isset($input['city'])) $o['city'] = trim($input['city']);
                if (isset($input['pincode'])) $o['pincode'] = trim($input['pincode']);
                if (isset($input['items'])) $o['items'] = $input['items'];
                if (isset($input['subtotal'])) $o['subtotal'] = (float)$input['subtotal'];
                if (isset($input['discount_amount'])) $o['discount_amount'] = (float)$input['discount_amount'];
                if (isset($input['total_amount'])) $o['total_amount'] = (float)$input['total_amount'];
                if (isset($input['notes'])) $o['notes'] = trim($input['notes']);
                break;
            }
        }
        writeJsonDb($data);
    }

    if ($pdo) {
        if (isset($input['items'])) {
            $itemsJson = json_encode($input['items']);
            $custName = trim($input['customer_name'] ?? '');
            $custPhone = trim($input['customer_phone'] ?? '');
            $custAddr = trim($input['customer_address'] ?? '');
            $city = trim($input['city'] ?? '');
            $pincode = trim($input['pincode'] ?? '');
            $subtotal = (float)($input['subtotal'] ?? 0);
            $discount = (float)($input['discount_amount'] ?? 0);
            $total = (float)($input['total_amount'] ?? 0);
            $notes = trim($input['notes'] ?? '');
            $stmt = $pdo->prepare("UPDATE orders SET status=?, customer_name=?, customer_phone=?, customer_address=?, city=?, pincode=?, items_json=?, subtotal=?, discount_amount=?, total_amount=?, notes=? WHERE id=?");
            $stmt->execute([$status, $custName, $custPhone, $custAddr, $city, $pincode, $itemsJson, $subtotal, $discount, $total, $notes, $id]);
        } else {
            $stmt = $pdo->prepare("UPDATE orders SET status=? WHERE id=?");
            $stmt->execute([$status, $id]);
        }
    }

    echo json_encode(['success' => true, 'message' => 'Order updated successfully']);
    exit;
}

if ($action === 'delete-order') {
    $input = getJsonInput();
    $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));
    if ($pdo) {
        $stmt = $pdo->prepare("DELETE FROM orders WHERE id=?");
        $stmt->execute([$id]);
    }
    $data = readJsonDb();
    if (isset($data['orders'])) {
        $data['orders'] = array_values(array_filter($data['orders'], function($o) use ($id) {
            return $o['id'] !== $id;
        }));
        writeJsonDb($data);
    }
    echo json_encode(['success' => true, 'message' => 'Order deleted']);
    exit;
}

// H. FILE UPLOAD (Both Images & Videos)
if ($action === 'upload') {
    if (empty($_FILES['file'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No file uploaded']);
        exit;
    }

    $file = $_FILES['file'];
    $folderType = isset($_POST['type']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['type']) : 'products';
    $targetDir = __DIR__ . '/storage/' . $folderType;

    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'mp4', 'webm', 'mov', 'ogg'];
    
    if (!in_array($ext, $allowedExts)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Unsupported file format']);
        exit;
    }

    $uniqueName = uniqid('media_', true) . '.' . $ext;
    $destPath = $targetDir . '/' . $uniqueName;

    if (move_uploaded_file($file['tmp_name'], $destPath)) {
        $relativeUrl = './storage/' . $folderType . '/' . $uniqueName;
        echo json_encode([
            'success' => true,
            'url' => $relativeUrl,
            'filename' => $uniqueName,
            'is_video' => in_array($ext, ['mp4', 'webm', 'mov', 'ogg'])
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save uploaded file']);
    }
    exit;
}

// Default response
echo json_encode([
    'status' => 'online',
    'app' => 'Athira Crackers / Adhira Pyrotech Shop API',
    'version' => '2.0.0',
    'endpoints' => [
        'GET ?action=site-data',
        'POST ?action=login',
        'POST ?action=settings',
        'POST ?action=products',
        'POST ?action=update-product',
        'POST ?action=delete-product',
        'POST ?action=bulk-products',
        'POST ?action=categories',
        'POST ?action=update-category',
        'POST ?action=delete-category',
        'POST ?action=banners',
        'POST ?action=delete-banner',
        'POST ?action=orders',
        'GET ?action=orders',
        'POST ?action=update-order',
        'POST ?action=upload'
    ]
]);
