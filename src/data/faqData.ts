export interface FAQItem {
  id: string;
  category: 'General' | 'Interior Design' | 'Modular Kitchen' | 'Bedroom & Living Room' | 'Pricing & Budget' | 'Design Process' | 'Installation & Execution' | 'Warranty / Support';
  question: string;
  answer: string;
  tags: string[];
}

export const FAQ_CATEGORIES = [
  'All',
  'General',
  'Interior Design',
  'Modular Kitchen',
  'Bedroom & Living Room',
  'Pricing & Budget',
  'Design Process',
  'Installation & Execution',
  'Warranty / Support'
] as const;

export type FAQCategory = typeof FAQ_CATEGORIES[number];

export const faqData: FAQItem[] = [
  // General
  {
    id: 'faq-gen-1',
    category: 'General',
    question: 'What interior design services do you provide?',
    answer: 'Shree Shyam Interior provides complete end-to-end turnkey interior design solutions in Sikar and across Rajasthan. Our services include complete home interiors (2BHK, 3BHK, 4BHK flats, duplexes, and luxury villas), custom German modular kitchens, master bedroom suites, acoustic living rooms, floor-to-ceiling wardrobes, designer false ceilings, and corporate commercial spaces such as law chambers, executive offices, and retail showrooms.',
    tags: ['Services', 'Turnkey Interiors', 'Sikar']
  },
  {
    id: 'faq-gen-2',
    category: 'General',
    question: 'Where is Shree Shyam Interior located, and which areas do you serve?',
    answer: 'Our main experience center is located at Piprali Road, Near Railway Overbridge, Sikar, Rajasthan - 332001. We serve clients across all of Sikar city, as well as surrounding towns in Shekhawati and Rajasthan including Nawalgarh, Fatehpur, Laxmangarh, Jhunjhunu, Churu, and Jaipur.',
    tags: ['Location', 'Experience Center', 'Areas Served']
  },
  {
    id: 'faq-gen-3',
    category: 'General',
    question: 'Do you provide in-person site visits in Sikar and nearby districts?',
    answer: 'Yes, absolutely! Our principal interior architect visits your site with precision digital laser measurement tools, physical material swatches (plywood, laminates, acrylics, hardware catalogues), and delivers initial spatial assessments 100% free with zero obligation.',
    tags: ['Site Visit', 'Free Consultation', 'Measurement']
  },

  // Interior Design
  {
    id: 'faq-id-1',
    category: 'Interior Design',
    question: 'Do you provide complete turnkey home interiors?',
    answer: 'Yes. Turnkey means you do not have to coordinate between carpenters, plumbers, electricians, painters, and suppliers. Shree Shyam Interior manages everything under one single contract: architectural space planning, 3D renders, civil modifications, modular joinery, false ceilings, electrical track lighting, Italian texture paints, and deep-cleaning before final keys handover.',
    tags: ['Complete Home', 'Turnkey Solution', 'Single Point Contact']
  },
  {
    id: 'faq-id-2',
    category: 'Interior Design',
    question: 'Do you provide 3D photorealistic visualizer designs before starting work?',
    answer: 'Yes! Before any carpentry or cutting begins on site, we provide photorealistic 3D room renders and interactive 3D visualizer models. You can test different laminates, colors, wall panelling, and lighting atmospheres until you are 100% delighted with the design.',
    tags: ['3D Visualizer', 'Photorealistic Renders', 'Design Approval']
  },
  {
    id: 'faq-id-3',
    category: 'Interior Design',
    question: 'Can I customize the design according to my personal style and Vastu preferences?',
    answer: 'Every project we undertake is 100% bespoke. We customize dimensions, storage layouts, color schemes, and hardware to your family’s exact daily lifestyle. Furthermore, our designers integrate traditional Rajasthani Vastu principles (bed orientation, mandir placement, kitchen stove and sink alignments) into modern contemporary layouts.',
    tags: ['Customization', 'Vastu Shastra', 'Bespoke Design']
  },
  {
    id: 'faq-id-4',
    category: 'Interior Design',
    question: 'Do you provide commercial and office interior design?',
    answer: 'Yes. We have executed prestigious commercial interiors across Rajasthan, including corporate law chambers, executive MD cabins, doctor consultation clinics, jewelry retail showrooms, and modern collaborative office workstations with acoustic soundproofing.',
    tags: ['Commercial Design', 'Office Interiors', 'Workstations']
  },

  // Modular Kitchen
  {
    id: 'faq-mk-1',
    category: 'Modular Kitchen',
    question: 'Do you provide modular kitchens, and what types of layouts do you offer?',
    answer: 'We design and manufacture premium modular kitchens in all configurations: L-Shaped, U-Shaped, Parallel (Galley) layout, Straight layout, and expansive Island kitchens with breakfast bars. Every layout is ergonomically planned around the classic Golden Triangle (Hob, Sink, and Refrigerator) for effortless meal preparation.',
    tags: ['Modular Kitchen', 'Kitchen Layouts', 'Island Kitchen']
  },
  {
    id: 'faq-mk-2',
    category: 'Modular Kitchen',
    question: 'What materials and hardware are used for your modular kitchens?',
    answer: 'We strictly use 100% boiling waterproof CenturyPly Club Prime IS:710 Marine Plywood for cabinet carcasses to withstand heavy moisture and steam. For shutters, we offer 2mm anti-scratch high-gloss acrylics, lacquered glass, or PU finishes. For hardware, we integrate German Häfele Matrix Box or Hettich Sensys soft-closing drawer runners and hinges tested for 100,000 glide cycles.',
    tags: ['Century Marine Plywood', 'Häfele', 'Hettich', 'Waterproof']
  },
  {
    id: 'faq-mk-3',
    category: 'Modular Kitchen',
    question: 'How do your kitchens withstand heavy Indian cooking, oil, and spices?',
    answer: 'Indian cooking involves turmeric, mustard oil, and intense heat. Our kitchen countertops use non-porous KalingaStone quartz or polished Italian granite that will never absorb turmeric yellow stains. Furthermore, our acrylic shutter surfaces are anti-fingerprint and wipe clean effortlessly with a damp microfiber cloth.',
    tags: ['Indian Cooking', 'Quartz Countertops', 'Easy Maintenance']
  },

  // Bedroom & Living Room
  {
    id: 'faq-bl-1',
    category: 'Bedroom & Living Room',
    question: 'What features are included in a luxury master bedroom suite?',
    answer: 'A comprehensive master bedroom suite includes a custom-engineered bed frame with German hydraulic storage lifters, an upholstered acoustic headboard, floating nightstands with concealed wireless chargers, floor-to-ceiling sliding or tinted glass wardrobes with sensor LEDs, a dedicated vanity dresser, and multi-circuit ambient ceiling cove lighting.',
    tags: ['Master Bedroom', 'Hydraulic Storage', 'Wardrobes']
  },
  {
    id: 'faq-bl-2',
    category: 'Bedroom & Living Room',
    question: 'What are the trending designs for living room TV feature walls?',
    answer: 'The most popular living room design in Sikar combines seamless bookmatched Italian composite marble or large porcelain glazed slabs with vertical fluted charcoal acoustic louvers, floating credenzas with push-to-open Häfele drawers, and 48V low-voltage magnetic architectural track lighting with zero visible wires.',
    tags: ['Living Room', 'TV Feature Wall', 'Charcoal Louvers']
  },
  {
    id: 'faq-bl-3',
    category: 'Bedroom & Living Room',
    question: 'What types of wardrobes do you design and manufacture?',
    answer: 'We design three primary wardrobe systems: floor-to-ceiling sliding wardrobes with silent soft-closing Häfele TopLine tracks (ideal for compact spaces), luxury walk-in dressing suites with tinted aluminium glass frames, and classic hinged door almirahs with integrated internal vanity mirrors, digital biometric safes, and velvet jewelry drawers.',
    tags: ['Sliding Wardrobe', 'Walk-in Closet', 'Glass Wardrobe']
  },

  // Pricing & Budget
  {
    id: 'faq-pb-1',
    category: 'Pricing & Budget',
    question: 'How much does an interior design project cost in Sikar?',
    answer: 'Turnkey residential interiors in Sikar typically range between ₹1,200 and ₹2,200 per square foot depending on material choices (e.g. Century Marine Ply vs commercial ply, acrylic vs laminate, and basic vs German soft-close fittings). Modular kitchens start at ₹1.85 Lakhs, master bedrooms from ₹1.50 Lakhs, and designer false ceilings from ₹95 per square foot. We provide an itemized Bill of Quantities (BOQ) before project commencement.',
    tags: ['Interior Cost', 'Price per Sq Ft', 'Budgeting']
  },
  {
    id: 'faq-pb-2',
    category: 'Pricing & Budget',
    question: 'How can I request a quotation or budget estimate?',
    answer: 'You can request an estimate in three simple ways: 1) Use our online Cost Estimator tool at /quote to calculate real-time itemized prices, 2) Book a free site visit at /site-visit where our architect measures your property and prepares a BOQ, or 3) Send your floor plan via WhatsApp to +91 98765 43210.',
    tags: ['Quotation', 'Cost Estimator', 'BOQ']
  },
  {
    id: 'faq-pb-3',
    category: 'Pricing & Budget',
    question: 'Are there any hidden costs or surprise charges during execution?',
    answer: 'No, never. We believe in 100% itemized transparency. Your quotation outlines the exact brand names, material thickness, square footage, hardware models, and labor rates. Unless you explicitly request an upgrade or scope addition during the project, the agreed quotation total is fixed.',
    tags: ['Zero Hidden Costs', 'Transparency', 'Fixed Pricing']
  },

  // Design Process
  {
    id: 'faq-dp-1',
    category: 'Design Process',
    question: 'How does the complete interior design process work step-by-step?',
    answer: 'Our workflow follows 5 disciplined stages: 1) Initial Site Inspection & Laser Survey, 2) 2D Space Planning & 3D Photorealistic Concepts, 3) Physical Material & Brand Sourcing at our Sikar showroom, 4) Precision Factory Joinery & On-Site Installation, and 5) 54-Point Quality Inspection & Keys Handover.',
    tags: ['Design Process', '5-Step Workflow', 'Milestones']
  },
  {
    id: 'faq-dp-2',
    category: 'Design Process',
    question: 'Can I make changes to the design after the 3D renders are created?',
    answer: 'Yes! We include multiple design revision rounds during the 3D visualizer stage. We only initiate carpentry and factory material procurement once you are completely satisfied with the layout, finishes, and budget.',
    tags: ['Design Revisions', '3D Feedback', 'Client Satisfaction']
  },

  // Installation & Execution
  {
    id: 'faq-ie-1',
    category: 'Installation & Execution',
    question: 'How long does a typical home interior project take to complete?',
    answer: 'A standard 2BHK or 3BHK turnkey home interior takes between 45 and 60 working days from design sign-off to keys handover. Individual modules like a modular kitchen take 21 to 30 days, while a false ceiling takes 7 to 14 days. Because we pre-engineer modular joinery at our Sikar workshop, on-site dust, carpenter noise, and delays are reduced by up to 70%.',
    tags: ['Timeline', '45 Days Handover', 'Factory Joinery']
  },
  {
    id: 'faq-ie-2',
    category: 'Installation & Execution',
    question: 'Who supervises the on-site carpentry, electrical, and civil work?',
    answer: 'Every project is assigned a dedicated Site Project Supervisor and a Senior Interior Architect who oversee daily craftsmanship, ensure millimeter-level alignment with 3D plans, and send daily photo and video progress logs directly to you via WhatsApp.',
    tags: ['On-Site Supervision', 'Quality Control', 'Daily Updates']
  },

  // Warranty / Support
  {
    id: 'faq-ws-1',
    category: 'Warranty / Support',
    question: 'What warranty do you provide on woodwork, materials, and hardware?',
    answer: 'We provide a 10-Year Comprehensive Warranty on all modular woodwork against termites, borer infestation, and structural delamination. German hardware fittings from Häfele and Hettich carry their official manufacturer warranties (up to lifetime). Furthermore, we provide a 1-year complimentary service warranty covering hinge calibrations, drawer alignments, and touch-ups.',
    tags: ['10-Year Warranty', 'Termite Proof', 'Häfele Warranty', 'After-Sales Support']
  }
];
