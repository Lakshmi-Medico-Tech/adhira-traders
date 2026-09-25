const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const https = require('https');

let pgPool = null;
const DATABASE_URL = process.env.DATABASE_URL;

// Initialize PostgreSQL if DATABASE_URL is configured (e.g. Supabase, Neon, Render PostgreSQL)
if (DATABASE_URL) {
  try {
    const { Pool } = require('pg');
    pgPool = new Pool({
      connectionString: DATABASE_URL,
      ssl: process.env.DATABASE_NO_SSL ? false : { rejectUnauthorized: false }
    });
    console.log('[Database] Connecting to Persistent Cloud PostgreSQL...');
    
    // Ensure storage table exists
    pgPool.query(`
      CREATE TABLE IF NOT EXISTS adhira_store (
        key VARCHAR(64) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `).then(() => {
      console.log('[Database] Cloud PostgreSQL table `adhira_store` verified & ready.');
    }).catch(err => {
      console.error('[Database] PostgreSQL initialization warning:', err.message);
    });
  } catch (err) {
    console.warn('[Database] pg module not loaded or connection error:', err.message);
    pgPool = null;
  }
}

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const BACKUP_DIR = path.join(__dirname, 'backups');

// Ensure data and backup directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Enable CORS and JSON parsing
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Helper to get local IPv4 addresses
function getNetworkIps() {
  const nets = os.networkInterfaces();
  const results = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        results.push({ interface: name, ip: net.address });
      }
    }
  }
  return results;
}

// Lightweight Keep-Alive Ping endpoint (Returns immediately in 1ms)
app.get('/api/ping', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
    database: pgPool ? 'postgresql_cloud' : 'local_json'
  });
});

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: pgPool ? 'postgresql_cloud' : 'local_json'
  });
});

// API Info (Network IPs, Port, Host info, Keep-alive info)
app.get('/api/info', async (req, res) => {
  const ips = getNetworkIps();
  let hasPg = false;
  if (pgPool) {
    try {
      const q = await pgPool.query("SELECT 1 FROM adhira_store WHERE key = 'main_db'");
      hasPg = q.rowCount > 0;
    } catch (e) {
      hasPg = false;
    }
  }
  res.json({
    port: PORT,
    localUrl: `http://localhost:${PORT}`,
    networkUrls: ips.map(i => ({ interface: i.interface, ip: i.ip, url: `http://${i.ip}:${PORT}` })),
    hasDb: hasPg || fs.existsSync(DB_FILE),
    dbStorageType: pgPool ? 'postgresql_cloud' : 'local_json',
    isPersistent: !!pgPool,
    renderExternalUrl: process.env.RENDER_EXTERNAL_URL || null,
    keepAliveActive: !!keepAliveInterval
  });
});

// API Get Database (PostgreSQL with local file fallback)
app.get('/api/db', async (req, res) => {
  if (pgPool) {
    try {
      const result = await pgPool.query("SELECT data FROM adhira_store WHERE key = 'main_db'");
      if (result.rowCount > 0 && result.rows[0].data) {
        return res.json({ initialized: true, data: result.rows[0].data, source: 'postgresql_cloud' });
      }
      // If Postgres has no records yet, seed from local db.json if available
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        const seedData = JSON.parse(raw);
        await pgPool.query(
          "INSERT INTO adhira_store (key, data, updated_at) VALUES ('main_db', $1, NOW()) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()",
          [seedData]
        );
        return res.json({ initialized: true, data: seedData, source: 'postgresql_cloud_seeded' });
      }
      return res.json({ initialized: false, message: 'Cloud database ready but empty' });
    } catch (err) {
      console.error('[Database] Error reading from PostgreSQL, falling back to local file:', err.message);
    }
  }

  // Fallback to local db.json
  if (!fs.existsSync(DB_FILE)) {
    return res.json({ initialized: false, message: 'No server database yet' });
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const data = JSON.parse(raw);
    res.json({ initialized: true, data, source: 'local_file' });
  } catch (err) {
    console.error('Error reading database file:', err);
    res.status(500).json({ error: 'Failed to read database', details: err.message });
  }
});

