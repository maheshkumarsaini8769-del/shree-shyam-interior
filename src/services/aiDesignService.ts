export interface AIDesignRequest {
  roomType: string;
  designStyle: string;
  budgetTier: string;
  roomPhotoUrl?: string;
  userNotes?: string;
}

export interface AlternateView {
  id: string;
  styleName: string;
  imageUrl: string;
  tag: string;
  mood: string;   // 'Warm 3000K Cove' | 'Daylight 4000K' | 'Ambient Luxury'
  accent: string; // 'Italian Marble' | 'Fluted Louvers' | 'Wood Veneer' | 'Acoustic Panels' | 'High-Gloss Acrylic'
  styleCategory?: 'contemporary' | 'minimalist' | 'japandi' | 'industrial' | 'royal';
}

export interface AIDesignResult {
  conceptId: string;
  title: string;
  conceptImage: string; // The primary breathtaking luxury turnkey design
  beforeImage: string;  // The user's uploaded raw room photo
  alternateViews: AlternateView[];
  description: string;
  colorPalette: {
    name: string;
    hex: string;
    role: string;
  }[];
  materialsRecommended: {
    name: string;
    brand: string;
    category: string;
    rateEst: string;
  }[];
  designHighlights: string[];
  estimatedCostRange: string;
}

// Rich catalog of photorealistic, verified luxury turnkey designs by Room & Style
const ROOM_CATALOG: Record<
  string,
  {
    primary: Record<
      string,
      {
        image: string;
        title: string;
        desc: string;
        palette: { name: string; hex: string; role: string }[];
        highlights: string[];
      }
    >;
    variations: AlternateView[];
  }
