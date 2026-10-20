const fs = require('fs');
const assert = require('assert');

console.log('--- Verifying E-Way Bill Integration & Sample Bill Output ---');

// 1. Check app.js contents
const appJs = fs.readFileSync('app.js', 'utf8');

const requiredTokens = [
  'renderEWayBillsPage',
  'attachEWayBillsListeners',
  'generateEWayBillHtml',
  'openEWayPreviewModal',
  'openCreateEWayBillModal',
  'downloadEWayPdf',
  'printEWayBill',
  'deleteEWayBill',
  'loadPonmuneeswariSample',
  'onEwbCustomerSelect',
  'onEwbInvoiceSelect',
  'suggestEwbNumber',
  'submitEWayBillForm',
  'data-nav="eway-bills"',
  "case 'eway-bills':",
  '542075380011',
  'PONMUNEESWARI FIREWORKS',
  'PNFW-POS-0011',
  'GOVERNMENT OF INDIA • GST E-WAY BILL SYSTEM'
];

for (const tok of requiredTokens) {
  assert(appJs.includes(tok), `Missing token in app.js: ${tok}`);
  console.log(`✓ Token verified: ${tok}`);
}

// 2. Check styles.css contents
const stylesCss = fs.readFileSync('styles.css', 'utf8');
const requiredCssTokens = [
  '.eway-page-container',
  '.eway-stats-grid',
  '.eway-bill-sheet',
  '.eway-govt-pill',
  '.eway-heading-title',
  '.eway-qr-wrapper',
  '.eway-bold-number',
  '.gstin-red',
  '.eway-section-card',
  '.eway-section-header',
  '.eway-table',
  '@media print'
];

for (const tok of requiredCssTokens) {
  assert(stylesCss.includes(tok), `Missing CSS token: ${tok}`);
  console.log(`✓ CSS verified: ${tok}`);
}

// 3. Check data/db.json
const dbJson = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
assert(Array.isArray(dbJson.ewayBills) && dbJson.ewayBills.length > 0, 'ewayBills exists in db.json');
const ponmuneeswari = dbJson.ewayBills.find(e => e.ewayBillNo === '542075380011');
assert(ponmuneeswari, 'Ponmuneeswari sample bill in db.json');
assert.strictEqual(ponmuneeswari.supplierName, 'PONMUNEESWARI FIREWORKS');
assert.strictEqual(ponmuneeswari.recipientName, 'ATHIRA TRADERS');
assert.strictEqual(ponmuneeswari.docNo, 'PNFW-POS-0011');
assert.strictEqual(ponmuneeswari.totalValue, 23600.00);
assert.strictEqual(ponmuneeswari.mode, 'Road');
assert.strictEqual(ponmuneeswari.vehicleNo, 'TN95P9824');

console.log('✓ db.json verified with Ponmuneeswari sample record!');
console.log('\n======================================================');
console.log('ALL E-WAY BILL INTEGRATION TESTS PASSED PERFECTLY!');
console.log('======================================================');
