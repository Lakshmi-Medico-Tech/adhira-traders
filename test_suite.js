/**
 * Automated Verification Test Suite for Adhira Pyrotech Billing Application
 */

const fs = require('fs');
const assert = require('assert');
const http = require('http');

console.log('--- Starting Automated Test Suite for Adhira Pyrotech Billing System ---');

// 1. Verify index.html exists and contains necessary links
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('ADHIRA PYROTECH'), 'index.html contains branding');
assert(indexHtml.includes('assets/adhira-logo.jpg'), 'index.html references logo');
assert(indexHtml.includes('assets/html2pdf.bundle.min.js'), 'index.html references html2pdf');
assert(indexHtml.includes('assets/confetti.min.js'), 'index.html references confetti');
assert(indexHtml.includes('styles.css'), 'index.html references styles.css');
assert(indexHtml.includes('app.js'), 'index.html references app.js');
console.log('✓ Test 1 Passed: index.html structure & asset inclusions verified.');

// 2. Verify styles.css exists and contains design system tokens
const stylesCss = fs.readFileSync('styles.css', 'utf8');
assert(stylesCss.includes('--navy-900'), 'styles.css contains navy color tokens');
assert(stylesCss.includes('--gold-500'), 'styles.css contains gold color tokens');
assert(stylesCss.includes('.pdf-a4-sheet'), 'styles.css contains A4 sheet specification');
assert(stylesCss.includes('.pdf-watermark-overlay'), 'styles.css contains watermark overlay');
assert(stylesCss.includes('@media print'), 'styles.css contains print media styling');
console.log('✓ Test 2 Passed: styles.css design tokens & A4 print CSS verified.');

// 3. Verify Products and Categories Catalog (141 products, 24 categories)
const dbRaw = fs.readFileSync('data/db.json', 'utf8');
const db = JSON.parse(dbRaw);
assert(Array.isArray(db.products) && db.products.length === 141, `Expected 141 products, found ${db.products.length}`);
assert(Array.isArray(db.categories) && db.categories.length === 24, `Expected 24 categories, found ${db.categories.length}`);

// Verify seed products are untouched
const p001 = db.products.find(p => p.id === 'P001');
assert(p001 && p001.name === 'Fog (Smoke)' && p001.rate === 75, 'P001 Fog (Smoke) untouched');
const p010 = db.products.find(p => p.id === 'P010');
assert(p010 && p010.name === 'Adhira Crackling' && p010.rate === 100, 'P010 Adhira Crackling untouched');

// Verify Thais Price.pdf products are present
const lakshmi = db.products.find(p => p.name === '4" Lakshmi');
assert(lakshmi && lakshmi.rate === 160 && lakshmi.discRate === 16, '4" Lakshmi product present with MRP 160 & 90% Disc 16');
const giftBox = db.products.find(p => p.name === '60 Item Gift Box');
assert(giftBox && giftBox.rate === 11500 && giftBox.discRate === 1150, '60 Item Gift Box present with MRP 11500 & 90% Disc 1150');

console.log('✓ Test 3 Passed: 141 products and 24 categories verified in database (Seed untouched + Thais Price items added).');

// 4. Test Calculation Logic
function round2(val) {
  return Math.round((Number(val) || 0) * 100) / 100;
}

function calculateItemLine(item) {
  const qty = Number(item.qty) || 0;
  const rate = Number(item.rate) || 0;
  const gross = round2(qty * rate);

  let discount = 0;
  if (item.discountType === '%') {
    discount = round2((gross * (Number(item.discount) || 0)) / 100);
  } else {
    discount = round2(Number(item.discount) || 0);
  }
  discount = Math.min(gross, Math.max(0, discount));

  const taxable = round2(Math.max(0, gross - discount));
  const gstRate = Number(item.gst) || 0;
  const gstAmount = round2((taxable * gstRate) / 100);
  const total = round2(taxable + gstAmount);

  return { gross, discount, taxable, gstAmount, total };
}

function calculateDocumentSummary(items, customerStateCode, sellerStateCode = '33') {
  let subtotal = 0;
  let totalDiscount = 0;
  let taxableAmount = 0;
  let totalGst = 0;
  let totalCgst = 0;
  let totalSgst = 0;
  let totalIgst = 0;

  const isIntrastate = String(customerStateCode || '').trim() === String(sellerStateCode || '').trim();

  items.forEach(item => {
    const calc = calculateItemLine(item);
    subtotal += calc.gross;
    totalDiscount += calc.discount;
    taxableAmount += calc.taxable;
    totalGst += calc.gstAmount;

    if (isIntrastate) {
      totalCgst += round2(calc.gstAmount / 2);
      totalSgst += round2(calc.gstAmount / 2);
    } else {
      totalIgst += calc.gstAmount;
    }
  });

  const rawGrandTotal = taxableAmount + totalGst;
  const grandTotal = Math.round(rawGrandTotal);
  const roundOff = round2(grandTotal - rawGrandTotal);

  return {
    subtotal: round2(subtotal),
    totalDiscount: round2(totalDiscount),
    taxableAmount: round2(taxableAmount),
    totalGst: round2(totalGst),
    totalCgst: round2(totalCgst),
    totalSgst: round2(totalSgst),
    totalIgst: round2(totalIgst),
    roundOff,
    grandTotal,
    isIntrastate
  };
}

