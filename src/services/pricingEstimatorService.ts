import { apiService, WallFinish, CabinetFinish, FlooringFinish, LightingMood, HardwarePackage } from './apiService';

export interface ConfiguratorSelections {
  roomType: 'living' | 'bedroom' | 'kitchen' | 'bathroom' | 'office';
  wallFinish: string;
  cabinetFinish: string;
  flooring: string;
  lightingMood: 'warm-3000k' | 'daylight-4000k' | 'dual-lighting' | 'crystal-2700k';
  hardwarePackage: 'hafele-premium' | 'blum-luxury';
}

export interface CostItem {
  name: string;
  category: string;
  brand: string;
  specification: string;
  cost: number;
}

export interface PricingBreakdown {
  items: CostItem[];
  subtotal: number;
  laborAndInstallation: number;
  totalTurnkeyCost: number;
  formattedTotal: string;
}

export let WALL_FINISHES: WallFinish[] = [
  {
    id: 'royale-chalk',
    name: 'Royale Chalk White',
    category: 'Luxury Emulsion Paint',
    brand: 'Asian Paints Royale',
    hex: '#F6F5F0',
    threeColor: 0xf6f5f0,
    cost: 4500,
    description: 'Smooth washable matte luxury emulsion with Teflon surface protection.'
  },
  {
    id: 'royale-emerald',
    name: 'Royal Emerald Noir',
    category: 'Luxury Emulsion Paint',
    brand: 'Asian Paints Royale',
    hex: '#1B352F',
    threeColor: 0x1b352f,
    cost: 5800,
    description: 'Deep jewel-toned accent wall giving rich contrast and opulence.'
  },
  {
    id: 'imperial-blue',
    name: 'Imperial Royal Blue',
    category: 'Luxury Emulsion Paint',
    brand: 'Asian Paints Royale Aspira',
    hex: '#1B2E4B',
    threeColor: 0x1b2e4b,
    cost: 5800,
    description: 'Ultra-rich midnight sapphire tone creating prestigious executive depth.'
  },
  {
    id: 'warm-terracotta',
    name: 'Tuscan Warm Terracotta',
    category: 'Earthy Designer Paint',
    brand: 'Asian Paints Nilaya',
    hex: '#A2573B',
    threeColor: 0xa2573b,
    cost: 5400,
    description: 'Warm Mediterranean clay finish bringing organic warmth to interiors.'
  },
  {
    id: 'fluted-teak',
    name: 'Fluted Teak Wood Louvers',
    category: 'Architectural Wall Cladding',
    brand: 'CenturyPly + Solid Teak',
    hex: '#8C5831',
    threeColor: 0x8c5831,
    cost: 36000,
    description: 'Bespoke vertical fluted teakwood louvers on 710 BWP marine ply backing with PU polish.'
  },
  {
    id: 'italian-statuario',
    name: 'Bookmatched Italian Statuario',
    category: 'Natural Marble Paneling',
    brand: 'Imported Italian Slab',
    hex: '#ECECEE',
    threeColor: 0xececee,
    cost: 54000,
    description: 'Seamless continuous vein Italian marble wall with concealed structural cleats.'
  },
  {
    id: 'armani-grey',
    name: 'Smoked Armani Grey Marble',
    category: 'Italian Marble Slab',
    brand: 'Imported Marble',
    hex: '#4F5155',
    threeColor: 0x4f5155,
    cost: 48000,
    description: 'High-end charcoal-grey marble slab with fine white calcite veining.'
  },
  {
    id: 'micro-cement',
    name: 'Architectural Micro-Cement',
    category: 'Textured Surface Finish',
    brand: 'Saint-Gobain Weber',
    hex: '#696E72',
    threeColor: 0x696e72,
    cost: 17500,
    description: 'Seamless hand-troweled micro-cement with protective polyurethane matte sealer.'
  },
  {
    id: 'moroccan-mosaic',
    name: 'Moroccan Zellige Pattern Mosaic',
    category: 'Glazed Ceramic Feature',
    brand: 'Somany Signature',
    hex: '#2B4C5F',
    threeColor: 0x2b4c5f,
    cost: 24000,
    description: 'Handcrafted artisan glazed mosaic feature paneling ideal for vanities & kitchens.'
  }
];

