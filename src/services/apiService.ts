import { Product, ProductCategory } from '../types/product';
import initialProducts from '../data/products.json';
import initialCategories from '../data/categories.json';
import initialProjects from '../data/projects.json';
import initialTestimonials from '../data/testimonials.json';

const API_BASE = '/api';
const TOKEN_KEY = 'ssi_admin_auth_token';

// Types
export interface Brand {
  id: string;
  name: string;
  displayName?: string;
  category: string;
  origin?: string;
  logo?: string;
  tagline?: string;
  status: 'Active' | 'Inactive';
  order?: number;
  lightClass?: string;
  darkClass?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  client: string;
  area: string;
  budget: string;
  completionDate: string;
  coverImage: string;
  gallery: string[];
  beforeImage?: string;
  afterImage?: string;
  description: string;
  scope: string[];
  materialsUsed: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  project: string;
  rating: number;
  review: string;
  avatar: string;
  date: string;
  status?: 'Approved' | 'Hidden';
}

export interface SiteContent {
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    backgroundImage: string;
  };
  stats: Array<{
    label: string;
    value: string;
    subtext: string;
  }>;
  siteVisitBanner: {
    title: string;
    description: string;
    consultantName: string;
    consultantTitle: string;
    consultantPhoto: string;
    checkpoints: string[];
  };
  showroom: {
    name: string;
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
    timings: string;
    mapCoordinates: string;
    image: string;
  };
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  date?: string;
  slot?: string;
  roomType?: string;
  budget?: string;
  notes?: string;
  status: 'New' | 'Contacted' | 'Visit Scheduled' | 'Quotation Shared' | 'In Progress' | 'Completed' | 'Cancelled';
  createdAt: string;
  adminNotes?: string;
}

export interface QuoteRequest {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  city?: string;
  items: any[];
  totalAmount: number;
  notes?: string;
  createdAt: string;
}

export interface BusinessSettings {
  businessName: string;
  gstNumber: string;
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  address: string;
}

export interface WallFinish {
  id: string;
  name: string;
  category: string;
  brand: string;
  hex: string;
  threeColor: number;
  cost: number;
  description: string;
}

export interface CabinetFinish {
  id: string;
  name: string;
  category: string;
  brand: string;
  hex: string;
  threeColor: number;
  metalness: number;
  roughness: number;
  cost: number;
  description: string;
}

export interface FlooringFinish {
  id: string;
  name: string;
  category: string;
  brand: string;
  hex: string;
  threeColor: number;
  roughness: number;
  cost: number;
  description: string;
}

export interface LightingMood {
  id: string;
  name: string;
  coveColor: number;
  ambientColor: number;
  ambientIntensity?: number;
  cost: number;
  description: string;
}

export interface HardwarePackage {
  id: string;
  name: string;
  brand: string;
  cost: number;
  description: string;
}

export interface ConfiguratorData {
  wallFinishes: WallFinish[];
  cabinetFinishes: CabinetFinish[];
  flooringFinishes: FlooringFinish[];
  lightingMoods: LightingMood[];
  hardwarePackages: HardwarePackage[];
  roomSubstrates: {
    kitchen: number;
    bedroom: number;
    living: number;
    bathroom: number;
    office: number;
    [key: string]: number;
  };
  laborRatePercentage: number;
}

export interface BrandingSEOData {
  logo: {
    type: 'text' | 'image' | 'both';
    text: string;
    tagline: string;
    imageUrl: string;
    faviconUrl?: string;
  };
  announcement: {
    enabled: boolean;
    badge: string;
    text: string;
    link: string;
    linkLabel: string;
  };
  seo: {
    siteTitle: string;
    tagline: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
    canonicalUrl?: string;
    googleAnalyticsId?: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
    whatsapp: string;
    email: string;
  };
  footer: {
    aboutText: string;
    copyrightText: string;
    address: string;
  };
}

