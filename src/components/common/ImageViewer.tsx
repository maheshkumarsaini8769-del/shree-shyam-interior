import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageViewerProps {
  isOpen: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
  title?: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  images,
  initialIndex = 0,
  onClose,
  title
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const touchDistance = useRef<number | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [initialIndex, isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  const handleNext = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDoubleTap = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.2);
    }
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.3, 4));
    } else {
      setScale((prev) => {
        const next = Math.max(prev - 0.3, 1);
        if (next === 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Touch handlers for mobile pinch-to-zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchDistance.current = dist;
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchDistance.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchDistance.current;
      setScale((prev) => Math.min(Math.max(prev * factor, 1), 4));
      touchDistance.current = dist;
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.current.x,
        y: e.touches[0].clientY - dragStart.current.y
      });
    }
  };

  const handleTouchEnd = () => {
    touchDistance.current = null;
    setIsDragging(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-forest-950/95 backdrop-blur-xl flex flex-col justify-between select-none touch-none"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200/10 z-10">
          <div className="flex items-center gap-3">
            <span className="text-copper-400 font-mono text-sm tracking-wider font-semibold">
              {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            {title && (
              <span className="text-cream-200 text-sm font-medium hidden sm:inline-block truncate max-w-md">
                • {title}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale((s) => Math.min(s + 0.4, 4))}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-cream-100 transition-colors"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setScale((s) => {
                  const next = Math.max(s - 0.4, 1);
                  if (next === 1) setPosition({ x: 0, y: 0 });
                  return next;
                });
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-cream-100 transition-colors"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            {scale > 1 && (
              <button
                onClick={() => {
                  setScale(1);
                  setPosition({ x: 0, y: 0 });
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-copper-400 transition-colors"
                title="Reset Zoom"
                aria-label="Reset Zoom"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-copper-500 hover:bg-copper-600 text-white transition-colors ml-2"
              title="Close Gallery"
              aria-label="Close Gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Image Container */}
        <div
          className="relative flex-1 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onDoubleClick={handleDoubleTap}
        >
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`Gallery view ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale }}
            transition={{ duration: 0.25 }}
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              maxHeight: '85vh',
              maxWidth: '92vw',
              objectFit: 'contain'
            }}
            className="rounded-lg shadow-2xl pointer-events-none"
            draggable={false}
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-forest-900/80 hover:bg-forest-800 text-cream-100 backdrop-blur-md border border-cream-200/10 transition-all hover:scale-110 active:scale-95"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-forest-900/80 hover:bg-forest-800 text-cream-100 backdrop-blur-md border border-cream-200/10 transition-all hover:scale-110 active:scale-95"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="py-3 px-4 border-t border-cream-200/10 flex items-center justify-center gap-2 overflow-x-auto z-10">
          <div className="flex items-center gap-2 max-w-full">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setScale(1);
                  setPosition({ x: 0, y: 0 });
                  setCurrentIndex(idx);
                }}
                className={`relative w-12 h-12 rounded-md overflow-hidden shrink-0 transition-all duration-300 ${
                  currentIndex === idx
                    ? 'ring-2 ring-copper-500 scale-105 opacity-100'
                    : 'opacity-40 hover:opacity-80'
                }`}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