export let CABINET_FINISHES: CabinetFinish[] = [
  {
    id: 'acrylic-white',
    name: 'High-Gloss HD Acrylic',
    category: 'High-Gloss Acrylic',
    brand: 'Greenlam / Merino HD',
    hex: '#FFFFFF',
    threeColor: 0xfafafa,
    metalness: 0.1,
    roughness: 0.1,
    cost: 28500,
    description: 'Scratch-resistant 1.5mm mirror-finish acrylic over CenturyPly 710 marine ply core.'
  },
  {
    id: 'champagne-metallic',
    name: 'Champagne Metallic Acrylic',
    category: 'Metallic Gloss Acrylic',
    brand: 'Greenlam Metallics',
    hex: '#D1B280',
    threeColor: 0xd1b280,
    metalness: 0.35,
    roughness: 0.2,
    cost: 31000,
    description: 'Shimmering warm champagne metallic acrylic shutters with laser-bonded edges.'
  },
  {
    id: 'walnut-veneer',
    name: 'Smoked Walnut Wood Veneer',
    category: 'Natural Timber Veneer',
    brand: 'Century Natural Veneers',
    hex: '#4A3425',
    threeColor: 0x4a3425,
    metalness: 0.05,
    roughness: 0.55,
    cost: 38000,
    description: 'Natural hand-matched walnut veneer buffed with matte Italian PU coating.'
  },
  {
    id: 'matte-charcoal',
    name: 'Anti-Fingerprint Matte Silk',
    category: 'Silk Thermal Laminate',
    brand: 'Merino Luvih',
    hex: '#282B30',
    threeColor: 0x282b30,
    metalness: 0.05,
    roughness: 0.8,
    cost: 22000,
    description: 'Ultra-matte velvety surface with thermal healing and anti-smudge properties.'
  },
  {
    id: 'blonde-oak',
    name: 'Warm Scandinavian Blonde Oak',
    category: 'Timber Laminate',
    brand: 'CenturyLam',
    hex: '#C59A65',
    threeColor: 0xc59a65,
    metalness: 0.05,
    roughness: 0.6,
    cost: 25500,
    description: 'Light organic timber grain creating airy, serene warmth in living spaces.'
  },
  {
    id: 'emerald-silk',
    name: 'Emerald Velvet Matte Silk',
    category: 'Designer Matte Finish',
    brand: 'Merino Luvih',
    hex: '#213D36',
    threeColor: 0x213d36,
    metalness: 0.05,
    roughness: 0.75,
    cost: 26500,
    description: 'Deep royal green soft-touch laminate offering boutique hotel opulence.'
  }
];

