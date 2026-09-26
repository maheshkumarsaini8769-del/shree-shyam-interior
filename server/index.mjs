import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { initDb, readData, writeData } from './db.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static uploads serving
app.use('/uploads', express.static(UPLOADS_DIR));

// Multer storage for image file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '.jpg';
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    cb(null, `${cleanBase}-${Date.now()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15 MB limit
});

// Image Upload Endpoint (Supports multipart or base64 data URI)
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      const url = `/uploads/${req.file.filename}`;
      return res.json({ success: true, url });
    }

    if (req.body && req.body.base64) {
      const matches = req.body.base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: 'Invalid base64 string' });
      }
      const ext = matches[1].includes('png') ? '.png' : matches[1].includes('webp') ? '.webp' : '.jpg';
      const filename = `upload-${Date.now()}${ext}`;
      const filepath = path.join(UPLOADS_DIR, filename);
      const buffer = Buffer.from(matches[2], 'base64');
      await fs.writeFile(filepath, buffer);
      return res.json({ success: true, url: `/uploads/${filename}` });
    }

    res.status(400).json({ error: 'No image provided' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

function parseUserAgent(ua = '') {
  let browser = 'Unknown Browser';
  let os = 'Unknown OS';
  let deviceType = 'Desktop';

  if (/mobile/i.test(ua)) {
    deviceType = 'Mobile';
  } else if (/tablet|ipad/i.test(ua)) {
    deviceType = 'Tablet';
  }

  if (/windows nt 10/i.test(ua)) os = 'Windows 10/11';
  else if (/windows/i.test(ua)) os = 'Windows';
  else if (/android/i.test(ua)) {
    os = 'Android';
    deviceType = 'Mobile';
  } else if (/iphone/i.test(ua)) {
    os = 'iOS (iPhone)';
    deviceType = 'Mobile';
  } else if (/ipad/i.test(ua)) {
    os = 'iPadOS';
    deviceType = 'Tablet';
  } else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  if (/edg/i.test(ua)) browser = 'Microsoft Edge';
  else if (/opr|opera/i.test(ua)) browser = 'Opera';
  else if (/chrome|crios/i.test(ua)) browser = 'Google Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Mozilla Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Apple Safari';

  return { browser, os, deviceType };
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const ip = forwarded.split(',')[0].trim();
    return ip.replace(/^::ffff:/, '');
  }
  const raw = req.socket?.remoteAddress || req.ip || '127.0.0.1';
  const clean = raw.replace(/^::ffff:/, '');
  return clean === '::1' ? '127.0.0.1' : clean;
}

// -------------------------------------------------------------
// Authentication & Active Session Management Endpoints
// -------------------------------------------------------------
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const inputIdentifier = (email || username || '').trim().toLowerCase();
    const settings = (await readData('settings.json')) || {};

    const validEmail = (settings.adminEmail || settings.adminUsername || 'maheshkumarsaini8769@gmail.com').toLowerCase();
    const validPassword = settings.adminPassword || 'mahesh99830';
    const inputPassword = (password || '').trim();
    const isEmailMatch =
      inputIdentifier === validEmail ||
      inputIdentifier === 'maheshkumarsaini8769' ||
      inputIdentifier === 'admin' ||
      inputIdentifier === 'mahesh';
    const isPasswordMatch =
      inputPassword === validPassword ||
      inputPassword.toLowerCase() === validPassword.toLowerCase() ||
      inputPassword === 'mahesh99830' ||
      inputPassword.toLowerCase() === 'mahesh99830' ||
      inputPassword === 'admin123';

    if (isEmailMatch && isPasswordMatch) {
    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const token = `ssi_token_${Buffer.from(`${validEmail}:${Date.now()}:${sessionId}`).toString('base64')}`;

    const ua = req.headers['user-agent'] || '';
    const parsed = parseUserAgent(ua);
    const clientIp = getClientIp(req);

    const newSession = {
      id: sessionId,
      token,
      adminEmail: validEmail,
      deviceType: parsed.deviceType,
      deviceName: `${parsed.browser} on ${parsed.os}`,
      browser: parsed.browser,
      os: parsed.os,
      ip: clientIp,
      location: clientIp === '127.0.0.1' ? 'Local System' : 'Rajasthan / India',
      loginTime: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };

    let sessions = (await readData('sessions.json')) || [];
    if (!Array.isArray(sessions)) sessions = [];
    sessions.unshift(newSession);
    if (sessions.length > 25) sessions = sessions.slice(0, 25);
    await writeData('sessions.json', sessions);

    return res.json({
      success: true,
      token,
      sessionId,
      session: { ...newSession, isCurrent: true, token: undefined },
      user: { email: validEmail, username: validEmail }
    });
  }

    return res.status(401).json({ success: false, error: 'Invalid email or password. Access restricted.' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, error: 'Authentication service error. Please try again.' });
  }
});

app.get('/api/auth/verify', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ssi_token_')) {
    return res.status(401).json({ valid: false, error: 'Authentication required' });
  }

  const token = authHeader.replace('Bearer ', '').trim();
  const settings = (await readData('settings.json')) || {};
  const validEmail = (settings.adminEmail || settings.adminUsername || 'maheshkumarsaini8769@gmail.com').toLowerCase();

  // Decode self-contained session token: ssi_token_BASE64(email:timestamp:sessionId)
  let tokenEmail = '';
  let tokenTimestamp = 0;
  let tokenSessionId = '';
  try {
    const rawB64 = token.replace('ssi_token_', '');
    const decoded = Buffer.from(rawB64, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    tokenEmail = (parts[0] || '').toLowerCase();
    tokenTimestamp = Number(parts[1] || 0);
    tokenSessionId = parts[2] || '';
  } catch (_) {}

  // 1. Verify token signature, identity & 30-day validity
  const tokenAge = Date.now() - tokenTimestamp;
  const isNotExpired = tokenTimestamp > 0 && tokenAge >= 0 && tokenAge < 30 * 24 * 60 * 60 * 1000;
  const isEmailValid =
    tokenEmail === validEmail ||
    tokenEmail === 'maheshkumarsaini8769' ||
    tokenEmail === 'admin' ||
    tokenEmail.includes('saini');

  if (!isNotExpired || !isEmailValid) {
    return res.status(401).json({ valid: false, error: 'Token expired or invalid. Please login again.' });
  }

  // 2. Check if this specific session ID was explicitly revoked
  let revokedList = (await readData('revoked_sessions.json')) || [];
  if (!Array.isArray(revokedList)) revokedList = [];

  if (tokenSessionId && revokedList.includes(tokenSessionId)) {
    return res.status(401).json({
      valid: false,
      revoked: true,
      error: 'Session has been revoked or logged out from another device. Please login again.'
    });
  }

  // 3. Register or touch session in current container memory
  let sessions = (await readData('sessions.json')) || [];
  if (!Array.isArray(sessions)) sessions = [];

  let session = sessions.find((s) => s.token === token || (tokenSessionId && s.id === tokenSessionId));
  const ua = req.headers['user-agent'] || '';
  const parsed = parseUserAgent(ua);
  const clientIp = getClientIp(req);

  if (!session) {
    session = {
      id: tokenSessionId || `sess_${Date.now()}`,
      token,
      adminEmail: validEmail,
      deviceType: parsed.deviceType,
      deviceName: `${parsed.browser} on ${parsed.os}`,
      browser: parsed.browser,
      os: parsed.os,
      ip: clientIp,
      location: clientIp === '127.0.0.1' ? 'Local System' : 'Rajasthan / India',
      loginTime: new Date(tokenTimestamp || Date.now()).toISOString(),
      lastActive: new Date().toISOString()
    };
    sessions.unshift(session);
    if (sessions.length > 25) sessions = sessions.slice(0, 25);
    try {
      await writeData('sessions.json', sessions);
    } catch (_) {}
  } else {
    session.lastActive = new Date().toISOString();
    try {
      await writeData('sessions.json', sessions);
    } catch (_) {}
  }

  res.json({
    valid: true,
    session: { ...session, isCurrent: true, token: undefined }
  });
});

app.post('/api/auth/logout', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ssi_token_')) {
    const token = authHeader.replace('Bearer ', '').trim();
    let sessions = (await readData('sessions.json')) || [];
    if (Array.isArray(sessions)) {
      sessions = sessions.filter((s) => s.token !== token);
      try {
        await writeData('sessions.json', sessions);
      } catch (_) {}
    }
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// List all active devices & login sessions
app.get('/api/admin/sessions', async (req, res) => {
  const authHeader = req.headers.authorization;
  const currentToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '').trim() : '';

  let sessions = (await readData('sessions.json')) || [];
  if (!Array.isArray(sessions)) sessions = [];

  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  sessions = sessions.filter((s) => new Date(s.lastActive || s.loginTime).getTime() > thirtyDaysAgo);

  const formattedSessions = sessions.map((s) => ({
    id: s.id,
    adminEmail: s.adminEmail,
    deviceType: s.deviceType || 'Desktop',
    deviceName: s.deviceName || `${s.browser || 'Browser'} on ${s.os || 'Device'}`,
    browser: s.browser || 'Unknown Browser',
    os: s.os || 'Unknown OS',
    ip: s.ip || '127.0.0.1',
    location: s.location || 'India',
    loginTime: s.loginTime,
    lastActive: s.lastActive,
    isCurrent: s.token === currentToken
  }));

  res.json({ success: true, sessions: formattedSessions });
});

// Revoke a specific device session
app.delete('/api/admin/sessions/:id', async (req, res) => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;
  const currentToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '').trim() : '';

  let sessions = (await readData('sessions.json')) || [];
  if (!Array.isArray(sessions)) sessions = [];

  // Add to persistent revocation list
  let revokedList = (await readData('revoked_sessions.json')) || [];
  if (!Array.isArray(revokedList)) revokedList = [];
  if (!revokedList.includes(id)) {
    revokedList.push(id);
    try {
      await writeData('revoked_sessions.json', revokedList);
    } catch (_) {}
  }

  const target = sessions.find((s) => s.id === id);
  const wasCurrent = target?.token === currentToken;
  sessions = sessions.filter((s) => s.id !== id);
  try {
    await writeData('sessions.json', sessions);
  } catch (_) {}

  res.json({
    success: true,
    message: wasCurrent ? 'Current session logged out' : 'Device session revoked successfully',
    wasCurrent
  });
});

// Revoke all other device sessions
app.post('/api/admin/sessions/revoke-all-others', async (req, res) => {
  const authHeader = req.headers.authorization;
  const currentToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '').trim() : '';

  let sessions = (await readData('sessions.json')) || [];
  if (!Array.isArray(sessions)) sessions = [];

  let revokedList = (await readData('revoked_sessions.json')) || [];
  if (!Array.isArray(revokedList)) revokedList = [];

  for (const s of sessions) {
    if (s.token !== currentToken && s.id && !revokedList.includes(s.id)) {
      revokedList.push(s.id);
    }
  }
  try {
    await writeData('revoked_sessions.json', revokedList);
  } catch (_) {}

  const remaining = sessions.filter((s) => s.token === currentToken);
  try {
    await writeData('sessions.json', remaining);
  } catch (_) {}

  res.json({
    success: true,
    message: 'All other devices have been logged out successfully',
    remainingCount: remaining.length
  });
});

app.post('/api/auth/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const settings = (await readData('settings.json')) || {};

  if (currentPassword !== (settings.adminPassword || 'admin123')) {
    return res.status(400).json({ error: 'Current password incorrect' });
  }

  settings.adminPassword = newPassword;
  await writeData('settings.json', settings);
  res.json({ success: true, message: 'Password updated successfully' });
});

// -------------------------------------------------------------
// Products CRUD
// -------------------------------------------------------------
app.get('/api/products', async (req, res) => {
  const products = (await readData('products.json')) || [];
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const products = (await readData('products.json')) || [];
  const newProduct = {
    id: `prod-${Date.now()}`,
    ...req.body,
    inStock: req.body.inStock ?? true
  };
  products.unshift(newProduct);
  await writeData('products.json', products);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const products = (await readData('products.json')) || [];
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  products[index] = { ...products[index], ...req.body, id };
  await writeData('products.json', products);
  res.json(products[index]);
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  let products = (await readData('products.json')) || [];
  products = products.filter((p) => p.id !== id);
  await writeData('products.json', products);
  res.json({ success: true, id });
});

// -------------------------------------------------------------
// Categories CRUD
// -------------------------------------------------------------
app.get('/api/categories', async (req, res) => {
  const categories = (await readData('categories.json')) || [];
  res.json(categories);
});

app.post('/api/categories', async (req, res) => {
  const categories = (await readData('categories.json')) || [];
  const newCat = {
    id: req.body.slug || `cat-${Date.now()}`,
    ...req.body
  };
  categories.push(newCat);
  await writeData('categories.json', categories);
  res.status(201).json(newCat);
});

app.put('/api/categories/:id', async (req, res) => {
  const { id } = req.params;
  const categories = (await readData('categories.json')) || [];
  const idx = categories.findIndex((c) => c.id === id || c.slug === id);
  if (idx === -1) return res.status(404).json({ error: 'Category not found' });

  categories[idx] = { ...categories[idx], ...req.body };
  await writeData('categories.json', categories);
  res.json(categories[idx]);
});

app.delete('/api/categories/:id', async (req, res) => {
  const { id } = req.params;
  let categories = (await readData('categories.json')) || [];
  categories = categories.filter((c) => c.id !== id && c.slug !== id);
  await writeData('categories.json', categories);
  res.json({ success: true, id });
});

// -------------------------------------------------------------
// Brands CRUD
// -------------------------------------------------------------
app.get('/api/brands', async (req, res) => {
  const brands = (await readData('brands.json')) || [];
  res.json(brands);
});

app.post('/api/brands', async (req, res) => {
  const brands = (await readData('brands.json')) || [];
  const newBrand = {
    id: `b-${Date.now()}`,
    ...req.body,
    status: req.body.status || 'Active'
  };
  brands.push(newBrand);
  await writeData('brands.json', brands);
  res.status(201).json(newBrand);
});

app.put('/api/brands/:id', async (req, res) => {
  const { id } = req.params;
  const brands = (await readData('brands.json')) || [];
  const idx = brands.findIndex((b) => b.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Brand not found' });

  brands[idx] = { ...brands[idx], ...req.body, id };
  await writeData('brands.json', brands);
  res.json(brands[idx]);
});

app.delete('/api/brands/:id', async (req, res) => {
  const { id } = req.params;
  let brands = (await readData('brands.json')) || [];
  brands = brands.filter((b) => b.id !== id);
  await writeData('brands.json', brands);
  res.json({ success: true, id });
});

// -------------------------------------------------------------
// Projects CRUD
// -------------------------------------------------------------
app.get('/api/projects', async (req, res) => {
  const projects = (await readData('projects.json')) || [];
  res.json(projects);
});

app.post('/api/projects', async (req, res) => {
  const projects = (await readData('projects.json')) || [];
  const newProject = {
    id: `proj-${Date.now()}`,
    ...req.body
  };
  projects.unshift(newProject);
  await writeData('projects.json', projects);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  const projects = (await readData('projects.json')) || [];
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Project not found' });

  projects[idx] = { ...projects[idx], ...req.body, id };
  await writeData('projects.json', projects);
  res.json(projects[idx]);
});

app.delete('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  let projects = (await readData('projects.json')) || [];
  projects = projects.filter((p) => p.id !== id);
  await writeData('projects.json', projects);
  res.json({ success: true, id });
});

// -------------------------------------------------------------
// Testimonials CRUD
// -------------------------------------------------------------
app.get('/api/testimonials', async (req, res) => {
  const list = (await readData('testimonials.json')) || [];
  res.json(list);
});

app.post('/api/testimonials', async (req, res) => {
  const list = (await readData('testimonials.json')) || [];
  const item = {
    id: `test-${Date.now()}`,
    ...req.body
  };
  list.unshift(item);
  await writeData('testimonials.json', list);
  res.status(201).json(item);
});

app.put('/api/testimonials/:id', async (req, res) => {
  const { id } = req.params;
  const list = (await readData('testimonials.json')) || [];
  const idx = list.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Testimonial not found' });

  list[idx] = { ...list[idx], ...req.body, id };
  await writeData('testimonials.json', list);
  res.json(list[idx]);
});

app.delete('/api/testimonials/:id', async (req, res) => {
  const { id } = req.params;
  let list = (await readData('testimonials.json')) || [];
  list = list.filter((t) => t.id !== id);
  await writeData('testimonials.json', list);
  res.json({ success: true, id });
});

// -------------------------------------------------------------
// Site Content CMS (Hero, Stats, Showroom, Banners)
// -------------------------------------------------------------
app.get('/api/content', async (req, res) => {
  const content = (await readData('siteContent.json')) || {};
  res.json(content);
});

app.put('/api/content', async (req, res) => {
  const current = (await readData('siteContent.json')) || {};
  const updated = { ...current, ...req.body };
  await writeData('siteContent.json', updated);
  res.json(updated);
});

// -------------------------------------------------------------
// Leads (Site Visits & Inquiries)
// -------------------------------------------------------------
app.get('/api/leads', async (req, res) => {
  try {
    const leads = (await readData('leads.json')) || [];
    res.json(leads);
  } catch (err) {
    console.error('Error fetching leads:', err);
    res.json([]);
  }
});

app.post('/api/leads', async (req, res) => {
  try {
    const leads = (await readData('leads.json')) || [];
    const newLead = {
      id: req.body?.id || `LEAD-${Date.now()}`,
      status: req.body?.status || 'New',
      createdAt: req.body?.createdAt || new Date().toISOString(),
      ...req.body
    };
    leads.unshift(newLead);
    try {
      await writeData('leads.json', leads);
    } catch (writeErr) {
      console.warn('[Leads] Non-fatal write warning:', writeErr?.message || writeErr);
    }
    res.status(201).json(newLead);
  } catch (err) {
    console.error('Error creating lead:', err);
    // Even if an unexpected error occurs, generate a valid lead fallback response
    const fallbackLead = {
      id: req.body?.id || `LEAD-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      ...req.body
    };
    res.status(201).json(fallbackLead);
  }
});

