const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

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
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        results.push({ interface: name, ip: net.address });
      }
    }
  }
  return results;
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API Info (Network IPs, Port, Host info)
app.get('/api/info', (req, res) => {
  const ips = getNetworkIps();
  res.json({
    port: PORT,
    localUrl: `http://localhost:${PORT}`,
    networkUrls: ips.map(i => ({ interface: i.interface, ip: i.ip, url: `http://${i.ip}:${PORT}` })),
    hasDb: fs.existsSync(DB_FILE)
  });
});

// API Get Database
app.get('/api/db', (req, res) => {
  if (!fs.existsSync(DB_FILE)) {
    return res.json({ initialized: false, message: 'No server database yet' });
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const data = JSON.parse(raw);
    res.json({ initialized: true, data });
  } catch (err) {
    console.error('Error reading database file:', err);
    res.status(500).json({ error: 'Failed to read database', details: err.message });
  }
});

// API Save Database
app.post('/api/db', (req, res) => {
  try {
    const incomingData = req.body;
    if (!incomingData || typeof incomingData !== 'object') {
      return res.status(400).json({ error: 'Invalid database payload' });
    }

    // Atomic write to prevent corruption
    const tempFile = DB_FILE + '.tmp';
    fs.writeFileSync(tempFile, JSON.stringify(incomingData, null, 2), 'utf8');
    fs.renameSync(tempFile, DB_FILE);

    res.json({ success: true, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('Error writing database file:', err);
    res.status(500).json({ error: 'Failed to save database', details: err.message });
  }
});

// API Backup Database
app.post('/api/backup', (req, res) => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return res.status(404).json({ error: 'Database file does not exist yet' });
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(BACKUP_DIR, `db_backup_${timestamp}.json`);
    fs.copyFileSync(DB_FILE, backupPath);
    res.json({ success: true, backupFile: path.basename(backupPath) });
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
app.listen(PORT, '0.0.0.0', () => {
  const ips = getNetworkIps();
  console.log('\n========================================================');
  console.log('  ADHIRA PYROTECH BILLING & QUOTATION SYSTEM');
  console.log('========================================================');
  console.log(`  Local Access:      http://localhost:${PORT}`);
  ips.forEach(i => {
    console.log(`  Network Access:    http://${i.ip}:${PORT}  (${i.interface})`);
  });
  console.log('========================================================\n');
});