const fallbackBrandingSEO: BrandingSEOData = {
  logo: {
    type: 'text',
    text: 'Shree Shyam',
    tagline: 'INTERIOR',
    imageUrl: '',
    faviconUrl: '/vite.svg'
  },
  announcement: {
    enabled: true,
    badge: 'LIMITED OFFER',
    text: '🎉 Special Festive Offer: Free In-Person Site Visit & 3D Estimation in Sikar & Jaipur!',
    link: '/site-visit',
    linkLabel: 'Book Free Visit →'
  },
  seo: {
    siteTitle: 'Shree Shyam Interior | Architectural Materials & Turnkey Design in Sikar, Rajasthan',
    tagline: "Sikar's Premier Interior Studio & Authentic Materials",
    metaDescription: "Rajasthan's trusted turnkey interior atelier. 100% genuine CenturyPly, Hettich, Häfele, and Asian Paints. Custom modular kitchens, 3D interactive studio visualizer, and free site visits.",
    keywords: "Interior Design Sikar, Shree Shyam Interior, Modular Kitchen Sikar, Century Plywood dealer Rajasthan, Hettich hardware Sikar, Turnkey Interior Designer Jaipur",
    ogImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    canonicalUrl: "https://shreeshyaminterior.com",
    googleAnalyticsId: ""
  },
  socialLinks: {
    instagram: "https://instagram.com/shreeshyaminterior",
    facebook: "https://facebook.com/shreeshyaminterior",
    youtube: "https://youtube.com/@shreeshyaminterior",
    whatsapp: "+91 98765 43210",
    email: "maheshkumarsaini8769@gmail.com"
  },
  footer: {
    aboutText: "Shree Shyam Interior is Sikar and Jaipur's premier turnkey interior design atelier and authorized distributor of leading European and Indian building materials.",
    copyrightText: "© 2026 Shree Shyam Interior. All rights reserved. Masterfully crafted in Rajasthan.",
    address: "Piprali Road, Near Railway Overbridge, Sikar, Rajasthan - 332001"
  }
};

const fallbackConfigurator: ConfiguratorData = {
  wallFinishes: [
    { id: "royale-chalk", name: "Royale Chalk White", category: "Luxury Emulsion Paint", brand: "Asian Paints Royale", hex: "#F6F5F0", threeColor: 0xf6f5f0, cost: 4500, description: "Smooth washable matte luxury emulsion with Teflon surface protection." },
    { id: "royale-emerald", name: "Royal Emerald Noir", category: "Luxury Emulsion Paint", brand: "Asian Paints Royale", hex: "#1B352F", threeColor: 0x1b352f, cost: 5800, description: "Deep jewel-toned accent wall giving rich contrast and opulence." },
    { id: "fluted-teak", name: "Fluted Teak Wood Louvers", category: "Architectural Wall Cladding", brand: "CenturyPly + Solid Teak", hex: "#8C5831", threeColor: 0x8c5831, cost: 36000, description: "Bespoke vertical fluted teakwood louvers on 710 BWP marine ply backing with PU polish." },
    { id: "italian-statuario", name: "Bookmatched Italian Statuario", category: "Natural Marble Paneling", brand: "Imported Italian Slab", hex: "#ECECEE", threeColor: 0xececee, cost: 54000, description: "Seamless continuous vein Italian marble wall with concealed structural cleats." }
  ],
  cabinetFinishes: [
    { id: "acrylic-white", name: "High-Gloss HD Acrylic", category: "High-Gloss Acrylic", brand: "Greenlam / Merino HD", hex: "#FFFFFF", threeColor: 0xfafafa, metalness: 0.1, roughness: 0.1, cost: 28500, description: "Scratch-resistant 1.5mm mirror-finish acrylic over CenturyPly 710 marine ply core." },
    { id: "walnut-veneer", name: "Smoked Walnut Wood Veneer", category: "Natural Timber Veneer", brand: "Century Natural Veneers", hex: "#4A3425", threeColor: 0x4a3425, metalness: 0.05, roughness: 0.55, cost: 38000, description: "Natural hand-matched walnut veneer buffed with matte Italian PU coating." }
  ],
  flooringFinishes: [
    { id: "vitrified-mirror", name: "High-Gloss Vitrified Mirror Tiles", category: "Vitrified Slab", brand: "Kajaria / Somany GVT", hex: "#E2DFD8", threeColor: 0xe2dfd8, roughness: 0.15, cost: 18500, description: "4ft x 2ft large format nano-polished vitrified tiles with epoxy grouting." },
    { id: "italian-marble", name: "Imported Statuario Italian Marble", category: "Natural Marble Flooring", brand: "Imported Marble", hex: "#ECECEE", threeColor: 0xedeef2, roughness: 0.08, cost: 72000, description: "Diamond mirror polished Italian marble with crystalline epoxy slurry treatment." }
  ],
  lightingMoods: [
    { id: "warm-3000k", name: "Warm 3000K Cove & Accent Halo", coveColor: 0xffaa44, ambientColor: 0xfff0dd, ambientIntensity: 0.8, cost: 14500, description: "Cozy golden 3000K false ceiling cove LED strips + magnetic track downlights." },
    { id: "daylight-4000k", name: "Natural Daylight 4000K Architectural", coveColor: 0xffeedd, ambientColor: 0xffffff, ambientIntensity: 1.05, cost: 12800, description: "Crisp neutral 4000K glare-free spotlights illuminating true architectural colors." }
  ],
  hardwarePackages: [
    { id: "hafele-premium", name: "Häfele Matrix Box Soft-Close System", brand: "Häfele Germany", cost: 9500, description: "Heavy-duty 35kg tandem drawers with hydraulic soft-close damping and 3D door hinges." },
    { id: "hettich-sensys", name: "Hettich Sensys 8645i + InnoTech Atira", brand: "Hettich Germany", cost: 11500, description: "Silent System integrated damping hinges with double-walled InnoTech Atira soft-closing drawer runners." }
  ],
  roomSubstrates: {
    kitchen: 42000,
    bedroom: 38000,
    living: 34000,
    bathroom: 26000,
    office: 36000
  },
  laborRatePercentage: 18
};