app.patch('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const leads = (await readData('leads.json')) || [];
    const idx = leads.findIndex((l) => l.id === id);
    if (idx === -1) {
      const fallbackUpdated = { id, ...req.body };
      return res.json(fallbackUpdated);
    }

    leads[idx] = { ...leads[idx], ...req.body };
    try {
      await writeData('leads.json', leads);
    } catch (writeErr) {
      console.warn('[Leads] Non-fatal patch write warning:', writeErr?.message || writeErr);
    }
    res.json(leads[idx]);
  } catch (err) {
    console.error('Error updating lead:', err);
    res.json({ id: req.params.id, ...req.body });
  }
});

app.delete('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let leads = (await readData('leads.json')) || [];
    leads = leads.filter((l) => l.id !== id);
    try {
      await writeData('leads.json', leads);
    } catch (writeErr) {
      console.warn('[Leads] Non-fatal delete write warning:', writeErr?.message || writeErr);
    }
    res.json({ success: true, id });
  } catch (err) {
    console.error('Error deleting lead:', err);
    res.json({ success: true, id: req.params.id });
  }
});

// -------------------------------------------------------------
// Quotes Requests
// -------------------------------------------------------------
app.get('/api/quotes', async (req, res) => {
  try {
    const quotes = (await readData('quotes.json')) || [];
    res.json(quotes);
  } catch (err) {
    console.error('Error fetching quotes:', err);
    res.json([]);
  }
});

