/**
 * Universal Image Fallback & Verification Utility for Shree Shyam Interior
 * Provides reliable fallback image URLs and an offline-proof SVG placeholder
 * ensuring NO broken image icons appear anywhere across the site.
 */

// Offline-proof luxury architectural placeholder SVG
export const FALLBACK_LUXURY_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%2314251F"/><pattern id="grain" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 20 Q 10 10, 20 20 T 40 20" fill="none" stroke="%231D2D27" stroke-width="1.5"/></pattern><rect width="800" height="600" fill="url(%23grain)"/><g transform="translate(400, 240)"><circle cx="0" cy="0" r="70" fill="%231D2D27" stroke="%23C68A43" stroke-width="3"/><path d="M-30 15 L0 -25 L30 15" fill="none" stroke="%23C68A43" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M-18 10 L-18 30 L18 30 L18 10" fill="none" stroke="%23F5F1E8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><rect x="-5" y="15" width="10" height="15" fill="%23C68A43"/></g><text x="400" y="370" font-family="Cinzel, Georgia, serif" font-size="24" font-weight="bold" fill="%23F5F1E8" text-anchor="middle" letter-spacing="4">SHREE SHYAM INTERIOR</text><text x="400" y="405" font-family="Montserrat, sans-serif" font-size="13" font-weight="600" fill="%23C68A43" text-anchor="middle" letter-spacing="3">PREMIUM ARCHITECTURAL LIVING</text></svg>`;

// Verified 200 OK Unsplash Fallbacks by Category
export const VERIFIED_FALLBACKS = {
  plywood: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1200&q=80',
  laminates: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  hardware: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
  lighting: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
  furniture: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
  electrical: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
  tools: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=1200&q=80',
  ceiling: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  living: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  kitchen: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
  bedroom: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
};

/**
 * Attaches to any <img> onError to seamlessly substitute a broken or blocked URL
 */
export const onImageErrorWithFallback = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  preferredFallback?: string
) => {
  const target = e.currentTarget;
  if (preferredFallback && target.src !== preferredFallback) {
    target.src = preferredFallback;
  } else {
    target.src = FALLBACK_LUXURY_SVG;
  }
};