// Fallback Brand Seed
const initialBrands: Brand[] = [
  { id: 'b-greenlam', name: 'Greenlam', displayName: 'Greenlam', category: 'Laminates', lightClass: 'text-[#1B7A41]', darkClass: 'dark:text-[#34D399]', status: 'Active' },
  { id: 'b-centuryply', name: 'CenturyPly', displayName: 'CENTURYPLY', category: 'Plywood', lightClass: 'text-[#E31E24]', darkClass: 'dark:text-[#FF5252]', status: 'Active' },
  { id: 'b-asianpaints', name: 'Asian Paints', displayName: 'asianpaints', category: 'Royale Paints', lightClass: 'text-[#6A2A82]', darkClass: 'dark:text-[#C084FC]', status: 'Active' },
  { id: 'b-hettich', name: 'Hettich', displayName: 'Hettich', category: 'German Fittings', lightClass: 'text-[#00509B]', darkClass: 'dark:text-white dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]', status: 'Active' },
  { id: 'b-havells', name: 'Havells', displayName: 'HAVELLS', category: 'Lighting & Smart', lightClass: 'text-[#ED1C24]', darkClass: 'dark:text-[#FF6B6B]', status: 'Active' },
  { id: 'b-legrand', name: 'Legrand', displayName: 'legrand', category: 'Modular Switches', lightClass: 'text-[#E20613]', darkClass: 'dark:text-[#FF6B6B]', status: 'Active' },
  { id: 'b-fevicol', name: 'Fevicol', displayName: 'FEVICOL', category: 'Adhesives', lightClass: 'text-[#1F3C88]', darkClass: 'dark:text-[#60A5FA]', status: 'Active' },
  { id: 'b-3m', name: '3M', displayName: '3M', category: 'Architectural Films', lightClass: 'text-[#D32F2F]', darkClass: 'dark:text-[#FF6B6B]', status: 'Active' }
];

