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
            <div className="flex items-center gap-3">
              <img
                src={branding?.logo?.imageUrl || '/logo.jpg'}
                alt={branding?.logo?.text || 'Shree Shyam'}
                className="h-11 w-11 rounded-2xl object-cover border border-copper-500/40 shadow-soft shrink-0"
                onError={(e) => {
                  e.currentTarget.src = '/logo.jpg';
                }}
              />
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
                  {branding?.footer?.address || 'Piprali Road, Near Railway Overbridge, Sikar, Rajasthan - 332001'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-copper-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-copper-400 transition-colors">
                  +91 98765 43210
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
                <span>Monday - Sunday: 9:30 AM – 8:30 PM (Open All 7 Days)</span>
              </div>
              <div className="pt-2 text-[11px] text-charcoal-400">
                <span>Serving: Sikar, Nawalgarh, Fatehpur, Laxmangarh, Jhunjhunu & Jaipur</span>
              </div>
            </div>
          </div>

          {/* Interior Services in Sikar (Primary SEO Silo) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-copper-400 mb-4">
              Services in Sikar
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li><Link to="/services/home-interior" className="hover:text-cream-50 transition-colors">Home Interior Designer</Link></li>
              <li><Link to="/services/modular-kitchen" className="hover:text-cream-50 transition-colors">Modular Kitchen in Sikar</Link></li>
              <li><Link to="/services/bedroom-interior" className="hover:text-cream-50 transition-colors">Bedroom Interior Design</Link></li>
              <li><Link to="/services/living-room-interior" className="hover:text-cream-50 transition-colors">Living Room & TV Units</Link></li>
              <li><Link to="/services/wardrobe" className="hover:text-cream-50 transition-colors">Modern Wardrobe Design</Link></li>
              <li><Link to="/services/office-interior" className="hover:text-cream-50 transition-colors">Office & Commercial Design</Link></li>
              <li><Link to="/services/false-ceiling" className="hover:text-cream-50 transition-colors">Designer False Ceiling</Link></li>
              <li><Link to="/services" className="text-copper-400 hover:underline text-xs font-semibold block pt-1">All Interior Services →</Link></li>
            </ul>
          </div>

          {/* Resources & Inspiration */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-copper-400 mb-4">
              Design & Resources
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li><Link to="/reviews" className="hover:text-cream-50 transition-colors flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-copper-400" />Client Reviews & Ratings</Link></li>
              <li><Link to="/blog" className="hover:text-cream-50 transition-colors flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-copper-400" />Design Ideas & Blog</Link></li>
              <li><Link to="/faq" className="hover:text-cream-50 transition-colors">Frequently Asked (FAQ)</Link></li>
              <li><Link to="/projects" className="hover:text-cream-50 transition-colors">Completed Projects</Link></li>
              <li><Link to="/products" className="hover:text-cream-50 transition-colors">Materials & Hardware</Link></li>
              <li><Link to="/design-ai" className="hover:text-cream-50 transition-colors">3D Room Configurator</Link></li>
              <li><Link to="/quote" className="hover:text-cream-50 transition-colors">Instant Cost Estimator</Link></li>
            </ul>
          </div>

          {/* Company & Legal Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-copper-400 mb-4">
              Company & Support
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li><Link to="/about" className="hover:text-cream-50 transition-colors">About Our Studio</Link></li>
              <li><Link to="/contact" className="text-copper-400 font-semibold hover:underline">Contact Us</Link></li>
              <li><Link to="/site-visit" className="hover:text-cream-50 transition-colors">Book Free Site Visit</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-cream-50 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-cream-50 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/cancellation-refund-policy" className="hover:text-cream-50 transition-colors">Cancellation & Refund</Link></li>
              <li><a href="https://maps.google.com/?q=Shree+Shyam+Interior+Piprali+Road+Sikar" target="_blank" rel="noreferrer" className="hover:text-cream-50 transition-colors">Showroom Directions</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-cream-200/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-400">
          <p>
            {branding?.footer?.copyrightText ||
              `© ${new Date().getFullYear()} Shree Shyam Interior. All Rights Reserved. Sikar, Rajasthan.`}
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-charcoal-400">
            <Link to="/about" className="hover:text-copper-400 transition-colors">About</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-copper-400 transition-colors">Contact</Link>
            <span>•</span>
            <Link to="/privacy-policy" className="hover:text-copper-400 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-and-conditions" className="hover:text-copper-400 transition-colors">Terms of Work</Link>
            <span>•</span>
            <Link to="/cancellation-refund-policy" className="hover:text-copper-400 transition-colors">Cancellation & Refund</Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-copper-400 transition-colors">FAQ</Link>
            <span>•</span>
            <Link to="/blog" className="hover:text-copper-400 transition-colors">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

