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
  status?: 'Approved' | 'Hidden' | 'Pending';
  verifiedClient?: boolean;
  phone?: string;
  adminReply?: string;
  adminReplyDate?: string;
  createdAt?: string;
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
  status?: 'New' | 'Contacted' | 'Quotation Shared' | 'Converted' | 'Cancelled';
  notes?: string;
  createdAt: string;
}

export interface WhatsAppOrder {
  id: string;
  customerName: string;
  phone: string;
  orderType: 'Quotation Order' | 'Product Inquiry' | 'Site Consultation' | 'General Chat' | 'Custom Order';
  items?: any[];
  totalAmount?: number;
  city?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'In Discussion' | 'Order Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  notes?: string;
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
    googleMaps?: string;
    pinterest?: string;
    twitter?: string;
  };
  footer: {
    aboutText: string;
    copyrightText: string;
    address: string;
  };
}

export type FestivalType = 'normal' | 'diwali' | 'holi' | 'navratri' | 'newyear' | 'patriot' | 'custom';

export interface FestivalCampaignConfig {
  activeFestival: FestivalType;
  festivalName: string;
  badgeText: string;
  bannerText: string;
  greetingTitle: string;
  greetingSubtitle: string;
  couponCode: string;
  discountPercentage: number;
  highlightColor: string;
  enableAmbientEffects: boolean;
  enableSparklerTrail: boolean;
  showCountdownTimer: boolean;
  countdownEndDate?: string;
  showSurpriseGiftBox: boolean;
  surpriseGiftText?: string;
  showGreetingModal: boolean;
  autoSchedule: boolean;
  startDate?: string;
  endDate?: string;
  updatedAt?: string;
}

