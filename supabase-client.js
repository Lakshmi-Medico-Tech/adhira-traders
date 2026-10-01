/**
 * ATHIRA CRACKERS / ADHIRA PYROTECH
 * Supabase Client & Universal API Bridge - v2.5
 * Ready for Cloudflare Pages + Supabase Cloud PostgreSQL Hosting
 *
 * Project URL: https://ucbxdisznepjproeylos.supabase.co
 * Public Anon Key: sb_publishable_zmSNWU5n5vDmggSj32C44g_-GbubGeo
 */
(function(window) {
  'use strict';

  var SUPABASE_URL = 'https://ucbxdisznepjproeylos.supabase.co';
  var SUPABASE_ANON_KEY = 'sb_publishable_zmSNWU5n5vDmggSj32C44g_-GbubGeo';

  var _supabase = null;
  function getClient() {
    if (!_supabase) {
      if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
        _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      } else {
        console.warn('[SupabaseAPI] @supabase/supabase-js CDN library not loaded yet!');
        return null;
      }
    }
    return _supabase;
  }

  // ── DETECTION ─────────────────────────────────────────────
  // Detect if running on Cloudflare Pages, static hosting, or explicit Supabase mode
  function isSupabaseMode() {
    var host = window.location.hostname || '';
    var search = window.location.search || '';
    if (search.indexOf('backend=php') !== -1) return false;
    if (search.indexOf('backend=supabase') !== -1) return true;
    if (host.indexOf('pages.dev') !== -1 || host.indexOf('workers.dev') !== -1 || host.indexOf('cloudflare') !== -1) return true;
    // If not running on local Node server and not explicitly accessing PHP backend
    var isNode = (window.location.port === '4000') && (search.indexOf('backend=php') === -1);
    if (isNode && search.indexOf('backend=supabase') === -1) return false;
    // Default to true for static / Cloudflare deployments
    return true;
  }

  // ── AUTH ──────────────────────────────────────────────────
  async function login(username, password) {
    var sb = getClient();
    var storedUser = 'admin';
    var storedPass = 'admin';

    if (sb) {
      try {
        var { data: rows, error } = await sb.from('settings').select('setting_key, setting_value');
        if (!error && rows) {
          var sm = {};
          rows.forEach(function(r) { sm[r.setting_key] = r.setting_value; });
          if (sm.admin_username) storedUser = sm.admin_username;
          if (sm.admin_password) storedPass = sm.admin_password;
        }
      } catch (e) {
        console.warn('[SupabaseAPI] Auth using default settings fallback:', e.message);
      }
    }

    if (username === storedUser && password === storedPass) {
      var token = 'spb_' + Date.now() + '_' + Math.random().toString(36).substr(2);
      return { success: true, token: token, username: username };
    }
    return { success: false, error: 'Invalid username or password' };
  }

  async function changePassword(currentPass, newPass, newUser) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Supabase client not initialized' };

    try {
      var { data: rows } = await sb.from('settings').select('setting_key,setting_value').in('setting_key', ['admin_password', 'admin_username']);
      var sm = {};
      if (rows) rows.forEach(function(r) { sm[r.setting_key] = r.setting_value; });
      var expectedPass = sm.admin_password || 'admin';

      if (currentPass !== expectedPass) {
        return { success: false, error: 'Current password is incorrect. Verification failed.' };
      }
      if (!newPass || newPass.length < 3) {
        return { success: false, error: 'New password must be at least 3 characters long.' };
      }

      await sb.from('settings').upsert([{ setting_key: 'admin_password', setting_value: newPass }], { onConflict: 'setting_key' });
      if (newUser && newUser.trim()) {
        await sb.from('settings').upsert([{ setting_key: 'admin_username', setting_value: newUser.trim() }], { onConflict: 'setting_key' });
      }
      return { success: true, message: 'Admin password changed successfully!' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  // ── SITE DATA ─────────────────────────────────────────────
  async function getSiteData() {
    var sb = getClient();
    if (!sb) {
      return fallbackLocalData();
    }

    try {
      var [sRes, bRes, cRes, pRes, coRes, gRes] = await Promise.all([
        sb.from('settings').select('setting_key,setting_value'),
        sb.from('banners').select('*').order('sort_order', { ascending: true }),
        sb.from('categories').select('*').order('position', { ascending: true }),
        sb.from('products').select('*').order('position', { ascending: true }),
        sb.from('combos').select('*').order('position', { ascending: true }),
        sb.from('giftboxes').select('*').order('position', { ascending: true })
      ]);

      // If categories or products table is missing (PGRST205), fallback to database.json
      if (pRes.error && pRes.error.code === 'PGRST205') {
        console.warn('[SupabaseAPI] Tables not yet created in Supabase! Run supabase_schema.sql in Supabase SQL Editor. Falling back to local data.');
        return fallbackLocalData();
      }

      var settings = {};
      if (sRes.data) {
        sRes.data.forEach(function(r) {
          try { settings[r.setting_key] = JSON.parse(r.setting_value); }
          catch (e) { settings[r.setting_key] = r.setting_value; }
        });
      }
      delete settings.admin_password;
      delete settings.admin_username;

      var prods = (pRes.data || []).map(function(p) {
        return Object.assign({}, p, {
          id: Number(p.id),
          cat_id: Number(p.cat_id),
          orig_price: parseFloat(p.orig_price) || 0,
          sale_price: parseFloat(p.sale_price) || 0,
          out_of_stock: !!p.out_of_stock,
          position: Number(p.position || p.id),
          desc: p.description || p.desc || ''
        });
      });

      return {
        success: true,
        settings: settings,
        banners: bRes.data || [],
        categories: cRes.data || [],
        products: prods,
        combos: coRes.data || [],
        giftboxes: gRes.data || []
      };
    } catch (err) {
      console.warn('[SupabaseAPI] Error in getSiteData, falling back to local database.json:', err.message);
      return fallbackLocalData();
    }
  }

  async function fallbackLocalData() {
    try {
      var res = await fetch('./database.json');
      var json = await res.json();
      return Object.assign({ success: true }, json);
    } catch (e) {
      return { success: false, error: 'Failed to load site data' };
    }
  }

  // ── SETTINGS ──────────────────────────────────────────────
  async function saveSettings(obj) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var toSave = Object.assign({}, obj);
    delete toSave.admin_password;
    delete toSave.admin_username;
    delete toSave.current_password;

    var rows = Object.keys(toSave).map(function(k) {
      return {
        setting_key: k,
        setting_value: (typeof toSave[k] === 'string' ? toSave[k] : JSON.stringify(toSave[k]))
      };
    });
    if (!rows.length) return { success: true };

    var { error } = await sb.from('settings').upsert(rows, { onConflict: 'setting_key' });
    if (error) return { success: false, error: error.message };

    // Update product sale prices if discount_percent changed
    if (toSave.discount_percent !== undefined) {
      var disc = parseFloat(toSave.discount_percent);
      if (disc > 0) {
        var { data: ps } = await sb.from('products').select('id,orig_price');
        if (ps) {
          for (var i = 0; i < ps.length; i++) {
            var o = parseFloat(ps[i].orig_price);
            if (o > 0) {
              await sb.from('products').update({ sale_price: Math.round(o * (1 - disc / 100)) }).eq('id', ps[i].id);
            }
          }
        }
      }
    }
    return { success: true, settings: obj };
  }

  // ── PRODUCTS ──────────────────────────────────────────────
  async function createProduct(d) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var { data: cp } = await sb.from('products').select('position').eq('cat_id', d.cat_id).order('position', { ascending: false }).limit(1);
    var pos = cp && cp.length > 0 ? (Number(cp[0].position) + 1) : 1;

    var { data, error } = await sb.from('products').insert([{
      cat_id: Number(d.cat_id),
      name: (d.name || '').trim(),
      description: (d.desc || d.description || '').trim(),
      orig_price: parseFloat(d.orig_price) || 0,
      sale_price: parseFloat(d.sale_price) || 0,
      img: (d.img || '').trim(),
      video: (d.video || '').trim(),
      position: Number(d.position || pos),
      out_of_stock: !!d.out_of_stock
    }]).select().single();

    if (error) return { success: false, error: error.message };
    return { success: true, product: _np(data) };
  }

  async function updateProduct(id, d) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var u = {};
    if (d.name !== undefined) u.name = d.name.trim();
    if (d.cat_id !== undefined) u.cat_id = Number(d.cat_id);
    if (d.desc !== undefined) u.description = d.desc.trim();
    if (d.description !== undefined) u.description = d.description.trim();
    if (d.orig_price !== undefined) u.orig_price = parseFloat(d.orig_price);
    if (d.sale_price !== undefined) u.sale_price = parseFloat(d.sale_price);
    if (d.img !== undefined) u.img = d.img.trim();
    if (d.video !== undefined) u.video = d.video.trim();
    if (d.position !== undefined) u.position = Number(d.position);
    if (d.out_of_stock !== undefined) u.out_of_stock = !!d.out_of_stock;

    var { data, error } = await sb.from('products').update(u).eq('id', Number(id)).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, product: _np(data) };
  }

  async function deleteProduct(id) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var { error } = await sb.from('products').delete().eq('id', Number(id));
    return error ? { success: false, error: error.message } : { success: true, message: 'Product deleted' };
  }

  async function reorderProducts(items) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    for (var i = 0; i < items.length; i++) {
      await sb.from('products').update({ position: Number(items[i].position) }).eq('id', Number(items[i].id));
    }
    return { success: true, message: 'Products reordered' };
  }

  async function bulkUploadProducts(products, catNameMap) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var { data: cats } = await sb.from('categories').select('id,name');
    var m = {};
    if (cats) cats.forEach(function(c) { m[c.name.trim().toUpperCase()] = c.id; });
    Object.assign(m, catNameMap || {});

    var { data: dr } = await sb.from('settings').select('setting_value').eq('setting_key', 'discount_percent').single();
    var disc = dr ? parseFloat(dr.setting_value) || 85 : 85;
    var added = 0, updated = 0, errors = [];

    for (var i = 0; i < products.length; i++) {
      var p = products[i], rowNum = p._row || (i + 2);
      var catId = m[(p.categoryName || '').trim().toUpperCase()];
      if (!catId && p.cat_id) catId = Number(p.cat_id);
      if (!catId) { errors.push('Row ' + rowNum + ': Category "' + p.categoryName + '" not found'); continue; }

      var name = (p.name || '').trim();
      if (!name) { errors.push('Row ' + rowNum + ': Missing name'); continue; }

      var op = parseFloat(p.orig_price) || 0;
      var sp = parseFloat(p.sale_price) || 0;
      if (sp <= 0 && op > 0) sp = Math.round(op * (1 - disc / 100));

      var pId = p.id ? parseInt(p.id, 10) : null;
      if (pId && !isNaN(pId)) {
        var uo = {
          name: name,
          cat_id: catId,
          description: (p.desc || '').trim(),
          orig_price: op,
          sale_price: sp,
          out_of_stock: !!p.out_of_stock
        };
        if (p.img) uo.img = p.img;
        if (p.video) uo.video = p.video;
        var { error: ue } = await sb.from('products').update(uo).eq('id', pId);
        if (ue) errors.push('Row ' + rowNum + ': ' + ue.message); else updated++;
      } else {
        var { data: cp2 } = await sb.from('products').select('position').eq('cat_id', catId).order('position', { ascending: false }).limit(1);
        var np = cp2 && cp2.length > 0 ? (Number(cp2[0].position) + 1) : 1;
        var { error: ie } = await sb.from('products').insert([{
          cat_id: catId,
          name: name,
          description: (p.desc || '').trim(),
          orig_price: op,
          sale_price: sp,
          img: p.img || '',
          video: p.video || '',
          position: np,
          out_of_stock: !!p.out_of_stock
        }]);
        if (ie) errors.push('Row ' + rowNum + ': ' + ie.message); else added++;
      }
    }
    return { success: true, added: added, updated: updated, errors: errors };
  }

  // ── CATEGORIES ────────────────────────────────────────────
  async function createCategory(d) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var { data: e } = await sb.from('categories').select('position').order('position', { ascending: false }).limit(1);
    var pos = e && e.length > 0 ? (Number(e[0].position) + 1) : 1;
    var { data, error } = await sb.from('categories').insert([{
      name: (d.name || 'New Category').trim(),
      position: Number(d.position || pos)
    }]).select().single();
    return error ? { success: false, error: error.message } : { success: true, category: data };
  }

  async function updateCategory(id, d) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var u = {};
    if (d.name !== undefined) u.name = d.name.trim();
    if (d.position !== undefined) u.position = Number(d.position);
    var { data, error } = await sb.from('categories').update(u).eq('id', Number(id)).select().single();
    return error ? { success: false, error: error.message } : { success: true, category: data };
  }

  async function deleteCategory(id) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var { error } = await sb.from('categories').delete().eq('id', Number(id));
    return error ? { success: false, error: error.message } : { success: true, message: 'Category deleted' };
  }

  async function reorderCategories(items) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    for (var i = 0; i < items.length; i++) {
      await sb.from('categories').update({ position: Number(items[i].position) }).eq('id', Number(items[i].id));
    }
    return { success: true };
  }

  // ── BANNERS ───────────────────────────────────────────────
  async function createBanner(d) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var { data: e } = await sb.from('banners').select('sort_order').order('sort_order', { ascending: false }).limit(1);
    var so = e && e.length > 0 ? (Number(e[0].sort_order) + 1) : 1;
    var { data, error } = await sb.from('banners').insert([{
      img: (d.img || '').trim(),
      title: (d.title || '').trim(),
      subtitle: (d.subtitle || '').trim(),
      link: (d.link || '').trim(),
      sort_order: Number(d.sort_order || so)
    }]).select().single();
    return error ? { success: false, error: error.message } : { success: true, banner: data };
  }

  async function deleteBanner(id) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var { error } = await sb.from('banners').delete().eq('id', Number(id));
    return error ? { success: false, error: error.message } : { success: true, message: 'Banner deleted' };
  }

  // ── ORDERS ────────────────────────────────────────────────
  async function getOrders() {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    try {
      var { data, error } = await sb.from('orders').select('*').order('created_at', { ascending: false });
      if (error) {
        if (error.code === 'PGRST205') return { success: true, orders: [] };
        return { success: false, error: error.message };
      }
      var orders = (data || []).map(function(o) {
        var it = o.items_json;
        if (typeof it === 'string') {
          try { it = JSON.parse(it); } catch (e) { it = []; }
        }
        return Object.assign({}, o, { items: it || o.items || [] });
      });
      return { success: true, orders: orders };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  async function createOrder(d) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var { data: mx } = await sb.from('orders').select('order_number').order('order_number', { ascending: false }).limit(1);
    var oNum = mx && mx.length > 0 ? (Number(mx[0].order_number) + 1) : 1001;

    var { data, error } = await sb.from('orders').insert([{
      order_number: oNum,
      customer_name: (d.customer_name || '').trim(),
      customer_phone: (d.customer_phone || '').trim(),
      customer_address: (d.customer_address || '').trim(),
      city: (d.city || '').trim(),
      pincode: (d.pincode || '').trim(),
      status: d.status || 'pending',
      items_json: JSON.stringify(d.items || []),
      subtotal: parseFloat(d.subtotal) || 0,
      discount_amount: parseFloat(d.discount_amount) || 0,
      total_amount: parseFloat(d.total_amount) || 0,
      notes: (d.notes || '').trim(),
      source: d.source || 'website'
    }]).select().single();

    return error ? { success: false, error: error.message } : { success: true, order: data };
  }

  async function updateOrder(id, d) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var u = {};
    if (d.status !== undefined) u.status = d.status;
    if (d.notes !== undefined) u.notes = d.notes;
    if (d.items !== undefined) u.items_json = JSON.stringify(d.items);
    if (d.subtotal !== undefined) u.subtotal = parseFloat(d.subtotal);
    if (d.discount_amount !== undefined) u.discount_amount = parseFloat(d.discount_amount);
    if (d.total_amount !== undefined) u.total_amount = parseFloat(d.total_amount);
    if (d.customer_name !== undefined) u.customer_name = d.customer_name;
    if (d.customer_phone !== undefined) u.customer_phone = d.customer_phone;
    if (d.customer_address !== undefined) u.customer_address = d.customer_address;
    if (d.city !== undefined) u.city = d.city;
    if (d.pincode !== undefined) u.pincode = d.pincode;

    var { error } = await sb.from('orders').update(u).eq('id', Number(id));
    return error ? { success: false, error: error.message } : { success: true, message: 'Order updated successfully' };
  }

  async function deleteOrder(id) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var { error } = await sb.from('orders').delete().eq('id', Number(id));
    return error ? { success: false, error: error.message } : { success: true, message: 'Order deleted' };
  }

  // ── COMBOS ────────────────────────────────────────────────
  async function createCombo(d) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var { data: e } = await sb.from('combos').select('position').order('position', { ascending: false }).limit(1);
    var pos = e && e.length > 0 ? (Number(e[0].position) + 1) : 1;
    var sp = parseFloat(d.sale_price || d.rate || 0);
    var { data, error } = await sb.from('combos').insert([{
      name: (d.name || '').trim(),
      items: (d.items || '').trim(),
      orig_price: parseFloat(d.orig_price) || 0,
      sale_price: sp,
      rate: sp,
      img: (d.img || '').trim(),
      video: (d.video || '').trim(),
      position: Number(d.position || pos)
    }]).select().single();
    return error ? { success: false, error: error.message } : { success: true, combo: data };
  }

  async function updateCombo(id, d) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var u = {};
    if (d.name !== undefined) u.name = d.name.trim();
    if (d.items !== undefined) u.items = d.items.trim();
    if (d.orig_price !== undefined) u.orig_price = parseFloat(d.orig_price);
    if (d.sale_price !== undefined) { u.sale_price = parseFloat(d.sale_price); u.rate = parseFloat(d.sale_price); }
    if (d.rate !== undefined) { u.rate = parseFloat(d.rate); u.sale_price = parseFloat(d.rate); }
    if (d.img !== undefined) u.img = d.img.trim();
    if (d.video !== undefined) u.video = d.video.trim();
    if (d.position !== undefined) u.position = Number(d.position);

    var { data, error } = await sb.from('combos').update(u).eq('id', Number(id)).select().single();
    return error ? { success: false, error: error.message } : { success: true, combo: data };
  }

  async function deleteCombo(id) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var { error } = await sb.from('combos').delete().eq('id', Number(id));
    return error ? { success: false, error: error.message } : { success: true, message: 'Combo deleted' };
  }

  async function reorderCombos(items) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    for (var i = 0; i < items.length; i++) {
      await sb.from('combos').update({ position: Number(items[i].position) }).eq('id', Number(items[i].id));
    }
    return { success: true };
  }

  // ── GIFT BOXES ────────────────────────────────────────────
  async function createGiftbox(d) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var { data: e } = await sb.from('giftboxes').select('position').order('position', { ascending: false }).limit(1);
    var pos = e && e.length > 0 ? (Number(e[0].position) + 1) : 1;
    var sp = parseFloat(d.sale_price || d.rate || 0);
    var { data, error } = await sb.from('giftboxes').insert([{
      name: (d.name || '').trim(),
      items: (d.items || '').trim(),
      orig_price: parseFloat(d.orig_price) || 0,
      sale_price: sp,
      rate: sp,
      img: (d.img || '').trim(),
      video: (d.video || '').trim(),
      position: Number(d.position || pos)
    }]).select().single();
    return error ? { success: false, error: error.message } : { success: true, giftbox: data };
  }

  async function updateGiftbox(id, d) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var u = {};
    if (d.name !== undefined) u.name = d.name.trim();
    if (d.items !== undefined) u.items = d.items.trim();
    if (d.orig_price !== undefined) u.orig_price = parseFloat(d.orig_price);
    if (d.sale_price !== undefined) { u.sale_price = parseFloat(d.sale_price); u.rate = parseFloat(d.sale_price); }
    if (d.rate !== undefined) { u.rate = parseFloat(d.rate); u.sale_price = parseFloat(d.rate); }
    if (d.img !== undefined) u.img = d.img.trim();
    if (d.video !== undefined) u.video = d.video.trim();
    if (d.position !== undefined) u.position = Number(d.position);

    var { data, error } = await sb.from('giftboxes').update(u).eq('id', Number(id)).select().single();
    return error ? { success: false, error: error.message } : { success: true, giftbox: data };
  }

  async function deleteGiftbox(id) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var { error } = await sb.from('giftboxes').delete().eq('id', Number(id));
    return error ? { success: false, error: error.message } : { success: true, message: 'Giftbox deleted' };
  }

  async function reorderGiftboxes(items) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    for (var i = 0; i < items.length; i++) {
      await sb.from('giftboxes').update({ position: Number(items[i].position) }).eq('id', Number(items[i].id));
    }
    return { success: true };
  }

  // ── FILE UPLOAD (Supabase Storage) ────────────────────────
  async function uploadFile(file, folderType) {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Not initialised' };
    var ext = file.name.split('.').pop().toLowerCase();
    var uName = 'media_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6) + '.' + ext;
    var filePath = (folderType || 'products') + '/' + uName;
    var isVid = ['mp4', 'webm', 'mov', 'ogg'].indexOf(ext) !== -1;
    var mime = isVid ? ('video/' + ext) : ('image/' + ext);

    var { error } = await sb.storage.from('media').upload(filePath, file, { contentType: mime, upsert: false });
    if (error) {
      console.warn('[Supabase Storage upload warning]:', error.message);
      return { success: false, error: error.message };
    }
    var pub = sb.storage.from('media').getPublicUrl(filePath);
    return { success: true, url: pub.data.publicUrl, filename: uName, is_video: isVid };
  }

  // ── DB STATUS ─────────────────────────────────────────────
  async function getDbStatus() {
    var sb = getClient();
    if (!sb) return { success: false, error: 'Supabase library not loaded' };
    try {
      var pc = await sb.from('products').select('*', { count: 'exact', head: true });
      var cc = await sb.from('categories').select('*', { count: 'exact', head: true });
      var oc = await sb.from('orders').select('*', { count: 'exact', head: true });

      if (pc.error && pc.error.code === 'PGRST205') {
        return {
          success: true,
          connected: false,
          source: 'supabase',
          db_host: 'ucbxdisznepjproeylos.supabase.co',
          db_name: 'Supabase PostgreSQL (Tables not yet created)',
          error: 'Tables not yet created. Please run supabase_schema.sql in Supabase SQL Editor.',
          table_counts: { products: 0, categories: 0, orders: 0 }
        };
      }

      return {
        success: true,
        connected: true,
        source: 'supabase',
        db_host: 'ucbxdisznepjproeylos.supabase.co',
        db_name: 'Supabase PostgreSQL Cloud',
        db_user: 'anon/public',
        error: null,
        table_counts: {
          products: pc.count || 0,
          categories: cc.count || 0,
          orders: oc.count || 0
        }
      };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  function _np(p) {
    if (!p) return p;
    return Object.assign({}, p, {
      id: Number(p.id),
      cat_id: Number(p.cat_id),
      orig_price: parseFloat(p.orig_price) || 0,
      sale_price: parseFloat(p.sale_price) || 0,
      out_of_stock: !!p.out_of_stock,
      position: Number(p.position || p.id),
      desc: p.description || p.desc || ''
    });
  }

  // ── UNIVERSAL FETCH INTERCEPTOR FOR TRANSPARENT CLOUDFLARE HOSTING ──
  // Automatically catches requests to api.php or /api/ and executes them via Supabase
  var originalFetch = window.fetch;
  window.fetch = async function(resource, init) {
    var url = typeof resource === 'string' ? resource : (resource && resource.url ? resource.url : '');
    var isApi = (url.indexOf('api.php') !== -1) || (url.indexOf('/api') !== -1);

    if (isSupabaseMode() && isApi) {
      try {
        var res = await handleApiRequest(url, init || {});
        return new Response(JSON.stringify(res), {
          status: res.success ? 200 : (res.status || 400),
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (err) {
        console.warn('[Supabase Bridge fetch error]:', err);
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return originalFetch.apply(this, arguments);
  };

  async function handleApiRequest(url, init) {
    var method = (init.method || 'GET').toUpperCase();
    var body = null;
    if (init.body) {
      if (init.body instanceof FormData) {
        body = init.body;
      } else if (typeof init.body === 'string') {
        try { body = JSON.parse(init.body); } catch (e) { body = init.body; }
      }
    }

    var u = new URL(url, window.location.origin);
    var action = u.searchParams.get('action');
    var path = u.pathname;

    // 1. Site Data
    if (action === 'site-data' || path.endsWith('/site-data')) {
      return await getSiteData();
    }

    // 2. Auth Login
    if (action === 'login' || path.endsWith('/login')) {
      return await login(body ? body.username : '', body ? body.password : '');
    }

    // 3. Change Password
    if (action === 'change-password' || path.endsWith('/change-password')) {
      return await changePassword(body ? body.current_password : '', body ? body.new_password : '', body ? body.new_username : '');
    }

    // 4. DB Status
    if (action === 'db-status' || path.endsWith('/db-status')) {
      return await getDbStatus();
    }

    // 5. Settings
    if (action === 'settings' || path.endsWith('/settings')) {
      if (method === 'POST') return await saveSettings(body || {});
      var sd = await getSiteData();
      return { success: true, settings: sd.settings };
    }

    // 6. Products
    if (action === 'products' || path.endsWith('/products')) {
      if (method === 'POST') return await createProduct(body || {});
      var sd2 = await getSiteData();
      return { success: true, products: sd2.products };
    }
    if (action === 'update-product' || (method === 'PUT' && path.match(/\/products\/\d+/))) {
      var pId = (body && body.id) || (u.searchParams.get('id')) || (path.split('/').pop());
      return await updateProduct(pId, body || {});
    }
    if (action === 'delete-product' || (method === 'DELETE' && path.match(/\/products\/\d+/))) {
      var dId = (body && body.id) || (u.searchParams.get('id')) || (path.split('/').pop());
      return await deleteProduct(dId);
    }
    if (action === 'reorder-products' || path.endsWith('/products/reorder')) {
      return await reorderProducts((body && body.items) || []);
    }
    if (action === 'bulk-products' || path.endsWith('/products/bulk')) {
      return await bulkUploadProducts((body && body.products) || [], (body && body.catNameMap) || {});
    }

    // 7. Categories
    if (action === 'categories' || path.endsWith('/categories')) {
      if (method === 'POST') return await createCategory(body || {});
      var sd3 = await getSiteData();
      return { success: true, categories: sd3.categories };
    }
    if (action === 'update-category' || (method === 'PUT' && path.match(/\/categories\/\d+/))) {
      var cId = (body && body.id) || (u.searchParams.get('id')) || (path.split('/').pop());
      return await updateCategory(cId, body || {});
    }
    if (action === 'delete-category' || (method === 'DELETE' && path.match(/\/categories\/\d+/))) {
      var dcId = (body && body.id) || (u.searchParams.get('id')) || (path.split('/').pop());
      return await deleteCategory(dcId);
    }
    if (action === 'reorder-categories' || path.endsWith('/categories/reorder')) {
      return await reorderCategories((body && body.items) || []);
    }

    // 8. Banners
    if (action === 'banners' || path.endsWith('/banners')) {
      if (method === 'POST') return await createBanner(body || {});
      var sd4 = await getSiteData();
      return { success: true, banners: sd4.banners };
    }
    if (action === 'delete-banner' || (method === 'DELETE' && path.match(/\/banners\/\d+/))) {
      var bId = (body && body.id) || (u.searchParams.get('id')) || (path.split('/').pop());
      return await deleteBanner(bId);
    }

    // 9. Orders
    if (action === 'orders' || path.endsWith('/orders')) {
      if (method === 'POST') return await createOrder(body || {});
      return await getOrders();
    }
    if (action === 'update-order' || (method === 'PUT' && path.match(/\/orders\/\d+/))) {
      var oId = (body && body.id) || (u.searchParams.get('id')) || (path.split('/').pop());
      return await updateOrder(oId, body || {});
    }
    if (action === 'delete-order' || (method === 'DELETE' && path.match(/\/orders\/\d+/))) {
      var doId = (body && body.id) || (u.searchParams.get('id')) || (path.split('/').pop());
      return await deleteOrder(doId);
    }

    // 10. Combos
    if (action === 'combos' || path.endsWith('/combos')) {
      if (method === 'POST') return await createCombo(body || {});
      var sd5 = await getSiteData();
      return { success: true, combos: sd5.combos };
    }
    if (action === 'update-combo' || (method === 'PUT' && path.match(/\/combos\/\d+/))) {
      var cbId = (body && body.id) || (u.searchParams.get('id')) || (path.split('/').pop());
      return await updateCombo(cbId, body || {});
    }
    if (action === 'delete-combo' || (method === 'DELETE' && path.match(/\/combos\/\d+/))) {
      var dcbId = (body && body.id) || (u.searchParams.get('id')) || (path.split('/').pop());
      return await deleteCombo(dcbId);
    }
    if (action === 'reorder-combos' || path.endsWith('/combos/reorder')) {
      return await reorderCombos((body && body.items) || []);
    }

    // 11. Gift Boxes
    if (action === 'giftboxes' || path.endsWith('/giftboxes')) {
      if (method === 'POST') return await createGiftbox(body || {});
      var sd6 = await getSiteData();
      return { success: true, giftboxes: sd6.giftboxes };
    }
    if (action === 'update-giftbox' || (method === 'PUT' && path.match(/\/giftboxes\/\d+/))) {
      var gId = (body && body.id) || (u.searchParams.get('id')) || (path.split('/').pop());
      return await updateGiftbox(gId, body || {});
    }
    if (action === 'delete-giftbox' || (method === 'DELETE' && path.match(/\/giftboxes\/\d+/))) {
      var dgId = (body && body.id) || (u.searchParams.get('id')) || (path.split('/').pop());
      return await deleteGiftbox(dgId);
    }
    if (action === 'reorder-giftboxes' || path.endsWith('/giftboxes/reorder')) {
      return await reorderGiftboxes((body && body.items) || []);
    }

    // 12. Upload
    if (action === 'upload' || path.endsWith('/upload')) {
      if (body instanceof FormData && body.get('file')) {
        var file = body.get('file');
        var type = body.get('type') || 'products';
        return await uploadFile(file, type);
      }
      return { success: false, error: 'No file uploaded' };
    }

    return { success: false, error: 'Unknown action: ' + (action || path) };
  }

  window.SupabaseAPI = {
    getClient: getClient,
    login: login,
    changePassword: changePassword,
    getSiteData: getSiteData,
    saveSettings: saveSettings,
    getDbStatus: getDbStatus,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    reorderProducts: reorderProducts,
    bulkUploadProducts: bulkUploadProducts,
    createCategory: createCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory,
    reorderCategories: reorderCategories,
    createBanner: createBanner,
    deleteBanner: deleteBanner,
    getOrders: getOrders,
    createOrder: createOrder,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    createCombo: createCombo,
    updateCombo: updateCombo,
    deleteCombo: deleteCombo,
    reorderCombos: reorderCombos,
    createGiftbox: createGiftbox,
    updateGiftbox: updateGiftbox,
    deleteGiftbox: deleteGiftbox,
    reorderGiftboxes: reorderGiftboxes,
    uploadFile: uploadFile
  };

  console.log('[SupabaseAPI] Universal Cloudflare/Supabase Bridge active. Target:', SUPABASE_URL);
})(window);