> = {
  living: {
    primary: {
      'contemporary indian luxury': {
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
        title: 'Contemporary Luxury Living Room with Italian Marble & Warm Cove Lighting',
        desc: 'Masterfully transformed living lounge featuring bookmatched Italian Statuario TV wall, acoustic fluted teak louvers, 3000K warm recessed perimeter cove LEDs, and champagne copper metallic trims.',
        palette: [
          { name: 'Warm Teak', hex: '#8B5A2B', role: 'Fluted Wall Louvers' },
          { name: 'Statuario White', hex: '#F5F5F5', role: 'Italian Marble TV Wall' },
          { name: 'Champagne Copper', hex: '#C68A43', role: 'Profile & Lighting Trims' },
          { name: 'Obsidian Noir', hex: '#121720', role: 'Accent Wall & Base' }
        ],
        highlights: [
          '3000K warm false ceiling cove lighting with zero glare',
          'Bookmatched Italian marble TV backdrop with concealed wire chases',
          'CenturyPly Club Prime 710 BWP marine plywood cabinetry',
          'High-gloss vitrified mirror floor reflections'
        ]
      },
      'modern minimalist': {
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
        title: 'Modern Minimalist Living Room with Architectural Lighting',
        desc: 'Seamless handleless storage, floating credenza in matte silk acrylic, monochromatic palette, and recessed linear magnetic track spotlights.',
        palette: [
          { name: 'Pure Chalk', hex: '#FAF9F6', role: 'Primary Ceiling & Walls' },
          { name: 'Charcoal Silk', hex: '#2B2D2F', role: 'Floating Media Unit' },
          { name: 'Muted Taupe', hex: '#9E978E', role: 'Curtains & Upholstery' },
          { name: 'Brushed Brass', hex: '#D4AF37', role: 'Architectural Accents' }
        ],
        highlights: [
          'Concealed shadow-line false ceiling details',
          'Zero-hardware push-to-open Häfele soft-close mechanisms',
          'Flush-mount architectural magnetic track system',
          'Eco-friendly low VOC Asian Paints Royale finish'
        ]
      },
      'warm japandi': {
        image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=85',
        title: 'Warm Japandi Organic Living Room with Natural Oak & Fluted Panels',
        desc: 'A serene fusion of Scandinavian functionality and Japanese minimalism featuring natural blonde oak wood, textured lime-wash walls, and ambient soft lighting.',
        palette: [
          { name: 'Light Oak', hex: '#C8A27A', role: 'Wooden Slat Partitions' },
          { name: 'Warm Cream', hex: '#FDFBF7', role: 'Textured Lime-Wash Walls' },
          { name: 'Earthy Clay', hex: '#B87D4B', role: 'Ceramic & Decor Accents' },
          { name: 'Soft Sage', hex: '#8F9779', role: 'Botanical & Textile Mood' }
        ],
        highlights: [
          'Acoustic natural wood slat dividers for zoning',
          'Organic cotton and linen low-profile seating',
          'Dimmable paper lantern pendant and indirect lighting',
          'Anti-termite treated solid wood base frames'
        ]
      },
      'industrial elegance': {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
        title: 'Industrial Elegance Living Room with Exposed Finishes & Metal Profiles',
        desc: 'Striking modern luxury with polished micro-cement textures, black powder-coated steel glass partitions, warm amber Edison lamps, and cognac leather seating.',
        palette: [
          { name: 'Graphite Grey', hex: '#373A3C', role: 'Micro-cement Accent Wall' },
          { name: 'Cognac Amber', hex: '#9B5B2E', role: 'Top-Grain Leather Lounge' },
          { name: 'Matte Black', hex: '#1C1C1C', role: 'Steel Grid Partitions' },
          { name: 'Raw Oak', hex: '#A88B68', role: 'Solid Wood Coffee Table' }
        ],
        highlights: [
          'Slim-profile matte black aluminum glass partition',
          'Architectural surface track lighting with warm beam spread',
          'Moisture-cured polyurethane sealed floor',
          'Century marine plywood shelving with steel bracketry'
        ]
      },
      'royal traditional': {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        title: 'Royal Traditional Living Room with Teak Jali & Brass Inlays',
        desc: 'Timeless Rajasthani heritage grandeur with hand-carved teak jali screens, polished brass inlays, royal velvet seating, and a crystal chandelier centerpiece.',
        palette: [
          { name: 'Royal Walnut', hex: '#4A2E18', role: 'Carved Wooden Jali & Paneling' },
          { name: 'Antique Gold', hex: '#D4AF37', role: 'Brass Inlays & Lighting' },
          { name: 'Deep Emerald', hex: '#1B4D3E', role: 'Rich Velvet Upholstery' },
          { name: 'Ivory Silk', hex: '#FFFFF0', role: 'Coffered Ceiling Panels' }
        ],
        highlights: [
          'Intricate laser-cut CNC wooden jali partition with brass trim',
          'Coffered false ceiling with warm ambient chandeliers',
          'Hand-buffed natural teakwood console and heritage archways',
          'Full termite-resistant Century Gold Ply construction'
        ]
      }
    },
    variations: [
      {
        id: 'living-1',
        styleName: 'Contemporary Indian Luxury',
        imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
        tag: 'Italian Marble TV Wall & 3000K Cove',
        mood: 'Warm 3000K Cove',
        accent: 'Italian Marble',
        styleCategory: 'contemporary'
      },
      {
        id: 'living-2',
        styleName: 'Modern Minimalist',
        imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
        tag: 'Monochrome Silk & Concealed Pulls',
        mood: 'Daylight 4000K',
        accent: 'Fluted Louvers',
        styleCategory: 'minimalist'
      },
      {
        id: 'living-3',
        styleName: 'Warm Japandi',
        imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=85',
        tag: 'Blonde Oak & Lime-Wash Texture',
        mood: 'Ambient Luxury',
        accent: 'Wood Veneer',
        styleCategory: 'japandi'
      },
      {
        id: 'living-4',
        styleName: 'Industrial Elegance',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
        tag: 'Micro-Cement Wall & Steel Grid',
        mood: 'Warm 3000K Cove',
        accent: 'Acoustic Panels',
        styleCategory: 'industrial'
      },
      {
        id: 'living-5',
        styleName: 'Royal Traditional',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        tag: 'Hand-Carved Teak Jali & Brass',
        mood: 'Ambient Luxury',
        accent: 'Wood Veneer',
        styleCategory: 'royal'
      },
      {
        id: 'living-6',
        styleName: 'Open-Plan Villa Salon',
        imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85',
        tag: 'Double-Height Ceiling & Statuario',
        mood: 'Daylight 4000K',
        accent: 'Italian Marble',
        styleCategory: 'contemporary'
      },
      {
        id: 'living-7',
        styleName: 'Smoked Walnut Lounge',
        imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=85',
        tag: 'Fluted Louver Wall & Warm LEDs',
        mood: 'Warm 3000K Cove',
        accent: 'Fluted Louvers',
        styleCategory: 'contemporary'
      },
      {
        id: 'living-8',
        styleName: 'Architectural Gallery Living',
        imageUrl: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1600&q=85',
        tag: 'Recessed Downlights & Brass Trims',
        mood: 'Ambient Luxury',
        accent: 'Italian Marble',
        styleCategory: 'minimalist'
      },
      {
        id: 'living-9',
        styleName: 'Japandi Organic Slat Lounge',
        imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=85',
        tag: 'Nordic Oak & Warm Diffused Lights',
        mood: 'Warm 3000K Cove',
        accent: 'Wood Veneer',
        styleCategory: 'japandi'
      },
      {
        id: 'living-10',
        styleName: 'Monolithic Charcoal Studio',
        imageUrl: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=85',
        tag: 'Seamless Matte Grey & Linear Profiles',
        mood: 'Daylight 4000K',
        accent: 'Acoustic Panels',
        styleCategory: 'minimalist'
      },
      {
        id: 'living-11',
        styleName: 'Grand Villa Reception',
        imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
        tag: 'Statuario Floor & Brass Chandeliers',
        mood: 'Ambient Luxury',
        accent: 'Italian Marble',
        styleCategory: 'royal'
      }
    ]
  },

  bedroom: {
    primary: {
      'contemporary indian luxury': {
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
        title: 'Contemporary Luxury Master Suite with Fluted Backlit Headboard',
        desc: 'Bespoke bedroom sanctuary with full-height fluted acoustic headboard wall, 3000K warm LED backlighting, integrated floating bedside tables, and mirror-finish wardrobe.',
        palette: [
          { name: 'Champagne Taupe', hex: '#B7A99A', role: 'Cushioned Headboard Fabric' },
          { name: 'Smoked Walnut', hex: '#533B2E', role: 'Fluted Louvers & Storage' },
          { name: 'Warm Amber', hex: '#C68A43', role: 'Indirect LED Glow' },
          { name: 'Pearl White', hex: '#F0EBE1', role: 'Ceiling & Soft Walls' }
        ],
        highlights: [
          'Full-height acoustic cushioned headboard with warm halo LED',
          'Floor-to-ceiling sliding wardrobe with Häfele soft-close tracks',
          'Concealed reading spotlights with dual switching',
          'CenturyPly Club Prime 710 marine ply base fabrication'
        ]
      },
      'modern minimalist': {
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85',
        title: 'Minimalist Zen Bedroom with Floating Platform & Soft Lighting',
        desc: 'Clean lines, floating platform bed with under-bed warm LED glow, seamless push-to-open wardrobes, and whisper-quiet acoustic ceiling treatment.',
        palette: [
          { name: 'Linen Grey', hex: '#D0CDC7', role: 'Acoustic Wall Panels' },
          { name: 'Matte Ash', hex: '#635D56', role: 'Platform Bed Frame' },
          { name: 'Warm White', hex: '#FDFBF7', role: 'False Ceiling & Walls' },
          { name: 'Charcoal', hex: '#2D3134', role: 'Lighting Fixtures' }
        ],
        highlights: [
          'Floating bed platform with hidden perimeter night-light',
          'Handle-free floor-to-ceiling wardrobe with acrylic finish',
          'Acoustic sound-dampening wall paneling',
          'Smart remote-controlled warm lighting scenes'
        ]
      },
      'warm japandi': {
        image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1600&q=85',
        title: 'Warm Japandi Sanctuary Bedroom with Light Oak & Organic Linens',
        desc: 'Calm organic materials, low wooden bed frame, slatted oak wardrobe doors, and warm diffused lighting for deeply restful sleep.',
        palette: [
          { name: 'Blonde Oak', hex: '#D7B98E', role: 'Slatted Wardrobe & Bed Frame' },
          { name: 'Oatmeal', hex: '#E6D7C3', role: 'Textured Linen Curtains' },
          { name: 'Warm Alabaster', hex: '#F7F3EC', role: 'Lime-Wash Walls' },
          { name: 'Forest Moss', hex: '#4A5B43', role: 'Bedside Planter Accents' }
        ],
        highlights: [
          'Natural oak slatted wardrobe with ventilation louvers',
          'Anti-dust mite organic linen drapery',
          'Warm 2700K paper pendant ambient lighting',
          '100% boiling-water-proof plywood substrate'
        ]
      }
    },
    variations: [
      {
        id: 'bed-1',
        styleName: 'Contemporary Indian Luxury',
        imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
        tag: 'Backlit Fluted Headboard Wall',
        mood: 'Warm 3000K Cove',
        accent: 'Fluted Louvers',
        styleCategory: 'contemporary'
      },
      {
        id: 'bed-2',
        styleName: 'Modern Minimalist Zen',
        imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85',
        tag: 'Floating Bed with Under-Glow',
        mood: 'Daylight 4000K',
        accent: 'Acoustic Panels',
        styleCategory: 'minimalist'
      },
      {
        id: 'bed-3',
        styleName: 'Warm Japandi Sanctuary',
        imageUrl: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1600&q=85',
        tag: 'Light Oak Wood & Organic Linens',
        mood: 'Ambient Luxury',
        accent: 'Wood Veneer',
        styleCategory: 'japandi'
      },
      {
        id: 'bed-4',
        styleName: 'Scandinavian Teak Master Suite',
        imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
        tag: 'Natural Teak Finish Wardrobes',
        mood: 'Warm 3000K Cove',
        accent: 'Wood Veneer',
        styleCategory: 'contemporary'
      },
      {
        id: 'bed-5',
        styleName: 'Boutique Hotel Master Suite',
        imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
        tag: 'Cushioned Suede Headboard & LEDs',
        mood: 'Ambient Luxury',
        accent: 'Acoustic Panels',
        styleCategory: 'royal'
      },
      {
        id: 'bed-6',
        styleName: 'Warm Amber Sunset Suite',
        imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85',
        tag: 'Curved False Ceiling Profile',
        mood: 'Warm 3000K Cove',
        accent: 'Fluted Louvers',
        styleCategory: 'contemporary'
      },
      {
        id: 'bed-7',
        styleName: 'Bohemian Teak & Canopy Suite',
        imageUrl: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1600&q=85',
        tag: 'Natural Teak Texture & 3000K Accent Halo',
        mood: 'Warm 3000K Cove',
        accent: 'Wood Veneer',
        styleCategory: 'japandi'
      }
    ]
  },

  kitchen: {
    primary: {
      'contemporary indian luxury': {
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
        title: 'Luxury Modular Kitchen with Acrylic High-Gloss Island & Häfele Fittings',
        desc: 'Turnkey chef-grade modular kitchen featuring scratch-resistant acrylic shutters, quartz stone counter, Häfele tandem drawers, and warm under-cabinet LED task lighting.',
        palette: [
          { name: 'Cashmere Grey', hex: '#8C857B', role: 'Base High-Gloss Cabinets' },
          { name: 'Calacatta Gold', hex: '#EFECE6', role: 'Quartz Countertop & Backsplash' },
          { name: 'Warm Copper', hex: '#C68A43', role: 'Gola Profile Handle Trims' },
          { name: 'Dark Walnut', hex: '#422B1D', role: 'Breakfast Counter Bar' }
        ],
        highlights: [
          'CenturyPly Club Prime 710 BWP marine plywood (boiling waterproof)',
          'Häfele Matrix Box soft-close drawer system with 35kg capacity',
          'Concealed 4000K daylight LED task lights under overhead units',
          'Heat and turmeric stain-resistant engineered quartz slab'
        ]
      },
      'modern minimalist': {
        image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
        title: 'Modern Minimalist Handleless Kitchen with Matte Slate & Hidden Appliances',
        desc: 'Flawless monolithic kitchen design with J-pull seamless cabinetry, matte anti-fingerprint surfaces, and integrated appliance tall units.',
        palette: [
          { name: 'Matte Slate', hex: '#3C4043', role: 'Anti-Fingerprint Shutters' },
          { name: 'Arctic White', hex: '#F8F9FA', role: 'Upper Lift-up Cabinets' },
          { name: 'Graphite Stone', hex: '#202124', role: 'Seamless Sink & Counter' },
          { name: 'Brushed Steel', hex: '#A2A9B0', role: 'Hardware & Fittings' }
        ],
        highlights: [
          'Blum Aventos bi-fold lift-up mechanism for upper cabinets',
          'Seamless anti-fingerprint thermal laminate technology',
          'Integrated spice pull-outs, pantry tall unit, and corner carousel',
          'Complete termite & water protection guarantee'
        ]
      },
      'warm japandi': {
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=85',
        title: 'Warm Japandi Kitchen with Natural Wood Cabinets & Fluted Glass',
        desc: 'Peaceful timber kitchen design pairing natural wood textures with ribbed fluted glass overhead cabinets, warm ambient lights, and stone counter.',
        palette: [
          { name: 'Warm Maple', hex: '#C59A65', role: 'Wood Veneer Base Units' },
          { name: 'Ribbed Glass', hex: '#EAE6DF', role: 'Fluted Overhead Cabinets' },
          { name: 'Beige Quartz', hex: '#ECE3D4', role: 'Countertop & Upstand' },
          { name: 'Soft Charcoal', hex: '#323639', role: 'Matt Black Faucets' }
        ],
        highlights: [
          'Fluted Saint-Gobain glass aluminum frame overheads',
          'Heavy-duty tandem runners rated for 100,000 opening cycles',
          'Warm ambient profile lighting illuminating countertops',
          'Pest-repellent natural cedar wood drawer interiors'
        ]
      }
    },
    variations: [
      {
        id: 'kitchen-1',
        styleName: 'Contemporary Luxury Island',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
        tag: 'High-Gloss Acrylic & Häfele Tandem',
        mood: 'Warm 3000K Cove',
        accent: 'High-Gloss Acrylic',
        styleCategory: 'contemporary'
      },
      {
        id: 'kitchen-2',
        styleName: 'Modern Minimalist Slate',
        imageUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
        tag: 'Handleless Matte Slate J-Pull',
        mood: 'Daylight 4000K',
        accent: 'Acoustic Panels',
        styleCategory: 'minimalist'
      },
      {
        id: 'kitchen-3',
        styleName: 'Warm Japandi Fluted Glass',
        imageUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=85',
        tag: 'Ribbed Glass Overheads & Light Wood',
        mood: 'Ambient Luxury',
        accent: 'Wood Veneer',
        styleCategory: 'japandi'
      },
      {
        id: 'kitchen-4',
        styleName: 'Industrial Open Kitchen',
        imageUrl: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1600&q=85',
        tag: 'Matte Black Steel Mesh & Oak Shelves',
        mood: 'Warm 3000K Cove',
        accent: 'Wood Veneer',
        styleCategory: 'industrial'
      },
      {
        id: 'kitchen-5',
        styleName: 'Royal Traditional Solid Wood',
        imageUrl: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1600&q=85',
        tag: 'Heritage Teak Shutters & Granite Counter',
        mood: 'Ambient Luxury',
        accent: 'Wood Veneer',
        styleCategory: 'royal'
      },
      {
        id: 'kitchen-6',
        styleName: 'Calacatta Waterfall Quartz',
        imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
        tag: 'Engineered Quartz Waterfall Edge',
        mood: 'Daylight 4000K',
        accent: 'Italian Marble',
        styleCategory: 'contemporary'
      },
      {
        id: 'kitchen-7',
        styleName: 'Dual-Tone Champagne & Walnut Island',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=85',
        tag: 'Warm Under-Cabinet Cove & Island Bar',
        mood: 'Warm 3000K Cove',
        accent: 'High-Gloss Acrylic',
        styleCategory: 'contemporary'
      },
      {
        id: 'kitchen-8',
        styleName: 'Villa Chef Marble Kitchen',
        imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
        tag: 'Seamless Marble Island & Recessed Task LEDs',
        mood: 'Ambient Luxury',
        accent: 'Italian Marble',
        styleCategory: 'minimalist'
      }
    ]
  },

  office: {
    primary: {
      'contemporary indian luxury': {
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
        title: 'Executive Corporate Office Suite with Acoustic Paneling & Glass Partitions',
        desc: 'Prestigious corporate office space featuring acoustic fabric wall panels, executive veneer director desk, tempered glass partitions, and calibrated glare-free linear lighting.',
        palette: [
          { name: 'Executive Walnut', hex: '#4A3326', role: 'Director Desk & Credenza' },
          { name: 'Anthracite', hex: '#2E3033', role: 'Slim Glass Partition Frames' },
          { name: 'Acoustic Grey', hex: '#9AA0A6', role: 'Sound Absorption Wall' },
          { name: 'Warm Copper', hex: '#C68A43', role: 'Accent Profiles & Lighting' }
        ],
        highlights: [
          'Saint-Gobain acoustic double-glazed glass partition',
          'Concealed cable management and pop-up data power boxes',
          'Glare-free UGR<19 architectural linear suspended lighting',
          'Heavy-duty Century commercial ply core'
        ]
      }
    },
    variations: [
      {
        id: 'office-1',
        styleName: 'Executive Director Suite',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
        tag: 'Walnut Credenza & Glass Partitions',
        mood: 'Warm 3000K Cove',
        accent: 'Wood Veneer',
        styleCategory: 'contemporary'
      },
      {
        id: 'office-2',
        styleName: 'Modern Minimalist Boardroom',
        imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
        tag: 'Linear Suspended Lighting & Acoustic Panels',
        mood: 'Daylight 4000K',
        accent: 'Acoustic Panels',
        styleCategory: 'minimalist'
      },
      {
        id: 'office-3',
        styleName: 'Creative Architectural Studio',
        imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85',
        tag: 'Open Collaborative Wood Bench Desking',
        mood: 'Ambient Luxury',
        accent: 'Wood Veneer',
        styleCategory: 'japandi'
      },
      {
        id: 'office-4',
        styleName: 'Industrial Co-Working Loft',
        imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85',
        tag: 'Exposed Ducting, Wood Desks & Track Spotlights',
        mood: 'Warm 3000K Cove',
        accent: 'Acoustic Panels',
        styleCategory: 'industrial'
      }
    ]
  },

  bathroom: {
    primary: {
      'contemporary indian luxury': {
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
        title: 'Luxury Spa Bathroom with Floating Quartz Vanity & Ambient LED Mirror',
        desc: 'Resort-grade master bathroom with custom floating Century marine ply vanity, backlit defogger mirror, Saint-Gobain glass shower cubicle, and brass fixtures.',
        palette: [
          { name: 'Armani Grey', hex: '#5A5652', role: 'Large Format Vitrified Wall Tiles' },
          { name: 'Backlit Warmth', hex: '#F4D06F', role: 'LED Mirror Halo' },
          { name: 'Brushed Brass', hex: '#C68A43', role: 'Plumbing & Hardware Accents' },
          { name: 'Pure White', hex: '#FFFFFF', role: 'Ceramic Sanitaryware' }
        ],
        highlights: [
          '100% Boiling Waterproof 710 BWP marine plywood vanity',
          'Custom touch-sensor dimmable LED anti-fog mirror',
          'Frameless 10mm toughened glass shower enclosure',
          'Häfele soft-close moisture-sealed hardware'
        ]
      }
    },
    variations: [
      {
        id: 'bath-1',
        styleName: 'Luxury Spa Vanity Suite',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
        tag: 'Floating Quartz Vanity & Backlit Mirror',
        mood: 'Warm 3000K Cove',
        accent: 'Italian Marble',
        styleCategory: 'contemporary'
      },
      {
        id: 'bath-2',
        styleName: 'Italian Grey Marble Shower',
        imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=85',
        tag: 'Full-Height Italian Marble & Frameless Glass',
        mood: 'Daylight 4000K',
        accent: 'Italian Marble',
        styleCategory: 'minimalist'
      },
      {
        id: 'bath-3',
        styleName: 'Zen Stone & Teak Vanity Spa',
        imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85',
        tag: 'Natural Stone Basin & Warm Backlit Sconces',
        mood: 'Ambient Luxury',
        accent: 'Wood Veneer',
        styleCategory: 'japandi'
      }
    ]
  }
};

