import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const SRC_DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Ensure directories exist
export async function initDb() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  const files = [
    'products.json',
    'categories.json',
    'brands.json',
    'projects.json',
    'testimonials.json'
  ];

  for (const file of files) {
    const dest = path.join(DATA_DIR, file);
    try {
      await fs.access(dest);
    } catch {
      // Copy from src/data if exists
      const src = path.join(SRC_DATA_DIR, file);
      try {
        const content = await fs.readFile(src, 'utf-8');
        await fs.writeFile(dest, content, 'utf-8');
      } catch (err) {
        await fs.writeFile(dest, JSON.stringify([], null, 2), 'utf-8');
      }
    }
  }

  // Ensure siteContent.json exists
  const siteContentFile = path.join(DATA_DIR, 'siteContent.json');
  try {
    await fs.access(siteContentFile);
  } catch {
    const defaultSiteContent = {
      hero: {
        badge: "Sikar's Premier Interior Architecture Studio",
        titlePrefix: "Crafting Timeless Luxury Spaces with",
        titleHighlight: "Master Craftsmanship",
        subtitle: "Rajasthan's trusted turnkey interior atelier. Sourcing 100% genuine CenturyPly, Hettich, Häfele, and Asian Paints with itemized transparent pricing.",
        primaryCtaText: "Book Free Site Visit",
        primaryCtaLink: "/site-visit",
        secondaryCtaText: "Explore 3D Studio",
        secondaryCtaLink: "/design-ai",
        backgroundImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80"
      },
      stats: [
        { label: "Projects Completed", value: "500+", subtext: "Across Sikar, Jaipur & Shekhawati" },
        { label: "Years of Craftsmanship", value: "15+", subtext: "Since 2009 in Rajasthan" },
        { label: "Partner Brands", value: "100%", subtext: "Certified German & Indian Makers" },
        { label: "Client Satisfaction", value: "4.9★", subtext: "From 320+ verified home owners" }
      ],
      siteVisitBanner: {
        title: "Book a Free In-Person Site Visit in Sikar & Jaipur",
        description: "Our principal consultant visits your site with physical material catalogues, laser meters, and turnkey cost estimators—100% free with zero obligation.",
        consultantName: "Er. Rajesh Sharma",
        consultantTitle: "Principal Interior Architect & Estimator",
        consultantPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        checkpoints: [
          "Laser room dimension mapping & structural check",
          "Genuine plywood & laminate swatches presented on site",
          "Instant turnkey budget quotation in 24 hours",
          "Dedicated 3D space visualizer consultation"
        ]
      },
      showroom: {
        name: "Shree Shyam Interior Experience Center",
        address: "Piprali Road, Near Railway Overbridge, Sikar, Rajasthan - 332001",
        phone: "+91 98765 43210",
        whatsapp: "+91 98765 43210",
        email: "contact@shreeshyaminterior.com",
        timings: "Monday - Sunday: 9:30 AM to 8:30 PM",
        mapCoordinates: "27.6094, 75.1398",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
      }
    };
    await fs.writeFile(siteContentFile, JSON.stringify(defaultSiteContent, null, 2), 'utf-8');
  }

  // Ensure leads.json exists
  const leadsFile = path.join(DATA_DIR, 'leads.json');
  try {
    await fs.access(leadsFile);
  } catch {
    await fs.writeFile(leadsFile, JSON.stringify([], null, 2), 'utf-8');
  }

  // Ensure quotes.json exists
  const quotesFile = path.join(DATA_DIR, 'quotes.json');
  try {
    await fs.access(quotesFile);
  } catch {
    await fs.writeFile(quotesFile, JSON.stringify([], null, 2), 'utf-8');
  }

  // Ensure settings.json exists
  const settingsFile = path.join(DATA_DIR, 'settings.json');
  try {
    await fs.access(settingsFile);
  } catch {
    const defaultSettings = {
      adminEmail: 'maheshkumarsaini8769@gmail.com',
      adminUsername: 'maheshkumarsaini8769@gmail.com',
      adminPassword: 'mahesh99830',
      businessName: 'Shree Shyam Interior',
      gstNumber: '08AAAAA0000A1Z5',
      primaryPhone: '+91 98765 43210',
      whatsappNumber: '+91 98765 43210',
      email: 'maheshkumarsaini8769@gmail.com',
      address: 'Piprali Road, Sikar, Rajasthan - 332001'
    };
    await fs.writeFile(settingsFile, JSON.stringify(defaultSettings, null, 2), 'utf-8');
  }
}

export async function readData(fileName) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${fileName}:`, err);
    return null;
  }
}

export async function writeData(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