export const FESTIVAL_PRESETS: Record<FestivalType, FestivalCampaignConfig> = {
  normal: {
    activeFestival: 'normal',
    festivalName: 'Normal (Standard Luxury Days)',
    badgeText: 'SHOWROOM VISIT',
    bannerText: 'Book a 1-on-1 architect consultation in Sikar & get 3D layout rendering free.',
    greetingTitle: 'Welcome to Shree Shyam Interior',
    greetingSubtitle: "Rajasthan's premier turnkey luxury interior design atelier.",
    couponCode: '',
    discountPercentage: 0,
    highlightColor: '#B57731',
    enableAmbientEffects: false,
    enableSparklerTrail: false,
    showCountdownTimer: false,
    showSurpriseGiftBox: false,
    surpriseGiftText: '',
    showGreetingModal: false,
    autoSchedule: false
  },
  diwali: {
    activeFestival: 'diwali',
    festivalName: 'Diwali (दीपावली महोत्सव)',
    badgeText: '🪔 SHUBH DEEPAWALI OFFER',
    bannerText: 'Shubh Deepawali Special: Flat 15% OFF on Turnkey Interiors + Free 3D VR Walkthrough! Use code DIWALI2026',
    greetingTitle: '🪔 Shubh Deepawali from Shree Shyam Interior!',
    greetingSubtitle: 'May your home illuminate with master woodwork, luxury finishes, and everlasting prosperity.',
    couponCode: 'DIWALI2026',
    discountPercentage: 15,
    highlightColor: '#F59E0B',
    enableAmbientEffects: true,
    enableSparklerTrail: true,
    showCountdownTimer: true,
    countdownEndDate: '2026-11-15T23:59:59',
    showSurpriseGiftBox: true,
    surpriseGiftText: 'Free 3D Architectural VR Walkthrough + Material Swatch Kit',
    showGreetingModal: true,
    autoSchedule: false
  },
  holi: {
    activeFestival: 'holi',
    festivalName: 'Holi (रंगों का त्यौहार)',
    badgeText: '🎨 HOLI DHAMAKA',
    bannerText: 'Rangon Ka Tyohar Special: Complimentary German Soft-Close Hardware Upgrade on Kitchens! Use code HOLI2026',
    greetingTitle: '🎨 Happy & Colorful Holi!',
    greetingSubtitle: 'Add vibrant architectural colors, premium veneers, and durable finishes to your dream home.',
    couponCode: 'HOLI2026',
    discountPercentage: 12,
    highlightColor: '#EC4899',
    enableAmbientEffects: true,
    enableSparklerTrail: true,
    showCountdownTimer: true,
    countdownEndDate: '2026-03-25T23:59:59',
    showSurpriseGiftBox: true,
    surpriseGiftText: 'Free Häfele Matrix Drawer Soft-Close Upgrade',
    showGreetingModal: true,
    autoSchedule: false
  },
  navratri: {
    activeFestival: 'navratri',
    festivalName: 'Navratri & Dussehra (शुभ नवरात्रि)',
    badgeText: '✨ NAVRATRI UTSAV',
    bannerText: 'Auspicious Griha Pravesh Offers: Flat 10% OFF on Living & Puja Room Teakwood Paneling! Use code SHUBHLABH',
    greetingTitle: '✨ Shubh Navratri & Dussehra!',
    greetingSubtitle: 'Invoke divine grace and artisanal wooden sanctity into your living spaces.',
    couponCode: 'SHUBHLABH',
    discountPercentage: 10,
    highlightColor: '#EF4444',
    enableAmbientEffects: true,
    enableSparklerTrail: true,
    showCountdownTimer: true,
    showSurpriseGiftBox: true,
    surpriseGiftText: 'Free Solid Teakwood Temple Carving Panel',
    showGreetingModal: false,
    autoSchedule: false
  },
  newyear: {
    activeFestival: 'newyear',
    festivalName: 'New Year (नया साल)',
    badgeText: '🎉 NEW YEAR 2026',
    bannerText: 'Transform Your Home for 2026: Book a Full Villa Package & Receive ₹25,000 Material Gift Voucher! Code: NEWYEAR26',
    greetingTitle: '🎉 Happy New Year 2026!',
    greetingSubtitle: 'Fresh beginnings with bespoke architectural designs and lifetime durability.',
    couponCode: 'NEWYEAR26',
    discountPercentage: 10,
    highlightColor: '#38BDF8',
    enableAmbientEffects: true,
    enableSparklerTrail: true,
    showCountdownTimer: true,
    countdownEndDate: '2026-01-05T23:59:59',
    showSurpriseGiftBox: true,
    surpriseGiftText: '₹25,000 Modular Furniture Voucher',
    showGreetingModal: true,
    autoSchedule: false
  },
  patriot: {
    activeFestival: 'patriot',
    festivalName: 'Independence & Republic Day (राष्ट्रीय पर्व)',
    badgeText: '🇮🇳 DESH KA INTERIOR',
    bannerText: '100% Genuine Made in India Century Marine Ply & Teakwood Interiors at Factory Direct Rates. Code: BHARAT79',
    greetingTitle: '🇮🇳 Proudly Handcrafted in Rajasthan',
    greetingSubtitle: 'Celebrating Indian architectural legacy with modern precision craftsmanship.',
    couponCode: 'BHARAT79',
    discountPercentage: 10,
    highlightColor: '#F97316',
    enableAmbientEffects: true,
    enableSparklerTrail: false,
    showCountdownTimer: false,
    showSurpriseGiftBox: false,
    showGreetingModal: false,
    autoSchedule: false
  },
  custom: {
    activeFestival: 'custom',
    festivalName: 'Custom Festive Campaign',
    badgeText: 'FESTIVE SPECIAL',
    bannerText: 'Special Celebration Offer: Exclusive discounts on modular turnkey interiors for a limited period!',
    greetingTitle: 'Special Festive Greetings',
    greetingSubtitle: 'Luxury bespoke living spaces crafted by Shree Shyam Interior.',
    couponCode: 'FESTIVE26',
    discountPercentage: 10,
    highlightColor: '#D97706',
    enableAmbientEffects: true,
    enableSparklerTrail: true,
    showCountdownTimer: true,
    showSurpriseGiftBox: true,
    surpriseGiftText: 'Special Turnkey Consultation Gift',
    showGreetingModal: false,
    autoSchedule: false
  }
};

