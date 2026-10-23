/**
 * ATHIRA CRACKERS / ADHIRA PYROTECH
 * Automated Supabase Data Seeder / Synchronizer
 *
 * Reads 100% of data from database.json (22 Categories, 154 Products, Settings, Banners)
 * and uploads it directly to your Supabase PostgreSQL Database via REST API.
 *
 * Usage:
 *   node seed-supabase.js
 *   or:
 *   SUPABASE_URL="https://your-id.supabase.co" SUPABASE_KEY="your-anon-or-service-key" node seed-supabase.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const urlModule = require('url');

// 1. Resolve Credentials
let SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
let SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

// Load from .env or .env.local if not in process.env
const envFiles = ['.env', '.env.local'];
for (const f of envFiles) {
  const p = path.join(__dirname, f);
  if (fs.existsSync(p)) {
    const lines = fs.readFileSync(p, 'utf8').split('\n');
    for (const l of lines) {
      const trimmed = l.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx !== -1) {
          const k = trimmed.substring(0, idx).trim();
          const v = trimmed.substring(idx + 1).trim().replace(/^['"]|['"]$/g, '');
          if (!SUPABASE_URL && (k === 'SUPABASE_URL' || k === 'NEXT_PUBLIC_SUPABASE_URL')) SUPABASE_URL = v;
          if (!SUPABASE_KEY && (k === 'SUPABASE_SERVICE_ROLE_KEY' || k === 'SUPABASE_KEY' || k === 'SUPABASE_ANON_KEY' || k === 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY')) SUPABASE_KEY = v;
        }
      }
    }
  }
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('\n❌ ERROR: Supabase credentials missing!');
  console.log('Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file or environment variables.');
  console.log('Example:');
  console.log('  SUPABASE_URL=https://your-project-id.supabase.co');
  console.log('  SUPABASE_ANON_KEY=eyJhbGciOi...\n');
  process.exit(1);
}

SUPABASE_URL = SUPABASE_URL.replace(/\/+$/, '');
console.log('================================================================');
console.log(' ATHIRA CRACKERS - SUPABASE DATABASE SEEDER');
console.log('================================================================');
console.log(' Target Project :', SUPABASE_URL);

// Load Database JSON
const dbPath = path.join(__dirname, 'database.json');
if (!fs.existsSync(dbPath)) {
  console.error('❌ database.json not found at:', dbPath);
  process.exit(1);
}
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Helper: Supabase REST request
function supabaseRequest(table, method, data, onConflict = '') {
  return new Promise((resolve, reject) => {
    let endpoint = `/rest/v1/${table}`;
    if (onConflict) {
      endpoint += `?on_conflict=${encodeURIComponent(onConflict)}`;
    }
    const parsedUrl = urlModule.parse(SUPABASE_URL + endpoint);
    const postBody = data ? JSON.stringify(data) : '';

    const reqHeaders = {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=representation',
      'Content-Length': Buffer.byteLength(postBody)
    };

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.path,
      method: method,
      headers: reqHeaders
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(body ? JSON.parse(body) : {});
          } catch(e) {
            resolve({});
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode} on /rest/v1/${table}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (postBody) req.write(postBody);
    req.end();
  });
}

async function runSeed() {
  try {
    // 1. Seed Settings
    if (db.settings) {
      console.log('\n⏳ Uploading Store Settings...');
      const settingsPayload = Object.entries(db.settings).map(([k, v]) => ({
        setting_key: k,
        setting_value: typeof v === 'object' ? JSON.stringify(v) : String(v)
      }));
      await supabaseRequest('settings', 'POST', settingsPayload, 'setting_key');
      console.log(`✅ Settings uploaded (${settingsPayload.length} keys).`);
    }

    // 2. Seed Categories
    if (Array.isArray(db.categories) && db.categories.length > 0) {
      console.log(`\n⏳ Uploading ${db.categories.length} Categories...`);
      const catsPayload = db.categories.map(c => ({
        id: Number(c.id),
        name: c.name,
        position: Number(c.position || c.sort_order || c.id)
      }));
      await supabaseRequest('categories', 'POST', catsPayload, 'id');
      console.log(`✅ ${catsPayload.length} Categories uploaded.`);
    }

    // 3. Seed Products in batches of 30
    if (Array.isArray(db.products) && db.products.length > 0) {
      console.log(`\n⏳ Uploading ${db.products.length} Products...`);
      const prodsPayload = db.products.map(p => ({
        id: Number(p.id),
        cat_id: Number(p.cat_id),
        name: p.name,
        description: p.desc || p.description || '',
        orig_price: parseFloat(p.orig_price) || 0,
        sale_price: parseFloat(p.sale_price) || 0,
        img: p.img || '',
        video: p.video || '',
        position: Number(p.position || p.id),
        out_of_stock: !!p.out_of_stock
      }));

      const batchSize = 30;
      for (let i = 0; i < prodsPayload.length; i += batchSize) {
        const batch = prodsPayload.slice(i, i + batchSize);
        await supabaseRequest('products', 'POST', batch, 'id');
        console.log(`   Uploaded products ${i + 1} to ${Math.min(i + batchSize, prodsPayload.length)} of ${prodsPayload.length}`);
      }
      console.log(`✅ All ${prodsPayload.length} Products uploaded.`);
    }

    // 4. Seed Banners
    if (Array.isArray(db.banners) && db.banners.length > 0) {
      console.log(`\n⏳ Uploading ${db.banners.length} Banners...`);
      const bannersPayload = db.banners.map(b => ({
        id: Number(b.id),
        img: b.img,
        title: b.title || '',
        subtitle: b.subtitle || '',
        link: b.link || '',
        sort_order: Number(b.sort_order || b.id)
      }));
      await supabaseRequest('banners', 'POST', bannersPayload, 'id');
      console.log(`✅ ${bannersPayload.length} Banners uploaded.`);
    }

    // 5. Seed Combos if any
    if (Array.isArray(db.combos) && db.combos.length > 0) {
      console.log(`\n⏳ Uploading ${db.combos.length} Combos...`);
      const combosPayload = db.combos.map(c => ({
        id: Number(c.id),
        name: c.name,
        items: c.items || '',
        rate: parseFloat(c.rate) || 0,
        orig_price: parseFloat(c.orig_price) || 0,
        sale_price: parseFloat(c.sale_price) || 0,
        img: c.img || '',
        video: c.video || '',
        position: Number(c.position || c.id)
      }));
      await supabaseRequest('combos', 'POST', combosPayload, 'id');
      console.log(`✅ ${combosPayload.length} Combos uploaded.`);
    }

    // 6. Seed Giftboxes if any
    if (Array.isArray(db.giftboxes) && db.giftboxes.length > 0) {
      console.log(`\n⏳ Uploading ${db.giftboxes.length} Giftboxes...`);
      const giftboxesPayload = db.giftboxes.map(g => ({
        id: Number(g.id),
        name: g.name,
        items: g.items || '',
        rate: parseFloat(g.rate) || 0,
        orig_price: parseFloat(g.orig_price) || 0,
        sale_price: parseFloat(g.sale_price) || 0,
        img: g.img || '',
        video: g.video || '',
        position: Number(g.position || g.id)
      }));
      await supabaseRequest('giftboxes', 'POST', giftboxesPayload, 'id');
      console.log(`✅ ${giftboxesPayload.length} Giftboxes uploaded.`);
    }

    console.log('\n================================================================');
    console.log('🎉 SUCCESS! Supabase Database fully seeded with real store data!');
    console.log('================================================================\n');
  } catch (err) {
    console.error('\n❌ Seeding error:', err.message);
    console.log('\nTip: If tables do not exist yet in Supabase, make sure you ran `supabase_schema.sql` first in your Supabase SQL Editor!');
  }
}

runSeed();
