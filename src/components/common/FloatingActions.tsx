import React from 'react';
import { MessageSquare, Phone, MapPin } from 'lucide-react';
import { apiService } from '../../services/apiService';


export const FloatingActions: React.FC = () => {
  return (
    <aside
      aria-label="Quick contact and showroom actions"
      className="fixed bottom-20 lg:bottom-8 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none"
    >
      {/* Showroom Directions Button */}
      <a
        href="https://maps.google.com/?q=Shree+Shyam+Interior+Sikar+Rajasthan"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Showroom Location Directions"
        className="pointer-events-auto flex items-center gap-2 p-3 rounded-full bg-forest-900/90 text-copper-300 border border-copper-500/30 backdrop-blur-md shadow-card hover:bg-forest-800 hover:scale-105 active:scale-95 transition-all group"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold text-cream-100 group-hover:max-w-xs transition-all duration-300 ease-out px-0 group-hover:px-2">
          Showroom Sikar
        </span>
        <MapPin className="w-5 h-5 text-copper-400" />
      </a>

      {/* Direct Call Button */}
      <a
        href="tel:+919876543210"
        aria-label="Call Shree Shyam Interior Desk"
        className="pointer-events-auto flex items-center gap-2 p-3 rounded-full bg-forest-900/90 text-cream-100 border border-cream-200/20 backdrop-blur-md shadow-card hover:bg-forest-800 hover:scale-105 active:scale-95 transition-all group"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold text-cream-100 group-hover:max-w-xs transition-all duration-300 ease-out px-0 group-hover:px-2">
          +91 98765 43210
        </span>
        <Phone className="w-5 h-5 text-copper-400" />
      </a>

      {/* WhatsApp Chat Button */}
      <a
        href="https://wa.me/919876543210?text=Hello%20Shree%20Shyam%20Interior,%20I%20would%20like%20to%20consult%20for%20my%20interior%20project."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          apiService.submitWhatsAppOrder({
            customerName: 'Quick WhatsApp Visitor',
            phone: '+91 98765 43210 (Clicked Chat)',
            orderType: 'General Chat',
            message: 'Initiated WhatsApp consultation from website floating action button',
            status: 'New'
          }).catch(() => {});
        }}
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto flex items-center gap-2 p-3.5 rounded-full bg-[#25D366] text-white shadow-elevated hover:brightness-105 hover:scale-105 active:scale-95 transition-all group"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold text-white group-hover:max-w-xs transition-all duration-300 ease-out px-0 group-hover:px-2">
          WhatsApp Us
        </span>
        <MessageSquare className="w-5 h-5 fill-current" />
      </a>
    </aside>
  );
};
