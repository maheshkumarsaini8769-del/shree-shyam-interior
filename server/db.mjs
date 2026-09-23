import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// On Vercel serverless, __dirname is in a read-only filesystem (/var/task).
// Only /tmp is writable.
const IS_VERCEL = !!process.env.VERCEL;
const BUNDLED_DATA_DIR = path.join(__dirname, 'data');
const SRC_DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const WRITABLE_DATA_DIR = IS_VERCEL ? path.join(os.tmpdir(), 'ssi_data') : BUNDLED_DATA_DIR;
const UPLOADS_DIR = IS_VERCEL ? path.join(os.tmpdir(), 'ssi_uploads') : path.join(__dirname, '..', 'uploads');

// Fast in-memory cache to guarantee instant availability across function lifetime
const memoryStore = new Map();

// Helper to safely write to disk without throwing 500 crashes
async function safeWriteFile(filePath, content) {
  try {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, content, 'utf-8');
    return true;
  } catch (err) {
    console.warn(`[SafeWrite] Could not write to ${filePath} (using in-memory store):`, err.message);
    return false;
  }
}

// Cloud store object ID for cross-instance and cross-device persistence
const CLOUD_SYNC_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072';

async function fetchCloudStore() {
  try {
    const res = await fetch(CLOUD_SYNC_URL, {
      signal: AbortSignal.timeout(5000)
    });
    if (res.ok) {
      const json = await res.json();
      return json?.data || null;
    }
  } catch (err) {
    // Non-blocking fallback to local memory
  }
  return null;
}

async function updateCloudStore(key, data) {
  try {
    const cloudCurrent = await fetchCloudStore();
    const leads = key === 'leads' ? data : (cloudCurrent?.leads || memoryStore.get('leads.json') || []);
    const quotes = key === 'quotes' ? data : (cloudCurrent?.quotes || memoryStore.get('quotes.json') || []);
    const whatsappOrders = key === 'whatsappOrders' ? data : (cloudCurrent?.whatsappOrders || memoryStore.get('whatsappOrders.json') || []);

    if (Array.isArray(leads)) memoryStore.set('leads.json', leads);
    if (Array.isArray(quotes)) memoryStore.set('quotes.json', quotes);
    if (Array.isArray(whatsappOrders)) memoryStore.set('whatsappOrders.json', whatsappOrders);

    const payload = {
      name: 'shree-shyam-interior-store',
      data: {
        leads,
        quotes,
        whatsappOrders
      }
    };
    await fetch(CLOUD_SYNC_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000)
    });
  } catch (err) {
    console.warn('[CloudStore] update warning:', err.message);
  }
}



// Ensure directories and initial data exist
let initPromise = null;

export async function initDb() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      await fs.mkdir(WRITABLE_DATA_DIR, { recursive: true });
    } catch (_) {}
    try {
      await fs.mkdir(UPLOADS_DIR, { recursive: true });
    } catch (_) {}

    const files = [
      'products.json',
      'categories.json',
      'brands.json',
      'projects.json',
      'testimonials.json',
      'leads.json',
      'quotes.json',
      'whatsappOrders.json',
      'settings.json',
      'siteContent.json',
      'brandingSeo.json',
      'configurator.json'
    ];

    // Seed cloud data if present
    const cloudData = await fetchCloudStore();
    if (cloudData) {
      if (Array.isArray(cloudData.leads)) memoryStore.set('leads.json', cloudData.leads);
      if (Array.isArray(cloudData.quotes)) memoryStore.set('quotes.json', cloudData.quotes);
      if (Array.isArray(cloudData.whatsappOrders)) memoryStore.set('whatsappOrders.json', cloudData.whatsappOrders);
    }

    for (const file of files) {
      if (memoryStore.has(file)) continue;

      // 1. Try reading from writable directory
      const writablePath = path.join(WRITABLE_DATA_DIR, file);
      try {
        const content = await fs.readFile(writablePath, 'utf-8');
        memoryStore.set(file, JSON.parse(content));
        continue;
      } catch (_) {}

      // 2. Try reading from bundled server/data
      const bundledPath = path.join(BUNDLED_DATA_DIR, file);
      try {
        const content = await fs.readFile(bundledPath, 'utf-8');
        const parsed = JSON.parse(content);
        memoryStore.set(file, parsed);
        if (IS_VERCEL) {
          await safeWriteFile(writablePath, content);
        }
        continue;
      } catch (_) {}

      // 3. Try reading from src/data
      const srcPath = path.join(SRC_DATA_DIR, file);
      try {
        const content = await fs.readFile(srcPath, 'utf-8');
        const parsed = JSON.parse(content);
        memoryStore.set(file, parsed);
        if (IS_VERCEL) {
          await safeWriteFile(writablePath, content);
        }
        continue;
      } catch (_) {}

      // 4. Defaults for quotes, leads and whatsappOrders if missing
      if (file === 'leads.json' || file === 'quotes.json' || file === 'whatsappOrders.json') {
        memoryStore.set(file, []);
        await safeWriteFile(writablePath, '[]');
      }
    }
  })();

  return initPromise;
}

