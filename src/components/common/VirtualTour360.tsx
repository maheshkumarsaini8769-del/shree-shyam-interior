import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  RotateCw,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  X,
  Sparkles,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Hotspot {
  id: string;
  title: string;
  brand: string;
  xPercent: number; // 0 to 100 on the panorama
  yPercent: number; // 0 to 100 vertically
  description: string;
  warranty: string;
  tag: string;
}

interface RoomTour {
  id: string;
  name: string;
  category: string;
  location: string;
  budgetEst: string;
  imageUrl: string;
  description: string;
  hotspots: Hotspot[];
}

const ROOM_TOURS: RoomTour[] = [
  {
    id: 'living-room',
    name: 'Luxury Villa Living & TV Lounge',
    category: 'Turnkey Living Room',
    location: 'Piprali Road, Sikar',
    budgetEst: '₹3.80L - ₹5.20L',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85',
    description: 'Bespoke marble TV console, Italian fluted acoustic louvers, concealed 4000K cove illumination, and certified Century Club Prime 710 framework.',
    hotspots: [
      {
        id: 'tv-console',
        title: 'Calacatta Marble & Fluted Paneling',
        brand: 'Merino & Sikar Marble',
        xPercent: 48,
        yPercent: 46,
        description: 'CNC-routed fluted charcoal panels with seamless back-lit ambient LED strips and Italian marble console top.',
        warranty: '10-Year Studio Craftsmanship Guarantee',
        tag: 'Architectural Finish'
      },
      {
        id: 'plywood-base',
        title: 'CenturyPly Club Prime BWP 710 Plywood',
        brand: 'CenturyPly Official',
        xPercent: 28,
        yPercent: 68,
        description: 'Calibrated boiling waterproof marine plywood with double-pressed glue line for zero termite vulnerability in Rajasthan climate.',
        warranty: '10-Year Manufacturer Replacement Guarantee',
        tag: 'Certified Core'
      },
      {
        id: 'ambient-lighting',
        title: 'Concealed LED Profile Cove',
        brand: 'Philips Hue / Hafele Loox',
        xPercent: 65,
        yPercent: 24,
        description: 'Diffused silicone neon-flex channel delivering glare-free 3000K ambient glow across ceilings and display niches.',
        warranty: '3-Year Electrical Warranty',
        tag: 'Smart Ambience'
      }
    ]
  },
  {
    id: 'modular-kitchen',
    name: 'German High-Gloss Modular Kitchen',
    category: 'Modular Kitchen',
    location: 'Nawalgarh Road, Sikar',
    budgetEst: '₹2.40L - ₹3.60L',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2000&q=85',
    description: 'G-shape layout with anti-scratch high-gloss acrylic shutters, Blumotion soft-close tandem pantry, and quartz stone countertop.',
    hotspots: [
      {
        id: 'acrylic-shutters',
        title: 'Anti-Scratch High-Gloss Acrylic Shutters',
        brand: 'Merino Gloss Meister',
        xPercent: 32,
        yPercent: 52,
        description: 'UV-lacquered mirror finish shutters with 1.3mm German edge banding preventing moisture penetration.',
        warranty: '10-Year Surface Warranty',
        tag: 'Scratch-Proof'
      },
      {
        id: 'hafele-hardware',
        title: 'Häfele Soft-Close Tandem Runners',
        brand: 'Häfele German Engineering',
        xPercent: 56,
        yPercent: 74,
        description: '50,000 cycle tested heavy-duty drawer runners supporting up to 60 kg with feather-touch acoustic damping.',
        warranty: 'Lifetime Functional Hardware Warranty',
        tag: 'German Fittings'
      },
      {
        id: 'quartz-counter',
        title: 'Engineered Sparkling Quartz Stone',
        brand: 'KalingaStone Premium',
        xPercent: 72,
        yPercent: 60,
        description: 'Non-porous, stain-resistant 18mm quartz top that withstands turmeric and high heat cooking without fading.',
        warranty: '15-Year Stain Warranty',
        tag: 'Zero Porosity'
      }
    ]
  },
  {
    id: 'master-bedroom',
    name: 'Royal Master Bedroom & Walk-in Suite',
    category: 'Luxury Bedroom',
    location: 'Bajaj Gram Sanwali, Sikar',
    budgetEst: '₹3.10L - ₹4.50L',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2000&q=85',
    description: 'Floor-to-ceiling tinted glass sliding wardrobes, velvet tufted acoustic headboard, integrated study nook, and sensor wardrobe lighting.',
    hotspots: [
      {
        id: 'wardrobe-glass',
        title: 'Tinted Fluted Glass Sliding Wardrobe',
        brand: 'Saint-Gobain & Häfele Slido',
        xPercent: 68,
        yPercent: 44,
        description: 'Ultra-slim black aluminum framework with bronze tinted fluted glass and automated magnetic door sensor strips.',
        warranty: '10-Year Sliding Track Warranty',
        tag: 'Walk-In Luxury'
      },
      {
        id: 'headboard',
        title: 'Acoustic Velvet Upholstered Headboard',
        brand: 'D’Decor Fabrics',
        xPercent: 34,
        yPercent: 56,
        description: 'Sound-absorbing high-density foam padding wrapped in stain-guard velvet with brass metal inlay trims.',
        warranty: '5-Year Fabric & Foam Guarantee',
        tag: 'Sound Insulation'
      }
    ]
  }
];

