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

// -------------------------------------------------------------
// Authentication Endpoints
// -------------------------------------------------------------
app.post('/api/auth/login', async (req, res) => {
  const { email, username, password } = req.body;
  const inputIdentifier = (email || username || '').trim().toLowerCase();
  const settings = (await readData('settings.json')) || {};

  const validEmail = (settings.adminEmail || settings.adminUsername || 'maheshkumarsaini8769@gmail.com').toLowerCase();
  const validPassword = settings.adminPassword || 'mahesh99830';

  if (inputIdentifier === validEmail && password === validPassword) {
    const token = `ssi_token_${Buffer.from(`${validEmail}:${Date.now()}`).toString('base64')}`;
    return res.json({
      success: true,
      token,
      user: { email: validEmail, username: validEmail }
    });
  }

  res.status(401).json({ success: false, error: 'Invalid email or password. Access restricted.' });
});

app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ssi_token_')) {
    return res.json({ valid: true });
  }
  res.status(401).json({ valid: false });
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
  const leads = (await readData('leads.json')) || [];
  res.json(leads);
});

app.post('/api/leads', async (req, res) => {
  const leads = (await readData('leads.json')) || [];
  const newLead = {
    id: `LEAD-${Date.now()}`,
    status: 'New',
    createdAt: new Date().toISOString(),
    ...req.body
  };
  leads.unshift(newLead);
  await writeData('leads.json', leads);
  res.status(201).json(newLead);
});

app.patch('/api/leads/:id', async (req, res) => {
  const { id } = req.params;
  const leads = (await readData('leads.json')) || [];
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Lead not found' });

  leads[idx] = { ...leads[idx], ...req.body };
  await writeData('leads.json', leads);
  res.json(leads[idx]);
});

app.delete('/api/leads/:id', async (req, res) => {
  const { id } = req.params;
  let leads = (await readData('leads.json')) || [];
  leads = leads.filter((l) => l.id !== id);
  await writeData('leads.json', leads);
  res.json({ success: true, id });
});

// -------------------------------------------------------------
// Quotes Requests
// -------------------------------------------------------------
app.get('/api/quotes', async (req, res) => {
  const quotes = (await readData('quotes.json')) || [];
  res.json(quotes);
});

app.post('/api/quotes', async (req, res) => {
  const quotes = (await readData('quotes.json')) || [];
  const newQuote = {
    id: `QUOTE-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...req.body
  };
  quotes.unshift(newQuote);
  await writeData('quotes.json', quotes);
  res.status(201).json(newQuote);
});

app.delete('/api/quotes/:id', async (req, res) => {
  const { id } = req.params;
  let quotes = (await readData('quotes.json')) || [];
  quotes = quotes.filter((q) => q.id !== id);
  await writeData('quotes.json', quotes);
  res.json({ success: true, id });
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

// Start Server
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
