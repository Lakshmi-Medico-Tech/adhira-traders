/**
 * ==========================================================================
 * ADHIRA FIRE WORKS & PYROTECH — Supabase Database & Cloud Storage Adapter
 * Sivakasi, Tamil Nadu
 * Supports direct Cloudflare Pages <-> Supabase DB & Storage communication
 * ==========================================================================
 */

(function (window) {
  'use strict';

  const SUPABASE_CONFIG = {
    url: window.__ADHIRA_SUPABASE_URL || 'https://ozpkzwkeenxdgqiwcntm.supabase.co',
    anonKey: window.__ADHIRA_SUPABASE_KEY || 'sb_publishable_jPjp50dV5aRoEXFJiTR0qQ_5nmTskxi',
    storageBucket: 'adhira-storage'
  };

  let client = null;
  let isReady = false;
  let realtimeChannel = null;

  function initClient() {
    if (client) return client;
    if (typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
      try {
        client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true
          }
        });
        isReady = true;
        console.log('[Supabase] Initialized successfully with project:', SUPABASE_CONFIG.url);
      } catch (err) {
        console.warn('[Supabase] Initialization failed:', err.message);
        client = null;
        isReady = false;
      }
    }
    return client;
  }

  // Initialize immediately if Supabase JS SDK is already loaded
  initClient();

  // Or wait for DOMContentLoaded / script load
  if (!client) {
    window.addEventListener('load', () => {
      initClient();
    });
  }

  const AdhiraSupabase = {
    config: SUPABASE_CONFIG,

    getClient() {
      return initClient();
    },

    isConfigured() {
      return Boolean(initClient() && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
    },

    /**
     * Test connection to Supabase
     */
    async testConnection() {
      const sb = initClient();
      if (!sb) return { ok: false, error: 'Supabase library not loaded' };
      const start = Date.now();
      try {
        const { data, error } = await sb
          .from('adhira_store')
          .select('key, updated_at')
          .limit(1);
        if (error) throw error;
        return { ok: true, latencyMs: Date.now() - start, data };
      } catch (err) {
        return { ok: false, error: err.message || String(err) };
      }
    },

    /**
     * Fetch complete database snapshot from Supabase `adhira_store`
     */
    async getDatabase() {
      const sb = initClient();
      if (!sb) return null;
      try {
        const { data, error } = await sb
          .from('adhira_store')
          .select('data, updated_at')
          .eq('key', 'main_db')
          .maybeSingle();

        if (error) {
          console.warn('[Supabase] Read warning:', error.message);
          return null;
        }

        if (data && data.data && typeof data.data === 'object') {
          return data.data;
        }
        return null;
      } catch (err) {
        console.warn('[Supabase] getDatabase error:', err.message);
        return null;
      }
    },

    /**
     * Save complete database snapshot to Supabase `adhira_store`
     */
    async saveDatabase(payload) {
      const sb = initClient();
      if (!sb || !payload) return false;
      try {
        const { error } = await sb
          .from('adhira_store')
          .upsert({
            key: 'main_db',
            data: payload,
            updated_at: new Date().toISOString()
          }, { onConflict: 'key' });

        if (error) {
          console.warn('[Supabase] Save error:', error.message);
          return false;
        }

        // Asynchronously sync individual relational tables in background
        this.syncRelationalTables(payload).catch(e => {
          console.debug('[Supabase] Background relational sync notice:', e.message);
        });

        return true;
      } catch (err) {
        console.warn('[Supabase] saveDatabase exception:', err.message);
        return false;
      }
    },

    /**
     * Optional background syncing of relational tables for SQL querying
     */
    async syncRelationalTables(payload) {
      const sb = initClient();
      if (!sb || !payload) return;

      // Sync Products
      if (Array.isArray(payload.products) && payload.products.length > 0) {
        try {
          const prods = payload.products.map(p => ({
            id: p.id,
            item_no: p.itemNo || p.item_no || null,
            name: p.name,
            short_name: p.shortName || p.name,
            category: p.category || null,
            hsn: p.hsn || '3604',
            packing: p.packing || null,
            pieces: Number(p.pieces) || 1,
            unit: p.unit || 'CASE',
            rate: Number(p.rate) || 0,
            disc_rate: Number(p.discRate) || 0,
            case_rate: Number(p.caseRate) || 0,
            gst: Number(p.gst) || 18,
            active: p.active !== false,
            updated_at: new Date().toISOString()
          }));
          await sb.from('adhira_products').upsert(prods, { onConflict: 'id' });
        } catch (e) {}
      }

      // Sync Customers
      if (Array.isArray(payload.customers) && payload.customers.length > 0) {
        try {
          const custs = payload.customers.map(c => ({
            id: c.id,
            name: c.name,
            legal_name: c.legalName || c.name,
            gstin: c.gstin || null,
            pan: c.pan || null,
            phone: c.phone || null,
            email: c.email || null,
            state: c.state || null,
            state_code: c.stateCode || '33',
            city: c.city || null,
            billing_address: c.billingAddress || null,
            shipping_address: c.shippingAddress || null,
            updated_at: new Date().toISOString()
          }));
          await sb.from('adhira_customers').upsert(custs, { onConflict: 'id' });
        } catch (e) {}
      }
    },

    /**
     * Upload Quotation or Invoice PDF to Supabase Storage Bucket
     * @param {'quotations'|'invoices'|'simpleBills'} folder 
     * @param {string} filename 
     * @param {Blob|File} pdfBlob 
     * @returns {Promise<string|null>} Public URL of the uploaded PDF
     */
    async uploadPdf(folder, filename, pdfBlob) {
      const sb = initClient();
      if (!sb || !pdfBlob) return null;
      try {
        const filePath = `${folder}/${filename}`;
        const { error: uploadError } = await sb.storage
          .from(SUPABASE_CONFIG.storageBucket)
          .upload(filePath, pdfBlob, {
            contentType: 'application/pdf',
            upsert: true
          });

        if (uploadError) {
          console.warn('[Supabase Storage] Upload notice:', uploadError.message);
          return null;
        }

        const { data: urlData } = sb.storage
          .from(SUPABASE_CONFIG.storageBucket)
          .getPublicUrl(filePath);

        return urlData ? urlData.publicUrl : null;
      } catch (err) {
        console.warn('[Supabase Storage] Exception:', err.message);
        return null;
      }
    },

    /**
     * Upload complete database JSON backup snapshot to Supabase Storage
     */
    async uploadBackup(filename, jsonData) {
      const sb = initClient();
      if (!sb || !jsonData) return null;
      try {
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        const filePath = `backups/${filename}`;
        const { error: uploadError } = await sb.storage
          .from(SUPABASE_CONFIG.storageBucket)
          .upload(filePath, blob, {
            contentType: 'application/json',
            upsert: true
          });

        if (uploadError) {
          console.warn('[Supabase Storage Backup] Notice:', uploadError.message);
          return null;
        }

        const { data: urlData } = sb.storage
          .from(SUPABASE_CONFIG.storageBucket)
          .getPublicUrl(filePath);

        return urlData ? urlData.publicUrl : null;
      } catch (err) {
        console.warn('[Supabase Storage Backup] Exception:', err.message);
        return null;
      }
    },

    /**
     * Enable multi-device Realtime subscriptions for instant cloud sync
     */
    subscribeRealtime(onChangeCallback) {
      const sb = initClient();
      if (!sb || typeof onChangeCallback !== 'function') return null;

      try {
        if (realtimeChannel) {
          sb.removeChannel(realtimeChannel);
        }

        realtimeChannel = sb
          .channel('adhira-store-channel')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'adhira_store',
              filter: 'key=eq.main_db'
            },
            (payload) => {
              if (payload.new && payload.new.data) {
                console.log('[Supabase Realtime] Received remote update!');
                onChangeCallback(payload.new.data);
              }
            }
          )
          .subscribe();

        return realtimeChannel;
      } catch (err) {
        console.warn('[Supabase Realtime] Subscription error:', err.message);
        return null;
      }
    }
  };

  window.AdhiraSupabase = AdhiraSupabase;
})(window);