// Fallback Default Content
const initialContent: SiteContent = {
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

// Helper fetch wrapper
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>)
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Network request failed' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export const apiService = {
  // Auth
  async login(username: string, password: string) {
    const data = await apiFetch<{ success: boolean; token: string; user: { username: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
    return data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  async verifyAuth(): Promise<boolean> {
    try {
      const data = await apiFetch<{ valid: boolean }>('/auth/verify');
      return !!data.valid;
    } catch {
      return false;
    }
  },

  async changePassword(currentPassword: string, newPassword: string) {
    return apiFetch<{ success: boolean; message: string }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword })
    });
  },

  // Image Uploads
  async uploadImage(fileOrBase64: File | string): Promise<string> {
    if (typeof fileOrBase64 === 'string') {
      const res = await apiFetch<{ success: boolean; url: string }>('/upload', {
        method: 'POST',
        body: JSON.stringify({ base64: fileOrBase64 })
      });
      return res.url;
    } else {
      const formData = new FormData();
      formData.append('image', fileOrBase64);
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY) || ''}`
        },
        body: formData
      });
      const data = await res.json();
      if (!data.url) throw new Error(data.error || 'Upload failed');
      return data.url;
    }
  },

  // Products
  async getProducts(): Promise<Product[]> {
    try {
      return await apiFetch<Product[]>('/products');
    } catch (e) {
      console.warn('API /products failed, falling back to local dataset', e);
      return initialProducts as unknown as Product[];
    }
  },

  async createProduct(product: Partial<Product>): Promise<Product> {
    return apiFetch<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product)
    });
  },

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return apiFetch<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product)
    });
  },

  async deleteProduct(id: string): Promise<{ success: boolean; id: string }> {
    return apiFetch<{ success: boolean; id: string }>(`/products/${id}`, {
      method: 'DELETE'
    });
  },

  // Categories
  async getCategories(): Promise<ProductCategory[]> {
    try {
      return await apiFetch<ProductCategory[]>('/categories');
    } catch (e) {
      return initialCategories as unknown as ProductCategory[];
    }
  },

  async createCategory(cat: Partial<ProductCategory>): Promise<ProductCategory> {
    return apiFetch<ProductCategory>('/categories', {
      method: 'POST',
      body: JSON.stringify(cat)
    });
  },

  async updateCategory(id: string, cat: Partial<ProductCategory>): Promise<ProductCategory> {
    return apiFetch<ProductCategory>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cat)
    });
  },

  async deleteCategory(id: string): Promise<{ success: boolean; id: string }> {
    return apiFetch<{ success: boolean; id: string }>(`/categories/${id}`, {
      method: 'DELETE'
    });
  },

  // Brands
  async getBrands(): Promise<Brand[]> {
    try {
      return await apiFetch<Brand[]>('/brands');
    } catch (e) {
      return initialBrands;
    }
  },

  async createBrand(brand: Partial<Brand>): Promise<Brand> {
    return apiFetch<Brand>('/brands', {
      method: 'POST',
      body: JSON.stringify(brand)
    });
  },

  async updateBrand(id: string, brand: Partial<Brand>): Promise<Brand> {
    return apiFetch<Brand>(`/brands/${id}`, {
      method: 'PUT',
      body: JSON.stringify(brand)
    });
  },

  async deleteBrand(id: string): Promise<{ success: boolean; id: string }> {
    return apiFetch<{ success: boolean; id: string }>(`/brands/${id}`, {
      method: 'DELETE'
    });
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      return await apiFetch<Project[]>('/projects');
    } catch (e) {
      return initialProjects as unknown as Project[];
    }
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    return apiFetch<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    });
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    return apiFetch<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project)
    });
  },

  async deleteProject(id: string): Promise<{ success: boolean; id: string }> {
    return apiFetch<{ success: boolean; id: string }>(`/projects/${id}`, {
      method: 'DELETE'
    });
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      return await apiFetch<Testimonial[]>('/testimonials');
    } catch (e) {
      return initialTestimonials as unknown as Testimonial[];
    }
  },

  async createTestimonial(t: Partial<Testimonial>): Promise<Testimonial> {
    return apiFetch<Testimonial>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(t)
    });
  },

  async updateTestimonial(id: string, t: Partial<Testimonial>): Promise<Testimonial> {
    return apiFetch<Testimonial>(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(t)
    });
  },

  async deleteTestimonial(id: string): Promise<{ success: boolean; id: string }> {
    return apiFetch<{ success: boolean; id: string }>(`/testimonials/${id}`, {
      method: 'DELETE'
    });
  },

  // Site Content CMS
  async getSiteContent(): Promise<SiteContent> {
    try {
      return await apiFetch<SiteContent>('/content');
    } catch (e) {
      return initialContent;
    }
  },

  async updateSiteContent(content: Partial<SiteContent>): Promise<SiteContent> {
    return apiFetch<SiteContent>('/content', {
      method: 'PUT',
      body: JSON.stringify(content)
    });
  },

  // Leads
  async getLeads(): Promise<Lead[]> {
    try {
      return await apiFetch<Lead[]>('/leads');
    } catch {
      return [];
    }
  },

  async submitLead(lead: Omit<Lead, 'id' | 'status' | 'createdAt'>): Promise<Lead> {
    try {
      return await apiFetch<Lead>('/leads', {
        method: 'POST',
        body: JSON.stringify(lead)
      });
    } catch {
      // Fallback to local storage if API down
      const fallbackLead: Lead = {
        ...lead,
        id: `LEAD-${Date.now()}`,
        status: 'New',
        createdAt: new Date().toISOString()
      };
      const raw = localStorage.getItem('ssi_site_visits');
      const list = raw ? JSON.parse(raw) : [];
      localStorage.setItem('ssi_site_visits', JSON.stringify([fallbackLead, ...list]));
      return fallbackLead;
    }
  },

  async updateLeadStatus(id: string, updates: Partial<Lead>): Promise<Lead> {
    return apiFetch<Lead>(`/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  },

  async deleteLead(id: string): Promise<{ success: boolean; id: string }> {
    return apiFetch<{ success: boolean; id: string }>(`/leads/${id}`, {
      method: 'DELETE'
    });
  },

  // Quotes
  async getQuotes(): Promise<QuoteRequest[]> {
    try {
      return await apiFetch<QuoteRequest[]>('/quotes');
    } catch {
      return [];
    }
  },

  async submitQuote(quote: Omit<QuoteRequest, 'id' | 'createdAt'>): Promise<QuoteRequest> {
    return apiFetch<QuoteRequest>('/quotes', {
      method: 'POST',
      body: JSON.stringify(quote)
    });
  },

  async deleteQuote(id: string): Promise<{ success: boolean; id: string }> {
    return apiFetch<{ success: boolean; id: string }>(`/quotes/${id}`, {
      method: 'DELETE'
    });
  },

  // Settings
  async getSettings(): Promise<BusinessSettings> {
    try {
      return await apiFetch<BusinessSettings>('/settings');
    } catch {
      return {
        businessName: 'Shree Shyam Interior',
        gstNumber: '08AAAAA0000A1Z5',
        primaryPhone: '+91 98765 43210',
        whatsappNumber: '+91 98765 43210',
        email: 'contact@shreeshyaminterior.com',
        address: 'Piprali Road, Sikar, Rajasthan - 332001'
      };
    }
  },

  async updateSettings(settings: Partial<BusinessSettings>): Promise<BusinessSettings> {
    return apiFetch<BusinessSettings>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  },

  // 3D Studio Configurator Finishes & Pricing
  async getConfigurator(): Promise<ConfiguratorData> {
    try {
      return await apiFetch<ConfiguratorData>('/configurator');
    } catch {
      return fallbackConfigurator;
    }
  },

  async updateConfigurator(data: ConfiguratorData): Promise<ConfiguratorData> {
    return apiFetch<ConfiguratorData>('/configurator', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Branding, Logo & SEO
  async getBrandingSEO(): Promise<BrandingSEOData> {
    try {
      return await apiFetch<BrandingSEOData>('/branding-seo');
    } catch {
      return fallbackBrandingSEO;
    }
  },

  async updateBrandingSEO(data: BrandingSEOData): Promise<BrandingSEOData> {
    return apiFetch<BrandingSEOData>('/branding-seo', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
};

