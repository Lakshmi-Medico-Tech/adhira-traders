/**
 * ==========================================================================
 * ADHIRA FIRE WORKS & PYROTECH — Commercial GST Quotation & Billing System
 * Sivakasi, Tamil Nadu
 * Production-Ready Commercial ES6+ Architecture
 * ==========================================================================
 */

(function () {
  'use strict';

  // --- STORAGE KEYS & ASSETS ---
  const STORAGE_KEY = 'adhira_pyrotech_db_v2';
  const DRAFT_KEY = 'adhira_quote_draft_v2';
  const LOGO_PATH = 'assets/adhira-logo.jpg';

  // --- INDIAN STATE CODES REFERENCE ---
  const STATE_CODES = [
    { code: '33', name: 'Tamil Nadu' },
    { code: '36', name: 'Telangana' },
    { code: '37', name: 'Andhra Pradesh' },
    { code: '29', name: 'Karnataka' },
    { code: '32', name: 'Kerala' },
    { code: '27', name: 'Maharashtra' },
    { code: '24', name: 'Gujarat' },
    { code: '08', name: 'Rajasthan' },
    { code: '23', name: 'Madhya Pradesh' },
    { code: '07', name: 'Delhi' },
    { code: '09', name: 'Uttar Pradesh' },
    { code: '19', name: 'West Bengal' },
    { code: '21', name: 'Odisha' },
    { code: '10', name: 'Bihar' },
    { code: '06', name: 'Haryana' },
    { code: '03', name: 'Punjab' },
    { code: '05', name: 'Uttarakhand' },
    { code: '02', name: 'Himachal Pradesh' },
    { code: '01', name: 'Jammu & Kashmir' },
    { code: '18', name: 'Assam' },
    { code: '34', name: 'Puducherry' },
    { code: '22', name: 'Chhattisgarh' },
    { code: '20', name: 'Jharkhand' },
    { code: '30', name: 'Goa' }
  ];

  // --- INITIAL SEED DATABASE ---
  const INITIAL_DB = {
    company: {
      name: 'ADHIRA FIRE WORKS & PYROTECH',
      legalName: 'MURUGAN SELVARAJ',
      gstCertTradeName: 'ATHIRA TRADERS',
      gstin: '33QRQPS0659E1Z4',
      regArnRef: 'AA330426046300R_RC13042026',
      pan: 'QRQPS0659E',
      address1: '8/444, Unnamed Road',
      address2: 'Near Sri Jaishnavi Stores, Gandhinagar',
      area: 'Anaiyur',
      city: 'Sivakasi',
      district: 'Virudhunagar',
      state: 'Tamil Nadu',
      stateCode: '33',
      pin: '626124',
      phone: '+91 94431 23456',
      altPhone: '+91 98421 78901',
      email: 'adhirapyrotech@gmail.com',
      website: 'www.adhirapyrotech.com',
      bankName: 'State Bank of India',
      accountNumber: '39485712093',
      branch: 'Sivakasi Main Branch (00918)',
      ifsc: 'SBIN0000918',
      upi: 'adhirapyro@sbi',
      signatoryName: 'Murugan Selvaraj',
      signatoryDesignation: 'Proprietor',
      declaration: 'We declare that this quotation/invoice shows the actual price of the goods described and that all particulars are true and correct.',
      terms: [
        'Rates quoted are Ex-Factory Sivakasi. Transportation and forwarding charges extra at actuals.',
        'Goods are dispatched strictly at buyer\'s risk and responsibility once handed over to the transport carrier.',
        'Payment terms: 100% advance or as mutually agreed prior to factory dispatch.',
        'Quotation is valid for 15 days from the date of issue and subject to stock availability.',
        'All disputes are subject to Sivakasi / Virudhunagar jurisdiction only.'
      ]
    },
    settings: {
      quotePrefix: 'QT',
      invoicePrefix: 'INV',
      nextQuote: 2,
      nextInvoice: 2,
      fyStartMonth: 4, // April
      watermarkEnabled: true,
      watermarkOpacity: 0.18,
      showBankDetails: true,
      showSignatory: true,
      showTerms: true,
      showDeclaration: true,
      showProductImagesInPdf: false
    },
    sellers: [
      {
        id: 'SELLER-001',
        name: 'ADHIRA FIRE WORKS & PYROTECH',
        legalName: 'MURUGAN SELVARAJ',
        gstCertTradeName: 'ATHIRA TRADERS',
        gstin: '33QRQPS0659E1Z4',
        regArnRef: 'AA330426046300R_RC13042026',
        pan: 'QRQPS0659E',
        address1: '8/444, Unnamed Road, Near Sri Jaishnavi Stores',
        address2: 'Gandhinagar, Anaiyur',
        area: 'Anaiyur',
        city: 'Sivakasi',
        district: 'Virudhunagar',
        state: 'Tamil Nadu',
        stateCode: '33',
        pin: '626124',
        phone: '+91 94431 23456',
        altPhone: '+91 98421 78901',
        email: 'adhirapyrotech@gmail.com',
        website: 'www.adhirapyrotech.com',
        bankName: 'State Bank of India',
        accountNumber: '39485712093',
        branch: 'Sivakasi Main Branch (00918)',
        ifsc: 'SBIN0000918',
        upi: 'adhirapyro@sbi',
        signatoryName: 'Murugan Selvaraj',
        signatoryDesignation: 'Proprietor',
        isDefault: true
      },
      {
        id: 'SELLER-002',
        name: 'ATHIRA TRADERS',
        legalName: 'MURUGAN SELVARAJ',
        gstCertTradeName: 'ATHIRA TRADERS',
        gstin: '33QRQPS0659E1Z4',
        regArnRef: 'AA330426046300R_RC13042026',
        pan: 'QRQPS0659E',
        address1: '8/444, Unnamed Road',
        address2: 'Near Sri Jaishnavi Stores, Gandhinagar',
        area: 'Anaiyur',
        city: 'Sivakasi',
        district: 'Virudhunagar',
        state: 'Tamil Nadu',
        stateCode: '33',
        pin: '626124',
        phone: '+91 94431 23456',
        altPhone: '+91 98421 78901',
        email: 'athiratraders@gmail.com',
        website: 'www.adhirapyrotech.com',
        bankName: 'State Bank of India',
        accountNumber: '39485712093',
        branch: 'Sivakasi Main Branch (00918)',
        ifsc: 'SBIN0000918',
        upi: 'adhirapyro@sbi',
        signatoryName: 'Murugan Selvaraj',
        signatoryDesignation: 'Proprietor',
        isDefault: false
      }
    ],
    categories: [
      'Fountains & Smoke',
      'Aerial & Crackers',
      'Sparklers & Showers',
      'Novelty Fireworks',
      'Sound Crackers',
      'Gift Boxes'
    ],
    customers: [
      {
        id: 'CUST-001',
        name: 'MB & SONS',
        legalName: 'MB & SONS',
        gstin: '36JNYPS8775N1Z5',
        pan: 'JNYPS8775N',
        type: 'Wholesale Dealer',
        billingAddress: 'Shop No. 12, Main Market Road, Near Gandhi Chowk',
        shippingAddress: 'Shop No. 12, Main Market Road, Near Gandhi Chowk, Sangareddy',
        contactPerson: 'B. Mahesh',
        phone: '9876543210',
        altPhone: '9440012345',
        email: 'mbsons.sangareddy@gmail.com',
        city: 'Sangareddy',
        district: 'Sangareddy',
        state: 'Telangana',
        stateCode: '36',
        pin: '502001',
        paymentTerms: 'Advance',
        status: 'Active',
        createdAt: '2026-09-01T10:00:00.000Z'
      },
      {
        id: 'CUST-002',
        name: 'SRI VELAN FIREWORKS',
        legalName: 'SRI VELAN FIREWORKS TRADERS',
        gstin: '33AAAPL1234A1Z5',
        pan: 'AAAPL1234A',
        type: 'Retailer',
        billingAddress: '24/7, Bypass Road, Near Bus Stand',
        shippingAddress: '24/7, Bypass Road, Near Bus Stand, Madurai',
        contactPerson: 'K. Velan',
        phone: '9443311223',
        altPhone: '',
        email: 'velanfireworks@gmail.com',
        city: 'Madurai',
        district: 'Madurai',
        state: 'Tamil Nadu',
        stateCode: '33',
        pin: '625001',
        paymentTerms: '15 Days Credit',
        status: 'Active',
        createdAt: '2026-09-05T11:30:00.000Z'
      }
    ],
    products: [
      { id: 'P001', name: 'Fog (Smoke)', shortName: 'Fog Smoke', hsn: '3604', packing: '1 (3 Pcs)', pieces: 3, unit: 'CASE', rate: 75, caseRate: 110, category: 'Fountains & Smoke', gst: 18, image: '', active: true },
      { id: 'P002', name: 'Mini Smoke', shortName: 'Mini Smoke', hsn: '3604', packing: '1 (3 Pcs)', pieces: 3, unit: 'CASE', rate: 60, caseRate: 140, category: 'Fountains & Smoke', gst: 18, image: '', active: true },
      { id: 'P003', name: 'Thunder (Crackling)', shortName: 'Thunder Crack', hsn: '3604', packing: '1 (3 Pcs)', pieces: 3, unit: 'CASE', rate: 75, caseRate: 110, category: 'Aerial & Crackers', gst: 18, image: '', active: true },
      { id: 'P004', name: 'Thunder (Red & Green)', shortName: 'Thunder R&G', hsn: '3604', packing: '1 (3 Pcs)', pieces: 3, unit: 'CASE', rate: 75, caseRate: 110, category: 'Aerial & Crackers', gst: 18, image: '', active: true },
      { id: 'P005', name: 'Hand Shower (Water Queen)', shortName: 'Hand Shower', hsn: '3604', packing: '1 (3 Pcs)', pieces: 3, unit: 'CASE', rate: 75, caseRate: 110, category: 'Sparklers & Showers', gst: 18, image: '', active: true },
      { id: 'P006', name: 'Mony Bank', shortName: 'Money Bank', hsn: '3604', packing: '1 (3 Pcs)', pieces: 3, unit: 'CASE', rate: 60, caseRate: 118, category: 'Novelty Fireworks', gst: 18, image: '', active: true },
      { id: 'P007', name: 'Crackling (Fountain 4”)', shortName: 'Crackling Ftn 4"', hsn: '3604', packing: '1 (3 Pcs)', pieces: 3, unit: 'CASE', rate: 100, caseRate: 75, category: 'Fountains & Smoke', gst: 18, image: '', active: true },
      { id: 'P008', name: 'Selfi Stick', shortName: 'Selfie Stick', hsn: '3604', packing: '1 (5 Pcs)', pieces: 5, unit: 'CASE', rate: 40, caseRate: 140, category: 'Novelty Fireworks', gst: 18, image: '', active: true },
      { id: 'P009', name: 'Bat & Ball', shortName: 'Bat & Ball', hsn: '3604', packing: '1 Pcs', pieces: 1, unit: 'CASE', rate: 120, caseRate: 80, category: 'Novelty Fireworks', gst: 18, image: '', active: true },
      { id: 'P010', name: 'Adhira Crackling', shortName: 'Adhira Crack', hsn: '3604', packing: '1 (4 Pcs)', pieces: 4, unit: 'CASE', rate: 100, caseRate: 110, category: 'Aerial & Crackers', gst: 18, image: '', active: true }
    ],
    quotations: [
      {
        id: 'Q-SAMPLE-001',
        number: 'QT/2026-27/0001',
        date: '2026-09-20',
        validUntil: '2026-10-05',
        customerId: 'CUST-001',
        customer: {
          id: 'CUST-001',
          name: 'MB & SONS',
          legalName: 'MB & SONS',
          gstin: '36JNYPS8775N1Z5',
          billingAddress: 'Shop No. 12, Main Market Road, Near Gandhi Chowk',
          shippingAddress: 'Shop No. 12, Main Market Road, Near Gandhi Chowk, Sangareddy',
          city: 'Sangareddy',
          state: 'Telangana',
          stateCode: '36',
          pin: '502001',
          phone: '9876543210',
          email: 'mbsons.sangareddy@gmail.com',
          terms: 'Advance'
        },
        seller: {
          name: 'ADHIRA FIRE WORKS & PYROTECH',
          legalName: 'MURUGAN SELVARAJ',
          gstin: '33QRQPS0659E1Z4',
          regArnRef: 'AA330426046300R_RC13042026',
          pan: 'QRQPS0659E',
          address: '8/444, Unnamed Road, Near Sri Jaishnavi Stores, Gandhinagar, Anaiyur, Sivakasi, Virudhunagar, Tamil Nadu - 626124',
          city: 'Sivakasi',
          state: 'Tamil Nadu',
          stateCode: '33',
          pin: '626124',
          phone: '+91 94431 23456',
          email: 'adhirapyrotech@gmail.com',
          bankName: 'State Bank of India',
          accountNumber: '39485712093',
          branch: 'Sivakasi Main Branch (00918)',
          ifsc: 'SBIN0000918',
          upi: 'adhirapyro@sbi',
          declaration: 'We declare that this quotation/invoice shows the actual price of the goods described and that all particulars are true and correct.',
          signatory: 'Murugan Selvaraj'
        },
        deliveryNote: 'DN-2026/04',
        supplierRef: 'ADH/26/88',
        otherReferences: 'Fireworks Consignment Sivakasi',
        poNumber: 'PO-2026-081',
        poDate: '2026-09-18',
        despatchDocNo: 'LR-99884',
        deliveryNoteDate: '2026-09-20',
        paymentTerms: 'Advance',
        deliveryTerms: 'Ex-Factory Sivakasi',
        dispatchThrough: 'ARC Parcels / Sivakasi Depot',
        destination: 'Sangareddy, Telangana',
        billOfLadingNo: 'BL-77661',
        motorVehicleNo: 'TN 67 AB 1234',
        termsOfDelivery: 'Ex-Factory Sivakasi, To-Pay Freight',
        items: [
          {
            id: 'item-1',
            productId: 'P009',
            name: 'Bat & Ball',
            hsn: '3604',
            packing: '1 Pcs',
            qty: 3,
            unit: 'CASE',
            rate: 2100,
            discountType: 'fixed',
            discount: 0,
            taxable: 6300,
            gst: 18,
            gstAmount: 1134,
            total: 7434
          },
          {
            id: 'item-2',
            productId: 'P005',
            name: 'Hand Shower (Water Queen)',
            hsn: '3604',
            packing: '1 (3 Pcs)',
            qty: 2,
            unit: 'CASE',
            rate: 2100,
            discountType: 'fixed',
            discount: 0,
            taxable: 4200,
            gst: 18,
            gstAmount: 756,
            total: 4956
          }
        ],
        subtotal: 10500,
        discountTotal: 0,
        taxable: 10500,
        gstTotal: 1890,
        cgst: 0,
        sgst: 0,
        igst: 1890,
        roundOff: 0,
        grandTotal: 12390,
        status: 'Accepted',
        notes: 'Strict factory packing. Consignment to be booked under designated fireworks carrier vehicle.',
        timeline: [
          { status: 'Draft', time: '2026-09-20T10:00:00.000Z', user: 'Murugan S. (Admin)' },
          { status: 'Issued', time: '2026-09-20T10:15:00.000Z', user: 'Murugan S. (Admin)' },
          { status: 'Accepted', time: '2026-09-21T14:30:00.000Z', user: 'Murugan S. (Admin)' }
        ],
        createdAt: '2026-09-20T10:00:00.000Z',
        updatedAt: '2026-09-21T14:30:00.000Z'
      }
    ],
    invoices: [
      {
        id: 'INV-SAMPLE-001',
        number: 'INV/2026-27/0001',
        quotationId: 'Q-SAMPLE-001',
        quotationNumber: 'QT/2026-27/0001',
        date: '2026-09-22',
        dueDate: '2026-09-22',
        customerId: 'CUST-001',
        customer: {
          id: 'CUST-001',
          name: 'MB & SONS',
          legalName: 'MB & SONS',
          gstin: '36JNYPS8775N1Z5',
          billingAddress: 'Shop No. 12, Main Market Road, Near Gandhi Chowk',
          shippingAddress: 'Shop No. 12, Main Market Road, Near Gandhi Chowk, Sangareddy',
          city: 'Sangareddy',
          state: 'Telangana',
          stateCode: '36',
          pin: '502001',
          phone: '9876543210'
        },
        seller: {
          name: 'ADHIRA FIRE WORKS & PYROTECH',
          legalName: 'MURUGAN SELVARAJ',
          gstin: '33QRQPS0659E1Z4',
          regArnRef: 'AA330426046300R_RC13042026',
          pan: 'QRQPS0659E',
          address: '8/444, Unnamed Road, Near Sri Jaishnavi Stores, Gandhinagar, Anaiyur, Sivakasi, Virudhunagar, Tamil Nadu - 626124',
          city: 'Sivakasi',
          state: 'Tamil Nadu',
          stateCode: '33',
          pin: '626124',
          phone: '+91 94431 23456',
          bankName: 'State Bank of India',
          accountNumber: '39485712093',
          ifsc: 'SBIN0000918',
          upi: 'adhirapyro@sbi'
        },
        items: [
          {
            id: 'item-1',
            productId: 'P009',
            name: 'Bat & Ball',
            hsn: '3604',
            packing: '1 Pcs',
            qty: 3,
            unit: 'CASE',
            rate: 2100,
            discount: 0,
            taxable: 6300,
            gst: 18,
            gstAmount: 1134,
            total: 7434
          },
          {
            id: 'item-2',
            productId: 'P005',
            name: 'Hand Shower (Water Queen)',
            hsn: '3604',
            packing: '1 (3 Pcs)',
            qty: 2,
            unit: 'CASE',
            rate: 2100,
            discount: 0,
            taxable: 4200,
            gst: 18,
            gstAmount: 756,
            total: 4956
          }
        ],
        subtotal: 10500,
        discountTotal: 0,
        taxable: 10500,
        gstTotal: 1890,
        cgst: 0,
        sgst: 0,
        igst: 1890,
        roundOff: 0,
        grandTotal: 12390,
        status: 'Paid',
        ewayBillNo: '231498765432',
        ewayBillDate: '2026-09-22',
        transporterName: 'ARC Parcels',
        transporterGstin: '33AAACA1234A1Z9',
        vehicleNo: 'TN 67 AB 1234',
        dispatchPlace: 'Sivakasi',
        deliveryPlace: 'Sangareddy',
        paymentStatus: 'Paid',
        notes: 'Full advance received via NEFT. Materials loaded and dispatched.',
        createdAt: '2026-09-22T09:00:00.000Z'
      }
    ]
  };

  // --- DATABASE & MULTI-DEVICE SYNC HELPER ---
  let isSyncing = false;
  let syncStatus = 'synced'; // 'synced', 'syncing', 'offline'
  let serverInfo = {
    port: 3000,
    localUrl: 'http://localhost:3000',
    networkUrls: [{ ip: '10.64.104.66', url: 'http://10.64.104.66:3000', interface: 'Wi-Fi' }]
  };

  function updateSyncBadge(status, label) {
    syncStatus = status;
    const badge = document.getElementById('syncStatusBadge');
    if (badge) {
      badge.className = `sync-status-badge sync-${status}`;
      badge.innerHTML = `
        <span class="sync-dot"></span>
        <span class="sync-label">${escapeHtml(label || (status === 'synced' ? 'Realtime Synced' : status === 'syncing' ? 'Syncing...' : 'Local Mode'))}</span>
      `;
    }
  }

  function loadDatabase() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const result = Object.assign({}, INITIAL_DB, parsed);
        if (!result.sellers || !Array.isArray(result.sellers) || result.sellers.length === 0) {
          result.sellers = structuredClone(INITIAL_DB.sellers);
        }
        if (!result.settings) result.settings = structuredClone(INITIAL_DB.settings);
        if (!result.settings.watermarkOpacity || result.settings.watermarkOpacity === 0.065) {
          result.settings.watermarkOpacity = 0.18;
        }
        return result;
      }
    } catch (e) {
      console.error('Error loading DB from localStorage:', e);
    }
    const seed = structuredClone(INITIAL_DB);
    return seed;
  }

  function saveDatabase(data) {
    const payload = data || db;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Error saving DB to localStorage:', e);
    }
    // Also push to central backend database asynchronously
    pushDbToServer(payload);
  }

  async function pushDbToServer(payload) {
    try {
      updateSyncBadge('syncing', 'Saving to Server...');
      const res = await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        updateSyncBadge('synced', 'Realtime Synced');
      } else {
        updateSyncBadge('offline', 'Sync Error');
      }
    } catch (err) {
      console.warn('Network sync to server failed, stored in local storage:', err);
      updateSyncBadge('offline', 'Local Cache');
    }
  }

  async function syncFromServer(silent = false) {
    if (isSyncing) return;
    isSyncing = true;
    try {
      if (!silent) updateSyncBadge('syncing', 'Syncing...');
      const res = await fetch('/api/db');
      if (res.ok) {
        const json = await res.json();
        if (json && json.initialized && json.data) {
          const serverDb = json.data;
          const currentStr = JSON.stringify(db);
          const serverStr = JSON.stringify(serverDb);
          if (currentStr !== serverStr) {
            db = Object.assign({}, INITIAL_DB, serverDb);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
            // Only re-render if not currently editing a quotation or modal
            if (!state.activeModal && state.page !== 'newQuote' && state.page !== 'editQuote') {
              renderCurrentPage();
            }
          }
          updateSyncBadge('synced', 'Realtime Synced');
        } else if (json && !json.initialized) {
          // Server has no DB yet, push our current DB to seed it
          await pushDbToServer(db);
        }
      }
    } catch (err) {
      console.warn('Cannot reach server for DB sync:', err);
      updateSyncBadge('offline', 'Local Cache');
    } finally {
      isSyncing = false;
    }
  }

  async function fetchServerInfo() {
    try {
      const res = await fetch('/api/info');
      if (res.ok) {
        const data = await res.json();
        if (data && data.networkUrls) {
          serverInfo = data;
        }
      }
    } catch (err) {
      console.warn('Cannot fetch server info:', err);
    }
  }

  let db = loadDatabase();

  // --- AUTH & ROLES ---
  let currentUser = {
    username: 'admin',
    name: 'Murugan S.',
    role: 'Admin'
  };


  // --- STATE MANAGEMENT ---
  const state = {
    page: 'dashboard',
    activeModal: null,
    editingCustomerId: null,
    editingProductId: null,
    editingQuoteId: null,
    viewingDoc: null,
    zoomScale: 1.0,
    quoteFilterStatus: 'All',
    quoteSearch: '',
    customerSearch: '',
    productSearch: '',
    productCategoryFilter: 'All',
    productViewMode: 'grid',
    invoiceSearch: '',
    invoiceFilterStatus: 'All',
    globalSearchQuery: '',
    reportDateRange: 'all',
    autosaveTimer: null,
    lastAutosaveTime: null
  };

  // ==========================================================================
  // MATHEMATICS & TAX UTILITIES
  // ==========================================================================

  function round2(val) {
    return Math.round((Number(val) || 0) * 100) / 100;
  }

  function formatMoney(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(amount) || 0);
  }

  function formatNumber(amount) {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(amount) || 0);
  }

  function escapeHtml(str = '') {
    return String(str).replace(/[&<>'"]/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[c] || c));
  }

  function getFinancialYear(dateInput = new Date()) {
    const d = new Date(dateInput);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const fyStart = db.settings.fyStartMonth || 4;
    if (month >= fyStart) {
      return `${year}-${String(year + 1).slice(-2)}`;
    } else {
      return `${year - 1}-${String(year).slice(-2)}`;
    }
  }

  function generateDocNumber(type = 'quote') {
    const isQuote = type === 'quote';
    const prefix = isQuote ? db.settings.quotePrefix : db.settings.invoicePrefix;
    const nextNum = isQuote ? db.settings.nextQuote : db.settings.nextInvoice;
    const fy = getFinancialYear();
    const numStr = String(nextNum).padStart(4, '0');
    return `${prefix}/${fy}/${numStr}`;
  }

  function incrementDocNumber(type = 'quote') {
    if (type === 'quote') {
      db.settings.nextQuote = (db.settings.nextQuote || 1) + 1;
    } else {
      db.settings.nextInvoice = (db.settings.nextInvoice || 1) + 1;
    }
    saveDatabase();
  }

  function convertAmountToWords(amount) {
    let num = Math.round(Number(amount) || 0);
    if (num <= 0) return 'INR Zero Rupees Only';

    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
      'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function convertTwoDigits(n) {
      if (n < 20) return a[n];
      return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
    }

    function convertUnderThousand(n) {
      let str = '';
      if (n >= 100) {
        str += a[Math.floor(n / 100)] + ' Hundred ';
        n %= 100;
      }
      if (n > 0) {
        str += convertTwoDigits(n);
      }
      return str.trim();
    }

    let words = '';

    if (num >= 10000000) {
      const crores = Math.floor(num / 10000000);
      words += convertUnderThousand(crores) + ' Crore ';
      num %= 10000000;
    }
    if (num >= 100000) {
      const lakhs = Math.floor(num / 100000);
      words += convertUnderThousand(lakhs) + ' Lakh ';
      num %= 100000;
    }
    if (num >= 1000) {
      const thousands = Math.floor(num / 1000);
      words += convertUnderThousand(thousands) + ' Thousand ';
      num %= 1000;
    }
    if (num > 0) {
      words += convertUnderThousand(num);
    }

    return `INR ${words.trim()} Only`;
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

  function calculateDocumentSummary(items, customerStateCode) {
    let subtotal = 0;
    let totalDiscount = 0;
    let taxableAmount = 0;
    let totalGst = 0;

    const hsnGroups = {};

    items.forEach(it => {
      const calc = calculateItemLine(it);
      subtotal += calc.gross;
      totalDiscount += calc.discount;
      taxableAmount += calc.taxable;
      totalGst += calc.gstAmount;

      const hsn = it.hsn || '3604';
      if (!hsnGroups[hsn]) {
        hsnGroups[hsn] = {
          hsn,
          taxable: 0,
          gstRate: it.gst || 18,
          taxAmount: 0
        };
      }
      hsnGroups[hsn].taxable += calc.taxable;
      hsnGroups[hsn].taxAmount += calc.gstAmount;
    });

    subtotal = round2(subtotal);
    totalDiscount = round2(totalDiscount);
    taxableAmount = round2(taxableAmount);
    totalGst = round2(totalGst);

    const sellerCode = String(db.company.stateCode || '33').trim();
    const custCode = String(customerStateCode || '').trim();

    const isInterstate = Boolean(custCode && sellerCode !== custCode);

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (isInterstate) {
      igst = totalGst;
      cgst = 0;
      sgst = 0;
    } else {
      cgst = round2(totalGst / 2);
      sgst = round2(totalGst / 2);
      igst = 0;
    }

    const unroundedTotal = taxableAmount + totalGst;
    const grandTotal = Math.round(unroundedTotal);
    const roundOff = round2(grandTotal - unroundedTotal);

    return {
      subtotal,
      totalDiscount,
      taxableAmount,
      totalGst,
      cgst,
      sgst,
      igst,
      roundOff,
      grandTotal,
      isInterstate,
      hsnGroups: Object.values(hsnGroups)
    };
  }

  function isValidGstin(gstin = '') {
    if (!gstin) return false;
    const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return regex.test(gstin.trim().toUpperCase());
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    toast.innerHTML = `<span style="font-size:16px">${icon}</span> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  function triggerCelebration() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#1e2978', '#10b981', '#fbbf24', '#e11d48']
      });
    }
  }

  // ==========================================================================
  // APP SHELL RENDERER
  // ==========================================================================

  function renderAppShell() {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <div class="app-layout">
        <!-- SIDEBAR -->
        <aside class="app-sidebar" id="appSidebar">
          <div class="sidebar-header">
            <div class="brand-wrapper">
              <img src="${LOGO_PATH}" alt="Adhira Pyrotech Logo" class="brand-logo-img" />
              <div class="brand-text">
                <h1>ADHIRA PYROTECH</h1>
                <div class="brand-tag">
                  <span class="brand-tag-dot"></span>
                  SIVAKASI • GST B2B
                </div>
              </div>
            </div>
          </div>

          <nav class="sidebar-nav">
            <div class="nav-section-title">Operations</div>
            
            <a href="#" class="nav-item ${state.page === 'dashboard' ? 'active' : ''}" data-nav="dashboard">
              <div class="nav-item-content">
                <span class="nav-icon">▦</span>
                <span>Dashboard</span>
              </div>
            </a>

            <a href="#" class="nav-item ${state.page === 'quotations' ? 'active' : ''}" data-nav="quotations">
              <div class="nav-item-content">
                <span class="nav-icon">▤</span>
                <span>Quotations</span>
              </div>
              <span class="nav-badge">${db.quotations.length}</span>
            </a>

            <a href="#" class="nav-item ${state.page === 'invoices' ? 'active' : ''}" data-nav="invoices">
              <div class="nav-item-content">
                <span class="nav-icon">🧾</span>
                <span>Tax Invoices</span>
              </div>
              <span class="nav-badge">${db.invoices.length}</span>
            </a>

            <div class="nav-section-title">Master Data</div>

            <a href="#" class="nav-item ${state.page === 'customers' ? 'active' : ''}" data-nav="customers">
              <div class="nav-item-content">
                <span class="nav-icon">🏢</span>
                <span>Customers / Shops</span>
              </div>
              <span class="nav-badge">${db.customers.length}</span>
            </a>

            <a href="#" class="nav-item ${state.page === 'products' ? 'active' : ''}" data-nav="products">
              <div class="nav-item-content">
                <span class="nav-icon">🎆</span>
                <span>Product Master</span>
              </div>
              <span class="nav-badge">${db.products.length}</span>
            </a>

            <div class="nav-section-title">Analytics & Config</div>

            <a href="#" class="nav-item ${state.page === 'categories' ? 'active' : ''}" data-nav="categories">
              <div class="nav-item-content">
                <span class="nav-icon">🏷️</span>
                <span>Categories</span>
              </div>
              <span class="nav-badge">${db.categories.length}</span>
            </a>

            <a href="#" class="nav-item ${state.page === 'reports' ? 'active' : ''}" data-nav="reports">
              <div class="nav-item-content">
                <span class="nav-icon">📊</span>
                <span>Reports & GST</span>
              </div>
            </a>

            <a href="#" class="nav-item ${state.page === 'settings' ? 'active' : ''}" data-nav="settings">
              <div class="nav-item-content">
                <span class="nav-icon">⚙️</span>
                <span>Settings</span>
              </div>
            </a>
          </nav>

          <div class="sidebar-footer">
            <div class="quick-seller-pill">
              <b>${escapeHtml(db.company.name)}</b>
              <span>GSTIN: ${escapeHtml(db.company.gstin)}</span>
              <div style="font-size:9.5px;color:rgba(255,255,255,0.6);margin-top:2px">Ref: ${escapeHtml(db.company.regArnRef || '')}</div>
            </div>
          </div>
        </aside>

        <!-- SIDEBAR MOBILE OVERLAY -->
        <div class="sidebar-overlay" id="sidebarOverlay"></div>

        <!-- MAIN CONTENT AREA -->
        <main class="app-main">
          <!-- TOPBAR -->
          <header class="app-topbar">
            <div class="topbar-left">
              <button class="menu-toggle-btn" id="sidebarToggleBtn" aria-label="Toggle Navigation">☰</button>
              <div class="topbar-page-info">
                <h2>${getPageTitle()}</h2>
                <p>${getPageSubtitle()}</p>
              </div>
            </div>

            <div class="topbar-right">
              <button class="sync-status-badge sync-${syncStatus}" id="syncStatusBadge" onclick="window.adhiraApp.openDeviceSyncModal()" title="Shared Realtime Database Across All Devices - Click to connect phone">
                <span class="sync-dot"></span>
                <span class="sync-label">${syncStatus === 'synced' ? 'Realtime Synced' : syncStatus === 'syncing' ? 'Syncing...' : 'Local Cache'}</span>
              </button>

              <div class="global-search-trigger" id="globalSearchTrigger" title="Search everywhere (Ctrl+K or /)">
                <span>🔍</span>
                <span>Search Customer, Quote, Product...</span>
                <span class="search-kbd">/</span>
              </div>

              <button class="btn btn-gold" onclick="window.adhiraApp.openNewQuotation()">
                <span>+</span>
                <span>New Quotation</span>
              </button>

              <div class="role-badge-pill" title="Click to switch role" onclick="window.adhiraApp.toggleUserRole()" style="cursor:pointer">
                <span class="role-indicator ${currentUser.role === 'Staff' ? 'staff' : ''}"></span>
                <span>${currentUser.name} (${currentUser.role})</span>
              </div>
            </div>
          </header>

          <!-- VIEWPORT CONTAINER -->
          <section class="app-content" id="appContent">
            <!-- Dynamic page content renders here -->
          </section>
        </main>

        <!-- MOBILE BOTTOM NAVIGATION -->
        <nav class="mobile-bottom-nav">
          <button class="mobile-nav-btn ${state.page === 'dashboard' ? 'active' : ''}" data-nav="dashboard">
            <span class="icon">▦</span>
            <span>Home</span>
          </button>
          <button class="mobile-nav-btn ${state.page === 'quotations' ? 'active' : ''}" data-nav="quotations">
            <span class="icon">▤</span>
            <span>Quotes</span>
          </button>
          <button class="mobile-nav-btn center-cta" onclick="window.adhiraApp.openNewQuotation()">
            <span class="icon">+</span>
            <span>Quote</span>
          </button>
          <button class="mobile-nav-btn ${state.page === 'products' ? 'active' : ''}" data-nav="products">
            <span class="icon">🎆</span>
            <span>Products</span>
          </button>
          <button class="mobile-nav-btn ${state.page === 'customers' ? 'active' : ''}" data-nav="customers">
            <span class="icon">🏢</span>
            <span>Shops</span>
          </button>
        </nav>
      </div>
    `;

    attachNavListeners();
    renderCurrentPage();
  }

  function getPageTitle() {
    switch (state.page) {
      case 'dashboard': return 'Business Overview';
      case 'quotations': return 'Quotations Management';
      case 'new-quotation': return state.editingQuoteId ? 'Edit Quotation' : 'Create GST Quotation';
      case 'invoices': return 'Tax Invoices';
      case 'customers': return 'Customer & Shop Master';
      case 'products': return 'Fireworks Product Master';
      case 'categories': return 'Product Categories';
      case 'reports': return 'Financial & GST Reports';
      case 'settings': return 'Business Settings & Document Config';
      default: return 'Adhira Pyrotech';
    }
  }

  function getPageSubtitle() {
    switch (state.page) {
      case 'dashboard': return 'Real-time performance, recent documents, and rapid actions.';
      case 'quotations': return 'Search, issue, duplicate, print and convert quotations.';
      case 'new-quotation': return 'Comprehensive GST billing calculator with live snapshot preservation.';
      case 'invoices': return 'Commercial tax invoices with transport & E-Way Bill fields.';
      case 'customers': return 'Searchable shop directory with GSTIN auto-fill and history.';
      case 'products': return 'Packing rates, HSN 3604, GST rates, and case pricing.';
      case 'categories': return 'Manage product categories used in quotations and product master.';
      case 'reports': return 'GST tax split (CGST, SGST, IGST) and sales analytics.';
      case 'settings': return 'Permanent seller profile, bank credentials, numbering & backups.';
      default: return 'Commercial billing software';
    }
  }

  function attachNavListeners() {
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const page = el.getAttribute('data-nav');
        navigateTo(page);
      });
    });

    const sidebarToggle = document.getElementById('sidebarToggleBtn');
    const sidebar = document.getElementById('appSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebarToggle && sidebar) {
      sidebarToggle.onclick = () => {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('visible');
      };
    }
    if (overlay) {
      overlay.onclick = () => {
        if (sidebar) sidebar.classList.remove('open');
        overlay.classList.remove('visible');
      };
    }

    const searchTrigger = document.getElementById('globalSearchTrigger');
    if (searchTrigger) {
      searchTrigger.onclick = () => openGlobalSearchModal();
    }

    window.onkeydown = (e) => {
      if ((e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') ||
          (e.ctrlKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        openGlobalSearchModal();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    };
  }

  function navigateTo(page) {
    state.page = page;
    if (page !== 'new-quotation') {
      state.editingQuoteId = null;
    }
    const sidebar = document.getElementById('appSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    renderAppShell();
    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }

  function renderCurrentPage() {
    const container = document.getElementById('appContent');
    if (!container) return;

    switch (state.page) {
      case 'dashboard':
        container.innerHTML = renderDashboardPage();
        attachDashboardListeners();
        break;
      case 'quotations':
        container.innerHTML = renderQuotationsPage();
        attachQuotationsListeners();
        break;
      case 'new-quotation':
        container.innerHTML = renderQuotationEditorPage();
        attachQuotationEditorListeners();
        break;
      case 'invoices':
        container.innerHTML = renderInvoicesPage();
        attachInvoicesListeners();
        break;
      case 'customers':
        container.innerHTML = renderCustomersPage();
        attachCustomersListeners();
        break;
      case 'products':
        container.innerHTML = renderProductsPage();
        attachProductsListeners();
        break;
      case 'categories':
        container.innerHTML = renderCategoriesPage();
        attachCategoriesListeners();
        break;
      case 'reports':
        container.innerHTML = renderReportsPage();
        attachReportsListeners();
        break;
      case 'settings':
        container.innerHTML = renderSettingsPage();
        attachSettingsListeners();
        break;
      default:
        container.innerHTML = renderDashboardPage();
        attachDashboardListeners();
    }
  }

  // ==========================================================================
  // MODULE 1: DASHBOARD
  // ==========================================================================

  function renderDashboardPage() {
    const totalQuotes = db.quotations.length;
    const totalInvoices = db.invoices.length;
    const totalTaxable = db.quotations.reduce((acc, q) => acc + (q.taxable || 0), 0);
    const totalGst = db.quotations.reduce((acc, q) => acc + (q.gstTotal || 0), 0);
    const totalGrand = db.quotations.reduce((acc, q) => acc + (q.grandTotal || 0), 0);
    const acceptedQuotes = db.quotations.filter(q => q.status === 'Accepted' || q.status === 'Converted').length;

    const recentQuotes = db.quotations.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    const recentCustomers = db.customers.slice().reverse().slice(0, 4);

    const netUrl = (serverInfo && serverInfo.networkUrls && serverInfo.networkUrls[0])
      ? serverInfo.networkUrls[0].url
      : window.location.origin;

    return `
      <!-- MULTI-DEVICE & SERVER SYNC BANNER -->
      <div class="network-connect-banner">
        <div class="network-banner-info">
          <div class="network-banner-icon">📱</div>
          <div class="network-banner-text">
            <h4>
              <span>Central Realtime Database Active</span>
              <span class="sync-status-badge sync-${syncStatus}" style="font-size:10.5px;padding:3px 8px;">
                <span class="sync-dot"></span>
                <span>${syncStatus === 'synced' ? 'Live Synced' : 'Syncing...'}</span>
              </span>
            </h4>
            <p>Connect any mobile phone, tablet or billing counter PC: <strong>${escapeHtml(netUrl)}</strong></p>
          </div>
        </div>
        <div class="network-banner-actions">
          <button class="btn btn-gold btn-sm" onclick="window.adhiraApp.openDeviceSyncModal()">
            <span>📲</span> Scan Mobile QR Code
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.syncDatabaseNow()" style="background:rgba(255,255,255,0.15);color:#fff;border-color:rgba(255,255,255,0.25)">
            <span>🔄</span> Sync Now
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card gold">
          <div class="stat-top">
            <span class="stat-label">Total Quotations</span>
            <span class="stat-icon">▤</span>
          </div>
          <div class="stat-value">${totalQuotes}</div>
          <div class="stat-bottom">
            <span class="stat-pill positive">${acceptedQuotes} Approved / Converted</span>
          </div>
        </div>

        <div class="stat-card emerald">
          <div class="stat-top">
            <span class="stat-label">Taxable Value</span>
            <span class="stat-icon">💰</span>
          </div>
          <div class="stat-value">${formatMoney(totalTaxable)}</div>
          <div class="stat-bottom">
            <span>GST Excluded</span>
          </div>
        </div>

        <div class="stat-card sky">
          <div class="stat-top">
            <span class="stat-label">Total GST Generated</span>
            <span class="stat-icon">🏛️</span>
          </div>
          <div class="stat-value">${formatMoney(totalGst)}</div>
          <div class="stat-bottom">
            <span>CGST + SGST + IGST</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-top">
            <span class="stat-label">Grand Total Value</span>
            <span class="stat-icon">📈</span>
          </div>
          <div class="stat-value">${formatMoney(totalGrand)}</div>
          <div class="stat-bottom">
            <span>${totalInvoices} Converted Invoices</span>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title">Recent Quotations</h3>
              <p class="card-subtitle">Last 5 quotation documents generated</p>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.navigate('quotations')">View All</button>
          </div>

          ${recentQuotes.length > 0 ? `
            <div class="table-responsive table-desktop-only">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Quote No</th>
                    <th>Customer / Shop</th>
                    <th>Date</th>
                    <th class="num">Taxable</th>
                    <th class="num">Grand Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${recentQuotes.map(q => `
                    <tr>
                      <td class="strong">${escapeHtml(q.number)}</td>
                      <td>
                        <b>${escapeHtml(q.customer.name)}</b>
                        <div style="font-size:11px;color:var(--text-muted)">${escapeHtml(q.customer.city || '')} • ${escapeHtml(q.customer.gstin || 'No GST')}</div>
                      </td>
                      <td>${escapeHtml(q.date)}</td>
                      <td class="num">${formatMoney(q.taxable)}</td>
                      <td class="num strong">${formatMoney(q.grandTotal)}</td>
                      <td><span class="badge badge-${q.status.toLowerCase()}">${q.status}</span></td>
                      <td>
                        <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.viewDocument('quote', '${q.id}')">View</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- MOBILE QUOTE CARDS VIEW FOR PHONE & TABLET -->
            <div class="mobile-quote-cards">
              ${recentQuotes.map(q => `
                <div class="mobile-quote-card">
                  <div class="mq-header">
                    <span class="mq-num">${escapeHtml(q.number)}</span>
                    <span class="badge badge-${q.status.toLowerCase()}">${q.status}</span>
                  </div>
                  <div class="mq-customer">${escapeHtml(q.customer.name)}</div>
                  <div class="mq-sub">${escapeHtml(q.customer.city || '')} • ${escapeHtml(q.customer.gstin || 'No GST')} • ${escapeHtml(q.date)}</div>
                  <div class="mq-metrics">
                    <div class="mq-metric-col">
                      <span class="mq-metric-label">Taxable</span>
                      <span class="mq-metric-val">${formatMoney(q.taxable)}</span>
                    </div>
                    <div class="mq-metric-col" style="text-align:right;">
                      <span class="mq-metric-label">Grand Total</span>
                      <span class="mq-metric-val" style="color:var(--gold-800);">${formatMoney(q.grandTotal)}</span>
                    </div>
                  </div>
                  <div class="mq-actions">
                    <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.viewDocument('quote', '${q.id}')">📄 View PDF</button>
                    <button class="btn btn-gold btn-sm" onclick="window.adhiraApp.duplicateQuotation('${q.id}')">📋 Duplicate</button>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="empty-state">
              <div class="empty-state-icon">📋</div>
              <h4 class="empty-state-title">No Quotations Yet</h4>
              <p class="empty-state-desc">Create your very first professional GST quotation for fireworks buyers.</p>
              <button class="btn btn-gold" onclick="window.adhiraApp.openNewQuotation()">+ Create Quotation</button>
            </div>
          `}
        </div>

        <div style="display:flex;flex-direction:column;gap:18px;">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Quick Actions</h3>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <button class="btn btn-gold" onclick="window.adhiraApp.openNewQuotation()">
                <span>+</span> New Quote
              </button>
              <button class="btn btn-secondary" onclick="window.adhiraApp.openCustomerModal()">
                <span>🏢</span> Add Customer
              </button>
              <button class="btn btn-secondary" onclick="window.adhiraApp.openProductModal()">
                <span>🎆</span> Add Product
              </button>
              <button class="btn btn-secondary" onclick="window.adhiraApp.navigate('reports')">
                <span>📊</span> Tax Reports
              </button>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title">Recent Customers</h3>
                <p class="card-subtitle">Active registered fireworks shops</p>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.navigate('customers')">Manage</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${recentCustomers.map(c => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--bg-subtle);border-radius:var(--radius-md);">
                  <div>
                    <strong style="font-size:12.5px;color:var(--navy-950)">${escapeHtml(c.name)}</strong>
                    <div style="font-size:11px;color:var(--text-muted)">${escapeHtml(c.gstin)} • ${escapeHtml(c.city || '')}, ${escapeHtml(c.state || '')}</div>
                  </div>
                  <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.startQuoteForCustomer('${c.id}')">+ Quote</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function attachDashboardListeners() {}

  // ==========================================================================
  // MODULE 2: QUOTATIONS LIST
  // ==========================================================================

  function renderQuotationsPage() {
    let filtered = db.quotations.slice();

    if (state.quoteFilterStatus !== 'All') {
      filtered = filtered.filter(q => q.status === state.quoteFilterStatus);
    }

    if (state.quoteSearch.trim()) {
      const q = state.quoteSearch.toLowerCase().trim();
      filtered = filtered.filter(item => {
        return (
          item.number.toLowerCase().includes(q) ||
          item.customer.name.toLowerCase().includes(q) ||
          (item.customer.gstin && item.customer.gstin.toLowerCase().includes(q)) ||
          (item.customer.city && item.customer.city.toLowerCase().includes(q)) ||
          (item.customer.phone && item.customer.phone.includes(q)) ||
          item.date.includes(q)
        );
      });
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    return `
      <div class="card">
        <div class="toolbar">
          <div class="toolbar-left">
            <div class="input-search-box">
              <span class="input-search-icon">🔍</span>
              <input type="text" class="input" id="quoteSearchInput" placeholder="Search Quote No, Customer, GSTIN, Phone..." value="${escapeHtml(state.quoteSearch)}" />
            </div>

            <select class="select" id="quoteStatusFilter" style="width:160px;">
              <option value="All" ${state.quoteFilterStatus === 'All' ? 'selected' : ''}>All Statuses</option>
              <option value="Draft" ${state.quoteFilterStatus === 'Draft' ? 'selected' : ''}>Draft</option>
              <option value="Issued" ${state.quoteFilterStatus === 'Issued' ? 'selected' : ''}>Issued</option>
              <option value="Sent" ${state.quoteFilterStatus === 'Sent' ? 'selected' : ''}>Sent</option>
              <option value="Accepted" ${state.quoteFilterStatus === 'Accepted' ? 'selected' : ''}>Accepted</option>
              <option value="Converted" ${state.quoteFilterStatus === 'Converted' ? 'selected' : ''}>Converted</option>
              <option value="Cancelled" ${state.quoteFilterStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </div>

          <div class="toolbar-right">
            <button class="btn btn-secondary" onclick="window.adhiraApp.exportQuotationsCsv()">
              <span>📥</span> Export CSV
            </button>
            <button class="btn btn-gold" onclick="window.adhiraApp.openNewQuotation()">
              <span>+</span> New Quotation
            </button>
          </div>
        </div>

        ${filtered.length > 0 ? `
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Quotation No</th>
                  <th>Customer / Shop</th>
                  <th>GSTIN</th>
                  <th>Date</th>
                  <th class="num">Taxable Value</th>
                  <th class="num">GST Total</th>
                  <th class="num">Grand Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${filtered.map(q => `
                  <tr>
                    <td class="strong">${escapeHtml(q.number)}</td>
                    <td>
                      <b>${escapeHtml(q.customer.name)}</b>
                      <div style="font-size:11px;color:var(--text-muted)">${escapeHtml(q.customer.city || '')} (${escapeHtml(q.customer.state || '')})</div>
                    </td>
                    <td><span style="font-family:monospace;font-size:11.5px">${escapeHtml(q.customer.gstin || '—')}</span></td>
                    <td>${escapeHtml(q.date)}</td>
                    <td class="num">${formatMoney(q.taxable)}</td>
                    <td class="num">${formatMoney(q.gstTotal)}</td>
                    <td class="num strong" style="font-size:13.5px">${formatMoney(q.grandTotal)}</td>
                    <td><span class="badge badge-${q.status.toLowerCase()}">${q.status}</span></td>
                    <td>
                      <div style="display:flex;gap:4px;">
                        <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.viewDocument('quote', '${q.id}')" title="Preview A4 Document">View</button>
                        <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.editQuotation('${q.id}')" title="Edit Quotation">Edit</button>
                        <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.duplicateQuotation('${q.id}')" title="Duplicate as New Quote">Copy</button>
                        ${q.status !== 'Converted' ? `
                          <button class="btn btn-gold btn-sm" onclick="window.adhiraApp.promptConvertInvoice('${q.id}')" title="Convert to Tax Invoice">Convert</button>
                        ` : ''}
                        <button class="btn btn-danger btn-sm" onclick="window.adhiraApp.deleteQuotation('${q.id}')" title="Delete Quote">✕</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">🔍</div>
            <h4 class="empty-state-title">No Quotations Found</h4>
            <p class="empty-state-desc">No records match your search criteria. Try a different filter or create a new quote.</p>
            <button class="btn btn-gold" onclick="window.adhiraApp.openNewQuotation()">+ Create New Quotation</button>
          </div>
        `}
      </div>
    `;
  }

  function attachQuotationsListeners() {
    const searchInput = document.getElementById('quoteSearchInput');
    if (searchInput) {
      searchInput.oninput = (e) => {
        state.quoteSearch = e.target.value;
        renderCurrentPage();
      };
    }

    const filterSelect = document.getElementById('quoteStatusFilter');
    if (filterSelect) {
      filterSelect.onchange = (e) => {
        state.quoteFilterStatus = e.target.value;
        renderCurrentPage();
      };
    }
  }

  // ==========================================================================
  // MODULE 3: NEW / EDIT QUOTATION BUILDER
  // ==========================================================================

  let draftQuote = null;

  function initDraftQuote() {
    if (state.editingQuoteId) {
      const existing = db.quotations.find(q => q.id === state.editingQuoteId);
      if (existing) {
        draftQuote = structuredClone(existing);
        return;
      }
    }

    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (parsed && parsed.items && parsed.items.length > 0) {
          draftQuote = parsed;
          return;
        }
      } catch (e) {}
    }

    draftQuote = {
      id: 'Q-' + Date.now(),
      number: generateDocNumber('quote'),
      date: new Date().toISOString().slice(0, 10),
      validUntil: new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10),
      customerId: '',
      customer: {
        name: '',
        legalName: '',
        gstin: '',
        billingAddress: '',
        shippingAddress: '',
        city: '',
        state: 'Tamil Nadu',
        stateCode: '33',
        pin: '',
        phone: '',
        email: '',
        terms: 'Advance'
      },
      seller: (db.sellers && db.sellers.length > 0)
        ? structuredClone(db.sellers.find(s => s.isDefault) || db.sellers[0])
        : structuredClone(db.company),
      // All MB & SONS Invoice Fields
      deliveryNote: '',
      supplierRef: '',
      otherReferences: '',
      poNumber: '',
      poDate: '',
      despatchDocNo: '',
      deliveryNoteDate: '',
      dispatchThrough: '',
      destination: '',
      billOfLadingNo: '',
      motorVehicleNo: '',
      termsOfDelivery: 'Ex-Factory Sivakasi',
      paymentTerms: 'Advance',
      salesPerson: currentUser.name,
      items: [
        {
          id: 'row-1',
          productId: '',
          name: '',
          hsn: '3604',
          packing: '',
          qty: 1,
          unit: 'CASE',
          rate: 0,
          discountType: 'fixed',
          discount: 0,
          gst: 18
        }
      ],
      notes: 'Rates quoted are ex-factory Sivakasi. Transportation extra.',
      status: 'Draft',
      sameAsBilling: true
    };
  }

  function renderQuotationEditorPage() {
    if (!draftQuote) {
      initDraftQuote();
    }

    const c = draftQuote.customer || {};
    const s = draftQuote.seller || db.company;
    const summary = calculateDocumentSummary(draftQuote.items, c.stateCode);

    return `
      <div class="quote-editor-grid">
        <!-- LEFT: FORM WORKSPACE -->
        <div class="quote-editor-left">

          <!-- 0. FROM DETAILS (SELLER / FACTORY / MULTIPLE PROFILES) -->
          <div class="card">
            <div class="section-divider-title">
              <h4>0. From (Seller / Factory Details)</h4>
              <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                <span class="from-details-badge">🏢 Multiple Factories / From Profiles</span>
                <button type="button" class="btn btn-secondary btn-sm" onclick="window.adhiraApp.openAddSellerModal()">+ Add New Factory</button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="window.adhiraApp.resetSellerDetails()">↺ Reset Default</button>
              </div>
            </div>

            <!-- RAPID FROM GSTIN / FACTORY AUTO-SEARCH BOX -->
            <div style="background:linear-gradient(135deg, rgba(32,44,120,0.06) 0%, rgba(245,158,11,0.06) 100%);padding:12px 14px;border-radius:var(--radius-md);border:1px solid rgba(32,44,120,0.18);margin-bottom:14px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                <label class="form-label" style="color:var(--navy-950);font-size:11.5px;margin:0">⚡ Rapid Factory / From Search & Lookup</label>
                <span style="font-size:10.5px;color:var(--text-muted)">Search by GSTIN or Factory Name</span>
              </div>
              <div style="display:flex;gap:8px;">
                <input type="text" class="input" id="qSellerLookup" placeholder="e.g. 33QRQPS0659E1Z4 or ADHIRA..." style="font-weight:700;letter-spacing:0.04em;text-transform:uppercase" oninput="window.adhiraApp.lookupSellerByGstin(this.value)" />
                <button type="button" class="btn btn-primary btn-sm" onclick="window.adhiraApp.lookupSellerByGstin(document.getElementById('qSellerLookup').value)">Lookup</button>
              </div>
            </div>

            <div class="form-grid grid-3" style="margin-bottom:14px;">
              <div class="form-group col-span-2">
                <label class="form-label">Or Select Saved Factory / Sister Concern from Database <span class="req">*</span></label>
                <select class="select" id="qSellerSelect" onchange="window.adhiraApp.handleSellerSelect(this.value)">
                  <option value="">-- Choose saved factory / from profile --</option>
                  ${(db.sellers || []).map(sel => `
                    <option value="${sel.id}" ${(s.id === sel.id || s.name === sel.name) ? 'selected' : ''}>
                      ${escapeHtml(sel.name)} — GSTIN: ${escapeHtml(sel.gstin)} (${escapeHtml(sel.city || sel.state)})
                    </option>
                  `).join('')}
                </select>
              </div>
              <div class="form-group" style="display:flex;align-items:flex-end;">
                <button type="button" class="btn btn-gold btn-sm" style="width:100%;height:38px;" onclick="window.adhiraApp.saveCurrentSellerAsNewProfile()" title="Save these edited From details as a permanent Factory in database">
                  💾 Save As From Profile
                </button>
              </div>
            </div>

            <div class="from-details-panel">
              <div class="form-grid grid-3">
                <div class="form-group col-span-2">
                  <label class="form-label">Factory / Trade Name <span class="req">*</span></label>
                  <input type="text" class="input" id="qSellerName" value="${escapeHtml(s.name || '')}" oninput="window.adhiraApp.updateSellerField('name', this.value)" />
                </div>

                <div class="form-group">
                  <label class="form-label">Seller GSTIN <span class="req">*</span></label>
                  <input type="text" class="input" id="qSellerGstin" value="${escapeHtml(s.gstin || '')}" style="font-weight:700;letter-spacing:0.04em" oninput="window.adhiraApp.handleSellerGstinInput(this.value)" />
                  <span id="sellerGstinValidationNotice" style="font-size:10.5px;color:var(--text-muted)"></span>
                </div>

                <div class="form-group">
                  <label class="form-label">State Code</label>
                  <input type="text" class="input" id="qSellerStateCode" value="${escapeHtml(s.stateCode || '33')}" style="background:var(--bg-subtle)" readonly />
                </div>

                <div class="form-group col-span-2">
                  <label class="form-label">Factory Address</label>
                  <input type="text" class="input" id="qSellerAddr" value="${escapeHtml(s.address1 ? [s.address1, s.address2, s.area, s.city, s.pin].filter(Boolean).join(', ') : (s.address || ''))}" oninput="window.adhiraApp.updateSellerField('address1', this.value)" />
                </div>

                <div class="form-group">
                  <label class="form-label">ARN / Reg. Ref.</label>
                  <input type="text" class="input" id="qSellerArn" value="${escapeHtml(s.regArnRef || '')}" oninput="window.adhiraApp.updateSellerField('regArnRef', this.value)" />
                </div>

                <div class="form-group">
                  <label class="form-label">Phone</label>
                  <input type="text" class="input" id="qSellerPhone" value="${escapeHtml(s.phone || '')}" oninput="window.adhiraApp.updateSellerField('phone', this.value)" />
                </div>

                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="text" class="input" id="qSellerEmail" value="${escapeHtml(s.email || '')}" oninput="window.adhiraApp.updateSellerField('email', this.value)" />
                </div>
              </div>
            </div>
          </div>

          <!-- 1. CUSTOMER & SHOP SELECTION (TO DETAILS) -->
          <div class="card">
            <div class="section-divider-title">
              <h4>1. To (Customer / Shop Details)</h4>
              <div style="display:flex;gap:8px;">
                <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.openQuickCustomerModal()">+ Add New Shop</button>
              </div>
            </div>

            <!-- RAPID GST AUTO-SEARCH BOX -->
            <div style="background:linear-gradient(135deg, rgba(245,158,11,0.09) 0%, rgba(12,16,51,0.03) 100%);padding:12px 14px;border-radius:var(--radius-md);border:1px solid rgba(245,158,11,0.25);margin-bottom:14px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                <label class="form-label" style="color:var(--navy-950);font-size:11.5px;margin:0">⚡ Rapid Shop GSTIN Auto-Search & Lookup</label>
                <span style="font-size:10.5px;color:var(--text-muted)">Type or paste 15-digit GSTIN</span>
              </div>
              <div style="display:flex;gap:8px;">
                <input type="text" class="input" id="qGstinLookup" placeholder="e.g. 36JNYPS8775N1Z5 for MB & SONS..." maxlength="15" style="font-weight:700;letter-spacing:0.04em;text-transform:uppercase" oninput="window.adhiraApp.lookupCustomerByGstin(this.value)" />
                <button type="button" class="btn btn-gold btn-sm" onclick="window.adhiraApp.lookupCustomerByGstin(document.getElementById('qGstinLookup').value)">Auto-Fill</button>
              </div>
            </div>

            <div class="form-grid grid-3">
              <div class="form-group col-span-2">
                <label class="form-label">Or Select Existing Customer from Database <span class="req">*</span></label>
                <select class="select" id="qCustomerSelect" onchange="window.adhiraApp.handleCustomerSelect(this.value)">
                  <option value="">-- Choose saved customer / shop --</option>
                  ${db.customers.map(cust => `
                    <option value="${cust.id}" ${draftQuote.customerId === cust.id ? 'selected' : ''}>
                      ${escapeHtml(cust.name)} — GSTIN: ${escapeHtml(cust.gstin)} (${escapeHtml(cust.city || cust.state)})
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Quotation Number</label>
                <input type="text" class="input" id="qDocNumber" value="${escapeHtml(draftQuote.number)}" ${state.editingQuoteId ? 'readonly' : ''} />
              </div>

              <div class="form-group">
                <label class="form-label">Quotation Date <span class="req">*</span></label>
                <input type="date" class="input" id="qDate" value="${draftQuote.date}" onchange="window.adhiraApp.updateDraftField('date', this.value)" />
              </div>

              <div class="form-group">
                <label class="form-label">Valid Until</label>
                <input type="date" class="input" id="qValidUntil" value="${draftQuote.validUntil}" onchange="window.adhiraApp.updateDraftField('validUntil', this.value)" />
              </div>

              <div class="form-group">
                <label class="form-label">Buyer's Order / PO No.</label>
                <input type="text" class="input" id="qPoNumber" placeholder="e.g. PO-2026-081" value="${escapeHtml(draftQuote.poNumber || '')}" onchange="window.adhiraApp.updateDraftField('poNumber', this.value)" />
              </div>
            </div>

            <!-- CUSTOMER DETAILS AUTO-FILL FIELDS -->
            <div style="margin-top:14px;padding-top:14px;border-top:1px dashed var(--border-subtle)">
              <div class="form-grid grid-3">
                <div class="form-group">
                  <label class="form-label">Shop / Trade Name <span class="req">*</span></label>
                  <input type="text" class="input" id="qCustName" value="${escapeHtml(c.name || '')}" placeholder="Customer trade name" oninput="window.adhiraApp.updateCustomerField('name', this.value)" />
                </div>

                <div class="form-group">
                  <label class="form-label">Customer GSTIN <span class="req">*</span></label>
                  <input type="text" class="input" id="qCustGstin" value="${escapeHtml(c.gstin || '')}" placeholder="15-digit GSTIN" oninput="window.adhiraApp.handleGstinInput(this.value)" />
                  <span id="gstinValidationNotice" style="font-size:10.5px;color:var(--text-muted)"></span>
                </div>

                <div class="form-group">
                  <label class="form-label">Contact Phone / Mobile</label>
                  <input type="text" class="input" id="qCustPhone" value="${escapeHtml(c.phone || '')}" placeholder="10-digit mobile" oninput="window.adhiraApp.updateCustomerField('phone', this.value)" />
                </div>

                <div class="form-group col-span-2">
                  <label class="form-label">Billing Address (Buyer)</label>
                  <input type="text" class="input" id="qCustBilling" value="${escapeHtml(c.billingAddress || '')}" placeholder="Street address, landmark" oninput="window.adhiraApp.updateCustomerField('billingAddress', this.value)" />
                </div>

                <div class="form-group">
                  <label class="form-label">City / Town</label>
                  <input type="text" class="input" id="qCustCity" value="${escapeHtml(c.city || '')}" placeholder="City" oninput="window.adhiraApp.updateCustomerField('city', this.value)" />
                </div>

                <div class="form-group">
                  <label class="form-label">State <span class="req">*</span></label>
                  <select class="select" id="qCustState" onchange="window.adhiraApp.handleStateChange(this.value)">
                    ${STATE_CODES.map(st => `
                      <option value="${st.name}" data-code="${st.code}" ${c.state === st.name ? 'selected' : ''}>
                        ${st.code} — ${st.name}
                      </option>
                    `).join('')}
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">State Code</label>
                  <input type="text" class="input" id="qCustStateCode" value="${escapeHtml(c.stateCode || '33')}" readonly style="background:var(--bg-subtle)" />
                </div>

                <div class="form-group">
                  <label class="form-label">PIN Code</label>
                  <input type="text" class="input" id="qCustPin" value="${escapeHtml(c.pin || '')}" placeholder="6-digit PIN" oninput="window.adhiraApp.updateCustomerField('pin', this.value)" />
                </div>
              </div>

              <!-- SHIPPING ADDRESS TOGGLE -->
              <div style="margin-top:10px;display:flex;align-items:center;gap:8px;">
                <input type="checkbox" id="qSameAsBilling" ${draftQuote.sameAsBilling ? 'checked' : ''} onchange="window.adhiraApp.toggleSameAsBilling(this.checked)" />
                <label for="qSameAsBilling" style="font-size:12px;font-weight:600;color:var(--text-secondary);cursor:pointer">Consignee (Shipping Address) is the same as Billing Address</label>
              </div>

              <div id="shippingAddressRow" style="${draftQuote.sameAsBilling ? 'display:none;' : 'display:block;margin-top:10px;'}">
                <div class="form-group">
                  <label class="form-label">Shipping / Consignee Address</label>
                  <input type="text" class="input" id="qCustShipping" value="${escapeHtml(c.shippingAddress || '')}" placeholder="Consignee delivery address" oninput="window.adhiraApp.updateCustomerField('shippingAddress', this.value)" />
                </div>
              </div>
            </div>
          </div>

          <!-- 2. FIREWORKS PRODUCT ITEMS -->
          <div class="card">
            <div class="section-divider-title">
              <h4>2. Fireworks Product Items (GST 18% Editable)</h4>
              <div style="display:flex;gap:8px;">
                <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.openQuickProductModal()">+ Add New Product to Master</button>
                <button class="btn btn-gold btn-sm" onclick="window.adhiraApp.addQuoteItemRow()">+ Add Row</button>
              </div>
            </div>

            <!-- QUICK 1-TAP FIREWORKS PILLS -->
            <div class="fireworks-quick-picker">
              <span style="font-size:10.5px;font-weight:800;color:var(--text-muted);text-transform:uppercase;white-space:nowrap">⚡ 1-Tap Add:</span>
              ${db.products.map(p => `
                <button type="button" class="fireworks-chip" onclick="window.adhiraApp.quickAddProductToQuote('${p.id}')">
                  <span>🎆 ${escapeHtml(p.shortName || p.name)}</span>
                  <span class="chip-rate">₹${p.rate}</span>
                </button>
              `).join('')}
            </div>

            <div class="table-responsive">
              <table class="items-builder-table">
                <thead>
                  <tr>
                    <th style="width:35px">#</th>
                    <th style="width:230px">Description of Fireworks</th>
                    <th style="width:75px">HSN</th>
                    <th style="width:90px">Packing</th>
                    <th style="width:65px">Qty</th>
                    <th style="width:75px">Unit</th>
                    <th style="width:90px">Rate (₹)</th>
                    <th style="width:95px">Disc.</th>
                    <th style="width:65px">GST%</th>
                    <th style="width:95px;text-align:right">Taxable (₹)</th>
                    <th style="width:100px;text-align:right">Total (₹)</th>
                    <th style="width:90px;text-align:center">Actions</th>
                  </tr>
                </thead>
                <tbody id="quoteItemsTableBody">
                  ${draftQuote.items.map((item, idx) => renderQuoteItemRow(item, idx)).join('')}
                </tbody>
              </table>
            </div>

            <div style="margin-top:14px;display:flex;justify-content:space-between;align-items:center;">
              <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.addQuoteItemRow()">+ Add Another Item</button>
              <span style="font-size:11.5px;color:var(--text-muted)">Default Fireworks HSN: <b>3604</b> • GST: <b>18%</b> (Auto-calculated, all fields editable)</span>
            </div>
          </div>

          <!-- 3. ALL MB & SONS INVOICE LOGISTICS & TERMS FIELDS -->
          <div class="card">
            <div class="section-divider-title">
              <h4>3. Logistics, Transport & Terms (MB & SONS Format)</h4>
            </div>

            <div class="form-grid grid-4">
              <div class="form-group">
                <label class="form-label">Delivery Note No.</label>
                <input type="text" class="input" id="qDeliveryNote" value="${escapeHtml(draftQuote.deliveryNote || '')}" placeholder="e.g. DN-2026/04" oninput="window.adhiraApp.updateDraftField('deliveryNote', this.value)" />
              </div>

              <div class="form-group">
                <label class="form-label">Delivery Note Date</label>
                <input type="date" class="input" id="qDeliveryNoteDate" value="${draftQuote.deliveryNoteDate || ''}" onchange="window.adhiraApp.updateDraftField('deliveryNoteDate', this.value)" />
              </div>

              <div class="form-group">
                <label class="form-label">Supplier's Ref. / Order No.</label>
                <input type="text" class="input" id="qSupplierRef" value="${escapeHtml(draftQuote.supplierRef || '')}" placeholder="e.g. ADH/26/88" oninput="window.adhiraApp.updateDraftField('supplierRef', this.value)" />
              </div>

              <div class="form-group">
                <label class="form-label">Other Reference(s)</label>
                <input type="text" class="input" id="qOtherRef" value="${escapeHtml(draftQuote.otherReferences || '')}" placeholder="e.g. Sivakasi Consignment" oninput="window.adhiraApp.updateDraftField('otherReferences', this.value)" />
              </div>

              <div class="form-group">
                <label class="form-label">Despatch Document No. (LR)</label>
                <input type="text" class="input" id="qDespatchDocNo" value="${escapeHtml(draftQuote.despatchDocNo || '')}" placeholder="e.g. LR-99884" oninput="window.adhiraApp.updateDraftField('despatchDocNo', this.value)" />
              </div>

              <div class="form-group">
                <label class="form-label">Despatched Through</label>
                <input type="text" class="input" id="qDispatchThrough" value="${escapeHtml(draftQuote.dispatchThrough || '')}" placeholder="e.g. ARC / VRL / Party Truck" oninput="window.adhiraApp.updateDraftField('dispatchThrough', this.value)" />
              </div>

              <div class="form-group">
                <label class="form-label">Destination (Town)</label>
                <input type="text" class="input" id="qDestination" value="${escapeHtml(draftQuote.destination || c.city || '')}" placeholder="Destination city" oninput="window.adhiraApp.updateDraftField('destination', this.value)" />
              </div>

              <div class="form-group">
                <label class="form-label">Motor Vehicle Number</label>
                <input type="text" class="input" id="qMotorVehicleNo" value="${escapeHtml(draftQuote.motorVehicleNo || '')}" placeholder="e.g. TN 67 AB 1234" oninput="window.adhiraApp.updateDraftField('motorVehicleNo', this.value)" />
              </div>

              <div class="form-group">
                <label class="form-label">Bill of Lading / LR-RR No.</label>
                <input type="text" class="input" id="qBillOfLading" value="${escapeHtml(draftQuote.billOfLadingNo || '')}" placeholder="e.g. BL-77661" oninput="window.adhiraApp.updateDraftField('billOfLadingNo', this.value)" />
              </div>

              <div class="form-group">
                <label class="form-label">Mode / Terms of Payment</label>
                <select class="select" id="qPaymentTerms" onchange="window.adhiraApp.updateDraftField('paymentTerms', this.value)">
                  <option value="100% Advance" ${draftQuote.paymentTerms === '100% Advance' ? 'selected' : ''}>100% Advance</option>
                  <option value="Advance" ${draftQuote.paymentTerms === 'Advance' ? 'selected' : ''}>Advance</option>
                  <option value="50% Advance & Balance on Loading" ${draftQuote.paymentTerms === '50% Advance & Balance on Loading' ? 'selected' : ''}>50% Advance & Balance on Loading</option>
                  <option value="15 Days Credit" ${draftQuote.paymentTerms === '15 Days Credit' ? 'selected' : ''}>15 Days Credit</option>
                  <option value="30 Days Net" ${draftQuote.paymentTerms === '30 Days Net' ? 'selected' : ''}>30 Days Net</option>
                </select>
              </div>

              <div class="form-group col-span-2">
                <label class="form-label">Terms of Delivery</label>
                <input type="text" class="input" id="qTermsOfDelivery" value="${escapeHtml(draftQuote.termsOfDelivery || 'Ex-Factory Sivakasi, To-Pay Freight')}" oninput="window.adhiraApp.updateDraftField('termsOfDelivery', this.value)" />
              </div>

              <div class="form-group col-span-4">
                <label class="form-label">Special Notes & Remarks</label>
                <textarea class="textarea" rows="2" id="qNotes" placeholder="Special delivery instructions or terms..." oninput="window.adhiraApp.updateDraftField('notes', this.value)">${escapeHtml(draftQuote.notes || '')}</textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: STICKY LIVE SUMMARY -->
        <div class="sticky-summary">
          <div class="summary-financials-box">
            <div class="section-divider-title" style="margin-bottom:12px;">
              <h4>Quotation Summary</h4>
              <span class="tax-badge-pill ${summary.isInterstate ? 'interstate' : 'intrastate'}">
                ${summary.isInterstate ? 'Interstate (IGST 18%)' : 'Intrastate (CGST 9% + SGST 9%)'}
              </span>
            </div>

            <div class="summary-row">
              <span>Gross Total</span>
              <b id="lblGrossTotal">${formatMoney(summary.subtotal)}</b>
            </div>

            <div class="summary-row">
              <span>Total Discount</span>
              <b id="lblDiscountTotal" style="color:var(--rose-600)">-${formatMoney(summary.totalDiscount)}</b>
            </div>

            <div class="summary-row">
              <span>Taxable Value</span>
              <b id="lblTaxableTotal">${formatMoney(summary.taxableAmount)}</b>
            </div>

            ${summary.isInterstate ? `
              <div class="summary-row">
                <span>Integrated GST (IGST 18%)</span>
                <b id="lblIgst">${formatMoney(summary.igst)}</b>
              </div>
            ` : `
              <div class="summary-row">
                <span>Central GST (CGST 9%)</span>
                <b id="lblCgst">${formatMoney(summary.cgst)}</b>
              </div>
              <div class="summary-row">
                <span>State GST (SGST 9%)</span>
                <b id="lblSgst">${formatMoney(summary.sgst)}</b>
              </div>
            `}

            <div class="summary-row">
              <span>Round Off</span>
              <b id="lblRoundOff">${summary.roundOff >= 0 ? '+' : ''}${formatMoney(summary.roundOff)}</b>
            </div>

            <div class="summary-row grand-total">
              <div>
                <div class="gt-label">Grand Total</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.7)">Inclusive of all taxes</div>
              </div>
              <div class="gt-val" id="lblGrandTotal">${formatMoney(summary.grandTotal)}</div>
            </div>

            <div style="margin-top:12px;font-size:10.5px;color:var(--text-muted);line-height:1.4">
              <b>Amount in Words:</b><br>
              <span id="lblAmountWords">${convertAmountToWords(summary.grandTotal)}</span>
            </div>

            <div style="margin-top:20px;display:flex;flex-direction:column;gap:10px;">
              <button class="btn btn-gold btn-lg" onclick="window.adhiraApp.saveQuotation()">
                <span>💾</span> Save Quotation
              </button>
              
              <button class="btn btn-secondary" onclick="window.adhiraApp.previewDraftQuotation()">
                <span>📄</span> Live A4 PDF Preview
              </button>

              <button class="btn btn-danger btn-sm" onclick="window.adhiraApp.discardDraft()">
                Discard Draft
              </button>
            </div>

            <div style="margin-top:14px;">
              <div class="autosave-status" id="autosaveIndicator">
                <span class="autosave-dot"></span>
                <span id="autosaveText">${state.lastAutosaveTime ? `Autosaved at ${state.lastAutosaveTime}` : 'Autosave active'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- MOBILE STICKY BOTTOM DOCK -->
        <div class="mobile-quote-dock">
          <div>
            <span style="font-size:10px;color:var(--text-muted);display:block">Grand Total:</span>
            <b style="font-size:16px;color:var(--navy-950)" id="mobGrandTotal">${formatMoney(summary.grandTotal)}</b>
          </div>
          <div style="display:flex;gap:6px;align-items:center;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.adhiraApp.openMobileSummaryModal()">📊 Breakdown</button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.adhiraApp.previewDraftQuotation()">👁️ PDF</button>
            <button type="button" class="btn btn-gold btn-sm" onclick="window.adhiraApp.saveQuotation()">💾 Save</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderQuoteItemRow(item, idx) {
    const calc = calculateItemLine(item);

    return `
      <tr data-row="${idx}">
        <td style="text-align:center;font-weight:700;color:var(--text-muted)">${idx + 1}</td>
        <td>
          <select class="select" onchange="window.adhiraApp.handleRowProductSelect(${idx}, this.value)">
            <option value="">-- Choose product or type below --</option>
            ${db.products.map(p => `
              <option value="${p.id}" ${item.productId === p.id ? 'selected' : ''}>
                ${escapeHtml(p.name)} (${p.packing || '1 Pcs'}) - ₹${p.rate}
              </option>
            `).join('')}
          </select>
          <input type="text" class="input" style="margin-top:4px" placeholder="Custom product description" value="${escapeHtml(item.name || '')}" oninput="window.adhiraApp.updateItemField(${idx}, 'name', this.value)" />
        </td>
        <td>
          <input type="text" class="input" value="${escapeHtml(item.hsn || '3604')}" oninput="window.adhiraApp.updateItemField(${idx}, 'hsn', this.value)" />
        </td>
        <td>
          <input type="text" class="input" value="${escapeHtml(item.packing || '')}" placeholder="1 (3 Pcs)" oninput="window.adhiraApp.updateItemField(${idx}, 'packing', this.value)" />
        </td>
        <td>
          <div class="qty-stepper-wrap">
            <button type="button" class="qty-step-btn" onclick="window.adhiraApp.stepItemQty(${idx}, -1)" title="Decrease">−</button>
            <input type="number" class="input qty-input" id="rowQty_${idx}" min="1" step="1" value="${item.qty || 1}" oninput="window.adhiraApp.updateItemField(${idx}, 'qty', this.value)" />
            <button type="button" class="qty-step-btn" onclick="window.adhiraApp.stepItemQty(${idx}, 1)" title="Increase">+</button>
          </div>
        </td>
        <td>
          <select class="select" onchange="window.adhiraApp.updateItemField(${idx}, 'unit', this.value)">
            <option value="CASE" ${item.unit === 'CASE' ? 'selected' : ''}>CASE</option>
            <option value="BOX" ${item.unit === 'BOX' ? 'selected' : ''}>BOX</option>
            <option value="PCS" ${item.unit === 'PCS' ? 'selected' : ''}>PCS</option>
            <option value="PKT" ${item.unit === 'PKT' ? 'selected' : ''}>PKT</option>
          </select>
        </td>
        <td>
          <input type="number" class="input" min="0" step="any" value="${item.rate || 0}" oninput="window.adhiraApp.updateItemField(${idx}, 'rate', this.value)" />
        </td>
        <td>
          <input type="number" class="input" min="0" step="any" placeholder="₹" value="${item.discount || 0}" oninput="window.adhiraApp.updateItemField(${idx}, 'discount', this.value)" />
        </td>
        <td>
          <input type="number" class="input" min="0" max="28" step="any" value="${item.gst || 18}" oninput="window.adhiraApp.updateItemField(${idx}, 'gst', this.value)" />
        </td>
        <td style="text-align:right;font-weight:600" id="rowTaxable_${idx}">
          ${formatMoney(calc.taxable)}
        </td>
        <td style="text-align:right;font-weight:700" id="rowTotal_${idx}">
          ${formatMoney(calc.total)}
        </td>
        <td>
          <div class="row-actions-group">
            <button class="row-btn" onclick="window.adhiraApp.moveRow(${idx}, -1)" title="Move Up">▲</button>
            <button class="row-btn" onclick="window.adhiraApp.moveRow(${idx}, 1)" title="Move Down">▼</button>
            <button class="row-btn" onclick="window.adhiraApp.duplicateRow(${idx})" title="Duplicate Row">📋</button>
            <button class="row-btn delete" onclick="window.adhiraApp.removeRow(${idx})" title="Remove Row">✕</button>
          </div>
        </td>
      </tr>
    `;
  }

  function attachQuotationEditorListeners() {
    if (state.autosaveTimer) clearInterval(state.autosaveTimer);
    state.autosaveTimer = setInterval(() => {
      if (draftQuote && state.page === 'new-quotation') {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draftQuote));
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        state.lastAutosaveTime = now;
        const txt = document.getElementById('autosaveText');
        if (txt) txt.textContent = `Autosaved at ${now}`;
      }
    }, 2500);
  }

  function updateLiveQuotationSummary() {
    if (!draftQuote) return;
    const summary = calculateDocumentSummary(draftQuote.items, draftQuote.customer.stateCode);

    draftQuote.items.forEach((it, idx) => {
      const calc = calculateItemLine(it);
      const taxEl = document.getElementById(`rowTaxable_${idx}`);
      const totEl = document.getElementById(`rowTotal_${idx}`);
      if (taxEl) taxEl.textContent = formatMoney(calc.taxable);
      if (totEl) totEl.textContent = formatMoney(calc.total);
    });

    const elGross = document.getElementById('lblGrossTotal');
    const elDisc = document.getElementById('lblDiscountTotal');
    const elTax = document.getElementById('lblTaxableTotal');
    const elRound = document.getElementById('lblRoundOff');
    const elGrand = document.getElementById('lblGrandTotal');
    const elWords = document.getElementById('lblAmountWords');
    const mobGrand = document.getElementById('mobGrandTotal');

    if (elGross) elGross.textContent = formatMoney(summary.subtotal);
    if (elDisc) elDisc.textContent = `-${formatMoney(summary.totalDiscount)}`;
    if (elTax) elTax.textContent = formatMoney(summary.taxableAmount);
    if (elRound) elRound.textContent = `${summary.roundOff >= 0 ? '+' : ''}${formatMoney(summary.roundOff)}`;
    if (elGrand) elGrand.textContent = formatMoney(summary.grandTotal);
    if (mobGrand) mobGrand.textContent = formatMoney(summary.grandTotal);
    if (elWords) elWords.textContent = convertAmountToWords(summary.grandTotal);

    const elIgst = document.getElementById('lblIgst');
    const elCgst = document.getElementById('lblCgst');
    const elSgst = document.getElementById('lblSgst');

    if (summary.isInterstate) {
      if (elIgst) elIgst.textContent = formatMoney(summary.igst);
    } else {
      if (elCgst) elCgst.textContent = formatMoney(summary.cgst);
      if (elSgst) elSgst.textContent = formatMoney(summary.sgst);
    }
  }

  // ==========================================================================
  // MODULE 4: INVOICES
  // ==========================================================================

  function renderInvoicesPage() {
    let filtered = db.invoices.slice();

    if (state.invoiceFilterStatus !== 'All') {
      filtered = filtered.filter(i => (i.paymentStatus || i.status) === state.invoiceFilterStatus);
    }

    if (state.invoiceSearch.trim()) {
      const q = state.invoiceSearch.toLowerCase().trim();
      filtered = filtered.filter(inv => {
        return (
          inv.number.toLowerCase().includes(q) ||
          inv.customer.name.toLowerCase().includes(q) ||
          (inv.customer.gstin && inv.customer.gstin.toLowerCase().includes(q)) ||
          (inv.ewayBillNo && inv.ewayBillNo.includes(q)) ||
          inv.date.includes(q)
        );
      });
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    return `
      <div class="card">
        <div class="toolbar">
          <div class="toolbar-left">
            <div class="input-search-box">
              <span class="input-search-icon">🔍</span>
              <input type="text" class="input" id="invoiceSearchInput" placeholder="Search Invoice No, Customer, GSTIN, E-Way Bill..." value="${escapeHtml(state.invoiceSearch)}" />
            </div>

            <select class="select" id="invoiceStatusFilter" style="width:160px;">
              <option value="All" ${state.invoiceFilterStatus === 'All' ? 'selected' : ''}>All Payments</option>
              <option value="Paid" ${state.invoiceFilterStatus === 'Paid' ? 'selected' : ''}>Paid</option>
              <option value="Unpaid" ${state.invoiceFilterStatus === 'Unpaid' ? 'selected' : ''}>Unpaid</option>
              <option value="Partially Paid" ${state.invoiceFilterStatus === 'Partially Paid' ? 'selected' : ''}>Partially Paid</option>
            </select>
          </div>

          <div class="toolbar-right">
            <button class="btn btn-secondary" onclick="window.adhiraApp.exportInvoicesCsv()">
              <span>📥</span> Export CSV
            </button>
            <button class="btn btn-gold" onclick="window.adhiraApp.navigate('quotations')">
              <span>+</span> Convert from Quote
            </button>
          </div>
        </div>

        ${filtered.length > 0 ? `
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Quote Ref</th>
                  <th>E-Way Bill</th>
                  <th class="num">Taxable</th>
                  <th class="num">Grand Total</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${filtered.map(inv => `
                  <tr>
                    <td class="strong">${escapeHtml(inv.number)}</td>
                    <td>
                      <b>${escapeHtml(inv.customer.name)}</b>
                      <div style="font-size:11px;color:var(--text-muted)">GSTIN: ${escapeHtml(inv.customer.gstin || '—')}</div>
                    </td>
                    <td>${escapeHtml(inv.date)}</td>
                    <td><span style="font-family:monospace;font-size:11.5px">${escapeHtml(inv.quotationNumber || '—')}</span></td>
                    <td><span style="font-family:monospace;font-size:11.5px">${escapeHtml(inv.ewayBillNo || '—')}</span></td>
                    <td class="num">${formatMoney(inv.taxable)}</td>
                    <td class="num strong">${formatMoney(inv.grandTotal)}</td>
                    <td><span class="badge badge-${(inv.paymentStatus || inv.status).toLowerCase()}">${inv.paymentStatus || inv.status}</span></td>
                    <td>
                      <div style="display:flex;gap:4px;">
                        <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.viewDocument('invoice', '${inv.id}')">View</button>
                        <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.editInvoicePayment('${inv.id}')">Status</button>
                        <button class="btn btn-danger btn-sm" onclick="window.adhiraApp.deleteInvoice('${inv.id}')">✕</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">🧾</div>
            <h4 class="empty-state-title">No Tax Invoices Yet</h4>
            <p class="empty-state-desc">Quotations can be easily converted to formal tax invoices with E-Way Bill details.</p>
            <button class="btn btn-gold" onclick="window.adhiraApp.navigate('quotations')">Go to Quotations</button>
          </div>
        `}
      </div>
    `;
  }

  function attachInvoicesListeners() {
    const search = document.getElementById('invoiceSearchInput');
    if (search) {
      search.oninput = (e) => {
        state.invoiceSearch = e.target.value;
        renderCurrentPage();
      };
    }

    const filter = document.getElementById('invoiceStatusFilter');
    if (filter) {
      filter.onchange = (e) => {
        state.invoiceFilterStatus = e.target.value;
        renderCurrentPage();
      };
    }
  }

  // ==========================================================================
  // MODULE 5: CUSTOMER / SHOP MASTER
  // ==========================================================================

  function renderCustomersPage() {
    let filtered = db.customers.slice();

    if (state.customerSearch.trim()) {
      const q = state.customerSearch.toLowerCase().trim();
      filtered = filtered.filter(c => {
        return (
          c.name.toLowerCase().includes(q) ||
          (c.legalName && c.legalName.toLowerCase().includes(q)) ||
          c.gstin.toLowerCase().includes(q) ||
          (c.city && c.city.toLowerCase().includes(q)) ||
          (c.phone && c.phone.includes(q)) ||
          c.state.toLowerCase().includes(q)
        );
      });
    }

    filtered.sort((a, b) => a.name.localeCompare(b.name));

    return `
      <div class="card">
        <div class="toolbar">
          <div class="toolbar-left">
            <div class="input-search-box">
              <span class="input-search-icon">🔍</span>
              <input type="text" class="input" id="custSearchInput" placeholder="Search shop name, GSTIN, city, mobile..." value="${escapeHtml(state.customerSearch)}" />
            </div>
          </div>

          <div class="toolbar-right">
            <button class="btn btn-secondary" onclick="window.adhiraApp.exportCustomersCsv()">
              <span>📥</span> Export CSV
            </button>
            <button class="btn btn-gold" onclick="window.adhiraApp.openCustomerModal()">
              <span>+</span> Add New Customer
            </button>
          </div>
        </div>

        ${filtered.length > 0 ? `
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Shop / Trade Name</th>
                  <th>Legal Name</th>
                  <th>GSTIN</th>
                  <th>Location</th>
                  <th>Phone</th>
                  <th>Payment Terms</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${filtered.map(c => `
                  <tr>
                    <td class="strong">
                      ${escapeHtml(c.name)}
                      <div style="font-size:11px;color:var(--text-muted)">ID: ${escapeHtml(c.id)}</div>
                    </td>
                    <td>${escapeHtml(c.legalName || c.name)}</td>
                    <td><span style="font-family:monospace;font-weight:700;font-size:12px">${escapeHtml(c.gstin)}</span></td>
                    <td>${escapeHtml(c.city || '')}, ${escapeHtml(c.state || '')} (${escapeHtml(c.stateCode || '')})</td>
                    <td>${escapeHtml(c.phone || '—')}</td>
                    <td>${escapeHtml(c.paymentTerms || 'Advance')}</td>
                    <td><span class="badge ${c.status === 'Active' ? 'badge-accepted' : 'badge-draft'}">${c.status}</span></td>
                    <td>
                      <div style="display:flex;gap:4px;">
                        <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.startQuoteForCustomer('${c.id}')">+ Quote</button>
                        <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.editCustomer('${c.id}')">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="window.adhiraApp.deleteCustomer('${c.id}')">✕</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">🏢</div>
            <h4 class="empty-state-title">No Customers Found</h4>
            <p class="empty-state-desc">Save your fireworks buyers with their GSTIN and billing address.</p>
            <button class="btn btn-gold" onclick="window.adhiraApp.openCustomerModal()">+ Add Customer</button>
          </div>
        `}
      </div>
    `;
  }

  function attachCustomersListeners() {
    const input = document.getElementById('custSearchInput');
    if (input) {
      input.oninput = (e) => {
        state.customerSearch = e.target.value;
        renderCurrentPage();
      };
    }
  }

  // ==========================================================================
  // MODULE 6: PRODUCT MASTER
  // ==========================================================================

  function renderProductsPage() {
    let filtered = db.products.slice();

    if (state.productCategoryFilter !== 'All') {
      filtered = filtered.filter(p => p.category === state.productCategoryFilter);
    }

    if (state.productSearch.trim()) {
      const q = state.productSearch.toLowerCase().trim();
      filtered = filtered.filter(p => {
        return (
          p.name.toLowerCase().includes(q) ||
          (p.shortName && p.shortName.toLowerCase().includes(q)) ||
          p.hsn.toLowerCase().includes(q) ||
          p.packing.toLowerCase().includes(q)
        );
      });
    }

    return `
      <div class="card">
        <div class="toolbar">
          <div class="toolbar-left">
            <div class="input-search-box">
              <span class="input-search-icon">🔍</span>
              <input type="text" class="input" id="prodSearchInput" placeholder="Search product name, HSN, packing..." value="${escapeHtml(state.productSearch)}" />
            </div>

            <select class="select" id="prodCategoryFilter" style="width:180px;">
              <option value="All" ${state.productCategoryFilter === 'All' ? 'selected' : ''}>All Categories</option>
              ${db.categories.map(cat => `
                <option value="${cat}" ${state.productCategoryFilter === cat ? 'selected' : ''}>${cat}</option>
              `).join('')}
            </select>

            <div style="display:flex;border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow:hidden">
              <button class="btn btn-sm ${state.productViewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}" onclick="window.adhiraApp.setProductView('grid')">Grid</button>
              <button class="btn btn-sm ${state.productViewMode === 'table' ? 'btn-primary' : 'btn-secondary'}" onclick="window.adhiraApp.setProductView('table')">Table</button>
            </div>
          </div>

          <div class="toolbar-right">
            <button class="btn btn-secondary" onclick="window.adhiraApp.exportProductsCsv()">
              <span>📥</span> Export CSV
            </button>
            <button class="btn btn-gold" onclick="window.adhiraApp.openProductModal()">
              <span>+</span> Add Product
            </button>
          </div>
        </div>

        ${filtered.length > 0 ? (state.productViewMode === 'grid' ? `
          <div class="grid-product">
            ${filtered.map(p => `
              <div class="product-card">
                <div class="product-card-img">
                  ${p.image ? `
                    <img src="${p.image}" alt="${escapeHtml(p.name)}" />
                  ` : `
                    <span style="font-size:36px;opacity:0.4">🎆</span>
                  `}
                  <span class="product-card-category">${escapeHtml(p.category || 'Fireworks')}</span>
                </div>
                <div class="product-card-body">
                  <div>
                    <h4 class="product-name-title">${escapeHtml(p.name)}</h4>
                    <div class="product-specs-sub">HSN: <b>${escapeHtml(p.hsn || '3604')}</b> • Pack: <b>${escapeHtml(p.packing)}</b></div>
                  </div>

                  <div>
                    <div class="product-pricing-strip">
                      <div>
                        <div class="product-price-main">${formatMoney(p.rate)}</div>
                        <span style="font-size:10px;color:var(--text-muted)">Rate / ${escapeHtml(p.unit || 'CASE')}</span>
                      </div>
                      ${p.caseRate ? `
                        <div style="text-align:right">
                          <div class="product-case-spec">${p.caseRate} / Case</div>
                          <span style="font-size:10px;color:var(--text-muted)">₹${round2(p.rate * p.caseRate)}/cs</span>
                        </div>
                      ` : ''}
                    </div>

                    <div class="product-actions-bar">
                      <button class="btn btn-secondary btn-sm" style="flex:1" onclick="window.adhiraApp.editProduct('${p.id}')">Edit</button>
                      <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.duplicateProduct('${p.id}')" title="Duplicate">📋</button>
                      <button class="btn btn-danger btn-sm" onclick="window.adhiraApp.deleteProduct('${p.id}')" title="Delete">✕</button>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>HSN/SAC</th>
                  <th>Box / Packing</th>
                  <th>Unit</th>
                  <th class="num">Rate (₹)</th>
                  <th class="num">Case Count</th>
                  <th class="num">Case Amount (₹)</th>
                  <th>GST %</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${filtered.map(p => `
                  <tr>
                    <td class="strong">
                      <div style="display:flex;align-items:center;gap:10px;">
                        ${p.image ? `<img src="${p.image}" style="width:32px;height:32px;border-radius:6px;object-fit:cover" />` : ''}
                        <span>${escapeHtml(p.name)}</span>
                      </div>
                    </td>
                    <td>${escapeHtml(p.category || '—')}</td>
                    <td><span style="font-family:monospace">${escapeHtml(p.hsn || '3604')}</span></td>
                    <td>${escapeHtml(p.packing || '—')}</td>
                    <td>${escapeHtml(p.unit || 'CASE')}</td>
                    <td class="num strong">${formatMoney(p.rate)}</td>
                    <td class="num">${p.caseRate || '—'}</td>
                    <td class="num">${p.caseRate ? formatMoney(p.rate * p.caseRate) : '—'}</td>
                    <td>${p.gst || 18}%</td>
                    <td>
                      <div style="display:flex;gap:4px;">
                        <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.editProduct('${p.id}')">Edit</button>
                        <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.duplicateProduct('${p.id}')">Copy</button>
                        <button class="btn btn-danger btn-sm" onclick="window.adhiraApp.deleteProduct('${p.id}')">✕</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `) : `
          <div class="empty-state">
            <div class="empty-state-icon">🎆</div>
            <h4 class="empty-state-title">No Products Found</h4>
            <p class="empty-state-desc">Add your fireworks product catalog to create fast quotations.</p>
            <button class="btn btn-gold" onclick="window.adhiraApp.openProductModal()">+ Add Product</button>
          </div>
        `}
      </div>
    `;
  }

  function attachProductsListeners() {
    const search = document.getElementById('prodSearchInput');
    if (search) {
      search.oninput = (e) => {
        state.productSearch = e.target.value;
        renderCurrentPage();
      };
    }

    const catFilter = document.getElementById('prodCategoryFilter');
    if (catFilter) {
      catFilter.onchange = (e) => {
        state.productCategoryFilter = e.target.value;
        renderCurrentPage();
      };
    }
  }

  // ==========================================================================
  // MODULE 6b: PRODUCT CATEGORIES MANAGEMENT
  // ==========================================================================

  function renderCategoriesPage() {
    const categories = db.categories || [];

    // Count products per category
    const catCounts = {};
    (db.products || []).forEach(p => {
      const cat = p.category || 'Uncategorized';
      catCounts[cat] = (catCounts[cat] || 0) + 1;
    });

    const catIcons = {
      'Fountains & Smoke': '💨',
      'Aerial & Crackers': '🎇',
      'Sparklers & Showers': '✨',
      'Novelty Fireworks': '🎭',
      'Sound Crackers': '💥',
      'Gift Boxes': '🎁'
    };

    return `
      <div class="card" style="margin-bottom:20px;">
        <div class="toolbar">
          <div class="toolbar-left">
            <div style="font-size:12.5px;color:var(--text-secondary)">
              Manage product categories for fireworks catalog. Categories are used in product master and quotation filters.
            </div>
          </div>
          <div class="toolbar-right">
            <button class="btn btn-gold" onclick="window.adhiraApp.openAddCategoryModal()">
              <span>+</span> Add Category
            </button>
          </div>
        </div>

        ${categories.length > 0 ? `
          <div class="category-list-grid">
            ${categories.map(cat => `
              <div class="category-card">
                <div class="category-card-icon">
                  ${catIcons[cat] || '🏷️'}
                </div>
                <div style="flex:1;min-width:0;">
                  <div class="category-card-name">${escapeHtml(cat)}</div>
                  <div class="category-card-count">${catCounts[cat] || 0} product(s)</div>
                </div>
                <div class="category-card-actions">
                  <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.openEditCategoryModal('${escapeHtml(cat)}')" title="Rename Category">✎</button>
                  <button class="btn btn-danger btn-sm" onclick="window.adhiraApp.deleteCategory('${escapeHtml(cat)}')" title="Delete Category">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">🏷️</div>
            <h4 class="empty-state-title">No Categories Yet</h4>
            <p class="empty-state-desc">Add product categories to organize your fireworks catalog.</p>
            <button class="btn btn-gold" onclick="window.adhiraApp.openAddCategoryModal()">+ Add First Category</button>
          </div>
        `}
      </div>

      <!-- Category Usage Info -->
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Category Usage Summary</h3>
            <p class="card-subtitle">Products assigned to each category in product master</p>
          </div>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th class="num">Products</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${categories.map(cat => `
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:10px">
                      <span style="font-size:20px">${catIcons[cat] || '🏷️'}</span>
                      <b>${escapeHtml(cat)}</b>
                    </div>
                  </td>
                  <td class="num">${catCounts[cat] || 0}</td>
                  <td>
                    <div style="display:flex;gap:4px">
                      <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.navigate('products'); window.adhiraApp.filterProductsByCategory('${escapeHtml(cat)}')">View Products</button>
                      <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.openEditCategoryModal('${escapeHtml(cat)}')">Rename</button>
                      <button class="btn btn-danger btn-sm" onclick="window.adhiraApp.deleteCategory('${escapeHtml(cat)}')">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function attachCategoriesListeners() {}

  // ==========================================================================
  // MODULE 7: REPORTS & GST ANALYTICS
  // ==========================================================================

  function renderReportsPage() {
    const quotes = db.quotations;
    const totalTaxable = quotes.reduce((acc, q) => acc + (q.taxable || 0), 0);
    const totalGst = quotes.reduce((acc, q) => acc + (q.gstTotal || 0), 0);
    const totalCgst = quotes.reduce((acc, q) => acc + (q.cgst || 0), 0);
    const totalSgst = quotes.reduce((acc, q) => acc + (q.sgst || 0), 0);
    const totalIgst = quotes.reduce((acc, q) => acc + (q.igst || 0), 0);

    const customerSales = {};
    quotes.forEach(q => {
      const name = q.customer.name || 'Unknown';
      if (!customerSales[name]) {
        customerSales[name] = { count: 0, taxable: 0, total: 0 };
      }
      customerSales[name].count += 1;
      customerSales[name].taxable += (q.taxable || 0);
      customerSales[name].total += (q.grandTotal || 0);
    });

    const productSales = {};
    quotes.forEach(q => {
      (q.items || []).forEach(it => {
        const name = it.name || 'Custom Item';
        if (!productSales[name]) {
          productSales[name] = { qty: 0, amount: 0 };
        }
        productSales[name].qty += Number(it.qty) || 0;
        productSales[name].amount += Number(it.total) || 0;
      });
    });

    const topProducts = Object.entries(productSales).sort((a, b) => b[1].amount - a[1].amount).slice(0, 5);

    return `
      <div style="display:flex;flex-direction:column;gap:20px;">
        <div class="stats-grid">
          <div class="stat-card gold">
            <div class="stat-top">
              <span class="stat-label">Total Taxable Sales</span>
              <span class="stat-icon">💰</span>
            </div>
            <div class="stat-value">${formatMoney(totalTaxable)}</div>
            <div class="stat-bottom">Excluding GST</div>
          </div>

          <div class="stat-card emerald">
            <div class="stat-top">
              <span class="stat-label">Total GST Collected</span>
              <span class="stat-icon">🏛️</span>
            </div>
            <div class="stat-value">${formatMoney(totalGst)}</div>
            <div class="stat-bottom">CGST + SGST + IGST</div>
          </div>

          <div class="stat-card sky">
            <div class="stat-top">
              <span class="stat-label">Interstate IGST (36 etc.)</span>
              <span class="stat-icon">🚚</span>
            </div>
            <div class="stat-value">${formatMoney(totalIgst)}</div>
            <div class="stat-bottom">Outside Tamil Nadu</div>
          </div>

          <div class="stat-card">
            <div class="stat-top">
              <span class="stat-label">Intrastate CGST + SGST</span>
              <span class="stat-icon">🏢</span>
            </div>
            <div class="stat-value">${formatMoney(totalCgst + totalSgst)}</div>
            <div class="stat-bottom">Tamil Nadu Local (33)</div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title">GST Tax Liability Summary</h3>
              <p class="card-subtitle">Tax split by component as required for GSTR-1 preparation</p>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.exportGstCsv()">📥 Export GST CSV</button>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Tax Component</th>
                  <th>Applicability</th>
                  <th class="num">Taxable Value</th>
                  <th class="num">Tax Amount</th>
                  <th class="num">% of Total GST</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="strong">CGST (Central Tax)</td>
                  <td>Within Tamil Nadu (Intrastate)</td>
                  <td class="num">${formatMoney(quotes.filter(q => q.cgst > 0).reduce((a, b) => a + b.taxable, 0))}</td>
                  <td class="num strong">${formatMoney(totalCgst)}</td>
                  <td class="num">${totalGst ? round2((totalCgst / totalGst) * 100) : 0}%</td>
                </tr>
                <tr>
                  <td class="strong">SGST (State Tax)</td>
                  <td>Within Tamil Nadu (Intrastate)</td>
                  <td class="num">${formatMoney(quotes.filter(q => q.sgst > 0).reduce((a, b) => a + b.taxable, 0))}</td>
                  <td class="num strong">${formatMoney(totalSgst)}</td>
                  <td class="num">${totalGst ? round2((totalSgst / totalGst) * 100) : 0}%</td>
                </tr>
                <tr>
                  <td class="strong">IGST (Integrated Tax)</td>
                  <td>Interstate (Telangana, Karnataka, etc.)</td>
                  <td class="num">${formatMoney(quotes.filter(q => q.igst > 0).reduce((a, b) => a + b.taxable, 0))}</td>
                  <td class="num strong">${formatMoney(totalIgst)}</td>
                  <td class="num">${totalGst ? round2((totalGst / totalGst) * 100) : 0}%</td>
                </tr>
                <tr style="background:var(--bg-subtle);font-weight:800">
                  <td>TOTAL TAX GENERATED</td>
                  <td>Combined</td>
                  <td class="num">${formatMoney(totalTaxable)}</td>
                  <td class="num strong" style="font-size:14px">${formatMoney(totalGst)}</td>
                  <td class="num">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Top Fireworks by Value</h3>
            </div>
            ${topProducts.length > 0 ? `
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${topProducts.map(([name, data], i) => `
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--bg-subtle);border-radius:var(--radius-md);">
                    <div style="display:flex;align-items:center;gap:12px;">
                      <span style="font-weight:800;color:var(--gold-600);width:20px">${i + 1}</span>
                      <div>
                        <b>${escapeHtml(name)}</b>
                        <div style="font-size:11px;color:var(--text-muted)">${data.qty} units quoted</div>
                      </div>
                    </div>
                    <div style="text-align:right">
                      <b style="font-size:13.5px;color:var(--navy-950)">${formatMoney(data.amount)}</b>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="empty-state">No product sales yet.</div>
            `}
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Customer Quotation Volume</h3>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;">
              ${Object.entries(customerSales).map(([name, data]) => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--bg-subtle);border-radius:var(--radius-md);">
                  <div>
                    <b>${escapeHtml(name)}</b>
                    <div style="font-size:11px;color:var(--text-muted)">${data.count} document(s)</div>
                  </div>
                  <b style="font-size:13.5px;color:var(--navy-950)">${formatMoney(data.total)}</b>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function attachReportsListeners() {}

  // ==========================================================================
  // MODULE 8: SETTINGS & BACKUP
  // ==========================================================================

  function renderSettingsPage() {
    const c = db.company;
    const s = db.settings;

    return `
      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title">Factory Profile (From Address)</h3>
              <p class="card-subtitle">Permanent factory GST credentials printed on all documents</p>
            </div>
            <span class="badge badge-accepted">Active Profile</span>
          </div>

          <form id="companySettingsForm" onsubmit="window.adhiraApp.saveCompanySettings(event)">
            <div class="form-grid">
              <div class="form-group col-span-2">
                <label class="form-label">Factory / Trade Name <span class="req">*</span></label>
                <input type="text" class="input" id="setTradeName" value="${escapeHtml(c.name)}" required />
              </div>

              <div class="form-group">
                <label class="form-label">Legal Name (Proprietor) <span class="req">*</span></label>
                <input type="text" class="input" id="setLegalName" value="${escapeHtml(c.legalName)}" required />
              </div>

              <div class="form-group">
                <label class="form-label">GST Certificate Trade Name</label>
                <input type="text" class="input" id="setGstCertTrade" value="${escapeHtml(c.gstCertTradeName || 'ATHIRA TRADERS')}" />
              </div>

              <div class="form-group">
                <label class="form-label">Factory GSTIN <span class="req">*</span></label>
                <input type="text" class="input" id="setGstin" value="${escapeHtml(c.gstin)}" required />
              </div>

              <div class="form-group">
                <label class="form-label">GST Reg. / ARN Ref. (Certificate)</label>
                <input type="text" class="input" id="setRegArn" value="${escapeHtml(c.regArnRef || 'AA330426046300R_RC13042026')}" />
              </div>

              <div class="form-group">
                <label class="form-label">PAN Number</label>
                <input type="text" class="input" id="setPan" value="${escapeHtml(c.pan)}" />
              </div>

              <div class="form-group col-span-2">
                <label class="form-label">Address Line 1</label>
                <input type="text" class="input" id="setAddr1" value="${escapeHtml(c.address1)}" />
              </div>

              <div class="form-group col-span-2">
                <label class="form-label">Address Line 2 / Landmark</label>
                <input type="text" class="input" id="setAddr2" value="${escapeHtml(c.address2)}" />
              </div>

              <div class="form-group">
                <label class="form-label">Area / Locality</label>
                <input type="text" class="input" id="setArea" value="${escapeHtml(c.area)}" />
              </div>

              <div class="form-group">
                <label class="form-label">City / Town</label>
                <input type="text" class="input" id="setCity" value="${escapeHtml(c.city)}" />
              </div>

              <div class="form-group">
                <label class="form-label">District</label>
                <input type="text" class="input" id="setDistrict" value="${escapeHtml(c.district)}" />
              </div>

              <div class="form-group">
                <label class="form-label">State</label>
                <input type="text" class="input" id="setState" value="${escapeHtml(c.state)}" />
              </div>

              <div class="form-group">
                <label class="form-label">State Code</label>
                <input type="text" class="input" id="setStateCode" value="${escapeHtml(c.stateCode)}" />
              </div>

              <div class="form-group">
                <label class="form-label">PIN Code</label>
                <input type="text" class="input" id="setPin" value="${escapeHtml(c.pin)}" />
              </div>

              <div class="form-group">
                <label class="form-label">Primary Mobile</label>
                <input type="text" class="input" id="setPhone" value="${escapeHtml(c.phone)}" />
              </div>

              <div class="form-group">
                <label class="form-label">Alternate Mobile</label>
                <input type="text" class="input" id="setAltPhone" value="${escapeHtml(c.altPhone || '')}" />
              </div>

              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="input" id="setEmail" value="${escapeHtml(c.email)}" />
              </div>

              <div class="form-group">
                <label class="form-label">Website</label>
                <input type="text" class="input" id="setWebsite" value="${escapeHtml(c.website)}" />
              </div>

              <!-- BANK CREDENTIALS -->
              <div class="form-group col-span-2" style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--border-subtle)">
                <b style="font-size:13px;color:var(--navy-950)">Bank Details for Document Printout & UPI Payments</b>
              </div>

              <div class="form-group">
                <label class="form-label">Bank Name</label>
                <input type="text" class="input" id="setBankName" value="${escapeHtml(c.bankName)}" />
              </div>

              <div class="form-group">
                <label class="form-label">Account Number</label>
                <input type="text" class="input" id="setAccountNo" value="${escapeHtml(c.accountNumber)}" />
              </div>

              <div class="form-group">
                <label class="form-label">Branch</label>
                <input type="text" class="input" id="setBranch" value="${escapeHtml(c.branch)}" />
              </div>

              <div class="form-group">
                <label class="form-label">IFSC Code</label>
                <input type="text" class="input" id="setIfsc" value="${escapeHtml(c.ifsc)}" />
              </div>

              <div class="form-group col-span-2">
                <label class="form-label">UPI ID / VPA (Scannable QR generated automatically)</label>
                <input type="text" class="input" id="setUpi" value="${escapeHtml(c.upi)}" />
              </div>

              <!-- SIGNATORY & DECLARATION -->
              <div class="form-group col-span-2" style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--border-subtle)">
                <b style="font-size:13px;color:var(--navy-950)">Declaration & Signatory</b>
              </div>

              <div class="form-group">
                <label class="form-label">Authorised Signatory Name</label>
                <input type="text" class="input" id="setSignatory" value="${escapeHtml(c.signatoryName)}" />
              </div>

              <div class="form-group">
                <label class="form-label">Signatory Designation</label>
                <input type="text" class="input" id="setSignatoryDesig" value="${escapeHtml(c.signatoryDesignation || 'Proprietor')}" />
              </div>

              <div class="form-group col-span-2">
                <label class="form-label">Statutory Declaration</label>
                <textarea class="textarea" rows="2" id="setDeclaration">${escapeHtml(c.declaration)}</textarea>
              </div>
            </div>

            <div style="margin-top:18px;display:flex;justify-content:flex-end">
              <button type="submit" class="btn btn-primary">Save Factory Profile</button>
            </div>
          </form>
        </div>

        <div style="display:flex;flex-direction:column;gap:20px;">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Document Numbering & Sequences</h3>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Quotation Prefix</label>
                <input type="text" class="input" id="setQuotePrefix" value="${escapeHtml(s.quotePrefix)}" />
              </div>

              <div class="form-group">
                <label class="form-label">Invoice Prefix</label>
                <input type="text" class="input" id="setInvoicePrefix" value="${escapeHtml(s.invoicePrefix)}" />
              </div>

              <div class="form-group">
                <label class="form-label">Next Quotation Sequence #</label>
                <input type="number" class="input" id="setNextQuote" value="${s.nextQuote}" min="1" />
              </div>

              <div class="form-group">
                <label class="form-label">Next Invoice Sequence #</label>
                <input type="number" class="input" id="setNextInvoice" value="${s.nextInvoice}" min="1" />
              </div>
            </div>

            <div style="margin-top:14px;display:flex;justify-content:flex-end">
              <button class="btn btn-primary btn-sm" onclick="window.adhiraApp.saveNumberingSettings()">Save Numbering</button>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">PDF Document Settings</h3>
            </div>

            <div style="display:flex;flex-direction:column;gap:12px;font-size:12.5px;">
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer">
                <input type="checkbox" id="setWatermarkToggle" ${s.watermarkEnabled ? 'checked' : ''} onchange="window.adhiraApp.togglePdfSetting('watermarkEnabled', this.checked)" />
                <span>Show Bull Watermark in PDF</span>
              </label>

              <label style="display:flex;align-items:center;gap:10px;cursor:pointer">
                <input type="checkbox" id="setBankToggle" ${s.showBankDetails ? 'checked' : ''} onchange="window.adhiraApp.togglePdfSetting('showBankDetails', this.checked)" />
                <span>Print Bank & UPI QR Details</span>
              </label>

              <label style="display:flex;align-items:center;gap:10px;cursor:pointer">
                <input type="checkbox" id="setTermsToggle" ${s.showTerms ? 'checked' : ''} onchange="window.adhiraApp.togglePdfSetting('showTerms', this.checked)" />
                <span>Print Terms & Conditions</span>
              </label>

              <label style="display:flex;align-items:center;gap:10px;cursor:pointer">
                <input type="checkbox" id="setSignToggle" ${s.showSignatory ? 'checked' : ''} onchange="window.adhiraApp.togglePdfSetting('showSignatory', this.checked)" />
                <span>Print Authorised Signatory Box</span>
              </label>
              <div style="margin-top:6px;padding:10px 12px;background:var(--bg-subtle);border-radius:var(--radius-md);border:1px solid var(--border-subtle)">
                <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                  <label class="form-label" style="margin:0;font-size:12px">Watermark Visibility Opacity</label>
                  <b id="watermarkOpacityVal" style="color:var(--navy-950);font-size:12px">${Math.round((s.watermarkOpacity || 0.18) * 100)}%</b>
                </div>
                <input type="range" class="input" style="padding:0;height:24px;cursor:pointer" min="0.08" max="0.45" step="0.02" value="${s.watermarkOpacity || 0.18}" oninput="document.getElementById('watermarkOpacityVal').textContent = Math.round(this.value * 100) + '%'; window.adhiraApp.togglePdfSetting('watermarkOpacity', Number(this.value))" />
                <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-top:2px">
                  <span>Subtle (10%)</span>
                  <span>Clear (18-22%)</span>
                  <span>Prominent (40%)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- REGISTERED FROM / FACTORY PROFILES -->
          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title">Registered Factories & From Addresses</h3>
                <p class="card-subtitle">Multiple seller profiles for Sivakasi factories, godowns & sister concerns</p>
              </div>
              <button type="button" class="btn btn-gold btn-sm" onclick="window.adhiraApp.openAddSellerModal()">+ Add Factory Profile</button>
            </div>

            <div style="display:flex;flex-direction:column;gap:10px;">
              ${(db.sellers || []).map(sel => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:var(--bg-subtle);border-radius:var(--radius-md);border:1px solid var(--border-subtle);flex-wrap:wrap;gap:8px;">
                  <div>
                    <div style="display:flex;align-items:center;gap:8px">
                      <b>${escapeHtml(sel.name)}</b>
                      ${sel.isDefault ? `<span class="from-details-badge" style="background:var(--emerald-50);color:var(--emerald-700);border-color:var(--emerald-200)">Default Factory</span>` : ''}
                    </div>
                    <div style="font-size:11.5px;color:var(--text-secondary);margin-top:3px">
                      GSTIN: <span style="font-family:monospace;font-weight:700">${escapeHtml(sel.gstin)}</span> • State Code: ${escapeHtml(sel.stateCode || '33')} • ${escapeHtml(sel.city || 'Sivakasi')}
                    </div>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:2px">
                      ${escapeHtml(sel.address1 || '')} • Phone: ${escapeHtml(sel.phone || '')}
                    </div>
                  </div>
                  <div style="display:flex;gap:6px">
                    ${!sel.isDefault ? `<button type="button" class="btn btn-secondary btn-sm" onclick="window.adhiraApp.setDefaultSeller('${sel.id}')">Make Default</button>` : ''}
                    ${(db.sellers || []).length > 1 ? `<button type="button" class="btn btn-danger btn-sm" onclick="window.adhiraApp.deleteSellerProfile('${sel.id}')">Delete</button>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title">Database Backup & Portability</h3>
                <p class="card-subtitle">Export or import full JSON business database</p>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:12px;">
              <p style="font-size:12px;color:var(--text-secondary)">
                All customers, products, quotations, invoices and numbering sequences are stored safely inside local browser storage. Download periodic backups to prevent data loss.
              </p>

              <div style="display:flex;gap:10px;flex-wrap:wrap">
                <button class="btn btn-secondary" onclick="window.adhiraApp.exportFullBackup()">
                  <span>💾</span> Export Backup JSON
                </button>

                <button class="btn btn-secondary" onclick="document.getElementById('importBackupFileInput').click()">
                  <span>📥</span> Restore from JSON
                </button>
                <input type="file" id="importBackupFileInput" accept=".json" style="display:none" onchange="window.adhiraApp.importFullBackup(event)" />

                <button class="btn btn-danger btn-sm" onclick="window.adhiraApp.resetToSeedData()">
                  Reset to Seed Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function attachSettingsListeners() {}

  // ==========================================================================
  // MODULE 9: COMMERCIAL A4 PDF DOCUMENT ENGINE (STRICT MB & SONS SPECIFICATION)
  // ==========================================================================

  function generateA4DocumentHtml(doc, isInvoice = false) {
    const s = doc.seller || db.company;
    const c = doc.customer || {};
    const items = doc.items || [];
    const settings = db.settings;

    const docTitle = isInvoice ? 'TAX INVOICE' : 'QUOTATION';
    const docNo = doc.number || '';
    const docDate = doc.date || '';
    const dueDate = isInvoice ? (doc.dueDate || doc.date) : (doc.validUntil || '');

    const isInterstate = Boolean(
      c.stateCode && s.stateCode && String(c.stateCode).trim() !== String(s.stateCode).trim()
    );

    const hsnMap = {};
    items.forEach(it => {
      const hsn = it.hsn || '3604';
      if (!hsnMap[hsn]) {
        hsnMap[hsn] = {
          hsn,
          taxable: 0,
          rate: it.gst || 18,
          taxAmount: 0
        };
      }
      const calc = calculateItemLine(it);
      hsnMap[hsn].taxable += calc.taxable;
      hsnMap[hsn].taxAmount += calc.gstAmount;
    });
    const hsnRows = Object.values(hsnMap);

    return `
      <div class="pdf-a4-sheet" id="printableA4Document">
        <!-- CIRCULAR BULL WATERMARK -->
        ${settings.watermarkEnabled ? `
          <div class="pdf-watermark-overlay" style="opacity:${settings.watermarkOpacity !== undefined ? settings.watermarkOpacity : 0.18}">
            <img src="${LOGO_PATH}" alt="Watermark" />
          </div>
        ` : ''}

        <div class="pdf-content-relative">
          <!-- 1. DOCUMENT TOP HEADER -->
          <div class="pdf-header-container">
            <div class="pdf-header-brand">
              <img src="${LOGO_PATH}" alt="Logo" class="pdf-header-logo" />
              <div class="pdf-header-brand-info">
                <h1>${escapeHtml(s.name || 'ADHIRA FIRE WORKS & PYROTECH')}</h1>
                <div class="seller-addr-txt">
                  ${escapeHtml(s.address1 || '8/444, Unnamed Road')}, ${escapeHtml(s.address2 || 'Near Sri Jaishnavi Stores')}<br>
                  ${escapeHtml(s.area || 'Anaiyur')}, ${escapeHtml(s.city || 'Sivakasi')} - ${escapeHtml(s.pin || '626124')}, ${escapeHtml(s.state || 'Tamil Nadu')}<br>
                  Phone: ${escapeHtml(s.phone || '+91 94431 23456')} ${s.altPhone ? ' • ' + escapeHtml(s.altPhone) : ''}<br>
                  Email: ${escapeHtml(s.email || 'adhirapyrotech@gmail.com')}
                </div>
                <div class="seller-tax-pill">
                  GSTIN: ${escapeHtml(s.gstin || '33QRQPS0659E1Z4')} • State: Tamil Nadu (33)<br>
                  <span style="font-weight:400;color:#4b5563">Certificate / ARN Ref: ${escapeHtml(s.regArnRef || 'AA330426046300R_RC13042026')}</span>
                </div>
              </div>
            </div>

            <div class="pdf-header-doc-box">
              <div class="pdf-doc-badge-type">${docTitle}</div>
              <table class="pdf-doc-meta-tbl">
                <tr>
                  <td><strong>${docTitle} No:</strong></td>
                  <td style="text-align:right"><strong>${escapeHtml(docNo)}</strong></td>
                </tr>
                <tr>
                  <td>Dated:</td>
                  <td style="text-align:right"><strong>${escapeHtml(docDate)}</strong></td>
                </tr>
                ${dueDate ? `
                  <tr>
                    <td>${isInvoice ? 'Due Date:' : 'Valid Until:'}</td>
                    <td style="text-align:right">${escapeHtml(dueDate)}</td>
                  </tr>
                ` : ''}
                <tr>
                  <td>Place of Supply:</td>
                  <td style="text-align:right">${escapeHtml(c.state || 'Tamil Nadu')} (${escapeHtml(c.stateCode || '33')})</td>
                </tr>
              </table>
            </div>
          </div>

          <!-- 2. TWO-COLUMN BILL TO & SHIP TO (MB & SONS FORMAT) -->
          <div class="pdf-parties-grid">
            <div class="pdf-party-box">
              <div class="pdf-party-box-title">BUYER (BILL TO)</div>
              <b>${escapeHtml(c.name || 'Walk-in Customer')}</b><br>
              ${c.legalName && c.legalName !== c.name ? `<span style="color:#6b7280">${escapeHtml(c.legalName)}</span><br>` : ''}
              ${c.billingAddress ? `${escapeHtml(c.billingAddress)}<br>` : ''}
              ${c.city ? `${escapeHtml(c.city)}, ` : ''}${escapeHtml(c.state || 'Tamil Nadu')} - ${escapeHtml(c.pin || '')}<br>
              <strong>GSTIN/UIN:</strong> <span style="font-family:monospace;font-weight:700">${escapeHtml(c.gstin || 'UNREGISTERED')}</span><br>
              <strong>State Name:</strong> ${escapeHtml(c.state || 'Tamil Nadu')}, <strong>Code:</strong> ${escapeHtml(c.stateCode || '33')}<br>
              ${c.phone ? `Contact: ${escapeHtml(c.phone)}` : ''}
            </div>

            <div class="pdf-party-box">
              <div class="pdf-party-box-title">CONSIGNEE (SHIP TO)</div>
              <b>${escapeHtml(c.name || 'Walk-in Customer')}</b><br>
              ${doc.sameAsBilling || !c.shippingAddress ? `
                <span style="font-style:italic;color:#6b7280">Same as Billing Address</span><br>
                ${c.billingAddress ? `${escapeHtml(c.billingAddress)}<br>` : ''}
                ${c.city ? `${escapeHtml(c.city)}, ` : ''}${escapeHtml(c.state || '')}<br>
              ` : `
                ${escapeHtml(c.shippingAddress)}<br>
                ${c.city ? `${escapeHtml(c.city)}, ` : ''}${escapeHtml(c.state || '')}<br>
              `}
              <strong>Destination:</strong> ${escapeHtml(doc.destination || c.city || 'Sivakasi')}<br>
              <strong>State Name:</strong> ${escapeHtml(c.state || 'Tamil Nadu')}, <strong>Code:</strong> ${escapeHtml(c.stateCode || '33')}
            </div>
          </div>

          <!-- 3. COMPREHENSIVE 4-COLUMN LOGISTICS GRID (FROM MB & SONS INVOICE) -->
          <div class="pdf-mb-logistics-grid">
            <div class="pdf-mb-cell">
              <span class="label">Delivery Note:</span>
              <span class="val">${escapeHtml(doc.deliveryNote || '—')}</span>
            </div>
            <div class="pdf-mb-cell">
              <span class="label">Mode/Terms of Payment:</span>
              <span class="val">${escapeHtml(doc.paymentTerms || 'Advance')}</span>
            </div>
            <div class="pdf-mb-cell">
              <span class="label">Supplier's Ref.:</span>
              <span class="val">${escapeHtml(doc.supplierRef || '—')}</span>
            </div>
            <div class="pdf-mb-cell">
              <span class="label">Other Reference(s):</span>
              <span class="val">${escapeHtml(doc.otherReferences || '—')}</span>
            </div>

            <div class="pdf-mb-cell">
              <span class="label">Buyer's Order No.:</span>
              <span class="val">${escapeHtml(doc.poNumber || '—')}</span>
            </div>
            <div class="pdf-mb-cell">
              <span class="label">Dated (PO Date):</span>
              <span class="val">${escapeHtml(doc.poDate || '—')}</span>
            </div>
            <div class="pdf-mb-cell">
              <span class="label">Despatch Document No.:</span>
              <span class="val">${escapeHtml(doc.despatchDocNo || '—')}</span>
            </div>
            <div class="pdf-mb-cell">
              <span class="label">Delivery Note Date:</span>
              <span class="val">${escapeHtml(doc.deliveryNoteDate || '—')}</span>
            </div>

            <div class="pdf-mb-cell">
              <span class="label">Despatched through:</span>
              <span class="val">${escapeHtml(doc.dispatchThrough || 'ARC / Sivakasi Depot')}</span>
            </div>
            <div class="pdf-mb-cell">
              <span class="label">Destination:</span>
              <span class="val">${escapeHtml(doc.destination || c.city || '—')}</span>
            </div>
            <div class="pdf-mb-cell">
              <span class="label">Bill of Lading / LR-RR No.:</span>
              <span class="val">${escapeHtml(doc.billOfLadingNo || '—')}</span>
            </div>
            <div class="pdf-mb-cell">
              <span class="label">Motor Vehicle No.:</span>
              <span class="val">${escapeHtml(doc.motorVehicleNo || doc.vehicleNo || '—')}</span>
            </div>

            <div class="pdf-mb-cell" style="grid-column:span 4;border-bottom:none">
              <span class="label">Terms of Delivery:</span>
              <span class="val">${escapeHtml(doc.termsOfDelivery || 'Ex-Factory Sivakasi, Transit Risk Consignee Account, Freight To-Pay')}</span>
            </div>
          </div>

          <!-- 4. FIREWORKS LINE ITEMS TABLE -->
          <table class="pdf-items-table">
            <thead>
              <tr>
                <th style="width:28px">Sl No.</th>
                <th class="text-left">Description of Goods (Fireworks)</th>
                <th style="width:50px">HSN/SAC</th>
                <th style="width:70px">Packing</th>
                <th style="width:40px">Quantity</th>
                <th style="width:38px">per</th>
                <th class="text-right" style="width:65px">Rate (₹)</th>
                <th class="text-right" style="width:50px">Discount</th>
                <th class="text-right" style="width:65px">Taxable (₹)</th>
                <th style="width:45px">GST%</th>
                <th class="text-right" style="width:60px">Tax Amount</th>
                <th class="text-right" style="width:75px">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((it, idx) => {
                const calc = calculateItemLine(it);
                return `
                  <tr>
                    <td class="text-center">${idx + 1}</td>
                    <td class="text-left">
                      <strong>${escapeHtml(it.name)}</strong>
                    </td>
                    <td class="text-center">${escapeHtml(it.hsn || '3604')}</td>
                    <td class="text-center">${escapeHtml(it.packing || '1 Pcs')}</td>
                    <td class="text-center"><b>${it.qty}</b></td>
                    <td class="text-center">${escapeHtml(it.unit || 'CASE')}</td>
                    <td class="text-right">${formatNumber(it.rate)}</td>
                    <td class="text-right">${calc.discount > 0 ? formatNumber(calc.discount) : '—'}</td>
                    <td class="text-right">${formatNumber(calc.taxable)}</td>
                    <td class="text-center">${it.gst || 18}%</td>
                    <td class="text-right">${formatNumber(calc.gstAmount)}</td>
                    <td class="text-right"><strong>${formatNumber(calc.total)}</strong></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <!-- 5. HSN/SAC TAX SUMMARY BREAKDOWN TABLE -->
          <div style="font-size:7.5px;font-weight:800;color:#1e2978;text-transform:uppercase;margin-bottom:3px">
            HSN/SAC Tax Liability Breakdown (GSTR-1 Format)
          </div>
          <table class="pdf-tax-summary-table">
            <thead>
              <tr>
                <th rowspan="2" style="width:70px">HSN/SAC</th>
                <th rowspan="2">Taxable Value (₹)</th>
                ${isInterstate ? `
                  <th colspan="2">Integrated Tax (IGST)</th>
                ` : `
                  <th colspan="2">Central Tax (CGST)</th>
                  <th colspan="2">State Tax (SGST)</th>
                `}
                <th rowspan="2">Total Tax Amount (₹)</th>
              </tr>
              <tr>
                ${isInterstate ? `
                  <th>Rate</th>
                  <th>Amount (₹)</th>
                ` : `
                  <th>Rate</th>
                  <th>Amount (₹)</th>
                  <th>Rate</th>
                  <th>Amount (₹)</th>
                `}
              </tr>
            </thead>
            <tbody>
              ${hsnRows.map(h => {
                const igstAmt = isInterstate ? h.taxAmount : 0;
                const halfRate = round2(h.rate / 2);
                const halfTax = round2(h.taxAmount / 2);
                return `
                  <tr>
                    <td class="text-center"><b>${escapeHtml(h.hsn)}</b></td>
                    <td>${formatNumber(h.taxable)}</td>
                    ${isInterstate ? `
                      <td class="text-center">${h.rate}%</td>
                      <td>${formatNumber(igstAmt)}</td>
                    ` : `
                      <td class="text-center">${halfRate}%</td>
                      <td>${formatNumber(halfTax)}</td>
                      <td class="text-center">${halfRate}%</td>
                      <td>${formatNumber(halfTax)}</td>
                    `}
                    <td><b>${formatNumber(h.taxAmount)}</b></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <!-- 6. BOTTOM SPLIT: BANK, UPI QR & FINANCIAL SUMMARY -->
          <div class="pdf-bottom-grid">
            <div class="pdf-bottom-left">
              ${settings.showBankDetails ? `
                <div class="pdf-upi-qr-card">
                  <div class="pdf-upi-qr-box" id="pdfUpiQrCanvas">
                    <!-- Dynamic UPI QR Renders here -->
                  </div>
                  <div class="pdf-upi-info">
                    <b>Company's Bank & UPI Details</b><br>
                    Bank Name: <b>${escapeHtml(s.bankName || 'State Bank of India')}</b><br>
                    A/c No: <b>${escapeHtml(s.accountNumber || '39485712093')}</b><br>
                    Branch & IFSC: <b>${escapeHtml(s.branch || 'Sivakasi')} • ${escapeHtml(s.ifsc || 'SBIN0000918')}</b><br>
                    UPI ID: <b>${escapeHtml(s.upi || 'adhirapyro@sbi')}</b><br>
                    <span style="font-size:7px;color:#059669">Scan via PhonePe / GPay / Paytm to pay instantly</span>
                  </div>
                </div>
              ` : ''}

              <div class="pdf-amount-words">
                <strong>Amount Chargeable in Words:</strong><br>
                ${convertAmountToWords(doc.grandTotal)}<br>
                <span style="font-size:7.5px;color:#6b7280">Tax Amount in Words: ${convertAmountToWords(doc.gstTotal)}</span>
              </div>
            </div>

            <!-- FINANCIAL SUMMARY -->
            <div class="pdf-financial-summary">
              <div class="pdf-sum-row">
                <span>Total Taxable Amount</span>
                <b>${formatMoney(doc.taxable)}</b>
              </div>
              ${doc.discountTotal > 0 ? `
                <div class="pdf-sum-row">
                  <span>Total Trade Discount</span>
                  <b style="color:#b91c1c">-${formatMoney(doc.discountTotal)}</b>
                </div>
              ` : ''}
              ${isInterstate ? `
                <div class="pdf-sum-row">
                  <span>Integrated GST (IGST 18%)</span>
                  <b>${formatMoney(doc.igst || doc.gstTotal)}</b>
                </div>
              ` : `
                <div class="pdf-sum-row">
                  <span>Central GST (CGST 9%)</span>
                  <b>${formatMoney(doc.cgst)}</b>
                </div>
                <div class="pdf-sum-row">
                  <span>State GST (SGST 9%)</span>
                  <b>${formatMoney(doc.sgst)}</b>
                </div>
              `}
              ${doc.roundOff !== 0 ? `
                <div class="pdf-sum-row">
                  <span>Round Off</span>
                  <b>${doc.roundOff >= 0 ? '+' : ''}${formatMoney(doc.roundOff)}</b>
                </div>
              ` : ''}
              <div class="pdf-sum-row grand-total-row">
                <span>GRAND TOTAL</span>
                <b>${formatMoney(doc.grandTotal)}</b>
              </div>
            </div>
          </div>

          <!-- 7. TERMS & SIGNATURES -->
          <div class="pdf-signatures-grid">
            <div class="pdf-terms-block">
              ${settings.showDeclaration ? `
                <div style="margin-bottom:6px">
                  <h6>Declaration</h6>
                  <p>${escapeHtml(s.declaration || 'We declare that this quotation/invoice shows the actual price of the goods described and that all particulars are true and correct.')}</p>
                </div>
              ` : ''}

              ${settings.showTerms && s.terms && s.terms.length > 0 ? `
                <h6>Terms & Conditions</h6>
                <ol>
                  ${s.terms.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
                </ol>
              ` : ''}
            </div>

            ${settings.showSignatory ? `
              <div class="pdf-sign-box">
                <div class="sign-company">For ${escapeHtml(s.name || 'ADHIRA FIRE WORKS & PYROTECH')}</div>
                <div style="height:32px"></div>
                <div>
                  <b>${escapeHtml(s.signatoryName || 'Murugan Selvaraj')}</b><br>
                  <span style="font-size:7.5px;color:#6b7280">${escapeHtml(s.signatoryDesignation || 'Authorised Signatory')}</span>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- 8. FOOTER NOTE -->
          <div class="pdf-footer-note">
            <span>ADHIRA FIRE WORKS & PYROTECH • SIVAKASI, TAMIL NADU</span>
            <span>This is a Computer Generated Commercial GST Document</span>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // MODALS & OVERLAYS SYSTEM
  // ==========================================================================

  function openModal(title, bodyHtml, footerHtml = '', sizeClass = '') {
    const container = document.getElementById('modalContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="modal-backdrop" id="modalBackdrop" onclick="if(event.target.id==='modalBackdrop') window.adhiraApp.closeModal()">
        <div class="modal-dialog ${sizeClass}">
          <div class="modal-header">
            <h3>${title}</h3>
            <button class="modal-close-btn" onclick="window.adhiraApp.closeModal()">✕</button>
          </div>
          <div class="modal-body">
            ${bodyHtml}
          </div>
          ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
        </div>
      </div>
    `;
  }

  function closeModal() {
    const container = document.getElementById('modalContainer');
    if (container) container.innerHTML = '';
    state.activeModal = null;
  }

  // --- PDF PREVIEW MODAL ---
  function openPdfPreviewModal(doc, isInvoice = false) {
    state.viewingDoc = { doc, isInvoice };
    state.zoomScale = 1.0;

    const modalTitle = `${isInvoice ? 'Tax Invoice' : 'Quotation'} ${doc.number}`;
    const docHtml = generateA4DocumentHtml(doc, isInvoice);

    const body = `
      <div class="pdf-preview-backdrop">
        <div class="pdf-preview-toolbar">
          <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.zoomPdf(-0.1)" title="Zoom Out">🔍 -</button>
          <span id="zoomScaleLabel" style="font-size:12px;font-weight:700">100%</span>
          <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.zoomPdf(0.1)" title="Zoom In">🔍 +</button>
          <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.resetPdfZoom()" title="Reset Zoom">Fit</button>
          
          <div style="height:20px;width:1px;background:var(--border-subtle)"></div>

          <button class="btn btn-gold btn-sm" onclick="window.adhiraApp.downloadPdfFile('${doc.number}')">
            <span>📥</span> Download PDF
          </button>

          <button class="btn btn-primary btn-sm" onclick="window.print()">
            <span>🖨️</span> Print / Save PDF
          </button>

          <button class="btn btn-success btn-sm" onclick="window.adhiraApp.shareWhatsApp('${doc.id}', ${isInvoice})">
            <span>💬</span> WhatsApp
          </button>

          <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.shareEmail('${doc.id}', ${isInvoice})">
            <span>✉️</span> Email
          </button>
        </div>

        <div id="pdfZoomContainer" style="display:flex;justify-content:center;width:100%">
          ${docHtml}
        </div>
      </div>
    `;

    openModal(modalTitle, body, `<button class="btn btn-secondary" onclick="window.adhiraApp.closeModal()">Close</button>`, 'modal-lg');

    // Render Scannable UPI QR Code in canvas
    setTimeout(() => {
      const qrBox = document.getElementById('pdfUpiQrCanvas');
      if (qrBox && typeof QRCode !== 'undefined') {
        qrBox.innerHTML = '';
        const upiUri = `upi://pay?pa=${encodeURIComponent(db.company.upi || 'adhirapyro@sbi')}&pn=${encodeURIComponent(db.company.name || 'ADHIRA PYROTECH')}&am=${doc.grandTotal || 0}&cu=INR`;
        new QRCode(qrBox, {
          text: upiUri,
          width: 62,
          height: 62,
          colorDark: '#0c1033',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
      }
    }, 60);
  }

  // --- CUSTOMER ADD / EDIT MODAL ---
  function openCustomerModal(customerId = null) {
    const isEdit = Boolean(customerId);
    const c = isEdit ? db.customers.find(x => x.id === customerId) || {} : {};

    const title = isEdit ? `Edit Customer: ${c.name}` : 'Add New Customer / Shop';

    const body = `
      <form id="customerModalForm" onsubmit="window.adhiraApp.saveCustomerModal(event, '${customerId || ''}')">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Shop / Trade Name <span class="req">*</span></label>
            <input type="text" class="input" id="mCustName" value="${escapeHtml(c.name || '')}" required />
          </div>

          <div class="form-group">
            <label class="form-label">Legal Name (as per GST)</label>
            <input type="text" class="input" id="mCustLegal" value="${escapeHtml(c.legalName || '')}" />
          </div>

          <div class="form-group">
            <label class="form-label">GSTIN <span class="req">*</span></label>
            <input type="text" class="input" id="mCustGstin" value="${escapeHtml(c.gstin || '')}" placeholder="e.g. 36JNYPS8775N1Z5" required onblur="window.adhiraApp.validateModalGstin(this.value)" />
            <span id="mGstinFeedback" style="font-size:11px;color:var(--text-muted)"></span>
          </div>

          <div class="form-group">
            <label class="form-label">Customer Type</label>
            <select class="select" id="mCustType">
              <option value="Wholesale Dealer" ${c.type === 'Wholesale Dealer' ? 'selected' : ''}>Wholesale Dealer</option>
              <option value="Retailer" ${c.type === 'Retailer' ? 'selected' : ''}>Retailer</option>
              <option value="Distributor" ${c.type === 'Distributor' ? 'selected' : ''}>Distributor</option>
              <option value="Direct Buyer" ${c.type === 'Direct Buyer' ? 'selected' : ''}>Direct Buyer</option>
            </select>
          </div>

          <div class="form-group col-span-2">
            <label class="form-label">Billing Address <span class="req">*</span></label>
            <textarea class="textarea" rows="2" id="mCustBilling" required>${escapeHtml(c.billingAddress || '')}</textarea>
          </div>

          <div class="form-group col-span-2">
            <label class="form-label">Shipping Address</label>
            <textarea class="textarea" rows="2" id="mCustShipping" placeholder="Leave empty if same as billing">${escapeHtml(c.shippingAddress || '')}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Contact Person</label>
            <input type="text" class="input" id="mCustContact" value="${escapeHtml(c.contactPerson || '')}" />
          </div>

          <div class="form-group">
            <label class="form-label">Mobile Number</label>
            <input type="text" class="input" id="mCustPhone" value="${escapeHtml(c.phone || '')}" />
          </div>

          <div class="form-group">
            <label class="form-label">City</label>
            <input type="text" class="input" id="mCustCity" value="${escapeHtml(c.city || '')}" />
          </div>

          <div class="form-group">
            <label class="form-label">State <span class="req">*</span></label>
            <select class="select" id="mCustState" onchange="window.adhiraApp.syncModalStateCode(this)">
              ${STATE_CODES.map(st => `
                <option value="${st.name}" data-code="${st.code}" ${(c.state || 'Tamil Nadu') === st.name ? 'selected' : ''}>
                  ${st.code} — ${st.name}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">State Code</label>
            <input type="text" class="input" id="mCustStateCode" value="${escapeHtml(c.stateCode || '33')}" readonly style="background:var(--bg-subtle)" />
          </div>

          <div class="form-group">
            <label class="form-label">PIN Code</label>
            <input type="text" class="input" id="mCustPin" value="${escapeHtml(c.pin || '')}" />
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="input" id="mCustEmail" value="${escapeHtml(c.email || '')}" />
          </div>

          <div class="form-group">
            <label class="form-label">Default Payment Terms</label>
            <input type="text" class="input" id="mCustTerms" value="${escapeHtml(c.paymentTerms || 'Advance')}" />
          </div>
        </div>

        <div style="margin-top:20px;display:flex;justify-content:flex-end;gap:10px;">
          <button type="button" class="btn btn-secondary" onclick="window.adhiraApp.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">${isEdit ? 'Update Customer' : 'Save Customer'}</button>
        </div>
      </form>
    `;

    openModal(title, body);
  }

  // --- PRODUCT ADD / EDIT MODAL ---
  let tempProductImage = '';

  function openProductModal(productId = null) {
    const isEdit = Boolean(productId);
    const p = isEdit ? db.products.find(x => x.id === productId) || {} : {};
    tempProductImage = p.image || '';

    const title = isEdit ? `Edit Product: ${p.name}` : 'Add New Product to Master';

    const body = `
      <form id="productModalForm" onsubmit="window.adhiraApp.saveProductModal(event, '${productId || ''}')">
        <div class="form-grid">
          <div class="form-group col-span-2">
            <label class="form-label">Product Name <span class="req">*</span></label>
            <input type="text" class="input" id="mProdName" value="${escapeHtml(p.name || '')}" placeholder="e.g. 1000 Crackers / Fountains" required />
          </div>

          <div class="form-group">
            <label class="form-label">Category</label>
            <select class="select" id="mProdCat">
              ${db.categories.map(cat => `
                <option value="${cat}" ${p.category === cat ? 'selected' : ''}>${cat}</option>
              `).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">HSN / SAC Code</label>
            <input type="text" class="input" id="mProdHsn" value="${escapeHtml(p.hsn || '3604')}" required />
          </div>

          <div class="form-group">
            <label class="form-label">Box / Packing</label>
            <input type="text" class="input" id="mProdPacking" value="${escapeHtml(p.packing || '1 (3 Pcs)')}" placeholder="e.g. 1 (3 Pcs)" />
          </div>

          <div class="form-group">
            <label class="form-label">Unit</label>
            <select class="select" id="mProdUnit">
              <option value="CASE" ${p.unit === 'CASE' ? 'selected' : ''}>CASE</option>
              <option value="BOX" ${p.unit === 'BOX' ? 'selected' : ''}>BOX</option>
              <option value="PCS" ${p.unit === 'PCS' ? 'selected' : ''}>PCS</option>
              <option value="PKT" ${p.unit === 'PKT' ? 'selected' : ''}>PKT</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Unit Rate (₹) <span class="req">*</span></label>
            <input type="number" class="input" id="mProdRate" min="0" step="any" value="${p.rate || 0}" required />
          </div>

          <div class="form-group">
            <label class="form-label">Per Case Count</label>
            <input type="number" class="input" id="mProdCaseRate" min="0" step="1" value="${p.caseRate || 0}" />
          </div>

          <div class="form-group">
            <label class="form-label">GST Rate %</label>
            <input type="number" class="input" id="mProdGst" min="0" max="28" value="${p.gst || 18}" />
          </div>

          <div class="form-group col-span-2">
            <label class="form-label">Product Image</label>
            <input type="file" class="input" accept="image/*" onchange="window.adhiraApp.handleProductImageUpload(event)" />
            <div id="mProdImgPreviewWrap" style="margin-top:10px;${tempProductImage ? 'display:block' : 'display:none'}">
              <img id="mProdImgPreview" src="${tempProductImage}" style="width:120px;height:80px;object-fit:cover;border-radius:8px;border:1px solid var(--border-subtle)" />
              <button type="button" class="btn btn-secondary btn-sm" style="margin-left:8px" onclick="window.adhiraApp.clearProductImage()">Remove Image</button>
            </div>
          </div>
        </div>

        <div style="margin-top:20px;display:flex;justify-content:flex-end;gap:10px;">
          <button type="button" class="btn btn-secondary" onclick="window.adhiraApp.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">${isEdit ? 'Update Product' : 'Save Product'}</button>
        </div>
      </form>
    `;

    openModal(title, body);
  }

  // --- INVOICE CONVERSION MODAL ---
  function openConvertInvoiceModal(quotationId) {
    const q = db.quotations.find(x => x.id === quotationId);
    if (!q) return;

    const invNo = generateDocNumber('invoice');

    const body = `
      <form id="convertInvoiceForm" onsubmit="window.adhiraApp.executeInvoiceConversion(event, '${quotationId}')">
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:14px">
          Convert Quotation <b>${escapeHtml(q.number)}</b> into a Commercial GST Tax Invoice.
          Original quotation snapshot will remain preserved.
        </p>

        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Tax Invoice Number</label>
            <input type="text" class="input" id="convInvNumber" value="${escapeHtml(invNo)}" readonly style="background:var(--bg-subtle)" />
          </div>

          <div class="form-group">
            <label class="form-label">Invoice Date <span class="req">*</span></label>
            <input type="date" class="input" id="convInvDate" value="${new Date().toISOString().slice(0, 10)}" required />
          </div>

          <div class="form-group">
            <label class="form-label">Payment Due Date</label>
            <input type="date" class="input" id="convDueDate" value="${new Date().toISOString().slice(0, 10)}" />
          </div>

          <div class="form-group">
            <label class="form-label">Payment Status</label>
            <select class="select" id="convPaymentStatus">
              <option value="Paid">Paid (Full Advance Received)</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Partially Paid">Partially Paid</option>
            </select>
          </div>

          <div class="form-group col-span-2" style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--border-subtle)">
            <b style="font-size:12.5px;color:var(--navy-950)">Optional E-Way Bill & Transport Fields</b>
          </div>

          <div class="form-group">
            <label class="form-label">E-Way Bill Number</label>
            <input type="text" class="input" id="convEwayNo" placeholder="12-digit E-Way Bill Number" />
          </div>

          <div class="form-group">
            <label class="form-label">E-Way Bill Date</label>
            <input type="date" class="input" id="convEwayDate" />
          </div>

          <div class="form-group">
            <label class="form-label">Transporter Name</label>
            <input type="text" class="input" id="convTransporter" placeholder="e.g. ARC / VRL / KPN" />
          </div>

          <div class="form-group">
            <label class="form-label">Vehicle Registration Number</label>
            <input type="text" class="input" id="convVehicleNo" placeholder="e.g. TN 67 AB 1234" />
          </div>
        </div>

        <div style="margin-top:20px;display:flex;justify-content:flex-end;gap:10px;">
          <button type="button" class="btn btn-secondary" onclick="window.adhiraApp.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-gold">Confirm & Issue Tax Invoice</button>
        </div>
      </form>
    `;

    openModal(`Convert Quotation ${q.number} to Invoice`, body);
  }

  // --- GLOBAL SEARCH MODAL (Ctrl+K or /) ---
  function openGlobalSearchModal() {
    const container = document.getElementById('modalContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="modal-backdrop" id="searchBackdrop" onclick="if(event.target.id==='searchBackdrop') window.adhiraApp.closeModal()">
        <div class="search-modal-dialog">
          <div class="search-input-header">
            <span style="font-size:18px">🔍</span>
            <input type="text" id="globalSpotlightInput" placeholder="Search customers, quotations, invoices, products, GSTIN..." autofocus />
            <button class="modal-close-btn" onclick="window.adhiraApp.closeModal()">✕</button>
          </div>
          <div class="search-results-list" id="globalSearchResults">
            <div style="padding:20px;text-align:center;color:var(--text-muted);font-size:12.5px">
              Type anything to instantly search across all records...
            </div>
          </div>
        </div>
      </div>
    `;

    const input = document.getElementById('globalSpotlightInput');
    if (input) {
      input.focus();
      input.oninput = (e) => executeGlobalSearch(e.target.value);
    }
  }

  function executeGlobalSearch(query = '') {
    const resultsContainer = document.getElementById('globalSearchResults');
    if (!resultsContainer) return;

    const q = query.trim().toLowerCase();
    if (!q) {
      resultsContainer.innerHTML = `
        <div style="padding:20px;text-align:center;color:var(--text-muted);font-size:12.5px">
          Type anything to instantly search across all records...
        </div>
      `;
      return;
    }

    const matchedQuotes = db.quotations.filter(x =>
      x.number.toLowerCase().includes(q) ||
      x.customer.name.toLowerCase().includes(q) ||
      (x.customer.gstin && x.customer.gstin.toLowerCase().includes(q))
    ).slice(0, 4);

    const matchedInvoices = db.invoices.filter(x =>
      x.number.toLowerCase().includes(q) ||
      x.customer.name.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedCusts = db.customers.filter(x =>
      x.name.toLowerCase().includes(q) ||
      x.gstin.toLowerCase().includes(q) ||
      (x.city && x.city.toLowerCase().includes(q))
    ).slice(0, 4);

    const matchedProds = db.products.filter(x =>
      x.name.toLowerCase().includes(q) ||
      x.hsn.toLowerCase().includes(q)
    ).slice(0, 4);

    let html = '';

    if (matchedQuotes.length > 0) {
      html += `<div class="search-group-title">Quotations (${matchedQuotes.length})</div>`;
      matchedQuotes.forEach(quote => {
        html += `
          <div class="search-result-item" onclick="window.adhiraApp.viewDocument('quote', '${quote.id}'); window.adhiraApp.closeModal();">
            <div>
              <b>${escapeHtml(quote.number)}</b> — ${escapeHtml(quote.customer.name)}
              <div style="font-size:11px;color:var(--text-muted)">${quote.date} • ${formatMoney(quote.grandTotal)}</div>
            </div>
            <span class="badge badge-${quote.status.toLowerCase()}">${quote.status}</span>
          </div>
        `;
      });
    }

    if (matchedInvoices.length > 0) {
      html += `<div class="search-group-title">Tax Invoices (${matchedInvoices.length})</div>`;
      matchedInvoices.forEach(inv => {
        html += `
          <div class="search-result-item" onclick="window.adhiraApp.viewDocument('invoice', '${inv.id}'); window.adhiraApp.closeModal();">
            <div>
              <b>${escapeHtml(inv.number)}</b> — ${escapeHtml(inv.customer.name)}
              <div style="font-size:11px;color:var(--text-muted)">${inv.date} • ${formatMoney(inv.grandTotal)}</div>
            </div>
            <span class="badge badge-${(inv.paymentStatus || 'paid').toLowerCase()}">${inv.paymentStatus || 'Paid'}</span>
          </div>
        `;
      });
    }

    if (matchedCusts.length > 0) {
      html += `<div class="search-group-title">Customers / Shops (${matchedCusts.length})</div>`;
      matchedCusts.forEach(cust => {
        html += `
          <div class="search-result-item" onclick="window.adhiraApp.navigate('customers'); window.adhiraApp.closeModal();">
            <div>
              <b>${escapeHtml(cust.name)}</b> (${escapeHtml(cust.city || cust.state)})
              <div style="font-size:11px;color:var(--text-muted)">GSTIN: ${escapeHtml(cust.gstin)}</div>
            </div>
            <span class="btn btn-secondary btn-sm">Open</span>
          </div>
        `;
      });
    }

    if (matchedProds.length > 0) {
      html += `<div class="search-group-title">Products (${matchedProds.length})</div>`;
      matchedProds.forEach(prod => {
        html += `
          <div class="search-result-item" onclick="window.adhiraApp.navigate('products'); window.adhiraApp.closeModal();">
            <div>
              <b>${escapeHtml(prod.name)}</b> (HSN: ${escapeHtml(prod.hsn)})
              <div style="font-size:11px;color:var(--text-muted)">Rate: ${formatMoney(prod.rate)} • Pack: ${escapeHtml(prod.packing)}</div>
            </div>
            <span class="btn btn-secondary btn-sm">View</span>
          </div>
        `;
      });
    }

    if (!html) {
      html = `
        <div style="padding:24px;text-align:center;color:var(--text-muted);font-size:12.5px">
          No matches found for "<b>${escapeHtml(query)}</b>"
        </div>
      `;
    }

    resultsContainer.innerHTML = html;
  }

  // ==========================================================================
  // CSV EXPORT UTILITIES
  // ==========================================================================

  function downloadCsvFile(filename, csvContent) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Export file downloaded successfully', 'success');
  }

  function exportQuotationsCsv() {
    const headers = ['Quotation No', 'Date', 'Customer Name', 'GSTIN', 'City', 'State', 'Taxable Value', 'Total GST', 'Grand Total', 'Status'];
    const rows = db.quotations.map(q => [
      `"${q.number}"`,
      `"${q.date}"`,
      `"${q.customer.name.replace(/"/g, '""')}"`,
      `"${q.customer.gstin || ''}"`,
      `"${q.customer.city || ''}"`,
      `"${q.customer.state || ''}"`,
      q.taxable,
      q.gstTotal,
      q.grandTotal,
      `"${q.status}"`
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCsvFile(`adhira_quotations_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  }

  function exportInvoicesCsv() {
    const headers = ['Invoice No', 'Date', 'Quotation Ref', 'Customer Name', 'GSTIN', 'E-Way Bill', 'Vehicle No', 'Taxable Value', 'GST Total', 'Grand Total', 'Payment Status'];
    const rows = db.invoices.map(i => [
      `"${i.number}"`,
      `"${i.date}"`,
      `"${i.quotationNumber || ''}"`,
      `"${i.customer.name.replace(/"/g, '""')}"`,
      `"${i.customer.gstin || ''}"`,
      `"${i.ewayBillNo || ''}"`,
      `"${i.vehicleNo || ''}"`,
      i.taxable,
      i.gstTotal,
      i.grandTotal,
      `"${i.paymentStatus || i.status}"`
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCsvFile(`adhira_invoices_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  }

  function exportCustomersCsv() {
    const headers = ['Customer ID', 'Shop Name', 'Legal Name', 'GSTIN', 'Phone', 'Billing Address', 'City', 'State', 'State Code', 'PIN', 'Status'];
    const rows = db.customers.map(c => [
      `"${c.id}"`,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${(c.legalName || '').replace(/"/g, '""')}"`,
      `"${c.gstin}"`,
      `"${c.phone || ''}"`,
      `"${(c.billingAddress || '').replace(/"/g, '""')}"`,
      `"${c.city || ''}"`,
      `"${c.state || ''}"`,
      `"${c.stateCode || ''}"`,
      `"${c.pin || ''}"`,
      `"${c.status || 'Active'}"`
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCsvFile(`adhira_customers_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  }

  function exportProductsCsv() {
    const headers = ['Product ID', 'Name', 'Category', 'HSN', 'Packing', 'Unit', 'Rate', 'Case Count', 'GST Rate'];
    const rows = db.products.map(p => [
      `"${p.id}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category || ''}"`,
      `"${p.hsn || '3604'}"`,
      `"${p.packing || ''}"`,
      `"${p.unit || 'CASE'}"`,
      p.rate,
      p.caseRate || '',
      p.gst || 18
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCsvFile(`adhira_products_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  }

  function exportGstCsv() {
    const quotes = db.quotations;
    const headers = ['Document No', 'Date', 'Customer Name', 'GSTIN', 'Place of Supply', 'Taxable Value', 'CGST', 'SGST', 'IGST', 'Total Tax'];
    const rows = quotes.map(q => [
      `"${q.number}"`,
      `"${q.date}"`,
      `"${q.customer.name.replace(/"/g, '""')}"`,
      `"${q.customer.gstin || ''}"`,
      `"${q.customer.stateCode || ''} - ${q.customer.state || ''}"`,
      q.taxable,
      q.cgst,
      q.sgst,
      q.igst,
      q.gstTotal
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCsvFile(`adhira_gst_breakdown_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  }

  // ==========================================================================
  // PUBLIC CONTROLLER API
  // ==========================================================================

  window.adhiraApp = {
    navigate: (page) => navigateTo(page),

    toggleUserRole: () => {
      currentUser.role = currentUser.role === 'Admin' ? 'Staff' : 'Admin';
      currentUser.name = currentUser.role === 'Admin' ? 'Murugan S.' : 'Billing Staff';
      showToast(`Switched active user to ${currentUser.name} (${currentUser.role})`, 'info');
      renderAppShell();
    },

    openNewQuotation: () => {
      state.editingQuoteId = null;
      draftQuote = null;
      localStorage.removeItem(DRAFT_KEY);
      navigateTo('new-quotation');
    },

    editQuotation: (id) => {
      state.editingQuoteId = id;
      draftQuote = null;
      navigateTo('new-quotation');
    },

    duplicateQuotation: (id) => {
      const original = db.quotations.find(q => q.id === id);
      if (!original) return;

      const copy = structuredClone(original);
      copy.id = 'Q-' + Date.now();
      copy.number = generateDocNumber('quote');
      incrementDocNumber('quote');
      copy.date = new Date().toISOString().slice(0, 10);
      copy.status = 'Draft';
      copy.createdAt = new Date().toISOString();
      copy.updatedAt = new Date().toISOString();

      db.quotations.push(copy);
      saveDatabase();
      showToast(`Quotation duplicated as ${copy.number}`, 'success');
      renderCurrentPage();
    },

    deleteQuotation: (id) => {
      if (currentUser.role === 'Staff') {
        showToast('Permission denied: Only Admin can delete quotation records.', 'error');
        return;
      }
      if (!confirm('Are you sure you want to delete this quotation permanently?')) return;

      const idx = db.quotations.findIndex(q => q.id === id);
      if (idx >= 0) {
        db.quotations.splice(idx, 1);
        saveDatabase();
        showToast('Quotation deleted', 'info');
        renderCurrentPage();
      }
    },

    promptConvertInvoice: (quoteId) => {
      openConvertInvoiceModal(quoteId);
    },

    executeInvoiceConversion: (e, quoteId) => {
      e.preventDefault();
      const q = db.quotations.find(x => x.id === quoteId);
      if (!q) return;

      const invNumber = generateDocNumber('invoice');
      incrementDocNumber('invoice');

      const invDate = document.getElementById('convInvDate').value;
      const dueDate = document.getElementById('convDueDate').value;
      const payStatus = document.getElementById('convPaymentStatus').value;
      const ewayNo = document.getElementById('convEwayNo').value.trim();
      const ewayDate = document.getElementById('convEwayDate').value;
      const transporter = document.getElementById('convTransporter').value.trim();
      const vehicleNo = document.getElementById('convVehicleNo').value.trim();

      const invoiceRecord = {
        id: 'INV-' + Date.now(),
        number: invNumber,
        quotationId: q.id,
        quotationNumber: q.number,
        date: invDate,
        dueDate: dueDate,
        customerId: q.customerId,
        customer: structuredClone(q.customer),
        seller: structuredClone(q.seller),
        items: structuredClone(q.items),
        subtotal: q.subtotal,
        discountTotal: q.discountTotal,
        taxable: q.taxable,
        gstTotal: q.gstTotal,
        cgst: q.cgst,
        sgst: q.sgst,
        igst: q.igst,
        roundOff: q.roundOff,
        grandTotal: q.grandTotal,
        status: payStatus,
        paymentStatus: payStatus,
        ewayBillNo: ewayNo,
        ewayBillDate: ewayDate,
        transporterName: transporter,
        vehicleNo: vehicleNo,
        dispatchPlace: q.seller.city || 'Sivakasi',
        deliveryPlace: q.destination || q.customer.city || '',
        notes: q.notes,
        createdAt: new Date().toISOString()
      };

      db.invoices.push(invoiceRecord);

      q.status = 'Converted';
      q.timeline.push({
        status: 'Converted',
        time: new Date().toISOString(),
        user: `${currentUser.name} (${currentUser.role})`
      });

      saveDatabase();
      closeModal();
      triggerCelebration();
      showToast(`Quotation ${q.number} converted to Tax Invoice ${invNumber}!`, 'success');
      navigateTo('invoices');
    },

    deleteInvoice: (id) => {
      if (currentUser.role === 'Staff') {
        showToast('Permission denied: Only Admin can delete invoice records.', 'error');
        return;
      }
      if (!confirm('Are you sure you want to delete this invoice?')) return;

      const idx = db.invoices.findIndex(i => i.id === id);
      if (idx >= 0) {
        db.invoices.splice(idx, 1);
        saveDatabase();
        showToast('Invoice deleted', 'info');
        renderCurrentPage();
      }
    },

    editInvoicePayment: (id) => {
      const inv = db.invoices.find(i => i.id === id);
      if (!inv) return;

      const newStatus = prompt('Update Payment Status (Paid / Unpaid / Partially Paid):', inv.paymentStatus || 'Paid');
      if (newStatus && ['Paid', 'Unpaid', 'Partially Paid'].includes(newStatus.trim())) {
        inv.paymentStatus = newStatus.trim();
        inv.status = newStatus.trim();
        saveDatabase();
        showToast('Payment status updated', 'success');
        renderCurrentPage();
      }
    },

    viewDocument: (type, id) => {
      const doc = type === 'quote'
        ? db.quotations.find(q => q.id === id)
        : db.invoices.find(i => i.id === id);

      if (!doc) {
        showToast('Document not found', 'error');
        return;
      }
      openPdfPreviewModal(doc, type === 'invoice');
    },

    previewDraftQuotation: () => {
      if (!draftQuote) return;
      const summary = calculateDocumentSummary(draftQuote.items, draftQuote.customer.stateCode);
      const previewObj = Object.assign({}, draftQuote, {
        subtotal: summary.subtotal,
        discountTotal: summary.totalDiscount,
        taxable: summary.taxableAmount,
        gstTotal: summary.totalGst,
        cgst: summary.cgst,
        sgst: summary.sgst,
        igst: summary.igst,
        roundOff: summary.roundOff,
        grandTotal: summary.grandTotal
      });
      openPdfPreviewModal(previewObj, false);
    },

    zoomPdf: (delta) => {
      state.zoomScale = Math.max(0.4, Math.min(2.0, state.zoomScale + delta));
      const sheet = document.getElementById('printableA4Document');
      const label = document.getElementById('zoomScaleLabel');
      if (sheet) sheet.style.transform = `scale(${state.zoomScale})`;
      if (label) label.textContent = `${Math.round(state.zoomScale * 100)}%`;
    },

    resetPdfZoom: () => {
      state.zoomScale = 1.0;
      const sheet = document.getElementById('printableA4Document');
      const label = document.getElementById('zoomScaleLabel');
      if (sheet) sheet.style.transform = 'scale(1)';
      if (label) label.textContent = '100%';
    },

    downloadPdfFile: (docNo) => {
      const element = document.getElementById('printableA4Document');
      if (!element) return;

      showToast('Rendering high-resolution A4 PDF...', 'info');

      if (typeof html2pdf !== 'undefined') {
        const opt = {
          margin: 0,
          filename: `${docNo.replace(/\//g, '_')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save().then(() => {
          showToast('PDF downloaded successfully!', 'success');
        }).catch(err => {
          console.error(err);
          window.print();
        });
      } else {
        window.print();
      }
    },

    shareWhatsApp: (docId, isInvoice) => {
      const doc = isInvoice ? db.invoices.find(i => i.id === docId) : db.quotations.find(q => q.id === docId);
      if (!doc) return;

      const title = isInvoice ? 'Tax Invoice' : 'Quotation';
      const text = `*ADHIRA FIRE WORKS & PYROTECH, SIVAKASI*\n${title} No: *${doc.number}*\nCustomer: ${doc.customer.name}\nDate: ${doc.date}\nTaxable Amount: ₹${doc.taxable}\nGST: ₹${doc.gstTotal}\n*Grand Total: ₹${doc.grandTotal}*\n\nThank you for choosing Adhira Pyrotech Sivakasi!`;
      const phone = (doc.customer.phone || '').replace(/\D/g, '');
      const url = phone ? `https://wa.me/91${phone}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    },

    shareEmail: (docId, isInvoice) => {
      const doc = isInvoice ? db.invoices.find(i => i.id === docId) : db.quotations.find(q => q.id === docId);
      if (!doc) return;

      const subject = `Adhira Pyrotech Sivakasi - ${isInvoice ? 'Tax Invoice' : 'Quotation'} ${doc.number}`;
      const body = `Dear ${doc.customer.name},\n\nPlease find the quotation/billing details below:\n\nDocument No: ${doc.number}\nDate: ${doc.date}\nTaxable Amount: ₹${doc.taxable}\nGrand Total: ₹${doc.grandTotal}\n\nWarm regards,\nADHIRA FIRE WORKS & PYROTECH\nSivakasi, Tamil Nadu\nPhone: +91 94431 23456`;
      const mailto = `mailto:${doc.customer.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    },

    // Rapid Customer GST Lookup & Auto-fill
    lookupCustomerByGstin: (gstinInput = '') => {
      const clean = gstinInput.trim().toUpperCase();
      if (!clean) return;

      const existing = db.customers.find(c => c.gstin === clean);
      if (existing) {
        window.adhiraApp.handleCustomerSelect(existing.id);
        showToast(`Existing shop "${existing.name}" auto-filled!`, 'success');
      } else {
        // Derive state from first 2 digits
        const stateCode = clean.slice(0, 2);
        const match = STATE_CODES.find(s => s.code === stateCode);
        if (match) {
          draftQuote.customer.gstin = clean;
          draftQuote.customer.state = match.name;
          draftQuote.customer.stateCode = match.code;
          const stSelect = document.getElementById('qCustState');
          const stCodeInput = document.getElementById('qCustStateCode');
          const gstinField = document.getElementById('qCustGstin');
          if (stSelect) stSelect.value = match.name;
          if (stCodeInput) stCodeInput.value = match.code;
          if (gstinField) gstinField.value = clean;
          document.getElementById('qCustName')?.focus();
          showToast(`GSTIN recognized: ${match.name} (Code: ${match.code}). Enter shop name.`, 'info');
        } else {
          showToast('No customer found with this GSTIN. Fill in shop details.', 'info');
        }
      }
    },

    handleCustomerSelect: (custId) => {
      if (!draftQuote) return;
      const c = db.customers.find(x => x.id === custId);
      if (!c) return;

      draftQuote.customerId = c.id;
      draftQuote.customer = structuredClone(c);
      draftQuote.destination = c.city || '';
      draftQuote.paymentTerms = c.paymentTerms || draftQuote.paymentTerms;

      renderCurrentPage();
      showToast(`Loaded saved shop: ${c.name}`, 'info');
    },

    handleGstinInput: (gstin) => {
      if (!draftQuote) return;
      const clean = gstin.trim().toUpperCase();
      draftQuote.customer.gstin = clean;

      const notice = document.getElementById('gstinValidationNotice');
      if (clean.length === 15) {
        if (isValidGstin(clean)) {
          if (notice) {
            notice.textContent = '✓ Valid GSTIN format';
            notice.style.color = 'var(--emerald-600)';
          }
          const derivedCode = clean.slice(0, 2);
          const stateMatch = STATE_CODES.find(s => s.code === derivedCode);
          if (stateMatch) {
            draftQuote.customer.state = stateMatch.name;
            draftQuote.customer.stateCode = derivedCode;
            const stSelect = document.getElementById('qCustState');
            const stCodeInput = document.getElementById('qCustStateCode');
            if (stSelect) stSelect.value = stateMatch.name;
            if (stCodeInput) stCodeInput.value = derivedCode;
          }
          const existing = db.customers.find(c => c.gstin === clean);
          if (existing && existing.id !== draftQuote.customerId) {
            if (confirm(`Found existing shop "${existing.name}" with this GSTIN. Auto-populate shop details?`)) {
              window.adhiraApp.handleCustomerSelect(existing.id);
              return;
            }
          }
        } else {
          if (notice) {
            notice.textContent = '⚠ Invalid GSTIN checksum format';
            notice.style.color = 'var(--rose-600)';
          }
        }
      } else {
        if (notice) notice.textContent = '';
      }
      updateLiveQuotationSummary();
    },

    handleStateChange: (stateName) => {
      if (!draftQuote) return;
      draftQuote.customer.state = stateName;
      const match = STATE_CODES.find(s => s.name === stateName);
      if (match) {
        draftQuote.customer.stateCode = match.code;
        const codeInput = document.getElementById('qCustStateCode');
        if (codeInput) codeInput.value = match.code;
      }
      updateLiveQuotationSummary();
    },

    handleSellerSelect: (sellerId) => {
      if (!draftQuote) return;
      const s = (db.sellers || []).find(x => x.id === sellerId);
      if (!s) return;
      draftQuote.seller = structuredClone(s);
      renderCurrentPage();
      showToast(`Switched seller profile to "${s.name}"`, 'success');
    },

    lookupSellerByGstin: (query = '') => {
      const clean = query.trim().toUpperCase();
      if (!clean) return;
      const matched = (db.sellers || []).find(s => s.gstin === clean || s.name.toUpperCase().includes(clean));
      if (matched) {
        window.adhiraApp.handleSellerSelect(matched.id);
      } else if (clean.length === 15) {
        const stateCode = clean.slice(0, 2);
        const match = STATE_CODES.find(s => s.code === stateCode);
        if (match && draftQuote && draftQuote.seller) {
          draftQuote.seller.gstin = clean;
          draftQuote.seller.state = match.name;
          draftQuote.seller.stateCode = match.code;
          const stCodeInput = document.getElementById('qSellerStateCode');
          const gstinField = document.getElementById('qSellerGstin');
          if (stCodeInput) stCodeInput.value = match.code;
          if (gstinField) gstinField.value = clean;
          showToast(`Seller GSTIN recognized for ${match.name} (Code: ${match.code})`, 'info');
        }
      }
    },

    handleSellerGstinInput: (val) => {
      if (!draftQuote) return;
      if (!draftQuote.seller) draftQuote.seller = structuredClone(db.company);
      const clean = val.trim().toUpperCase();
      draftQuote.seller.gstin = clean;
      const notice = document.getElementById('sellerGstinValidationNotice');
      if (clean.length === 15) {
        if (isValidGstin(clean)) {
          if (notice) {
            notice.textContent = '✓ Valid GSTIN format';
            notice.style.color = 'var(--emerald-600)';
          }
          const derivedCode = clean.slice(0, 2);
          draftQuote.seller.stateCode = derivedCode;
          const match = STATE_CODES.find(s => s.code === derivedCode);
          if (match) draftQuote.seller.state = match.name;
          const stCodeInput = document.getElementById('qSellerStateCode');
          if (stCodeInput) stCodeInput.value = derivedCode;
          const existing = (db.sellers || []).find(s => s.gstin === clean);
          if (existing && existing.id !== draftQuote.seller.id) {
            if (confirm(`Found registered factory profile "${existing.name}". Load profile?`)) {
              window.adhiraApp.handleSellerSelect(existing.id);
            }
          }
        } else {
          if (notice) {
            notice.textContent = '⚠ Invalid GSTIN format';
            notice.style.color = 'var(--rose-600)';
          }
        }
      } else {
        if (notice) notice.textContent = '';
      }
    },

    saveCurrentSellerAsNewProfile: () => {
      if (!draftQuote || !draftQuote.seller) return;
      const s = draftQuote.seller;
      const name = (s.name || '').trim();
      const gstin = (s.gstin || '').trim();
      if (!name || !gstin) {
        showToast('Factory name and GSTIN are required to save profile', 'error');
        return;
      }
      if (!db.sellers) db.sellers = [];
      const existing = db.sellers.find(x => x.gstin === gstin && x.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        Object.assign(existing, s);
        saveDatabase();
        showToast(`Factory profile "${name}" updated in database!`, 'success');
      } else {
        const newSeller = Object.assign({ id: 'SELLER-' + Date.now(), isDefault: false }, s);
        db.sellers.push(newSeller);
        s.id = newSeller.id;
        saveDatabase();
        showToast(`New factory profile "${name}" permanently stored in database!`, 'success');
      }
      renderCurrentPage();
    },

    openAddSellerModal: () => {
      const body = `
        <form onsubmit="window.adhiraApp.saveSellerModal(event)">
          <div class="form-grid grid-2">
            <div class="form-group col-span-2">
              <label class="form-label">Factory / Trade Name <span class="req">*</span></label>
              <input type="text" class="input" id="mSellerName" placeholder="e.g. ADHIRA FIRE WORKS & PYROTECH" required />
            </div>
            <div class="form-group">
              <label class="form-label">Seller GSTIN <span class="req">*</span></label>
              <input type="text" class="input" id="mSellerGstin" placeholder="15-digit GSTIN" maxlength="15" style="text-transform:uppercase;font-weight:700" required />
            </div>
            <div class="form-group">
              <label class="form-label">Legal Name / Proprietor</label>
              <input type="text" class="input" id="mSellerLegal" placeholder="Proprietor / Registered Name" />
            </div>
            <div class="form-group col-span-2">
              <label class="form-label">Factory Address <span class="req">*</span></label>
              <input type="text" class="input" id="mSellerAddr" placeholder="Street, Village / Industrial Estate" required />
            </div>
            <div class="form-group">
              <label class="form-label">City / Town <span class="req">*</span></label>
              <input type="text" class="input" id="mSellerCity" value="Sivakasi" required />
            </div>
            <div class="form-group">
              <label class="form-label">State <span class="req">*</span></label>
              <input type="text" class="input" id="mSellerState" value="Tamil Nadu" required />
            </div>
            <div class="form-group">
              <label class="form-label">State Code</label>
              <input type="text" class="input" id="mSellerStateCode" value="33" readonly style="background:var(--bg-subtle)" />
            </div>
            <div class="form-group">
              <label class="form-label">PIN Code</label>
              <input type="text" class="input" id="mSellerPin" value="626124" />
            </div>
            <div class="form-group">
              <label class="form-label">ARN / Reg. Ref. (GST Cert)</label>
              <input type="text" class="input" id="mSellerArn" value="AA330426046300R_RC13042026" />
            </div>
            <div class="form-group">
              <label class="form-label">Phone / Mobile <span class="req">*</span></label>
              <input type="text" class="input" id="mSellerPhone" placeholder="Mobile number" required />
            </div>
            <div class="form-group col-span-2">
              <label class="form-label">Email Address</label>
              <input type="email" class="input" id="mSellerEmail" placeholder="factory@adhirapyrotech.com" />
            </div>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:16px;">
            <button type="button" class="btn btn-secondary" onclick="window.adhiraApp.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-gold">Save Factory Profile</button>
          </div>
        </form>
      `;
      openModal('Register New From / Factory Profile', body);
      setTimeout(() => document.getElementById('mSellerName')?.focus(), 100);
    },

    saveSellerModal: (e) => {
      e.preventDefault();
      const name = document.getElementById('mSellerName').value.trim();
      const gstin = document.getElementById('mSellerGstin').value.trim().toUpperCase();
      if (!name || !gstin) {
        showToast('Factory name and GSTIN are required', 'error');
        return;
      }
      if (!db.sellers) db.sellers = [];
      const newSeller = {
        id: 'SELLER-' + Date.now(),
        name: name,
        legalName: document.getElementById('mSellerLegal').value.trim() || name,
        gstCertTradeName: name,
        gstin: gstin,
        pan: gstin.length >= 12 ? gstin.slice(2, 12) : '',
        address1: document.getElementById('mSellerAddr').value.trim(),
        address2: '',
        area: '',
        city: document.getElementById('mSellerCity').value.trim() || 'Sivakasi',
        district: 'Virudhunagar',
        state: document.getElementById('mSellerState').value.trim() || 'Tamil Nadu',
        stateCode: document.getElementById('mSellerStateCode').value.trim() || '33',
        pin: document.getElementById('mSellerPin').value.trim() || '626124',
        regArnRef: document.getElementById('mSellerArn').value.trim(),
        phone: document.getElementById('mSellerPhone').value.trim(),
        email: document.getElementById('mSellerEmail').value.trim(),
        bankName: db.company.bankName || '',
        accountNumber: db.company.accountNumber || '',
        ifsc: db.company.ifsc || '',
        upi: db.company.upi || '',
        isDefault: false
      };
      db.sellers.push(newSeller);
      saveDatabase();
      if (draftQuote) {
        draftQuote.seller = structuredClone(newSeller);
      }
      closeModal();
      showToast(`Factory "${name}" permanently registered in DB!`, 'success');
      renderCurrentPage();
    },

    stepItemQty: (idx, delta) => {
      if (!draftQuote || !draftQuote.items[idx]) return;
      const current = Number(draftQuote.items[idx].qty) || 1;
      const next = Math.max(1, current + delta);
      draftQuote.items[idx].qty = next;
      const inputEl = document.getElementById(`rowQty_${idx}`);
      if (inputEl) inputEl.value = next;
      updateLiveQuotationSummary();
    },

    openMobileSummaryModal: () => {
      if (!draftQuote) return;
      const summary = calculateDocumentSummary(draftQuote.items, draftQuote.customer.stateCode);
      const body = `
        <div class="summary-financials-box" style="box-shadow:none;border:none;padding:0;">
          <div class="summary-row">
            <span>Gross Product Total</span>
            <b>${formatMoney(summary.subtotal)}</b>
          </div>
          <div class="summary-row">
            <span>Total Discounts</span>
            <b style="color:var(--rose-600)">-${formatMoney(summary.totalDiscount)}</b>
          </div>
          <div class="summary-row">
            <span>Taxable Value</span>
            <b>${formatMoney(summary.taxableAmount)}</b>
          </div>
          ${summary.isInterstate ? `
            <div class="summary-row">
              <span>Integrated GST (IGST 18%)</span>
              <b style="color:var(--gold-600)">${formatMoney(summary.igst)}</b>
            </div>
          ` : `
            <div class="summary-row">
              <span>Central GST (CGST 9%)</span>
              <b style="color:var(--navy-600)">${formatMoney(summary.cgst)}</b>
            </div>
            <div class="summary-row">
              <span>State GST (SGST 9%)</span>
              <b style="color:var(--navy-600)">${formatMoney(summary.sgst)}</b>
            </div>
          `}
          <div class="summary-row">
            <span>Round Off Adjustment</span>
            <b>${summary.roundOff >= 0 ? '+' : ''}${formatMoney(summary.roundOff)}</b>
          </div>
          <div class="summary-row grand-total" style="margin-top:14px;">
            <div>
              <div class="gt-label">Grand Total</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.7)">Inclusive of all taxes</div>
            </div>
            <div class="gt-val">${formatMoney(summary.grandTotal)}</div>
          </div>
          <div style="margin-top:12px;font-size:11px;color:var(--text-muted);line-height:1.4">
            <b>Amount in Words:</b><br>
            <span>${convertAmountToWords(summary.grandTotal)}</span>
          </div>
        </div>
      `;
      openModal('Quotation Tax & Financial Breakdown', body, `
        <button class="btn btn-secondary" onclick="window.adhiraApp.closeModal()">Close</button>
        <button class="btn btn-gold" onclick="window.adhiraApp.closeModal(); window.adhiraApp.saveQuotation()">Save Quotation</button>
      `);
    },

    updateSellerField: (field, val) => {
      if (!draftQuote) return;
      if (!draftQuote.seller) draftQuote.seller = structuredClone(db.company);
      draftQuote.seller[field] = val;
    },

    resetSellerDetails: () => {
      if (!draftQuote) return;
      draftQuote.seller = (db.sellers && db.sellers.length > 0)
        ? structuredClone(db.sellers.find(s => s.isDefault) || db.sellers[0])
        : structuredClone(db.company);
      renderCurrentPage();
      showToast('Seller details reset to default factory', 'success');
    },

    setDefaultSeller: (id) => {
      (db.sellers || []).forEach(s => { s.isDefault = (s.id === id); });
      const chosen = (db.sellers || []).find(s => s.id === id);
      if (chosen) {
        Object.assign(db.company, chosen);
      }
      saveDatabase();
      showToast('Default factory profile updated', 'success');
      renderCurrentPage();
    },

    deleteSellerProfile: (id) => {
      if (currentUser.role === 'Staff') {
        showToast('Permission denied: Only Admin can delete factory profiles.', 'error');
        return;
      }
      if ((db.sellers || []).length <= 1) {
        showToast('At least one factory profile must be kept.', 'error');
        return;
      }
      const target = (db.sellers || []).find(s => s.id === id);
      if (!confirm(`Delete factory profile "${target ? target.name : id}"?`)) return;
      db.sellers = (db.sellers || []).filter(s => s.id !== id);
      if (!db.sellers.some(s => s.isDefault)) {
        db.sellers[0].isDefault = true;
      }
      saveDatabase();
      showToast('Factory profile removed', 'info');
      renderCurrentPage();
    },

    updateDraftField: (field, val) => {
      if (!draftQuote) return;
      draftQuote[field] = val;
    },

    updateCustomerField: (field, val) => {
      if (!draftQuote) return;
      draftQuote.customer[field] = val;
      if (field === 'stateCode') {
        updateLiveQuotationSummary();
      }
    },

    toggleSameAsBilling: (checked) => {
      if (!draftQuote) return;
      draftQuote.sameAsBilling = checked;
      const shipRow = document.getElementById('shippingAddressRow');
      if (shipRow) shipRow.style.display = checked ? 'none' : 'block';
    },

    // 1-Tap Quick Add Fireworks Chip
    quickAddProductToQuote: (prodId) => {
      if (!draftQuote) return;
      const p = db.products.find(x => x.id === prodId);
      if (!p) return;

      draftQuote.items.push({
        id: 'row-' + Date.now(),
        productId: p.id,
        name: p.name,
        hsn: p.hsn || '3604',
        packing: p.packing || '1 Pcs',
        qty: 1,
        unit: p.unit || 'CASE',
        rate: p.rate,
        discountType: 'fixed',
        discount: 0,
        gst: p.gst || 18
      });

      renderCurrentPage();
      showToast(`Added ${p.name} (₹${p.rate}) to quotation`, 'success');
    },

    handleRowProductSelect: (idx, prodId) => {
      if (!draftQuote || !draftQuote.items[idx]) return;
      const p = db.products.find(x => x.id === prodId);
      if (p) {
        draftQuote.items[idx].productId = p.id;
        draftQuote.items[idx].name = p.name;
        draftQuote.items[idx].hsn = p.hsn || '3604';
        draftQuote.items[idx].packing = p.packing || '1 (3 Pcs)';
        draftQuote.items[idx].unit = p.unit || 'CASE';
        draftQuote.items[idx].rate = p.rate;
        draftQuote.items[idx].gst = p.gst || 18;
      } else {
        draftQuote.items[idx].productId = '';
      }
      renderCurrentPage();
    },

    updateItemField: (idx, field, val) => {
      if (!draftQuote || !draftQuote.items[idx]) return;
      if (['qty', 'rate', 'discount', 'gst'].includes(field)) {
        draftQuote.items[idx][field] = Number(val) || 0;
      } else {
        draftQuote.items[idx][field] = val;
      }
      updateLiveQuotationSummary();
    },

    addQuoteItemRow: () => {
      if (!draftQuote) return;
      draftQuote.items.push({
        id: 'row-' + Date.now(),
        productId: '',
        name: '',
        hsn: '3604',
        packing: '',
        qty: 1,
        unit: 'CASE',
        rate: 0,
        discountType: 'fixed',
        discount: 0,
        gst: 18
      });
      renderCurrentPage();
    },

    removeRow: (idx) => {
      if (!draftQuote) return;
      if (draftQuote.items.length <= 1) {
        showToast('Quotation must contain at least one item row.', 'info');
        return;
      }
      draftQuote.items.splice(idx, 1);
      renderCurrentPage();
    },

    duplicateRow: (idx) => {
      if (!draftQuote || !draftQuote.items[idx]) return;
      const clone = structuredClone(draftQuote.items[idx]);
      clone.id = 'row-' + Date.now();
      draftQuote.items.splice(idx + 1, 0, clone);
      renderCurrentPage();
    },

    moveRow: (idx, delta) => {
      if (!draftQuote) return;
      const targetIdx = idx + delta;
      if (targetIdx < 0 || targetIdx >= draftQuote.items.length) return;
      const temp = draftQuote.items[idx];
      draftQuote.items[idx] = draftQuote.items[targetIdx];
      draftQuote.items[targetIdx] = temp;
      renderCurrentPage();
    },

    saveQuotation: () => {
      if (!draftQuote) return;

      const custName = (draftQuote.customer.name || '').trim();
      const gstin = (draftQuote.customer.gstin || '').trim();

      if (!custName) {
        showToast('Please enter customer / shop name.', 'error');
        document.getElementById('qCustName')?.focus();
        return;
      }

      if (!gstin) {
        showToast('Please enter customer GSTIN.', 'error');
        document.getElementById('qCustGstin')?.focus();
        return;
      }

      const validItems = draftQuote.items.filter(it => (it.name || it.productId) && it.qty > 0);
      if (validItems.length === 0) {
        showToast('Please add at least one fireworks product item.', 'error');
        return;
      }

      const summary = calculateDocumentSummary(validItems, draftQuote.customer.stateCode);

      let existingCust = db.customers.find(c => c.gstin === gstin);
      if (!existingCust) {
        existingCust = {
          id: 'CUST-' + Date.now(),
          name: custName,
          legalName: draftQuote.customer.legalName || custName,
          gstin: gstin,
          billingAddress: draftQuote.customer.billingAddress || '',
          shippingAddress: draftQuote.customer.shippingAddress || '',
          city: draftQuote.customer.city || '',
          state: draftQuote.customer.state || 'Tamil Nadu',
          stateCode: draftQuote.customer.stateCode || '33',
          pin: draftQuote.customer.pin || '',
          phone: draftQuote.customer.phone || '',
          email: draftQuote.customer.email || '',
          paymentTerms: draftQuote.paymentTerms || 'Advance',
          status: 'Active',
          createdAt: new Date().toISOString()
        };
        db.customers.push(existingCust);
      } else {
        existingCust.name = custName;
        if (draftQuote.customer.legalName) existingCust.legalName = draftQuote.customer.legalName;
        if (draftQuote.customer.billingAddress) existingCust.billingAddress = draftQuote.customer.billingAddress;
        if (draftQuote.customer.shippingAddress) existingCust.shippingAddress = draftQuote.customer.shippingAddress;
        if (draftQuote.customer.city) existingCust.city = draftQuote.customer.city;
        if (draftQuote.customer.state) existingCust.state = draftQuote.customer.state;
        if (draftQuote.customer.stateCode) existingCust.stateCode = draftQuote.customer.stateCode;
        if (draftQuote.customer.pin) existingCust.pin = draftQuote.customer.pin;
        if (draftQuote.customer.phone) existingCust.phone = draftQuote.customer.phone;
        if (draftQuote.customer.email) existingCust.email = draftQuote.customer.email;
        if (draftQuote.paymentTerms) existingCust.paymentTerms = draftQuote.paymentTerms;
      }
      draftQuote.customerId = existingCust.id;

      // Permanent sync of From Details (Seller / Factory Profile) into db.sellers
      if (draftQuote.seller) {
        const sName = (draftQuote.seller.name || '').trim();
        const sGstin = (draftQuote.seller.gstin || '').trim();
        if (sName && sGstin) {
          if (!db.sellers) db.sellers = [];
          let existingSeller = db.sellers.find(s => s.gstin === sGstin || s.name.toLowerCase() === sName.toLowerCase());
          if (!existingSeller) {
            existingSeller = {
              id: 'SELLER-' + Date.now(),
              name: sName,
              legalName: draftQuote.seller.legalName || sName,
              gstCertTradeName: draftQuote.seller.gstCertTradeName || sName,
              gstin: sGstin,
              regArnRef: draftQuote.seller.regArnRef || '',
              pan: draftQuote.seller.pan || (sGstin.length >= 12 ? sGstin.slice(2, 12) : ''),
              address1: draftQuote.seller.address1 || '',
              address2: draftQuote.seller.address2 || '',
              area: draftQuote.seller.area || '',
              city: draftQuote.seller.city || 'Sivakasi',
              district: draftQuote.seller.district || 'Virudhunagar',
              state: draftQuote.seller.state || 'Tamil Nadu',
              stateCode: draftQuote.seller.stateCode || '33',
              pin: draftQuote.seller.pin || '626124',
              phone: draftQuote.seller.phone || '',
              altPhone: draftQuote.seller.altPhone || '',
              email: draftQuote.seller.email || '',
              bankName: draftQuote.seller.bankName || db.company.bankName || '',
              accountNumber: draftQuote.seller.accountNumber || db.company.accountNumber || '',
              branch: draftQuote.seller.branch || db.company.branch || '',
              ifsc: draftQuote.seller.ifsc || db.company.ifsc || '',
              upi: draftQuote.seller.upi || db.company.upi || '',
              isDefault: false
            };
            db.sellers.push(existingSeller);
          } else {
            existingSeller.name = sName;
            if (draftQuote.seller.address1) existingSeller.address1 = draftQuote.seller.address1;
            if (draftQuote.seller.regArnRef) existingSeller.regArnRef = draftQuote.seller.regArnRef;
            if (draftQuote.seller.phone) existingSeller.phone = draftQuote.seller.phone;
            if (draftQuote.seller.email) existingSeller.email = draftQuote.seller.email;
          }
          draftQuote.seller.id = existingSeller.id;
        }
      }

      const finalQuote = {
        id: state.editingQuoteId || draftQuote.id || ('Q-' + Date.now()),
        number: draftQuote.number || generateDocNumber('quote'),
        date: draftQuote.date || new Date().toISOString().slice(0, 10),
        validUntil: draftQuote.validUntil || '',
        customerId: existingCust.id,
        customer: structuredClone(draftQuote.customer),
        seller: draftQuote.seller ? structuredClone(draftQuote.seller) : structuredClone(db.company),
        deliveryNote: draftQuote.deliveryNote || '',
        deliveryNoteDate: draftQuote.deliveryNoteDate || '',
        supplierRef: draftQuote.supplierRef || '',
        otherReferences: draftQuote.otherReferences || '',
        poNumber: draftQuote.poNumber || '',
        poDate: draftQuote.poDate || '',
        despatchDocNo: draftQuote.despatchDocNo || '',
        paymentTerms: draftQuote.paymentTerms || 'Advance',
        deliveryTerms: draftQuote.deliveryTerms || 'Ex-Factory Sivakasi',
        dispatchThrough: draftQuote.dispatchThrough || '',
        destination: draftQuote.destination || draftQuote.customer.city || '',
        billOfLadingNo: draftQuote.billOfLadingNo || '',
        motorVehicleNo: draftQuote.motorVehicleNo || '',
        termsOfDelivery: draftQuote.termsOfDelivery || 'Ex-Factory Sivakasi',
        salesPerson: draftQuote.salesPerson || currentUser.name,
        items: structuredClone(validItems),
        subtotal: summary.subtotal,
        discountTotal: summary.totalDiscount,
        taxable: summary.taxableAmount,
        gstTotal: summary.totalGst,
        cgst: summary.cgst,
        sgst: summary.sgst,
        igst: summary.igst,
        roundOff: summary.roundOff,
        grandTotal: summary.grandTotal,
        notes: draftQuote.notes || '',
        status: state.editingQuoteId ? (db.quotations.find(q => q.id === state.editingQuoteId)?.status || 'Issued') : 'Issued',
        timeline: state.editingQuoteId ? (db.quotations.find(q => q.id === state.editingQuoteId)?.timeline || []) : [
          { status: 'Issued', time: new Date().toISOString(), user: `${currentUser.name} (${currentUser.role})` }
        ],
        createdAt: state.editingQuoteId ? (db.quotations.find(q => q.id === state.editingQuoteId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (!state.editingQuoteId) {
        incrementDocNumber('quote');
        db.quotations.push(finalQuote);
      } else {
        const i = db.quotations.findIndex(q => q.id === state.editingQuoteId);
        if (i >= 0) db.quotations[i] = finalQuote;
      }

      saveDatabase();
      localStorage.removeItem(DRAFT_KEY);
      draftQuote = null;
      state.editingQuoteId = null;

      triggerCelebration();
      showToast(`Quotation ${finalQuote.number} saved permanently!`, 'success');
      navigateTo('quotations');
    },

    discardDraft: () => {
      if (confirm('Discard this draft quotation? All unsaved edits will be cleared.')) {
        localStorage.removeItem(DRAFT_KEY);
        draftQuote = null;
        state.editingQuoteId = null;
        showToast('Draft discarded', 'info');
        navigateTo('quotations');
      }
    },

    openQuickCustomerModal: () => {
      openCustomerModal();
    },

    openQuickProductModal: () => {
      openProductModal();
    },

    startQuoteForCustomer: (custId) => {
      state.editingQuoteId = null;
      draftQuote = null;
      localStorage.removeItem(DRAFT_KEY);
      initDraftQuote();
      const c = db.customers.find(x => x.id === custId);
      if (c) {
        draftQuote.customerId = c.id;
        draftQuote.customer = structuredClone(c);
        draftQuote.destination = c.city || '';
        draftQuote.paymentTerms = c.paymentTerms || 'Advance';
      }
      navigateTo('new-quotation');
    },

    openCustomerModal: (id) => openCustomerModal(id),
    editCustomer: (id) => openCustomerModal(id),

    saveCustomerModal: (e, id) => {
      e.preventDefault();
      const name = document.getElementById('mCustName').value.trim();
      const gstin = document.getElementById('mCustGstin').value.trim().toUpperCase();

      if (!name || !gstin) {
        showToast('Shop name and GSTIN are required.', 'error');
        return;
      }

      const duplicate = db.customers.find(c => c.gstin === gstin && c.id !== id);
      if (duplicate) {
        showToast(`GSTIN already registered for "${duplicate.name}". Duplicate prevented.`, 'error');
        return;
      }

      const stSelect = document.getElementById('mCustState');
      const selectedOption = stSelect.options[stSelect.selectedIndex];
      const stateCode = selectedOption.getAttribute('data-code') || '33';

      const customerObj = {
        id: id || ('CUST-' + Date.now()),
        name: name,
        legalName: document.getElementById('mCustLegal').value.trim() || name,
        gstin: gstin,
        type: document.getElementById('mCustType').value,
        billingAddress: document.getElementById('mCustBilling').value.trim(),
        shippingAddress: document.getElementById('mCustShipping').value.trim() || document.getElementById('mCustBilling').value.trim(),
        contactPerson: document.getElementById('mCustContact').value.trim(),
        phone: document.getElementById('mCustPhone').value.trim(),
        city: document.getElementById('mCustCity').value.trim(),
        state: stSelect.value,
        stateCode: stateCode,
        pin: document.getElementById('mCustPin').value.trim(),
        email: document.getElementById('mCustEmail').value.trim(),
        paymentTerms: document.getElementById('mCustTerms').value.trim() || 'Advance',
        status: 'Active',
        createdAt: id ? (db.customers.find(x => x.id === id)?.createdAt || new Date().toISOString()) : new Date().toISOString()
      };

      if (!id) {
        db.customers.push(customerObj);
        showToast(`Customer "${customerObj.name}" created`, 'success');
        if (state.page === 'new-quotation' && draftQuote) {
          draftQuote.customerId = customerObj.id;
          draftQuote.customer = structuredClone(customerObj);
        }
      } else {
        const i = db.customers.findIndex(x => x.id === id);
        if (i >= 0) db.customers[i] = customerObj;
        showToast(`Customer "${customerObj.name}" updated`, 'success');
      }

      saveDatabase();
      closeModal();
      renderCurrentPage();
    },

    deleteCustomer: (id) => {
      if (currentUser.role === 'Staff') {
        showToast('Permission denied: Only Admin can delete customer records.', 'error');
        return;
      }

      const hasQuotes = db.quotations.some(q => q.customerId === id);
      const hasInvoices = db.invoices.some(i => i.customerId === id);

      if (hasQuotes || hasInvoices) {
        if (confirm('This customer has existing quotation or invoice records. Deactivating status instead of destructive deletion to maintain document integrity. Proceed?')) {
          const c = db.customers.find(x => x.id === id);
          if (c) {
            c.status = 'Inactive';
            saveDatabase();
            showToast('Customer marked as Inactive', 'info');
            renderCurrentPage();
          }
        }
        return;
      }

      if (!confirm('Are you sure you want to permanently delete this customer?')) return;
      const idx = db.customers.findIndex(c => c.id === id);
      if (idx >= 0) {
        db.customers.splice(idx, 1);
        saveDatabase();
        showToast('Customer deleted', 'info');
        renderCurrentPage();
      }
    },

    validateModalGstin: (val) => {
      const clean = val.trim().toUpperCase();
      const fb = document.getElementById('mGstinFeedback');
      if (!fb) return;
      if (clean && !isValidGstin(clean)) {
        fb.textContent = '⚠ Warning: Format does not match 15-character GSTIN specification';
        fb.style.color = 'var(--rose-600)';
      } else if (clean) {
        fb.textContent = '✓ Format verified';
        fb.style.color = 'var(--emerald-600)';
      }
    },

    syncModalStateCode: (selectEl) => {
      const opt = selectEl.options[selectEl.selectedIndex];
      const code = opt.getAttribute('data-code');
      const codeInput = document.getElementById('mCustStateCode');
      if (codeInput && code) codeInput.value = code;
    },

    openProductModal: (id) => openProductModal(id),
    editProduct: (id) => openProductModal(id),

    setProductView: (mode) => {
      state.productViewMode = mode;
      renderCurrentPage();
    },

    duplicateProduct: (id) => {
      const p = db.products.find(x => x.id === id);
      if (!p) return;
      const copy = structuredClone(p);
      copy.id = 'P' + Date.now();
      copy.name = p.name + ' (Copy)';
      db.products.push(copy);
      saveDatabase();
      showToast(`Product duplicated as ${copy.name}`, 'success');
      renderCurrentPage();
    },

    handleProductImageUpload: (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 400;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          tempProductImage = canvas.toDataURL('image/jpeg', 0.85);

          const previewWrap = document.getElementById('mProdImgPreviewWrap');
          const previewImg = document.getElementById('mProdImgPreview');
          if (previewImg) previewImg.src = tempProductImage;
          if (previewWrap) previewWrap.style.display = 'block';
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    },

    clearProductImage: () => {
      tempProductImage = '';
      const previewWrap = document.getElementById('mProdImgPreviewWrap');
      if (previewWrap) previewWrap.style.display = 'none';
    },

    saveProductModal: (e, id) => {
      e.preventDefault();
      const name = document.getElementById('mProdName').value.trim();
      const rate = Number(document.getElementById('mProdRate').value) || 0;

      if (!name) {
        showToast('Product name is required.', 'error');
        return;
      }

      const productObj = {
        id: id || ('P' + Date.now()),
        name: name,
        shortName: name,
        category: document.getElementById('mProdCat').value,
        hsn: document.getElementById('mProdHsn').value.trim() || '3604',
        packing: document.getElementById('mProdPacking').value.trim(),
        unit: document.getElementById('mProdUnit').value,
        rate: rate,
        caseRate: Number(document.getElementById('mProdCaseRate').value) || 0,
        gst: Number(document.getElementById('mProdGst').value) || 18,
        image: tempProductImage || '',
        active: true
      };

      if (!id) {
        db.products.push(productObj);
        showToast(`Product "${productObj.name}" created`, 'success');
        if (state.page === 'new-quotation' && draftQuote) {
          draftQuote.items.push({
            id: 'row-' + Date.now(),
            productId: productObj.id,
            name: productObj.name,
            hsn: productObj.hsn,
            packing: productObj.packing,
            qty: 1,
            unit: productObj.unit,
            rate: productObj.rate,
            discountType: 'fixed',
            discount: 0,
            gst: productObj.gst
          });
        }
      } else {
        const i = db.products.findIndex(x => x.id === id);
        if (i >= 0) db.products[i] = productObj;
        showToast(`Product "${productObj.name}" updated`, 'success');
      }

      saveDatabase();
      closeModal();
      renderCurrentPage();
    },

    deleteProduct: (id) => {
      if (currentUser.role === 'Staff') {
        showToast('Permission denied: Only Admin can delete product records.', 'error');
        return;
      }
      if (!confirm('Are you sure you want to delete this product? Historical quotations will remain unaffected.')) return;

      const idx = db.products.findIndex(p => p.id === id);
      if (idx >= 0) {
        db.products.splice(idx, 1);
        saveDatabase();
        showToast('Product removed', 'info');
        renderCurrentPage();
      }
    },

    saveCompanySettings: (e) => {
      e.preventDefault();
      if (currentUser.role === 'Staff') {
        showToast('Permission denied: Only Admin can modify seller settings.', 'error');
        return;
      }

      Object.assign(db.company, {
        name: document.getElementById('setTradeName').value.trim(),
        legalName: document.getElementById('setLegalName').value.trim(),
        gstCertTradeName: document.getElementById('setGstCertTrade').value.trim(),
        gstin: document.getElementById('setGstin').value.trim().toUpperCase(),
        regArnRef: document.getElementById('setRegArn').value.trim(),
        pan: document.getElementById('setPan').value.trim().toUpperCase(),
        address1: document.getElementById('setAddr1').value.trim(),
        address2: document.getElementById('setAddr2').value.trim(),
        area: document.getElementById('setArea').value.trim(),
        city: document.getElementById('setCity').value.trim(),
        district: document.getElementById('setDistrict').value.trim(),
        state: document.getElementById('setState').value.trim(),
        stateCode: document.getElementById('setStateCode').value.trim(),
        pin: document.getElementById('setPin').value.trim(),
        phone: document.getElementById('setPhone').value.trim(),
        altPhone: document.getElementById('setAltPhone').value.trim(),
        email: document.getElementById('setEmail').value.trim(),
        website: document.getElementById('setWebsite').value.trim(),
        bankName: document.getElementById('setBankName').value.trim(),
        accountNumber: document.getElementById('setAccountNo').value.trim(),
        branch: document.getElementById('setBranch').value.trim(),
        ifsc: document.getElementById('setIfsc').value.trim().toUpperCase(),
        upi: document.getElementById('setUpi').value.trim(),
        signatoryName: document.getElementById('setSignatory').value.trim(),
        signatoryDesignation: document.getElementById('setSignatoryDesig').value.trim(),
        declaration: document.getElementById('setDeclaration').value.trim()
      });

      saveDatabase();
      showToast('Factory profile updated successfully!', 'success');
      renderAppShell();
    },

    saveNumberingSettings: () => {
      if (currentUser.role === 'Staff') {
        showToast('Permission denied: Only Admin can alter document sequences.', 'error');
        return;
      }

      db.settings.quotePrefix = document.getElementById('setQuotePrefix').value.trim() || 'QT';
      db.settings.invoicePrefix = document.getElementById('setInvoicePrefix').value.trim() || 'INV';
      db.settings.nextQuote = Math.max(1, Number(document.getElementById('setNextQuote').value) || 1);
      db.settings.nextInvoice = Math.max(1, Number(document.getElementById('setNextInvoice').value) || 1);

      saveDatabase();
      showToast('Document numbering settings saved!', 'success');
    },

    togglePdfSetting: (key, val) => {
      db.settings[key] = val;
      saveDatabase();
      showToast('PDF print preference updated', 'info');
    },

    exportFullBackup: () => {
      const dataStr = JSON.stringify(db, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `adhira_pyrotech_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Complete business backup exported', 'success');
    },

    importFullBackup: (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target.result);
          if (!parsed.company || !parsed.customers || !parsed.products) {
            throw new Error('Invalid schema: Missing essential entity collections');
          }
          db = parsed;
          saveDatabase();
          showToast('Backup restored successfully!', 'success');
          renderAppShell();
        } catch (err) {
          showToast('Failed to import backup: invalid JSON format', 'error');
        }
      };
      reader.readAsText(file);
    },

    resetToSeedData: () => {
      if (!confirm('Warning: This will reset all current records back to factory default seed data. Proceed?')) return;
      db = structuredClone(INITIAL_DB);
      saveDatabase();
      localStorage.removeItem(DRAFT_KEY);
      showToast('Reset to initial seed data complete', 'info');
      renderAppShell();
    },

    exportQuotationsCsv: () => exportQuotationsCsv(),
    exportInvoicesCsv: () => exportInvoicesCsv(),
    exportCustomersCsv: () => exportCustomersCsv(),
    exportProductsCsv: () => exportProductsCsv(),
    exportGstCsv: () => exportGstCsv(),

    openAddCategoryModal: () => {
      const body = `
        <div class="form-group">
          <label class="form-label">Category Name <span class="req">*</span></label>
          <input type="text" class="input" id="mCatName" placeholder="e.g. Festival Crackers, Fancy Sparklers" required />
        </div>
      `;
      openModal('Add New Category', body, `
        <button class="btn btn-secondary" onclick="window.adhiraApp.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.adhiraApp.saveCategoryModal()">Save Category</button>
      `);
      setTimeout(() => document.getElementById('mCatName')?.focus(), 100);
    },

    saveCategoryModal: () => {
      const name = document.getElementById('mCatName')?.value?.trim();
      if (!name) {
        showToast('Category name is required', 'error');
        return;
      }
      if (!db.categories) db.categories = [];
      if (db.categories.some(c => c.toLowerCase() === name.toLowerCase())) {
        showToast(`Category "${name}" already exists`, 'error');
        return;
      }
      db.categories.push(name);
      saveDatabase();
      closeModal();
      showToast(`Category "${name}" added successfully!`, 'success');
      navigateTo('categories');
    },

    openEditCategoryModal: (oldName) => {
      const body = `
        <div class="form-group">
          <label class="form-label">Category Name <span class="req">*</span></label>
          <input type="text" class="input" id="mCatEditName" value="${escapeHtml(oldName)}" required />
        </div>
      `;
      openModal('Rename Category', body, `
        <button class="btn btn-secondary" onclick="window.adhiraApp.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.adhiraApp.saveEditCategoryModal('${escapeHtml(oldName)}')">Update Category</button>
      `);
      setTimeout(() => {
        const inp = document.getElementById('mCatEditName');
        if (inp) { inp.focus(); inp.select(); }
      }, 100);
    },

    saveEditCategoryModal: (oldName) => {
      const newName = document.getElementById('mCatEditName')?.value?.trim();
      if (!newName) {
        showToast('Category name is required', 'error');
        return;
      }
      const idx = (db.categories || []).indexOf(oldName);
      if (idx === -1) return;
      db.categories[idx] = newName;
      (db.products || []).forEach(p => {
        if (p.category === oldName) p.category = newName;
      });
      saveDatabase();
      closeModal();
      showToast(`Category renamed to "${newName}"`, 'success');
      navigateTo('categories');
    },

    deleteCategory: (name) => {
      if (currentUser.role === 'Staff') {
        showToast('Permission denied: Only Admin can delete categories.', 'error');
        return;
      }
      const count = (db.products || []).filter(p => p.category === name).length;
      const msg = count > 0
        ? `Are you sure you want to delete category "${name}"? ${count} product(s) currently use this category and will become Uncategorized.`
        : `Are you sure you want to delete category "${name}"?`;
      if (!confirm(msg)) return;

      db.categories = (db.categories || []).filter(c => c !== name);
      (db.products || []).forEach(p => {
        if (p.category === name) p.category = 'Uncategorized';
      });
      saveDatabase();
      showToast(`Category "${name}" deleted`, 'info');
      navigateTo('categories');
    },

    filterProductsByCategory: (cat) => {
      state.productCategoryFilter = cat;
      navigateTo('products');
    },

    openDeviceSyncModal: () => openDeviceSyncModal(),
    syncDatabaseNow: async () => {
      showToast('Syncing with central database...', 'info');
      await syncFromServer(false);
      showToast('Realtime database synchronized across all devices!', 'success');
      renderCurrentPage();
    },
    backupDatabase: async () => {
      try {
        const res = await fetch('/api/backup', { method: 'POST' });
        if (res.ok) {
          const json = await res.json();
          showToast(`Server backup created: ${json.backupFile}`, 'success');
        } else {
          showToast('Failed to create server backup', 'error');
        }
      } catch (err) {
        showToast('Backup error: ' + err.message, 'error');
      }
    },
    showToast: (msg, type) => showToast(msg, type),
    closeModal: () => closeModal()
  };

  function openDeviceSyncModal() {
    const netUrl = (serverInfo && serverInfo.networkUrls && serverInfo.networkUrls[0])
      ? serverInfo.networkUrls[0].url
      : window.location.origin;

    const body = `
      <div style="padding: 10px 0;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 16px; text-align: center;">
          <div style="font-weight: 700; font-size: 15px; color: #091a33; margin-bottom: 4px;">
            📱 Scan with Mobile Camera
          </div>
          <p style="font-size: 12px; color: #64748b; margin: 0 0 14px;">
            Any phone or tablet on your Wi-Fi will open this billing app instantly!
          </p>
          <div class="sync-modal-qr-box" id="deviceSyncQrContainer" style="display:inline-block;padding:12px;background:#fff;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.06);"></div>
          
          <div class="sync-url-copy-box" style="margin-top:14px;">
            <span class="sync-url-text" id="syncUrlDisplay">${escapeHtml(netUrl)}</span>
            <button class="btn btn-secondary btn-sm" onclick="navigator.clipboard.writeText('${escapeHtml(netUrl)}'); window.adhiraApp.showToast('Network URL copied to clipboard!', 'success');">
              📋 Copy Link
            </button>
          </div>
        </div>

        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div>
              <h4 style="margin: 0; font-size: 13.5px; font-weight: 700; color: #091a33;">Central Server Database</h4>
              <div style="font-size: 11.5px; color: #10b981; font-weight: 600; margin-top: 2px;">
                ● Stored in server folder: <code>data/db.json</code>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.syncDatabaseNow()">
              🔄 Sync Now
            </button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; text-align: center;">
            <div style="background: #f1f5f9; padding: 8px; border-radius: 6px;">
              <div style="font-size: 10px; text-transform:uppercase; color: #64748b; font-weight:600;">Quotations</div>
              <div style="font-size: 16px; font-weight: 700; color: #091a33;">${db.quotations.length}</div>
            </div>
            <div style="background: #f1f5f9; padding: 8px; border-radius: 6px;">
              <div style="font-size: 10px; text-transform:uppercase; color: #64748b; font-weight:600;">Customers</div>
              <div style="font-size: 16px; font-weight: 700; color: #091a33;">${db.customers.length}</div>
            </div>
            <div style="background: #f1f5f9; padding: 8px; border-radius: 6px;">
              <div style="font-size: 10px; text-transform:uppercase; color: #64748b; font-weight:600;">Products</div>
              <div style="font-size: 16px; font-weight: 700; color: #091a33;">${db.products.length}</div>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 12px 16px;">
          <div>
            <div style="font-size: 12.5px; font-weight: 700; color: #92400e;">Backup Database to Server</div>
            <div style="font-size: 11px; color: #b45309;">Creates a timestamped snapshot file inside <code>backups/</code></div>
          </div>
          <button class="btn btn-gold btn-sm" onclick="window.adhiraApp.backupDatabase()">
            💾 Create Backup
          </button>
        </div>
      </div>
    `;

    openModal('📱 Multi-Device & Central Database', body, `
      <button class="btn btn-secondary" onclick="window.adhiraApp.closeModal()">Close</button>
    `);

    setTimeout(() => {
      const qrEl = document.getElementById('deviceSyncQrContainer');
      if (qrEl && typeof QRCode !== 'undefined') {
        qrEl.innerHTML = '';
        new QRCode(qrEl, {
          text: netUrl,
          width: 170,
          height: 170,
          colorDark: '#091a33',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
      }
    }, 60);
  }

  let initialized = false;
  async function bootApp() {
    if (initialized) return;
    initialized = true;
    renderAppShell();

    // Initial background sync with central server
    await fetchServerInfo();
    await syncFromServer(true);

    // Auto-sync polling every 6 seconds so any change from any device appears immediately
    setInterval(() => {
      syncFromServer(true);
    }, 6000);

    // Auto-sync on window focus
    window.addEventListener('focus', () => {
      syncFromServer(true);
    });
  }

  document.addEventListener('DOMContentLoaded', bootApp);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    bootApp();
  }
})();
