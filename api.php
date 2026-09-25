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

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
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
function getDbConnection($config) {
    if (!empty($config['db_name']) && !empty($config['db_user'])) {
        try {
            $host = !empty($config['db_host']) ? $config['db_host'] : 'localhost';
            $port = !empty($config['db_port']) ? $config['db_port'] : '3306';
            $dsn = "mysql:host={$host};port={$port};dbname={$config['db_name']};charset=utf8mb4";
            $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'] ?? '', [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_TIMEOUT => 5
            ]);

            // Ensure table exists
            $pdo->exec("
                CREATE TABLE IF NOT EXISTS adhira_store (
                    `key` VARCHAR(64) PRIMARY KEY,
                    `data` LONGTEXT NOT NULL,
                    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
            ");
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

// 2. INFO ROUTE
if ($isInfoRoute) {
    header('Content-Type: application/json');
    echo json_encode([
        'server' => 'cPanel Apache / LiteSpeed',
        'php_version' => PHP_VERSION,
        'hasDb' => $pdo ? true : file_exists($dbFile),
        'dbStorageType' => $pdo ? 'cpanel_mysql' : 'cpanel_json_file',
        'isPersistent' => true,
        'mysql_configured' => $pdo !== null,
        'data_file' => file_exists($dbFile)
    ]);
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
        } catch (Exception $e) {
            error_log("[Adhira cPanel] MySQL save error: " . $e->getMessage());
        }
    }

    // Atomic write to local file for backup/cache
    $tempFile = $dbFile . '.tmp';
    if (@file_put_contents($tempFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false) {
        @rename($tempFile, $dbFile);
    }

    echo json_encode([
        'success' => true,
        'timestamp' => date('c'),
        'storage' => $savedToMySQL ? 'cpanel_mysql' : 'cpanel_json_file'
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

// Default fallback
header('Content-Type: application/json');
echo json_encode(['message' => 'Adhira Pyrotech cPanel Backend Active', 'version' => '2.0.0']);