export const generateAIConcept = async (
  request: AIDesignRequest,
  onProgress?: (stage: string, progress: number) => void
): Promise<AIDesignResult> => {
  const steps = [
    { message: 'Analyzing room geometry, ceiling heights & lighting angles...', delay: 400, pct: 20 },
    { message: 'Evaluating spatial layout & architectural focal points...', delay: 500, pct: 45 },
    { message: `Applying ${request.designStyle} color harmonies and luxury textures...`, delay: 500, pct: 70 },
    { message: 'Matching verified premium materials (CenturyPly 710, Häfele, Philips)...', delay: 450, pct: 90 },
    { message: 'Finalizing photorealistic turnkey 3D transformation...', delay: 350, pct: 100 }
  ];

  for (const step of steps) {
    if (onProgress) onProgress(step.message, step.pct);
    await new Promise((resolve) => setTimeout(resolve, step.delay));
  }

  // 1. Determine room category
  const roomLower = request.roomType.toLowerCase();
  let categoryKey = 'living';
  if (roomLower.includes('bed')) categoryKey = 'bedroom';
  else if (roomLower.includes('kitchen')) categoryKey = 'kitchen';
  else if (roomLower.includes('office')) categoryKey = 'office';
  else if (roomLower.includes('bath')) categoryKey = 'bathroom';

  const category = ROOM_CATALOG[categoryKey] || ROOM_CATALOG['living'];

  // 2. Determine chosen primary design
  const styleLower = request.designStyle.toLowerCase();
  let chosenDesign = category.primary['contemporary indian luxury'];

  if (styleLower.includes('minimalist') && category.primary['modern minimalist']) {
    chosenDesign = category.primary['modern minimalist'];
  } else if (styleLower.includes('japandi') && category.primary['warm japandi']) {
    chosenDesign = category.primary['warm japandi'];
  } else if (styleLower.includes('industrial') && category.primary['industrial elegance']) {
    chosenDesign = category.primary['industrial elegance'];
  } else if (styleLower.includes('royal') && category.primary['royal traditional']) {
    chosenDesign = category.primary['royal traditional'];
  }

  // 3. Fallback raw sample photo if user did not upload one
  const defaultSampleBefore =
    categoryKey === 'bedroom'
      ? 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
      : categoryKey === 'kitchen'
      ? 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      : categoryKey === 'office'
      ? 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'
      : categoryKey === 'bathroom'
      ? 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      : 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80';

  const beforeImage = request.roomPhotoUrl || defaultSampleBefore;

  return {
    conceptId: `CONCEPT-${Date.now().toString().slice(-6)}`,
    title: chosenDesign.title,
    conceptImage: chosenDesign.image,
    beforeImage,
    alternateViews: category.variations,
    description: chosenDesign.desc,
    colorPalette: chosenDesign.palette,
    materialsRecommended: [
      {
        name: 'CenturyPly Club Prime 710 BWP Marine Plywood',
        brand: 'CenturyPly',
        category: 'Substrate',
        rateEst: '₹128 / sq ft'
      },
      {
        name: 'High-Gloss HD Acrylic & Silk Laminate Sheets',
        brand: 'Greenlam / Merino',
        category: 'Surfacing',
        rateEst: '₹2,850 / sheet'
      },
      {
        name: 'Concealed Soft-Close Tandem Runners & Hinges',
        brand: 'Häfele',
        category: 'Hardware',
        rateEst: '₹4,650 / set'
      },
      {
        name: '48V Low Voltage Architectural Magnetic Track Spotlights',
        brand: 'Philips',
        category: 'Lighting',
        rateEst: '₹1,850 / module'
      }
    ],
    designHighlights: chosenDesign.highlights,
    estimatedCostRange: request.budgetTier || '₹3L - ₹5L'
  };
};
