/**
 * ADHIRA PYROTECH — VOICE BILL ASSISTANT (Web Speech API)
 * Tamil (ta-IN) & English (en-IN) Speech Recognition & Synthesis
 * Wake word "Hey Adhira" / "அதிரா"
 * 100% Free & Unlimited — Client-side browser native
 * Integrates with Simple Billing & Quotation Billing
 */
(function() {
  'use strict';

  let vbsRecognition = null;
  let wakeRecognition = null;
  let wakeActive = false;
  let vbsLang = 'en-IN';
  let vbsBillMode = 'simple'; // 'simple' or 'quotation'
  let vbsState = 'idle'; // 'idle', 'listening', 'confirm', 'saving'

  let vbsSession = {
    cust_name: '',
    cust_phone: '',
    cust_addr: '',
    cust_city: '',
    bill_mode: 'simple',
    items: []
  };

  const vbsPrompts = {
    ta: {
      welcome: 'வணக்கம்! அதிரா வாய்ஸ் பில் அசிஸ்டண்ட் தயார். கஸ்டமர் பெயர், பட்டாசு மற்றும் பில் விவரங்களை சொல்லுங்க.',
      saved: 'சிம்பிள் பில் வெற்றிகரமாக சேமிக்கப்பட்டது! PDF மற்றும் வாட்ஸ்அப் தயாராக உள்ளது.',
      cancel: 'பில் ரத்து செய்யப்பட்டது. மீண்டும் பேச Hey Adhira சொல்லுங்க.',
      not_found: 'பொருள் அடையாளம் காண முடியவில்லை. மீண்டும் சொல்லுங்க.',
      ask_more: 'மேலும் பொருட்கள் சேர்க்க வேண்டுமா? பில் சேமிக்க save அல்லது confirm சொல்லுங்க.'
    },
    en: {
      welcome: 'Hello! Adhira Voice Bill Assistant is ready. Please tell the customer name, cracker items, quantities and rates.',
      saved: 'Simple Bill saved successfully! Opening preview and WhatsApp.',
      cancel: 'Bill creation cancelled. Say "Hey Adhira" to start again.',
      not_found: 'Could not match fireworks product. Please speak clearly.',
      ask_more: 'Would you like to add more items, or should I save this bill? Say save to complete.'
    }
  };

  function vbsT(key) {
    const lang = vbsLang === 'ta-IN' ? 'ta' : 'en';
    return (vbsPrompts[lang] && vbsPrompts[lang][key]) || vbsPrompts.en[key] || key;
  }

  // Two-tone Web Audio Chime
  function vbsPlayChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  }

  // Text-to-Speech
  function vbsSpeak(text, onEnd) {
    if (!window.speechSynthesis) { if (onEnd) onEnd(); return; }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = vbsLang;
      u.rate = 0.95;
      u.pitch = 1.02;
      const voices = window.speechSynthesis.getVoices();
      const match = voices.find(v => v.lang === vbsLang) ||
                    voices.find(v => v.lang.startsWith(vbsLang.slice(0, 2))) ||
                    voices.find(v => v.lang.includes('IN'));
      if (match) u.voice = match;
      u.onend = () => { if (onEnd) onEnd(); };
      u.onerror = () => { if (onEnd) onEnd(); };
      window.speechSynthesis.speak(u);
      vbsAddMessage('bot', text);
    } catch (e) {
      if (onEnd) onEnd();
    }
  }

  // Number parser
  function vbsParseNumber(s) {
    if (!s) return NaN;
    s = String(s).toLowerCase().trim();
    const tamilNums = {
      'ஒன்று': 1, 'ஒரு': 1, 'இரண்டு': 2, 'ரெண்டு': 2, 'மூன்று': 3, 'மூணு': 3,
      'நான்கு': 4, 'நாலு': 4, 'ஐந்து': 5, 'அஞ்சு': 5, 'ஆறு': 6, 'ஏழு': 7,
      'எட்டு': 8, 'ஒன்பது': 9, 'பத்து': 10, 'இருபது': 20, 'முப்பது': 30,
      'நாற்பது': 40, 'ஐம்பது': 50, 'அறுபது': 60, 'எழுபது': 70, 'எண்பது': 80,
      'தொண்ணூறு': 90, 'நூறு': 100, 'இருநூறு': 200, 'முந்நூறு': 300, 'ஐந்நூறு': 500,
      'ஆயிரம்': 1000
    };
    for (const [w, n] of Object.entries(tamilNums)) if (s.includes(w)) return n;

    const engNums = {
      'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
      'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10, 'eleven': 11,
      'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15, 'sixteen': 16,
      'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20, 'thirty': 30,
      'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70, 'eighty': 80,
      'ninety': 90, 'hundred': 100, 'thousand': 1000
    };
    for (const [w, n] of Object.entries(engNums)) if (s.includes(w)) return n;

    const digits = s.replace(/[^\d.]/g, '');
    return digits ? parseFloat(digits) : NaN;
  }

  // Product Matching against db.products
  function vbsCleanWord(str) {
    return (str || '').toLowerCase()
      .replace(/[^a-z0-9\u0B80-\u0BFF\s]/gi, ' ')
      .replace(/\b(crackers?|pattasu|வெடி|பட்டாசு|box|boxes|pkt|pkts|packet|packets|case|cases)\b/gi, '')
      .trim();
  }

  function vbsFindProduct(spoken) {
    if (!spoken) return null;
    const cleanSpoken = vbsCleanWord(spoken);
    if (!cleanSpoken || cleanSpoken.length < 2) return null;

    const prods = (window.adhiraVoiceGetProducts ? window.adhiraVoiceGetProducts() : []) || [];
    if (!prods.length) return null;

    // 1. Exact clean match
    let exact = prods.find(p => vbsCleanWord(p.name) === cleanSpoken);
    if (exact) return exact;

    // 2. Contains match
    let contains = prods.find(p => {
      const c = vbsCleanWord(p.name);
      return c.includes(cleanSpoken) || cleanSpoken.includes(c);
    });
    if (contains) return contains;

    // 3. Token overlap match
    const spokenTokens = cleanSpoken.split(/\s+/).filter(t => t.length > 1);
    let best = null, bestScore = 0;
    for (const p of prods) {
      const pTokens = vbsCleanWord(p.name).split(/\s+/).filter(t => t.length > 1);
      let score = 0;
      for (const st of spokenTokens) {
        if (pTokens.some(pt => pt.includes(st) || st.includes(pt))) score += 2;
      }
      const snMatch = cleanSpoken.match(/\b\d+\b/g) || [];
      const pnMatch = (p.name || '').match(/\b\d+\b/g) || [];
      for (const sn of snMatch) {
        if (pnMatch.includes(sn)) score += 3;
      }
      if (score > bestScore) {
        bestScore = score;
        best = p;
      }
    }
    if (bestScore >= 2) return best;
    return null;
  }

  // Natural language speech parser
  function vbsParseNaturalSpeech(transcript, alts = []) {
    const fullText = [transcript, ...alts].join(' ');
    const text = transcript.trim();
    const lower = text.toLowerCase();
    let extracted = {
      hasData: false,
      name: null,
      phone: null,
      city: null,
      billMode: null,
      products: []
    };

    if (/[\u0B80-\u0BFF]/.test(fullText) || /வணக்கம்|பட்டாசு|ரூபாய்|விலை|கஸ்டமர்|சிவகாசி/.test(lower)) {
      vbsLang = 'ta-IN';
      const langBtn = document.getElementById('avpLangBtn');
      if (langBtn) langBtn.innerText = '🇮🇳 தமிழ்';
    }

    if (/simple bill|estimate|சிம்பிள் பில்|எஸ்டிமேட்/i.test(fullText)) {
      extracted.billMode = 'simple';
    } else if (/quotation|quote|கொட்டேஷன்/i.test(fullText)) {
      extracted.billMode = 'quotation';
    }

    const phoneMatch = fullText.replace(/[\s-]/g, '').match(/[6-9]\d{9}/);
    if (phoneMatch) {
      extracted.phone = phoneMatch[0];
      extracted.hasData = true;
    }

    const cities = [
      'sivakasi', 'madurai', 'chennai', 'coimbatore', 'tirunelveli', 'virudhunagar',
      'rajapalayam', 'sattur', 'trichy', 'salem', 'erode', 'tiruppur', 'dindigul',
      'theni', 'nagercoil', 'thanjavur', 'vellore', 'tuticorin', 'thoothukudi',
      'சிவகாசி', 'மதுரை', 'சென்னை', 'விருதுநகர்', 'ராஜபாளையம்', 'சாத்தூர்'
    ];
    for (const c of cities) {
      if (lower.includes(c.toLowerCase())) {
        extracted.city = c.charAt(0).toUpperCase() + c.slice(1);
        extracted.hasData = true;
        break;
      }
    }

    const namePatterns = [
      /(?:customer|name|bill for|party|buyer|company|வாடிக்கையாளர்|பெயர்|கஸ்டமர்)\s*[:\s-]+\s*([a-zA-Z\u0B80-\u0BFF\s]{2,25}?)(?=\s+(?:phone|mobile|cell|city|at|rate|price|ரூபாய்|போன்|\d)|$)/i,
      /^(?:create\s+bill\s+for|bill\s+for|to)\s+([a-zA-Z\u0B80-\u0BFF\s]{2,20})/i
    ];
    for (const np of namePatterns) {
      const m = fullText.match(np);
      if (m && m[1]) {
        const rawName = m[1].replace(/^(for|is|mr|mrs|shree|sri)\s+/i, '').trim();
        if (rawName && rawName.length >= 2 && !cities.includes(rawName.toLowerCase())) {
          extracted.name = rawName.replace(/\b\w/g, c => c.toUpperCase());
          extracted.hasData = true;
          break;
        }
      }
    }

    const clauses = fullText.split(/[,;\n]|\band\b|\bnext\b|\balso\b|\bமற்றும்\b|\bஅடுத்து\b/i);
    for (const clause of clauses) {
      const trimmed = clause.trim();
      if (!trimmed) continue;

      const itemMatch = trimmed.match(/(\d+|ஒன்று|இரண்டு|மூன்று|நான்கு|ஐந்து|பத்து|one|two|three|four|five|ten)\s+([a-zA-Z\u0B80-\u0BFF0-9\s"'\/-]+?)(?:\s*(?:rate|at|price|rs|rupees|விலை|ரூபாய்|ரேட்|க்கு)\s*(?:rs\.?|₹)?(\d+(?:\.\d+)?|\bwebsite\b|\bcatalog\b))?$/i);

      let qty = 1;
      let candidateName = '';
      let explicitPrice = null;

      if (itemMatch) {
        qty = vbsParseNumber(itemMatch[1]) || 1;
        candidateName = itemMatch[2].trim();
        if (itemMatch[3] && !/website|catalog/i.test(itemMatch[3])) {
          explicitPrice = parseFloat(itemMatch[3]);
        }
      } else {
        candidateName = trimmed.replace(/\b(rate|at|price|rs|rupees|விலை|ரூபாய்|ரேட்)\s*\d+/gi, '').trim();
        const rateSub = trimmed.match(/(?:rate|at|price|rs|rupees|விலை|ரூபாய்|ரேட்)\s*(?:rs\.?|₹)?(\d+(?:\.\d+)?)/i);
        if (rateSub) explicitPrice = parseFloat(rateSub[1]);
      }

      const foundProd = vbsFindProduct(candidateName);
      if (foundProd) {
        let catalogRate = parseFloat(foundProd.rate || foundProd.price || 0) || 0;
        let finalPrice = (explicitPrice !== null && !isNaN(explicitPrice) && explicitPrice > 0) ? explicitPrice : catalogRate;
        let isOverride = (explicitPrice !== null && !isNaN(explicitPrice) && explicitPrice > 0 && explicitPrice !== catalogRate);

        extracted.products.push({
          id: foundProd.id,
          name: foundProd.name,
          qty: Math.max(1, Math.round(qty)),
          price: finalPrice,
          catalogRate: catalogRate,
          isOverride: isOverride,
          packing: foundProd.packing || '1 Box',
          pieces: foundProd.pieces || 16,
          lineTotal: finalPrice * Math.max(1, Math.round(qty))
        });
        extracted.hasData = true;
      }
    }

    return extracted;
  }

  // UI Helpers
  function vbsAddMessage(who, text) {
    const log = document.getElementById('avpChatLog');
    if (!log) return;
    const div = document.createElement('div');
    div.className = 'avp-msg avp-msg-' + who;
    div.innerHTML = (who === 'bot' ? '🤖 ' : '🎤 ') + `<span>${text}</span>`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  function vbsSetStatus(text, pulse = false) {
    const el = document.getElementById('avpStatus');
    if (!el) return;
    el.textContent = text;
    el.className = 'avp-status' + (pulse ? ' avp-pulse' : '');
  }

  function vbsShowPanel(show) {
    const p = document.getElementById('avpPanel');
    if (p) p.style.display = show ? 'flex' : 'none';
    const fab = document.getElementById('avpFab');
    if (fab) {
      if (show) fab.classList.add('avp-active');
      else fab.classList.remove('avp-active');
    }
  }

  function vbsToggleLang() {
    vbsLang = (vbsLang === 'ta-IN') ? 'en-IN' : 'ta-IN';
    const btn = document.getElementById('avpLangBtn');
    if (btn) btn.innerText = (vbsLang === 'ta-IN') ? '🇮🇳 தமிழ்' : '🇬🇧 English';
  }

  function vbsToggleBillMode(mode) {
    if (mode) vbsBillMode = mode;
    else vbsBillMode = (vbsBillMode === 'simple') ? 'quotation' : 'simple';
    vbsSession.bill_mode = vbsBillMode;
    const btn = document.getElementById('avpModeBtn');
    if (btn) {
      btn.innerText = (vbsBillMode === 'simple') ? '📄 Simple Bill' : '📋 Quotation';
    }
    vbsRenderSummary();
  }

  function vbsRenderSummary() {
    const el = document.getElementById('avpSummaryBox');
    if (!el) return;
    const s = vbsSession;
    const items = s.items || [];
    const totalAmount = items.reduce((sum, it) => sum + (it.price * it.qty), 0);
    const totalQty = items.reduce((sum, it) => sum + it.qty, 0);

    let itemsHtml = '';
    if (items.length === 0) {
      itemsHtml = '<div class="avp-empty">No items added yet. Say cracker name, count and rate.</div>';
    } else {
      itemsHtml = items.map((it, idx) => `
        <div class="avp-item-row">
          <div class="avp-item-info">
            <span class="avp-num">${idx + 1}.</span>
            <strong class="avp-name">${it.name}</strong>
            ${it.isOverride ? '<span class="avp-tag-admin">Admin Rate</span>' : '<span class="avp-tag-cat">Master Rate</span>'}
          </div>
          <div class="avp-item-controls">
            <div class="avp-qty-box">
              <button type="button" onclick="window.adhiraVoice.adjustQty(${idx}, -1)">−</button>
              <span>${it.qty}</span>
              <button type="button" onclick="window.adhiraVoice.adjustQty(${idx}, 1)">+</button>
            </div>
            <div class="avp-rate-box">
              @ ₹<input type="number" value="${it.price}" min="0" step="1" onchange="window.adhiraVoice.updatePrice(${idx}, this.value)">
            </div>
            <div class="avp-item-total">₹${(it.price * it.qty).toFixed(2)}</div>
            <button type="button" class="avp-del" onclick="window.adhiraVoice.removeItem(${idx})">✕</button>
          </div>
        </div>
      `).join('');
    }

    el.innerHTML = `
      <div class="avp-card">
        <div class="avp-meta-box">
          <div class="avp-meta-line">
            <span>👤 <strong>${s.cust_name || 'Counter Customer'}</strong></span>
            <span>📞 ${s.cust_phone || '—'}</span>
          </div>
          <div class="avp-meta-line" style="font-size:11px;color:#94a3b8;margin-top:2px;">
            <span>📍 ${s.cust_city || 'Sivakasi'}</span>
            <span>Mode: <strong>${s.bill_mode === 'simple' ? 'Simple Estimate' : 'GST Quotation'}</strong></span>
          </div>
        </div>

        <div class="avp-items-box">${itemsHtml}</div>

        <div class="avp-total-bar">
          <span>Items: <strong>${items.length}</strong> (${totalQty} pcs)</span>
          <span class="avp-grand-total">Total: <strong>₹${totalAmount.toFixed(2)}</strong></span>
        </div>

        ${items.length > 0 ? `
          <div class="avp-btn-row">
            <button type="button" class="avp-save-btn" onclick="window.adhiraVoice.saveBill()">
              💾 Save & Create Bill (Enter)
            </button>
            <button type="button" class="avp-wa-btn" onclick="window.adhiraVoice.shareWhatsApp()">
              📲 WhatsApp
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Main listener
  function vbsStartListening() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      vbsSetStatus('❌ Speech recognition not supported in this browser. Use Google Chrome.');
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (vbsRecognition) { try { vbsRecognition.stop(); } catch (e) {} }

    vbsRecognition = new SR();
    vbsRecognition.lang = vbsLang;
    vbsRecognition.continuous = false;
    vbsRecognition.interimResults = false;
    vbsRecognition.maxAlternatives = 3;

    vbsSetStatus('🎤 Listening… Speak bill details or products', true);
    const micBtn = document.getElementById('avpMicBtn');
    if (micBtn) micBtn.classList.add('active');

    vbsRecognition.onresult = (ev) => {
      const results = Array.from(ev.results[ev.results.length - 1]).map(r => r.transcript);
      const transcript = results[0] || '';
      vbsAddMessage('user', transcript);
      if (micBtn) micBtn.classList.remove('active');
      vbsSetStatus('⏳ Processing speech…');
      vbsHandleInput(transcript, results);
    };

    vbsRecognition.onerror = (ev) => {
      if (micBtn) micBtn.classList.remove('active');
      vbsSetStatus('⚠️ ' + (ev.error === 'not-allowed' ? 'Microphone permission denied.' : 'Tap mic to retry.'));
    };

    vbsRecognition.onend = () => {
      if (micBtn) micBtn.classList.remove('active');
      if (vbsState !== 'saving') vbsSetStatus('Tap 🎤 to speak more or click Save');
    };

    try { vbsRecognition.start(); } catch (e) {}
  }

  function vbsHandleInput(transcript, alts = []) {
    const tLower = (transcript || '').toLowerCase().trim();

    if (/^(cancel|ரத்து|stop|quit)$/i.test(tLower)) {
      vbsCloseAssistant();
      vbsSpeak(vbsT('cancel'));
      return;
    }

    if (/^(save|confirm|done|முடிந்தது|சேமி|ஆம்|சரி|yes)$/i.test(tLower)) {
      if ((vbsSession.items || []).length > 0) {
        vbsSaveBill();
        return;
      }
    }

    const parsed = vbsParseNaturalSpeech(transcript, alts);

    if (parsed.hasData) {
      if (parsed.name) vbsSession.cust_name = parsed.name;
      if (parsed.phone) vbsSession.cust_phone = parsed.phone;
      if (parsed.city) vbsSession.cust_city = parsed.city;
      if (parsed.billMode) vbsToggleBillMode(parsed.billMode);

      if (parsed.products && parsed.products.length > 0) {
        vbsSession.items = vbsSession.items || [];
        for (const p of parsed.products) {
          const existing = vbsSession.items.find(i => i.id === p.id);
          if (existing) {
            existing.qty += p.qty;
            if (p.isOverride) existing.price = p.price;
            existing.lineTotal = existing.qty * existing.price;
          } else {
            vbsSession.items.push(p);
          }
        }
      }

      vbsRenderSummary();

      const total = (vbsSession.items || []).reduce((s, it) => s + (it.price * it.qty), 0);
      let feedback = '';
      if (parsed.products.length > 0) {
        const pNames = parsed.products.map(p => `${p.qty} ${p.name}`).join(', ');
        feedback = (vbsLang === 'ta-IN') ?
          `${pNames} சேர்க்கப்பட்டது. மொத்தம் ₹${total.toFixed(0)}. பில் சேமிக்கவா?` :
          `Added ${pNames}. Total ₹${total.toFixed(0)}. Should I save this bill?`;
      } else if (parsed.name) {
        feedback = (vbsLang === 'ta-IN') ?
          `வாடிக்கையாளர் ${vbsSession.cust_name} பதிவு செய்யப்பட்டது. பட்டாசு பொருட்களை சொல்லுங்க.` :
          `Got customer ${vbsSession.cust_name}. Now please tell the products.`;
      }

      vbsState = 'confirm';
      vbsSpeak(feedback || vbsT('ask_more'), () => {
        setTimeout(() => {
          if (vbsState !== 'saving') vbsStartListening();
        }, 300);
      });
      return;
    }

    const fallbackProd = vbsFindProduct(transcript);
    if (fallbackProd) {
      const price = parseFloat(fallbackProd.rate || 0);
      vbsSession.items = vbsSession.items || [];
      vbsSession.items.push({
        id: fallbackProd.id,
        name: fallbackProd.name,
        qty: 1,
        price: price,
        catalogRate: price,
        isOverride: false,
        lineTotal: price
      });
      vbsRenderSummary();
      vbsSpeak(`${fallbackProd.name} added. Any more items?`, () => vbsStartListening());
      return;
    }

    vbsSpeak(vbsT('not_found'), () => vbsStartListening());
  }

  // Save bill into billing software
  async function vbsSaveBill() {
    if ((vbsSession.items || []).length === 0) {
      vbsSpeak('Please add at least one product before saving.');
      return;
    }

    vbsState = 'saving';
    vbsSetStatus('💾 Saving bill to Database…', true);

    const s = vbsSession;
    if (typeof window.adhiraVoiceSaveBill === 'function') {
      try {
        const res = await window.adhiraVoiceSaveBill(
          s.bill_mode || 'simple',
          {
            name: s.cust_name || 'Counter Customer',
            phone: s.cust_phone || '',
            city: s.cust_city || 'Sivakasi',
            address: s.cust_addr || ''
          },
          s.items
        );

        if (res && res.success) {
          vbsSetStatus('✅ Bill saved in Database!');
          if (typeof confetti === 'function') confetti({ particleCount: 70, spread: 60 });
          vbsSpeak(vbsT('saved'));
          vbsAddMessage('bot', `✅ Bill #${res.number || ''} saved successfully! Amount: ₹${(res.bill?.netAmount || 0).toFixed(2)}`);

          // Open preview modal
          if (typeof window.adhiraVoiceViewBill === 'function' && res.id) {
            setTimeout(() => {
              window.adhiraVoiceViewBill(res.id);
            }, 800);
          }

          // WhatsApp dispatch
          if (s.cust_phone && s.cust_phone.replace(/\D/g, '').length >= 10) {
            setTimeout(() => {
              vbsQuickWhatsApp();
            }, 1400);
          }

          setTimeout(() => {
            vbsCloseAssistant();
          }, 3500);
          return;
        }
      } catch (err) {
        console.error('vbsSaveBill error:', err);
      }
    }

    vbsSetStatus('❌ Could not save. Tap mic or click Save again.');
    vbsState = 'confirm';
  }

  function vbsQuickWhatsApp() {
    const s = vbsSession;
    const phone = s.cust_phone || '';
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const items = s.items || [];
    const subtotal = items.reduce((sum, it) => sum + (it.price * it.qty), 0);
    const itemsList = items.map((it, i) => `${i + 1}. ${it.name} × ${it.qty} = Rs.${(it.price * it.qty).toFixed(2)}`).join('\n');

    const msg =
`🎆 *ADHIRA PYROTECH — ESTIMATE BILL* 🎆
--------------------------------------
*Customer:* ${s.cust_name || 'Valued Customer'}
*Phone:* ${phone || '—'}
*City:* ${s.cust_city || 'Sivakasi'}
*Date:* ${new Date().toLocaleDateString('en-IN')}
--------------------------------------
*FIREWORKS ITEMS:*
${itemsList || 'Fireworks package'}
--------------------------------------
*TOTAL AMOUNT: Rs.${subtotal.toFixed(2)}*
--------------------------------------
Thank you for choosing Adhira Pyrotech! 💥`;

    const url = cleanPhone ?
      `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}` :
      `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  // Wake Listener ("Hey Adhira")
  function vbsStartWakeListener() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    if (wakeActive) return;

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    try {
      wakeRecognition = new SR();
      wakeRecognition.lang = 'ta-IN';
      wakeRecognition.continuous = true;
      wakeRecognition.interimResults = true;
      wakeRecognition.maxAlternatives = 2;

      wakeRecognition.onresult = (ev) => {
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const said = (ev.results[i][0].transcript || '').toLowerCase().trim();
          if (
            said.includes('hey adhira') ||
            said.includes('adhira') ||
            said.includes('hey adira') ||
            said.includes('hey athira') ||
            said.includes('அதிரா') ||
            said.includes('ஹே அதிரா') ||
            said.includes('adhira pattasu') ||
            said.includes('simple bill')
          ) {
            try { wakeRecognition.stop(); } catch (e) {}
            wakeActive = false;
            vbsPlayChime();
            vbsOpenAssistant();
            break;
          }
        }
      };

      wakeRecognition.onend = () => {
        wakeActive = false;
        if (vbsState === 'idle') setTimeout(() => vbsStartWakeListener(), 1200);
      };

      wakeRecognition.onerror = (ev) => {
        wakeActive = false;
        if (vbsState === 'idle' && ev.error !== 'not-allowed') {
          setTimeout(() => vbsStartWakeListener(), 3000);
        }
      };

      wakeRecognition.start();
      wakeActive = true;
    } catch (e) {
      wakeActive = false;
    }
  }

  function vbsOpenAssistant() {
    try { if (wakeRecognition) wakeRecognition.stop(); } catch (e) {}
    wakeActive = false;

    vbsSession = {
      cust_name: '',
      cust_phone: '',
      cust_addr: '',
      cust_city: '',
      bill_mode: vbsBillMode || 'simple',
      items: []
    };

    vbsState = 'listening';
    vbsShowPanel(true);
    const log = document.getElementById('avpChatLog');
    if (log) log.innerHTML = '';
    vbsRenderSummary();

    vbsSetStatus('🎤 Listening for speech…', true);
    vbsSpeak(vbsT('welcome'), () => {
      vbsStartListening();
    });
  }

  function vbsCloseAssistant() {
    try { if (vbsRecognition) vbsRecognition.stop(); } catch (e) {}
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    vbsState = 'idle';
    vbsShowPanel(false);
    setTimeout(() => vbsStartWakeListener(), 1500);
  }

  // Inject UI on load
  function injectVoiceUi() {
    if (document.getElementById('avpPanel')) return;

    const html = `
      <button id="avpFab" onclick="window.adhiraVoice.openAssistant()" title="Voice Bill Assistant — Say 'Hey Adhira'">
        🎤
      </button>
      <div id="avpFabLabel">SAY HEY ADHIRA</div>

      <div id="avpPanel">
        <div class="avp-header">
          <div class="avp-avatar">🤖</div>
          <div class="avp-title">
            <h4>Adhira Voice Assistant</h4>
            <span>Tamil & English • Real-time DB • Simple Bill</span>
          </div>
          <div class="avp-actions">
            <button id="avpLangBtn" class="avp-pill" onclick="window.adhiraVoice.toggleLang()">🇬🇧 English</button>
            <button id="avpModeBtn" class="avp-pill avp-pill-gold" onclick="window.adhiraVoice.toggleMode()">📄 Simple Bill</button>
            <button class="avp-close" onclick="window.adhiraVoice.closeAssistant()">✕</button>
          </div>
        </div>

        <div class="avp-status" id="avpStatus">Say "Hey Adhira" or tap 🎤 to create a bill</div>
        <div id="avpChatLog"></div>
        <div id="avpSummaryBox"></div>

        <div class="avp-controls">
          <button id="avpMicBtn" onclick="window.adhiraVoice.startListening()">
            <i class="fa-solid fa-microphone"></i> Tap to Speak
          </button>
          <button id="avpTypeBtn" onclick="window.adhiraVoice.toggleType()">⌨️ Type</button>
        </div>

        <div id="avpTypeRow">
          <input type="text" id="avpTypeInp" placeholder="e.g. Ramesh Sivakasi 9842100000 10 28 chorsa rate 120 5 kuruvi…" onkeydown="if(event.key==='Enter')window.adhiraVoice.sendType()">
          <button onclick="window.adhiraVoice.sendType()">Send</button>
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.id = 'adhiraVoiceContainer';
    div.innerHTML = html;
    document.body.appendChild(div);

    // Auto-start wake listener
    setTimeout(() => vbsStartWakeListener(), 3000);
    document.addEventListener('click', () => {
      if (!wakeActive && vbsState === 'idle') vbsStartWakeListener();
    }, { once: true });
  }

  // Public API
  window.adhiraVoice = {
    openAssistant: vbsOpenAssistant,
    closeAssistant: vbsCloseAssistant,
    startListening: vbsStartListening,
    toggleLang: vbsToggleLang,
    toggleMode: () => vbsToggleBillMode(),
    saveBill: vbsSaveBill,
    shareWhatsApp: vbsQuickWhatsApp,
    adjustQty: (idx, delta) => {
      if (vbsSession.items && vbsSession.items[idx]) {
        vbsSession.items[idx].qty = Math.max(1, vbsSession.items[idx].qty + delta);
        vbsSession.items[idx].lineTotal = vbsSession.items[idx].qty * vbsSession.items[idx].price;
        vbsRenderSummary();
      }
    },
    updatePrice: (idx, val) => {
      const num = parseFloat(val);
      if (!isNaN(num) && num >= 0 && vbsSession.items[idx]) {
        vbsSession.items[idx].price = num;
        vbsSession.items[idx].isOverride = true;
        vbsSession.items[idx].lineTotal = vbsSession.items[idx].qty * num;
        vbsRenderSummary();
      }
    },
    removeItem: (idx) => {
      if (vbsSession.items) {
        vbsSession.items.splice(idx, 1);
        vbsRenderSummary();
      }
    },
    toggleType: () => {
      const row = document.getElementById('avpTypeRow');
      if (row) {
        row.classList.toggle('show');
        if (row.classList.contains('show')) document.getElementById('avpTypeInp')?.focus();
      }
    },
    sendType: () => {
      const inp = document.getElementById('avpTypeInp');
      if (!inp) return;
      const val = inp.value.trim();
      if (!val) return;
      inp.value = '';
      vbsAddMessage('user', val);
      vbsHandleInput(val, [val]);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectVoiceUi);
  } else {
    injectVoiceUi();
  }
})();
