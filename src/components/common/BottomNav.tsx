import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Layers, Sparkles, FolderKanban, ShoppingBag, User } from 'lucide-react';
import { useQuote } from '../../context/QuoteContext';

export const BottomNav: React.FC = () => {
  const { totalItemCount } = useQuote();
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  // Detect virtual keyboard on mobile by tracking resize
  useEffect(() => {
    let initialHeight = window.innerHeight;

    const handleResize = () => {
      // If window height shrinks substantially, virtual keyboard is active
      if (window.innerHeight < initialHeight * 0.75) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) return null;

  const tabs = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/products', label: 'Products', icon: Layers },
    { to: '/design-ai', label: 'Design AI', icon: Sparkles, highlight: true },
    { to: '/projects', label: 'Projects', icon: FolderKanban },
    { to: '/quote', label: 'Quote', icon: ShoppingBag, badge: totalItemCount },
    { to: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom,0px)] bg-forest-950/95 backdrop-blur-xl border-t border-cream-200/10 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
      <nav className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.to;

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 ${
                isActive ? 'text-copper-400 scale-105' : 'text-cream-300/80 hover:text-cream-100'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${tab.highlight && !isActive ? 'text-copper-300' : ''}`} />
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-copper-500 text-forest-950 text-[9px] font-extrabold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
                {tab.highlight && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-copper-400 animate-pulse" />
                )}
              </div>
              <span className="text-[10px] font-medium tracking-tight mt-1">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-copper-400 mt-0.5 shadow-glow-copper" />
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
