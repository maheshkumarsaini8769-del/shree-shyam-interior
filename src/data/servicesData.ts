export interface ServiceGalleryItem {
  url: string;
  alt: string;
  caption: string;
}

export interface ServiceHighlight {
  title: string;
  desc: string;
  icon: string;
}

export interface ServiceWorkflowStep {
  step: number;
  title: string;
  desc: string;
  duration: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  badge: string;
  tagline: string;
  overview: string;
  heroImage: string;
  startingPrice: string;
  priceUnit: string;
  estimatedTimeline: string;
  warranty: string;
  keyHighlights: ServiceHighlight[];
  specifications: { label: string; value: string }[];
  workflow: ServiceWorkflowStep[];
  whyChooseUs: { title: string; desc: string }[];
  gallery: ServiceGalleryItem[];
  faqs: ServiceFAQ[];
  relatedServices: { name: string; slug: string; desc: string }[];
  popularLocalities: string[];
}

export const servicesData: Record<string, ServiceData> = {
  'home-interior': {
    slug: 'home-interior',
    h1: 'Home Interior Designer in Sikar | Complete Turnkey Living Spaces',
    metaTitle: 'Home Interior Designer in Sikar | Residential Turnkey Interior Design',
    metaDescription: 'Trusted home interior designer in Sikar, Rajasthan. Turnkey residential interior design for flats, duplexes & luxury villas with 100% genuine CenturyPly, Häfele hardware & 10-year warranty.',
    keywords: 'Home Interior Designer in Sikar, Residential Interior Design in Sikar, Turnkey Interior Designer Sikar, Villa Interior Design Sikar, Flat Interior Design Sikar Rajasthan',
    badge: 'Turnkey Residential Excellence',
    tagline: 'Crafting Homes, From the Heart — Tailored for Contemporary Living in Sikar',
    overview: 'Shree Shyam Interior is Sikar’s premier turnkey home interior design studio. We take complete ownership of your home interior journey from concept blueprint and 3D photorealistic visualisation to civil alterations, modular joinery, false ceiling, ambient lighting, Italian stucco paints, and final handover. Whether you own a 2BHK flat on Piprali Road, an independent kothi in Radhakishanpura, or a luxury duplex villa on Jaipur-Bikaner Bypass, our master craftsmen deliver flawless European elegance backed by transparent, itemized pricing.',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    startingPrice: '₹1,200',
    priceUnit: 'per sq. ft. onwards',
    estimatedTimeline: '45 to 60 Days',
    warranty: '10-Year Comprehensive Warranty',
    keyHighlights: [
      { title: '100% Turnkey Execution', desc: 'From civil alterations to final furnishings under one single roof.', icon: 'ShieldCheck' },
      { title: 'Zero Hidden Costs', desc: 'Itemized transparent BOQ (Bill of Quantities) with certified branded materials.', icon: 'CheckCircle2' },
      { title: '45-Day Handover Guarantee', desc: 'Structured milestones with daily supervisor progress logs via WhatsApp.', icon: 'Clock' },
      { title: 'Free 3D Photorealistic Studio', desc: 'Walk through your home in immersive 3D before committing to carpentry.', icon: 'Sparkles' }
    ],
    specifications: [
      { label: 'Core Woodwork', value: 'CenturyPly Club Prime IS:710 BWP Marine Plywood' },
      { label: 'Cabinet Finishes', value: 'Anti-scratch 1mm HD acrylic, natural veneers & Merino laminate' },
      { label: 'Fittings & Hinges', value: 'German Häfele & Hettich Sensys soft-close hardware' },
      { label: 'Surface Finishes', value: 'Asian Paints Royale Luxury Emulsion & PU Italian polish' },
      { label: 'Ceiling Grid', value: 'Saint-Gobain Gyproc false ceiling with magnetic track channels' },
      { label: 'Electricals', value: 'Havells / Polycab FRLS concealed wiring with modular Legrand plates' }
    ],
    workflow: [
      { step: 1, title: 'In-Person Site Inspection', desc: 'Laser room dimension mapping, structural dampness checks, and spatial layout audit in Sikar.', duration: 'Day 1 - 2' },
      { step: 2, title: 'Bespoke 3D Concept Design', desc: 'Tailored 3D renders matching your family lifestyle, color preferences, and functional needs.', duration: 'Day 3 - 7' },
      { step: 3, title: 'Physical Material Selection', desc: 'Review genuine plywood swatches, hardware samples, and laminate finishes at our Sikar experience center.', duration: 'Day 8 - 10' },
      { step: 4, title: 'Precision Fabrication & Fit-Out', desc: 'Factory-calibrated modular carpentry, civil work, false ceiling, and electrical track fitment.', duration: 'Day 11 - 45' },
      { step: 5, title: 'Deep Cleaning & Quality Handover', desc: 'Comprehensive 54-point quality inspection and 10-year warranty certificate handover.', duration: 'Day 46 - 50' }
    ],
    whyChooseUs: [
      { title: 'Direct Factory Sourcing', desc: 'Eliminates retail middlemen markups, delivering authentic century-grade materials at verified manufacturer rates.' },
      { title: 'Local Sikar Presence', desc: 'Experience center on Piprali Road enables rapid site inspections, personal accountability, and lifelong service support.' },
      { title: 'Vastu-Aligned Space Planning', desc: 'Master layouts harmonized with traditional Rajasthani Vastu principles without compromising on contemporary minimalism.' },
      { title: 'Dedicated Project Architect', desc: 'A qualified interior architect manages your site from day one to keys handover, ensuring zero design deviations.' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', alt: 'Modern luxury living room interior design in Sikar with fluted wall panels', caption: 'Luxury Living Pavilion in Sikar' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', alt: 'Turnkey duplex villa interior architecture in Sikar Rajasthan', caption: 'Duplex Villa Renovation, Sikar' },
      { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80', alt: 'Contemporary dining and open concept kitchen interior in Sikar', caption: 'Open Concept Family Living Space' },
      { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', alt: 'Designer false ceiling with warm magnetic track lights in Sikar home', caption: 'Architectural Ceiling & Ambient Lighting' }
    ],
    faqs: [
      { question: 'How much does turnkey home interior design cost in Sikar?', answer: 'Complete turnkey home interiors in Sikar typically range between ₹1,200 and ₹2,200 per square foot depending on materials selected (e.g. Century Club Prime marine ply vs commercial ply, acrylic vs laminate, and basic vs Häfele soft-close hardware). We provide an itemized BOQ so you know the exact cost before work begins.' },
      { question: 'Do you offer free home interior consultations in Sikar?', answer: 'Yes! Our senior interior architect visits your property in Sikar (and nearby regions like Nawalgarh, Fatehpur, and Laxmangarh) with laser measurement tools and physical sample swatches free of cost with zero obligation.' },
      { question: 'What is the typical completion timeline for a 3BHK flat in Sikar?', answer: 'A standard 3BHK residential interior in Sikar takes 45 to 60 working days from design sign-off to keys handover. Our pre-engineered modular woodwork minimizes on-site dust and delays.' },
      { question: 'Are materials covered by a warranty?', answer: 'Yes, all our interior woodwork carries a 10-year warranty against termites and delamination, while hardware fittings (Hettich / Häfele) carry their official manufacturer warranties up to lifetime.' }
    ],
    relatedServices: [
      { name: 'Modular Kitchen', slug: 'modular-kitchen', desc: 'Ergonomic German modular kitchens built with 100% waterproof BWP marine ply.' },
      { name: 'Bedroom Interior', slug: 'bedroom-interior', desc: 'Calming master bedroom suites with acoustic headboards and warm lighting.' },
      { name: 'Living Room Interior', slug: 'living-room-interior', desc: 'Grand entertainment TV units, charcoal louvers, and Italian stucco textures.' }
    ],
    popularLocalities: ['Piprali Road', 'Radhakishanpura', 'Bajaj Road', 'Station Road', 'Fatehpur Road', 'Nawalgarh Road', 'Silver Jubilee Road']
  },

  'modular-kitchen': {
    slug: 'modular-kitchen',
    h1: 'Custom Modular Kitchen in Sikar | Ergonomic German Precision',
    metaTitle: 'Modular Kitchen in Sikar | High-Gloss Acrylic & Quartz Kitchens',
    metaDescription: 'Best modular kitchen manufacturer & designer in Sikar, Rajasthan. Anti-scratch acrylics, boiling waterproof Century marine ply, Häfele soft-close drawers & quartz countertops.',
    keywords: 'Modular Kitchen in Sikar, Kitchen Interior Design Sikar, Modular Kitchen Price Sikar, German Modular Kitchen Sikar, L Shaped Kitchen Sikar, Island Kitchen Design Sikar',
    badge: 'German Hardware • 100% Waterproof',
    tagline: 'Engineered for Heavy Indian Cooking — Effortless Maintenance & Ergonomics',
    overview: 'The kitchen is the spiritual heart of an Indian home. Shree Shyam Interior designs and manufactures heavy-duty, moisture-proof modular kitchens in Sikar tailored for Indian culinary demands. We combine 100% boiling waterproof IS:710 marine plywood carcasses with ultra-gloss anti-fingerprint acrylic or PU shutters, German Häfele and Hettich soft-close drawer runners, quartz stone counters, and seamless spice carousels that stay flawless for decades.',
    heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
    startingPrice: '₹1.85 Lakhs',
    priceUnit: 'complete setup onwards',
    estimatedTimeline: '21 to 30 Days',
    warranty: 'Lifetime Hardware Warranty',
    keyHighlights: [
      { title: '100% Boiling Waterproof', desc: 'Century Marine Plywood (IS:710) guaranteed against moisture & steam.', icon: 'ShieldCheck' },
      { title: 'German Soft-Close Systems', desc: 'Häfele Matrix Box and Hettich Sensys tested for 100,000 glide cycles.', icon: 'Sparkles' },
      { title: 'Heat & Stain Resistant Quartz', desc: 'Zero porosity natural quartz countertops resistant to turmeric and oils.', icon: 'CheckCircle2' },
      { title: 'Corner Magic Optimization', desc: 'Blind corner carousels and tall pantries utilizing every cubic inch.', icon: 'Clock' }
    ],
    specifications: [
      { label: 'Carcass Material', value: 'Century BWP Marine Plywood IS:710 (16mm / 18mm)' },
      { label: 'Shutter Finishes', value: '2mm Anti-Scratch High-Gloss Acrylic / Matt PU Lacquered Glass' },
      { label: 'Drawer Hardware', value: 'Häfele Matrix Box / Hettich InnoTech with soft-close' },
      { label: 'Countertop', value: 'KalingaStone 20mm Polished Quartz / Italian Granite' },
      { label: 'Backsplash / Dado', value: 'Saint-Gobain Lacquered Bronze Glass or Large Format Porcelain Slabs' },
      { label: 'Accessories', value: 'Stainless Steel 304 Spice Racks, Plate Organizers, Tall Pantry Pullout' }
    ],
    workflow: [
      { step: 1, title: 'Ergonomic Kitchen Measurement', desc: 'Analyzing the kitchen work triangle (Cooking, Washing, Refrigeration) and utility outlets.', duration: 'Day 1' },
      { step: 2, title: '3D Modular Kitchen Visualization', desc: 'Realistic 3D cabinet simulation featuring color palette, pullouts, and chimney alignment.', duration: 'Day 2 - 4' },
      { step: 3, title: 'Precision Factory Joinery', desc: 'CNC cutting and edge-banding in our controlled fabrication unit to prevent peeling.', duration: 'Day 5 - 18' },
      { step: 4, title: 'Dry Assembly & Fitment', desc: 'On-site carcass mounting, soft-close alignment, and countertop fixing with dust extraction.', duration: 'Day 19 - 25' },
      { step: 5, title: 'Chimney & Appliance Commissioning', desc: 'Sink silicone seal, plumbing check, and complete functional demonstration.', duration: 'Day 26 - 28' }
    ],
    whyChooseUs: [
      { title: 'Built for Indian Cooking', desc: 'Heavy turmeric stains, water splashes, and high steam leave zero traces on our non-porous acrylic and quartz surfaces.' },
      { title: 'No Termite or Borer Threat', desc: 'Treated with chemical preservatives under high vacuum pressure for lifetime resistance.' },
      { title: 'Custom Island & Parallel Layouts', desc: 'Whether you need a compact L-shape, U-shape, or an expansive island kitchen with breakfast bar.' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', alt: 'Modern luxury charcoal and white modular kitchen in Sikar with quartz counter', caption: 'L-Shaped Modern Acrylic Kitchen, Sikar' },
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', alt: 'Island modular kitchen with warm LED under-cabinet strip lighting Sikar', caption: 'Contemporary Island Kitchen with Breakfast Counter' },
      { url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80', alt: 'Parallel layout modular kitchen with Häfele soft-close pullouts in Sikar', caption: 'Ergonomic Parallel Layout with Tall Pantry' }
    ],
    faqs: [
      { question: 'What is the starting price of a modular kitchen in Sikar?', answer: 'A compact premium modular kitchen in Sikar starts at ₹1.85 Lakhs. Medium to large luxury kitchens with high-gloss acrylic shutters, quartz countertops, and German soft-close drawers typically cost between ₹3.5 Lakhs and ₹6.5 Lakhs.' },
      { question: 'Which material is best for modular kitchen cabinets in Sikar?', answer: 'We strictly recommend Century IS:710 Boiling Water Proof (BWP) marine plywood for carcasses because it withstands heavy moisture, seasonal temperature fluctuations in Rajasthan, and is 100% borer and termite proof.' },
      { question: 'How do I clean acrylic kitchen shutters?', answer: 'Acrylic shutters feature anti-fingerprint coatings. Simply wipe with a microfiber cloth dipped in mild soapy water. Never use harsh abrasive scouring pads.' },
      { question: 'Do you provide kitchen chimney and hob installations?', answer: 'Yes, we coordinate complete ducting, appliance slot cutouts for Faber, Glen, or Bosch chimneys and gas hobs, ensuring seamless integration.' }
    ],
    relatedServices: [
      { name: 'Home Interior', slug: 'home-interior', desc: 'Complete turnkey residential design across Sikar and Shekhawati.' },
      { name: 'Wardrobe Design', slug: 'wardrobe', desc: 'Matching floor-to-ceiling modular wardrobe solutions.' },
      { name: 'Living Room Interior', slug: 'living-room-interior', desc: 'Seamless open-kitchen to dining and living lounge transitions.' }
    ],
    popularLocalities: ['Piprali Road', 'Fatehpur Road', 'Bajaj Road', 'Kalyan Circle', 'Sikar City Centre']
  },

  'bedroom-interior': {
    slug: 'bedroom-interior',
    h1: 'Bedroom Interior Design in Sikar | Calming Modern Master Suites',
    metaTitle: 'Bedroom Interior Design in Sikar | Luxury Master Bedroom Suites',
    metaDescription: 'Transform your bedroom into a restful retreat with Shree Shyam Interior in Sikar. Custom upholstered acoustic headboards, walk-in closets, mood lighting & concealed storage.',
    keywords: 'Bedroom Interior Design in Sikar, Master Bedroom Designer Sikar, Kids Bedroom Design Sikar, Modern Bed Design Sikar, Bedroom False Ceiling Sikar',
    badge: 'Sanctuary of Rest & Comfort',
    tagline: 'Where Acoustic Serenity Meets Master Craftsmanship in Sikar',
    overview: 'Your bedroom is your private sanctuary after long bustling days. Shree Shyam Interior crafts master bedroom suites, cozy guest rooms, and playful children’s spaces in Sikar designed for restorative sleep and functional luxury. From bespoke tufted velvet headboards with acoustic backing and floating nightstands to floor-to-ceiling tinted glass wardrobes and glare-free 2700K ambient lighting, every detail is engineered with peace of mind.',
    heroImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
    startingPrice: '₹1.50 Lakhs',
    priceUnit: 'per room onwards',
    estimatedTimeline: '20 to 30 Days',
    warranty: '10-Year Craftsmanship Warranty',
    keyHighlights: [
      { title: 'Acoustic Soundproofing', desc: 'Fluted wood and fabric acoustic panels reducing ambient street sound.', icon: 'ShieldCheck' },
      { title: 'Integrated Smart Storage', desc: 'Hydraulic lift storage beds and seamlessly concealed vanity alcoves.', icon: 'CheckCircle2' },
      { title: 'Circadian Mood Lighting', desc: 'Glare-free cove and reading sconces calibrated for eye relaxation.', icon: 'Sparkles' },
      { title: 'Luxury Dressing Suites', desc: 'Custom walk-in wardrobe closets with full-length LED touch mirrors.', icon: 'Clock' }
    ],
    specifications: [
      { label: 'Bed Frame Structure', value: 'Treated Hardwood & Century Marine Ply with heavy-duty hydraulic lifters' },
      { label: 'Headboard Finish', value: 'High-density foam upholstered in stain-resistant velvet or suede' },
      { label: 'Wardrobe Joinery', value: 'Soft-close sliding or hinged shutters with fluted glass & sensor LED' },
      { label: 'Flooring Accent', value: 'Warm wooden parquet or vitrified marble tiles with sound dampening underlay' },
      { label: 'Wall Treatment', value: 'Textured European wallpaper or Asian Paints Royale Matt luxury finish' }
    ],
    workflow: [
      { step: 1, title: 'Spatial & Ergonomic Consultation', desc: 'Mapping king/queen bed orientation, natural sunlight angles, and wardrobe clearance.', duration: 'Day 1 - 2' },
      { step: 2, title: '3D Moodboard & Concept', desc: 'Visualizing headboard textures, lighting scenes, and matching wardrobe finishes.', duration: 'Day 3 - 6' },
      { step: 3, title: 'Custom Carpentry Fabrication', desc: 'Crafting bed frame, bedside consoles, and storage units at our Sikar workshop.', duration: 'Day 7 - 18' },
      { step: 4, title: 'Upholstery & On-Site Installation', desc: 'Fitting headboard padding, wardrobe tracks, and recessed ambient LED strips.', duration: 'Day 19 - 24' },
      { step: 5, title: 'Lighting Balancing & Handover', desc: 'Adjusting light color temperatures, final clean-up, and handover.', duration: 'Day 25 - 28' }
    ],
    whyChooseUs: [
      { title: 'Personalized to Your Rhythm', desc: 'We tailor every master suite around your lifestyle—whether you read late at night or require extensive jewelry and watch drawers.' },
      { title: 'Vastu Shastra Compliance', desc: 'Ensuring bed alignment and mirror placements adhere to auspicious bedroom orientations.' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80', alt: 'Royal heritage master bedroom suite with warm jali lighting and wooden louvers in Sikar', caption: 'Master Bedroom Suite with Backlit Headboard' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', alt: 'Modern minimalist bedroom with fluted panels and floating nightstand Sikar', caption: 'Minimalist Modern Suite with Ambient Lighting' },
      { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', alt: 'Luxury walk-in closet and dressing area with vanity mirror in Sikar home', caption: 'Dedicated Dressing Area with Sensor Lights' }
    ],
    faqs: [
      { question: 'What is included in a complete bedroom interior in Sikar?', answer: 'A comprehensive master bedroom package includes the designer bed frame with hydraulic storage, custom upholstered headboard, two floating bedside tables, a floor-to-ceiling wardrobe, a designer TV / dresser unit, false ceiling with ambient LED cove lights, and premium wall finishes.' },
      { question: 'Can you customize beds with hydraulic storage?', answer: 'Yes, we use German heavy-duty gas springs (EBI / Häfele) that make lifting the king-size mattress effortless for daily storage.' },
      { question: 'How do you prevent dampness in Rajasthan bedrooms?', answer: 'We apply Dr. Fixit anti-efflorescence waterproof primers and maintain an air gap with treated marine ply backing to ensure paint and wooden veneers remain pristine.' }
    ],
    relatedServices: [
      { name: 'Wardrobe Design', slug: 'wardrobe', desc: 'Custom built-in sliding and walk-in wardrobe closets.' },
      { name: 'False Ceiling Design', slug: 'false-ceiling', desc: 'Glare-free bedroom ceilings with warm hidden cove lights.' },
      { name: 'Home Interior', slug: 'home-interior', desc: 'Turnkey full home residential interior packages.' }
    ],
    popularLocalities: ['Piprali Road', 'Radhakishanpura', 'Housing Board Colony', 'Silver Jubilee Road', 'Sikar']
  },

  'living-room-interior': {
    slug: 'living-room-interior',
    h1: 'Living Room Interior Design in Sikar | Elegant Living & Entertainment Spaces',
    metaTitle: 'Living Room Interior Design in Sikar | Luxury Hall & TV Unit Interiors',
    metaDescription: 'Bespoke living room interior design in Sikar, Rajasthan. Italian marble TV backdrops, charcoal fluted louvers, 48V magnetic track lights & customized luxury sofa lounges.',
    keywords: 'Living Room Interior Design in Sikar, Hall Interior Design Sikar, TV Unit Design Sikar, Modern Living Room Sikar, Living Room False Ceiling Sikar',
    badge: 'The First Impression of Your Home',
    tagline: 'Architectural Louvers, Marble Backdrops & Warm Ambient Illumination',
    overview: 'Your living room creates the defining first impression for every guest and serves as your family’s celebratory gathering place. Shree Shyam Interior creates majestic living room interiors in Sikar that combine grand hotel-suite aesthetics with everyday practicality. We specialize in Italian marble and PU TV wall units, acoustic charcoal louvers, bronze tinted mirrors that double perceived spatial volume, and warm 48V magnetic profile lighting.',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    startingPrice: '₹1.75 Lakhs',
    priceUnit: 'complete lounge setup',
    estimatedTimeline: '20 to 30 Days',
    warranty: '10-Year Warranty',
    keyHighlights: [
      { title: 'Statement Media & TV Units', desc: 'Seamless Italian composite marble slabs with concealed cabling.', icon: 'Sparkles' },
      { title: 'Acoustic Charcoal Louvers', desc: 'Textured wall fluting providing rich depth and sound dampening.', icon: 'ShieldCheck' },
      { title: '48V Magnetic Track Lighting', desc: 'Repositionable spotlights and linear diffusers without rewiring.', icon: 'CheckCircle2' },
      { title: 'Spatial Illusion Partitioning', desc: 'Fluted glass and CNC brass jali partitions demarcating dining areas.', icon: 'Clock' }
    ],
    specifications: [
      { label: 'Wall Panelling', value: 'High-density charcoal louvers & imported Italian PU fluted boards' },
      { label: 'TV Backdrop Slab', value: 'KalingaStone Composite Marble or St. Laurent Glazed Slabs' },
      { label: 'Lighting Track', value: 'Philips 48V Low Voltage Architectural Magnetic Track' },
      { label: 'Console Cabinetry', value: 'Century Club Prime Marine Ply with push-to-open Häfele runners' },
      { label: 'Paint & Textures', value: 'Asian Paints Stucco Marmorino Italian Texture & Royale Matt' }
    ],
    workflow: [
      { step: 1, title: 'Living Room Spatial Mapping', desc: 'Analyzing viewing distance for TV, natural cross-ventilation, and foyer circulation.', duration: 'Day 1 - 2' },
      { step: 2, title: 'Photorealistic 3D Concept', desc: 'Rendering material combinations: stone, wood, warm lighting, and sofa layouts.', duration: 'Day 3 - 6' },
      { step: 3, title: 'Modular Fabrication', desc: 'Precision CNC routing of louvers and pre-assembling floating TV credenzas.', duration: 'Day 7 - 16' },
      { step: 4, title: 'On-Site Panelling & Lighting', desc: 'Mounting marble backdrops, fixing acoustic louvers, and testing magnetic lighting.', duration: 'Day 17 - 22' },
      { step: 5, title: 'Final Polish & Reveal', desc: 'Touch-up coatings, hardware lubrication, and detailed aesthetic inspection.', duration: 'Day 23 - 25' }
    ],
    whyChooseUs: [
      { title: 'Concealed Cable Engineering', desc: 'Never see an ugly dangling HDMI wire or adapter cord again. Every wire runs through concealed conduits.' },
      { title: 'Climate-Resilient Materials', desc: 'Sikar experiences extreme summers and dry winters; our materials resist thermal expansion and warping.' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', alt: 'Modern luxury living room interior with fluted charcoal louvers in Sikar', caption: 'Luxury Living Room with TV Feature Wall' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', alt: 'Spacious hall interior design with warm wooden false ceiling in Sikar home', caption: 'Open-Plan Family Living & Dining Area' },
      { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80', alt: 'Minimalist TV console with warm ambient LED backlighting Sikar', caption: 'Custom Floating Credenza & Marble TV Slab' }
    ],
    faqs: [
      { question: 'What is trending in living room interior design in Sikar?', answer: 'The top trend in Sikar is a blend of natural stone backdrops (such as Italian marble or large porcelain slabs) flanked by fluted charcoal or teak wood louvers, complemented by 48V low-voltage magnetic track lighting.' },
      { question: 'Can you install false ceilings in living rooms with low ceiling height?', answer: 'Yes! We design perimeter cove false ceilings and slim 2-inch Gyproc profiles that preserve vertical headspace while adding indirect mood lighting.' },
      { question: 'Do you make customized sofas and furniture?', answer: 'Yes, we manufacture custom solid teakwood sofas upholstered in international stain-resistant fabrics matching the exact dimensions and palette of your living room.' }
    ],
    relatedServices: [
      { name: 'False Ceiling Design', slug: 'false-ceiling', desc: 'Architectural Gyproc and wooden rafter ceiling designs.' },
      { name: 'Home Interior', slug: 'home-interior', desc: 'Turnkey full home residential interior packages.' },
      { name: 'Modular Kitchen', slug: 'modular-kitchen', desc: 'Open-concept kitchens with matching dining lounges.' }
    ],
    popularLocalities: ['Piprali Road', 'Fatehpur Road', 'Bajaj Road', 'Station Road', 'Radhakishanpura']
  },

  'wardrobe': {
    slug: 'wardrobe',
    h1: 'Modern Wardrobe Design in Sikar | Smart Floor-to-Ceiling Storage',
    metaTitle: 'Wardrobe Design in Sikar | Sliding, Walk-in & Lacquered Glass Wardrobes',
    metaDescription: 'Custom wardrobe designer in Sikar, Rajasthan. Sliding wardrobes, walk-in closets, lacquered glass doors, internal sensor LED lights with Häfele hardware & 100% termite proof marine ply.',
    keywords: 'Wardrobe Design in Sikar, Sliding Wardrobe in Sikar, Walk in Closet Sikar, Cupboard Design Sikar, Modern Almari Design Sikar, Glass Wardrobe Sikar',
    badge: 'Smart Organization • Floor-to-Ceiling',
    tagline: 'Maximize Every Inch with Elegant Wardrobe Architecture in Sikar',
    overview: 'A well-designed wardrobe brings daily ease, eliminating morning clutter and preserving your garments. Shree Shyam Interior crafts modern wardrobe designs in Sikar that combine smart space engineering with haute couture finishes. Whether you need sleek sliding door wardrobes for compact rooms, opulent floor-to-ceiling walk-in dressing suites with tinted aluminium glass, or classic hinged cupboards with concealed sensor LED illumination, our Sikar atelier delivers flawless carpentry built to endure.',
    heroImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85',
    startingPrice: '₹1,400',
    priceUnit: 'per sq. ft. of front elevation',
    estimatedTimeline: '14 to 21 Days',
    warranty: '10-Year Hardware & Woodwork Guarantee',
    keyHighlights: [
      { title: 'Floor-to-Ceiling Storage', desc: 'Top lofts engineered for heavy winter quilts, luggage, and seasonal items.', icon: 'CheckCircle2' },
      { title: 'Silent Soft-Close Sliders', desc: 'German Häfele TopLine sliding tracks glide silently with fingertip touch.', icon: 'Sparkles' },
      { title: 'Automatic Sensor LEDs', desc: 'Illuminates the instant a shutter opens, providing clear visibility of fabrics.', icon: 'Clock' },
      { title: 'Customized Internal Organizers', desc: 'Dedicated tie racks, velvet jewelry drawers, shoe pullouts, and trouser hangers.', icon: 'ShieldCheck' }
    ],
    specifications: [
      { label: 'Carcass Structure', value: 'Century Club Prime IS:710 Marine Plywood (18mm) with linen-finish laminate' },
      { label: 'Shutter Materials', value: 'Saint-Gobain Fluted / Tinted Glass in Slim Champagne Aluminium Profiles or 1mm High-Gloss Acrylic' },
      { label: 'Sliding Systems', value: 'Häfele TopLine XL / Hettich TopLine L soft-closing system' },
      { label: 'Hinges', value: 'Hettich Sensys 110-degree integrated soft-close hinges' },
      { label: 'Internal Lighting', value: 'Recessed aluminium LED channels with PIR motion sensors' }
    ],
    workflow: [
      { step: 1, title: 'Wardrobe Needs Assessment', desc: 'Auditing your clothing inventory: long coats, sarees, formal suits, watches, and shoes.', duration: 'Day 1' },
      { step: 2, title: 'Custom Internal Layout 3D', desc: 'Configuring hanging rods, drawer tiers, and upper loft modules.', duration: 'Day 2 - 4' },
      { step: 3, title: 'Factory Joinery & Edge Sealing', desc: 'Precision edge-banding with zero glue line technology at our Sikar workshop.', duration: 'Day 5 - 12' },
      { step: 4, title: 'On-Site Installation', desc: 'Laser-level mounting of carcasses, tracks, and aluminium shutter frames.', duration: 'Day 13 - 17' },
      { step: 5, title: 'Hardware Tuning & Inspection', desc: 'Calibrating soft-close dampers and testing motion sensor illumination.', duration: 'Day 18 - 19' }
    ],
    whyChooseUs: [
      { title: 'Custom Wardrobe Depths', desc: 'Standard 24-inch depth prevents hanger bunching and ensures suits hang naturally without sleeve wrinkles.' },
      { title: 'Termite & Borer Shield', desc: '100% factory treated timber ensures your expensive silk sarees and woolen suits remain safeguarded.' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', alt: 'Floor to ceiling modern wardrobe with tinted glass doors and sensor lights Sikar', caption: 'Tinted Aluminium Glass Walk-in Wardrobe' },
      { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80', alt: 'High gloss acrylic sliding wardrobe in luxury master bedroom Sikar', caption: 'High-Gloss Acrylic Sliding Door Wardrobe' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', alt: 'Minimalist built-in wardrobe with concealed vanity unit Sikar Rajasthan', caption: 'Integrated Dressing & Wardrobe Suite' }
    ],
    faqs: [
      { question: 'Which is better for bedrooms in Sikar: sliding or hinged wardrobes?', answer: 'Sliding wardrobes are ideal for rooms where floor space between the bed and closet is limited because sliding doors require zero clearance to open. Hinged wardrobes allow full 100% simultaneous view of the closet interior and accommodate inner door hooks and mirrors.' },
      { question: 'What is the cost of wardrobe design in Sikar?', answer: 'Wardrobe pricing in Sikar starts at ₹1,400 to ₹1,900 per sq ft for premium laminate finishes, and ₹2,200 to ₹3,500 per sq ft for luxury tinted glass shutters framed in brushed champagne aluminium profiles.' },
      { question: 'Do you offer security locker and secret jewelry drawer integration?', answer: 'Yes, we integrate Godrej digital biometric lock safes and push-to-open velvet lined hidden drawers seamlessly inside the master wardrobe.' }
    ],
    relatedServices: [
      { name: 'Bedroom Interior', slug: 'bedroom-interior', desc: 'Complete master bedroom interior architecture.' },
      { name: 'Home Interior', slug: 'home-interior', desc: 'Turnkey full home residential interior packages.' },
      { name: 'False Ceiling Design', slug: 'false-ceiling', desc: 'Matching ceiling recesses and perimeter pelmet lighting.' }
    ],
    popularLocalities: ['Piprali Road', 'Bajaj Road', 'Radhakishanpura', 'Fatehpur Road', 'Sikar']
  },

  'office-interior': {
    slug: 'office-interior',
    h1: 'Office Interior Designer in Sikar | Commercial Spaces Built for Productivity',
    metaTitle: 'Office Interior Designer in Sikar | Commercial & Workspace Interior Design',
    metaDescription: 'Leading commercial & corporate office interior designer in Sikar, Rajasthan. Executive MD cabins, modern acoustic workstations, retail showrooms, clinics & corporate suites.',
    keywords: 'Office Interior Designer in Sikar, Commercial Interior Design in Sikar, Corporate Office Interior Sikar, Clinic Interior Design Sikar, Showroom Interior Designer Sikar',
    badge: 'Commercial Architecture & Productivity',
    tagline: 'Workspaces that Elevate Brand Prestige and Energize High-Performance Teams',
    overview: 'Your commercial space reflects your brand authority and directly influences client confidence and employee productivity. Shree Shyam Interior designs and executes corporate offices, advocate law chambers, medical clinics, boutique showrooms, and educational centers across Sikar and Shekhawati. We blend acoustic soundproofing, ergonomic modular desking, smart conference connectivity, and durable commercial finishes designed for heavy footfall.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    startingPrice: '₹950',
    priceUnit: 'per sq. ft. onwards',
    estimatedTimeline: '30 to 45 Days',
    warranty: '5-Year Commercial Warranty',
    keyHighlights: [
      { title: 'Acoustic Speech Privacy', desc: 'Double-glazed Saint-Gobain partitions and acoustic ceiling baffles.', icon: 'ShieldCheck' },
      { title: 'Ergonomic Modular Workstations', desc: 'Clean cable trays, modesty panels, and high-density anti-scratch laminates.', icon: 'CheckCircle2' },
      { title: 'Brand First Impression', desc: 'Impactful reception foyers with backlit 3D acrylic brand logos.', icon: 'Sparkles' },
      { title: 'Rapid Overnight Turnaround', desc: 'Minimal downtime for operating retail businesses and corporate suites.', icon: 'Clock' }
    ],
    specifications: [
      { label: 'Glass Partitions', value: 'Saint-Gobain 10mm / 12mm Toughened Glass with Slim Aluminium Black Matte Profiles' },
      { label: 'Desking Systems', value: 'Pre-laminated commercial particle board / BWP marine ply with 2mm PVC edge banding' },
      { label: 'Ceiling Grid', value: 'Armstrong Acoustic Mineral Fiber Tiles & Gyproc Drywall Partitions' },
      { label: 'Flooring', value: 'Commercial Grade Vitrified Tiles or Shaw Contract Nylon Carpet Tiles' },
      { label: 'Electrical & Data', value: 'Dedicated CAT-6 structured data cabling and concealed floor junction boxes' }
    ],
    workflow: [
      { step: 1, title: 'Workflow & Team Space Audit', desc: 'Analyzing headcount, departmental circulation, conference tech, and reception traffic in Sikar.', duration: 'Day 1 - 3' },
      { step: 2, title: 'Commercial Layout Plan & 3D', desc: 'Ergonomic floor plan optimizing natural daylight, emergency exit paths, and MD cabin sightlines.', duration: 'Day 4 - 8' },
      { step: 3, title: 'Off-Site Fabrication', desc: 'Modular workstation desks and acoustic wall modules pre-fabricated to shorten on-site disruption.', duration: 'Day 9 - 22' },
      { step: 4, title: 'Glass Partitioning & Networking', desc: 'Fixing aluminium glass partitions, power conduits, and server rack interconnects.', duration: 'Day 23 - 35' },
      { step: 5, title: 'Testing & Handover', desc: 'Testing network ports, lighting lux levels, door closer calibrations, and commercial handover.', duration: 'Day 36 - 40' }
    ],
    whyChooseUs: [
      { title: 'Minimal Business Disruption', desc: 'We pre-fabricate modular components off-site, reducing on-site dust and working through scheduled off-hours.' },
      { title: 'Proven Commercial Track Record', desc: 'Trusted by leading corporate offices, legal chambers, hospitals, and jewelry showrooms in Sikar and Jaipur.' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', alt: 'Corporate law chambers and office interior design with glass partitions in Sikar', caption: 'Corporate Executive Suite & Conference Room' },
      { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80', alt: 'Modern open concept coworking office workstations in Sikar', caption: 'Ergonomic Team Workstations' },
      { url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80', alt: 'Luxury boutique retail showroom interior design in Sikar Rajasthan', caption: 'Boutique Retail Showroom Renovation' }
    ],
    faqs: [
      { question: 'What is the cost of office interior design in Sikar?', answer: 'Commercial office interiors in Sikar start at approximately ₹950 per sq ft for standard open-plan office setups and range from ₹1,400 to ₹2,500 per sq ft for executive MD cabins with acoustic glass partitions and designer ceilings.' },
      { question: 'Do you manage complete commercial electrical and networking work?', answer: 'Yes, our turnkey commercial service includes high-speed CAT-6 LAN networking, server rack setups, biometric access control, fire smoke detector integration, and power back-up cabling.' },
      { question: 'How do you ensure sound privacy in meeting rooms?', answer: 'We use double-glazed acoustic toughened glass with bottom drop seals and acoustic wall paneling calibrated to achieve high Sound Transmission Class (STC 45+) ratings.' }
    ],
    relatedServices: [
      { name: 'False Ceiling Design', slug: 'false-ceiling', desc: 'Armstrong acoustic and Gyproc commercial ceilings.' },
      { name: 'Home Interior', slug: 'home-interior', desc: 'Turnkey residential interior architecture.' },
      { name: 'Living Room Interior', slug: 'living-room-interior', desc: 'Luxury reception and client lounge designs.' }
    ],
    popularLocalities: ['Station Road', 'Kalyan Circle', 'Piprali Road Commercial Belt', 'Bajaj Road', 'Sikar']
  },

  'false-ceiling': {
    slug: 'false-ceiling',
    h1: 'Designer False Ceiling Design in Sikar | Architectural POP & Gypsum',
    metaTitle: 'False Ceiling Design in Sikar | Modern POP & Gypsum Ceiling Services',
    metaDescription: 'Expert false ceiling design & installation in Sikar, Rajasthan. Saint-Gobain Gyproc ceilings, warm LED cove lighting, CNC wooden rafters, acoustic louvers & POP work.',
    keywords: 'False Ceiling Design in Sikar, POP Ceiling in Sikar, Gypsum False Ceiling Sikar, Wooden Ceiling Design Sikar, Living Room False Ceiling Sikar, Ceiling Light Design Sikar',
    badge: 'Architectural Illumination & Thermal Insulation',
    tagline: 'Transforming Plain Overhead Slabs into Breathtaking Canopies of Light',
    overview: 'A masterfully planned false ceiling redefines room proportions, conceals messy electrical wiring and AC ducts, enhances acoustic clarity, and creates an enchanting multi-layered lighting ambiance. Shree Shyam Interior specializes in designer false ceiling installations in Sikar utilizing genuine Saint-Gobain Gyproc gypsum boards, GI metal framing, concealed warm 3000K LED coves, CNC-cut teakwood rafters, and magnetic profile lighting that keeps rooms cool and elegant.',
    heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    startingPrice: '₹95',
    priceUnit: 'per sq. ft. completed',
    estimatedTimeline: '7 to 14 Days',
    warranty: '5-Year Sagging & Crack Warranty',
    keyHighlights: [
      { title: 'Thermal Cooling Insulation', desc: 'Gypsum air gap reduces summer heat transfer from roof slabs by up to 4°C.', icon: 'ShieldCheck' },
      { title: 'Genuine Saint-Gobain Gyproc', desc: 'Anti-sag GI perimeter channels and rust-resistant hardware framing.', icon: 'CheckCircle2' },
      { title: 'Multi-Layer Cove Illumination', desc: 'Dual-circuit indirect warm ambient lighting with zero glare.', icon: 'Sparkles' },
      { title: 'CNC Wooden Rafter Accents', desc: 'Warm natural teakwood louvers integrated into modern minimalist white ceilings.', icon: 'Clock' }
    ],
    specifications: [
      { label: 'Gypsum Board', value: 'Saint-Gobain Gyproc 12.5mm Moisture Resistant / Regular' },
      { label: 'Framing Channels', value: 'Heavy Gauge 0.50mm G.I. Perimeter & Intermediate Channels with Rawl Plugs' },
      { label: 'Joint Compound', value: 'Gyproc Pro-Fill jointing compound with fiber tape reinforcement' },
      { label: 'Ceiling Finish', value: 'Birla White Putty with Asian Paints Royale Luxury Matt ceiling paint' },
      { label: 'Light Cutouts', value: 'Laser-guided circular cutouts for COB downlights & linear magnetic tracks' }
    ],
    workflow: [
      { step: 1, title: 'Ceiling Level Laser Survey', desc: 'Using digital rotary laser levels to establish a plumb horizontal line across all walls.', duration: 'Day 1' },
      { step: 2, title: 'Electrical Conduit & GI Grid Framing', desc: 'Anchoring heavy GI intermediate channels into the concrete ceiling slab with steel fastener bolts.', duration: 'Day 2 - 4' },
      { step: 3, title: 'Gypsum Board Screwing', desc: 'Fixing Saint-Gobain boards with drywall screws spaced every 150mm to prevent sagging.', duration: 'Day 5 - 7' },
      { step: 4, title: 'Jointing, Fiber Tape & POP Skimming', desc: 'Filling seams with fiber mesh tape and applying 3 coats of skim coat for seamless finish.', duration: 'Day 8 - 11' },
      { step: 5, title: 'Sanding, Paint & LED Strip Integration', desc: 'Machine sanding, applying luxury matt ceiling paint, and testing cove LED illumination.', duration: 'Day 12 - 14' }
    ],
    whyChooseUs: [
      { title: 'Zero Crack Guarantee', desc: 'We strictly use genuine fiber joint tape and flexible elastomeric compounds that absorb seasonal thermal movement without hair cracks.' },
      { title: 'Natural Cooling for Sikar Climate', desc: 'The insulating air cavity between the gypsum ceiling and roof slab lowers summer heat, reducing AC power bills.' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', alt: 'Modern gypsum false ceiling design with hidden warm LED strip lighting in Sikar home', caption: 'Modern Cove Ceiling with Magnetic Lighting' },
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', alt: 'Living room false ceiling with natural wooden rafters in Sikar Rajasthan', caption: 'Teakwood Rafters & Perimeter Cove' },
      { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80', alt: 'Master bedroom designer false ceiling with soft warm ambient lighting Sikar', caption: 'Minimalist Bedroom Ceiling with Glare-free Sconces' }
    ],
    faqs: [
      { question: 'What is the price of false ceiling per sq ft in Sikar?', answer: 'False ceiling in Sikar generally costs ₹95 to ₹135 per sq ft for genuine Saint-Gobain Gyproc false ceilings including material, GI channel framing, putty, and primer. Additional decorative wooden rafters or CNC jali accents are priced separately.' },
      { question: 'Does a false ceiling reduce room height significantly?', answer: 'No, a standard perimeter cove false ceiling only requires 5 to 6 inches of drop. For rooms with lower ceilings, we design slim 2 to 3-inch step profiles that preserve spacious headroom.' },
      { question: 'Which ceiling is best: POP or Gypsum board?', answer: 'Gypsum board false ceilings are superior because they are factory-manufactured with uniform thickness, dry faster, generate less on-site mess, and offer superior crack resistance compared to hand-applied manual POP.' }
    ],
    relatedServices: [
      { name: 'Living Room Interior', slug: 'living-room-interior', desc: 'Grand entertainment TV units and acoustic louvers.' },
      { name: 'Bedroom Interior', slug: 'bedroom-interior', desc: 'Master bedroom suites with soft ambient cove lights.' },
      { name: 'Home Interior', slug: 'home-interior', desc: 'Turnkey full home residential interior packages.' }
    ],
    popularLocalities: ['Piprali Road', 'Radhakishanpura', 'Bajaj Road', 'Station Road', 'Fatehpur Road']
  }
};