// API Save Database (Saves to PostgreSQL + local file cache)
app.post('/api/db', async (req, res) => {
  try {
    const incomingData = req.body;
    if (!incomingData || typeof incomingData !== 'object') {
      return res.status(400).json({ error: 'Invalid database payload' });
    }

    // 1. Save to Cloud PostgreSQL if configured
    let pgSuccess = false;
    if (pgPool) {
      try {
        await pgPool.query(
          "INSERT INTO adhira_store (key, data, updated_at) VALUES ('main_db', $1, NOW()) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()",
          [incomingData]
        );
        pgSuccess = true;
      } catch (pgErr) {
        console.error('[Database] Failed to write to PostgreSQL:', pgErr.message);
      }
    }

    // 2. Atomic write to local file as redundancy cache
    try {
      const tempFile = DB_FILE + '.tmp';
      fs.writeFileSync(tempFile, JSON.stringify(incomingData, null, 2), 'utf8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (fsErr) {
      console.warn('Local file cache write error:', fsErr.message);
    }

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      storage: pgSuccess ? 'postgresql_cloud' : 'local_json'
    });
  } catch (err) {
    console.error('Error writing database:', err);
    res.status(500).json({ error: 'Failed to save database', details: err.message });
  }
});

// API Backup Database
app.post('/api/backup', async (req, res) => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(BACKUP_DIR, `db_backup_${timestamp}.json`);

    if (pgPool) {
      try {
        const result = await pgPool.query("SELECT data FROM adhira_store WHERE key = 'main_db'");
        if (result.rowCount > 0 && result.rows[0].data) {
          fs.writeFileSync(backupPath, JSON.stringify(result.rows[0].data, null, 2), 'utf8');
          return res.json({ success: true, backupFile: path.basename(backupPath), source: 'postgresql_cloud' });
        }
      } catch (e) {
        console.warn('Backup from PG failed, falling back to file:', e.message);
      }
    }

    if (!fs.existsSync(DB_FILE)) {
      return res.status(404).json({ error: 'Database file does not exist yet' });
    }
    fs.copyFileSync(DB_FILE, backupPath);
    res.json({ success: true, backupFile: path.basename(backupPath), source: 'local_file' });
  } catch (err) {
    console.error('Error creating backup:', err);
    res.status(500).json({ error: 'Failed to create backup', details: err.message });
  }
});

// Serve static frontend files with no-cache for fresh edits
app.use(express.static(__dirname, {
  etag: false,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// Fallback for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start listening on all network interfaces (0.0.0.0)
const server = app.listen(PORT, '0.0.0.0', () => {
  const ips = getNetworkIps();
  console.log('\n========================================================');
  console.log('  ADHIRA PYROTECH BILLING & QUOTATION SYSTEM');
  console.log('========================================================');
  console.log(`  Local Access:      http://localhost:${PORT}`);
  ips.forEach(i => {
    console.log(`  Network Access:    http://${i.ip}:${PORT}  (${i.interface})`);
  });
  console.log(`  Database Engine:   ${pgPool ? 'Persistent Cloud PostgreSQL (Lifetime Safe)' : 'Local File JSON (data/db.json)'}`);
  console.log('========================================================\n');
});

// --- RENDER 24/7 AUTO KEEP-ALIVE SYSTEM ---
// Automatically prevents Render Free Tier instances from sleeping / spinning down!
let keepAliveInterval = null;
const pingTargetUrl = process.env.KEEP_ALIVE_URL || (process.env.RENDER_EXTERNAL_URL ? `${process.env.RENDER_EXTERNAL_URL}/api/ping` : null);

if (pingTargetUrl) {
  console.log(`[Keep-Alive] 24/7 Ping Service started for: ${pingTargetUrl}`);
  // Ping every 9 minutes (540,000 ms) before Render's 15-minute sleep threshold
  keepAliveInterval = setInterval(() => {
    try {
      const client = pingTargetUrl.startsWith('https') ? https : http;
      client.get(pingTargetUrl, (resp) => {
        console.log(`[Keep-Alive] Ping sent to prevent sleep. Status: ${resp.statusCode}`);
      }).on('error', (e) => {
        console.warn('[Keep-Alive] Ping error:', e.message);
      });
    } catch (e) {
      console.warn('[Keep-Alive] Failed to execute ping:', e.message);
    }
  }, 9 * 60 * 1000);
}