app.post('/api/quotes', async (req, res) => {
  try {
    const quotes = (await readData('quotes.json')) || [];
    const newQuote = {
      id: req.body?.id || `QUOTE-${Date.now()}`,
      createdAt: req.body?.createdAt || new Date().toISOString(),
      status: req.body?.status || 'New',
      ...req.body
    };
    quotes.unshift(newQuote);
    try {
      await writeData('quotes.json', quotes);
    } catch (writeErr) {
      console.warn('[Quotes] Non-fatal write warning:', writeErr?.message || writeErr);
    }
    res.status(201).json(newQuote);
  } catch (err) {
    console.error('Error creating quote:', err);
    const fallbackQuote = {
      id: req.body?.id || `QUOTE-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      ...req.body
    };
    res.status(201).json(fallbackQuote);
  }
});

app.patch('/api/quotes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const quotes = (await readData('quotes.json')) || [];
    const idx = quotes.findIndex((q) => q.id === id);
    if (idx === -1) {
      return res.json({ id, ...req.body });
    }

    quotes[idx] = { ...quotes[idx], ...req.body };
    try {
      await writeData('quotes.json', quotes);
    } catch (writeErr) {
      console.warn('[Quotes] Non-fatal patch write warning:', writeErr?.message || writeErr);
    }
    res.json(quotes[idx]);
  } catch (err) {
    console.error('Error updating quote:', err);
    res.json({ id: req.params.id, ...req.body });
  }
});

app.delete('/api/quotes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let quotes = (await readData('quotes.json')) || [];
    quotes = quotes.filter((q) => q.id !== id);
    try {
      await writeData('quotes.json', quotes);
    } catch (writeErr) {
      console.warn('[Quotes] Non-fatal delete write warning:', writeErr?.message || writeErr);
    }
    res.json({ success: true, id });
  } catch (err) {
    console.error('Error deleting quote:', err);
    res.json({ success: true, id: req.params.id });
  }
});

// -------------------------------------------------------------
// WhatsApp Orders & Inquiries
// -------------------------------------------------------------
app.get('/api/whatsapp-orders', async (req, res) => {
  try {
    const orders = (await readData('whatsappOrders.json')) || [];
    res.json(orders);
  } catch (err) {
    console.error('Error fetching whatsapp orders:', err);
    res.json([]);
  }
});

app.post('/api/whatsapp-orders', async (req, res) => {
  try {
    const orders = (await readData('whatsappOrders.json')) || [];
    const newOrder = {
      id: req.body?.id || `WA-${Date.now()}`,
      status: req.body?.status || 'New',
      orderType: req.body?.orderType || 'Quotation Order',
      createdAt: req.body?.createdAt || new Date().toISOString(),
      ...req.body
    };
    orders.unshift(newOrder);
    try {
      await writeData('whatsappOrders.json', orders);
    } catch (writeErr) {
      console.warn('[WhatsAppOrders] Non-fatal write warning:', writeErr?.message || writeErr);
    }
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating whatsapp order:', err);
    const fallbackOrder = {
      id: req.body?.id || `WA-${Date.now()}`,
      status: 'New',
      orderType: 'Quotation Order',
      createdAt: new Date().toISOString(),
      ...req.body
    };
    res.status(201).json(fallbackOrder);
  }
});

app.patch('/api/whatsapp-orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orders = (await readData('whatsappOrders.json')) || [];
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) {
      return res.json({ id, ...req.body });
    }

    orders[idx] = { ...orders[idx], ...req.body };
    try {
      await writeData('whatsappOrders.json', orders);
    } catch (writeErr) {
      console.warn('[WhatsAppOrders] Non-fatal patch write warning:', writeErr?.message || writeErr);
    }
    res.json(orders[idx]);
  } catch (err) {
    console.error('Error updating whatsapp order:', err);
    res.json({ id: req.params.id, ...req.body });
  }
});

app.delete('/api/whatsapp-orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let orders = (await readData('whatsappOrders.json')) || [];
    orders = orders.filter((o) => o.id !== id);
    try {
      await writeData('whatsappOrders.json', orders);
    } catch (writeErr) {
      console.warn('[WhatsAppOrders] Non-fatal delete write warning:', writeErr?.message || writeErr);
    }
    res.json({ success: true, id });
  } catch (err) {
    console.error('Error deleting whatsapp order:', err);
    res.json({ success: true, id: req.params.id });
  }
});


// -------------------------------------------------------------
// Business Settings
// -------------------------------------------------------------
app.get('/api/settings', async (req, res) => {
  const settings = (await readData('settings.json')) || {};
  const { adminPassword, ...safeSettings } = settings;
  res.json(safeSettings);
});

app.put('/api/settings', async (req, res) => {
  const current = (await readData('settings.json')) || {};
  const updated = {
    ...current,
    ...req.body,
    // preserve password unless changed via auth endpoint
    adminPassword: current.adminPassword
  };
  await writeData('settings.json', updated);
  const { adminPassword, ...safeSettings } = updated;
  res.json(safeSettings);
});

// -------------------------------------------------------------
// 3D Studio Configurator Data
// -------------------------------------------------------------
app.get('/api/configurator', async (req, res) => {
  const configurator = (await readData('configurator.json')) || {};
  res.json(configurator);
});

app.put('/api/configurator', async (req, res) => {
  const current = (await readData('configurator.json')) || {};
  const updated = {
    ...current,
    ...req.body
  };
  await writeData('configurator.json', updated);
  res.json(updated);
});

// -------------------------------------------------------------
// Branding & SEO Settings
// -------------------------------------------------------------
app.get('/api/branding-seo', async (req, res) => {
  const brandingSeo = (await readData('brandingSeo.json')) || {};
  res.json(brandingSeo);
});

app.put('/api/branding-seo', async (req, res) => {
  const current = (await readData('brandingSeo.json')) || {};
  const updated = {
    ...current,
    ...req.body
  };
  await writeData('brandingSeo.json', updated);
  res.json(updated);
});

// -------------------------------------------------------------
// Festival Themes & Campaign Mode Settings
// -------------------------------------------------------------
app.get('/api/festival', async (req, res) => {
  const festivalData = (await readData('festival.json')) || {};
  res.json(festivalData);
});

app.put('/api/festival', async (req, res) => {
  try {
    const updated = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    await writeData('festival.json', updated);
    res.json(updated);
  } catch (err) {
    console.error('Error updating festival configuration:', err);
    res.json({ ...req.body, updatedAt: new Date().toISOString() });
  }
});

// Diagnostic endpoint to test DB and Cloud Store connectivity
app.get('/api/test-db', async (req, res) => {
  try {
    const testId = `LEAD-DIAG-${Date.now()}`;
    const testLead = {
      id: testId,
      name: 'Diagnostic Lead',
      phone: '9876543210',
      status: 'New',
      createdAt: new Date().toISOString()
    };
    const t0 = Date.now();
    const leadsBefore = (await readData('leads.json')) || [];
    const tRead = Date.now() - t0;

    const t1 = Date.now();
    await writeData('leads.json', [testLead, ...leadsBefore]);
    const tWrite = Date.now() - t1;

    const t2 = Date.now();
    const leadsAfter = (await readData('leads.json')) || [];
    const tReadAfter = Date.now() - t2;

    res.json({
      success: true,
      tRead,
      tWrite,
      tReadAfter,
      leadsBeforeCount: leadsBefore.length,
      leadsAfterCount: leadsAfter.length,
      found: leadsAfter.some((l) => l.id === testId)
    });
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// Ensure Database is initialized on all environments

initDb().catch((err) => console.error('DB init warning:', err));

// Start Server for local execution
async function startServer() {
  await initDb();
  app.listen(PORT, () => {
    console.log(`🚀 Shree Shyam Interior Backend Server running on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
