import React, { useState, useRef, useCallback } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { onImageErrorWithFallback } from '../../utils/imageFallback';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  badgePosition?: 'top' | 'bottom';
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before: Raw Space',
  afterLabel = 'After: Shree Shyam Turnkey',
  badgePosition = 'bottom',
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(3, Math.min(97, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const badgePlacementClass = badgePosition === 'top' ? 'top-3 sm:top-4' : 'bottom-3 sm:bottom-4';

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative overflow-hidden rounded-2xl select-none cursor-ew-resize touch-none ${
        isDragging ? 'shadow-2xl' : 'shadow-elevated'
      } ${className}`}
    >
      {/* After Image: Finished Turnkey Space (Full Background) */}
      <img
        src={afterImage}
        alt="After Turnkey Renovation"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none block select-none"
        loading="eager"
        onError={(e) => onImageErrorWithFallback(e, 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80')}
      />

      {/* Before Image: Raw or User Uploaded Room
          Uses CSS clipPath so the image is NEVER squished or deformed regardless of slider position! */}
      <img
        src={beforeImage}
        alt="Before Space"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none block select-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
        loading="eager"
        onError={(e) => onImageErrorWithFallback(e, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80')}
      />

      {/* Floating Badges */}
      <div className={`absolute ${badgePlacementClass} left-3 sm:left-4 z-10 pointer-events-none`}>
        <span className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-full bg-forest-950/85 text-cream-100 backdrop-blur-md border border-white/15 shadow-md">
          {beforeLabel}
        </span>
      </div>

      <div className={`absolute ${badgePlacementClass} right-3 sm:right-4 z-10 pointer-events-none`}>
        <span className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-full bg-[#E0D8C8] text-forest-950 backdrop-blur-md shadow-md">
          {afterLabel}
        </span>
      </div>

      {/* Draggable Divider Line & Knob with <> icon */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.6)] pointer-events-none z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white text-forest-950 flex items-center justify-center shadow-elevated border border-copper-400 transition-transform hover:scale-105 active:scale-95">
          <ChevronsLeftRight className="w-4 h-4 text-forest-900" />
        </div>
      </div>
    </div>
  );
};
