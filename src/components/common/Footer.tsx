import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Award, Sparkles, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { apiService, BrandingSEOData } from '../../services/apiService';

export const Footer: React.FC = () => {
  const [branding, setBranding] = useState<BrandingSEOData | null>(null);

  useEffect(() => {
    apiService.getBrandingSEO().then((data) => {
      if (data) setBranding(data);
    });
  }, []);

  return (
    <footer className="bg-forest-950 text-cream-200 pt-16 pb-28 lg:pb-12 border-t border-cream-200/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Guarantees Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 border-b border-cream-200/10 text-center sm:text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-forest-900/40 border border-cream-200/5">
            <ShieldCheck className="w-8 h-8 text-copper-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cream-50">100% Genuine</h4>
              <p className="text-[11px] text-charcoal-300">Certified Century & Häfele</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-forest-900/40 border border-cream-200/5">
            <Award className="w-8 h-8 text-copper-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cream-50">15+ Years Mastery</h4>
              <p className="text-[11px] text-charcoal-300">500+ Projects in Rajasthan</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-forest-900/40 border border-cream-200/5">
            <Sparkles className="w-8 h-8 text-copper-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cream-50">Turnkey Precision</h4>
              <p className="text-[11px] text-charcoal-300">Design to Handover</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-forest-900/40 border border-cream-200/5">
            <Clock className="w-8 h-8 text-copper-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cream-50">On-Time Guarantee</h4>
              <p className="text-[11px] text-charcoal-300">Fixed Deadlines & Quality</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              {branding?.logo?.imageUrl ? (
                <img
                  src={branding.logo.imageUrl}
                  alt={branding.logo.text || 'Shree Shyam'}
                  className="h-10 w-auto max-w-[140px] object-contain rounded-lg"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-forest-900 border border-copper-500/40 flex items-center justify-center">
                  <span className="text-copper-400 font-serif font-bold text-xl">SS</span>
                </div>
              )}
              <div>
                <span className="font-serif font-bold text-cream-50 text-xl tracking-tight block uppercase">
                  {branding?.logo?.text || 'SHREE SHYAM'}{' '}
                  <span className="text-copper-400 font-sans font-semibold text-xs tracking-widest uppercase">
                    {branding?.logo?.tagline || 'INTERIOR'}
                  </span>
                </span>
                <span className="text-xs text-copper-300 font-medium">Crafting Homes, From the Heart!</span>
              </div>
            </div>

            <p className="text-sm text-charcoal-300 leading-relaxed max-w-sm">
              {branding?.footer?.aboutText ||
                'Sikar’s premier destination for turnkey architectural interiors, certified marine plywood, designer laminates, German hardware, and customized modular kitchens.'}
            </p>

            {/* Social Media Links */}
            {branding?.socialLinks && (
              <div className="flex items-center gap-3 pt-1">
                {branding.socialLinks.instagram && (
                  <a
                    href={branding.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-forest-900/80 border border-cream-200/10 hover:border-copper-400 flex items-center justify-center text-cream-200 hover:text-copper-400 transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {branding.socialLinks.facebook && (
                  <a
                    href={branding.socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-forest-900/80 border border-cream-200/10 hover:border-copper-400 flex items-center justify-center text-cream-200 hover:text-copper-400 transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {branding.socialLinks.youtube && (
                  <a
                    href={branding.socialLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-forest-900/80 border border-cream-200/10 hover:border-copper-400 flex items-center justify-center text-cream-200 hover:text-copper-400 transition-colors"
                    title="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
                {branding.socialLinks.whatsapp && (
                  <a
                    href={
                      branding.socialLinks.whatsapp.startsWith('http')
                        ? branding.socialLinks.whatsapp
                        : `https://wa.me/${branding.socialLinks.whatsapp.replace(/[^0-9]/g, '')}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-forest-900/80 border border-cream-200/10 hover:border-copper-400 flex items-center justify-center text-cream-200 hover:text-copper-400 transition-colors"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
                {branding.socialLinks.googleMaps && (
                  <a
                    href={branding.socialLinks.googleMaps}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-forest-900/80 border border-cream-200/10 hover:border-copper-400 flex items-center justify-center text-cream-200 hover:text-copper-400 transition-colors"
                    title="Google Maps Showroom Location"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}

            <div className="space-y-2 pt-2 text-xs text-cream-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-copper-400 shrink-0 mt-0.5" />
                <span>
                  {branding?.footer?.address || 'Station Road / Piprali Road Crossing, Sikar, Rajasthan - 332001'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-copper-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-copper-400 transition-colors">
                  +91 98765 43210 / +91 94140 12345
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-copper-400 shrink-0" />
                <a href="mailto:contact@shreeshyaminterior.com" className="hover:text-copper-400 transition-colors">
                  {branding?.socialLinks?.email || 'contact@shreeshyaminterior.com'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-copper-400 shrink-0" />
                <span>Monday - Sunday: 10:00 AM – 8:30 PM (Open All 7 Days)</span>
              </div>
            </div>
          </div>

          {/* Material Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-copper-400 mb-4">
              Material Catalog
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li><Link to="/products?category=plywood" className="hover:text-cream-50 transition-colors">Century Marine Plywood</Link></li>
              <li><Link to="/products?category=laminates" className="hover:text-cream-50 transition-colors">Greenlam Acrylics & Clads</Link></li>
              <li><Link to="/products?category=hardware" className="hover:text-cream-50 transition-colors">Häfele & Hettich Hardware</Link></li>
              <li><Link to="/products?category=lighting" className="hover:text-cream-50 transition-colors">Philips Magnetic 48V Tracks</Link></li>
              <li><Link to="/products?category=wall-panels" className="hover:text-cream-50 transition-colors">Charcoal Acoustic Louvers</Link></li>
              <li><Link to="/products?category=paint" className="hover:text-cream-50 transition-colors">Asian Paints Italian Stucco</Link></li>
              <li><Link to="/products?category=glass-aluminium" className="hover:text-cream-50 transition-colors">Saint-Gobain Fluted Glass</Link></li>
            </ul>
          </div>

          {/* Turnkey Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-copper-400 mb-4">
              Turnkey Studios
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li><Link to="/projects?category=Home" className="hover:text-cream-50 transition-colors">Modular German Kitchens</Link></li>
              <li><Link to="/projects?category=Home" className="hover:text-cream-50 transition-colors">Master Bedroom Suites</Link></li>
              <li><Link to="/projects?category=Office" className="hover:text-cream-50 transition-colors">Corporate Law Chambers</Link></li>
              <li><Link to="/projects?category=Commercial" className="hover:text-cream-50 transition-colors">Boutique Retail Showrooms</Link></li>
              <li><Link to="/projects?category=Renovation" className="hover:text-cream-50 transition-colors">Duplex Heritage Overhaul</Link></li>
              <li><Link to="/design-ai" className="hover:text-cream-50 transition-colors">AI 3D Room Visualizer</Link></li>
            </ul>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-copper-400 mb-4">
              Quick Tools
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li><Link to="/quote" className="hover:text-cream-50 transition-colors">Instant Cost Calculator</Link></li>
              <li><Link to="/site-visit" className="hover:text-cream-50 transition-colors">Book Free Site Visit</Link></li>
              <li><Link to="/quote" className="hover:text-cream-50 transition-colors">Request Materials Quote</Link></li>
              <li><Link to="/profile" className="hover:text-cream-50 transition-colors">Client Project Dashboard</Link></li>
              <li><a href="https://maps.google.com/?q=Shree+Shyam+Interior+Sikar" target="_blank" rel="noreferrer" className="hover:text-cream-50 transition-colors">Get Showroom Directions</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-cream-200/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-400">
          <p>
            {branding?.footer?.copyrightText ||
              `© ${new Date().getFullYear()} Shree Shyam Interior. All Rights Reserved. Sikar, Rajasthan.`}
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-copper-400 transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-copper-400 transition-colors">Terms of Work</span>
            <span>•</span>
            <span className="hover:text-copper-400 transition-colors">Warranty Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

