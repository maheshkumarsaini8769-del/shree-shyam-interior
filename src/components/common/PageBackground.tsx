import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Site-wide page wallpaper.
 *
 * Every page of the public website floats on top of a soft, warm interior wall
 * texture (cream plaster, teak slats, plant shadows). The wallpaper is a single
 * fixed layer behind all content, so page/section surfaces can stay translucent
 * and the texture breathes through while scrolling.
 */

const BACKGROUND_DIR = '/backgrounds';

const image = (name: string) => `${BACKGROUND_DIR}/page-${name}.jpg`;

/** Route -> wallpaper mapping (per the approved page-wise background sheet). */
const ROUTE_MATCHERS: Array<{ test: (pathname: string) => boolean; src: string }> = [
  { test: (p) => p.startsWith('/about'), src: image('about') },
  { test: (p) => p.startsWith('/services'), src: image('services') },
  { test: (p) => p.startsWith('/projects') || p.startsWith('/products'), src: image('projects') },
  { test: (p) => p.startsWith('/contact'), src: image('contact') },
];

const ALL_WALLPAPERS = ['home', 'about', 'services', 'projects', 'contact'].map(image);

export const resolvePageBackground = (pathname: string): string => {
  const match = ROUTE_MATCHERS.find((entry) => entry.test(pathname));
  return match ? match.src : image('home');
};

type Layer = { key: string; src: string };

export const PageBackground: React.FC = () => {
  const { pathname } = useLocation();
  const target = resolvePageBackground(pathname);
  const [layers, setLayers] = useState<Layer[]>(() => [{ key: 'initial', src: target }]);

  // Flag the body so surface translucency + veil rules only apply when the wallpaper is on
  useEffect(() => {
    document.body.classList.add('has-site-bg');
    return () => document.body.classList.remove('has-site-bg');
  }, []);

  // Crossfade to the new page wallpaper once it is decoded (no white flash, no pop-in)
  useEffect(() => {
    let cancelled = false;
    let applied = false;

    const apply = () => {
      if (cancelled || applied) return;
      applied = true;
      setLayers((prev) => {
        const top = prev[prev.length - 1];
        if (top.src === target) return prev;
        return [...prev, { key: `${target}-${Date.now()}`, src: target }].slice(-2);
      });
    };

    const loader = new Image();
    loader.decoding = 'async';
    loader.onload = apply;
    loader.onerror = apply;
    loader.src = target;
    if (loader.complete) apply();

    return () => {
      cancelled = true;
    };
  }, [target]);

  // Warm the cache for the remaining page wallpapers while the browser is idle
  useEffect(() => {
    const preload = () => {
      ALL_WALLPAPERS.filter((src) => src !== target).forEach((src) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = src;
      });
    };

    const idle = (window as any).requestIdleCallback;
    const handle = idle ? idle(preload, { timeout: 4000 }) : window.setTimeout(preload, 2500);
    return () => {
      const cancelIdle = (window as any).cancelIdleCallback;
      if (idle && cancelIdle) cancelIdle(handle);
      else window.clearTimeout(handle as number);
    };
  }, [target]);

  return (
    <div className="site-bg" aria-hidden="true">
      {layers.map((layer, index) => (
        <div
          key={layer.key}
          className={`site-bg__photo${index === layers.length - 1 && layers.length > 1 ? ' site-bg__photo--enter' : ''}`}
          style={{ backgroundImage: `url("${layer.src}")` }}
        />
      ))}
      <div className="site-bg__veil" />
    </div>
  );
};

export default PageBackground;