// Auto-run initDb
initDb().catch(console.error);

export async function readData(fileName) {
  // For leads, quotes, and whatsappOrders, sync with cloud store for multi-container consistency
  if (fileName === 'leads.json' || fileName === 'quotes.json' || fileName === 'whatsappOrders.json') {
    const cloudData = await fetchCloudStore();
    const cloudKey = fileName === 'leads.json' ? 'leads' : (fileName === 'quotes.json' ? 'quotes' : 'whatsappOrders');
    if (cloudData && Array.isArray(cloudData[cloudKey])) {
      memoryStore.set(fileName, cloudData[cloudKey]);
      return cloudData[cloudKey];
    }
  }

  // 1. Check in-memory store
  if (memoryStore.has(fileName)) {
    return memoryStore.get(fileName);
  }

  // 2. Try writable path
  const writablePath = path.join(WRITABLE_DATA_DIR, fileName);
  try {
    const content = await fs.readFile(writablePath, 'utf-8');
    const parsed = JSON.parse(content);
    memoryStore.set(fileName, parsed);
    return parsed;
  } catch (_) {}

  // 3. Try bundled path
  const bundledPath = path.join(BUNDLED_DATA_DIR, fileName);
  try {
    const content = await fs.readFile(bundledPath, 'utf-8');
    const parsed = JSON.parse(content);
    memoryStore.set(fileName, parsed);
    return parsed;
  } catch (_) {}

  // 4. Try src/data path
  const srcPath = path.join(SRC_DATA_DIR, fileName);
  try {
    const content = await fs.readFile(srcPath, 'utf-8');
    const parsed = JSON.parse(content);
    memoryStore.set(fileName, parsed);
    return parsed;
  } catch (err) {
    if (fileName === 'leads.json' || fileName === 'quotes.json' || fileName === 'whatsappOrders.json') {
      memoryStore.set(fileName, []);
      return [];
    }
    console.error(`Error reading ${fileName}:`, err.message);
    return null;
  }
}

export async function writeData(fileName, data) {
  // Always update in-memory store immediately
  memoryStore.set(fileName, data);

  const jsonString = JSON.stringify(data, null, 2);

  // Write to writable location (/tmp/ssi_data on Vercel)
  const writablePath = path.join(WRITABLE_DATA_DIR, fileName);
  await safeWriteFile(writablePath, jsonString);

  // If running locally, also save to server/data
  if (!IS_VERCEL) {
    const localPath = path.join(BUNDLED_DATA_DIR, fileName);
    if (localPath !== writablePath) {
      await safeWriteFile(localPath, jsonString);
    }
  }

  // Sync dynamic leads, quotes, and whatsappOrders with cloud store
  try {
    if (fileName === 'leads.json') {
      await updateCloudStore('leads', data);
    } else if (fileName === 'quotes.json') {
      await updateCloudStore('quotes', data);
    } else if (fileName === 'whatsappOrders.json') {
      await updateCloudStore('whatsappOrders', data);
    }
  } catch (_) {}
}

