import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useSmoothScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // Never run Lenis on admin routes - ensures 100% native independent scrolling on admin panel
    if (location.pathname.startsWith('/admin')) {
      return;
    }

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Mobile touch devices perform best with native smooth scroll
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let lenisInstance: any = null;
    let animationFrameId: number;

    import('lenis').then(({ default: Lenis }) => {
      // Re-verify that user did not navigate to admin while import was resolving
      if (window.location.pathname.startsWith('/admin')) {
        return;
      }

      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      function raf(time: number) {
        lenisInstance?.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      }

      animationFrameId = requestAnimationFrame(raf);
    });

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, [location.pathname]);
};
