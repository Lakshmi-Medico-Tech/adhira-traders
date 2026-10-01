const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const https = require('https');
const nodemailer = require('nodemailer');

// --- GMAIL SMTP & AUTH CONFIGURATION ---
const SMTP_CONFIG = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'lakshmimedicotech25@gmail.com',
    pass: process.env.SMTP_PASS || 'tlzn yihv pnex igaq'
  }
};
const mailTransporter = nodemailer.createTransport(SMTP_CONFIG);
const activeOtps = new Map(); // key: email, value: { otp: string, expiresAt: number }

const DATABASE_URL = process.env.DATABASE_URL || null;
let pgPool = null;

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

// --- AUTHENTICATION & GMAIL OTP API ---

// 1. Send OTP to Admin Gmail
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const targetEmail = 'lakshmimedicotech25@gmail.com';
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    activeOtps.set(targetEmail, { otp, expiresAt });

    const mailOptions = {
      from: `"ADHIRA PYROTECH Security" <${SMTP_CONFIG.auth.user}>`,
      to: targetEmail,
      subject: `Your ADHIRA PYROTECH Admin Verification Code: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #0c1033; margin: 0 0 6px;">ADHIRA FIRE WORKS & PYROTECH</h2>
            <p style="color: #64748b; font-size: 13px; margin: 0;">Sivakasi, Tamil Nadu — Billing Admin Portal</p>
          </div>
          <div style="background: #f8fafc; border-radius: 8px; padding: 18px; text-align: center; border: 1px dashed #cbd5e1; margin-bottom: 20px;">
            <p style="font-size: 13px; color: #475569; margin: 0 0 10px;">Your One-Time Security Passcode (OTP) to update Admin credentials is:</p>
            <div style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #1e2978; font-family: monospace;">${otp}</div>
            <p style="font-size: 12px; color: #94a3b8; margin: 10px 0 0;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
          </div>
          <p style="font-size: 12px; color: #64748b; line-height: 1.5;">
            If you did not request to change your credentials, please ensure your system is secure.
          </p>
          <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
          <div style="font-size: 11px; color: #94a3b8; text-align: center;">
            ADHIRA PYROTECH Commercial Billing System • Sivakasi, Tamil Nadu
          </div>
        </div>
      `
    };

    await mailTransporter.sendMail(mailOptions);
    console.log(`[Auth] OTP ${otp} successfully sent to ${targetEmail}`);

    res.json({
      success: true,
      message: `Verification OTP sent to ${targetEmail}`,
      expiresInMinutes: 10
    });
  } catch (err) {
    console.error('[Auth] Failed to send OTP email:', err);
    res.status(500).json({ error: 'Failed to send OTP email: ' + err.message });
  }
});

// 2. Verify OTP
app.post('/api/auth/verify-otp', (req, res) => {
  const { otp } = req.body || {};
  const targetEmail = 'lakshmimedicotech25@gmail.com';
  const record = activeOtps.get(targetEmail);

  if (!record) {
    return res.status(400).json({ valid: false, message: 'No OTP requested or OTP has expired.' });
  }

  if (Date.now() > record.expiresAt) {
    activeOtps.delete(targetEmail);
    return res.status(400).json({ valid: false, message: 'OTP has expired. Please request a new one.' });
  }

  if (record.otp !== String(otp).trim()) {
    return res.status(400).json({ valid: false, message: 'Incorrect OTP entered. Please try again.' });
  }

  res.json({ valid: true, message: 'OTP verified successfully.' });
});

// 3. Change Admin Credentials
app.post('/api/auth/change-credentials', async (req, res) => {
  try {
    const { newUsername, newPassword, adminEmail } = req.body || {};

    if (!newUsername || !newPassword) {
      return res.status(400).json({ success: false, message: 'New username and password are required.' });
    }

    // Read current DB and update auth
    let currentData = null;
    if (fs.existsSync(DB_FILE)) {
      currentData = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
    if (!currentData && pgPool) {
      const q = await pgPool.query("SELECT data FROM adhira_store WHERE key = 'main_db'");
      if (q.rowCount > 0) currentData = q.rows[0].data;
    }

    if (currentData) {
      if (!currentData.auth) currentData.auth = {};
      currentData.auth.username = String(newUsername).trim();
      currentData.auth.password = String(newPassword).trim();
      if (adminEmail) currentData.auth.adminEmail = String(adminEmail).trim();
      currentData.auth.lastUpdated = new Date().toISOString();

      // Save to file
      const tempFile = DB_FILE + '.tmp';
      fs.writeFileSync(tempFile, JSON.stringify(currentData, null, 2), 'utf8');
      fs.renameSync(tempFile, DB_FILE);

      // Save to PostgreSQL if connected
      if (pgPool) {
        await pgPool.query(
          "INSERT INTO adhira_store (key, data, updated_at) VALUES ('main_db', $1, NOW()) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()",
          [currentData]
        );
      }
    }

    console.log(`[Auth] Admin credentials updated: Username changed to "${newUsername}".`);

    res.json({
      success: true,
      message: 'Admin credentials updated successfully! Please login with your new credentials.'
    });
  } catch (err) {
    console.error('[Auth] Error updating credentials:', err);
    res.status(500).json({ error: 'Failed to update credentials: ' + err.message });
  }
});

// 4. Admin Login Verification
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};
  let currentAuth = { username: 'admin', password: 'admin' };
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      if (data && data.auth) currentAuth = data.auth;
    }
  } catch (e) {}

  const inputUser = String(username || '').trim();
  const inputPass = String(password || '').trim();

  if (inputUser === currentAuth.username && inputPass === currentAuth.password) {
    res.json({
      success: true,
      message: 'Login successful',
      user: { username: currentAuth.username, role: 'Admin' }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password.' });
  }
});

// --- OFFICIAL GOVERNMENT GST / E-WAY BILL & E-INVOICE ARCHITECTURE ENDPOINTS ---

// E-Way Bill Generation (Strict: Returns unconfigured error if no live credentials)
app.post('/api/eway-bills/generate', (req, res) => {
  const isLiveConfigured = Boolean(process.env.EWB_CLIENT_ID && process.env.EWB_CLIENT_SECRET && process.env.EWB_USERNAME);
  if (!isLiveConfigured) {
    return res.status(400).json({
      success: false,
      status: 'UNCONFIGURED',
      error: 'Government E-Way Bill integration is not configured.',
      message: 'Official NIC/GSP API credentials must be configured in Settings to generate official government E-Way Bills. No fake EWB numbers are generated.',
      officialResponse: null
    });
  }
  res.status(501).json({ error: 'Provider connected but live credentials pending activation.' });
});

// E-Invoice Generation (Strict: Returns unconfigured error if no live credentials)
app.post('/api/einvoices/generate', (req, res) => {
  const isLiveConfigured = Boolean(process.env.EINV_CLIENT_ID && process.env.EINV_CLIENT_SECRET && process.env.EINV_USERNAME);
  if (!isLiveConfigured) {
    return res.status(400).json({
      success: false,
      status: 'UNCONFIGURED',
      error: 'Government E-Invoice integration is not configured.',
      message: 'Official IRP / GSP API credentials must be configured in Settings to generate official government IRN. No fake IRNs are generated.',
      officialResponse: null
    });
  }
  res.status(501).json({ error: 'Provider connected but live credentials pending activation.' });
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
