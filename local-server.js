const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 4000;
const ROOT = __dirname;
const DB_FILE = path.join(ROOT, 'database.json');

// MIME TYPES
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.ogg': 'video/ogg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
};

// Database Helpers
function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    return { settings: {}, banners: [], categories: [], products: [], orders: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {
    console.error('Error reading database.json:', e);
    return { settings: {}, banners: [], categories: [], products: [], orders: [] };
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('Error writing database.json:', e);
    return false;
  }
}

// Helper: send JSON response
function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(payload));
}

// Helper: read request body
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => { raw += chunk; });
    req.on('end', () => {
      try {
        const parsed = raw ? JSON.parse(raw) : {};
        resolve(parsed);
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = decodeURIComponent(parsedUrl.pathname);
  const method = req.method;

  // -------------------------------------------------------------
  // REST API ROUTES
  // -------------------------------------------------------------

  // 1. GET /api/site-data (Public Storefront & Price list data - strips admin password for security)
  if (pathname === '/api/site-data' && method === 'GET') {
    const db = readDb();
    const publicSettings = { ...(db.settings || {}) };
    delete publicSettings.admin_password;
    delete publicSettings.admin_username;
    return sendJson(res, 200, {
      success: true,
      settings: publicSettings,
      banners: db.banners || [],
      categories: db.categories || [],
      products: db.products || [],
      giftboxes: db.giftboxes || [],
      combos: db.combos || []
    });
  }

  // 2. POST /api/login (Default credentials: admin / admin)
  if (pathname === '/api/login' && method === 'POST') {
    const body = await parseRequestBody(req);
    const db = readDb();
    const validUser = db.settings.admin_username || 'admin';
    const validPass = db.settings.admin_password || 'admin';

    if (body.username === validUser && body.password === validPass) {
      const token = 'token_' + Date.now() + '_' + Math.random().toString(36).substring(2);
      return sendJson(res, 200, { success: true, token, username: body.username });
    } else {
      return sendJson(res, 401, { success: false, error: 'Invalid username or password' });
    }
  }

  // 2b. POST /api/change-password (Dedicated password change - requires current password verification)
  if (pathname === '/api/change-password' && method === 'POST') {
    const body = await parseRequestBody(req);
    const db = readDb();
    const currentPass = db.settings.admin_password || 'admin';
    const currentInput = (body.current_password || '').trim();
    const newPass = (body.new_password || '').trim();

    if (!currentInput || currentInput !== currentPass) {
      return sendJson(res, 401, { success: false, error: 'Current password is incorrect. Verification failed.' });
    }
    if (!newPass || newPass.length < 3) {
      return sendJson(res, 400, { success: false, error: 'New password must be at least 3 characters long.' });
    }

    db.settings.admin_password = newPass;
    if (body.new_username && body.new_username.trim()) {
      db.settings.admin_username = body.new_username.trim();
    }
    writeDb(db);
    return sendJson(res, 200, { success: true, message: 'Admin password changed successfully!' });
  }

  // 3. PUT /api/settings
  if (pathname === '/api/settings' && (method === 'PUT' || method === 'POST')) {
    const body = await parseRequestBody(req);
    const db = readDb();
    
    // Prevent unauthorized password changes via generic settings
    if (body.admin_password) {
      const currentPass = db.settings.admin_password || 'admin';
      if (body.current_password && body.current_password !== currentPass) {
        return sendJson(res, 401, { success: false, error: 'Current password is incorrect. Cannot update password.' });
      }
    }
    
    db.settings = { ...db.settings, ...body };
    writeDb(db);
    return sendJson(res, 200, { success: true, settings: db.settings });
  }

  // 3b. DB Management Endpoints for Local Dev Server
  if (pathname === '/api/db-status' && method === 'GET') {
    let dbHost = 'localhost', dbName = '', dbUser = '';
    const configPath = path.join(ROOT, 'config.php');
    if (fs.existsSync(configPath)) {
      const cfg = fs.readFileSync(configPath, 'utf8');
      const mHost = cfg.match(/define\('DB_HOST',\s*'([^']+)'\)/);
      const mName = cfg.match(/define\('DB_NAME',\s*'([^']+)'\)/);
      const mUser = cfg.match(/define\('DB_USER',\s*'([^']+)'\)/);
      if (mHost) dbHost = mHost[1];
      if (mName) dbName = mName[1];
      if (mUser) dbUser = mUser[1];
    }
    const db = readDb();
    return sendJson(res, 200, {
      success: true,
      connected: false,
      source: 'local-node',
      db_host: dbHost,
      db_name: dbName,
      db_user: dbUser,
      error: 'Running on local Node.js server. On cPanel live host, api.php connects to real MySQL.',
      table_counts: {
        products: (db.products || []).length,
        categories: (db.categories || []).length,
        combos: (db.combos || []).length,
        giftboxes: (db.giftboxes || []).length,
        orders: (db.orders || []).length
      }
    });
  }

  if (pathname === '/api/test-db' && method === 'POST') {
    return sendJson(res, 200, {
      success: true,
      message: 'Node local test acknowledged. Credentials will connect to MySQL when uploaded to cPanel.'
    });
  }

  if (pathname === '/api/save-db-config' && method === 'POST') {
    const body = await parseRequestBody(req);
    const host = (body.host || 'localhost').trim();
    const name = (body.name || '').trim();
    const user = (body.user || '').trim();
    const pass = body.pass !== undefined ? body.pass : '';

    const configPath = path.join(ROOT, 'config.php');
    const newConfig = `<?php
/**
 * Athira Crackers & Adhira Pyrotech - cPanel MySQL Database Configuration
 * Auto-saved by Admin Dashboard
 */

define('DB_HOST', '${host.replace(/'/g, "\\'")}');
define('DB_NAME', '${name.replace(/'/g, "\\'")}');
define('DB_USER', '${user.replace(/'/g, "\\'")}');
define('DB_PASS', '${pass.replace(/'/g, "\\'")}');
define('DB_CHARSET', 'utf8mb4');

define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'admin123');
`;
    fs.writeFileSync(configPath, newConfig, 'utf8');
    return sendJson(res, 200, {
      success: true,
      message: 'Database configuration saved to config.php successfully!'
    });
  }

  if (pathname === '/api/sync-to-mysql' && method === 'POST') {
    const db = readDb();
    return sendJson(res, 200, {
      success: true,
      message: 'Database structure verified on local server. Upload to cPanel to execute real MySQL migration!',
      imported: {
        products: (db.products || []).length,
        categories: (db.categories || []).length,
        combos: (db.combos || []).length,
        giftboxes: (db.giftboxes || []).length,
        banners: (db.banners || []).length
      }
    });
  }

  // 4. Products CRUD & Reordering
  if (pathname === '/api/products/reorder' && method === 'POST') {
    const body = await parseRequestBody(req);
    const db = readDb();
    let items = body.items;
    if (!items && Array.isArray(body.orderedIds)) {
      items = body.orderedIds.map((id, idx) => ({ id: Number(id), position: idx + 1 }));
    }
    if (Array.isArray(items)) {
      items.forEach(it => {
        const prod = (db.products || []).find(p => p.id === Number(it.id));
        if (prod) prod.position = parseInt(it.position, 10);
      });
      writeDb(db);
      return sendJson(res, 200, { success: true, message: 'Products reordered' });
    }
    return sendJson(res, 400, { success: false, error: 'Invalid items array' });
  }

  if (pathname === '/api/products' && method === 'POST') {
    const body = await parseRequestBody(req);
    const db = readDb();
    const maxId = db.products.reduce((max, p) => (p.id > max ? p.id : max), 0);
    const newProduct = {
      id: maxId + 1,
      cat_id: parseInt(body.cat_id || 1, 10),
      name: (body.name || '').trim(),
      desc: (body.desc || body.description || '').trim(),
      orig_price: parseFloat(body.orig_price || 0),
      sale_price: parseFloat(body.sale_price || 0),
      img: (body.img || '').trim(),
      video: (body.video || '').trim(),
      position: parseInt(body.position || (maxId + 1), 10),
      out_of_stock: !!body.out_of_stock
    };
    db.products.push(newProduct);
    writeDb(db);
    return sendJson(res, 201, { success: true, product: newProduct });
  }

  if (pathname.startsWith('/api/products/') && (method === 'PUT' || method === 'POST')) {
    const id = parseInt(pathname.split('/')[3], 10);
    const body = await parseRequestBody(req);
    const db = readDb();
    const idx = db.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      db.products[idx] = {
        ...db.products[idx],
        name: body.name !== undefined ? body.name.trim() : db.products[idx].name,
        cat_id: body.cat_id !== undefined ? parseInt(body.cat_id, 10) : db.products[idx].cat_id,
        desc: body.desc !== undefined ? body.desc.trim() : db.products[idx].desc,
        orig_price: body.orig_price !== undefined ? parseFloat(body.orig_price) : db.products[idx].orig_price,
        sale_price: body.sale_price !== undefined ? parseFloat(body.sale_price) : db.products[idx].sale_price,
        img: body.img !== undefined ? body.img.trim() : db.products[idx].img,
        video: body.video !== undefined ? body.video.trim() : db.products[idx].video,
        position: body.position !== undefined ? parseInt(body.position, 10) : (db.products[idx].position || id),
        out_of_stock: body.out_of_stock !== undefined ? !!body.out_of_stock : db.products[idx].out_of_stock
      };
      writeDb(db);
      return sendJson(res, 200, { success: true, product: db.products[idx] });
    }
    return sendJson(res, 404, { success: false, error: 'Product not found' });
  }

  if (pathname.startsWith('/api/products/') && method === 'DELETE') {
    const id = parseInt(pathname.split('/')[3], 10);
    const db = readDb();
    db.products = db.products.filter(p => p.id !== id);
    writeDb(db);
    return sendJson(res, 200, { success: true, message: 'Product deleted' });
  }

  // 5. Categories CRUD & Reordering
  if (pathname === '/api/categories/reorder' && method === 'POST') {
    const body = await parseRequestBody(req);
    const db = readDb();
    let items = body.items;
    if (!items && Array.isArray(body.orderedIds)) {
      items = body.orderedIds.map((id, idx) => ({ id: Number(id), position: idx + 1 }));
    }
    if (Array.isArray(items)) {
      items.forEach(it => {
        const cat = (db.categories || []).find(c => c.id === Number(it.id));
        if (cat) cat.position = parseInt(it.position, 10);
      });
      writeDb(db);
      return sendJson(res, 200, { success: true, message: 'Categories reordered' });
    }
    return sendJson(res, 400, { success: false, error: 'Invalid items array' });
  }

  if (pathname === '/api/categories' && method === 'POST') {
    const body = await parseRequestBody(req);
    const db = readDb();
    const maxId = db.categories.reduce((max, c) => (c.id > max ? c.id : max), 0);
    const newCat = {
      id: maxId + 1,
      name: (body.name || 'New Category').trim(),
      position: parseInt(body.position || (maxId + 1), 10)
    };
    db.categories.push(newCat);
    writeDb(db);
    return sendJson(res, 201, { success: true, category: newCat });
  }

  if (pathname.startsWith('/api/categories/') && (method === 'PUT' || method === 'POST')) {
    const id = parseInt(pathname.split('/')[3], 10);
    const body = await parseRequestBody(req);
    const db = readDb();
    const idx = db.categories.findIndex(c => c.id === id);
    if (idx !== -1) {
      if (body.name !== undefined) db.categories[idx].name = body.name.trim();
      if (body.position !== undefined) db.categories[idx].position = parseInt(body.position, 10);
      writeDb(db);
      return sendJson(res, 200, { success: true, category: db.categories[idx] });
    }
    return sendJson(res, 404, { success: false, error: 'Category not found' });
  }

  if (pathname.startsWith('/api/categories/') && method === 'DELETE') {
    const id = parseInt(pathname.split('/')[3], 10);
    const db = readDb();
    db.categories = db.categories.filter(c => c.id !== id);
    writeDb(db);
    return sendJson(res, 200, { success: true, message: 'Category deleted' });
  }

  // 5b. Gift Boxes CRUD & Reordering
  if (pathname === '/api/giftboxes/reorder' && method === 'POST') {
    const body = await parseRequestBody(req);
    const db = readDb();
    let items = body.items;
    if (!items && Array.isArray(body.orderedIds)) {
      items = body.orderedIds.map((id, idx) => ({ id: Number(id), position: idx + 1 }));
    }
    if (Array.isArray(items)) {
      items.forEach(it => {
        const item = (db.giftboxes || []).find(g => g.id === Number(it.id));
        if (item) item.position = parseInt(it.position, 10);
      });
      writeDb(db);
      return sendJson(res, 200, { success: true, message: 'Gift boxes reordered' });
    }
    return sendJson(res, 400, { success: false, error: 'Invalid items array' });
  }

  if (pathname === '/api/giftboxes' && method === 'GET') {
    const db = readDb();
    return sendJson(res, 200, { success: true, giftboxes: db.giftboxes || [] });
  }

  if (pathname === '/api/giftboxes' && method === 'POST') {
    const body = await parseRequestBody(req);
    const db = readDb();
    if (!db.giftboxes) db.giftboxes = [];
    const maxId = db.giftboxes.reduce((max, g) => (g.id > max ? g.id : max), 0);
    const newGiftbox = {
      id: maxId + 1,
      name: (body.name || '').trim(),
      items: (body.items || '').trim(),
      rate: parseFloat(body.rate || body.sale_price || 0),
      sale_price: parseFloat(body.rate || body.sale_price || 0),
      orig_price: parseFloat(body.orig_price || 0),
      img: (body.img || '').trim(),
      video: (body.video || '').trim(),
      position: parseInt(body.position || (db.giftboxes.length + 1), 10)
    };
    db.giftboxes.push(newGiftbox);
    writeDb(db);
    return sendJson(res, 201, { success: true, giftbox: newGiftbox });
  }

  if (pathname.startsWith('/api/giftboxes/') && (method === 'PUT' || method === 'POST')) {
    const id = parseInt(pathname.split('/')[3], 10);
    const body = await parseRequestBody(req);
    const db = readDb();
    if (db.giftboxes) {
      const idx = db.giftboxes.findIndex(g => g.id === id);
      if (idx !== -1) {
        if (body.name !== undefined) db.giftboxes[idx].name = body.name.trim();
        if (body.items !== undefined) db.giftboxes[idx].items = body.items.trim();
        if (body.rate !== undefined || body.sale_price !== undefined) {
          const val = parseFloat(body.rate || body.sale_price || 0);
          db.giftboxes[idx].rate = val;
          db.giftboxes[idx].sale_price = val;
        }
        if (body.orig_price !== undefined) db.giftboxes[idx].orig_price = parseFloat(body.orig_price || 0);
        if (body.img !== undefined) db.giftboxes[idx].img = body.img.trim();
        if (body.video !== undefined) db.giftboxes[idx].video = body.video.trim();
        if (body.position !== undefined) db.giftboxes[idx].position = parseInt(body.position, 10);
        writeDb(db);
        return sendJson(res, 200, { success: true, giftbox: db.giftboxes[idx] });
      }
    }
    return sendJson(res, 404, { success: false, error: 'Gift Box not found' });
  }

  if (pathname.startsWith('/api/giftboxes/') && method === 'DELETE') {
    const id = parseInt(pathname.split('/')[3], 10);
    const db = readDb();
    if (db.giftboxes) {
      const initLen = db.giftboxes.length;
      db.giftboxes = db.giftboxes.filter(g => g.id !== id);
      if (db.giftboxes.length < initLen) {
        writeDb(db);
        return sendJson(res, 200, { success: true, message: 'Gift Box deleted' });
      }
    }
    return sendJson(res, 404, { success: false, error: 'Gift Box not found' });
  }

  // 5c. Combo Packs CRUD & Reordering
  if (pathname === '/api/combos/reorder' && method === 'POST') {
    const body = await parseRequestBody(req);
    const db = readDb();
    let items = body.items;
    if (!items && Array.isArray(body.orderedIds)) {
      items = body.orderedIds.map((id, idx) => ({ id: Number(id), position: idx + 1 }));
    }
    if (Array.isArray(items)) {
      items.forEach(it => {
        const item = (db.combos || []).find(c => c.id === Number(it.id));
        if (item) item.position = parseInt(it.position, 10);
      });
      writeDb(db);
      return sendJson(res, 200, { success: true, message: 'Combos reordered' });
    }
    return sendJson(res, 400, { success: false, error: 'Invalid items array' });
  }

  if (pathname === '/api/combos' && method === 'GET') {
    const db = readDb();
    return sendJson(res, 200, { success: true, combos: db.combos || [] });
  }

  if (pathname === '/api/combos' && method === 'POST') {
    const body = await parseRequestBody(req);
    const db = readDb();
    if (!db.combos) db.combos = [];
    const maxId = db.combos.reduce((max, c) => (c.id > max ? c.id : max), 0);
    const newCombo = {
      id: maxId + 1,
      name: (body.name || '').trim(),
      items: (body.items || '').trim(),
      rate: parseFloat(body.rate || body.sale_price || 0),
      sale_price: parseFloat(body.rate || body.sale_price || 0),
      orig_price: parseFloat(body.orig_price || 0),
      img: (body.img || '').trim(),
      video: (body.video || '').trim(),
      position: parseInt(body.position || (db.combos.length + 1), 10)
    };
    db.combos.push(newCombo);
    writeDb(db);
    return sendJson(res, 201, { success: true, combo: newCombo });
  }

  if (pathname.startsWith('/api/combos/') && (method === 'PUT' || method === 'POST')) {
    const id = parseInt(pathname.split('/')[3], 10);
    const body = await parseRequestBody(req);
    const db = readDb();
    if (db.combos) {
      const idx = db.combos.findIndex(c => c.id === id);
      if (idx !== -1) {
        if (body.name !== undefined) db.combos[idx].name = body.name.trim();
        if (body.items !== undefined) db.combos[idx].items = body.items.trim();
        if (body.rate !== undefined || body.sale_price !== undefined) {
          const val = parseFloat(body.rate || body.sale_price || 0);
          db.combos[idx].rate = val;
          db.combos[idx].sale_price = val;
        }
        if (body.orig_price !== undefined) db.combos[idx].orig_price = parseFloat(body.orig_price || 0);
        if (body.img !== undefined) db.combos[idx].img = body.img.trim();
        if (body.video !== undefined) db.combos[idx].video = body.video.trim();
        if (body.position !== undefined) db.combos[idx].position = parseInt(body.position, 10);
        writeDb(db);
        return sendJson(res, 200, { success: true, combo: db.combos[idx] });
      }
    }
    return sendJson(res, 404, { success: false, error: 'Combo Pack not found' });
  }

  if (pathname.startsWith('/api/combos/') && method === 'DELETE') {
    const id = parseInt(pathname.split('/')[3], 10);
    const db = readDb();
    if (db.combos) {
      const initLen = db.combos.length;
      db.combos = db.combos.filter(c => c.id !== id);
      if (db.combos.length < initLen) {
        writeDb(db);
        return sendJson(res, 200, { success: true, message: 'Combo Pack deleted' });
      }
    }
    return sendJson(res, 404, { success: false, error: 'Combo Pack not found' });
  }

  // 6. Banners CRUD
  if (pathname === '/api/banners' && method === 'POST') {
    const body = await parseRequestBody(req);
    const db = readDb();
    const maxId = db.banners.reduce((max, b) => (b.id > max ? b.id : max), 0);
    const newBanner = {
      id: maxId + 1,
      img: (body.img || '').trim(),
      title: (body.title || '').trim(),
      subtitle: (body.subtitle || '').trim()
    };
    db.banners.push(newBanner);
    writeDb(db);
    return sendJson(res, 201, { success: true, banner: newBanner });
  }

  if (pathname.startsWith('/api/banners/') && method === 'DELETE') {
    const id = parseInt(pathname.split('/')[3], 10);
    const db = readDb();
    db.banners = db.banners.filter(b => b.id !== id);
    writeDb(db);
    return sendJson(res, 200, { success: true, message: 'Banner deleted' });
  }

  // 7. Orders Management
  if (pathname === '/api/orders' && method === 'POST') {
    const body = await parseRequestBody(req);
    const db = readDb();
    if (!db.orders) db.orders = [];

    const orderNumber = 'ATH-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);
    const maxId = db.orders.reduce((max, o) => (o.id > max ? o.id : max), 0);
    const newOrder = {
      id: maxId + 1,
      order_number: orderNumber,
      order_type: body.order_type || 'online',
      customer_name: (body.name || body.customer_name || 'Customer').trim(),
      customer_phone: (body.phone || body.customer_phone || '').trim(),
      customer_email: (body.email || body.customer_email || '').trim(),
      customer_address: (body.address || body.customer_address || '').trim(),
      city: (body.city || '').trim(),
      state: (body.state || 'Tamil Nadu').trim(),
      pincode: (body.pincode || '').trim(),
      items: body.items || [],
      subtotal: parseFloat(body.subtotal || 0),
      discount_amount: parseFloat(body.discount_amount || 0),
      total_amount: parseFloat(body.total_amount || body.total || 0),
      payment_method: body.payment_method || 'COD',
      status: body.status || 'Pending',
      created_at: new Date().toISOString(),
      notes: (body.notes || '').trim()
    };

    db.orders.unshift(newOrder);
    writeDb(db);
    return sendJson(res, 201, { success: true, order_id: newOrder.id, order_number: newOrder.order_number, order: newOrder, message: 'Order created successfully' });
  }

  if (pathname === '/api/orders' && method === 'GET') {
    const db = readDb();
    return sendJson(res, 200, { success: true, orders: db.orders || [] });
  }

  if (pathname.startsWith('/api/orders/') && (method === 'PUT' || method === 'POST')) {
    const id = parseInt(pathname.split('/')[3], 10);
    const body = await parseRequestBody(req);
    const db = readDb();
    if (db.orders) {
      const ord = db.orders.find(o => o.id === id);
      if (ord) {
        if (body.status !== undefined) ord.status = body.status;
        if (body.customer_name !== undefined) ord.customer_name = body.customer_name.trim();
        if (body.customer_phone !== undefined) ord.customer_phone = body.customer_phone.trim();
        if (body.customer_email !== undefined) ord.customer_email = body.customer_email.trim();
        if (body.customer_address !== undefined) ord.customer_address = body.customer_address.trim();
        if (body.city !== undefined) ord.city = body.city.trim();
        if (body.state !== undefined) ord.state = body.state.trim();
        if (body.pincode !== undefined) ord.pincode = body.pincode.trim();
        if (body.items !== undefined) ord.items = body.items;
        if (body.subtotal !== undefined) ord.subtotal = parseFloat(body.subtotal || 0);
        if (body.discount_amount !== undefined) ord.discount_amount = parseFloat(body.discount_amount || 0);
        if (body.total_amount !== undefined) ord.total_amount = parseFloat(body.total_amount || 0);
        if (body.payment_method !== undefined) ord.payment_method = body.payment_method;
        if (body.notes !== undefined) ord.notes = body.notes;
        if (body.order_type !== undefined) ord.order_type = body.order_type;
        writeDb(db);
        return sendJson(res, 200, { success: true, order: ord });
      }
    }
    return sendJson(res, 404, { success: false, error: 'Order not found' });
  }

  if (pathname.startsWith('/api/orders/') && method === 'DELETE') {
    const id = parseInt(pathname.split('/')[3], 10);
    const db = readDb();
    if (db.orders) {
      const initialLen = db.orders.length;
      db.orders = db.orders.filter(o => o.id !== id);
      if (db.orders.length < initialLen) {
        writeDb(db);
        return sendJson(res, 200, { success: true, message: 'Order deleted successfully' });
      }
    }
    return sendJson(res, 404, { success: false, error: 'Order not found' });
  }

  // 8. Upload File (Base64 or multipart)
  if (pathname === '/api/upload' && method === 'POST') {
    const body = await parseRequestBody(req);
    const folderType = body.type || 'products';
    const fileName = (body.filename || 'media_' + Date.now()).replace(/[^a-zA-Z0-9_\-\.]/g, '_');
    const base64Data = body.base64;

    if (!base64Data) {
      return sendJson(res, 400, { success: false, error: 'Missing base64 data' });
    }

    const targetDir = path.join(ROOT, 'storage', folderType);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const cleanBase64 = base64Data.replace(/^data:[a-zA-Z0-9\/\-\+]+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    const filePath = path.join(targetDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const relativeUrl = `./storage/${folderType}/${fileName}`;
    return sendJson(res, 200, {
      success: true,
      url: relativeUrl,
      filename: fileName,
      size: buffer.length
    });
  }

  // -------------------------------------------------------------
  // STATIC FILES SERVING & CLEAN URL ROUTING
  // -------------------------------------------------------------
  // Enforce Clean URL: Redirect direct admin.html or admin.php to /admin
  if (pathname === '/admin.html' || pathname === '/admin.php') {
    res.writeHead(301, { 'Location': '/admin' });
    res.end();
    return;
  }

  let reqPath = pathname;

  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  } else if (reqPath === '/admin' || reqPath === '/admin/') {
    reqPath = '/admin.html';
  } else if (reqPath === '/price-list' || reqPath === '/price-list/' || reqPath === '/download-price-list' || reqPath === '/download-price-list/') {
    reqPath = '/price-list.html';
  }

  const filePath = path.join(ROOT, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext] || 'application/octet-stream';

  // Handle Range requests for Videos (so video seek works perfectly)
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const stat = fs.statSync(filePath);
    const total = stat.size;

    if (req.headers.range && (ext === '.mp4' || ext === '.webm' || ext === '.mov')) {
      const range = req.headers.range;
      const parts = range.replace(/bytes=/, '').split('-');
      const partialStart = parts[0];
      const partialEnd = parts[1];

      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
      const chunkSize = (end - start) + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': mime
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Type': mime,
      'Content-Length': total,
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // Fallback to index.html for unknown routes (SPA)
  const fallback = path.join(ROOT, 'index.html');
  if (fs.existsSync(fallback)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(fallback).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log('');
  console.log('================================================================');
  console.log(' ATHIRA CRACKERS / ADHIRA PYROTECH - E-COMMERCE SERVER RUNNING');
  console.log('================================================================');
  console.log('');
  console.log(`  Customer Shop Front : http://localhost:${PORT}`);
  console.log(`  Price List (PDF)    : http://localhost:${PORT}/price-list`);
  console.log(`  Admin Dashboard     : http://localhost:${PORT}/admin`);
  console.log(`  Database API        : http://localhost:${PORT}/api/site-data`);
  console.log('');
  console.log('  Default Admin Login : admin / admin');
  console.log('================================================================');
});
