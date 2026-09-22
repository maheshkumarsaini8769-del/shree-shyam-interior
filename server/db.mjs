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
      'settings.json',
      'siteContent.json',
      'brandingSeo.json',
      'configurator.json'
    ];

    for (const file of files) {
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

      // 4. Defaults for quotes and leads if missing
      if (file === 'leads.json' || file === 'quotes.json') {
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
  // 1. Check in-memory store first
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
    if (fileName === 'leads.json' || fileName === 'quotes.json') {
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
}