export let FLOORING_FINISHES: FlooringFinish[] = [
  {
    id: 'vitrified-mirror',
    name: 'High-Gloss Vitrified Mirror Tiles',
    category: 'Vitrified Slab',
    brand: 'Kajaria / Somany GVT',
    hex: '#E2DFD8',
    threeColor: 0xe2dfd8,
    roughness: 0.15,
    cost: 18500,
    description: '4ft x 2ft large format nano-polished vitrified tiles with epoxy grouting.'
  },
  {
    id: 'italian-marble',
    name: 'Imported Statuario Italian Marble',
    category: 'Natural Marble Flooring',
    brand: 'Imported Marble',
    hex: '#ECECEE',
    threeColor: 0xedeef2,
    roughness: 0.08,
    cost: 72000,
    description: 'Diamond mirror polished Italian marble with crystalline epoxy slurry treatment.'
  },
  {
    id: 'grey-armani-floor',
    name: 'Armani Smoked Grey Marble Floor',
    category: 'Italian Marble Slab',
    brand: 'Imported Armani',
    hex: '#4B4D50',
    threeColor: 0x4b4d50,
    roughness: 0.1,
    cost: 42000,
    description: 'Smoked grey Italian stone with high gloss polished mirror reflection.'
  },
  {
    id: 'wooden-parquet',
    name: 'Water-Resistant Natural Wood Parquet',
    category: 'Hardwood Flooring',
    brand: 'Action TESA Herringbone',
    hex: '#8D5B36',
    threeColor: 0x8d5b36,
    roughness: 0.5,
    cost: 39500,
    description: 'AC5 heavy commercial traffic grade moisture-resistant interlocking wooden planks.'
  },
  {
    id: 'moroccan-stone',
    name: 'Anti-Slip Moroccan Spa Stone',
    category: 'Spa Vitrified Ceramic',
    brand: 'Kajaria Eternity',
    hex: '#7A7D7E',
    threeColor: 0x7a7d7e,
    roughness: 0.7,
    cost: 26500,
    description: 'Textured matte anti-slip stone surface engineered for spa bathrooms and utility zones.'
  }
];

export let LIGHTING_MOODS: LightingMood[] = [
  {
    id: 'warm-3000k',
    name: 'Warm 3000K Cove & Accent Halo',
    coveColor: 0xffaa44,
    ambientColor: 0xfff0dd,
    ambientIntensity: 0.8,
    cost: 14500,
    description: 'Cozy golden 3000K false ceiling cove LED strips + magnetic track downlights.'
  },
  {
    id: 'daylight-4000k',
    name: 'Natural Daylight 4000K Architectural',
    coveColor: 0xffeedd,
    ambientColor: 0xffffff,
    ambientIntensity: 1.05,
    cost: 12800,
    description: 'Crisp neutral 4000K glare-free spotlights illuminating true architectural colors.'
  },
  {
    id: 'dual-lighting',
    name: 'Dual Smart Dimmable Scene (3000K + 4000K)',
    coveColor: 0xffcc77,
    ambientColor: 0xfff8ee,
    ambientIntensity: 1.15,
    cost: 19500,
    description: 'Smart remote/app switchable lighting transitions from daylight focus to evening luxury cove.'
  },
  {
    id: 'crystal-2700k',
    name: 'Chandelier Amber Glow 2700K',
    coveColor: 0xff9922,
    ambientColor: 0xffeed0,
    ambientIntensity: 0.75,
    cost: 21500,
    description: 'Ultra-warm heritage ambient glow calibrated for royal villas & luxury dining suites.'
  }
];

export let HARDWARE_PACKAGES: HardwarePackage[] = [
  {
    id: 'hafele-premium',
    name: 'Häfele Matrix Box Soft-Close System',
    brand: 'Häfele Germany',
    cost: 9500,
    description: 'Heavy-duty 35kg tandem drawers with hydraulic soft-close damping and 3D door hinges.'
  },
  {
    id: 'hettich-sensys',
    name: 'Hettich Sensys 8645i + InnoTech Atira',
    brand: 'Hettich Germany',
    cost: 11500,
    description: 'Silent System integrated damping hinges with double-walled InnoTech Atira soft-closing drawer runners.'
  },
  {
    id: 'blum-luxury',
    name: 'Blum Tandembox Antaro + Tip-On Push',
    brand: 'Blum Austria',
    cost: 14500,
    description: 'Whisper-quiet push-to-open soft-closing synchronization with full drawer extension.'
  }
];

export let ROOM_SUBSTRATES: Record<string, number> = {
  kitchen: 42000,
  bedroom: 38000,
  living: 34000,
  bathroom: 26000,
  office: 36000
};

export let LABOR_RATE_PERCENTAGE = 18;

