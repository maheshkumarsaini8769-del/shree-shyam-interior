import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Upload,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Check,
  Palette,
  Layers,
  ShoppingBag,
  Sliders,
  Image as ImageIcon,
  Camera,
  X,
  Download,
  Filter,
  Sun,
  SlidersHorizontal,
  Eye,
  RefreshCw
} from 'lucide-react';
import { generateAIConcept, AIDesignRequest, AIDesignResult } from '../services/aiDesignService';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { RoomConfigurator3D } from '../components/studio/RoomConfigurator3D';
import { useQuote } from '../context/QuoteContext';
import { useToast } from '../context/ToastContext';
import { compressImageFile } from '../utils/imageCompressor';
import productsData from '../data/products.json';
import { Product } from '../types/product';
import { Link } from 'react-router-dom';

export const DesignAIPage: React.FC = () => {
  // Top-Level Studio Mode: Interactive 3D Customizer vs AI Photo Makeover
  const [activeStudioMode, setActiveStudioMode] = useState<'3d' | 'photo'>('3d');

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<AIDesignRequest>({
    roomType: 'Living Room',
    designStyle: 'Contemporary Indian Luxury',
    budgetTier: '₹5L - ₹10L',
    roomPhotoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    userNotes: ''
  });

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStatus, setProgressStatus] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [generatedConcept, setGeneratedConcept] = useState<AIDesignResult | null>(null);
  const [selectedAfterImage, setSelectedAfterImage] = useState<string>('');
  const [selectedStyleTitle, setSelectedStyleTitle] = useState<string>('');

  // Interactive Filter States for Step 5 Makeover Gallery
  const [filterStyle, setFilterStyle] = useState<string>('all');
  const [filterMood, setFilterMood] = useState<string>('all');
  const [filterAccent, setFilterAccent] = useState<string>('all');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useQuote();
  const { showToast } = useToast();

  // Check for auto-loaded room photo uploaded from homepage
  useEffect(() => {
    try {
      const savedPhoto = sessionStorage.getItem('ssi_uploaded_room_photo');
      if (savedPhoto) {
        setFormData((prev) => ({
          ...prev,
          roomPhotoUrl: savedPhoto
        }));
        setUploadedFileName('Room Photo from Homepage');
        setActiveStudioMode('photo');
        showToast('Auto-loaded your room photo from homepage in Photo Makeover mode!', 'info');
      }
    } catch {
      // ignore
    }
  }, []);

  const roomOptions = [
    { label: 'Living Room', desc: 'TV Louvers, False Ceiling & Seating' },
    { label: 'Master Bedroom', desc: 'Fluted Wardrobe & Ambient Backlit Headboard' },
    { label: 'Modular Kitchen', desc: 'Häfele Soft-Close & Acrylic High-Gloss Shutters' },
    { label: 'Corporate Office', desc: 'Acoustic Wall Panels & Glass Partitions' },
    { label: 'Luxury Bathroom', desc: 'Vanity Counter & Saint-Gobain Tinted Glass' }
  ];

  const styleOptions = [
    { label: 'Contemporary Indian Luxury', desc: 'Warm Teak, Italian Marble & Ambient LEDs' },
    { label: 'Modern Minimalist', desc: 'Monochromatic, Clean Straight Edges & Concealed Pulls' },
    { label: 'Warm Japandi', desc: 'Light Oak Wood, Natural Textures & Soft Beige' },
    { label: 'Industrial Elegance', desc: 'Matte Charcoal, Brushed Metal & Architectural Profiles' },
    { label: 'Royal Traditional', desc: 'Intricate Wooden Jali, Brass Finishes & Rich Walnut' }
  ];

  const budgetOptions = ['₹1L – ₹3L', '₹3L – ₹5L', '₹5L – ₹10L', '₹10L+'];

  const samplePhotos = [
    {
      label: 'Raw Living Room',
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
    },
    {
      label: 'Bare Modular Kitchen',
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80'
    },
    {
      label: 'Bare Master Bedroom',
      url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80'
    },
    {
      label: 'Raw Corporate Office',
      url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80'
    },
    {
      label: 'Empty Villa Hallway',
      url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1000&q=80'
    },
    {
      label: 'Unfinished Apartment',
      url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPEG/PNG/WebP)', 'error');
      return;
    }

    try {
      setUploadedFileName(file.name);
      const compressed = await compressImageFile(file, 1600, 1600, 0.85);
      setFormData((prev) => ({
        ...prev,
        roomPhotoUrl: compressed
      }));
      try {
        sessionStorage.setItem('ssi_uploaded_room_photo', compressed);
      } catch {
        // ignore
      }
      showToast(`Photo "${file.name}" loaded successfully!`, 'success');
    } catch {
      showToast('Could not load image, please try another file.', 'error');
    }
  };

  const handleDropFile = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please drop a valid image file (JPEG/PNG/WebP)', 'error');
      return;
    }

    try {
      setUploadedFileName(file.name);
      const compressed = await compressImageFile(file, 1600, 1600, 0.85);
      setFormData((prev) => ({
        ...prev,
        roomPhotoUrl: compressed
      }));
      try {
        sessionStorage.setItem('ssi_uploaded_room_photo', compressed);
      } catch {
        // ignore
      }
      showToast(`Photo "${file.name}" loaded successfully!`, 'success');
    } catch {
      showToast('Could not load image, please try another file.', 'error');
    }
  };

  const handleClearPhoto = () => {
    setUploadedFileName(null);
    setFormData((prev) => ({
      ...prev,
      roomPhotoUrl: samplePhotos[0].url
    }));
    try {
      sessionStorage.removeItem('ssi_uploaded_room_photo');
    } catch {
      // ignore
    }
    showToast('Reset photo to default sample', 'info');
  };

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setFilterStyle('all');
    setFilterMood('all');
    setFilterAccent('all');
    try {
      const result = await generateAIConcept(formData, (stage, pct) => {
        setProgressStatus(stage);
        setProgressPercent(pct);
      });
      setGeneratedConcept(result);
      setSelectedAfterImage(result.conceptImage);
      setSelectedStyleTitle(result.title);
      setStep(5);
      showToast('Photorealistic Turnkey Design generated successfully!', 'success');
    } catch (e) {
      showToast('Generation failed, please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResetFilters = () => {
    setFilterStyle('all');
    setFilterMood('all');
    setFilterAccent('all');
    showToast('All filters cleared', 'info');
  };

  // Compute filtered looks based on active filters
  const filteredViews = (generatedConcept?.alternateViews || []).filter((item) => {
    if (filterStyle !== 'all') {
      const matchCategory = item.styleCategory === filterStyle;
      const matchName = item.styleName.toLowerCase().includes(filterStyle.toLowerCase());
      if (!matchCategory && !matchName) return false;
    }
    if (filterMood !== 'all' && item.mood !== filterMood) {
      return false;
    }
    if (filterAccent !== 'all' && item.accent !== filterAccent) {
      return false;
    }
    return true;
  });

  const handleDownloadImage = () => {
    if (!generatedConcept) return;
    const imgToDownload = selectedAfterImage || generatedConcept.conceptImage;
    const link = document.createElement('a');
    link.href = imgToDownload;
    link.download = `shree-shyam-${formData.roomType.toLowerCase().replace(/\s+/g, '-')}-luxury-design.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded makeover design image!', 'success');
  };

  const handleAddAllRecommended = () => {
    const matched = (productsData as unknown as Product[]).slice(0, 3);
    matched.forEach((p) => addItem(p));
    showToast('Added recommended materials to your quotation list!', 'success');
  };

  return (
    <div className="pt-24 pb-28 min-h-screen bg-cream-50 dark:bg-forest-950 text-charcoal-800 dark:text-cream-100 relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Wizard Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-100 dark:bg-forest-900 border border-cream-200 dark:border-copper-500/40 text-[#B57731] dark:text-copper-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-copper-500" />
            <span>100% Free Lifetime Architectural AI & 3D Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950 dark:text-cream-50">
            Interactive Room Studio & Visualizer
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-200/80 mt-2 max-w-xl mx-auto">
            Design your space in real-time 3D with live rate estimates, or upload your actual room photo for a turnkey Before/After transformation with Century marine plywood and Häfele hardware.
          </p>

          {/* STUDIO MODE SWITCHER TABS */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex p-1.5 rounded-2xl bg-cream-100 dark:bg-forest-900 border border-cream-200 dark:border-copper-500/30 shadow-sm">
              <button
                type="button"
                onClick={() => setActiveStudioMode('3d')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeStudioMode === '3d'
                    ? 'bg-[#B57731] text-white shadow-md'
                    : 'text-charcoal-600 dark:text-cream-200 hover:text-[#B57731]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Interactive 3D Customizer (Live Colors & Rates)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveStudioMode('photo')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeStudioMode === 'photo'
                    ? 'bg-[#B57731] text-white shadow-md'
                    : 'text-charcoal-600 dark:text-cream-200 hover:text-[#B57731]'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>AI Photo Makeover (Upload & Slider)</span>
              </button>
            </div>
          </div>
        </div>

        {/* MODE 1: INTERACTIVE 3D ROOM CUSTOMIZER */}
        {activeStudioMode === '3d' && <RoomConfigurator3D />}

        {/* MODE 2: AI PHOTO MAKEOVER (BEFORE/AFTER SLIDER & FILTERED GALLERY) */}
        {activeStudioMode === 'photo' && (
          <div className="space-y-6">
            {/* Stepper Dots (1 to 4) */}
            {!generatedConcept && !isGenerating && (
              <div className="flex items-center justify-center gap-3 mb-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === num
                          ? 'bg-[#B57731] text-white shadow-glow-copper scale-110'
                          : step > num
                          ? 'bg-cream-200 dark:bg-forest-800 text-forest-950 dark:text-copper-300'
                          : 'bg-cream-100 dark:bg-forest-900 text-charcoal-400 border border-cream-200 dark:border-cream-200/10'
                      }`}
                    >
                      {step > num ? <Check className="w-4 h-4" /> : num}
                    </div>
                    {num < 4 && <div className="w-6 h-0.5 bg-cream-200 dark:bg-cream-200/10" />}
                  </div>
                ))}
              </div>
            )}

        {/* Stepped Loading Animation Experience */}
        {isGenerating && (
          <div className="bg-white dark:bg-forest-900/90 border border-cream-200 dark:border-copper-500/40 rounded-3xl p-8 sm:p-12 text-center shadow-card space-y-6">
            <div className="w-20 h-20 rounded-full bg-copper-500/20 border-2 border-copper-400 text-copper-500 flex items-center justify-center mx-auto animate-pulse">
              <Sparkles className="w-10 h-10 animate-spin" />
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
                Crafting Your Custom Concept...
              </h3>
              <p className="text-xs sm:text-sm text-copper-600 dark:text-copper-300 font-mono mt-2 min-h-[24px]">
                {progressStatus || 'Processing layout...'}
              </p>
            </div>

            {/* Animated Progress Bar */}
            <div className="max-w-md mx-auto space-y-1.5">
              <div className="w-full bg-cream-100 dark:bg-forest-950 h-2 rounded-full overflow-hidden border border-cream-200 dark:border-cream-200/10">
                <div
                  className="h-full bg-gradient-to-r from-[#B57731] via-copper-400 to-[#C68A43] transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-charcoal-400 font-mono">
                <span>Rendering 3D Textures</span>
                <span>{progressPercent}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Real Photo Upload / Select */}
        {!isGenerating && !generatedConcept && step === 1 && (
          <div className="bg-white dark:bg-forest-900/80 border border-cream-200 dark:border-copper-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-card">
            <div className="border-b border-cream-200 dark:border-cream-200/10 pb-4">
              <h3 className="font-serif font-bold text-xl text-forest-950 dark:text-cream-50">
                Step 1: Upload Your Room Photo
              </h3>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-300 mt-0.5">
                Upload a photo of your actual bare room or choose one of our sample rooms below.
              </p>
            </div>

            {/* REAL INTERACTIVE FILE UPLOAD BOX */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingFile(true);
                }}
                onDragLeave={() => setIsDraggingFile(false)}
                onDrop={handleDropFile}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all group ${
                  isDraggingFile
                    ? 'border-copper-500 bg-copper-500/10 scale-[1.01]'
                    : 'border-copper-400/60 dark:border-copper-500/40 bg-cream-50 dark:bg-forest-950/50 hover:bg-copper-500/5'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-copper-500/15 flex items-center justify-center mx-auto text-copper-600 dark:text-copper-400 mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-forest-950 dark:text-cream-50">
                  {uploadedFileName ? `Loaded: ${uploadedFileName}` : 'Click to Upload or Drag & Drop Room Photo'}
                </div>
                <p className="text-xs text-charcoal-400 dark:text-charcoal-300 mt-1">
                  Supports JPEG, PNG, WebP from mobile camera or PC (auto-optimized)
                </p>
              </div>
            </div>

            {/* Preview of Current Photo */}
            {formData.roomPhotoUrl && (
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-cream-200 dark:border-copper-500/30 shadow-inner">
                <img
                  src={formData.roomPhotoUrl}
                  alt="Room to transform"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-forest-950/80 text-cream-100 text-xs font-bold backdrop-blur-md">
                  Active Room for AI Transformation
                </div>
                {uploadedFileName && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearPhoto();
                    }}
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-red-600/90 hover:bg-red-700 text-white text-xs font-bold backdrop-blur-md flex items-center gap-1 shadow-md active:scale-95 transition-all"
                    title="Remove custom photo"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Remove Photo</span>
                  </button>
                )}
              </div>
            )}

            {/* Alternative: Curated Samples */}
            <div>
              <span className="text-xs font-bold uppercase text-charcoal-400 dark:text-charcoal-300 block mb-2">
                Or Pick a Sample Room:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {samplePhotos.map((photo, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setFormData({ ...formData, roomPhotoUrl: photo.url });
                      setUploadedFileName(null);
                    }}
                    className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      formData.roomPhotoUrl === photo.url && !uploadedFileName
                        ? 'border-[#B57731] shadow-md scale-[1.02]'
                        : 'border-cream-200 dark:border-cream-200/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={photo.url} alt={photo.label} className="w-full h-20 object-cover" />
                    <div className="p-1.5 bg-cream-100 dark:bg-forest-950 text-[10px] font-semibold text-center truncate">
                      {photo.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all active:scale-95"
              >
                <span>Next: Choose Room Type</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Room Type */}
        {!isGenerating && !generatedConcept && step === 2 && (
          <div className="bg-white dark:bg-forest-900/80 border border-cream-200 dark:border-copper-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-card">
            <div className="border-b border-cream-200 dark:border-cream-200/10 pb-4">
              <h3 className="font-serif font-bold text-xl text-forest-950 dark:text-cream-50">
                Step 2: What room are we designing?
              </h3>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-300 mt-0.5">
                Select the space to align lighting, cabinetry, and acoustic requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {roomOptions.map((opt) => (
                <div
                  key={opt.label}
                  onClick={() => setFormData({ ...formData, roomType: opt.label })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.roomType === opt.label
                      ? 'bg-copper-500/10 dark:bg-copper-500/20 border-[#B57731] shadow-sm'
                      : 'bg-cream-50 dark:bg-forest-950/60 border-cream-200 dark:border-cream-200/10 hover:border-copper-400'
                  }`}
                >
                  <div className="font-bold text-sm text-forest-950 dark:text-cream-50">{opt.label}</div>
                  <div className="text-xs text-charcoal-500 dark:text-charcoal-300 mt-1">{opt.desc}</div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-xl bg-cream-100 dark:bg-forest-800 text-forest-950 dark:text-cream-200 text-xs font-bold uppercase tracking-wider"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all"
              >
                <span>Next: Choose Style</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Select Design Style */}
        {!isGenerating && !generatedConcept && step === 3 && (
          <div className="bg-white dark:bg-forest-900/80 border border-cream-200 dark:border-copper-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-card">
            <div className="border-b border-cream-200 dark:border-cream-200/10 pb-4">
              <h3 className="font-serif font-bold text-xl text-forest-950 dark:text-cream-50">
                Step 3: Select Design Style
              </h3>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-300 mt-0.5">
                Pick the visual aesthetic for materials, veneers, and color moods.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {styleOptions.map((opt) => (
                <div
                  key={opt.label}
                  onClick={() => setFormData({ ...formData, designStyle: opt.label })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.designStyle === opt.label
                      ? 'bg-copper-500/10 dark:bg-copper-500/20 border-[#B57731] shadow-sm'
                      : 'bg-cream-50 dark:bg-forest-950/60 border-cream-200 dark:border-cream-200/10 hover:border-copper-400'
                  }`}
                >
                  <div className="font-bold text-sm text-forest-950 dark:text-cream-50">{opt.label}</div>
                  <div className="text-xs text-charcoal-500 dark:text-charcoal-300 mt-1">{opt.desc}</div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-xl bg-cream-100 dark:bg-forest-800 text-forest-950 dark:text-cream-200 text-xs font-bold uppercase tracking-wider"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all"
              >
                <span>Next: Budget Tier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Budget Tier & Final Trigger */}
        {!isGenerating && !generatedConcept && step === 4 && (
          <div className="bg-white dark:bg-forest-900/80 border border-cream-200 dark:border-copper-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-card">
            <div className="border-b border-cream-200 dark:border-cream-200/10 pb-4">
              <h3 className="font-serif font-bold text-xl text-forest-950 dark:text-cream-50">
                Step 4: Target Budget Range
              </h3>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-300 mt-0.5">
                We calibrate plywood grade, laminate thicknesses, and hardware mechanisms to match your target budget.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {budgetOptions.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setFormData({ ...formData, budgetTier: b })}
                  className={`py-3.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                    formData.budgetTier === b
                      ? 'bg-[#B57731] text-white border-[#B57731] shadow-glow-copper'
                      : 'bg-cream-50 dark:bg-forest-950 text-forest-950 dark:text-cream-200 border-cream-200 dark:border-cream-200/10 hover:border-copper-400'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-5 py-3 rounded-xl bg-cream-100 dark:bg-forest-800 text-forest-950 dark:text-cream-200 text-xs font-bold uppercase tracking-wider"
              >
                Back
              </button>
              <button
                onClick={handleStartGeneration}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Photorealistic Concept</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Result Concept Output */}
        {generatedConcept && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Interactive Before/After Visual */}
            <div className="bg-white dark:bg-forest-900/80 border border-cream-200 dark:border-copper-500/30 rounded-3xl p-6 sm:p-8 shadow-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cream-200 dark:border-cream-200/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-copper-500/15 text-[#B57731] dark:text-copper-300 border border-copper-500/30">
                      Photorealistic Turnkey Concept #{generatedConcept.conceptId}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50">
                    {selectedStyleTitle || generatedConcept.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white text-xs font-bold shadow-md transition-all active:scale-95"
                    title="Download high-resolution design visual"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Design</span>
                  </button>
                  <button
                    onClick={() => {
                      setGeneratedConcept(null);
                      setFilterStyle('all');
                      setFilterMood('all');
                      setFilterAccent('all');
                      setStep(1);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cream-100 dark:bg-forest-800 text-forest-950 dark:text-cream-200 hover:bg-cream-200 text-xs font-semibold self-start sm:self-auto transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Another Room</span>
                  </button>
                </div>
              </div>

              {/* Informational Transformation Banner */}
              <div className="text-xs font-medium text-[#B57731] dark:text-copper-300 bg-copper-500/10 border border-copper-500/25 px-3.5 py-2.5 rounded-xl flex items-center justify-between">
                <span>
                  ✨ <strong>Turnkey Transformation:</strong> Drag the slider center to see your space transformed into a fully finished luxury room with Century marine plywood, 3000K warm LED lighting & Häfele fittings.
                </span>
                <span className="font-mono text-[11px] opacity-75 hidden sm:inline">
                  Drag ◀ ▶
                </span>
              </div>

              {/* Before/After Draggable Slider */}
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <BeforeAfterSlider
                  beforeImage={generatedConcept.beforeImage}
                  afterImage={selectedAfterImage || generatedConcept.conceptImage}
                  beforeLabel={uploadedFileName ? 'Your Uploaded Room' : 'Original Room'}
                  afterLabel="Shree Shyam Turnkey Luxury Design"
                  className="h-[380px] sm:h-[480px] w-full"
                />
              </div>

              {/* Interactive Design Explorer & Multi-Look Filter Gallery */}
              {generatedConcept.alternateViews && generatedConcept.alternateViews.length > 0 && (
                <div className="pt-6 border-t border-cream-200 dark:border-cream-200/10 space-y-5">
                  {/* Gallery Header & Filter Reset */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-copper-500" />
                        <span className="font-serif font-bold text-base text-forest-950 dark:text-cream-50">
                          Explore & Filter Luxury Makeover Variations
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-copper-500/15 text-copper-800 dark:text-copper-300 font-mono font-bold">
                          {filteredViews.length} Available
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-500 dark:text-charcoal-300 mt-1">
                        Filter by architectural style, lighting mood, or premium materials. Click any look below to instantly load it in the 3D Before/After slider.
                      </p>
                    </div>

                    {(filterStyle !== 'all' || filterMood !== 'all' || filterAccent !== 'all') && (
                      <button
                        type="button"
                        onClick={handleResetFilters}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-copper-500/15 hover:bg-copper-500/25 text-[#B57731] dark:text-copper-300 text-xs font-bold self-start md:self-auto transition-all"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset Filters</span>
                      </button>
                    )}
                  </div>

                  {/* Filter Toolbar Controls */}
                  <div className="p-4 rounded-2xl bg-cream-50/80 dark:bg-forest-950/70 border border-cream-200 dark:border-cream-200/10 space-y-3 shadow-inner">
                    {/* Style Filters */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 min-w-[70px] flex items-center gap-1">
                        <Filter className="w-3 h-3 text-copper-500" />
                        <span>Style:</span>
                      </span>
                      {[
                        { key: 'all', label: 'All Styles' },
                        { key: 'contemporary', label: 'Contemporary' },
                        { key: 'minimalist', label: 'Minimalist' },
                        { key: 'japandi', label: 'Warm Japandi' },
                        { key: 'industrial', label: 'Industrial' },
                        { key: 'royal', label: 'Royal Traditional' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setFilterStyle(item.key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            filterStyle === item.key
                              ? 'bg-[#B57731] text-white shadow-sm'
                              : 'bg-white dark:bg-forest-900 text-charcoal-600 dark:text-cream-200 border border-cream-200 dark:border-cream-200/10 hover:border-copper-400'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Lighting Mood Filters */}
                    <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-cream-200/60 dark:border-cream-200/10">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 min-w-[70px] flex items-center gap-1">
                        <Sun className="w-3 h-3 text-amber-500" />
                        <span>Mood:</span>
                      </span>
                      {[
                        { key: 'all', label: 'All Moods' },
                        { key: 'Warm 3000K Cove', label: 'Warm 3000K Cove' },
                        { key: 'Daylight 4000K', label: 'Daylight 4000K' },
                        { key: 'Ambient Luxury', label: 'Ambient Luxury' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setFilterMood(item.key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            filterMood === item.key
                              ? 'bg-[#B57731] text-white shadow-sm'
                              : 'bg-white dark:bg-forest-900 text-charcoal-600 dark:text-cream-200 border border-cream-200 dark:border-cream-200/10 hover:border-copper-400'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Material Accent Filters */}
                    <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-cream-200/60 dark:border-cream-200/10">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 min-w-[70px] flex items-center gap-1">
                        <Layers className="w-3 h-3 text-copper-500" />
                        <span>Finish:</span>
                      </span>
                      {[
                        { key: 'all', label: 'All Finishes' },
                        { key: 'Italian Marble', label: 'Italian Marble' },
                        { key: 'Fluted Louvers', label: 'Fluted Louvers' },
                        { key: 'Wood Veneer', label: 'Wood Veneer' },
                        { key: 'Acoustic Panels', label: 'Acoustic Panels' },
                        { key: 'High-Gloss Acrylic', label: 'High-Gloss Acrylic' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setFilterAccent(item.key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            filterAccent === item.key
                              ? 'bg-[#B57731] text-white shadow-sm'
                              : 'bg-white dark:bg-forest-900 text-charcoal-600 dark:text-cream-200 border border-cream-200 dark:border-cream-200/10 hover:border-copper-400'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtered Grid of Makeover Looks */}
                  {filteredViews.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl bg-cream-50 dark:bg-forest-950/60 border border-cream-200 dark:border-cream-200/10 space-y-3">
                      <p className="text-sm font-semibold text-charcoal-600 dark:text-cream-200">
                        No designs match this specific combination of filters.
                      </p>
                      <button
                        type="button"
                        onClick={handleResetFilters}
                        className="px-4 py-2 rounded-xl bg-[#B57731] text-white text-xs font-bold shadow-md hover:bg-[#9E6526] transition-all"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredViews.map((alt) => {
                        const isSelected =
                          (selectedAfterImage || generatedConcept.conceptImage) === alt.imageUrl;
                        return (
                          <div
                            key={alt.id}
                            onClick={() => {
                              setSelectedAfterImage(alt.imageUrl);
                              setSelectedStyleTitle(`${alt.styleName} - ${alt.tag}`);
                              showToast(`Loaded "${alt.styleName}" into Before/After slider!`, 'info');
                              window.scrollTo({ top: 280, behavior: 'smooth' });
                            }}
                            className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'border-[#B57731] bg-copper-500/10 shadow-lg ring-2 ring-copper-400/40 scale-[1.01]'
                                : 'border-cream-200 dark:border-cream-200/10 hover:border-copper-400 bg-white dark:bg-forest-950/70 shadow-sm hover:shadow-md'
                            }`}
                          >
                            <div>
                              {/* Thumbnail with overlay badges */}
                              <div className="h-44 w-full relative overflow-hidden bg-cream-100 dark:bg-forest-900">
                                <img
                                  src={alt.imageUrl}
                                  alt={alt.styleName}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {isSelected ? (
                                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#B57731] text-white text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1 backdrop-blur-sm">
                                    <Check className="w-3 h-3" />
                                    <span>Active Look</span>
                                  </div>
                                ) : (
                                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-forest-950/80 text-cream-100 text-[10px] font-semibold backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    <span>Click to Preview</span>
                                  </div>
                                )}
                                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 text-amber-300 text-[10px] font-medium backdrop-blur-sm flex items-center gap-1">
                                  <Sun className="w-2.5 h-2.5" />
                                  <span>{alt.mood}</span>
                                </div>
                              </div>

                              {/* Card Body */}
                              <div className="p-3.5 space-y-1.5">
                                <div className="font-bold text-sm text-forest-950 dark:text-cream-50 line-clamp-1 group-hover:text-copper-600 transition-colors">
                                  {alt.styleName}
                                </div>
                                <p className="text-xs text-charcoal-500 dark:text-charcoal-300 line-clamp-2 leading-relaxed">
                                  {alt.tag}
                                </p>
                              </div>
                            </div>

                            {/* Card Footer: Material tag & Action status */}
                            <div className="p-3.5 pt-0 flex items-center justify-between gap-2 border-t border-cream-100 dark:border-cream-200/5 mt-2">
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cream-100 dark:bg-forest-900 text-charcoal-600 dark:text-copper-300 border border-cream-200 dark:border-cream-200/10">
                                {alt.accent}
                              </span>
                              <span
                                className={`text-[11px] font-bold px-2 py-0.5 rounded-lg transition-colors ${
                                  isSelected
                                    ? 'text-[#B57731] bg-copper-500/15'
                                    : 'text-charcoal-500 group-hover:text-copper-600 group-hover:bg-copper-500/10'
                                }`}
                              >
                                {isSelected ? 'In Slider' : 'Preview ◀▶'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Color Palette & Recommended Materials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Color Palette */}
              <div className="lg:col-span-5 bg-white dark:bg-forest-900/80 border border-cream-200 dark:border-copper-500/30 rounded-3xl p-6 space-y-4 shadow-card">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-copper-600 dark:text-copper-400" />
                  <h3 className="font-serif font-bold text-lg text-forest-950 dark:text-cream-50">
                    Color Palette
                  </h3>
                </div>
                <div className="space-y-3">
                  {generatedConcept.colorPalette.map((col) => (
                    <div
                      key={col.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-cream-50 dark:bg-forest-950/60 border border-cream-200 dark:border-cream-200/10"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-lg shadow-inner border border-black/10 dark:border-white/20"
                          style={{ backgroundColor: col.hex }}
                        />
                        <div>
                          <div className="font-bold text-xs text-forest-950 dark:text-cream-100">{col.name}</div>
                          <div className="text-[11px] text-charcoal-400">{col.role}</div>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-copper-600 dark:text-copper-300 font-semibold">{col.hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Certified Materials */}
              <div className="lg:col-span-7 bg-white dark:bg-forest-900/80 border border-cream-200 dark:border-copper-500/30 rounded-3xl p-6 space-y-4 shadow-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-copper-600 dark:text-copper-400" />
                    <h3 className="font-serif font-bold text-lg text-forest-950 dark:text-cream-50">
                      Recommended Materials
                    </h3>
                  </div>
                  <span className="text-xs text-copper-600 dark:text-copper-300 font-mono">
                    Budget Tier: {generatedConcept.estimatedCostRange}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {generatedConcept.materialsRecommended.map((mat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-cream-50 dark:bg-forest-950/60 border border-cream-200 dark:border-cream-200/10 text-xs"
                    >
                      <div>
                        <div className="font-bold text-forest-950 dark:text-cream-100">{mat.name}</div>
                        <div className="text-[11px] text-charcoal-400">
                          {mat.brand} • {mat.category}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-copper-600 dark:text-copper-300 font-bold">{mat.rateEst}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddAllRecommended}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Materials to Quote</span>
                  </button>

                  <Link
                    to="/site-visit"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cream-100 dark:bg-forest-800 hover:bg-cream-200 text-forest-950 dark:text-cream-100 border border-cream-200 dark:border-cream-200/20 font-bold text-xs uppercase tracking-wider transition-all text-center"
                  >
                    <span>Book Site Visit for This Design</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
          </div>
        )}
      </div>
    </div>
  );
};