export const VirtualTour360: React.FC = () => {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState(0); // 0 to 100% of single panel
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const initialPanOffsetRef = useRef(0);
  const hasMovedRef = useRef(false);

  const currentRoom = ROOM_TOURS[selectedRoomIndex];

  // Reset image loaded on room change
  useEffect(() => {
    setIsImageLoaded(false);
    setActiveHotspot(null);
    setPanOffset(0);
  }, [selectedRoomIndex]);

  // Smooth 60FPS Auto-rotate timer with delta-time
  useEffect(() => {
    if (!isAutoRotate) return;

    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      // 2.2% per second rotation speed
      setPanOffset((prev) => (prev + dt * 2.2) % 100);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isAutoRotate]);

  // Handle Drag / Swipe Mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.clientX;
    initialPanOffsetRef.current = panOffset;
    setIsAutoRotate(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const deltaPixels = e.clientX - startXRef.current;
    if (Math.abs(deltaPixels) > 4) {
      hasMovedRef.current = true;
    }
    const containerWidth = containerRef.current.clientWidth || 800;
    const deltaPercent = (deltaPixels / containerWidth) * 100;
    const newPan = initialPanOffsetRef.current - deltaPercent;
    setPanOffset(((newPan % 100) + 100) % 100);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Handle Touch
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.touches[0].clientX;
    initialPanOffsetRef.current = panOffset;
    setIsAutoRotate(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const deltaPixels = e.touches[0].clientX - startXRef.current;
    if (Math.abs(deltaPixels) > 4) {
      hasMovedRef.current = true;
    }
    const containerWidth = containerRef.current.clientWidth || 800;
    const deltaPercent = (deltaPixels / containerWidth) * 100;
    const newPan = initialPanOffsetRef.current - deltaPercent;
    setPanOffset(((newPan % 100) + 100) % 100);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const resetView = () => {
    setPanOffset(0);
    setZoomLevel(1);
    setIsAutoRotate(true);
    setActiveHotspot(null);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // 3-panel calculation:
  // Wrapper is 300% wide (3 panels of 100% viewport width each).
  // Panel 0: Clone, Panel 1: Center/Default, Panel 2: Clone.
  // Shifting by -(100 + panOffset) / 3 % keeps viewport strictly between Panel 1 and Panel 2.
  // There is NEVER any empty space or black void!
  const normalizedPan = ((panOffset % 100) + 100) % 100;
  const shiftPercent = (100 + normalizedPan) / 3;

  return (
    <div className="w-full bg-forest-950 text-cream-100 rounded-3xl overflow-hidden border border-copper-500/30 shadow-2xl relative">
      {/* Top Header / Switcher */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 border-b border-copper-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-copper-500/20 text-copper-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-copper-500/30">
              <Compass className="w-3 h-3 text-copper-400" />
              <span>Interactive 360° Virtual Walkthrough</span>
            </span>
            <span className="text-[11px] text-cream-200/60 hidden sm:inline">
              Drag to explore • Click points for material specs
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-50">
            {currentRoom.name}
          </h3>
          <p className="text-xs text-copper-300/90 mt-0.5">
            {currentRoom.location} • Estimate: <span className="font-bold text-cream-100">{currentRoom.budgetEst}</span>
          </p>
        </div>

        {/* Room Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {ROOM_TOURS.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => {
                setSelectedRoomIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                idx === selectedRoomIndex
                  ? 'bg-copper-500 text-white shadow-glow-copper'
                  : 'bg-forest-900/80 hover:bg-forest-800 text-cream-200/80 border border-cream-200/10'
              }`}
            >
              {room.name.split(' ')[0]} {room.name.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* 360 Viewport Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] overflow-hidden cursor-grab active:cursor-grabbing select-none bg-forest-950"
      >
        {/* Loading Spinner Skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-forest-950 text-cream-200 gap-3">
            <Loader2 className="w-8 h-8 text-copper-400 animate-spin" />
            <span className="text-xs font-semibold uppercase tracking-wider text-copper-300">
              Loading 360° Walkthrough Scene...
            </span>
          </div>
        )}

        {/* 3-Panel Infinite Seamless Wrapper */}
        <div
          className="absolute inset-y-0 left-0 flex h-full will-change-transform"
          style={{
            width: '300%',
            transform: `translateX(-${shiftPercent}%) scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: isDraggingRef.current ? 'none' : 'transform 75ms ease-out'
          }}
        >
          {[0, 1, 2].map((panelIdx) => (
            <div
              key={panelIdx}
              className="relative w-1/3 h-full shrink-0 select-none overflow-hidden"
            >
              <img
                src={currentRoom.imageUrl}
                alt={`${currentRoom.name} - Panel ${panelIdx}`}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
                loading="eager"
                onLoad={() => {
                  if (panelIdx === 1) setIsImageLoaded(true);
                }}
              />

              {/* Hotspots locked precisely to this panel */}
              {currentRoom.hotspots.map((spot) => (
                <div
                  key={`${panelIdx}-${spot.id}`}
                  style={{
                    left: `${spot.xPercent}%`,
                    top: `${spot.yPercent}%`
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!hasMovedRef.current) {
                      setActiveHotspot(spot);
                    }
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                >
                  {/* Outer Pulse Wave */}
                  <span className="absolute -inset-2 rounded-full bg-copper-400/40 animate-ping pointer-events-none"></span>

                  {/* Main Hotspot Pin */}
                  <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-copper-500 text-white flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
                    <Sparkles className="w-3.5 h-3.5 text-cream-100" />
                  </div>

                  {/* Hover Badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-forest-950/95 text-cream-50 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-copper-500/40 shadow-xl whitespace-nowrap pointer-events-none">
                    {spot.title}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Subtle Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-forest-950/70 via-transparent to-forest-950/30" />

        {/* Control Toolbar Overlay */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 sm:gap-2 bg-forest-950/85 backdrop-blur-md p-1.5 rounded-2xl border border-cream-200/10 shadow-lg">
          {/* Auto-rotate Toggle */}
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isAutoRotate ? 'bg-copper-500 text-white' : 'text-cream-200 hover:bg-forest-800'
            }`}
            title={isAutoRotate ? 'Pause 360 Rotation' : 'Start Auto 360 Rotation'}
          >
            <RotateCw className={`w-4 h-4 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          {/* Reset View */}
          <button
            onClick={resetView}
            className="p-2 rounded-xl text-cream-200 hover:bg-forest-800 transition-colors cursor-pointer"
            title="Reset 360 View"
          >
            <Compass className="w-4 h-4" />
          </button>

          {/* Zoom In */}
          <button
            onClick={() => setZoomLevel((prev) => Math.min(prev + 0.2, 1.8))}
            className="p-2 rounded-xl text-cream-200 hover:bg-forest-800 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => setZoomLevel((prev) => Math.max(prev - 0.2, 1))}
            className="p-2 rounded-xl text-cream-200 hover:bg-forest-800 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl text-cream-200 hover:bg-forest-800 transition-colors cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Drag Hint at Bottom */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-forest-950/80 backdrop-blur-sm border border-cream-200/10 text-[11px] text-cream-200 font-medium">
            <Compass className="w-3.5 h-3.5 text-copper-400" />
            <span>Click & Drag to rotate 360°</span>
          </span>
        </div>

        {/* Hotspot Specification Card Popover */}
        {activeHotspot && (
          <div className="absolute inset-x-4 bottom-4 sm:left-auto sm:right-4 sm:bottom-4 z-30 max-w-sm bg-forest-900/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-copper-500/40 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-copper-400 block">
                  {activeHotspot.tag} • {activeHotspot.brand}
                </span>
                <h4 className="font-bold text-sm text-cream-50 mt-0.5">
                  {activeHotspot.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-cream-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-cream-200/80 leading-relaxed mb-3">
              {activeHotspot.description}
            </p>

            <div className="pt-2.5 border-t border-cream-200/10 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{activeHotspot.warranty}</span>
              </span>

              <Link
                to="/quote"
                className="text-copper-400 hover:text-copper-300 font-bold text-[11px] flex items-center gap-0.5 cursor-pointer"
              >
                <span>Calculate Cost</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Details */}
      <div className="p-4 sm:p-6 bg-forest-900/60 border-t border-copper-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-cream-200/70 max-w-2xl leading-relaxed">
          {currentRoom.description}
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/site-visit"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper transition-all"
          >
            <span>Book Free Site Visit for this Style</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