// Asynchronous backend data synchronizer
export async function syncConfiguratorFromBackend(): Promise<boolean> {
  try {
    const data = await apiService.getConfigurator();
    if (data && data.wallFinishes?.length) {
      WALL_FINISHES.length = 0;
      WALL_FINISHES.push(...data.wallFinishes);
    }
    if (data && data.cabinetFinishes?.length) {
      CABINET_FINISHES.length = 0;
      CABINET_FINISHES.push(...data.cabinetFinishes);
    }
    if (data && data.flooringFinishes?.length) {
      FLOORING_FINISHES.length = 0;
      FLOORING_FINISHES.push(...data.flooringFinishes);
    }
    if (data && data.lightingMoods?.length) {
      LIGHTING_MOODS.length = 0;
      LIGHTING_MOODS.push(...data.lightingMoods);
    }
    if (data && data.hardwarePackages?.length) {
      HARDWARE_PACKAGES.length = 0;
      HARDWARE_PACKAGES.push(...data.hardwarePackages);
    }
    if (data && data.roomSubstrates) {
      Object.assign(ROOM_SUBSTRATES, data.roomSubstrates);
    }
    if (data && typeof data.laborRatePercentage === 'number') {
      LABOR_RATE_PERCENTAGE = data.laborRatePercentage;
    }
    return true;
  } catch (err) {
    console.error('Failed to sync configurator from backend:', err);
    return false;
  }
}

// Auto-trigger sync on module load
syncConfiguratorFromBackend();

export function calculateTurnkeyCost(selections: ConfiguratorSelections): PricingBreakdown {
  const wall = WALL_FINISHES.find((w) => w.id === selections.wallFinish) || WALL_FINISHES[0];
  const cabinet = CABINET_FINISHES.find((c) => c.id === selections.cabinetFinish) || CABINET_FINISHES[0];
  const floor = FLOORING_FINISHES.find((f) => f.id === selections.flooring) || FLOORING_FINISHES[0];
  const light = LIGHTING_MOODS.find((l) => l.id === selections.lightingMood) || LIGHTING_MOODS[0];
  const hw = HARDWARE_PACKAGES.find((h) => h.id === selections.hardwarePackage) || HARDWARE_PACKAGES[0];

  // Base Substrate from dynamic settings
  const substrateCost = ROOM_SUBSTRATES[selections.roomType] || 34000;

  const items: CostItem[] = [
    {
      name: 'Base Substrate Core Fabrication',
      category: 'Plywood Framing',
      brand: 'CenturyPly Club Prime 710 BWP',
      specification: 'Boiling Waterproof, anti-termite borer proof calibrated 19mm/12mm ply',
      cost: substrateCost
    },
    {
      name: wall.name,
      category: wall.category,
      brand: wall.brand,
      specification: wall.description,
      cost: wall.cost
    },
    {
      name: cabinet.name,
      category: cabinet.category,
      brand: cabinet.brand,
      specification: cabinet.description,
      cost: cabinet.cost
    },
    {
      name: floor.name,
      category: floor.category,
      brand: floor.brand,
      specification: floor.description,
      cost: floor.cost
    },
    {
      name: light.name,
      category: 'Lighting Package',
      brand: 'Philips Architectural 48V',
      specification: light.description,
      cost: light.cost
    },
    {
      name: hw.name,
      category: 'Hardware & Fittings',
      brand: hw.brand,
      specification: hw.description,
      cost: hw.cost
    }
  ];

  const subtotal = items.reduce((acc, curr) => acc + curr.cost, 0);

  // Turnkey certified carpentry, surface bonding, electrical wiring, and cleanup labor
  const laborAndInstallation = Math.round(subtotal * (LABOR_RATE_PERCENTAGE / 100));
  const totalTurnkeyCost = subtotal + laborAndInstallation;

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(totalTurnkeyCost);

  return {
    items,
    subtotal,
    laborAndInstallation,
    totalTurnkeyCost,
    formattedTotal
  };
}