const fallbackBrandingSEO: BrandingSEOData = {
  logo: {
    type: 'both',
    text: 'Shree Shyam',
    tagline: 'INTERIOR',
    imageUrl: '/logo.jpg',
    faviconUrl: '/logo.jpg'
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

  // Testimonials & Reviews
  async getTestimonials(): Promise<Testimonial[]> {
    const map = new Map<string, Testimonial>();

    // 1. Initial base testimonials
    if (Array.isArray(initialTestimonials)) {
      (initialTestimonials as unknown as Testimonial[]).forEach((t) => map.set(t.id, t));
    }

    // 2. Fetch from server API
    try {
      const apiList = await apiFetch<Testimonial[]>('/testimonials');
      if (Array.isArray(apiList)) {
        apiList.forEach((t) => map.set(t.id, { ...map.get(t.id), ...t }));
      }
    } catch (_) {}

    // 3. Fallback from browser localStorage
    try {
      const raw = localStorage.getItem('ssi_testimonials');
      if (raw) {
        const localList: Testimonial[] = JSON.parse(raw);
        if (Array.isArray(localList)) {
          localList.forEach((t) => map.set(t.id, { ...map.get(t.id), ...t }));
        }
      }
    } catch (_) {}

    const list = Array.from(map.values());
    try {
      localStorage.setItem('ssi_testimonials', JSON.stringify(list));
    } catch (_) {}

    return list;
  },

  async createTestimonial(t: Partial<Testimonial>): Promise<Testimonial> {
    const newTestimonial: Testimonial = {
      id: t.id || `test-${Date.now()}`,
      name: t.name || 'Anonymous Client',
      city: t.city || 'Sikar, Rajasthan',
      project: t.project || 'Turnkey Interior Woodwork',
      rating: Number(t.rating) || 5,
      review: t.review || '',
      avatar: t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      date: t.date || new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      status: t.status || 'Approved',
      verifiedClient: t.verifiedClient !== undefined ? t.verifiedClient : true,
      phone: t.phone || '',
      adminReply: t.adminReply || '',
      adminReplyDate: t.adminReplyDate || '',
      createdAt: t.createdAt || new Date().toISOString()
    };

    // Save to localStorage immediately
    try {
      const raw = localStorage.getItem('ssi_testimonials');
      const list: Testimonial[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem('ssi_testimonials', JSON.stringify([newTestimonial, ...list.filter(x => x.id !== newTestimonial.id)]));
    } catch (_) {}

    // Save to backend API
    try {
      await apiFetch<Testimonial>('/testimonials', {
        method: 'POST',
        body: JSON.stringify(newTestimonial)
      });
    } catch (_) {}

    return newTestimonial;
  },

  async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial> {
    let updatedObj: Testimonial | null = null;

    try {
      const raw = localStorage.getItem('ssi_testimonials');
      if (raw) {
        const list: Testimonial[] = JSON.parse(raw);
        const idx = list.findIndex((t) => t.id === id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...updates };
          updatedObj = list[idx];
          localStorage.setItem('ssi_testimonials', JSON.stringify(list));
        }
      }
    } catch (_) {}

    try {
      const apiUpdated = await apiFetch<Testimonial>(`/testimonials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
      return apiUpdated;
    } catch (_) {
      if (updatedObj) return updatedObj;
      throw new Error('Failed to update testimonial');
    }
  },

  async deleteTestimonial(id: string): Promise<{ success: boolean; id: string }> {
    try {
      const raw = localStorage.getItem('ssi_testimonials');
      if (raw) {
        const list: Testimonial[] = JSON.parse(raw);
        const filtered = list.filter((t) => t.id !== id);
        localStorage.setItem('ssi_testimonials', JSON.stringify(filtered));
      }
    } catch (_) {}

    try {
      return await apiFetch<{ success: boolean; id: string }>(`/testimonials/${id}`, {
        method: 'DELETE'
      });
    } catch (_) {
      return { success: true, id };
    }
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

  // -------------------------------------------------------------
  // Dynamic Leads, Quotes & WhatsApp Orders with Cloud Persistence
  // -------------------------------------------------------------
  async getLeads(): Promise<Lead[]> {
    const map = new Map<string, Lead>();

    // 1. Fetch from server API
    try {
      const apiLeads = await apiFetch<Lead[]>('/leads');
      if (Array.isArray(apiLeads)) {
        apiLeads.forEach((l) => map.set(l.id, l));
      }
    } catch (_) {}

    // 2. Fallback / Sync from Cloud Store
    try {
      const cloudRes = await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072', {
        signal: AbortSignal.timeout(5000)
      });
      if (cloudRes.ok) {
        const json = await cloudRes.json();
        const cloudLeads = json?.data?.leads;
        if (Array.isArray(cloudLeads)) {
          cloudLeads.forEach((l: Lead) => {
            if (!map.has(l.id)) map.set(l.id, l);
          });
        }
      }
    } catch (_) {}

    // 3. Fallback from browser localStorage
    try {
      const raw = localStorage.getItem('ssi_site_visits');
      if (raw) {
        const localLeads: Lead[] = JSON.parse(raw);
        if (Array.isArray(localLeads)) {
          localLeads.forEach((l) => {
            if (!map.has(l.id)) map.set(l.id, l);
          });
        }
      }
    } catch (_) {}

    const list = Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Keep localStorage updated with merged list
    try {
      localStorage.setItem('ssi_site_visits', JSON.stringify(list));
    } catch (_) {}

    return list;
  },

  async submitLead(lead: Omit<Lead, 'id' | 'status' | 'createdAt'>): Promise<Lead> {
    const newLead: Lead = {
      ...lead,
      id: `LEAD-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    // 1. Immediately persist to localStorage
    try {
      const raw = localStorage.getItem('ssi_site_visits');
      const list: Lead[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem('ssi_site_visits', JSON.stringify([newLead, ...list]));
    } catch (_) {}

    // 2. Persist to server API
    try {
      await apiFetch<Lead>('/leads', {
        method: 'POST',
        body: JSON.stringify(newLead)
      });
    } catch (_) {}

    // 3. Direct Cloud Store backup for zero-data-loss cross-device sync
    try {
      const cloudRes = await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072');
      let currentData: any = {};
      if (cloudRes.ok) {
        const json = await cloudRes.json();
        currentData = json?.data || {};
      }
      const existingLeads = Array.isArray(currentData.leads) ? currentData.leads : [];
      const updatedLeads = [newLead, ...existingLeads.filter((l: any) => l.id !== newLead.id)];
      await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'shree-shyam-interior-store',
          data: {
            ...currentData,
            leads: updatedLeads
          }
        }),
        signal: AbortSignal.timeout(5000)
      });
    } catch (_) {}

    return newLead;
  },

  async updateLeadStatus(id: string, updates: Partial<Lead>): Promise<Lead> {
    try {
      const raw = localStorage.getItem('ssi_site_visits');
      if (raw) {
        const list: Lead[] = JSON.parse(raw);
        const idx = list.findIndex((l) => l.id === id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...updates };
          localStorage.setItem('ssi_site_visits', JSON.stringify(list));
        }
      }
    } catch (_) {}

    // Cloud store update
    try {
      const cloudRes = await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072');
      if (cloudRes.ok) {
        const json = await cloudRes.json();
        const data = json?.data || {};
        if (Array.isArray(data.leads)) {
          data.leads = data.leads.map((l: any) => (l.id === id ? { ...l, ...updates } : l));
          await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'shree-shyam-interior-store', data }),
            signal: AbortSignal.timeout(5000)
          });
        }
      }
    } catch (_) {}

    return apiFetch<Lead>(`/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  },

  async deleteLead(id: string): Promise<{ success: boolean; id: string }> {
    try {
      const raw = localStorage.getItem('ssi_site_visits');
      if (raw) {
        const list: Lead[] = JSON.parse(raw);
        const filtered = list.filter((l) => l.id !== id);
        localStorage.setItem('ssi_site_visits', JSON.stringify(filtered));
      }
    } catch (_) {}

    // Cloud store deletion
    try {
      const cloudRes = await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072');
      if (cloudRes.ok) {
        const json = await cloudRes.json();
        const data = json?.data || {};
        if (Array.isArray(data.leads)) {
          data.leads = data.leads.filter((l: any) => l.id !== id);
          await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'shree-shyam-interior-store', data }),
            signal: AbortSignal.timeout(5000)
          });
        }
      }
    } catch (_) {}

    return apiFetch<{ success: boolean; id: string }>(`/leads/${id}`, {
      method: 'DELETE'
    });
  },

  // -------------------------------------------------------------
  // Quotes (Material Estimations)
  // -------------------------------------------------------------
  async getQuotes(): Promise<QuoteRequest[]> {
    const map = new Map<string, QuoteRequest>();

    // 1. Fetch from server API
    try {
      const apiQuotes = await apiFetch<QuoteRequest[]>('/quotes');
      if (Array.isArray(apiQuotes)) {
        apiQuotes.forEach((q) => map.set(q.id, q));
      }
    } catch (_) {}

    // 2. Fetch from Cloud Store
    try {
      const cloudRes = await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072', {
        signal: AbortSignal.timeout(5000)
      });
      if (cloudRes.ok) {
        const json = await cloudRes.json();
        const cloudQuotes = json?.data?.quotes;
        if (Array.isArray(cloudQuotes)) {
          cloudQuotes.forEach((q: any) => {
            if (!Array.isArray(q.items) && typeof q.itemsJson === 'string') {
              try {
                q.items = JSON.parse(q.itemsJson);
              } catch (_) {
                q.items = [];
              }
            }
            if (!map.has(q.id)) map.set(q.id, q);
          });
        }
      }
    } catch (_) {}

    // 3. Fallback from browser localStorage
    try {
      const raw = localStorage.getItem('ssi_quotes');
      if (raw) {
        const localQuotes: QuoteRequest[] = JSON.parse(raw);
        if (Array.isArray(localQuotes)) {
          localQuotes.forEach((q) => {
            if (!map.has(q.id)) map.set(q.id, q);
          });
        }
      }
    } catch (_) {}

    const list = Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    try {
      localStorage.setItem('ssi_quotes', JSON.stringify(list));
    } catch (_) {}

    return list;
  },

  async submitQuote(quote: Omit<QuoteRequest, 'id' | 'createdAt'>): Promise<QuoteRequest> {
    const newQuote: QuoteRequest = {
      ...quote,
      id: `QUOTE-${Date.now()}`,
      status: quote.status || 'New',
      createdAt: new Date().toISOString()
    };

    // 1. Immediately persist to localStorage
    try {
      const raw = localStorage.getItem('ssi_quotes');
      const list: QuoteRequest[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem('ssi_quotes', JSON.stringify([newQuote, ...list]));
    } catch (_) {}

    // 2. Persist to server API
    try {
      await apiFetch<QuoteRequest>('/quotes', {
        method: 'POST',
        body: JSON.stringify(newQuote)
      });
    } catch (_) {}

    // 3. Direct Cloud Store backup
    try {
      const cloudRes = await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072');
      let currentData: any = {};
      if (cloudRes.ok) {
        const json = await cloudRes.json();
        currentData = json?.data || {};
      }
      const existingQuotes = Array.isArray(currentData.quotes) ? currentData.quotes : [];
      const updatedQuotes = [newQuote, ...existingQuotes.filter((q: any) => q.id !== newQuote.id)];
      const cleanQuotes = updatedQuotes.map((q: any) => ({
        id: q.id,
        customerName: q.customerName || '',
        phone: q.phone || '',
        email: q.email || '',
        city: q.city || '',
        totalAmount: Number(q.totalAmount) || 0,
        status: q.status || 'New',
        createdAt: q.createdAt,
        itemsJson: typeof q.itemsJson === 'string' ? q.itemsJson : JSON.stringify(Array.isArray(q.items) ? q.items.slice(0, 20) : [])
      }));

      await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'shree-shyam-interior-store',
          data: {
            ...currentData,
            quotes: cleanQuotes
          }
        }),
        signal: AbortSignal.timeout(5000)
      });
    } catch (_) {}

    return newQuote;
  },

  async updateQuoteStatus(id: string, updates: Partial<QuoteRequest>): Promise<QuoteRequest> {
    try {
      const raw = localStorage.getItem('ssi_quotes');
      if (raw) {
        const list: QuoteRequest[] = JSON.parse(raw);
        const idx = list.findIndex((q) => q.id === id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...updates };
          localStorage.setItem('ssi_quotes', JSON.stringify(list));
        }
      }
    } catch (_) {}

    try {
      const cloudRes = await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072');
      if (cloudRes.ok) {
        const json = await cloudRes.json();
        const data = json?.data || {};
        if (Array.isArray(data.quotes)) {
          data.quotes = data.quotes.map((q: any) => (q.id === id ? { ...q, ...updates } : q));
          await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'shree-shyam-interior-store', data }),
            signal: AbortSignal.timeout(5000)
          });
        }
      }
    } catch (_) {}

    return apiFetch<QuoteRequest>(`/quotes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  },

  async deleteQuote(id: string): Promise<{ success: boolean; id: string }> {
    try {
      const raw = localStorage.getItem('ssi_quotes');
      if (raw) {
        const list: QuoteRequest[] = JSON.parse(raw);
        const filtered = list.filter((q) => q.id !== id);
        localStorage.setItem('ssi_quotes', JSON.stringify(filtered));
      }
    } catch (_) {}

    try {
      const cloudRes = await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072');
      if (cloudRes.ok) {
        const json = await cloudRes.json();
        const data = json?.data || {};
        if (Array.isArray(data.quotes)) {
          data.quotes = data.quotes.filter((q: any) => q.id !== id);
          await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'shree-shyam-interior-store', data }),
            signal: AbortSignal.timeout(5000)
          });
        }
      }
    } catch (_) {}

    return apiFetch<{ success: boolean; id: string }>(`/quotes/${id}`, {
      method: 'DELETE'
    });
  },

  // -------------------------------------------------------------
  // WhatsApp Orders & Direct Inquiries
  // -------------------------------------------------------------
  async getWhatsAppOrders(): Promise<WhatsAppOrder[]> {
    const map = new Map<string, WhatsAppOrder>();

    // 1. Fetch from server API
    try {
      const apiOrders = await apiFetch<WhatsAppOrder[]>('/whatsapp-orders');
      if (Array.isArray(apiOrders)) {
        apiOrders.forEach((o) => map.set(o.id, o));
      }
    } catch (_) {}

    // 2. Fetch from Cloud Store
    try {
      const cloudRes = await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072', {
        signal: AbortSignal.timeout(5000)
      });
      if (cloudRes.ok) {
        const json = await cloudRes.json();
        const cloudOrders = json?.data?.whatsappOrders;
        if (Array.isArray(cloudOrders)) {
          cloudOrders.forEach((o: any) => {
            if (!Array.isArray(o.items) && typeof o.itemsJson === 'string') {
              try {
                o.items = JSON.parse(o.itemsJson);
              } catch (_) {
                o.items = [];
              }
            }
            if (!map.has(o.id)) map.set(o.id, o);
          });
        }
      }
    } catch (_) {}

    // 3. Fallback from browser localStorage
    try {
      const raw = localStorage.getItem('ssi_whatsapp_orders');
      if (raw) {
        const localOrders: WhatsAppOrder[] = JSON.parse(raw);
        if (Array.isArray(localOrders)) {
          localOrders.forEach((o) => {
            if (!map.has(o.id)) map.set(o.id, o);
          });
        }
      }
    } catch (_) {}

    const list = Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Keep localStorage updated with merged list
    try {
      localStorage.setItem('ssi_whatsapp_orders', JSON.stringify(list));
    } catch (_) {}

    return list;
  },

  async submitWhatsAppOrder(order: Omit<WhatsAppOrder, 'id' | 'createdAt'>): Promise<WhatsAppOrder> {
    const newOrder: WhatsAppOrder = {
      ...order,
      id: `WA-${Date.now()}`,
      status: order.status || 'New',
      createdAt: new Date().toISOString()
    };

    // 1. Immediately persist to localStorage
    try {
      const raw = localStorage.getItem('ssi_whatsapp_orders');
      const list: WhatsAppOrder[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem('ssi_whatsapp_orders', JSON.stringify([newOrder, ...list]));
    } catch (_) {}

    // 2. Persist to server API
    try {
      await apiFetch<WhatsAppOrder>('/whatsapp-orders', {
        method: 'POST',
        body: JSON.stringify(newOrder)
      });
    } catch (_) {}

    // 3. Direct Cloud Store backup
    try {
      const cloudRes = await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072');
      let currentData: any = {};
      if (cloudRes.ok) {
        const json = await cloudRes.json();
        currentData = json?.data || {};
      }
      const existing = Array.isArray(currentData.whatsappOrders) ? currentData.whatsappOrders : [];
      const updated = [newOrder, ...existing.filter((o: any) => o.id !== newOrder.id)];
      const cleanWa = updated.map((w: any) => ({
        id: w.id,
        customerName: w.customerName || '',
        phone: w.phone || '',
        orderType: w.orderType || 'Quotation Order',
        city: w.city || '',
        totalAmount: Number(w.totalAmount) || 0,
        message: typeof w.message === 'string' ? w.message.slice(0, 300) : '',
        status: w.status || 'New',
        createdAt: w.createdAt,
        itemsJson: typeof w.itemsJson === 'string' ? w.itemsJson : JSON.stringify(Array.isArray(w.items) ? w.items.slice(0, 10) : [])
      }));

      await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'shree-shyam-interior-store',
          data: {
            ...currentData,
            whatsappOrders: cleanWa
          }
        }),
        signal: AbortSignal.timeout(5000)
      });
    } catch (_) {}

    return newOrder;
  },

  async updateWhatsAppOrderStatus(id: string, updates: Partial<WhatsAppOrder>): Promise<WhatsAppOrder> {
    try {
      const raw = localStorage.getItem('ssi_whatsapp_orders');
      if (raw) {
        const list: WhatsAppOrder[] = JSON.parse(raw);
        const idx = list.findIndex((o) => o.id === id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...updates };
          localStorage.setItem('ssi_whatsapp_orders', JSON.stringify(list));
        }
      }
    } catch (_) {}

    try {
      const cloudRes = await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072');
      if (cloudRes.ok) {
        const json = await cloudRes.json();
        const data = json?.data || {};
        if (Array.isArray(data.whatsappOrders)) {
          data.whatsappOrders = data.whatsappOrders.map((o: any) => (o.id === id ? { ...o, ...updates } : o));
          await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'shree-shyam-interior-store', data }),
            signal: AbortSignal.timeout(5000)
          });
        }
      }
    } catch (_) {}

    return apiFetch<WhatsAppOrder>(`/whatsapp-orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  },

  async deleteWhatsAppOrder(id: string): Promise<{ success: boolean; id: string }> {
    try {
      const raw = localStorage.getItem('ssi_whatsapp_orders');
      if (raw) {
        const list: WhatsAppOrder[] = JSON.parse(raw);
        const filtered = list.filter((o) => o.id !== id);
        localStorage.setItem('ssi_whatsapp_orders', JSON.stringify(filtered));
      }
    } catch (_) {}

    try {
      const cloudRes = await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072');
      if (cloudRes.ok) {
        const json = await cloudRes.json();
        const data = json?.data || {};
        if (Array.isArray(data.whatsappOrders)) {
          data.whatsappOrders = data.whatsappOrders.filter((o: any) => o.id !== id);
          await fetch('https://api.restful-api.dev/objects/ff808181a09d98f701a0c9c936407072', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'shree-shyam-interior-store', data }),
            signal: AbortSignal.timeout(5000)
          });
        }
      }
    } catch (_) {}

    return apiFetch<{ success: boolean; id: string }>(`/whatsapp-orders/${id}`, {
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
  },

  // 1-Click Festival Theme & Festive Campaigns Engine
  async getFestivalCampaign(): Promise<FestivalCampaignConfig> {
    const STORAGE_KEY = 'ssi_festival_campaign_v1';
    let currentConfig: FestivalCampaignConfig = FESTIVAL_PRESETS.normal;

    // Check localStorage cache first
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        currentConfig = JSON.parse(cached);
      }
    } catch {
      // ignore
    }

    // Auto-schedule check: If festival is scheduled and current date is past endDate, auto-revert to normal!
    if (currentConfig.autoSchedule && currentConfig.endDate && currentConfig.activeFestival !== 'normal') {
      const now = new Date();
      const end = new Date(currentConfig.endDate);
      // Set end of the day for end date
      end.setHours(23, 59, 59, 999);
      if (now > end) {
        currentConfig = {
          ...FESTIVAL_PRESETS.normal,
          updatedAt: new Date().toISOString()
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(currentConfig));
          window.dispatchEvent(new CustomEvent('ssi_festival_changed', { detail: currentConfig }));
        } catch {
          // ignore
        }
      }
    }

    // Try API if available in backend
    try {
      const remote = await apiFetch<FestivalCampaignConfig>('/festival');
      if (remote && remote.activeFestival) {
        currentConfig = remote;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
      }
    } catch {
      // Backend not implemented yet, using local persistence
    }

    return currentConfig;
  },

  async updateFestivalCampaign(data: FestivalCampaignConfig): Promise<FestivalCampaignConfig> {
    const STORAGE_KEY = 'ssi_festival_campaign_v1';
    const payload = { ...data, updatedAt: new Date().toISOString() };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent('ssi_festival_changed', { detail: payload }));
    } catch {
      // ignore
    }

    try {
      return await apiFetch<FestivalCampaignConfig>('/festival', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
    } catch {
      return payload;
    }
  }
};

