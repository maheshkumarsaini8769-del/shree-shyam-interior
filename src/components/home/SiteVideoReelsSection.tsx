import React, { useState } from 'react';
import {
  Play,
  X,
  Volume2,
  VolumeX,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoReel {
  id: string;
  title: string;
  category: string;
  location: string;
  client: string;
  handoverTime: string;
  thumbnailUrl: string;
  videoUrl: string; // HTML5 video or preview stream
  tags: string[];
  description: string;
}

const REELS: VideoReel[] = [
  {
    id: 'reel-1',
    title: '4BHK Royal Duplex Villa Handover',
    category: 'Turnkey Residential',
    location: 'Piprali Road, Sikar',
    client: 'Kedia Family Residence',
    handoverTime: '45-Day Handover',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-with-kitchen-41804-large.mp4',
    tags: ['Italian Marble TV Unit', 'Century Club Prime', 'Concealed LED'],
    description: 'Complete interior design and fabrication featuring Italian fluted louvers, customized acrylic cabinetry, and warm 3000K ambient illumination.'
  },
  {
    id: 'reel-2',
    title: 'German High-Gloss Modular Kitchen Tour',
    category: 'Modular Kitchen',
    location: 'Nawalgarh, Rajasthan',
    client: 'Dr. Sharma Villa',
    handoverTime: '24-Day Handover',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-kitchen-with-bright-counter-and-cabinets-41803-large.mp4',
    tags: ['Häfele Soft-Close', 'Quartz Counter', 'Anti-Scratch Acrylic'],
    description: 'G-shape layout engineered with 100% boiling waterproof marine grade BWP 710 plywood, Blumotion tandem drawer boxes, and corner carousel pantry.'
  },
  {
    id: 'reel-3',
    title: 'Royal Master Bedroom & Tinted Wardrobe',
    category: 'Luxury Bedroom',
    location: 'Jaipur Road, Sikar',
    client: 'Singhania Suite',
    handoverTime: '30-Day Handover',
    thumbnailUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-large-hotel-room-with-comfortable-bed-41805-large.mp4',
    tags: ['Acoustic Velvet Wall', 'Saint-Gobain Glass', 'Sensor Lighting'],
    description: 'Bespoke master suite with velvet tufted acoustic headboard, floor-to-ceiling tinted bronze glass sliding wardrobe, and integrated vanity study.'
  },
  {
    id: 'reel-4',
    title: 'Executive Corporate Law Chamber',
    category: 'Commercial Interiors',
    location: 'Court Circle, Sikar',
    client: 'Advocate Chambers',
    handoverTime: '21-Day Handover',
    thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-office-room-41801-large.mp4',
    tags: ['Acoustic Louvers', 'Toughened Glass', 'Teak Wood Desk'],
    description: 'Sophisticated corporate legal chamber featuring soundproof acoustic wall paneling, conference setup, and custom teak executive desk.'
  }
];

export const SiteVideoReelsSection: React.FC = () => {
  const [activeReel, setActiveReel] = useState<VideoReel | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="py-12 sm:py-16 bg-cream-100 dark:bg-forest-950 text-forest-950 dark:text-cream-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-copper-500/10 text-copper-600 dark:text-copper-400 text-[10px] font-bold uppercase tracking-wider border border-copper-500/20">
                Real Sites • Zero Filter
              </span>
              <span className="text-xs text-charcoal-400 dark:text-cream-200/50">
                500+ Handover Across Shekhawati & Jaipur
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-forest-950 dark:text-cream-50">
              Completed Sites Video Walkthroughs
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-200/70 mt-1 max-w-xl">
              Experience the actual craftsmanship, seamless drawer glides, profile lighting, and finished villas executed by Shree Shyam Interior.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-copper-600 dark:text-copper-400 hover:text-copper-700 dark:hover:text-copper-300 transition-colors self-start md:self-auto group"
          >
            <span>Explore All 500+ Projects</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Video Reel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveReel(reel)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/30 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Thumbnail Container with Play Icon */}
              <div className="relative aspect-[4/3] sm:aspect-[9/10] overflow-hidden bg-black">
                <img
                  src={reel.thumbnailUrl}
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />

                {/* Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />

                {/* Central Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-copper-500/90 text-white flex items-center justify-center shadow-glow-copper group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-lg bg-forest-950/80 backdrop-blur-sm text-[10px] font-bold text-copper-300 uppercase tracking-wider border border-cream-200/10">
                    {reel.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-500/90 text-white text-[10px] font-bold shadow-sm">
                    {reel.handoverTime}
                  </span>
                </div>

                {/* Location at bottom of thumbnail */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1 text-[11px] text-cream-200 font-medium drop-shadow">
                  <MapPin className="w-3 h-3 text-copper-400 shrink-0" />
                  <span className="truncate">{reel.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-forest-950 dark:text-cream-50 group-hover:text-copper-600 dark:group-hover:text-copper-400 transition-colors line-clamp-1">
                    {reel.title}
                  </h4>
                  <p className="text-[11px] text-charcoal-400 dark:text-cream-200/60 mt-0.5">
                    {reel.client}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {reel.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-cream-50 dark:bg-forest-800 text-charcoal-600 dark:text-cream-200/80 text-[10px] font-medium border border-cream-200/60 dark:border-cream-200/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeReel && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="bg-forest-950 rounded-3xl max-w-2xl w-full border border-copper-500/30 overflow-hidden shadow-2xl relative">
              
              {/* Header */}
              <div className="p-4 bg-forest-900/90 border-b border-copper-500/20 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-copper-400">
                      {activeReel.category} • {activeReel.location}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-cream-50">
                    {activeReel.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-lg bg-forest-800 text-cream-200 hover:text-copper-400 transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setActiveReel(null)}
                    className="p-1.5 rounded-lg bg-forest-800 text-cream-200 hover:bg-forest-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Video Player Element */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <video
                  src={activeReel.videoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Video Details & WhatsApp CTA */}
              <div className="p-4 sm:p-5 space-y-3">
                <p className="text-xs text-cream-200/80 leading-relaxed">
                  {activeReel.description}
                </p>

                <div className="pt-3 border-t border-cream-200/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Certified Century Marine Plywood & Häfele Fittings</span>
                  </div>

                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(
                      `Namaste Shree Shyam Interior! Maine aapka video walkthrough dekha: "${activeReel.title}" (${activeReel.location}). Mujhe bhi apne ghar ke liye isi level ka interior design karwana hai. Kripya quotation details share karein.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire this Style on WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