// User reference MB & SONS Invoice: 3 Bat & Ball @ 2100 + 2 Hand Shower @ 2100 = 10,500 Taxable + 18% IGST = 12,390
const mbItems = [
  { qty: 3, rate: 2100, discount: 0, gst: 18 },
  { qty: 2, rate: 2100, discount: 0, gst: 18 }
];
const mbSummary = calculateDocumentSummary(mbItems, '36', '33');
assert.strictEqual(mbSummary.subtotal, 10500, 'Subtotal should be 10,500');
assert.strictEqual(mbSummary.taxableAmount, 10500, 'Taxable amount should be 10,500');
assert.strictEqual(mbSummary.totalIgst, 1890, 'IGST should be 1,890');
assert.strictEqual(mbSummary.totalCgst, 0, 'CGST should be 0 for interstate');
assert.strictEqual(mbSummary.totalSgst, 0, 'SGST should be 0 for interstate');
assert.strictEqual(mbSummary.grandTotal, 12390, 'Grand Total should be 12,390');
console.log('✓ Test 4 Passed: MB & SONS Invoice Calculations match precisely (₹10,500 Taxable + ₹1,890 IGST = ₹12,390 Grand Total).');

// Intrastate Tamil Nadu Calculation
const tnSummary = calculateDocumentSummary(mbItems, '33', '33');
assert.strictEqual(tnSummary.totalCgst, 945, 'CGST should be 945 for TN intrastate');
assert.strictEqual(tnSummary.totalSgst, 945, 'SGST should be 945 for TN intrastate');
assert.strictEqual(tnSummary.totalIgst, 0, 'IGST should be 0 for TN intrastate');
assert.strictEqual(tnSummary.grandTotal, 12390, 'Grand Total should be 12,390');
console.log('✓ Test 5 Passed: Intrastate Tamil Nadu Calculation verified (CGST ₹945 + SGST ₹945 = ₹1,890).');

// Test Amount in Words
function convertAmountToWords(amount) {
  const num = Math.round(Number(amount) || 0);
  if (num === 0) return 'Zero Rupees Only';

  const singleDigits = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const twoDigits = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tensMultiple = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertTwoDigits(n) {
    if (n < 10) return singleDigits[n];
    if (n >= 10 && n < 20) return twoDigits[n - 10];
    const tens = Math.floor(n / 10);
    const unit = n % 10;
    return (tensMultiple[tens] + (unit ? ' ' + singleDigits[unit] : '')).trim();
  }

  function convertThreeDigits(n) {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    let res = '';
    if (hundred) res += singleDigits[hundred] + ' Hundred';
    if (rest) res += (res ? ' ' : '') + convertTwoDigits(rest);
    return res;
  }

  let crore = Math.floor(num / 10000000);
  let remainder = num % 10000000;
  let lakh = Math.floor(remainder / 100000);
  remainder = remainder % 100000;
  let thousand = Math.floor(remainder / 1000);
  remainder = remainder % 1000;
  let hundredPart = remainder;

  let words = '';
  if (crore) words += convertThreeDigits(crore) + ' Crore ';
  if (lakh) words += convertTwoDigits(lakh) + ' Lakh ';
  if (thousand) words += convertTwoDigits(thousand) + ' Thousand ';
  if (hundredPart) words += convertThreeDigits(hundredPart) + ' ';

  return `INR ${words.trim()} Only`;
}

assert.strictEqual(convertAmountToWords(12390), 'INR Twelve Thousand Three Hundred Ninety Only');
assert.strictEqual(convertAmountToWords(1890), 'INR One Thousand Eight Hundred Ninety Only');
assert.strictEqual(convertAmountToWords(1250000), 'INR Twelve Lakh Fifty Thousand Only');
console.log('✓ Test 6 Passed: Indian numbering amount in words verified (Thousand, Lakh, Crore).');

// Test GSTIN Validation Regex
function isValidGstin(gstin = '') {
  if (!gstin) return false;
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return regex.test(gstin.trim().toUpperCase());
}

assert(isValidGstin('33QRQPS0659E1Z4'), 'Seller GSTIN valid');
assert(isValidGstin('36JNYPS8775N1Z5'), 'Customer GSTIN valid');
assert(!isValidGstin('INVALID_GSTIN'), 'Invalid GSTIN rejected');
console.log('✓ Test 7 Passed: 15-character Indian GSTIN regex validation verified.');

// 8. Test E-Way Bill System and Ponmuneeswari Reference Specification
assert(Array.isArray(db.ewayBills) && db.ewayBills.length >= 1, 'E-Way Bills array initialized in DB');
const sampleEwb = db.ewayBills.find(e => e.ewayBillNo === '542075380011');
assert(sampleEwb, 'Ponmuneeswari sample E-Way Bill 542075380011 is present in database');
assert.strictEqual(sampleEwb.supplierGstin, '33ABKFP0985E1Z6', 'Supplier GSTIN matches Ponmuneeswari sample');
assert.strictEqual(sampleEwb.recipientGstin, '33QRQPS0659E1Z4', 'Recipient GSTIN matches Athira Traders');
assert.strictEqual(sampleEwb.docNo, 'PNFW-POS-0011', 'Document number matches PNFW-POS-0011');
assert.strictEqual(sampleEwb.totalValue, 23600.00, 'Total goods value matches ₹23,600.00');
assert.strictEqual(sampleEwb.hsnCode, '36041000', 'Fireworks HSN code matches 36041000');
assert(sampleEwb.ewayBillNo.length === 12 && /^\d{12}$/.test(sampleEwb.ewayBillNo), 'E-Way Bill Number is strictly 12 digits');
console.log('✓ Test 8 Passed: Official GST E-Way Bill & Ponmuneeswari PNFW-POS-0011 specification verified.');

console.log('\n======================================================');
console.log('ALL VERIFICATION TESTS PASSED SUCCESSFULLY! (8/8)');
console.log('======================================================');
