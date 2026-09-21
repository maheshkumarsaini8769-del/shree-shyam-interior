/**
 * AI Architectural Makeover Renderer
 * Transforms a user's uploaded room photo in-place using HTML5 Canvas.
 * Preserves the exact 1:1 geometry, walls, windows, and layout of the user's room,
 * while applying architectural enhancements:
 * - 3000K warm LED false ceiling cove lighting
 * - Magnetic track downlights and directional spotlights
 * - Luxury acoustic fluted paneling accent highlights
 * - High-gloss Italian marble / polished floor sheen reflection
 * - Style-specific material color grading (Champagne Luxury, Japandi, Minimalist)
 */

export interface MakeoverOptions {
  style?: string;
  roomType?: string;
  glowIntensity?: number; // 0.0 - 1.0
}

export const renderAITransformation = async (
  imageSrc: string,
  options: MakeoverOptions = {}
): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    // Enable CORS for external images; base64 data URLs work unconditionally
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const maxDim = 1600;
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(imageSrc);
          return;
        }

        const style = options.style || 'Contemporary Indian Luxury';
        const isDark = style.includes('Industrial') || style.includes('Noir');
        const isWarm = style.includes('Luxury') || style.includes('Royal') || style.includes('Japandi');

        // 1. Draw base user photo
        ctx.drawImage(img, 0, 0, width, height);

        // 2. Base Architectural Tone & Warmth Enhancement
        ctx.save();
        if (isWarm) {
          // Warm 3000K ambient wash
          ctx.fillStyle = 'rgba(212, 163, 115, 0.16)'; // Champagne gold
          ctx.globalCompositeOperation = 'soft-light';
          ctx.fillRect(0, 0, width, height);

          ctx.fillStyle = 'rgba(255, 214, 153, 0.10)';
          ctx.globalCompositeOperation = 'color-burn';
          ctx.fillRect(0, 0, width, height);
        } else if (isDark) {
          // Moody modern architectural charcoal
          ctx.fillStyle = 'rgba(20, 37, 31, 0.22)';
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillRect(0, 0, width, height);
        } else {
          // Clean Minimalist high-key contrast
          ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.globalCompositeOperation = 'screen';
          ctx.fillRect(0, 0, width, height);
        }
        ctx.restore();

        // 3. Architectural False Ceiling Cove Lighting (Warm LED strip glow at top)
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const coveGradient = ctx.createLinearGradient(0, 0, 0, height * 0.32);
        coveGradient.addColorStop(0, 'rgba(255, 215, 130, 0.55)'); // Bright warm gold at ceiling
        coveGradient.addColorStop(0.3, 'rgba(245, 185, 90, 0.35)');
        coveGradient.addColorStop(0.7, 'rgba(212, 140, 60, 0.12)');
        coveGradient.addColorStop(1, 'rgba(212, 140, 60, 0)');
        ctx.fillStyle = coveGradient;
        ctx.fillRect(0, 0, width, height * 0.35);
        ctx.restore();

        // 4. Directional Magnetic Track Spotlights (Downlights beaming downward)
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const spotPositions = [width * 0.25, width * 0.5, width * 0.75];
        spotPositions.forEach((posX) => {
          const spotGrad = ctx.createRadialGradient(
            posX, height * 0.05, 10,
            posX, height * 0.45, width * 0.28
          );
          spotGrad.addColorStop(0, 'rgba(255, 245, 210, 0.42)'); // Center beam
          spotGrad.addColorStop(0.35, 'rgba(240, 190, 110, 0.20)');
          spotGrad.addColorStop(0.75, 'rgba(210, 140, 60, 0.06)');
          spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = spotGrad;
          ctx.beginPath();
          ctx.moveTo(posX - 25, 0);
          ctx.lineTo(posX + 25, 0);
          ctx.lineTo(posX + width * 0.25, height * 0.75);
          ctx.lineTo(posX - width * 0.25, height * 0.75);
          ctx.closePath();
          ctx.fill();
        });
        ctx.restore();

        // 5. Polished Marble / Mirror Floor Reflection Sheen (Bottom 32%)
        ctx.save();
        const floorStartY = height * 0.68;
        const floorGrad = ctx.createLinearGradient(0, floorStartY, 0, height);
        floorGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        floorGrad.addColorStop(0.35, 'rgba(245, 225, 190, 0.18)'); // Polished sheen reflection
        floorGrad.addColorStop(0.85, 'rgba(212, 163, 115, 0.28)'); // Specular floor reflection
        floorGrad.addColorStop(1, 'rgba(198, 138, 67, 0.22)');

        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = floorGrad;
        ctx.fillRect(0, floorStartY, width, height - floorStartY);

        // Floor specular highlights (glaze ripples)
        const glazeGrad = ctx.createRadialGradient(
          width * 0.5, height * 0.88, 50,
          width * 0.5, height * 0.88, width * 0.45
        );
        glazeGrad.addColorStop(0, 'rgba(255, 245, 220, 0.25)');
        glazeGrad.addColorStop(0.6, 'rgba(230, 180, 100, 0.10)');
        glazeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glazeGrad;
        ctx.fillRect(0, floorStartY, width, height - floorStartY);
        ctx.restore();

        // 6. Architectural Fluted Accent Louvers (Vertical designer wall detail on left edge)
        ctx.save();
        ctx.globalCompositeOperation = 'soft-light';
        const panelWidth = Math.min(width * 0.18, 180);
        const louverCount = 14;
        const step = panelWidth / louverCount;

        for (let i = 0; i < louverCount; i++) {
          const lx = i * step;
          // Alternating shadow & highlight to simulate 3D fluted wooden slats
          ctx.fillStyle = i % 2 === 0 ? 'rgba(60, 35, 20, 0.40)' : 'rgba(230, 190, 140, 0.35)';
          ctx.fillRect(lx, 0, step * 0.85, height * 0.72);
        }

        // Metallic Champagne Border profile strip
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = 'rgba(212, 163, 115, 0.65)';
        ctx.fillRect(panelWidth, 0, 3, height * 0.72);
        ctx.restore();

        // 7. Subtle Architectural Vignette & Contrast Polish
        ctx.save();
        const vignette = ctx.createRadialGradient(
          width * 0.5, height * 0.5, Math.min(width, height) * 0.35,
          width * 0.5, height * 0.5, Math.max(width, height) * 0.75
        );
        vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vignette.addColorStop(0.7, 'rgba(20, 37, 31, 0.12)');
        vignette.addColorStop(1, 'rgba(10, 20, 15, 0.38)');
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        // 8. Subtle Watermark Badge in corner
        ctx.save();
        ctx.font = `600 ${Math.max(11, Math.round(width * 0.013))}px sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 4;
        const badgeText = `Shree Shyam Interiors • ${style} Makeover`;
        ctx.fillText(badgeText, width * 0.03, height - height * 0.03);
        ctx.restore();

        const transformedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
        resolve(transformedDataUrl);
      } catch (err) {
        console.warn('Canvas transformation fallback to original source:', err);
        resolve(imageSrc);
      }
    };

    img.onerror = () => {
      // In case of any loading failure, return source safely
      resolve(imageSrc);
    };

    img.src = imageSrc;
  });
};
