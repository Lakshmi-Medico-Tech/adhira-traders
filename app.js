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
    auth: {
      username: 'admin',
      password: 'admin',
      adminEmail: 'lakshmimedicotech25@gmail.com',
      lastUpdated: new Date().toISOString()
    },
    settings: {
      quotePrefix: 'QT',
      invoicePrefix: 'INV',
      nextQuote: 2,
      nextInvoice: 2,
      nextSimpleBill: 220,
      fyStartMonth: 4, // April
      watermarkEnabled: true,
      watermarkOpacity: 0.25,
      showBankDetails: true,
      showSignatory: true,
      showTerms: true,
      showDeclaration: true,
      showProductImagesInPdf: false
    },
    transporters: [
      {
        id: 'TRANS-001',
        name: 'VRL Logistics Sivakasi',
        gstin: '33AABCV1234F1Z1',
        phone: '9443100001',
        mode: 'ROAD',
        vehicleNumber: 'TN-67-AB-1234'
      }
    ],
    simpleBills: [],
    ewayBills: [],
    einvoices: [],
    auditLogs: [
      {
        id: 'LOG-001',
        timestamp: new Date().toISOString(),
        user: 'admin',
        action: 'SYSTEM_BOOT',
        details: 'Adhira Pyrotech Commercial GST Billing System Initialized'
      }
    ],
    gstConfig: {
      ewbProvider: 'NIC',
      ewbEnv: 'SANDBOX',
      einvProvider: 'NIC',
      einvEnv: 'SANDBOX',
      configured: false
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
      "Fountains & Smoke",
      "Aerial & Crackers",
      "Sparklers & Showers",
      "Novelty Fireworks",
      "Sound Crackers",
      "Gift Boxes",
      "ONE SOUND CRACKERS",
      "Kamatchi Ground Chakkars",
      "Kamatchi Flower Pots",
      "Kamatchi Atom Bomb",
      "Garland Special",
      "Thais Item",
      "Rajkala Items",
      "Sastha Items",
      "Fountains",
      "Kids Item",
      "Bijili Crackers",
      "Rockets",
      "Single Shot",
      "Shots",
      "Crackling Shot",
      "Matches Box",
      "Sparklers",
      "Gift Box"
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
      {
        "id": "P001",
        "name": "Fog (Smoke)",
        "shortName": "Fog Smoke",
        "hsn": "3604",
        "packing": "1 (3 Pcs)",
        "pieces": 3,
        "unit": "CASE",
        "rate": 75,
        "caseRate": 110,
        "category": "Fountains & Smoke",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P002",
        "name": "Mini Smoke",
        "shortName": "Mini Smoke",
        "hsn": "3604",
        "packing": "1 (3 Pcs)",
        "pieces": 3,
        "unit": "CASE",
        "rate": 60,
        "caseRate": 140,
        "category": "Fountains & Smoke",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P003",
        "name": "Thunder (Crackling)",
        "shortName": "Thunder Crack",
        "hsn": "3604",
        "packing": "1 (3 Pcs)",
        "pieces": 3,
        "unit": "CASE",
        "rate": 75,
        "caseRate": 110,
        "category": "Aerial & Crackers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P004",
        "name": "Thunder (Red & Green)",
        "shortName": "Thunder R&G",
        "hsn": "3604",
        "packing": "1 (3 Pcs)",
        "pieces": 3,
        "unit": "CASE",
        "rate": 75,
        "caseRate": 110,
        "category": "Aerial & Crackers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P005",
        "name": "Hand Shower (Water Queen)",
        "shortName": "Hand Shower",
        "hsn": "3604",
        "packing": "1 (3 Pcs)",
        "pieces": 3,
        "unit": "CASE",
        "rate": 75,
        "caseRate": 110,
        "category": "Sparklers & Showers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P006",
        "name": "Mony Bank",
        "shortName": "Money Bank",
        "hsn": "3604",
        "packing": "1 (3 Pcs)",
        "pieces": 3,
        "unit": "CASE",
        "rate": 60,
        "caseRate": 118,
        "category": "Novelty Fireworks",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P007",
        "name": "Crackling (Fountain 4”)",
        "shortName": "Crackling Ftn 4\"",
        "hsn": "3604",
        "packing": "1 (3 Pcs)",
        "pieces": 3,
        "unit": "CASE",
        "rate": 100,
        "caseRate": 75,
        "category": "Fountains & Smoke",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P008",
        "name": "Selfi Stick",
        "shortName": "Selfie Stick",
        "hsn": "3604",
        "packing": "1 (5 Pcs)",
        "pieces": 5,
        "unit": "CASE",
        "rate": 40,
        "caseRate": 140,
        "category": "Novelty Fireworks",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P009",
        "name": "Bat & Ball",
        "shortName": "Bat & Ball",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "CASE",
        "rate": 120,
        "caseRate": 80,
        "category": "Novelty Fireworks",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P010",
        "name": "Adhira Crackling",
        "shortName": "Adhira Crack",
        "hsn": "3604",
        "packing": "1 (4 Pcs)",
        "pieces": 4,
        "unit": "CASE",
        "rate": 100,
        "caseRate": 110,
        "category": "Aerial & Crackers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P011",
        "itemNo": "1",
        "name": "4\" Lakshmi",
        "shortName": "4\" Lakshmi",
        "hsn": "3604",
        "packing": "1 Pkt",
        "pieces": 1,
        "unit": "PKT",
        "rate": 160.0,
        "discRate": 16.0,
        "caseRate": 160.0,
        "category": "ONE SOUND CRACKERS",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P012",
        "itemNo": "2",
        "name": "4 dlxIX Lakshmi",
        "shortName": "4 dlxIX Lakshmi",
        "hsn": "3604",
        "packing": "1 Pkt",
        "pieces": 1,
        "unit": "PKT",
        "rate": 240.0,
        "discRate": 24.0,
        "caseRate": 240.0,
        "category": "ONE SOUND CRACKERS",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P013",
        "itemNo": "3",
        "name": "31/2 Lakshmi",
        "shortName": "31/2 Lakshmi",
        "hsn": "3604",
        "packing": "1 Pkt",
        "pieces": 1,
        "unit": "PKT",
        "rate": 120.0,
        "discRate": 12.0,
        "caseRate": 120.0,
        "category": "ONE SOUND CRACKERS",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P014",
        "itemNo": "4",
        "name": "23/4 kuruvi",
        "shortName": "23/4 kuruvi",
        "hsn": "3604",
        "packing": "1 Pkt",
        "pieces": 1,
        "unit": "PKT",
        "rate": 80.0,
        "discRate": 8.0,
        "caseRate": 80.0,
        "category": "ONE SOUND CRACKERS",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P015",
        "itemNo": "5",
        "name": "Gold Lakshmi",
        "shortName": "Gold Lakshmi",
        "hsn": "3604",
        "packing": "1 Pkt",
        "pieces": 1,
        "unit": "PKT",
        "rate": 270.0,
        "discRate": 27.0,
        "caseRate": 270.0,
        "category": "ONE SOUND CRACKERS",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P016",
        "itemNo": "6",
        "name": "Ground Chakker Big (10 Pcs)",
        "shortName": "Ground Chakker Big (10 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 260.0,
        "discRate": 26.0,
        "caseRate": 260.0,
        "category": "Kamatchi Ground Chakkars",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P017",
        "itemNo": "7",
        "name": "Ground Chakker Big (25 Pcs)",
        "shortName": "Ground Chakker Big (25 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 600.0,
        "discRate": 60.0,
        "caseRate": 600.0,
        "category": "Kamatchi Ground Chakkars",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P018",
        "itemNo": "8",
        "name": "Ground Chakker Special",
        "shortName": "Ground Chakker Special",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 550.0,
        "discRate": 55.0,
        "caseRate": 550.0,
        "category": "Kamatchi Ground Chakkars",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P019",
        "itemNo": "9",
        "name": "Ground Chakker Deluxe",
        "shortName": "Ground Chakker Deluxe",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1000.0,
        "discRate": 100.0,
        "caseRate": 1000.0,
        "category": "Kamatchi Ground Chakkars",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P020",
        "itemNo": "10",
        "name": "Disco Wheel",
        "shortName": "Disco Wheel",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 900.0,
        "discRate": 90.0,
        "caseRate": 900.0,
        "category": "Kamatchi Ground Chakkars",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P021",
        "itemNo": "11",
        "name": "Ganga Jamuna",
        "shortName": "Ganga Jamuna",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 480.0,
        "discRate": 48.0,
        "caseRate": 480.0,
        "category": "Kamatchi Flower Pots",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P022",
        "itemNo": "12",
        "name": "Flower Pots Big",
        "shortName": "Flower Pots Big",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 520.0,
        "discRate": 52.0,
        "caseRate": 520.0,
        "category": "Kamatchi Flower Pots",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P023",
        "itemNo": "13",
        "name": "Flower Pots Special",
        "shortName": "Flower Pots Special",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 600.0,
        "discRate": 60.0,
        "caseRate": 600.0,
        "category": "Kamatchi Flower Pots",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P024",
        "itemNo": "14",
        "name": "Flower Pots Asoka",
        "shortName": "Flower Pots Asoka",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 900.0,
        "discRate": 90.0,
        "caseRate": 900.0,
        "category": "Kamatchi Flower Pots",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P025",
        "itemNo": "15",
        "name": "Flower Pots Colour Kotti",
        "shortName": "Flower Pots Colour Kotti",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1500.0,
        "discRate": 150.0,
        "caseRate": 1500.0,
        "category": "Kamatchi Flower Pots",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P026",
        "itemNo": "16",
        "name": "Flower Pots Deluxe (5 Pcs)",
        "shortName": "Flower Pots Deluxe (5 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1500.0,
        "discRate": 150.0,
        "caseRate": 1500.0,
        "category": "Kamatchi Flower Pots",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P027",
        "itemNo": "17",
        "name": "Bullet Bomb",
        "shortName": "Bullet Bomb",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 160.0,
        "discRate": 16.0,
        "caseRate": 160.0,
        "category": "Kamatchi Atom Bomb",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P028",
        "itemNo": "18",
        "name": "Hydro Bomb",
        "shortName": "Hydro Bomb",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 600.0,
        "discRate": 60.0,
        "caseRate": 600.0,
        "category": "Kamatchi Atom Bomb",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P029",
        "itemNo": "19",
        "name": "King of King Bomb",
        "shortName": "King of King Bomb",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 750.0,
        "discRate": 75.0,
        "caseRate": 750.0,
        "category": "Kamatchi Atom Bomb",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P030",
        "itemNo": "20",
        "name": "Classic Bomb",
        "shortName": "Classic Bomb",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 900.0,
        "discRate": 90.0,
        "caseRate": 900.0,
        "category": "Kamatchi Atom Bomb",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P031",
        "itemNo": "21",
        "name": "Mega Bomb",
        "shortName": "Mega Bomb",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1800.0,
        "discRate": 180.0,
        "caseRate": 1800.0,
        "category": "Kamatchi Atom Bomb",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P032",
        "itemNo": "22",
        "name": "Paper Bomb 1/4 Kg",
        "shortName": "Paper Bomb 1/4 Kg",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 500.0,
        "discRate": 50.0,
        "caseRate": 500.0,
        "category": "Kamatchi Atom Bomb",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P033",
        "itemNo": "23",
        "name": "Paper Bomb 1/2 Kg",
        "shortName": "Paper Bomb 1/2 Kg",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1000.0,
        "discRate": 100.0,
        "caseRate": 1000.0,
        "category": "Kamatchi Atom Bomb",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P034",
        "itemNo": "24",
        "name": "Paper Bomb 1 Kg",
        "shortName": "Paper Bomb 1 Kg",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 2000.0,
        "discRate": 200.0,
        "caseRate": 2000.0,
        "category": "Kamatchi Atom Bomb",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P035",
        "itemNo": "25",
        "name": "100 wala",
        "shortName": "100 wala",
        "hsn": "3604",
        "packing": "1 Pkt",
        "pieces": 1,
        "unit": "PKT",
        "rate": 380.0,
        "discRate": 38.0,
        "caseRate": 380.0,
        "category": "Garland Special",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P036",
        "itemNo": "26",
        "name": "56 wala",
        "shortName": "56 wala",
        "hsn": "3604",
        "packing": "1 Pkt",
        "pieces": 1,
        "unit": "PKT",
        "rate": 440.0,
        "discRate": 44.0,
        "caseRate": 440.0,
        "category": "Garland Special",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P037",
        "itemNo": "27",
        "name": "28 wala",
        "shortName": "28 wala",
        "hsn": "3604",
        "packing": "1 Pkt",
        "pieces": 1,
        "unit": "PKT",
        "rate": 930.0,
        "discRate": 93.0,
        "caseRate": 930.0,
        "category": "Garland Special",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P038",
        "itemNo": "28",
        "name": "1000 wala",
        "shortName": "1000 wala",
        "hsn": "3604",
        "packing": "1 Pkt",
        "pieces": 1,
        "unit": "PKT",
        "rate": 1600.0,
        "discRate": 160.0,
        "caseRate": 1600.0,
        "category": "Garland Special",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P039",
        "itemNo": "29",
        "name": "1000 wala (Full)",
        "shortName": "1000 wala (Full)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 2500.0,
        "discRate": 250.0,
        "caseRate": 2500.0,
        "category": "Garland Special",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P040",
        "itemNo": "30",
        "name": "1 1/2 Twinkling Star",
        "shortName": "1 1/2 Twinkling Star",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 160.0,
        "discRate": 16.0,
        "caseRate": 160.0,
        "category": "Garland Special",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P041",
        "itemNo": "31",
        "name": "4\" Twinkling Star",
        "shortName": "4\" Twinkling Star",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 480.0,
        "discRate": 48.0,
        "caseRate": 480.0,
        "category": "Garland Special",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P042",
        "itemNo": "32",
        "name": "Drone",
        "shortName": "Drone",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 800.0,
        "discRate": 80.0,
        "caseRate": 800.0,
        "category": "Thais Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P043",
        "itemNo": "33",
        "name": "Rangeela Dhamaka (3 Pcs)",
        "shortName": "Rangeela Dhamaka (3 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1800.0,
        "discRate": 180.0,
        "caseRate": 1800.0,
        "category": "Thais Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P044",
        "itemNo": "34",
        "name": "Mega Crackling",
        "shortName": "Mega Crackling",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 1000.0,
        "discRate": 100.0,
        "caseRate": 1000.0,
        "category": "Thais Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P045",
        "itemNo": "35",
        "name": "Money Bank (3 Pcs)",
        "shortName": "Money Bank (3 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 700.0,
        "discRate": 70.0,
        "caseRate": 700.0,
        "category": "Thais Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P046",
        "itemNo": "36",
        "name": "Old is Gold ( 25 Pcs)",
        "shortName": "Old is Gold ( 25 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 700.0,
        "discRate": 70.0,
        "caseRate": 700.0,
        "category": "Thais Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P047",
        "itemNo": "37",
        "name": "Colour Smoke",
        "shortName": "Colour Smoke",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 900.0,
        "discRate": 90.0,
        "caseRate": 900.0,
        "category": "Thais Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P048",
        "itemNo": "38",
        "name": "Naruto Siren",
        "shortName": "Naruto Siren",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1000.0,
        "discRate": 100.0,
        "caseRate": 1000.0,
        "category": "Thais Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P049",
        "itemNo": "39",
        "name": "Bat Ball",
        "shortName": "Bat Ball",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 1100.0,
        "discRate": 110.0,
        "caseRate": 1100.0,
        "category": "Thais Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P050",
        "itemNo": "40",
        "name": "Rock Music",
        "shortName": "Rock Music",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 1800.0,
        "discRate": 180.0,
        "caseRate": 1800.0,
        "category": "Thais Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P051",
        "itemNo": "41",
        "name": "Spicy Chilis (25 Pcs)",
        "shortName": "Spicy Chilis (25 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 900.0,
        "discRate": 90.0,
        "caseRate": 900.0,
        "category": "Thais Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P052",
        "itemNo": "42",
        "name": "Tom & Jerry",
        "shortName": "Tom & Jerry",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 320.0,
        "discRate": 32.0,
        "caseRate": 320.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P053",
        "itemNo": "43",
        "name": "Scooby Doo",
        "shortName": "Scooby Doo",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 600.0,
        "discRate": 60.0,
        "caseRate": 600.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P054",
        "itemNo": "44",
        "name": "Goodly",
        "shortName": "Goodly",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 300.0,
        "discRate": 30.0,
        "caseRate": 300.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P055",
        "itemNo": "45",
        "name": "X- Mas",
        "shortName": "X- Mas",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1200.0,
        "discRate": 120.0,
        "caseRate": 1200.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P056",
        "itemNo": "46",
        "name": "Paris Tower",
        "shortName": "Paris Tower",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 1100.0,
        "discRate": 110.0,
        "caseRate": 1100.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P057",
        "itemNo": "47",
        "name": "Apple",
        "shortName": "Apple",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 1150.0,
        "discRate": 115.0,
        "caseRate": 1150.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P058",
        "itemNo": "48",
        "name": "Shin Chin (Tri Colour Fountain)",
        "shortName": "Shin Chin (Tri Colour Fountain)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1200.0,
        "discRate": 120.0,
        "caseRate": 1200.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P059",
        "itemNo": "49",
        "name": "Chhotu (Tri Colour Fountain)",
        "shortName": "Chhotu (Tri Colour Fountain)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1800.0,
        "discRate": 180.0,
        "caseRate": 1800.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P060",
        "itemNo": "50",
        "name": "Jelly",
        "shortName": "Jelly",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 600.0,
        "discRate": 60.0,
        "caseRate": 600.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P061",
        "itemNo": "51",
        "name": "Sea Laser",
        "shortName": "Sea Laser",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1200.0,
        "discRate": 120.0,
        "caseRate": 1200.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P062",
        "itemNo": "52",
        "name": "Colour Rain & Fun Fun",
        "shortName": "Colour Rain & Fun Fun",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 1200.0,
        "discRate": 120.0,
        "caseRate": 1200.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P063",
        "itemNo": "53",
        "name": "Colour Candles ( 3 Pcs)",
        "shortName": "Colour Candles ( 3 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1500.0,
        "discRate": 150.0,
        "caseRate": 1500.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P064",
        "itemNo": "54",
        "name": "Twins Tone",
        "shortName": "Twins Tone",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1600.0,
        "discRate": 160.0,
        "caseRate": 1600.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P065",
        "itemNo": "55",
        "name": "Belly Dance (Peacock)",
        "shortName": "Belly Dance (Peacock)",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 1600.0,
        "discRate": 160.0,
        "caseRate": 1600.0,
        "category": "Rajkala Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P066",
        "itemNo": "56",
        "name": "Touch & Touch (5 Pcs)",
        "shortName": "Touch & Touch (5 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 950.0,
        "discRate": 95.0,
        "caseRate": 950.0,
        "category": "Sastha Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P067",
        "itemNo": "57",
        "name": "Golden Rise (5 Pcs)",
        "shortName": "Golden Rise (5 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 950.0,
        "discRate": 95.0,
        "caseRate": 950.0,
        "category": "Sastha Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P068",
        "itemNo": "58",
        "name": "YoYo (3 Pcs)",
        "shortName": "YoYo (3 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1400.0,
        "discRate": 140.0,
        "caseRate": 1400.0,
        "category": "Sastha Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P069",
        "itemNo": "59",
        "name": "Selfie Stick",
        "shortName": "Selfie Stick",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1000.0,
        "discRate": 100.0,
        "caseRate": 1000.0,
        "category": "Sastha Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P070",
        "itemNo": "60",
        "name": "Bada Peacock",
        "shortName": "Bada Peacock",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 3500.0,
        "discRate": 350.0,
        "caseRate": 3500.0,
        "category": "Sastha Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P071",
        "itemNo": "61",
        "name": "Kutralam",
        "shortName": "Kutralam",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 1100.0,
        "discRate": 110.0,
        "caseRate": 1100.0,
        "category": "Sastha Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P072",
        "itemNo": "62",
        "name": "Golden Peacock",
        "shortName": "Golden Peacock",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 1600.0,
        "discRate": 160.0,
        "caseRate": 1600.0,
        "category": "Sastha Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P073",
        "itemNo": "63",
        "name": "Siwging Pop",
        "shortName": "Siwging Pop",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 1200.0,
        "discRate": 120.0,
        "caseRate": 1200.0,
        "category": "Sastha Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P074",
        "itemNo": "64",
        "name": "Super Singer ( 5 Pcs)",
        "shortName": "Super Singer ( 5 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1600.0,
        "discRate": 160.0,
        "caseRate": 1600.0,
        "category": "Sastha Items",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P075",
        "itemNo": "65",
        "name": "Golden Drops",
        "shortName": "Golden Drops",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 800.0,
        "discRate": 80.0,
        "caseRate": 800.0,
        "category": "Fountains",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P076",
        "itemNo": "66",
        "name": "Feather Drops",
        "shortName": "Feather Drops",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 800.0,
        "discRate": 80.0,
        "caseRate": 800.0,
        "category": "Fountains",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P077",
        "itemNo": "67",
        "name": "Chhota Bheem",
        "shortName": "Chhota Bheem",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1000.0,
        "discRate": 100.0,
        "caseRate": 1000.0,
        "category": "Fountains",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P078",
        "itemNo": "68",
        "name": "90 Watts (3 Pcs)",
        "shortName": "90 Watts (3 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1050.0,
        "discRate": 105.0,
        "caseRate": 1050.0,
        "category": "Fountains",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P079",
        "itemNo": "69",
        "name": "Loli Pop ( 5 Pcs)",
        "shortName": "Loli Pop ( 5 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1600.0,
        "discRate": 160.0,
        "caseRate": 1600.0,
        "category": "Fountains",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P080",
        "itemNo": "70",
        "name": "4 x 4 Wheel ( 5 Pcs)",
        "shortName": "4 x 4 Wheel ( 5 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1600.0,
        "discRate": 160.0,
        "caseRate": 1600.0,
        "category": "Fountains",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P081",
        "itemNo": "71",
        "name": "Power Thor (2 Pcs)",
        "shortName": "Power Thor (2 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1700.0,
        "discRate": 170.0,
        "caseRate": 1700.0,
        "category": "Fountains",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P082",
        "itemNo": "72",
        "name": "I Cone ( 2 Pcs)",
        "shortName": "I Cone ( 2 Pcs)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 2000.0,
        "discRate": 200.0,
        "caseRate": 2000.0,
        "category": "Fountains",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P083",
        "itemNo": "73",
        "name": "Roll Cap",
        "shortName": "Roll Cap",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 450.0,
        "discRate": 45.0,
        "caseRate": 450.0,
        "category": "Kids Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P084",
        "itemNo": "74",
        "name": "Kit Kat",
        "shortName": "Kit Kat",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1800.0,
        "discRate": 180.0,
        "caseRate": 1800.0,
        "category": "Kids Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P085",
        "itemNo": "75",
        "name": "Photo Flash",
        "shortName": "Photo Flash",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 350.0,
        "discRate": 35.0,
        "caseRate": 350.0,
        "category": "Kids Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P086",
        "itemNo": "76",
        "name": "Helicopter",
        "shortName": "Helicopter",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 650.0,
        "discRate": 65.0,
        "caseRate": 650.0,
        "category": "Kids Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P087",
        "itemNo": "77",
        "name": "Butterfly",
        "shortName": "Butterfly",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 700.0,
        "discRate": 70.0,
        "caseRate": 700.0,
        "category": "Kids Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P088",
        "itemNo": "78",
        "name": "Bambaram",
        "shortName": "Bambaram",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 800.0,
        "discRate": 80.0,
        "caseRate": 800.0,
        "category": "Kids Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P089",
        "itemNo": "79",
        "name": "Mercury Torch",
        "shortName": "Mercury Torch",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 350.0,
        "discRate": 35.0,
        "caseRate": 350.0,
        "category": "Kids Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P090",
        "itemNo": "80",
        "name": "Ultra Pencil",
        "shortName": "Ultra Pencil",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 650.0,
        "discRate": 65.0,
        "caseRate": 650.0,
        "category": "Kids Item",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P091",
        "itemNo": "81",
        "name": "Red Bijili (50 Pcs)",
        "shortName": "Red Bijili (50 Pcs)",
        "hsn": "3604",
        "packing": "1 Pkt",
        "pieces": 1,
        "unit": "PKT",
        "rate": 130.0,
        "discRate": 13.0,
        "caseRate": 130.0,
        "category": "Bijili Crackers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P092",
        "itemNo": "82",
        "name": "Stripped Bijili (50 Pcs)",
        "shortName": "Stripped Bijili (50 Pcs)",
        "hsn": "3604",
        "packing": "1 Pkt",
        "pieces": 1,
        "unit": "PKT",
        "rate": 150.0,
        "discRate": 15.0,
        "caseRate": 150.0,
        "category": "Bijili Crackers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P093",
        "itemNo": "83",
        "name": "Red Bijili (100 Pcs)",
        "shortName": "Red Bijili (100 Pcs)",
        "hsn": "3604",
        "packing": "1 Pkt",
        "pieces": 1,
        "unit": "PKT",
        "rate": 260.0,
        "discRate": 26.0,
        "caseRate": 260.0,
        "category": "Bijili Crackers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P094",
        "itemNo": "84",
        "name": "Stripped Bijili (100 Pcs)",
        "shortName": "Stripped Bijili (100 Pcs)",
        "hsn": "3604",
        "packing": "1 Pkt",
        "pieces": 1,
        "unit": "PKT",
        "rate": 300.0,
        "discRate": 30.0,
        "caseRate": 300.0,
        "category": "Bijili Crackers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P095",
        "itemNo": "81",
        "name": "Baby Rockets",
        "shortName": "Baby Rockets",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 300.0,
        "discRate": 30.0,
        "caseRate": 300.0,
        "category": "Rockets",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P096",
        "itemNo": "82",
        "name": "Rocket Bomb",
        "shortName": "Rocket Bomb",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 560.0,
        "discRate": 56.0,
        "caseRate": 560.0,
        "category": "Rockets",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P097",
        "itemNo": "83",
        "name": "Whistling Rockets",
        "shortName": "Whistling Rockets",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1200.0,
        "discRate": 120.0,
        "caseRate": 1200.0,
        "category": "Rockets",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P098",
        "itemNo": "84",
        "name": "X Press Rockets",
        "shortName": "X Press Rockets",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 400.0,
        "discRate": 40.0,
        "caseRate": 400.0,
        "category": "Rockets",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P099",
        "itemNo": "85",
        "name": "7 Shot",
        "shortName": "7 Shot",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 800.0,
        "discRate": 80.0,
        "caseRate": 800.0,
        "category": "Single Shot",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P100",
        "itemNo": "86",
        "name": "1\" Chotta Fancy",
        "shortName": "1\" Chotta Fancy",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 350.0,
        "discRate": 35.0,
        "caseRate": 350.0,
        "category": "Single Shot",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P101",
        "itemNo": "87",
        "name": "2\" Colour Fancy",
        "shortName": "2\" Colour Fancy",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 750.0,
        "discRate": 75.0,
        "caseRate": 750.0,
        "category": "Single Shot",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P102",
        "itemNo": "88",
        "name": "3 1/2 Colour Fancy",
        "shortName": "3 1/2 Colour Fancy",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 2500.0,
        "discRate": 250.0,
        "caseRate": 2500.0,
        "category": "Single Shot",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P103",
        "itemNo": "89",
        "name": "4\" Colour Fancy",
        "shortName": "4\" Colour Fancy",
        "hsn": "3604",
        "packing": "1 Pcs",
        "pieces": 1,
        "unit": "PCS",
        "rate": 2800.0,
        "discRate": 280.0,
        "caseRate": 2800.0,
        "category": "Single Shot",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P104",
        "itemNo": "90",
        "name": "1 3/4\" 3 Pcs Fancy",
        "shortName": "1 3/4\" 3 Pcs Fancy",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 2800.0,
        "discRate": 280.0,
        "caseRate": 2800.0,
        "category": "Single Shot",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P105",
        "itemNo": "91",
        "name": "3 Pcs Fancy",
        "shortName": "3 Pcs Fancy",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 2000.0,
        "discRate": 200.0,
        "caseRate": 2000.0,
        "category": "Single Shot",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P106",
        "itemNo": "93",
        "name": "30 Shot Multi Colour",
        "shortName": "30 Shot Multi Colour",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 3600.0,
        "discRate": 360.0,
        "caseRate": 3600.0,
        "category": "Shots",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P107",
        "itemNo": "94",
        "name": "60 Shot Multi Colour",
        "shortName": "60 Shot Multi Colour",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 7200.0,
        "discRate": 720.0,
        "caseRate": 7200.0,
        "category": "Shots",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P108",
        "itemNo": "95",
        "name": "120 Shot Multi Colour",
        "shortName": "120 Shot Multi Colour",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 14400.0,
        "discRate": 1440.0,
        "caseRate": 14400.0,
        "category": "Shots",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P109",
        "itemNo": "96",
        "name": "240 Shot Multi Colour",
        "shortName": "240 Shot Multi Colour",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 28000.0,
        "discRate": 2800.0,
        "caseRate": 28000.0,
        "category": "Shots",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P110",
        "itemNo": "97",
        "name": "12 Shot Crackling",
        "shortName": "12 Shot Crackling",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1100.0,
        "discRate": 110.0,
        "caseRate": 1100.0,
        "category": "Crackling Shot",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P111",
        "itemNo": "98",
        "name": "25 shot Crackling",
        "shortName": "25 shot Crackling",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 2100.0,
        "discRate": 210.0,
        "caseRate": 2100.0,
        "category": "Crackling Shot",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P112",
        "itemNo": "99",
        "name": "50 Shot Crackling",
        "shortName": "50 Shot Crackling",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 4200.0,
        "discRate": 420.0,
        "caseRate": 4200.0,
        "category": "Crackling Shot",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P113",
        "itemNo": "100",
        "name": "100 Shot Crackling",
        "shortName": "100 Shot Crackling",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 8400.0,
        "discRate": 840.0,
        "caseRate": 8400.0,
        "category": "Crackling Shot",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P114",
        "itemNo": "101",
        "name": "Ben - 10 - (10 Box)",
        "shortName": "Ben - 10 - (10 Box)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 800.0,
        "discRate": 80.0,
        "caseRate": 800.0,
        "category": "Matches Box",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P115",
        "itemNo": "102",
        "name": "Lamba (10 Box)",
        "shortName": "Lamba (10 Box)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1150.0,
        "discRate": 115.0,
        "caseRate": 1150.0,
        "category": "Matches Box",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P116",
        "itemNo": "103",
        "name": "Mega ( 10 Box)",
        "shortName": "Mega ( 10 Box)",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1900.0,
        "discRate": 190.0,
        "caseRate": 1900.0,
        "category": "Matches Box",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P117",
        "itemNo": "104",
        "name": "7 Cm Electric Sparklers",
        "shortName": "7 Cm Electric Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 90.0,
        "discRate": 9.0,
        "caseRate": 90.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P118",
        "itemNo": "105",
        "name": "7 Cm Colour Sparklers",
        "shortName": "7 Cm Colour Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 100.0,
        "discRate": 10.0,
        "caseRate": 100.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P119",
        "itemNo": "106",
        "name": "7 Cm Green Sparklers",
        "shortName": "7 Cm Green Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 120.0,
        "discRate": 12.0,
        "caseRate": 120.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P120",
        "itemNo": "107",
        "name": "7 Cm Red Sparklers",
        "shortName": "7 Cm Red Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 130.0,
        "discRate": 13.0,
        "caseRate": 130.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P121",
        "itemNo": "108",
        "name": "10 Cm Electric Sparklers",
        "shortName": "10 Cm Electric Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 150.0,
        "discRate": 15.0,
        "caseRate": 150.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P122",
        "itemNo": "109",
        "name": "10 Cm Colour Sparklers",
        "shortName": "10 Cm Colour Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 160.0,
        "discRate": 16.0,
        "caseRate": 160.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P123",
        "itemNo": "110",
        "name": "10 Cm Green Sparklers",
        "shortName": "10 Cm Green Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 160.0,
        "discRate": 16.0,
        "caseRate": 160.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P124",
        "itemNo": "111",
        "name": "12 Cm Electric Sparklers",
        "shortName": "12 Cm Electric Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 200.0,
        "discRate": 20.0,
        "caseRate": 200.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P125",
        "itemNo": "112",
        "name": "12 Cm colour Sparklers",
        "shortName": "12 Cm colour Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 230.0,
        "discRate": 23.0,
        "caseRate": 230.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P126",
        "itemNo": "113",
        "name": "12 Cm Green Sparklers",
        "shortName": "12 Cm Green Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 300.0,
        "discRate": 30.0,
        "caseRate": 300.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P127",
        "itemNo": "114",
        "name": "12 Cm Red Sparklers",
        "shortName": "12 Cm Red Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 330.0,
        "discRate": 33.0,
        "caseRate": 330.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P128",
        "itemNo": "115",
        "name": "15 Cm Electric Sparklers",
        "shortName": "15 Cm Electric Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 310.0,
        "discRate": 31.0,
        "caseRate": 310.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P129",
        "itemNo": "116",
        "name": "15 Cm Colour Sparklers",
        "shortName": "15 Cm Colour Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 340.0,
        "discRate": 34.0,
        "caseRate": 340.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P130",
        "itemNo": "117",
        "name": "15 Cm Green Sparklers",
        "shortName": "15 Cm Green Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 360.0,
        "discRate": 36.0,
        "caseRate": 360.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P131",
        "itemNo": "118",
        "name": "15 Cm Red Sparklers",
        "shortName": "15 Cm Red Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 380.0,
        "discRate": 38.0,
        "caseRate": 380.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P132",
        "itemNo": "119",
        "name": "30 Cm Electric Sparklers",
        "shortName": "30 Cm Electric Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 310.0,
        "discRate": 31.0,
        "caseRate": 310.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P133",
        "itemNo": "120",
        "name": "30 Cm Colour Sparklers",
        "shortName": "30 Cm Colour Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 340.0,
        "discRate": 34.0,
        "caseRate": 340.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P134",
        "itemNo": "121",
        "name": "30 Cm Green Sparklers",
        "shortName": "30 Cm Green Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 360.0,
        "discRate": 36.0,
        "caseRate": 360.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P135",
        "itemNo": "122",
        "name": "30 Cm Red Sparklers",
        "shortName": "30 Cm Red Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 390.0,
        "discRate": 39.0,
        "caseRate": 390.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P136",
        "itemNo": "123",
        "name": "50 Cm Electric Sparklers",
        "shortName": "50 Cm Electric Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1450.0,
        "discRate": 145.0,
        "caseRate": 1450.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P137",
        "itemNo": "124",
        "name": "50 Cm Colour Sparklers",
        "shortName": "50 Cm Colour Sparklers",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 1600.0,
        "discRate": 160.0,
        "caseRate": 1600.0,
        "category": "Sparklers",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P138",
        "itemNo": "125",
        "name": "20 Item Gift Box",
        "shortName": "20 Item Gift Box",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 2400.0,
        "discRate": 240.0,
        "caseRate": 2400.0,
        "category": "Gift Box",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P139",
        "itemNo": "126",
        "name": "40 Item Gift Box",
        "shortName": "40 Item Gift Box",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 5100.0,
        "discRate": 510.0,
        "caseRate": 5100.0,
        "category": "Gift Box",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P140",
        "itemNo": "127",
        "name": "50 Item Gift Box",
        "shortName": "50 Item Gift Box",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 7300.0,
        "discRate": 730.0,
        "caseRate": 7300.0,
        "category": "Gift Box",
        "gst": 18,
        "image": "",
        "active": true
      },
      {
        "id": "P141",
        "itemNo": "128",
        "name": "60 Item Gift Box",
        "shortName": "60 Item Gift Box",
        "hsn": "3604",
        "packing": "1 Box",
        "pieces": 1,
        "unit": "BOX",
        "rate": 11500.0,
        "discRate": 1150.0,
        "caseRate": 11500.0,
        "category": "Gift Box",
        "gst": 18,
        "image": "",
        "active": true
      }
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
    networkUrls: [{ ip: '10.64.104.66', url: 'http://10.64.104.66:3000', interface: 'Wi-Fi' }],
    dbStorageType: 'local_json',
    isPersistent: false,
    renderExternalUrl: null,
    keepAliveActive: false
  };

  // --- BROWSER INDEXEDDB FAILSAFE BACKUP ---
  const IDB_NAME = 'AdhiraPyrotechDB';
  const IDB_STORE = 'app_lifetime_store';
  function initIndexedDb() {
    return new Promise((resolve) => {
      if (!window.indexedDB) return resolve(null);
      const req = indexedDB.open(IDB_NAME, 2);
      req.onupgradeneeded = (e) => {
        const idb = e.target.result;
        if (!idb.objectStoreNames.contains(IDB_STORE)) {
          idb.createObjectStore(IDB_STORE, { keyPath: 'key' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    });
  }

  async function saveToIndexedDb(data) {
    try {
      const idb = await initIndexedDb();
      if (!idb) return;
      const tx = idb.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put({ key: 'main_backup', data: data, updatedAt: new Date().toISOString() });
    } catch (e) {
      console.warn('IndexedDB backup save warning:', e);
    }
  }

  async function loadFromIndexedDb() {
    try {
      const idb = await initIndexedDb();
      if (!idb) return null;
      return new Promise((resolve) => {
        const tx = idb.transaction(IDB_STORE, 'readonly');
        const req = tx.objectStore(IDB_STORE).get('main_backup');
        req.onsuccess = () => resolve(req.result ? req.result.data : null);
        req.onerror = () => resolve(null);
      });
    } catch (e) {
      return null;
    }
  }

  // --- INTELLIGENT BIDIRECTIONAL DATABASE MERGE (NEVER OVERWRITES USER DATA) ---
  function mergeDatabases(localData, remoteData) {
    const merged = structuredClone(localData || INITIAL_DB);
    if (!remoteData || typeof remoteData !== 'object') {
      return { merged, hasLocalChanges: false, hasRemoteChanges: false };
    }

    let hasLocalChanges = false;
    let hasRemoteChanges = false;

    // 1. QUOTATIONS: Union by ID & Number (Never delete any quotation from either side)
    const quoteMap = new Map();
    if (Array.isArray(remoteData.quotations)) {
      for (const q of remoteData.quotations) {
        if (q && (q.id || q.number)) quoteMap.set(q.id || q.number, q);
      }
    }
    if (Array.isArray(localData.quotations)) {
      for (const q of localData.quotations) {
        if (!q) continue;
        const key = q.id || q.number;
        if (!quoteMap.has(key)) {
          // Local has a quotation missing on remote server -> KEEP IT & PUSH TO SERVER
          quoteMap.set(key, q);
          hasLocalChanges = true;
        } else {
          // Compare update timestamps
          const remoteQ = quoteMap.get(key);
          const localTime = new Date(q.updatedAt || q.createdAt || 0).getTime();
          const remoteTime = new Date(remoteQ.updatedAt || remoteQ.createdAt || 0).getTime();
          if (localTime > remoteTime) {
            quoteMap.set(key, q);
            hasLocalChanges = true;
          } else if (remoteTime > localTime) {
            hasRemoteChanges = true;
          }
        }
      }
    }
    merged.quotations = Array.from(quoteMap.values());

    // 2. INVOICES: Union by ID & Number
    const invMap = new Map();
    if (Array.isArray(remoteData.invoices)) {
      for (const inv of remoteData.invoices) {
        if (inv && (inv.id || inv.number)) invMap.set(inv.id || inv.number, inv);
      }
    }
    if (Array.isArray(localData.invoices)) {
      for (const inv of localData.invoices) {
        if (!inv) continue;
        const key = inv.id || inv.number;
        if (!invMap.has(key)) {
          invMap.set(key, inv);
          hasLocalChanges = true;
        } else {
          const remoteInv = invMap.get(key);
          const localTime = new Date(inv.updatedAt || inv.createdAt || 0).getTime();
          const remoteTime = new Date(remoteInv.updatedAt || remoteInv.createdAt || 0).getTime();
          if (localTime > remoteTime) {
            invMap.set(key, inv);
            hasLocalChanges = true;
          } else if (remoteTime > localTime) {
            hasRemoteChanges = true;
          }
        }
      }
    }
    merged.invoices = Array.from(invMap.values());

    // 3. CUSTOMERS: Union by ID & GSTIN & Name
    const custMap = new Map();
    if (Array.isArray(remoteData.customers)) {
      for (const c of remoteData.customers) {
        if (c) custMap.set(c.id || c.gstin || c.name, c);
      }
    }
    if (Array.isArray(localData.customers)) {
      for (const c of localData.customers) {
        if (!c) continue;
        const key = c.id || c.gstin || c.name;
        if (!custMap.has(key)) {
          custMap.set(key, c);
          hasLocalChanges = true;
        } else {
          const remoteC = custMap.get(key);
          const localTime = new Date(c.updatedAt || c.createdAt || 0).getTime();
          const remoteTime = new Date(remoteC.updatedAt || remoteC.createdAt || 0).getTime();
          if (localTime > remoteTime) {
            custMap.set(key, c);
            hasLocalChanges = true;
          } else if (remoteTime > localTime) {
            hasRemoteChanges = true;
          }
        }
      }
    }
    merged.customers = Array.from(custMap.values());

    // 4. PRODUCTS: Merge catalog and custom products with full change tracking
    const prodMap = new Map();
    if (Array.isArray(remoteData.products)) {
      for (const p of remoteData.products) {
        if (p && p.id) prodMap.set(p.id, p);
      }
    }
    if (Array.isArray(localData.products)) {
      for (const p of localData.products) {
        if (!p || !p.id) continue;
        if (!prodMap.has(p.id)) {
          prodMap.set(p.id, p);
          hasLocalChanges = true;
        } else {
          const remoteP = prodMap.get(p.id);
          const localTime = new Date(p.updatedAt || p.createdAt || 0).getTime();
          const remoteTime = new Date(remoteP.updatedAt || remoteP.createdAt || 0).getTime();
          if (localTime > remoteTime) {
            prodMap.set(p.id, Object.assign({}, remoteP, p));
            hasLocalChanges = true;
          } else if (remoteTime > localTime) {
            hasRemoteChanges = true;
          } else {
            prodMap.set(p.id, Object.assign({}, remoteP, p));
          }
        }
      }
    }
    // Guarantee base catalog products from INITIAL_DB if missing from both
    if (Array.isArray(INITIAL_DB.products)) {
      for (const p of INITIAL_DB.products) {
        if (p && p.id && !prodMap.has(p.id)) {
          prodMap.set(p.id, structuredClone(p));
        }
      }
    }
    merged.products = Array.from(prodMap.values());

    // 5. CATEGORIES: Union set of all unique categories with change tracking
    const catSet = new Set();
    if (Array.isArray(remoteData.categories)) {
      for (const c of remoteData.categories) if (c) catSet.add(c);
    }
    if (Array.isArray(localData.categories)) {
      for (const c of localData.categories) {
        if (c && !catSet.has(c)) {
          catSet.add(c);
          hasLocalChanges = true;
        }
      }
    }
    if (catSet.size === 0 && Array.isArray(INITIAL_DB.categories)) {
      for (const c of INITIAL_DB.categories) if (c) catSet.add(c);
    }
    merged.categories = Array.from(catSet);

    // 6. COMPANY: Prefer newer updatedAt (or remoteData if updated on server)
    const remoteCoTime = new Date(remoteData.company?.updatedAt || 0).getTime();
    const localCoTime = new Date(localData.company?.updatedAt || 0).getTime();
    if (remoteCoTime > localCoTime) {
      merged.company = Object.assign({}, INITIAL_DB.company, localData.company || {}, remoteData.company || {});
    } else {
      merged.company = Object.assign({}, INITIAL_DB.company, remoteData.company || {}, localData.company || {});
    }

    // SETTINGS
    merged.settings = Object.assign({}, INITIAL_DB.settings, remoteData.settings || {}, localData.settings || {});

    // AUTH: Prefer newer lastUpdated so credentials updated via OTP always win
    const remoteAuthTime = new Date(remoteData.auth?.lastUpdated || 0).getTime();
    const localAuthTime = new Date(localData.auth?.lastUpdated || 0).getTime();
    if (remoteAuthTime > localAuthTime) {
      merged.auth = Object.assign({}, INITIAL_DB.auth, localData.auth || {}, remoteData.auth || {});
    } else {
      merged.auth = Object.assign({}, INITIAL_DB.auth, remoteData.auth || {}, localData.auth || {});
    }

    // SELLERS: Union by ID & GSTIN so all factory profiles are preserved across devices
    const sellerMap = new Map();
    const seedSellers = Array.isArray(INITIAL_DB.sellers) ? INITIAL_DB.sellers : [];
    for (const s of seedSellers) if (s && s.id) sellerMap.set(s.id, structuredClone(s));
    if (Array.isArray(remoteData.sellers)) {
      for (const s of remoteData.sellers) if (s && (s.id || s.gstin)) sellerMap.set(s.id || s.gstin, s);
    }
    if (Array.isArray(localData.sellers)) {
      for (const s of localData.sellers) {
        if (!s) continue;
        const key = s.id || s.gstin;
        if (!sellerMap.has(key)) {
          sellerMap.set(key, s);
          hasLocalChanges = true;
        } else {
          const remoteS = sellerMap.get(key);
          const sLocalTime = new Date(s.updatedAt || 0).getTime();
          const sRemoteTime = new Date(remoteS.updatedAt || 0).getTime();
          if (sLocalTime >= sRemoteTime) {
            sellerMap.set(key, Object.assign({}, remoteS, s));
          }
        }
      }
    }
    merged.sellers = Array.from(sellerMap.values());
    if (merged.sellers.length === 0 && INITIAL_DB.sellers) {
      merged.sellers = structuredClone(INITIAL_DB.sellers);
    }
    merged.transporters = Array.isArray(remoteData.transporters) && remoteData.transporters.length
      ? remoteData.transporters
      : (Array.isArray(localData.transporters) ? localData.transporters : INITIAL_DB.transporters);
    // SIMPLE BILLS: Union by ID & Number
    const sbMap = new Map();
    if (Array.isArray(remoteData.simpleBills)) {
      for (const sb of remoteData.simpleBills) {
        if (sb && (sb.id || sb.number)) sbMap.set(sb.id || sb.number, sb);
      }
    }
    if (Array.isArray(localData.simpleBills)) {
      for (const sb of localData.simpleBills) {
        if (!sb) continue;
        const key = sb.id || sb.number;
        if (!sbMap.has(key)) {
          sbMap.set(key, sb);
          hasLocalChanges = true;
        } else {
          const remoteSb = sbMap.get(key);
          const localTime = new Date(sb.updatedAt || sb.createdAt || 0).getTime();
          const remoteTime = new Date(remoteSb.updatedAt || remoteSb.createdAt || 0).getTime();
          if (localTime > remoteTime) {
            sbMap.set(key, sb);
            hasLocalChanges = true;
          } else if (remoteTime > localTime) {
            hasRemoteChanges = true;
          }
        }
      }
    }
    merged.simpleBills = Array.from(sbMap.values());
    merged.ewayBills = Array.isArray(remoteData.ewayBills) ? remoteData.ewayBills : (localData.ewayBills || []);
    merged.einvoices = Array.isArray(remoteData.einvoices) ? remoteData.einvoices : (localData.einvoices || []);
    merged.auditLogs = Array.isArray(remoteData.auditLogs) ? remoteData.auditLogs : (localData.auditLogs || INITIAL_DB.auditLogs);
    merged.gstConfig = Object.assign({}, INITIAL_DB.gstConfig, remoteData.gstConfig || {}, localData.gstConfig || {});

    // Auto-advance counters
    if (merged.settings) {
      const maxQ = merged.quotations.reduce((max, q) => {
        const m = (q.number || '').match(/(\d+)$/);
        return m ? Math.max(max, parseInt(m[1], 10)) : max;
      }, 0);
      if (maxQ >= (merged.settings.nextQuote || 1)) {
        merged.settings.nextQuote = maxQ + 1;
      }
      const maxI = merged.invoices.reduce((max, inv) => {
        const m = (inv.number || '').match(/(\d+)$/);
        return m ? Math.max(max, parseInt(m[1], 10)) : max;
      }, 0);
      if (maxI >= (merged.settings.nextInvoice || 1)) {
        merged.settings.nextInvoice = maxI + 1;
      }
      const maxSB = (merged.simpleBills || []).reduce((max, sb) => {
        const m = parseInt(sb.number, 10);
        return !isNaN(m) ? Math.max(max, m) : max;
      }, 0);
      if (maxSB >= (merged.settings.nextSimpleBill || 220)) {
        merged.settings.nextSimpleBill = maxSB + 1;
      }
    }

    return { merged, hasLocalChanges, hasRemoteChanges };
  }

  function updateSyncBadge(status, label) {
    syncStatus = status;
    const badge = document.getElementById('syncStatusBadge');
    if (badge) {
      badge.className = `sync-status-badge sync-${status}`;
      badge.innerHTML = `
        <span class="sync-dot"></span>
        <span class="sync-label">${escapeHtml(label || (status === 'synced' ? 'Realtime Synced' : status === 'syncing' ? 'Syncing...' : 'Local Cache'))}</span>
      `;
    }
  }

  function loadDatabase() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          // Guarantee baseline arrays/objects — but NEVER re-add demo sample docs
          if (!Array.isArray(parsed.quotations)) parsed.quotations = [];
          if (!Array.isArray(parsed.invoices)) parsed.invoices = [];
          if (!Array.isArray(parsed.simpleBills)) parsed.simpleBills = [];
          if (!Array.isArray(parsed.customers)) parsed.customers = [];
          if (!Array.isArray(parsed.sellers) || parsed.sellers.length === 0) {
            parsed.sellers = structuredClone(INITIAL_DB.sellers);
          }
          if (!parsed.company || !parsed.company.gstin) {
            parsed.company = structuredClone(INITIAL_DB.company);
          }
          if (!parsed.settings) parsed.settings = structuredClone(INITIAL_DB.settings);
          // Merge product catalog without injecting demo sample records
          if (!Array.isArray(parsed.products) || parsed.products.length === 0) {
            parsed.products = structuredClone(INITIAL_DB.products);
          } else {
            const existingIds = new Set(parsed.products.map(p => p && p.id).filter(Boolean));
            for (const baseP of (INITIAL_DB.products || [])) {
              if (baseP && baseP.id && !existingIds.has(baseP.id)) {
                parsed.products.push(structuredClone(baseP));
              }
            }
          }
          if (!Array.isArray(parsed.categories) || parsed.categories.length === 0) {
            parsed.categories = structuredClone(INITIAL_DB.categories);
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading DB from localStorage:', e);
    }
    return structuredClone(INITIAL_DB);
  }

  function saveDatabase(data) {
    const payload = data || db;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      saveToIndexedDb(payload);
    } catch (e) {
      console.error('Error saving DB to storage:', e);
    }
    // Push to central backend database asynchronously
    pushDbToServer(payload);
  }

  // Universal API caller: On cPanel (port 80/443) → api.php first. On local dev (port 3000) → Node first.
  let detectedApiMode = null; // 'node' or 'php'

  async function callApi(endpoint, options = {}) {
    const base = window.__adhiraApiBase || '';
    const port = window.location.port;
    const isLocalNode = port === '3000' || port === '4000' || port === '8080';

    // On cPanel hosting (standard ports 80/443, no custom port) → api.php is the backend.
    // Skip the /api/ Node.js attempt completely on cPanel — it will 404 and waste a round-trip.
    if (!isLocalNode || detectedApiMode === 'php') {
      try {
        const phpRes = await fetch(`${base}api.php?action=${endpoint}`, options);
        const ct = phpRes.headers.get('content-type') || '';
        if (ct.includes('application/json') || ct.includes('text/')) {
          detectedApiMode = 'php';
          return phpRes;
        }
      } catch (phpErr) {
        // php call failed, fall through to node attempt
      }
    }

    // Local Node.js dev server: try /api/ path first
    try {
      const res = await fetch(`${base}/api/${endpoint}`, options);
      const ct = res.headers.get('content-type') || '';
      if (res.ok && ct.includes('application/json')) {
        detectedApiMode = 'node';
        return res;
      }
      if (res.ok) {
        detectedApiMode = 'node';
        return res;
      }
    } catch (e) {
      // network error, try php fallback
    }

    // Final fallback: api.php
    try {
      const phpFallback = await fetch(`${base}api.php?action=${endpoint}`, options);
      detectedApiMode = 'php';
      return phpFallback;
    } catch (err) {
      throw err;
    }
  }

  // -------------------------------------------------------
  // CLOUD SYNC — Supabase primary, Node/PHP as fallback
  // -------------------------------------------------------

  async function pushDbToServer(payload) {
    try {
      updateSyncBadge('syncing', 'Saving...');

      // 1. Try Supabase first (Cloudflare Pages / any static host)
      if (window.AdhiraSupabase && window.AdhiraSupabase.isConfigured()) {
        const ok = await window.AdhiraSupabase.saveDatabase(payload);
        if (ok) {
          updateSyncBadge('synced', 'Cloud Synced ☁');
          return;
        }
      }

      // 2. Fallback: Node.js or PHP backend (local dev / cPanel)
      const res = await callApi('db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res && res.ok) {
        updateSyncBadge('synced', 'Realtime Synced');
      } else {
        updateSyncBadge('offline', 'Sync Error');
      }
    } catch (err) {
      console.warn('Network sync to server failed, stored safely in local storage & IndexedDB:', err);
      updateSyncBadge('offline', 'Local Safe Cache');
    }
  }

  async function syncFromServer(silent = false) {
    if (isSyncing) return;
    isSyncing = true;
    try {
      if (!silent) updateSyncBadge('syncing', 'Syncing...');

      // 1. Try Supabase first
      if (window.AdhiraSupabase && window.AdhiraSupabase.isConfigured()) {
        const serverDb = await window.AdhiraSupabase.getDatabase();
        if (serverDb && typeof serverDb === 'object') {
          const { merged, hasLocalChanges, hasRemoteChanges } = mergeDatabases(db, serverDb);
          db = merged;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
          saveToIndexedDb(db);
          if (hasLocalChanges) {
            console.log('[Supabase] Pushing local-only records to cloud...');
            await pushDbToServer(db);
          }
          if (hasRemoteChanges) {
            if (!state.activeModal && state.page !== 'newQuote' && state.page !== 'editQuote') {
              renderCurrentPage();
            }
          }
          updateSyncBadge('synced', 'Cloud Synced ☁');
          isSyncing = false;
          return;
        } else {
          // Supabase has no data yet — push current local DB to initialise it
          await window.AdhiraSupabase.saveDatabase(db);
          updateSyncBadge('synced', 'Cloud Synced ☁');
          isSyncing = false;
          return;
        }
      }

      // 2. Fallback: Node.js or PHP backend
      const res = await callApi('db');
      if (res && res.ok) {
        const json = await res.json();
        if (json && json.initialized && json.data) {
          const serverDb = json.data;
          const { merged, hasLocalChanges, hasRemoteChanges } = mergeDatabases(db, serverDb);
          db = merged;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
          saveToIndexedDb(db);
          if (hasLocalChanges) {
            console.log('Restoring server database with local records...');
            await pushDbToServer(db);
          }
          if (hasRemoteChanges) {
            if (!state.activeModal && state.page !== 'newQuote' && state.page !== 'editQuote') {
              renderCurrentPage();
            }
          }
          updateSyncBadge('synced', 'Realtime Synced');
        } else if (json && !json.initialized) {
          await pushDbToServer(db);
        }
      }
    } catch (err) {
      console.warn('Cannot reach server for DB sync:', err);
      updateSyncBadge('offline', 'Local Safe Cache');
    } finally {
      isSyncing = false;
    }
  }

  // Realtime Supabase subscription (fires when another browser/device saves)
  function startSupabaseRealtime() {
    if (!window.AdhiraSupabase || !window.AdhiraSupabase.isConfigured()) return;
    window.AdhiraSupabase.subscribeRealtime(async (remoteData) => {
      if (!remoteData || typeof remoteData !== 'object') return;
      const { merged, hasRemoteChanges } = mergeDatabases(db, remoteData);
      db = merged;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      saveToIndexedDb(db);
      if (hasRemoteChanges) {
        updateSyncBadge('synced', 'Cloud Synced ☁');
        if (!state.activeModal && state.page !== 'newQuote' && state.page !== 'editQuote') {
          renderCurrentPage();
        }
      }
    });
    console.log('[Supabase Realtime] Multi-device live-sync activated.');
  }

  async function fetchServerInfo() {
    try {
      // Supabase connection test (shows in sync badge tooltip)
      if (window.AdhiraSupabase && window.AdhiraSupabase.isConfigured()) {
        const result = await window.AdhiraSupabase.testConnection();
        serverInfo = {
          dbStorageType: result.ok ? 'supabase_cloud' : 'local_json',
          isPersistent: result.ok,
          supabaseLatency: result.latencyMs || null
        };
        return;
      }
      // Fallback: ask Node/PHP server
      const res = await callApi('info');
      if (res && res.ok) {
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

  // --- AUTHENTICATION SYSTEM ---
  const AUTH_SESSION_KEY = 'adhira_auth_v1';

  function isLoggedIn() {
    try {
      const sess = sessionStorage.getItem(AUTH_SESSION_KEY);
      if (!sess) return false;
      const parsed = JSON.parse(sess);
      // Session expires after 8 hours
      return parsed && parsed.username && (Date.now() - parsed.ts < 8 * 60 * 60 * 1000);
    } catch (e) { return false; }
  }

  function getSessionUser() {
    try {
      return JSON.parse(sessionStorage.getItem(AUTH_SESSION_KEY));
    } catch (e) { return null; }
  }

  function setSession(username) {
    sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
      username,
      name: username === 'admin' ? (db.company.signatoryName || 'Admin') : username,
      role: 'Admin',
      ts: Date.now()
    }));
  }

  function clearSession() {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  }

  function renderLoginPage() {
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = `
      <div class="auth-wrapper" id="authWrapper">
        <div class="auth-card">
          <div class="auth-card-header">
            <div class="auth-logo-badge">
              <img src="${LOGO_PATH}" alt="Adhira Pyrotech Logo" />
            </div>
            <h1 class="auth-card-title">ADHIRA PYROTECH</h1>
            <p class="auth-card-subtitle">Commercial GST Billing System • Sivakasi</p>
          </div>
          <div class="auth-card-body">
            <div id="loginErrorMsg" style="display:none;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px 14px;font-size:12.5px;color:#b91c1c;margin-bottom:14px;"></div>

            <div class="form-group" style="margin-bottom:14px;">
              <label class="form-label" style="font-size:12.5px;font-weight:600;">Username</label>
              <input type="text" id="loginUsername" class="input" placeholder="Enter username" autocomplete="username"
                value="" style="height:42px;font-size:14px;" />
            </div>

            <div class="form-group" style="margin-bottom:6px;">
              <label class="form-label" style="font-size:12.5px;font-weight:600;">Password</label>
              <div class="auth-input-wrapper">
                <input type="password" id="loginPassword" class="input" placeholder="Enter password"
                  autocomplete="current-password" style="height:42px;font-size:14px;"
                  onkeydown="if(event.key==='Enter') window.adhiraApp.handleLogin()" />
                <button type="button" class="auth-password-toggle" id="loginPwdToggle"
                  onclick="window.adhiraApp.toggleLoginPwd()" title="Show/hide password">👁</button>
              </div>
            </div>

            <button class="auth-submit-btn" id="loginBtn" onclick="window.adhiraApp.handleLogin()">
              <span>🔐</span>
              <span>Sign In to Billing</span>
            </button>

          </div>
        </div>

        <div class="auth-powered-by">
          Powered by <strong>LAXORA Technologies</strong> | <a href="tel:+917094062522">+91 70940 62522</a>
        </div>
      </div>
    `;

    // Focus username field
    setTimeout(() => document.getElementById('loginUsername')?.focus(), 80);
  }

  function toggleLoginPwd() {
    const pwdInput = document.getElementById('loginPassword');
    const toggleBtn = document.getElementById('loginPwdToggle');
    if (!pwdInput) return;
    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      if (toggleBtn) toggleBtn.textContent = '🔒';
    } else {
      pwdInput.type = 'password';
      if (toggleBtn) toggleBtn.textContent = '👁';
    }
  }

  async function handleLogin() {
    const userEl = document.getElementById('loginUsername');
    const passEl = document.getElementById('loginPassword');
    const errEl = document.getElementById('loginErrorMsg');
    const btnEl = document.getElementById('loginBtn');

    const username = (userEl ? userEl.value : '').trim();
    const password = (passEl ? passEl.value : '').trim();

    if (!username || !password) {
      if (errEl) {
        errEl.textContent = 'Please enter both username and password.';
        errEl.style.display = 'block';
      }
      return;
    }

    if (btnEl) {
      btnEl.disabled = true;
      btnEl.innerHTML = `<span>⏳</span><span>Verifying...</span>`;
    }

    let authenticated = false;
    let authUser = username;

    // 1. Try server backend login API first
    try {
      const res = await callApi('auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res && res.ok) {
        const json = await res.json();
        if (json && json.success) {
          authenticated = true;
          if (json.user && json.user.username) authUser = json.user.username;
        }
      }
    } catch (e) {
      console.warn('Backend login check failed, checking local credentials cache:', e);
    }

    // 2. Fallback to local db.auth
    if (!authenticated) {
      const expectedUser = (db.auth && db.auth.username) ? db.auth.username : 'admin';
      const expectedPass = (db.auth && db.auth.password) ? db.auth.password : 'admin';

      if (username === expectedUser && password === expectedPass) {
        authenticated = true;
        authUser = expectedUser;
      }
    }

    if (authenticated) {
      setSession(authUser);
      currentUser.username = authUser;
      currentUser.name = (db.company && db.company.signatoryName) ? db.company.signatoryName : 'Admin';
      currentUser.role = 'Admin';

      renderAppShell();
      renderCurrentPage();
      showToast(`Welcome, Administrator!`, 'success');

      // Initialize background sync with server
      fetchServerInfo();
      syncFromServer(true);
    } else {
      if (btnEl) {
        btnEl.disabled = false;
        btnEl.innerHTML = `<span>🔐</span><span>Sign In to Billing</span>`;
      }
      if (errEl) {
        errEl.textContent = 'Invalid username or password. (Default is admin / admin)';
        errEl.style.display = 'block';
      }
      if (passEl) {
        passEl.value = '';
        passEl.focus();
      }
    }
  }

  function handleLogout() {
    clearSession();
    renderLoginPage();
    showToast('Signed out successfully.', 'info');
  }

  function openChangeCredentialsModal() {
    const currentUsername = (db.auth && db.auth.username) ? db.auth.username : 'admin';
    const currentPassword = (db.auth && db.auth.password) ? db.auth.password : 'admin';
    const currentEmail = (db.auth && db.auth.adminEmail) ? db.auth.adminEmail : 'lakshmimedicotech25@gmail.com';

    const body = `
      <div style="padding: 4px 0;">
        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1px solid #bbf7d0; border-radius: 10px; padding: 12px 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 26px;">🛡️</div>
          <div>
            <div style="font-weight: 700; font-size: 13.5px; color: #166534;">Edit Administrator Credentials</div>
            <div style="font-size: 12px; color: #15803d; line-height: 1.4;">
              Your current admin credentials are shown below. You can edit and update them directly anytime — no OTP required!
            </div>
          </div>
        </div>

        <form id="directCredForm" onsubmit="event.preventDefault(); window.adhiraApp.saveAdminCredentialsDirectly();">
          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label" style="font-size: 12.5px; font-weight: 600;">
              Admin Username <span class="req">*</span>
            </label>
            <input type="text" id="changeNewUsername" class="input" placeholder="Enter username" 
              value="${escapeHtml(currentUsername)}" required style="height: 42px; font-size: 13.5px;" />
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
              Current username: <b style="color: #111827;">${escapeHtml(currentUsername)}</b>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label" style="font-size: 12.5px; font-weight: 600;">
              Admin Password <span class="req">*</span>
            </label>
            <div class="auth-input-wrapper">
              <input type="text" id="changeNewPassword" class="input" placeholder="Enter password" 
                value="${escapeHtml(currentPassword)}" required style="height: 42px; font-size: 13.5px; padding-right: 42px;" />
              <button type="button" class="auth-password-toggle" id="toggleCredModalPwd" 
                onclick="window.adhiraApp.toggleCredModalPwd()" title="Toggle show/hide password" style="height: 42px; width: 40px;">
                👁
              </button>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
              Current password is visible above. You can edit it directly anytime.
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label" style="font-size: 12.5px; font-weight: 600;">
              Registered Contact Email
            </label>
            <input type="email" id="changeAdminEmail" class="input" placeholder="admin@example.com" 
              value="${escapeHtml(currentEmail)}" style="height: 40px; font-size: 13px;" />
          </div>

          <div id="changeCredError" style="display:none; padding: 10px 14px; border-radius: 8px; font-size: 12.5px; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; margin-bottom: 14px;"></div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
            <button type="button" class="btn btn-secondary" onclick="window.adhiraApp.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-gold" id="saveCredBtn" style="min-width: 140px; font-weight: 700;">
              <span>💾</span> Update Credentials
            </button>
          </div>
        </form>
      </div>
    `;

    openModal('🔑 Edit Administrator Credentials', body, '');
    setTimeout(() => document.getElementById('changeNewUsername')?.focus(), 100);
  }

  function toggleCredModalPwd() {
    const pwdInput = document.getElementById('changeNewPassword');
    const toggleBtn = document.getElementById('toggleCredModalPwd');
    if (!pwdInput) return;
    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      if (toggleBtn) toggleBtn.textContent = '🔒';
    } else {
      pwdInput.type = 'password';
      if (toggleBtn) toggleBtn.textContent = '👁';
    }
  }

  async function saveAdminCredentialsDirectly() {
    const userInp = document.getElementById('changeNewUsername');
    const passInp = document.getElementById('changeNewPassword');
    const emailInp = document.getElementById('changeAdminEmail');
    const errEl = document.getElementById('changeCredError');
    const btnEl = document.getElementById('saveCredBtn');

    const newUsername = (userInp?.value || '').trim();
    const newPassword = (passInp?.value || '').trim();
    const adminEmail = (emailInp?.value || '').trim();

    if (!newUsername) {
      if (errEl) {
        errEl.textContent = 'Administrator username cannot be blank.';
        errEl.style.display = 'block';
      }
      userInp?.focus();
      return;
    }

    if (!newPassword || newPassword.length < 3) {
      if (errEl) {
        errEl.textContent = 'Password must be at least 3 characters long.';
        errEl.style.display = 'block';
      }
      passInp?.focus();
      return;
    }

    if (errEl) errEl.style.display = 'none';
    if (btnEl) {
      btnEl.disabled = true;
      btnEl.innerHTML = `<span>⏳</span> Updating credentials...`;
    }

    try {
      // 1. Call server backend API
      try {
        await callApi('auth/change-credentials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newUsername, newPassword, adminEmail })
        });
      } catch (e) {
        console.warn('Backend credentials update warning:', e);
      }

      // 2. Update local state
      if (!db.auth) db.auth = {};
      db.auth.username = newUsername;
      db.auth.password = newPassword;
      if (adminEmail) db.auth.adminEmail = adminEmail;
      db.auth.lastUpdated = new Date().toISOString();
      saveDatabase();

      closeModal();
      showToast('Admin credentials updated successfully!', 'success');

      // 3. If on login page, fill in the updated values
      const loginUserInp = document.getElementById('loginUsername');
      const loginPassInp = document.getElementById('loginPassword');
      if (loginUserInp) loginUserInp.value = newUsername;
      if (loginPassInp) loginPassInp.value = newPassword;

      // 4. If logged in, update active session and refresh UI
      if (isLoggedIn()) {
        setSession(newUsername);
        currentUser.username = newUsername;
        renderAppShell();
        renderCurrentPage();
      }
    } catch (err) {
      if (errEl) {
        errEl.textContent = 'Error updating credentials: ' + err.message;
        errEl.style.display = 'block';
      }
      if (btnEl) {
        btnEl.disabled = false;
        btnEl.innerHTML = `<span>💾</span> Update Credentials`;
      }
    }
  }

  // --- AUTH & ROLES ---
  let currentUser = {
    username: 'admin',
    name: 'Admin',
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
    lastAutosaveTime: null,
    simpleBillingTab: 'editor',
    simpleBillSearch: '',
    editingSimpleBillId: null,
    simpleBillScale: 1.0,
    sbMobileTab: 'form',
    sbSelectedProdId: '',
    sbPendingCases: 1,
    sbPendingContents: 16,
    sbPendingRate: 0,
    sbPendingRatePer: '1 BOX',
    sbPendingName: ''
  };

  const SIMPLE_BILL_DRAFT_KEY = 'adhira_simple_bill_draft_v1';
  let draftSimpleBill = null;

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

            <a href="#" class="nav-item ${state.page === 'simple-billing' ? 'active' : ''}" data-nav="simple-billing">
              <div class="nav-item-content">
                <span class="nav-icon">📄</span>
                <span>Simple Bill (Estimate)</span>
              </div>
              <span class="nav-badge">${(db.simpleBills || []).length}</span>
            </a>

            <a href="#" class="nav-item" onclick="event.preventDefault(); window.adhiraVoice && window.adhiraVoice.openAssistant();" style="border: 1px solid rgba(245, 158, 11, 0.4); background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(239, 68, 68, 0.12)); margin: 4px 0 6px 0;" title="Voice Speech Billing (Hey Adhira)">
              <div class="nav-item-content">
                <span class="nav-icon">🎙️</span>
                <span style="font-weight:700;color:var(--gold-400)">Voice Bill (Hey Adhira)</span>
              </div>
              <span class="nav-badge" style="background:var(--gold-500);color:#0f172a;font-weight:800">AI</span>
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
            <div class="sidebar-tech-credit">
              <span>Powered by <strong>LAXORA Technologies</strong></span>
              <a href="tel:+917094062522" class="sidebar-tech-phone">📞 +91 70940 62522</a>
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

              <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.openSimpleBilling()" title="Non-GST Estimate Billing" style="font-weight:600">
                <span>📄</span>
                <span>Simple Bill</span>
              </button>

              <button class="btn btn-secondary btn-sm" onclick="window.adhiraVoice && window.adhiraVoice.openAssistant()" title="Voice Speech Billing (Tamil & English • Hey Adhira)" style="font-weight:700;background:linear-gradient(135deg,#f59e0b,#ef4444);color:#ffffff;border:none;box-shadow:0 2px 8px rgba(245,158,11,0.35);">
                <span>🎙️</span>
                <span>Voice Bill</span>
              </button>

              <button class="btn btn-gold" onclick="window.adhiraApp.openNewQuotation()">
                <span>+</span>
                <span>New Quotation</span>
              </button>

              <div class="topbar-auth-box">
                <div class="role-badge-pill" title="Administrator" style="cursor:default">
                  <span class="role-indicator"></span>
                  <span>${escapeHtml(currentUser.name || 'Admin')} (Admin)</span>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" onclick="window.adhiraApp.openChangeCredentialsModal()" title="Edit Administrator Credentials" style="padding:6px 10px;font-size:11.5px;">
                  <span>🔑</span> Change Login
                </button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="window.adhiraApp.handleLogout()" title="Sign Out of Billing" style="padding:6px 10px;font-size:11.5px;color:#ef4444;">
                  <span>🚪</span> Logout
                </button>
              </div>
            </div>
          </header>

          <!-- VIEWPORT CONTAINER -->
          <section class="app-content" id="appContent">
            <!-- Dynamic page content renders here -->
          </section>

          <!-- POWERED BY LAXORA TECHNOLOGIES BOTTOM FOOTER -->
          <footer class="laxora-powered-footer">
            <div class="laxora-footer-inner">
              <span class="laxora-powered-label">Powered by</span>
              <strong class="laxora-brand-name">LAXORA Technologies</strong>
              <span class="laxora-divider">|</span>
              <a href="tel:+917094062522" class="laxora-phone">📞 +91 70940 62522</a>
            </div>
          </footer>
        </main>

        <!-- MOBILE BOTTOM NAVIGATION -->
        <nav class="mobile-bottom-nav">
          <button class="mobile-nav-btn ${state.page === 'dashboard' ? 'active' : ''}" data-nav="dashboard">
            <span class="icon">▦</span>
            <span>Home</span>
          </button>
          <button class="mobile-nav-btn ${state.page === 'simple-billing' ? 'active' : ''}" data-nav="simple-billing">
            <span class="icon">📄</span>
            <span>Estimate</span>
          </button>
          <button class="mobile-nav-btn center-cta" onclick="window.adhiraApp.openNewQuotation()">
            <span class="icon">+</span>
            <span>Quote</span>
          </button>
          <button class="mobile-nav-btn ${state.page === 'quotations' ? 'active' : ''}" data-nav="quotations">
            <span class="icon">▤</span>
            <span>Quotes</span>
          </button>
          <button class="mobile-nav-btn ${state.page === 'products' ? 'active' : ''}" data-nav="products">
            <span class="icon">🎆</span>
            <span>Products</span>
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
      case 'simple-billing': return 'Simple Billing (Estimate)';
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
      case 'simple-billing': return 'Non-GST factory estimates, case packing rates & instant print.';
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
      case 'simple-billing':
        container.innerHTML = renderSimpleBillingPage();
        attachSimpleBillingListeners();
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

  function attachDashboardListeners() { }

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
        <div class="toolbar" style="gap:12px;flex-wrap:wrap">
          <div class="unified-search-bar" style="flex:1;min-width:320px">
            <span class="search-icon">🔍</span>
            <input type="text" class="search-input" id="quoteSearchInput" placeholder="Search quote no, customer, type name or GSTIN..." value="${escapeHtml(state.quoteSearch)}" />
            <div class="search-divider"></div>
            <button class="search-add-btn" onclick="window.adhiraApp.openNewQuotation()" title="Create New Quotation">
              <span>+</span> New Quotation
            </button>
          </div>

          <div class="toolbar-right" style="display:flex;gap:8px;align-items:center">
            <select class="select" id="quoteStatusFilter" style="width:160px;">
              <option value="All" ${state.quoteFilterStatus === 'All' ? 'selected' : ''}>All Statuses</option>
              <option value="Draft" ${state.quoteFilterStatus === 'Draft' ? 'selected' : ''}>Draft</option>
              <option value="Issued" ${state.quoteFilterStatus === 'Issued' ? 'selected' : ''}>Issued</option>
              <option value="Sent" ${state.quoteFilterStatus === 'Sent' ? 'selected' : ''}>Sent</option>
              <option value="Accepted" ${state.quoteFilterStatus === 'Accepted' ? 'selected' : ''}>Accepted</option>
              <option value="Converted" ${state.quoteFilterStatus === 'Converted' ? 'selected' : ''}>Converted</option>
              <option value="Cancelled" ${state.quoteFilterStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
            <button class="btn btn-secondary" onclick="window.adhiraApp.exportQuotationsCsv()">
              <span>📥</span> Export CSV
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
      } catch (e) { }
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
                <button type="button" class="btn btn-secondary btn-sm" onclick="window.adhiraApp.openQuickProductModal()">+ Add New Product to Master</button>
                <button type="button" class="btn btn-gold btn-sm" onclick="window.adhiraApp.addQuoteItemRow()">+ Add Row</button>
              </div>
            </div>

            <!-- UNIFIED SEARCH, TYPE & QUICK-ADD PRODUCT BAR -->
            <div class="unified-search-bar" style="margin-bottom:14px;position:relative">
              <span class="search-icon">🔍</span>
              <input
                type="text"
                class="search-input"
                id="quickQuoteSearchInput"
                placeholder="Search any of 141 fireworks products or type description to add..."
                autocomplete="off"
                oninput="window.adhiraApp.handleQuickQuoteSearch(this.value)"
                onfocus="window.adhiraApp.showQuickQuoteDropdown()"
                onblur="setTimeout(() => window.adhiraApp.hideQuickQuoteDropdown(), 220)"
              />
              <div class="search-divider"></div>
              <button class="search-add-btn" type="button" onclick="window.adhiraApp.addQuoteItemRow()" title="Add an empty row">
                <span>+</span> Add Row
              </button>
              <div
                class="combo-dropdown"
                id="quickQuoteSearchDropdown"
                onmousedown="event.preventDefault()"
                style="display:none;"
              >
                ${db.products.filter(p => p.active !== false).map(p => `
                  <div class="combo-option" data-id="${p.id}" data-name="${escapeHtml(p.name)}"
                    onmousedown="window.adhiraApp.quickAddProductToQuote('${p.id}')"
                    style="padding:8px 12px;cursor:pointer;font-size:12.5px;border-bottom:1px solid var(--border-subtle);display:flex;justify-content:space-between;align-items:center"
                  >
                    <span>🎆 <b>${escapeHtml(p.name)}</b> <span style="font-size:11px;color:var(--text-muted)">(${escapeHtml(p.packing || '1 Pcs')}) — ${escapeHtml(p.category || '')}</span></span>
                    <span style="font-weight:700;color:var(--gold-600);font-size:12.5px">₹${p.rate}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- TABLE OF PRODUCT ITEMS -->
            <div class="table-responsive">
              <table class="items-builder-table">
                <thead>
                  <tr>
                    <th style="width:35px">#</th>
                    <th style="width:240px">Description of Fireworks</th>
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
              <button type="button" class="btn btn-secondary btn-sm" onclick="window.adhiraApp.addQuoteItemRow()">+ Add Another Item</button>
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
          <div class="smart-search-combo" style="position:relative">
            <input
              type="text"
              class="input smart-combo-input"
              id="comboInput_${idx}"
              autocomplete="off"
              spellcheck="false"
              placeholder="Search product, type or select..."
              value="${escapeHtml(item.name || '')}"
              oninput="window.adhiraApp.handleComboInput(${idx}, this.value)"
              onfocus="window.adhiraApp.showComboDropdown(${idx})"
              onblur="setTimeout(() => window.adhiraApp.hideComboDropdown(${idx}), 220)"
              onkeydown="window.adhiraApp.handleComboKeydown(event, ${idx})"
            />
            <div
              class="combo-dropdown"
              id="comboDropdown_${idx}"
              onmousedown="event.preventDefault()"
              style="display:none;"
            >
              ${db.products.filter(p => p.active !== false).map(p => `
                <div class="combo-option" data-id="${p.id}" data-name="${escapeHtml(p.name)}"
                  onmousedown="window.adhiraApp.selectComboProduct(${idx}, '${p.id}')"
                  style="padding:7px 11px;cursor:pointer;font-size:12.5px;border-bottom:1px solid var(--border-subtle);display:flex;justify-content:space-between;align-items:center"
                >
                  <span>${escapeHtml(p.name)} <span style="font-size:10.5px;color:var(--text-muted)">(${escapeHtml(p.packing || '1 Pcs')})</span></span>
                  <span style="font-weight:700;color:var(--gold-600);font-size:12px">₹${p.rate}</span>
                </div>
              `).join('')}
            </div>
          </div>
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
  // MODULE 3b: SIMPLE BILLING & ESTIMATE ENGINE (NON-GST FACTORY ESTIMATES)
  // Strict Specification Matching Sivakasi Fireworks Trade Estimate
  // ==========================================================================

  function formatSimpleDate(dStr) {
    if (!dStr) return '';
    const parts = String(dStr).split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dStr;
  }

  function convertSimpleAmountToWords(num) {
    num = Math.round(Number(num) || 0);
    if (num <= 0) return 'Zero Rupees Only';

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
        if (str.length > 0) str += 'and ';
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

    return `${words.trim()} Only`;
  }

  function initDraftSimpleBill(existingBill = null) {
    if (existingBill) {
      draftSimpleBill = structuredClone(existingBill);
      return;
    }

    const maxNum = (db.simpleBills || []).reduce((max, b) => {
      const n = parseInt(b.number, 10);
      return !isNaN(n) ? Math.max(max, n) : max;
    }, 219);
    const nextId = db.settings?.nextSimpleBill || (maxNum + 1);

    const defSeller = (db.sellers && db.sellers[0]) || db.company;
    const todayStr = new Date().toISOString().slice(0, 10);

    const factoryAddr = '8/444, Unnamed Road, Near Sri Jaishnavi Stores, Gandhinagar, Anaiyur, Sivakasi, Virudhunagar, Tamil nadu - 626124.';
    const factoryPhone = (defSeller.phone || '+91 6384197583') + (defSeller.altPhone ? ', ' + defSeller.altPhone : '');

    draftSimpleBill = {
      id: 'SB-' + Date.now(),
      number: String(nextId),
      date: todayStr,
      copyType: '(EXTRA COPY)',
      hsnCode: '3604',
      factory: {
        name: defSeller.name || 'ADHIRA FIRE WORKS & PYROTECH',
        address: factoryAddr,
        phone: factoryPhone
      },
      customer: {
        name: '',
        addressLine1: '',
        addressLine2: '',
        cityPin: '',
        gstin: '',
        phone: ''
      },
      items: [],
      packingChargePercent: 3,
      terms: [
        '1. Sales F.O.R. Sivakasi',
        '2. Interest at 24% per annum charged on bills if not paid on date',
        '3. Subject to Sivakasi Jurisdiction'
      ],
      preparedBy: '',
      checkedBy: '',
      forFactory: defSeller.name || 'ADHIRA FIRE WORKS & PYROTECH',
      createdAt: new Date().toISOString()
    };

    // Reset pending dropdown state
    state.sbSelectedProdId = '';
    state.sbPendingName = '';
    state.sbPendingCases = 1;
    state.sbPendingContents = 16;
    state.sbPendingRate = 0;
    state.sbPendingRatePer = '1 BOX';
  }

  function calculateSimpleBillSummary(bill) {
    if (!bill) {
      return { totalCases: 0, subtotal: 0, packingCharge: 0, roundOff: 0, netAmount: 0, amountInWords: 'Zero Rupees Only' };
    }

    let totalCases = 0;
    let subtotal = 0;

    (bill.items || []).forEach((it, idx) => {
      it.sno = idx + 1;
      const cases = Number(it.cases) || 0;
      const contents = Number(it.contents) || 0;
      let qty = (it.qty !== undefined && it.qty !== '' && Number(it.qty) > 0) ? Number(it.qty) : (cases * contents);
      it.qty = qty;
      const rate = Number(it.rate) || 0;
      const amount = round2(qty * rate);
      it.amount = amount;
      totalCases += cases;
      subtotal += amount;
    });

    subtotal = round2(subtotal);
    const packingPct = Number(bill.packingChargePercent !== undefined ? bill.packingChargePercent : 3) || 0;
    const packingCharge = round2((subtotal * packingPct) / 100);
    const unroundedNet = subtotal + packingCharge;
    const netAmount = Math.round(unroundedNet);
    const roundOff = round2(netAmount - unroundedNet);

    return {
      totalCases,
      subtotal,
      packingCharge,
      roundOff,
      netAmount,
      amountInWords: convertSimpleAmountToWords(netAmount)
    };
  }

  function generateSimpleBillA4Html(bill) {
    if (!bill) return '';
    const summary = calculateSimpleBillSummary(bill);

    const items = bill.items || [];
    let itemsRowsHtml = items.map((it, idx) => {
      const sno = idx + 1;
      const cases = Number(it.cases) || 0;
      const contents = Number(it.contents) || 0;
      const qty = Number(it.qty) || (cases * contents);
      const rate = Number(it.rate) || 0;
      const amount = round2(qty * rate);

      return `
        <tr>
          <td class="col-sno">${sno}</td>
          <td class="col-particulars">${escapeHtml(it.particulars || '')}</td>
          <td class="col-cases">${cases ? cases : ''}</td>
          <td class="col-contents">${contents ? contents : ''}</td>
          <td class="col-qty">${qty ? qty : ''}</td>
          <td class="col-rate">${rate ? rate.toFixed(2) : ''}</td>
          <td class="col-rateper">${escapeHtml(it.ratePer || '1 BOX')}</td>
          <td class="col-amount">${amount ? amount.toFixed(2) : ''}</td>
        </tr>
      `;
    }).join('');

    // If fewer than 7 items, insert empty filler rows with vertical grid borders to match traditional invoice look
    let fillerRowsHtml = '';
    const minRows = 7;
    if (items.length < minRows) {
      const needed = minRows - items.length;
      for (let i = 0; i < needed; i++) {
        fillerRowsHtml += `
          <tr class="filler-row">
            <td class="col-sno">&nbsp;</td>
            <td class="col-particulars">&nbsp;</td>
            <td class="col-cases">&nbsp;</td>
            <td class="col-contents">&nbsp;</td>
            <td class="col-qty">&nbsp;</td>
            <td class="col-rate">&nbsp;</td>
            <td class="col-rateper">&nbsp;</td>
            <td class="col-amount">&nbsp;</td>
          </tr>
        `;
      }
    }

    const c = bill.customer || {};
    const f = bill.factory || {};

    return `
      <div class="simple-estimate-wrapper" id="printableSimpleEstimateRoot">
        <!-- TOP TITLE & COPY TYPE -->
        <div class="simple-estimate-topbar">
          <div class="simple-estimate-top-spacer"></div>
          <div class="simple-estimate-title">ESTIMATE</div>
          <div class="simple-estimate-copy">${escapeHtml(bill.copyType || '(EXTRA COPY)')}</div>
        </div>

        <!-- MAIN DOCUMENT BOX -->
        <div class="simple-estimate-box" id="printableSimpleEstimate">
          
          <!-- SUBTLE WATERMARK BEHIND DOCUMENT -->
          <div class="simple-estimate-watermark">
            <img src="${LOGO_PATH}" alt="ADHIRA Logo Watermark" />
          </div>

          <div class="simple-estimate-content">
            
            <!-- 1. FACTORY HEADER (WITHOUT GST) -->
            <div class="sb-factory-header">
              <div class="sb-factory-logo">
                <img src="${LOGO_PATH}" alt="Adhira Logo" />
              </div>
              <div class="sb-factory-info">
                <div class="sb-factory-name">${escapeHtml(f.name || 'ADHIRA FIRE WORKS & PYROTECH')}</div>
                <div class="sb-factory-contact">
                  <span class="sb-wa-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.95 7.44 8.68 7.5 8.46 7.74C8.24 7.98 7.62 8.56 7.62 9.74C7.62 10.92 8.48 12.06 8.6 12.22C8.72 12.38 10.29 14.81 12.7 15.85C13.29 16.1 13.75 16.26 14.11 16.37C14.7 16.56 15.24 16.53 15.67 16.47C16.14 16.4 17.13 15.87 17.34 15.28C17.55 14.69 17.55 14.19 17.48 14.08C17.42 13.97 17.26 13.91 17.02 13.79C16.78 13.67 15.6 13.09 15.38 13.01C15.16 12.93 15 12.89 14.84 13.13C14.68 13.37 14.22 13.91 14.08 14.07C13.94 14.23 13.8 14.25 13.56 14.13C13.32 14.01 12.55 13.76 11.64 12.95C10.93 12.32 10.45 11.54 10.31 11.3C10.17 11.06 10.3 10.93 10.42 10.81C10.53 10.7 10.66 10.52 10.78 10.38C10.9 10.24 10.94 10.14 11.02 9.98C11.1 9.82 11.06 9.68 11 9.56C10.94 9.44 10.48 8.31 10.29 7.84C10.1 7.39 9.91 7.45 9.77 7.44C9.64 7.44 9.49 7.44 9.33 7.44H9.11Z"/></svg>
                  </span>
                  <span>${escapeHtml(f.phone || '+91 6384197583, +91 94431 23456')}</span>
                </div>
                <div class="sb-factory-addr">
                  <span class="sb-loc-pin">📍</span>
                  <span>${escapeHtml(f.address || '8/444, Unnamed Road, Near Sri Jaishnavi Stores, Gandhinagar, Anaiyur, Sivakasi, Virudhunagar, Tamil nadu - 626124.')}</span>
                </div>
              </div>
              <div class="sb-factory-art">
                <svg width="68" height="68" viewBox="0 0 100 100" fill="none">
                  <path d="M45 70 L55 70 L52 92 L48 92 Z" fill="#b91c1c" />
                  <polygon points="50,45 42,70 58,70" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
                  <circle cx="50" cy="42" r="5" fill="#ef4444" />
                  <path d="M50 35 L50 20 M40 32 L28 20 M60 32 L72 20 M35 42 L18 38 M65 42 L82 38" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" />
                  <circle cx="28" cy="18" r="3" fill="#ef4444" />
                  <circle cx="50" cy="15" r="3.5" fill="#10b981" />
                  <circle cx="72" cy="18" r="3" fill="#3b82f6" />
                  <circle cx="16" cy="38" r="2.5" fill="#8b5cf6" />
                  <circle cx="84" cy="38" r="2.5" fill="#ec4899" />
                  <g transform="rotate(22 75 60)">
                    <rect x="72" y="35" width="8" height="32" rx="1" fill="#0284c7" />
                    <polygon points="76,22 69,35 83,35" fill="#ef4444" />
                    <line x1="76" y1="67" x2="76" y2="88" stroke="#78350f" stroke-width="2" />
                  </g>
                  <g transform="rotate(-18 25 60)">
                    <line x1="24" y1="35" x2="24" y2="88" stroke="#64748b" stroke-width="2.5" />
                    <line x1="24" y1="35" x2="24" y2="58" stroke="#fcd34d" stroke-width="4" stroke-linecap="round" />
                    <circle cx="24" cy="34" r="3" fill="#fbbf24" />
                  </g>
                </svg>
              </div>
            </div>

            <!-- 2. CUSTOMER & METADATA GRID -->
            <div class="sb-meta-grid">
              <div class="sb-cust-box">
                <div class="sb-cust-line"><strong>To : M/s. ${escapeHtml(c.name || '')}</strong></div>
                ${c.addressLine1 ? `<div class="sb-cust-line">${escapeHtml(c.addressLine1)}</div>` : ''}
                ${c.addressLine2 ? `<div class="sb-cust-line">${escapeHtml(c.addressLine2)}</div>` : ''}
                ${c.cityPin ? `<div class="sb-cust-line">${escapeHtml(c.cityPin)}</div>` : ''}
                ${c.gstin ? `<div class="sb-cust-line">GSTIN &nbsp;&nbsp;: ${escapeHtml(c.gstin)}</div>` : ''}
              </div>
              <div class="sb-id-date-box">
                <table class="sb-id-tbl">
                  <tr>
                    <td class="lbl">ID</td>
                    <td class="sep">:</td>
                    <td class="val">${escapeHtml(bill.number || '220')}</td>
                  </tr>
                  <tr>
                    <td class="lbl">Date</td>
                    <td class="sep">:</td>
                    <td class="val">${escapeHtml(formatSimpleDate(bill.date))}</td>
                  </tr>
                </table>
                <div class="sb-hsn-badge-box">
                  HSN Code &nbsp;: &nbsp;${escapeHtml(bill.hsnCode || '3604')}
                </div>
              </div>
            </div>

            <!-- 3. ITEMS TABLE -->
            <div class="sb-table-wrap">
              <table class="sb-items-table">
                <thead>
                  <tr>
                    <th style="width:6%">S.No</th>
                    <th style="width:36%">Particulars</th>
                    <th style="width:10%">No of<br>Cases</th>
                    <th style="width:9%">Contents</th>
                    <th style="width:9%">Quantity</th>
                    <th style="width:10%">Rate</th>
                    <th style="width:9%">Rate per</th>
                    <th style="width:11%">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsRowsHtml}
                  ${fillerRowsHtml}
                </tbody>
              </table>
            </div>

            <!-- 4. TOTAL CASES & SUMMARY -->
            <div class="sb-summary-grid">
              <div class="sb-cases-left">
                <div class="sb-cases-header">
                  Total Number of cases : ${summary.totalCases}
                </div>
                <div class="sb-cases-empty-box"></div>
              </div>
              <div class="sb-summary-right">
                <table class="sb-summary-tbl">
                  <tr>
                    <td class="s-lbl">Total</td>
                    <td class="s-val">${summary.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td class="s-lbl">PACKING CHARGE ${bill.packingChargePercent !== undefined ? bill.packingChargePercent : 3} %</td>
                    <td class="s-val">${summary.packingCharge.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td class="s-lbl">Round off</td>
                    <td class="s-val">${summary.roundOff >= 0 ? '+' : ''}${summary.roundOff.toFixed(2)}</td>
                  </tr>
                  <tr class="net-row">
                    <td class="s-lbl">Net amount</td>
                    <td class="s-val">${summary.netAmount.toFixed(2)}</td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- 5. AMOUNT IN WORDS -->
            <div class="sb-words-box">
              <strong>Amount in words : </strong>
              <span>${escapeHtml(summary.amountInWords)}</span>
            </div>

            <!-- 6. TERMS & SIGNATURES -->
            <div class="sb-terms-sign-grid">
              <div class="sb-terms-box">
                <div class="sb-terms-title">Terms and Conditions :</div>
                <ol>
                  ${(bill.terms || [
        'Sales F.O.R. Sivakasi',
        'Interest at 24% per annum charged on bills if not paid on date',
        'Subject to Sivakasi Jurisdiction'
      ]).map(t => `<li>${escapeHtml(t.replace(/^\d+\.\s*/, ''))}</li>`).join('')}
                </ol>
              </div>
              <div class="sb-prep-box">
                <div class="sb-prep-row">
                  <strong>Prepared By</strong>
                  <div class="sb-sign-line"></div>
                </div>
                <div class="sb-prep-row">
                  <strong>Checked By</strong>
                  <div class="sb-sign-line"></div>
                </div>
              </div>
              <div class="sb-auth-box">
                <div class="sb-auth-for">For ${escapeHtml(bill.forFactory || f.name || 'ADHIRA FIRE WORKS & PYROTECH')}</div>
                <div class="sb-auth-spacer"></div>
                <div class="sb-auth-sign">Authorized signatory</div>
              </div>
            </div>

          </div><!-- /.simple-estimate-content -->
        </div><!-- /.simple-estimate-box -->

        <!-- OUTER FOOTER -->
        <div class="simple-estimate-footer">
          <div class="se-footer-spacer"></div>
          <div class="se-center-thanks">Thankyou for Business with us!</div>
          <div class="se-right-tech">Powered by <strong>LAXORA Technologies</strong> | +91 70940 62522</div>
        </div>
      </div>
    `;
  }

  function renderSimpleBillingPage() {
    if (!draftSimpleBill) {
      initDraftSimpleBill();
    }

    const summary = calculateSimpleBillSummary(draftSimpleBill);
    const b = draftSimpleBill;
    const f = b.factory || {};
    const c = b.customer || {};

    let listHtml = '';
    if (state.simpleBillingTab === 'list') {
      let filtered = (db.simpleBills || []).slice();
      if (state.simpleBillSearch && state.simpleBillSearch.trim()) {
        const q = state.simpleBillSearch.toLowerCase().trim();
        filtered = filtered.filter(item => {
          return (
            String(item.number || '').toLowerCase().includes(q) ||
            (item.customer?.name || '').toLowerCase().includes(q) ||
            (item.customer?.cityPin || '').toLowerCase().includes(q) ||
            (item.date || '').includes(q)
          );
        });
      }
      filtered.sort((x, y) => (parseInt(y.number, 10) || 0) - (parseInt(x.number, 10) || 0));

      listHtml = `
        <div class="card">
          <div class="toolbar" style="gap:12px;flex-wrap:wrap">
            <div class="unified-search-bar" style="flex:1;min-width:300px">
              <span class="search-icon">🔍</span>
              <input type="text" class="search-input" id="sbSearchInput" placeholder="Search Estimate ID, customer or city..." value="${escapeHtml(state.simpleBillSearch || '')}" oninput="window.adhiraApp.filterSimpleBills(this.value)" />
            </div>
            <button class="btn btn-gold" onclick="window.adhiraApp.newSimpleBill()">
              <span>+</span> Create New Estimate
            </button>
          </div>

          ${filtered.length > 0 ? `
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Estimate ID</th>
                    <th>Date</th>
                    <th>Customer / Shop</th>
                    <th class="num">Total Cases</th>
                    <th class="num">Items</th>
                    <th class="num">Net Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${filtered.map(sb => {
        const sbSum = calculateSimpleBillSummary(sb);
        return `
                      <tr>
                        <td class="strong">#${escapeHtml(sb.number || '')}</td>
                        <td>${formatSimpleDate(sb.date)}</td>
                        <td>
                          <b>${escapeHtml(sb.customer?.name || 'Customer')}</b>
                          <div style="font-size:11px;color:var(--text-muted)">${escapeHtml(sb.customer?.cityPin || '')}</div>
                        </td>
                        <td class="num">${sbSum.totalCases}</td>
                        <td class="num">${(sb.items || []).length}</td>
                        <td class="num" style="font-weight:700;color:var(--navy-900)">₹${sbSum.netAmount.toFixed(2)}</td>
                        <td>
                          <div style="display:flex;gap:6px;align-items:center;">
                            <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.printSimpleBillById('${sb.id}')" title="Print Estimate">🖨️ Print</button>
                            <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.viewSimpleBillModal('${sb.id}')" title="Preview Estimate">👁️ View</button>
                            <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.editSimpleBill('${sb.id}')" title="Edit Bill">✏️ Edit</button>
                            <button class="btn btn-gold btn-sm" onclick="window.adhiraApp.downloadSimpleBillPdfById('${sb.id}')" title="Download PDF">📥 PDF</button>
                            <button class="btn btn-danger btn-sm" onclick="window.adhiraApp.deleteSimpleBill('${sb.id}')" title="Delete">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    `;
      }).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <div class="empty-state">
              <div class="empty-icon">📋</div>
              <h3>No simple bills found</h3>
              <p>Create your first non-GST estimate bill to get started.</p>
              <button class="btn btn-gold" onclick="window.adhiraApp.newSimpleBill()">+ Create Simple Bill</button>
            </div>
          `}
        </div>
      `;
    }

    return `
      <div class="simple-billing-view">
        <!-- TOP TOOLBAR -->
        <div class="card" style="margin-bottom:18px;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <button class="btn ${state.simpleBillingTab === 'editor' ? 'btn-primary' : 'btn-secondary'}" onclick="window.adhiraApp.switchSimpleBillingTab('editor')">
                <span>✏️</span> Create / Edit Estimate
              </button>
              <button class="btn ${state.simpleBillingTab === 'list' ? 'btn-primary' : 'btn-secondary'}" onclick="window.adhiraApp.switchSimpleBillingTab('list')">
                <span>📋</span> Saved Estimates (${(db.simpleBills || []).length})
              </button>
            </div>

            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <button class="btn btn-secondary" onclick="window.adhiraApp.newSimpleBill()" title="Clear and create a fresh estimate">
                <span>➕</span> New Bill
              </button>
              <button class="btn btn-gold" onclick="window.adhiraApp.saveSimpleBill()" title="Save bill to database & realtime sync">
                <span>💾</span> Save Bill
              </button>
              <button class="btn btn-primary" onclick="window.adhiraApp.printCurrentSimpleBill()" title="Print A4 Estimate directly">
                <span>🖨️</span> Print Bill
              </button>
              <button class="btn btn-secondary" onclick="window.adhiraApp.downloadCurrentSimpleBillPdf()" title="Download PDF copy">
                <span>📥</span> PDF
              </button>
            </div>
          </div>
        </div>

        ${state.simpleBillingTab === 'list' ? listHtml : `
          <!-- MOBILE VIEW TOGGLE TABS (Visible on screens <= 860px) -->
          <div class="sb-mobile-view-toggle">
            <button type="button" class="sb-mobile-tab-btn ${state.sbMobileTab !== 'preview' ? 'active' : ''}" onclick="window.adhiraApp.setSbMobileTab('form')">
              ✏️ Edit Bill Details
            </button>
            <button type="button" class="sb-mobile-tab-btn ${state.sbMobileTab === 'preview' ? 'active' : ''}" onclick="window.adhiraApp.setSbMobileTab('preview')">
              👁️ View Bill Preview (${(b.items || []).length} items - ₹${summary.netAmount.toFixed(0)})
            </button>
          </div>

          <!-- TWO-COLUMN WORKSPACE: FORM + LIVE A4 PREVIEW -->
          <div class="sb-layout-grid ${state.sbMobileTab === 'preview' ? 'mobile-mode-preview' : 'mobile-mode-form'}">
            
            <!-- LEFT COLUMN: FORM CONTROLS -->
            <div class="sb-form-col">
              
              <!-- 1. BILL METADATA & FACTORY CARD -->
              <div class="card">
                <div class="section-divider-title">
                  <h4>1. Estimate & Factory Profile</h4>
                  <span class="from-details-badge">Non-GST Simple Bill</span>
                </div>

                <div class="form-grid grid-4" style="margin-bottom:12px;">
                  <div class="form-group">
                    <label class="form-label">Estimate ID <span class="req">*</span></label>
                    <input type="text" class="input" id="sbInpNumber" value="${escapeHtml(b.number || '220')}" oninput="window.adhiraApp.updateSimpleBillField('number', this.value)" style="font-weight:700" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Date <span class="req">*</span></label>
                    <input type="date" class="input" id="sbInpDate" value="${escapeHtml(b.date || '')}" oninput="window.adhiraApp.updateSimpleBillField('date', this.value)" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Copy Type</label>
                    <select class="select" id="sbInpCopyType" onchange="window.adhiraApp.updateSimpleBillField('copyType', this.value)">
                      <option value="(EXTRA COPY)" ${b.copyType === '(EXTRA COPY)' ? 'selected' : ''}>(EXTRA COPY)</option>
                      <option value="(ORIGINAL)" ${b.copyType === '(ORIGINAL)' ? 'selected' : ''}>(ORIGINAL)</option>
                      <option value="(DUPLICATE)" ${b.copyType === '(DUPLICATE)' ? 'selected' : ''}>(DUPLICATE)</option>
                      <option value="(OFFICE COPY)" ${b.copyType === '(OFFICE COPY)' ? 'selected' : ''}>(OFFICE COPY)</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">HSN Code</label>
                    <input type="text" class="input" id="sbInpHsn" value="${escapeHtml(b.hsnCode || '3604')}" oninput="window.adhiraApp.updateSimpleBillField('hsnCode', this.value)" style="font-weight:700" />
                  </div>
                </div>

                <div class="form-grid grid-3">
                  <div class="form-group col-span-2">
                    <label class="form-label">Factory / Sister Concern Profile</label>
                    <select class="select" onchange="window.adhiraApp.handleSimpleBillFactorySelect(this.value)">
                      ${(db.sellers || [db.company]).map(sel => `
                        <option value="${sel.id || sel.name}" ${(f.name === sel.name) ? 'selected' : ''}>
                          ${escapeHtml(sel.name)} — ${escapeHtml(sel.city || 'Sivakasi')}
                        </option>
                      `).join('')}
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Factory Phone / WhatsApp</label>
                    <input type="text" class="input" id="sbInpFactoryPhone" value="${escapeHtml(f.phone || '')}" oninput="window.adhiraApp.updateSimpleBillField('factory.phone', this.value)" />
                  </div>
                  <div class="form-group col-span-3">
                    <label class="form-label">Factory Address (Ex-Factory Sivakasi)</label>
                    <input type="text" class="input" id="sbInpFactoryAddr" value="${escapeHtml(f.address || '')}" oninput="window.adhiraApp.updateSimpleBillField('factory.address', this.value)" />
                  </div>
                </div>
              </div>

              <!-- 2. CUSTOMER / SHOP (TO DETAILS) -->
              <div class="card">
                <div class="section-divider-title">
                  <h4>2. Customer / Shop Details (To : M/s.)</h4>
                  <div style="display:flex;gap:8px;">
                    <select class="select" style="max-width:240px;font-size:12px;padding:4px 8px;" onchange="window.adhiraApp.handleSimpleBillCustomerSelect(this.value)">
                      <option value="">-- Load from Shop Master --</option>
                      ${(db.customers || []).map(cust => `
                        <option value="${cust.id}">${escapeHtml(cust.name)} (${escapeHtml(cust.city || 'Sivakasi')})</option>
                      `).join('')}
                    </select>
                  </div>
                </div>

                <div class="form-grid grid-3">
                  <div class="form-group col-span-2">
                    <label class="form-label">Shop / Customer Name <span class="req">*</span></label>
                    <input type="text" class="input" id="sbInpCustName" placeholder="M/s. Customer / Shop Name" value="${escapeHtml(c.name || '')}" oninput="window.adhiraApp.updateSimpleBillField('customer.name', this.value)" style="font-weight:700" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">GSTIN / Contact No (Optional)</label>
                    <input type="text" class="input" id="sbInpCustGstin" placeholder="e.g. GSTIN or Phone No" value="${escapeHtml(c.gstin || '')}" oninput="window.adhiraApp.updateSimpleBillField('customer.gstin', this.value)" />
                  </div>
                  <div class="form-group col-span-3">
                    <div style="display:grid;grid-template-columns:1fr 1fr 1.2fr;gap:8px;">
                      <div>
                        <label class="form-label">Address Line 1</label>
                        <input type="text" class="input" id="sbInpCustAddr1" placeholder="Building / Street Address" value="${escapeHtml(c.addressLine1 || '')}" oninput="window.adhiraApp.updateSimpleBillField('customer.addressLine1', this.value)" />
                      </div>
                      <div>
                        <label class="form-label">Address Line 2 / Area</label>
                        <input type="text" class="input" id="sbInpCustAddr2" placeholder="Area / Landmark" value="${escapeHtml(c.addressLine2 || '')}" oninput="window.adhiraApp.updateSimpleBillField('customer.addressLine2', this.value)" />
                      </div>
                      <div>
                        <label class="form-label">City - Pincode</label>
                        <input type="text" class="input" id="sbInpCustCityPin" placeholder="City - Pincode" value="${escapeHtml(c.cityPin || '')}" oninput="window.adhiraApp.updateSimpleBillField('customer.cityPin', this.value)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 3. SELECT FIREWORKS PRODUCTS (DROPDOWN & ADD ONLY) -->
              <div class="card" id="sbProductSectionCard">
                <div class="section-divider-title">
                  <h4>3. Select Products & Add to Bill</h4>
                  <span class="from-details-badge">Dropdown & Add Only</span>
                </div>

                <!-- DROPDOWN & ADD PANEL -->
                <div class="sb-dropdown-add-panel">
                  <div class="form-group" style="margin-bottom:12px;">
                    <label class="form-label" style="font-weight:700;color:var(--navy-900)">
                      Select Fireworks Product <span class="req">*</span>
                    </label>
                    <select class="select" id="sbProductDropdown" style="font-size:13.5px;font-weight:600;padding:10px 12px;background:#ffffff;border:1.5px solid var(--border-color);border-radius:var(--radius-md);" onchange="window.adhiraApp.handleDropdownProductChange(this.value)">
                      <option value="">-- Choose from ${(db.products || []).length} Fireworks Products --</option>
                      ${(db.products || []).filter(p => p.active !== false).map(p => `
                        <option value="${p.id}" ${state.sbSelectedProdId === p.id ? 'selected' : ''}>
                          ${escapeHtml(p.name)} [Packing: ${escapeHtml(p.packing || '1 Box')}, Contents: ${p.pieces || 16}] — Rate: ₹${Number(p.rate || 0).toFixed(2)}
                        </option>
                      `).join('')}
                    </select>
                  </div>

                  <!-- PRODUCT DETAILS & ADD ROW -->
                  <div class="sb-add-controls-grid">
                    <div class="form-group">
                      <label class="form-label">No. of Cases <span class="req">*</span></label>
                      <input type="number" min="1" class="input" id="sbInpCases" value="${state.sbPendingCases || 1}" oninput="window.adhiraApp.updateDropdownPendingCalc()" style="font-weight:700;text-align:center;" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Contents / Case</label>
                      <input type="number" min="1" class="input" id="sbInpContents" value="${state.sbPendingContents || 16}" oninput="window.adhiraApp.updateDropdownPendingCalc()" style="text-align:center;" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Total Qty (Pcs)</label>
                      <input type="text" class="input" id="sbInpQty" value="${(state.sbPendingCases || 1) * (state.sbPendingContents || 16)}" readonly style="background:#f1f5f9;font-weight:700;text-align:center;" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Rate (₹)</label>
                      <input type="number" step="0.01" min="0" class="input" id="sbInpRate" value="${state.sbPendingRate || ''}" oninput="window.adhiraApp.updateDropdownPendingCalc()" style="font-weight:700;text-align:right;" placeholder="0.00" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Rate Per</label>
                      <input type="text" class="input" id="sbInpRatePer" value="${escapeHtml(state.sbPendingRatePer || '1 BOX')}" style="text-align:center;font-weight:600;" />
                    </div>
                    <div class="form-group" style="display:flex;flex-direction:column;justify-content:flex-end;">
                      <button type="button" class="btn btn-gold" id="sbBtnAddDropdownItem" onclick="window.adhiraApp.addCurrentDropdownItem()" style="padding:9px 18px;font-weight:800;font-size:13.5px;height:38px;display:flex;align-items:center;justify-content:center;gap:6px;">
                        <span>➕</span> Add
                      </button>
                    </div>
                  </div>

                  <!-- AMOUNT PREVIEW HELPER -->
                  <div id="sbPendingAmtSummary" style="margin-top:8px;font-size:12px;color:var(--text-secondary);display:flex;justify-content:space-between;align-items:center;background:#fff;padding:6px 10px;border-radius:6px;border:1px dashed var(--border-subtle);flex-wrap:wrap;gap:6px;">
                    <span><b>Product:</b> <span id="sbPendingNameDisplay">${escapeHtml(state.sbPendingName || 'None selected')}</span></span>
                    <span><b>Item Total:</b> <strong id="sbPendingAmtDisplay" style="color:var(--navy-900);font-size:13.5px;">₹${(((state.sbPendingCases || 1) * (state.sbPendingContents || 16)) * (Number(state.sbPendingRate) || 0)).toFixed(2)}</strong></span>
                  </div>
                </div>

                <!-- ADDED ITEMS TABLE -->
                <div style="margin-top:14px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                    <span style="font-weight:700;font-size:13px;color:var(--navy-900)">
                      Added Items in Bill (${(b.items || []).length})
                    </span>
                    ${(b.items || []).length > 0 ? `
                      <span style="font-size:11.5px;color:var(--text-muted)">
                        Total Cases: <b>${summary.totalCases}</b>
                      </span>
                    ` : ''}
                  </div>

                  ${(b.items || []).length > 0 ? `
                    <div class="table-responsive" style="max-height:400px;overflow-y:auto;border:1px solid var(--border-subtle);border-radius:var(--radius-sm)">
                      <table class="data-table" style="font-size:12px;">
                        <thead>
                          <tr>
                            <th style="width:36px;text-align:center">#</th>
                            <th>Particulars</th>
                            <th style="width:70px;text-align:center">Cases</th>
                            <th style="width:70px;text-align:center">Contents</th>
                            <th style="width:75px;text-align:center">Qty</th>
                            <th style="width:85px;text-align:right">Rate (₹)</th>
                            <th style="width:75px;text-align:center">Rate Per</th>
                            <th style="width:95px;text-align:right">Amount (₹)</th>
                            <th style="width:40px;text-align:center"></th>
                          </tr>
                        </thead>
                        <tbody>
                          ${(b.items || []).map((it, idx) => `
                            <tr>
                              <td style="text-align:center;font-weight:700">${idx + 1}</td>
                              <td>
                                <span style="font-weight:700;text-transform:uppercase;color:var(--navy-900)">${escapeHtml(it.particulars || '')}</span>
                              </td>
                              <td style="text-align:center">
                                <input type="number" min="1" class="input" style="padding:3px 5px;font-size:11.5px;text-align:center;width:60px" value="${it.cases || ''}" oninput="window.adhiraApp.updateSimpleBillItem(${idx}, 'cases', this.value)" />
                              </td>
                              <td style="text-align:center">
                                <input type="number" min="1" class="input" style="padding:3px 5px;font-size:11.5px;text-align:center;width:60px" value="${it.contents || ''}" oninput="window.adhiraApp.updateSimpleBillItem(${idx}, 'contents', this.value)" />
                              </td>
                              <td style="text-align:center;font-weight:700" id="sbItemQty_${idx}">${it.qty || (it.cases * it.contents)}</td>
                              <td style="text-align:right">
                                <input type="number" step="0.01" min="0" class="input" style="padding:3px 5px;font-size:11.5px;text-align:right;width:75px" value="${it.rate || ''}" oninput="window.adhiraApp.updateSimpleBillItem(${idx}, 'rate', this.value)" />
                              </td>
                              <td style="text-align:center;font-size:11px;font-weight:600">${escapeHtml(it.ratePer || '1 BOX')}</td>
                              <td style="text-align:right;font-weight:800;color:var(--navy-900)" id="sbItemAmt_${idx}">₹${(it.amount || 0).toFixed(2)}</td>
                              <td style="text-align:center">
                                <button type="button" class="btn btn-danger btn-sm" onclick="window.adhiraApp.removeSimpleBillItem(${idx})" title="Remove item" style="padding:3px 8px;font-size:11px">🗑️</button>
                              </td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>
                  ` : `
                    <div style="background:#f8fafc;border:1.5px dashed #cbd5e1;border-radius:var(--radius-md);padding:24px;text-align:center;color:var(--text-muted)">
                      <div style="font-size:26px;margin-bottom:6px">📦</div>
                      <div style="font-weight:700;font-size:13.5px;color:var(--navy-900)">No products added yet</div>
                      <div style="font-size:12px;margin-top:4px">Choose a fireworks item from the dropdown above and click "+ Add" to add it to the bill.</div>
                    </div>
                  `}
                </div>
              </div>

              <!-- 4. PACKING CHARGES & FINANCIAL SUMMARY -->
              <div class="card">
                <div class="section-divider-title">
                  <h4>4. Packing Charges & Net Amount</h4>
                </div>

                <div class="form-grid grid-2" style="margin-bottom:12px;">
                  <div class="form-group">
                    <label class="form-label">PACKING CHARGE (%)</label>
                    <div style="display:flex;gap:6px;align-items:center;">
                      <input type="number" step="0.1" class="input" id="sbInpPackingPct" value="${b.packingChargePercent !== undefined ? b.packingChargePercent : 3}" oninput="window.adhiraApp.updateSimpleBillField('packingChargePercent', this.value)" style="font-weight:700;width:90px" />
                      <span style="font-weight:700;font-size:14px">%</span>
                      <span style="font-size:11.5px;color:var(--text-muted)">(Sivakasi standard is 3%)</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Authorized Signatory Name</label>
                    <input type="text" class="input" value="${escapeHtml(b.forFactory || f.name || '')}" oninput="window.adhiraApp.updateSimpleBillField('forFactory', this.value)" />
                  </div>
                </div>

                <div style="background:var(--bg-subtle);border-radius:var(--radius-md);padding:14px;border:1px solid var(--border-subtle);display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:10px;text-align:center;">
                  <div>
                    <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:600">Total Cases</div>
                    <div style="font-size:17px;font-weight:800;color:var(--navy-900)" id="sbSummaryCases">${summary.totalCases}</div>
                  </div>
                  <div>
                    <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:600">Subtotal</div>
                    <div style="font-size:17px;font-weight:800;color:var(--navy-900)" id="sbSummarySubtotal">₹${summary.subtotal.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:600">Packing (${b.packingChargePercent || 3}%)</div>
                    <div style="font-size:17px;font-weight:800;color:var(--navy-900)" id="sbSummaryPacking">₹${summary.packingCharge.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:600">Round off</div>
                    <div style="font-size:17px;font-weight:800;color:var(--navy-900)" id="sbSummaryRound">${summary.roundOff >= 0 ? '+' : ''}${summary.roundOff.toFixed(2)}</div>
                  </div>
                  <div style="background:#fffbeb;border:1px solid #fef3c7;border-radius:8px;padding:4px 8px;">
                    <div style="font-size:11px;color:#92400e;text-transform:uppercase;font-weight:700">Net Amount</div>
                    <div style="font-size:19px;font-weight:900;color:#b45309" id="sbSummaryNet">₹${summary.netAmount.toFixed(2)}</div>
                  </div>
                </div>

                <div style="margin-top:10px;font-size:12px;color:var(--text-secondary)">
                  <b>Amount in words:</b> <span id="sbSummaryWords">${escapeHtml(summary.amountInWords)}</span>
                </div>
              </div>

              <!-- ACTION BUTTONS -->
              <div style="display:flex;gap:10px;justify-content:flex-end;margin-bottom:30px;flex-wrap:wrap;">
                <button type="button" class="btn btn-secondary" onclick="window.adhiraApp.newSimpleBill()">
                  <span>↺</span> Reset Form
                </button>
                <button type="button" class="btn btn-gold" onclick="window.adhiraApp.saveSimpleBill()">
                  <span>💾</span> Save Estimate
                </button>
                <button type="button" class="btn btn-primary" onclick="window.adhiraApp.setSbMobileTab('preview')">
                  <span>👁️</span> Preview Bill
                </button>
              </div>

            </div><!-- /.sb-form-col -->

            <!-- RIGHT COLUMN: LIVE A4 PREVIEW -->
            <div class="sb-preview-col">
              <div class="card" style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                <div style="display:flex;align-items:center;gap:6px;">
                  <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.setSbMobileTab('form')" title="Back to Edit Details">
                    <span>✏️</span> Edit Details
                  </button>
                  <span style="font-weight:700;font-size:13px;color:var(--navy-900)">📄 Live A4 Estimate</span>
                </div>
                <div style="display:flex;gap:6px;align-items:center;">
                  <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.autoFitSimpleBillPreview()" title="Auto fit to screen width">Fit Screen</button>
                  <button class="btn btn-primary btn-sm" onclick="window.adhiraApp.printCurrentSimpleBill()">
                    <span>🖨️</span> Print
                  </button>
                  <button class="btn btn-gold btn-sm" onclick="window.adhiraApp.downloadCurrentSimpleBillPdf()">
                    <span>📥</span> PDF
                  </button>
                </div>
              </div>

              <div class="sb-preview-card">
                <div id="sbLivePreviewContainer" style="transform-origin:top center;transition:transform 0.2s ease;">
                  ${generateSimpleBillA4Html(draftSimpleBill)}
                </div>
              </div>
            </div>

          </div><!-- /.sb-layout-grid -->
        `}
      </div>
    `;
  }

  function autoFitSimpleBillPreview() {
    const wrap = document.getElementById('sbLivePreviewContainer');
    const root = document.getElementById('printableSimpleEstimateRoot');
    if (!wrap || !root) return;

    const parent = wrap.closest('.sb-preview-card') || wrap.parentElement;
    if (!parent) return;

    const availW = parent.clientWidth - 16;
    if (availW < 740) {
      const scale = Math.max(0.32, Math.min(1.0, availW / 730));
      state.simpleBillScale = scale;
      wrap.style.transform = `scale(${scale})`;
      wrap.style.transformOrigin = 'top center';
      const naturalH = root.offsetHeight || 980;
      const diff = naturalH * (1.0 - scale);
      wrap.style.marginBottom = `-${diff}px`;
    } else {
      state.simpleBillScale = 1.0;
      wrap.style.transform = 'none';
      wrap.style.marginBottom = '0px';
    }
  }

  function setSbMobileTab(tab) {
    state.sbMobileTab = tab;
    renderCurrentPage();
    if (tab === 'preview') {
      setTimeout(autoFitSimpleBillPreview, 50);
    }
  }

  function attachSimpleBillingListeners() {
    autoFitSimpleBillPreview();
    window.removeEventListener('resize', autoFitSimpleBillPreview);
    window.addEventListener('resize', autoFitSimpleBillPreview);
  }

  function refreshSimpleBillLivePreview() {
    if (!draftSimpleBill) return;
    const previewWrap = document.getElementById('sbLivePreviewContainer');
    if (previewWrap) {
      previewWrap.innerHTML = generateSimpleBillA4Html(draftSimpleBill);
    }
    const summary = calculateSimpleBillSummary(draftSimpleBill);
    const elCases = document.getElementById('sbSummaryCases');
    const elSubtotal = document.getElementById('sbSummarySubtotal');
    const elPacking = document.getElementById('sbSummaryPacking');
    const elRound = document.getElementById('sbSummaryRound');
    const elNet = document.getElementById('sbSummaryNet');
    const elWords = document.getElementById('sbSummaryWords');

    if (elCases) elCases.textContent = summary.totalCases;
    if (elSubtotal) elSubtotal.textContent = '₹' + summary.subtotal.toFixed(2);
    if (elPacking) elPacking.textContent = '₹' + summary.packingCharge.toFixed(2);
    if (elRound) elRound.textContent = (summary.roundOff >= 0 ? '+' : '') + summary.roundOff.toFixed(2);
    if (elNet) elNet.textContent = '₹' + summary.netAmount.toFixed(2);
    if (elWords) elWords.textContent = summary.amountInWords;
  }

  function updateSimpleBillField(path, val) {
    if (!draftSimpleBill) initDraftSimpleBill();
    if (path.includes('.')) {
      const parts = path.split('.');
      draftSimpleBill[parts[0]][parts[1]] = val;
    } else {
      draftSimpleBill[path] = val;
    }
    refreshSimpleBillLivePreview();
  }

  function updateSimpleBillItem(idx, field, val) {
    if (!draftSimpleBill || !draftSimpleBill.items || !draftSimpleBill.items[idx]) return;
    const it = draftSimpleBill.items[idx];

    if (field === 'cases' || field === 'contents') {
      it[field] = Number(val) || 0;
      it.qty = (Number(it.cases) || 0) * (Number(it.contents) || 0);
      it.amount = round2(it.qty * (Number(it.rate) || 0));
      const qtyEl = document.getElementById(`sbItemQty_${idx}`);
      const amtEl = document.getElementById(`sbItemAmt_${idx}`);
      if (qtyEl) qtyEl.value = it.qty;
      if (amtEl) amtEl.value = it.amount.toFixed(2);
    } else if (field === 'qty') {
      it.qty = Number(val) || 0;
      it.amount = round2(it.qty * (Number(it.rate) || 0));
      const amtEl = document.getElementById(`sbItemAmt_${idx}`);
      if (amtEl) amtEl.value = it.amount.toFixed(2);
    } else if (field === 'rate') {
      it.rate = Number(val) || 0;
      it.amount = round2((Number(it.qty) || 0) * it.rate);
      const amtEl = document.getElementById(`sbItemAmt_${idx}`);
      if (amtEl) amtEl.value = it.amount.toFixed(2);
    } else {
      it[field] = val;
    }

    refreshSimpleBillLivePreview();
  }

  function handleDropdownProductChange(productId) {
    state.sbSelectedProdId = productId;
    const p = (db.products || []).find(x => x.id === productId);
    if (!p) {
      state.sbPendingName = '';
      state.sbPendingRate = 0;
      state.sbPendingContents = 16;
      state.sbPendingRatePer = '1 BOX';
    } else {
      state.sbPendingName = p.name;
      state.sbPendingRate = p.rate || 0;
      state.sbPendingContents = p.pieces || 16;
      state.sbPendingRatePer = p.unit || '1 BOX';
    }

    const inpCases = document.getElementById('sbInpCases');
    const inpContents = document.getElementById('sbInpContents');
    const inpRate = document.getElementById('sbInpRate');
    const inpRatePer = document.getElementById('sbInpRatePer');
    const nameDisp = document.getElementById('sbPendingNameDisplay');

    if (inpCases && (!inpCases.value || inpCases.value == 0)) inpCases.value = 1;
    if (inpContents) inpContents.value = state.sbPendingContents;
    if (inpRate) inpRate.value = state.sbPendingRate;
    if (inpRatePer) inpRatePer.value = state.sbPendingRatePer;
    if (nameDisp) nameDisp.textContent = state.sbPendingName || 'None selected';

    updateDropdownPendingCalc();
  }

  function updateDropdownPendingCalc() {
    const inpCases = document.getElementById('sbInpCases');
    const inpContents = document.getElementById('sbInpContents');
    const inpRate = document.getElementById('sbInpRate');
    const inpQty = document.getElementById('sbInpQty');
    const amtDisp = document.getElementById('sbPendingAmtDisplay');

    const cases = Number(inpCases?.value) || 0;
    const contents = Number(inpContents?.value) || 0;
    const rate = Number(inpRate?.value) || 0;
    const qty = cases * contents;
    const amt = round2(qty * rate);

    state.sbPendingCases = cases;
    state.sbPendingContents = contents;
    state.sbPendingRate = rate;

    if (inpQty) inpQty.value = qty;
    if (amtDisp) amtDisp.textContent = '₹' + amt.toFixed(2);
  }

  function addCurrentDropdownItem() {
    if (!draftSimpleBill) initDraftSimpleBill();
    const dropdown = document.getElementById('sbProductDropdown');
    const prodId = dropdown ? dropdown.value : state.sbSelectedProdId;
    if (!prodId) {
      showToast('Please select a product from the dropdown first.', 'warning');
      if (dropdown) dropdown.focus();
      return;
    }

    const p = (db.products || []).find(x => x.id === prodId);
    const prodName = p ? p.name : (state.sbPendingName || 'FIREWORKS ITEM');

    const inpCases = document.getElementById('sbInpCases');
    const inpContents = document.getElementById('sbInpContents');
    const inpRate = document.getElementById('sbInpRate');
    const inpRatePer = document.getElementById('sbInpRatePer');

    const cases = Number(inpCases ? inpCases.value : state.sbPendingCases) || 1;
    const contents = Number(inpContents ? inpContents.value : state.sbPendingContents) || 16;
    const rate = Number(inpRate ? inpRate.value : state.sbPendingRate) || 0;
    const ratePer = inpRatePer ? inpRatePer.value.trim() : (state.sbPendingRatePer || '1 BOX');
    const qty = cases * contents;
    const amount = round2(qty * rate);

    if (!draftSimpleBill.items) draftSimpleBill.items = [];
    draftSimpleBill.items.push({
      id: 'SBITM-' + Date.now() + Math.random().toString(36).substring(2, 5),
      sno: draftSimpleBill.items.length + 1,
      particulars: prodName.toUpperCase(),
      cases: cases,
      contents: contents,
      qty: qty,
      rate: rate,
      ratePer: ratePer || '1 BOX',
      amount: amount
    });

    // Reset dropdown selection
    state.sbSelectedProdId = '';
    state.sbPendingName = '';
    state.sbPendingCases = 1;
    state.sbPendingRate = 0;

    renderCurrentPage();
    showToast(`Added "${prodName}" (${cases} case${cases > 1 ? 's' : ''}) to bill`, 'success');
  }

  function addSimpleBillItem() {
    if (!draftSimpleBill) initDraftSimpleBill();
    if (!draftSimpleBill.items) draftSimpleBill.items = [];
    draftSimpleBill.items.push({
      id: 'SBITM-' + Date.now() + Math.random().toString(36).substring(2, 5),
      sno: draftSimpleBill.items.length + 1,
      particulars: '',
      cases: 1,
      contents: 1,
      qty: 1,
      rate: 0,
      ratePer: '1 BOX',
      amount: 0
    });
    renderCurrentPage();
  }

  function removeSimpleBillItem(idx) {
    if (!draftSimpleBill || !draftSimpleBill.items) return;
    draftSimpleBill.items.splice(idx, 1);
    renderCurrentPage();
  }

  function handleSimpleBillCustomerSelect(custId) {
    if (!draftSimpleBill) initDraftSimpleBill();
    const c = (db.customers || []).find(x => x.id === custId);
    if (!c) return;

    draftSimpleBill.customer = {
      name: c.name || '',
      addressLine1: c.billingAddress || c.address || '',
      addressLine2: c.area || '',
      cityPin: [c.city, c.pin].filter(Boolean).join(' - ') || (c.city || ''),
      gstin: c.gstin || c.phone || ''
    };

    renderCurrentPage();
    showToast(`Loaded details for customer "${c.name}"`, 'success');
  }

  function handleSimpleBillFactorySelect(selId) {
    if (!draftSimpleBill) initDraftSimpleBill();
    const sel = (db.sellers || []).find(s => s.id === selId || s.name === selId) || db.company;
    if (!sel) return;

    const factoryAddr = sel.address1 ? [
      sel.address1,
      sel.address2,
      sel.area,
      sel.city || 'Sivakasi',
      sel.district ? sel.district : '',
      sel.state ? `${sel.state} - ${sel.pin || '626124'}` : (sel.pin || '')
    ].filter(Boolean).join(', ') : (sel.address || '8/444, Unnamed Road, Near Sri Jaishnavi Stores, Gandhinagar, Anaiyur, Sivakasi, Virudhunagar, Tamil nadu - 626124.');

    draftSimpleBill.factory = {
      name: sel.name || 'ADHIRA FIRE WORKS & PYROTECH',
      address: factoryAddr,
      phone: (sel.phone || '+91 6384197583') + (sel.altPhone ? ', ' + sel.altPhone : '')
    };
    draftSimpleBill.forFactory = sel.name || 'ADHIRA FIRE WORKS & PYROTECH';

    renderCurrentPage();
    showToast(`Loaded factory details for "${sel.name}"`, 'success');
  }

  function addSimpleBillProductFromPicker(productId) {
    if (!draftSimpleBill) initDraftSimpleBill();
    const p = (db.products || []).find(x => x.id === productId);
    if (!p) return;

    const contents = p.pieces || 16;
    const cases = 1;
    const qty = cases * contents;
    const rate = p.rate || 100;
    const amount = round2(qty * rate);

    draftSimpleBill.items.push({
      id: 'SBITM-' + Date.now() + Math.random().toString(36).substring(2, 5),
      sno: draftSimpleBill.items.length + 1,
      particulars: (p.name || '').toUpperCase(),
      cases: cases,
      contents: contents,
      qty: qty,
      rate: rate,
      ratePer: p.unit || '1 BOX',
      amount: amount
    });

    renderCurrentPage();
    showToast(`Added "${p.name}" to estimate`, 'success');
  }

  function openSimpleBillProductPickerModal() {
    const prods = (db.products || []).filter(p => p.active !== false);
    const body = `
      <div style="margin-bottom:12px;">
        <input type="text" class="input" id="sbPickerSearchInp" placeholder="Search product name, category or HSN..." oninput="window.adhiraApp.filterPickerProducts(this.value)" />
      </div>
      <div style="max-height:460px;overflow-y:auto;border:1px solid var(--border-subtle);border-radius:var(--radius-md);">
        <table class="data-table" style="font-size:12px;" id="sbPickerTable">
          <thead>
            <tr>
              <th>Particulars</th>
              <th>Packing</th>
              <th>Contents</th>
              <th class="num">Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${prods.map(p => `
              <tr class="sb-picker-row" data-search="${(p.name + ' ' + (p.category || '')).toLowerCase()}">
                <td>
                  <b>${escapeHtml(p.name)}</b>
                  <div style="font-size:11px;color:var(--text-muted)">${escapeHtml(p.category || '')}</div>
                </td>
                <td>${escapeHtml(p.packing || '1 Box')}</td>
                <td>${p.pieces || 16}</td>
                <td class="num">₹${Number(p.rate || 0).toFixed(2)}</td>
                <td>
                  <button type="button" class="btn btn-gold btn-sm" onclick="window.adhiraApp.addSimpleBillProductFromPicker('${p.id}'); window.adhiraApp.closeModal();">
                    + Add
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    openModal('Select Products from Fireworks Master', body, `<button class="btn btn-secondary" onclick="window.adhiraApp.closeModal()">Close</button>`, 'modal-lg');
  }

  function saveCurrentSimpleBill() {
    if (!draftSimpleBill) return;

    if (!draftSimpleBill.items || draftSimpleBill.items.length === 0) {
      showToast('Please add at least one line item to the bill.', 'error');
      return;
    }

    const summary = calculateSimpleBillSummary(draftSimpleBill);
    draftSimpleBill.totalCases = summary.totalCases;
    draftSimpleBill.subtotal = summary.subtotal;
    draftSimpleBill.packingChargeAmount = summary.packingCharge;
    draftSimpleBill.roundOff = summary.roundOff;
    draftSimpleBill.netAmount = summary.netAmount;
    draftSimpleBill.amountInWords = summary.amountInWords;
    draftSimpleBill.updatedAt = new Date().toISOString();

    if (!db.simpleBills) db.simpleBills = [];

    const existingIdx = db.simpleBills.findIndex(x => x.id === draftSimpleBill.id);
    if (existingIdx >= 0) {
      db.simpleBills[existingIdx] = structuredClone(draftSimpleBill);
      showToast(`Simple Bill #${draftSimpleBill.number} updated successfully!`, 'success');
    } else {
      draftSimpleBill.createdAt = new Date().toISOString();
      db.simpleBills.unshift(structuredClone(draftSimpleBill));

      // Advance counter
      const billNum = parseInt(draftSimpleBill.number, 10);
      if (!isNaN(billNum)) {
        if (!db.settings) db.settings = structuredClone(INITIAL_DB.settings);
        db.settings.nextSimpleBill = Math.max(db.settings.nextSimpleBill || 220, billNum + 1);
      }
      showToast(`Simple Bill #${draftSimpleBill.number} saved successfully!`, 'success');
    }

    saveDatabase();
    renderAppShell();
  }

  function editSimpleBillById(id) {
    const b = (db.simpleBills || []).find(x => x.id === id);
    if (!b) return;
    draftSimpleBill = structuredClone(b);
    state.editingSimpleBillId = id;
    state.simpleBillingTab = 'editor';
    closeModal();
    navigateTo('simple-billing');
  }

  function deleteSimpleBillById(id) {
    if (!confirm('Are you sure you want to delete this Simple Bill permanently?')) return;
    const idx = (db.simpleBills || []).findIndex(x => x.id === id);
    if (idx >= 0) {
      const num = db.simpleBills[idx].number;
      db.simpleBills.splice(idx, 1);
      saveDatabase();
      showToast(`Simple Bill #${num} deleted`, 'info');
      renderAppShell();
    }
  }

  function viewSimpleBillModalById(id) {
    const b = (db.simpleBills || []).find(x => x.id === id);
    if (!b) return;

    const body = `
      <div style="background:#e2e8f0;padding:16px;border-radius:12px;overflow-x:auto;display:flex;justify-content:center;">
        ${generateSimpleBillA4Html(b)}
      </div>
    `;

    const footer = `
      <button class="btn btn-primary" onclick="window.adhiraApp.printSimpleBillById('${b.id}')">
        <span>🖨️</span> Print Estimate
      </button>
      <button class="btn btn-gold" onclick="window.adhiraApp.downloadSimpleBillPdfById('${b.id}')">
        <span>📥</span> Download PDF
      </button>
      <button class="btn btn-secondary" onclick="window.adhiraApp.editSimpleBill('${b.id}')">
        <span>✏️</span> Edit Bill
      </button>
      <button class="btn btn-secondary" onclick="window.adhiraApp.closeModal()">Close</button>
    `;

    openModal(`Estimate #${b.number} — ${escapeHtml(b.customer?.name || '')}`, body, footer, 'modal-lg');
  }

  function printCurrentSimpleBill() {
    if (!draftSimpleBill) return;
    printSimpleBillDoc(draftSimpleBill);
  }

  function printSimpleBillById(id) {
    const b = (db.simpleBills || []).find(x => x.id === id);
    if (!b) return;
    printSimpleBillDoc(b);
  }

  function printSimpleBillDoc(bill) {
    const html = generateSimpleBillA4Html(bill);
    const printFrame = document.createElement('iframe');
    printFrame.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;border:none;opacity:0;visibility:hidden';
    document.body.appendChild(printFrame);

    const doc = printFrame.contentDocument || printFrame.contentWindow.document;
    const styleLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).map(s => s.outerHTML).join('\n');

    doc.open();
    doc.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
      ${styleLinks}
      <style>
        @page { size: A4 portrait; margin: 6mm 8mm; }
        html, body { margin: 0; padding: 0; background: #fff; }
        .simple-estimate-wrapper {
          width: 100% !important;
          max-width: 100% !important;
          padding: 0 !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          margin: 0 !important;
        }
      </style>
    </head><body>${html}</body></html>`);
    doc.close();

    setTimeout(() => {
      try {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
      } catch (e) {
        console.error('Print iframe error:', e);
      }
      setTimeout(() => printFrame.remove(), 2500);
    }, 400);
  }

  function downloadCurrentSimpleBillPdf() {
    if (!draftSimpleBill) return;
    downloadSimpleBillPdfDoc(draftSimpleBill);
  }

  function downloadSimpleBillPdfById(id) {
    const b = (db.simpleBills || []).find(x => x.id === id);
    if (!b) return;
    downloadSimpleBillPdfDoc(b);
  }

  function downloadSimpleBillPdfDoc(bill) {
    if (typeof html2pdf === 'undefined') {
      showToast('PDF generator library loading, please try again.', 'error');
      return;
    }

    const container = document.createElement('div');
    container.innerHTML = generateSimpleBillA4Html(bill);
    const element = container.firstElementChild;
    if (!element) {
      showToast('Unable to prepare PDF document.', 'error');
      return;
    }

    // Match exact 730px width and styling of preview in Image 2
    element.style.width = '730px';
    element.style.minWidth = '730px';
    element.style.maxWidth = '730px';
    element.style.boxSizing = 'border-box';
    element.style.margin = '0 auto';
    element.style.boxShadow = 'none';
    element.style.borderRadius = '0';
    element.style.transform = 'none';

    document.body.appendChild(element);

    const opt = {
      margin: [8, 8.4, 8, 8.4],
      filename: `Estimate_${bill.number || 'Bill'}_${(bill.customer?.name || 'Customer').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, windowWidth: 730, scrollX: 0, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'], avoid: ['tr', '.sb-summary-grid', '.sb-words-box', '.sb-terms-sign-grid', '.simple-estimate-footer'] }
    };

    showToast('Generating Estimate PDF...', 'info');
    html2pdf().set(opt).from(element).save().then(() => {
      element.remove();
      showToast('Estimate PDF downloaded successfully!', 'success');
    }).catch(err => {
      element.remove();
      console.error('Estimate PDF export error:', err);
      showToast('PDF export error. Try Print PDF instead.', 'error');
    });
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
        <div class="toolbar" style="gap:12px;flex-wrap:wrap">
          <div class="unified-search-bar" style="flex:1;min-width:320px">
            <span class="search-icon">🔍</span>
            <input type="text" class="search-input" id="invoiceSearchInput" placeholder="Search invoice no, customer, type GSTIN or E-Way Bill..." value="${escapeHtml(state.invoiceSearch)}" />
            <div class="search-divider"></div>
            <button class="search-add-btn" onclick="window.adhiraApp.navigate('quotations')" title="Create / Convert from Quote">
              <span>+</span> New Invoice
            </button>
          </div>

          <div class="toolbar-right" style="display:flex;gap:8px;align-items:center">
            <select class="select" id="invoiceStatusFilter" style="width:160px;">
              <option value="All" ${state.invoiceFilterStatus === 'All' ? 'selected' : ''}>All Payments</option>
              <option value="Paid" ${state.invoiceFilterStatus === 'Paid' ? 'selected' : ''}>Paid</option>
              <option value="Unpaid" ${state.invoiceFilterStatus === 'Unpaid' ? 'selected' : ''}>Unpaid</option>
              <option value="Partially Paid" ${state.invoiceFilterStatus === 'Partially Paid' ? 'selected' : ''}>Partially Paid</option>
            </select>
            <button class="btn btn-secondary" onclick="window.adhiraApp.exportInvoicesCsv()">
              <span>📥</span> Export CSV
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
        <div class="toolbar" style="gap:12px;flex-wrap:wrap">
          <div class="unified-search-bar" style="flex:1;min-width:320px">
            <span class="search-icon">🔍</span>
            <input type="text" class="search-input" id="custSearchInput" placeholder="Search shop name, type GSTIN, city or mobile..." value="${escapeHtml(state.customerSearch)}" />
            <div class="search-divider"></div>
            <button class="search-add-btn" onclick="window.adhiraApp.openCustomerModal()" title="Add New Customer">
              <span>+</span> Add Customer
            </button>
          </div>

          <div class="toolbar-right" style="display:flex;gap:8px;align-items:center">
            <button class="btn btn-secondary" onclick="window.adhiraApp.exportCustomersCsv()">
              <span>📥</span> Export CSV
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
        <div class="toolbar" style="gap:12px;flex-wrap:wrap">
          <div class="unified-search-bar" style="flex:1;min-width:320px">
            <span class="search-icon">🔍</span>
            <input type="text" class="search-input" id="prodSearchInput" placeholder="Search product name, type HSN, packing or category..." value="${escapeHtml(state.productSearch)}" />
            <div class="search-divider"></div>
            <button class="search-add-btn" onclick="window.adhiraApp.openProductModal()" title="Add New Product">
              <span>+</span> Add Product
            </button>
          </div>

          <div class="toolbar-right" style="display:flex;gap:8px;align-items:center">
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
            <button class="btn btn-secondary" onclick="window.adhiraApp.exportProductsCsv()">
              <span>📥</span> Export CSV
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

  function attachCategoriesListeners() { }

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

  function attachReportsListeners() { }

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

          <!-- ADMIN SECURITY & CREDENTIALS -->
          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title">Administrator Security &amp; Credentials</h3>
                <p class="card-subtitle">View, edit and update administrator credentials anytime (No OTP required)</p>
              </div>
              <button type="button" class="btn btn-gold btn-sm" onclick="window.adhiraApp.openChangeCredentialsModal()">
                ✏️ Edit Credentials
              </button>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;background:var(--bg-subtle);padding:14px;border-radius:var(--radius-md);border:1px solid var(--border-subtle);font-size:12.5px;">
              <div>
                <span style="color:var(--text-muted);display:block;font-size:11px;text-transform:uppercase;font-weight:600;">Active Admin Username</span>
                <b style="font-size:14px;color:var(--navy-950);">${escapeHtml(db.auth?.username || 'admin')}</b>
              </div>
              <div>
                <span style="color:var(--text-muted);display:block;font-size:11px;text-transform:uppercase;font-weight:600;">Current Password</span>
                <b style="font-size:14px;color:#1e40af;font-family:monospace;letter-spacing:1px;">${escapeHtml(db.auth?.password || 'admin')}</b>
              </div>
              <div>
                <span style="color:var(--text-muted);display:block;font-size:11px;text-transform:uppercase;font-weight:600;">Contact Email</span>
                <b style="font-size:13px;color:var(--navy-950);">${escapeHtml(db.auth?.adminEmail || 'lakshmimedicotech25@gmail.com')}</b>
              </div>
              <div>
                <span style="color:var(--text-muted);display:block;font-size:11px;text-transform:uppercase;font-weight:600;">Access Level</span>
                <span class="role-badge-pill" style="display:inline-flex;padding:3px 10px;font-size:11.5px;background:#f0fdf4;border:1px solid #bbf7d0;color:#166534;font-weight:700;">
                  ● Super Administrator
                </span>
              </div>
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

  function attachSettingsListeners() { }

  // ==========================================================================
  // MODULE 9: COMMERCIAL A4 PDF DOCUMENT ENGINE (STRICT MB & SONS SPECIFICATION)
  // ==========================================================================

  function generateA4DocumentHtml(doc, isInvoice = false) {
    let s = doc.seller || db.company;
    if (s && db.company) {
      const matchSeller = (db.sellers || []).find(sel => (s.id && sel.id === s.id) || (s.gstin && sel.gstin === s.gstin));
      if (matchSeller) {
        s = Object.assign({}, s, matchSeller, matchSeller.isDefault ? db.company : {});
      } else {
        s = Object.assign({}, s, db.company);
      }
    } else {
      s = db.company;
    }
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
          <div class="pdf-watermark-overlay" style="opacity:${settings.watermarkOpacity !== undefined ? settings.watermarkOpacity : 0.25}">
            <img src="${LOGO_PATH}" alt="Watermark" />
          </div>
        ` : ''}

        <div class="pdf-content-relative">
          <!-- 1. DOCUMENT TOP HEADER -->
          <div class="pdf-header-container">
            <div class="pdf-header-brand">
              <img src="${LOGO_PATH}" alt="Logo" class="pdf-header-logo" />
              <div class="pdf-header-brand-info">
                <h1>${escapeHtml(s.name || db.company.name || 'ADHIRA FIRE WORKS & PYROTECH')}</h1>
                <div class="seller-addr-txt">
                  ${escapeHtml(s.address1 || db.company.address1 || '')}${s.address2 || db.company.address2 ? ', ' + escapeHtml(s.address2 || db.company.address2) : ''}<br>
                  ${s.area || db.company.area ? escapeHtml(s.area || db.company.area) + ', ' : ''}${escapeHtml(s.city || db.company.city || 'Sivakasi')}${s.pin || db.company.pin ? ' - ' + escapeHtml(s.pin || db.company.pin) : ''}${s.state || db.company.state ? ', ' + escapeHtml(s.state || db.company.state) : ''}<br>
                  ${s.phone || db.company.phone ? `Phone: ${escapeHtml(s.phone || db.company.phone)}${s.altPhone || db.company.altPhone ? ' • ' + escapeHtml(s.altPhone || db.company.altPhone) : ''}<br>` : ''}
                  ${s.email || db.company.email ? `Email: ${escapeHtml(s.email || db.company.email)}` : ''}
                </div>
                <div class="seller-tax-pill">
                  GSTIN: ${escapeHtml(s.gstin || db.company.gstin || '')} • State: ${escapeHtml(s.state || db.company.state || 'Tamil Nadu')} (${escapeHtml(s.stateCode || db.company.stateCode || '33')})<br>
                  ${s.regArnRef || db.company.regArnRef ? `<span style="font-weight:400;color:#4b5563">Certificate / ARN Ref: ${escapeHtml(s.regArnRef || db.company.regArnRef)}</span>` : ''}
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
                    Bank Name: <b>${escapeHtml(s.bankName || db.company.bankName || '')}</b><br>
                    A/c No: <b>${escapeHtml(s.accountNumber || db.company.accountNumber || '')}</b><br>
                    Branch & IFSC: <b>${escapeHtml(s.branch || db.company.branch || '')}${s.ifsc || db.company.ifsc ? ' • ' + escapeHtml(s.ifsc || db.company.ifsc) : ''}</b><br>
                    UPI ID: <b>${escapeHtml(s.upi || db.company.upi || '')}</b><br>
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
                <div class="sign-company">For ${escapeHtml(s.name || db.company.name || 'ADHIRA FIRE WORKS & PYROTECH')}</div>
                <div style="height:32px"></div>
                <div>
                  <b>${escapeHtml(s.signatoryName || db.company.signatoryName || 'Murugan Selvaraj')}</b><br>
                  <span style="font-size:7.5px;color:#6b7280">${escapeHtml(s.signatoryDesignation || db.company.signatoryDesignation || 'Authorised Signatory')}</span>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- 8. FOOTER NOTE -->
          <div class="pdf-footer-note">
            <span>ADHIRA FIRE WORKS &amp; PYROTECH • SIVAKASI, TAMIL NADU</span>
            <span>This is a Computer Generated Commercial GST Document</span>
            <span>Page 1 of 1</span>
          </div>

          <!-- POWERED BY LAXORA TECHNOLOGIES -->
          <div class="pdf-laxora-credit">
            Powered by <strong>LAXORA Technologies</strong> | +91 70940 62522
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
    const isMobile = window.innerWidth <= 768;
    const autoScale = isMobile ? Math.min(1.0, Math.max(0.35, (window.innerWidth - 16) / 800)) : 1.0;
    state.zoomScale = autoScale;

    const modalTitle = `${isInvoice ? 'Tax Invoice' : 'Quotation'} ${doc.number}`;
    const docHtml = generateA4DocumentHtml(doc, isInvoice);

    const body = `
      <div class="pdf-preview-backdrop">
        <div class="pdf-preview-toolbar">
          <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.setPdfScale(1.0)" title="100% Full View (Crisp Standard Size)">🔍 100%</button>
          <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.fitPdfToScreen()" title="Fit Document to Screen Width">📱 Fit Screen</button>
          
          <div style="height:18px;width:1px;background:var(--border-subtle);margin:0 2px;"></div>

          <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.zoomPdf(-0.1)" title="Zoom Out">➖</button>
          <span id="zoomScaleLabel" style="font-size:12px;font-weight:700;min-width:38px;text-align:center;">${Math.round(autoScale * 100)}%</span>
          <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.zoomPdf(0.1)" title="Zoom In">➕</button>
          
          <div style="height:18px;width:1px;background:var(--border-subtle);margin:0 2px;"></div>

          <button class="btn btn-gold btn-sm" onclick="window.adhiraApp.downloadPdfFile('${doc.number}')">
            <span>📥</span> Download PDF
          </button>

          <button class="btn btn-primary btn-sm" onclick="window.adhiraApp.printPdfOnly()">
            <span>🖨️</span> Print PDF Only
          </button>

          <button class="btn btn-success btn-sm" onclick="window.adhiraApp.shareWhatsApp('${doc.id}', ${isInvoice})">
            <span>💬</span> WhatsApp
          </button>

          <button class="btn btn-secondary btn-sm" onclick="window.adhiraApp.shareEmail('${doc.id}', ${isInvoice})">
            <span>✉️</span> Email
          </button>
        </div>

        <div id="pdfZoomContainer" style="display:flex;justify-content:center;width:100%;overflow-x:auto;">
          ${docHtml}
        </div>
      </div>
    `;

    openModal(modalTitle, body, `<button class="btn btn-secondary" onclick="window.adhiraApp.closeModal()">Close</button>`, 'modal-lg');

    // Apply scale to the sheet for mobile auto-fit
    setTimeout(() => {
      if (window.adhiraApp && window.adhiraApp.setPdfScale) {
        window.adhiraApp.setPdfScale(state.zoomScale);
      }
    }, 40);

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
      if (typeof html2pdf === 'undefined') {
        window.adhiraApp.printPdfOnly();
        return;
      }

      const doc = (state.viewingDoc && state.viewingDoc.doc)
        ? state.viewingDoc.doc
        : ((db.quotations || []).find(q => q.number === docNo) || (db.invoices || []).find(i => i.number === docNo));
      const isInvoice = state.viewingDoc
        ? Boolean(state.viewingDoc.isInvoice)
        : Boolean((db.invoices || []).find(i => i.number === docNo));

      const container = document.createElement('div');
      if (doc) {
        container.innerHTML = generateA4DocumentHtml(doc, isInvoice);
      } else {
        const liveEl = document.getElementById('printableA4Document');
        if (liveEl) {
          container.appendChild(liveEl.cloneNode(true));
        }
      }
      const element = container.firstElementChild;
      if (!element) {
        window.adhiraApp.printPdfOnly();
        return;
      }

      element.id = 'exportA4Document';
      element.style.width = '794px';
      element.style.minWidth = '794px';
      element.style.maxWidth = '794px';
      element.style.boxSizing = 'border-box';
      element.style.margin = '0 auto';
      element.style.boxShadow = 'none';
      element.style.borderRadius = '0';
      element.style.transform = 'none';

      document.body.appendChild(element);

      const opt = {
        margin: [0, 0, 0, 0],
        filename: `${(docNo || doc?.number || 'document').replace(/\//g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, windowWidth: 794, scrollX: 0, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], avoid: ['tr', '.pdf-bottom-grid', '.pdf-signatures-grid', '.pdf-footer-note', '.pdf-tax-summary-table'] }
      };

      showToast('Rendering high-resolution A4 PDF...', 'info');
      html2pdf().set(opt).from(element).save().then(() => {
        element.remove();
        showToast('PDF downloaded successfully!', 'success');
      }).catch(err => {
        element.remove();
        console.error(err);
        window.adhiraApp.printPdfOnly();
      });
    },

    // Print ONLY the A4 PDF document, not the entire app page
    printPdfOnly: () => {
      const el = document.getElementById('printableA4Document');
      if (!el) {
        window.print();
        return;
      }

      // Clone the A4 sheet, open in a print iframe
      const printFrame = document.createElement('iframe');
      printFrame.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;border:none;opacity:0;visibility:hidden';
      document.body.appendChild(printFrame);

      const doc = printFrame.contentDocument || printFrame.contentWindow.document;
      const styleLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).map(s => s.outerHTML).join('\n');
      const a4Html = el.outerHTML;

      doc.open();
      doc.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
        ${styleLinks}
        <style>
          @page { size: A4 portrait; margin: 0; }
          html, body { margin: 0; padding: 0; background: #fff; }
          .pdf-a4-sheet {
            width: 210mm !important;
            min-height: 297mm !important;
            padding: 15mm 18mm !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            transform: none !important;
            page-break-after: avoid !important;
            overflow: visible !important;
          }
          .pdf-preview-toolbar, .app-sidebar, .app-topbar, .modal-header, .modal-footer { display: none !important; }
        </style>
      </head><body>${a4Html}</body></html>`);
      doc.close();

      // Draw the QR canvas into the iframe if present
      const srcCanvas = document.querySelector('#pdfUpiQrCanvas canvas');
      if (srcCanvas) {
        setTimeout(() => {
          const destCanvas = doc.querySelector('#pdfUpiQrCanvas canvas');
          if (destCanvas) {
            const ctx = destCanvas.getContext('2d');
            ctx.drawImage(srcCanvas, 0, 0);
          }
          printFrame.contentWindow.focus();
          printFrame.contentWindow.print();
          setTimeout(() => document.body.removeChild(printFrame), 2000);
        }, 350);
      } else {
        setTimeout(() => {
          printFrame.contentWindow.focus();
          printFrame.contentWindow.print();
          setTimeout(() => document.body.removeChild(printFrame), 2000);
        }, 250);
      }
    },

    // Position floating dropdown outside table boundaries without clipping
    positionDropdownElement: (input, dropdown, minWidth = 340, maxHeight = 280) => {
      if (!input || !dropdown) return;
      const rect = input.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      const height = Math.min(maxHeight, Math.max(160, Math.max(spaceBelow, spaceAbove) - 24));
      const placeAbove = spaceBelow < 200 && spaceAbove > spaceBelow;

      dropdown.style.position = 'fixed';
      dropdown.style.left = Math.max(10, Math.min(rect.left, window.innerWidth - minWidth - 16)) + 'px';
      dropdown.style.width = Math.max(rect.width, minWidth) + 'px';
      dropdown.style.maxHeight = height + 'px';
      dropdown.style.overflowY = 'auto';
      dropdown.style.zIndex = '999999';
      dropdown.style.boxShadow = '0 14px 40px rgba(0,0,0,0.28), 0 3px 10px rgba(0,0,0,0.12)';
      dropdown.style.background = '#ffffff';
      dropdown.style.border = '1.5px solid var(--gold-400)';
      dropdown.style.borderRadius = '8px';

      if (placeAbove) {
        dropdown.style.top = 'auto';
        dropdown.style.bottom = (viewportHeight - rect.top + 4) + 'px';
      } else {
        dropdown.style.top = (rect.bottom + 4) + 'px';
        dropdown.style.bottom = 'auto';
      }
    },

    // Smart Combo Box handlers for product search+select+type
    handleComboInput: (idx, value) => {
      const dropdown = document.getElementById('comboDropdown_' + idx);
      const input = document.getElementById('comboInput_' + idx);
      if (!dropdown || !input) return;
      // Update the draft item name immediately (free typing)
      if (draftQuote && draftQuote.items[idx]) {
        draftQuote.items[idx].name = value;
      }
      const q = value.trim().toLowerCase();
      const options = dropdown.querySelectorAll('.combo-option');
      let anyVisible = false;
      options.forEach(opt => {
        const name = (opt.dataset.name || '').toLowerCase();
        const show = !q || name.includes(q);
        opt.style.display = show ? '' : 'none';
        if (show) anyVisible = true;
      });
      if (anyVisible) {
        window.adhiraApp.positionDropdownElement(input, dropdown, 340, 280);
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    },

    showComboDropdown: (idx) => {
      const dropdown = document.getElementById('comboDropdown_' + idx);
      const input = document.getElementById('comboInput_' + idx);
      if (!dropdown || !input) return;
      const q = (input.value || '').trim().toLowerCase();
      const options = dropdown.querySelectorAll('.combo-option');
      let anyVisible = false;
      options.forEach(opt => {
        const name = (opt.dataset.name || '').toLowerCase();
        const show = !q || name.includes(q);
        opt.style.display = show ? '' : 'none';
        if (show) anyVisible = true;
      });
      if (anyVisible) {
        window.adhiraApp.positionDropdownElement(input, dropdown, 340, 280);
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    },

    hideComboDropdown: (idx) => {
      const dropdown = document.getElementById('comboDropdown_' + idx);
      if (dropdown) dropdown.style.display = 'none';
    },

    handleComboKeydown: (event, idx) => {
      const dropdown = document.getElementById('comboDropdown_' + idx);
      if (!dropdown || dropdown.style.display === 'none') return;
      const opts = Array.from(dropdown.querySelectorAll('.combo-option:not([style*="display: none"])')).filter(o => o.style.display !== 'none');
      const highlighted = dropdown.querySelector('.combo-option.highlighted');
      let hIdx = opts.indexOf(highlighted);
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (highlighted) highlighted.classList.remove('highlighted');
        hIdx = (hIdx + 1) % opts.length;
        opts[hIdx].classList.add('highlighted');
        opts[hIdx].scrollIntoView({ block: 'nearest' });
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (highlighted) highlighted.classList.remove('highlighted');
        hIdx = (hIdx - 1 + opts.length) % opts.length;
        opts[hIdx].classList.add('highlighted');
        opts[hIdx].scrollIntoView({ block: 'nearest' });
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (highlighted) {
          window.adhiraApp.selectComboProduct(idx, highlighted.dataset.id);
        }
      } else if (event.key === 'Escape') {
        window.adhiraApp.hideComboDropdown(idx);
      }
    },

    selectComboProduct: (idx, prodId) => {
      const p = db.products.find(x => x.id === prodId);
      if (!p || !draftQuote || !draftQuote.items[idx]) return;
      draftQuote.items[idx].productId = p.id;
      draftQuote.items[idx].name = p.name;
      draftQuote.items[idx].hsn = p.hsn || '3604';
      draftQuote.items[idx].packing = p.packing || '1 Pcs';
      draftQuote.items[idx].rate = p.rate;
      draftQuote.items[idx].unit = p.unit || 'BOX';
      draftQuote.items[idx].gst = p.gst || 18;
      window.adhiraApp.hideComboDropdown(idx);
      refreshQuoteItemRow(idx);
      refreshTotals();
    },

    shareWhatsApp: (docId, isInvoice) => {
      const doc = isInvoice ? db.invoices.find(i => i.id === docId) : db.quotations.find(q => q.id === docId);
      if (!doc) return;

      const title = isInvoice ? 'Tax Invoice' : 'Quotation';
      const phone = (doc.customer.phone || '').replace(/\D/g, '');
      const comp = doc.seller || db.company;

      // Step 1: Download the PDF first so user has it, then open WhatsApp
      const element = document.getElementById('printableA4Document');
      const doWhatsApp = () => {
        const text = [
          `*${comp.name || 'ADHIRA FIRE WORKS & PYROTECH'}*`,
          `${title} No: *${doc.number}*`,
          `Customer: ${doc.customer.name}`,
          `Date: ${doc.date}`,
          `Taxable Amount: ₹${formatMoney(doc.taxable || doc.subtotal)}`,
          `GST: ₹${formatMoney(doc.gstTotal)}`,
          `*Grand Total: ₹${formatMoney(doc.grandTotal)}*`,
          ``,
          `📄 PDF has been downloaded to your device. Please attach it to this chat.`,
          ``,
          `Thank you for choosing ${comp.name || 'Adhira Pyrotech Sivakasi'}! 🎆`
        ].join('\n');
        const url = phone
          ? `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`
          : `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
      };

      if (typeof html2pdf !== 'undefined') {
        showToast('Generating PDF for WhatsApp...', 'info');
        const container = document.createElement('div');
        if (doc) {
          container.innerHTML = generateA4DocumentHtml(doc, Boolean(isInvoice));
        } else if (element) {
          container.appendChild(element.cloneNode(true));
        }
        const waElement = container.firstElementChild;
        if (waElement) {
          waElement.id = 'exportWaA4Document';
          waElement.style.width = '794px';
          waElement.style.minWidth = '794px';
          waElement.style.maxWidth = '794px';
          waElement.style.boxSizing = 'border-box';
          waElement.style.margin = '0 auto';
          waElement.style.boxShadow = 'none';
          waElement.style.borderRadius = '0';
          waElement.style.transform = 'none';
          document.body.appendChild(waElement);

          const opt = {
            margin: [0, 0, 0, 0],
            filename: `${(doc.number || 'document').replace(/\//g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.97 },
            html2canvas: { scale: 2, useCORS: true, logging: false, windowWidth: 794, scrollX: 0, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['css', 'legacy'], avoid: ['tr', '.pdf-bottom-grid', '.pdf-signatures-grid', '.pdf-footer-note', '.pdf-tax-summary-table'] }
          };
          html2pdf().set(opt).from(waElement).save().then(() => {
            waElement.remove();
            showToast('PDF downloaded! Opening WhatsApp...', 'success');
            setTimeout(doWhatsApp, 400);
          }).catch(() => {
            waElement.remove();
            doWhatsApp();
          });
        } else {
          doWhatsApp();
        }
      } else {
        doWhatsApp();
      }
    },

    shareEmail: (docId, isInvoice) => {
      const doc = isInvoice ? db.invoices.find(i => i.id === docId) : db.quotations.find(q => q.id === docId);
      if (!doc) return;

      const comp = doc.seller || db.company;
      const subject = `${comp.name || 'Adhira Pyrotech Sivakasi'} - ${isInvoice ? 'Tax Invoice' : 'Quotation'} ${doc.number}`;
      const bodyText = [
        `Dear ${doc.customer.name},`,
        ``,
        `Please find the ${isInvoice ? 'Tax Invoice' : 'Quotation'} details below:`,
        ``,
        `Document No: ${doc.number}`,
        `Date: ${doc.date}`,
        `Taxable Amount: Rs. ${doc.taxable}`,
        `GST Amount: Rs. ${doc.gstTotal}`,
        `Grand Total: Rs. ${doc.grandTotal}`,
        ``,
        `The PDF document has been downloaded to your device. Please attach it to this email before sending.`,
        ``,
        `Warm regards,`,
        `${comp.name || 'ADHIRA FIRE WORKS & PYROTECH'}`,
        `${comp.city || 'Sivakasi'}, ${comp.state || 'Tamil Nadu'}`,
        comp.phone ? `Phone: ${comp.phone}` : '',
        comp.email ? `Email: ${comp.email}` : ''
      ].filter(Boolean).join('\n');

      const element = document.getElementById('printableA4Document');
      const doEmail = () => {
        const mailto = `mailto:${doc.customer.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
        window.location.href = mailto;
      };

      if (typeof html2pdf !== 'undefined') {
        showToast('Generating PDF for Email...', 'info');
        const container = document.createElement('div');
        if (doc) {
          container.innerHTML = generateA4DocumentHtml(doc, Boolean(isInvoice));
        } else if (element) {
          container.appendChild(element.cloneNode(true));
        }
        const mailElement = container.firstElementChild;
        if (mailElement) {
          mailElement.id = 'exportMailA4Document';
          mailElement.style.width = '794px';
          mailElement.style.minWidth = '794px';
          mailElement.style.maxWidth = '794px';
          mailElement.style.boxSizing = 'border-box';
          mailElement.style.margin = '0 auto';
          mailElement.style.boxShadow = 'none';
          mailElement.style.borderRadius = '0';
          mailElement.style.transform = 'none';
          document.body.appendChild(mailElement);

          const opt = {
            margin: [0, 0, 0, 0],
            filename: `${(doc.number || 'document').replace(/\//g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.97 },
            html2canvas: { scale: 2, useCORS: true, logging: false, windowWidth: 794, scrollX: 0, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['css', 'legacy'], avoid: ['tr', '.pdf-bottom-grid', '.pdf-signatures-grid', '.pdf-footer-note', '.pdf-tax-summary-table'] }
          };
          html2pdf().set(opt).from(mailElement).save().then(() => {
            mailElement.remove();
            showToast('PDF downloaded! Opening email client...', 'success');
            setTimeout(doEmail, 400);
          }).catch(() => {
            mailElement.remove();
            doEmail();
          });
        } else {
          doEmail();
        }
      } else {
        doEmail();
      }
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
        isDefault: false,
        updatedAt: new Date().toISOString()
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
      const nowIso = new Date().toISOString();
      (db.sellers || []).forEach(s => { s.isDefault = (s.id === id); s.updatedAt = nowIso; });
      const chosen = (db.sellers || []).find(s => s.id === id);
      if (chosen) {
        Object.assign(db.company, chosen, { updatedAt: nowIso });
      }
      if (draftQuote) {
        draftQuote.seller = structuredClone(chosen || db.company);
        try { localStorage.setItem(DRAFT_KEY, JSON.stringify(draftQuote)); } catch (e) { }
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

    // Quick Add Fireworks Product to Quote
    quickAddProductToQuote: (prodId) => {
      if (!draftQuote) return;
      const p = db.products.find(x => x.id === prodId);
      if (!p) return;

      const newRow = {
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
      };

      // Fill first empty row if exists, else append
      const emptyIdx = draftQuote.items.findIndex(it => !it.productId && !it.name);
      if (emptyIdx !== -1) {
        draftQuote.items[emptyIdx] = newRow;
      } else {
        draftQuote.items.push(newRow);
      }

      window.adhiraApp.hideQuickQuoteDropdown();
      renderCurrentPage();
      showToast(`Added ${p.name} (₹${p.rate}) to quotation`, 'success');
    },

    handleQuickQuoteSearch: (val) => {
      const dd = document.getElementById('quickQuoteSearchDropdown');
      const input = document.getElementById('quickQuoteSearchInput');
      if (!dd || !input) return;
      const q = (val || '').trim().toLowerCase();
      const options = dd.querySelectorAll('.combo-option');
      let visible = false;
      options.forEach(opt => {
        const name = (opt.dataset.name || '').toLowerCase();
        const show = !q || name.includes(q);
        opt.style.display = show ? '' : 'none';
        if (show) visible = true;
      });
      if (visible) {
        window.adhiraApp.positionDropdownElement(input, dd, 380, 300);
        dd.style.display = 'block';
      } else {
        dd.style.display = 'none';
      }
    },

    showQuickQuoteDropdown: () => {
      const dd = document.getElementById('quickQuoteSearchDropdown');
      const input = document.getElementById('quickQuoteSearchInput');
      if (!dd || !input) return;
      window.adhiraApp.handleQuickQuoteSearch(input.value);
    },

    hideQuickQuoteDropdown: () => {
      const dd = document.getElementById('quickQuoteSearchDropdown');
      if (dd) dd.style.display = 'none';
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
        active: true,
        updatedAt: new Date().toISOString()
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

      const nowIso = new Date().toISOString();
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
        declaration: document.getElementById('setDeclaration').value.trim(),
        updatedAt: nowIso
      });

      // Synchronously update the default seller profile so newly created quotations immediately inherit the updated details
      if (!db.sellers) db.sellers = [];
      const defaultSeller = db.sellers.find(s => s.isDefault) || db.sellers[0];
      if (defaultSeller) {
        Object.assign(defaultSeller, db.company, { updatedAt: nowIso });
      }
      if (draftQuote) {
        draftQuote.seller = structuredClone(db.company);
        try { localStorage.setItem(DRAFT_KEY, JSON.stringify(draftQuote)); } catch (e) { }
      }

      saveDatabase();
      showToast('Factory profile updated and synchronized across all forms & PDFs!', 'success');
      renderAppShell();
      renderCurrentPage();
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
    closeModal: () => closeModal(),
    getDatabase: () => db,

    // --- AUTHENTICATION & CREDENTIALS ---
    toggleLoginPwd: () => toggleLoginPwd(),
    handleLogin: () => handleLogin(),
    handleLogout: () => handleLogout(),
    openChangeCredentialsModal: () => openChangeCredentialsModal(),
    saveAdminCredentialsDirectly: () => saveAdminCredentialsDirectly(),
    toggleCredModalPwd: () => toggleCredModalPwd(),
    sendOtpForCredentials: () => saveAdminCredentialsDirectly(),
    verifyOtpAndChangeCredentials: () => saveAdminCredentialsDirectly(),

    // --- PDF MOBILE ZOOM HELPERS ---
    setPdfScale: (scale) => {
      state.zoomScale = Math.max(0.3, Math.min(2.0, scale));
      const sheet = document.getElementById('printableA4Document');
      const label = document.getElementById('zoomScaleLabel');
      if (sheet) {
        sheet.style.transform = `scale(${state.zoomScale})`;
        // Tighten container height on mobile so there is no dead blank space below sheet
        if (state.zoomScale < 1.0) {
          const naturalH = sheet.offsetHeight || 1123;
          const diff = naturalH * (1.0 - state.zoomScale);
          sheet.style.marginBottom = `-${diff}px`;
        } else {
          sheet.style.marginBottom = '0px';
        }
      }
      if (label) label.textContent = `${Math.round(state.zoomScale * 100)}%`;
    },
    fitPdfToScreen: () => {
      const isMobile = window.innerWidth <= 768;
      const fitScale = isMobile ? Math.min(1.0, Math.max(0.35, (window.innerWidth - 16) / 800)) : 1.0;
      window.adhiraApp.setPdfScale(fitScale);
    },

    // --- SIMPLE BILLING & ESTIMATE (NON-GST) METHODS ---
    openSimpleBilling: () => {
      state.simpleBillingTab = 'editor';
      navigateTo('simple-billing');
    },
    switchSimpleBillingTab: (tab) => {
      state.simpleBillingTab = tab;
      renderCurrentPage();
    },
    newSimpleBill: () => {
      initDraftSimpleBill();
      state.editingSimpleBillId = null;
      state.simpleBillingTab = 'editor';
      renderCurrentPage();
      showToast('Ready for new Simple Bill', 'info');
    },
    saveSimpleBill: () => saveCurrentSimpleBill(),
    printCurrentSimpleBill: () => printCurrentSimpleBill(),
    downloadCurrentSimpleBillPdf: () => downloadCurrentSimpleBillPdf(),
    editSimpleBill: (id) => editSimpleBillById(id),
    viewSimpleBillModal: (id) => viewSimpleBillModalById(id),
    printSimpleBillById: (id) => printSimpleBillById(id),
    downloadSimpleBillPdfById: (id) => downloadSimpleBillPdfById(id),
    deleteSimpleBill: (id) => deleteSimpleBillById(id),
    addSimpleBillItem: () => addSimpleBillItem(),
    removeSimpleBillItem: (idx) => removeSimpleBillItem(idx),
    updateSimpleBillItem: (idx, field, val) => updateSimpleBillItem(idx, field, val),
    updateSimpleBillField: (path, val) => updateSimpleBillField(path, val),
    handleSimpleBillCustomerSelect: (custId) => handleSimpleBillCustomerSelect(custId),
    handleSimpleBillFactorySelect: (selId) => handleSimpleBillFactorySelect(selId),
    openSimpleBillProductPickerModal: () => openSimpleBillProductPickerModal(),
    addSimpleBillProductFromPicker: (productId) => addSimpleBillProductFromPicker(productId),
    filterSimpleBills: (q) => {
      state.simpleBillSearch = q;
      renderCurrentPage();
    },
    filterPickerProducts: (q) => {
      const query = (q || '').toLowerCase().trim();
      const rows = document.querySelectorAll('.sb-picker-row');
      rows.forEach(r => {
        const s = r.getAttribute('data-search') || '';
        r.style.display = (!query || s.includes(query)) ? '' : 'none';
      });
    },
    setSimpleBillScale: (scale) => {
      state.simpleBillScale = Math.max(0.4, Math.min(2.0, scale));
      const wrap = document.getElementById('sbLivePreviewContainer');
      if (wrap) wrap.style.transform = `scale(${state.simpleBillScale})`;
    },
    setSbMobileTab: (tab) => setSbMobileTab(tab),
    handleDropdownProductChange: (prodId) => handleDropdownProductChange(prodId),
    updateDropdownPendingCalc: () => updateDropdownPendingCalc(),
    addCurrentDropdownItem: () => addCurrentDropdownItem(),
    autoFitSimpleBillPreview: () => autoFitSimpleBillPreview(),
    openVoiceBilling: () => {
      if (window.adhiraVoice && typeof window.adhiraVoice.openAssistant === 'function') {
        window.adhiraVoice.openAssistant();
      }
    }
  };

  // Helper to inspect database in browser console
  window.adhiraGetDb = () => db;

  // Track window scroll and resize so floating dropdown follows the input cleanly
  window.addEventListener('scroll', () => {
    const active = document.activeElement;
    if (active && active.id && active.id.startsWith('comboInput_')) {
      const idx = active.id.split('_')[1];
      const dd = document.getElementById('comboDropdown_' + idx);
      if (dd && dd.style.display !== 'none') {
        window.adhiraApp.positionDropdownElement(active, dd, 340, 280);
      }
    } else if (active && active.id === 'quickQuoteSearchInput') {
      const dd = document.getElementById('quickQuoteSearchDropdown');
      if (dd && dd.style.display !== 'none') {
        window.adhiraApp.positionDropdownElement(active, dd, 380, 300);
      }
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    const active = document.activeElement;
    if (active && active.id && active.id.startsWith('comboInput_')) {
      const idx = active.id.split('_')[1];
      const dd = document.getElementById('comboDropdown_' + idx);
      if (dd && dd.style.display !== 'none') {
        window.adhiraApp.positionDropdownElement(active, dd, 340, 280);
      }
    } else if (active && active.id === 'quickQuoteSearchInput') {
      const dd = document.getElementById('quickQuoteSearchDropdown');
      if (dd && dd.style.display !== 'none') {
        window.adhiraApp.positionDropdownElement(active, dd, 380, 300);
      }
    }
  });

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

    // Check if user is authenticated
    if (!isLoggedIn()) {
      renderLoginPage();
      return;
    }

    const sess = getSessionUser();
    if (sess) {
      currentUser.username = sess.username || 'admin';
      currentUser.name = sess.name || 'Admin';
      currentUser.role = 'Admin';
    }

    renderAppShell();

    // Initial background sync with central server
    await fetchServerInfo();
    await syncFromServer(true);

    // Start Supabase Realtime subscription for instant multi-device sync
    startSupabaseRealtime();

    // Polling fallback every 30 s (Realtime handles live updates; polling is a safety net)
    setInterval(() => {
      syncFromServer(true);
    }, 30000);

    // Auto-sync on window focus
    window.addEventListener('focus', () => {
      syncFromServer(true);
    });
  }

  // ==========================================================================
  // VOICE BILLING ASSISTANT INTEGRATION BRIDGE (Simple Bill & Quotation)
  // Web Speech API • Tamil & English • Live DB • Instant PDF & WhatsApp
  // ==========================================================================
  window.adhiraVoiceGetProducts = () => (db && db.products) || [];
  window.adhiraVoiceGetCustomers = () => (db && db.customers) || [];

  window.adhiraVoiceSaveBill = async function(type, custData, items) {
    if (!items || items.length === 0) {
      return { success: false, error: 'No items in bill' };
    }

    if (type === 'quotation') {
      initDraftQuote();
      if (!draftQuote) return { success: false, error: 'Failed to initialize draft quotation' };

      const cName = (custData.name || '').trim() || 'Counter Customer';
      let existingCust = (db.customers || []).find(c => c.name && c.name.toLowerCase() === cName.toLowerCase());
      if (!existingCust) {
        existingCust = {
          id: 'CUST-' + Date.now(),
          name: cName,
          phone: custData.phone || '',
          city: custData.city || 'Sivakasi',
          billingAddress: custData.address || '',
          state: 'Tamil Nadu',
          stateCode: '33',
          status: 'Active',
          createdAt: new Date().toISOString()
        };
        db.customers.push(existingCust);
      }

      draftQuote.customerId = existingCust.id;
      draftQuote.customer = structuredClone(existingCust);
      draftQuote.destination = custData.city || 'Sivakasi';

      draftQuote.items = (items || []).map((it, idx) => {
        const prod = (db.products || []).find(p => p.id === it.id) || {};
        return {
          id: 'row-' + (idx + 1),
          productId: it.id || '',
          name: (it.name || prod.name || 'Fireworks Item').toUpperCase(),
          hsn: prod.hsn || '3604',
          packing: prod.packing || it.packing || '1 Box',
          qty: Number(it.qty) || 1,
          unit: 'CASE',
          rate: Number(it.price) || Number(prod.rate) || 0,
          discountType: 'fixed',
          discount: 0,
          gst: 18
        };
      });

      const summary = calculateDocumentSummary(draftQuote.items, draftQuote.customer.stateCode || '33');
      const finalQuote = {
        id: 'Q-' + Date.now(),
        number: generateDocNumber('quote'),
        date: new Date().toISOString().slice(0, 10),
        validUntil: new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10),
        customerId: existingCust.id,
        customer: structuredClone(draftQuote.customer),
        seller: structuredClone(draftQuote.seller || db.company),
        deliveryNote: '',
        deliveryNoteDate: '',
        supplierRef: '',
        otherReferences: '',
        poNumber: '',
        poDate: '',
        despatchDocNo: '',
        paymentTerms: 'Advance',
        deliveryTerms: 'Ex-Factory Sivakasi',
        dispatchThrough: '',
        destination: custData.city || 'Sivakasi',
        billOfLadingNo: '',
        motorVehicleNo: '',
        termsOfDelivery: 'Ex-Factory Sivakasi',
        salesPerson: (currentUser && currentUser.name) ? currentUser.name : 'Admin',
        items: structuredClone(draftQuote.items),
        subtotal: summary.subtotal,
        discountTotal: summary.totalDiscount,
        taxable: summary.taxableAmount,
        gstTotal: summary.totalGst,
        cgst: summary.cgst,
        sgst: summary.sgst,
        igst: summary.igst,
        roundOff: summary.roundOff,
        grandTotal: summary.grandTotal,
        notes: 'Created via Adhira Voice Assistant',
        status: 'Issued',
        timeline: [
          { status: 'Issued', time: new Date().toISOString(), user: `${(currentUser && currentUser.name) || 'Admin'} (Voice Assistant)` }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      incrementDocNumber('quote');
      db.quotations.push(finalQuote);
      saveDatabase();
      localStorage.removeItem(DRAFT_KEY);
      draftQuote = null;
      renderAppShell();
      return {
        success: true,
        type: 'quotation',
        bill: finalQuote,
        id: finalQuote.id,
        number: finalQuote.number
      };
    } else {
      // Default: Simple Bill / Non-GST Estimate
      initDraftSimpleBill();
      if (!draftSimpleBill) return { success: false, error: 'Failed to initialize Simple Bill' };

      draftSimpleBill.customer.name = custData.name || 'Counter Customer';
      draftSimpleBill.customer.phone = custData.phone || '';
      draftSimpleBill.customer.cityPin = custData.city || 'Sivakasi';
      draftSimpleBill.customer.addressLine1 = custData.address || '';

      draftSimpleBill.items = (items || []).map((it, idx) => {
        const qty = Number(it.qty) || 1;
        const rate = Number(it.price) || 0;
        return {
          id: 'SBITM-' + Date.now() + Math.random().toString(36).substring(2, 5),
          sno: idx + 1,
          particulars: (it.name || 'FIREWORKS ITEM').toUpperCase(),
          cases: 1,
          contents: qty,
          qty: qty,
          rate: rate,
          ratePer: '1 BOX',
          amount: round2(qty * rate)
        };
      });

      saveCurrentSimpleBill();

      return {
        success: true,
        type: 'simple',
        bill: draftSimpleBill,
        id: draftSimpleBill.id,
        number: draftSimpleBill.number
      };
    }
  };

  window.adhiraVoiceViewBill = function(id) {
    if (!id) return;
    if (typeof id === 'string' && id.startsWith('SB-')) {
      viewSimpleBillModalById(id);
    } else if (typeof id === 'string' && id.startsWith('Q-')) {
      const q = (db.quotations || []).find(x => x.id === id);
      if (q) openPdfPreviewModal(q, false);
    } else {
      const sb = (db.simpleBills || []).find(x => x.id === id);
      if (sb) {
        viewSimpleBillModalById(id);
      } else {
        const q = (db.quotations || []).find(x => x.id === id);
        if (q) openPdfPreviewModal(q, false);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', bootApp);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    bootApp();
  }
})();
