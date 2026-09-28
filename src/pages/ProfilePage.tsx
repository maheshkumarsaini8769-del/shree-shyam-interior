import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  FolderKanban,
  ShoppingBag,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Phone,
  FileText
} from 'lucide-react';
import { useQuote } from '../context/QuoteContext';
import { getStoredSiteVisits } from '../services/bookingService';
import { SiteVisitRequest } from '../types/quote';

export const ProfilePage: React.FC = () => {
  const { items, grandTotal } = useQuote();
  const [siteVisits, setSiteVisits] = useState<SiteVisitRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'project' | 'quotes' | 'visits'>('project');

  useEffect(() => {
    setSiteVisits(getStoredSiteVisits());
  }, []);

  const projectStages = [
    { name: 'Consultation', status: 'completed' },
    { name: 'Site Measurement', status: 'completed' },
    { name: '3D Design', status: 'current' },
    { name: 'Quotation Approval', status: 'upcoming' },
    { name: 'Material Selection', status: 'upcoming' },
    { name: 'Execution & Carpentry', status: 'upcoming' },
    { name: 'Quality Audit', status: 'upcoming' },
    { name: 'Handover', status: 'upcoming' }
  ];

  return (
    <div className="pt-24 pb-28 min-h-screen bg-cream-50 text-charcoal-800">
      {/* Top Banner */}
      <div className="bg-forest-950 text-cream-100 py-10 sm:py-14 border-b border-cream-200/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-forest-900 border-2 border-copper-400 flex items-center justify-center font-serif text-2xl font-bold text-copper-400 shadow-md">
              RK
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-copper-400 block">
                Client Dashboard
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50">
                Rajesh Khandelwal
              </h1>
              <p className="text-xs text-charcoal-300 mt-0.5">
                Piprali Road, Sikar, Rajasthan • Client ID: SSI-CLIENT-8902
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/site-visit"
              className="px-4 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper transition-all"
            >
              Book New Visit
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-cream-200 gap-6 text-xs font-bold uppercase tracking-wider mb-8">
          <button
            onClick={() => setActiveTab('project')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'project'
                ? 'text-copper-600 border-b-2 border-copper-600'
                : 'text-charcoal-400 hover:text-forest-950'
            }`}
          >
            Live Turnkey Project
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'quotes'
                ? 'text-copper-600 border-b-2 border-copper-600'
                : 'text-charcoal-400 hover:text-forest-950'
            }`}
          >
            My Saved Quotes ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('visits')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'visits'
                ? 'text-copper-600 border-b-2 border-copper-600'
                : 'text-charcoal-400 hover:text-forest-950'
            }`}
          >
            Booked Site Visits ({siteVisits.length})
          </button>
        </div>

        {/* Tab 1: Live Project Timeline Dashboard */}
        {activeTab === 'project' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-200 pb-5">
                <div>
                  <span className="px-2.5 py-1 rounded bg-copper-500/10 text-copper-600 text-[11px] font-bold uppercase tracking-wider">
                    In Progress • 35% Completed
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-forest-950 mt-1">
                    3BHK Premium Residence Turnkey Interior
                  </h2>
                  <p className="text-xs text-charcoal-400 mt-0.5">
                    Location: Piprali Road, Sikar • Scope: Living Room, Modular Kitchen & 3 Bed Suites
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-charcoal-400 block">Lead Architect</span>
                  <span className="font-bold text-sm text-forest-950">Er. Alok Sharma</span>
                  <div className="text-xs text-copper-600 font-mono">+91 94140 12345</div>
                </div>
              </div>

              {/* Visual 8-Stage Progress Timeline */}
              <div className="mt-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-copper-600 mb-6">
                  Turnkey Execution Roadmap
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {projectStages.map((stage, idx) => (
                    <div
                      key={stage.name}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        stage.status === 'completed'
                          ? 'bg-forest-950 text-cream-50 border-copper-500/50'
                          : stage.status === 'current'
                          ? 'bg-copper-500 text-white border-copper-400 shadow-glow-copper animate-pulse'
                          : 'bg-cream-50 text-charcoal-400 border-cream-200'
                      }`}
                    >
                      <div className="text-[10px] font-mono opacity-80 mb-1">
                        0{idx + 1}
                      </div>
                      <div className="text-xs font-bold leading-tight">
                        {stage.name}
                      </div>
                      <div className="mt-2 text-[10px] uppercase font-semibold">
                        {stage.status === 'completed' && '✓ Done'}
                        {stage.status === 'current' && '● Active'}
                        {stage.status === 'upcoming' && 'Upcoming'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Action / Next Step Notice */}
              <div className="mt-8 p-4 rounded-2xl bg-cream-100 border border-cream-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-copper-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm text-forest-950 block">
                      Next Step: 3D Render & Material Swatch Approval
                    </strong>
                    <span className="text-xs text-charcoal-500">
                      Our architect has uploaded the 3D walkthrough. Visit our showroom to finalize laminate codes.
                    </span>
                  </div>
                </div>
                <Link
                  to="/#showroom"
                  className="px-4 py-2 rounded-xl bg-forest-950 text-copper-300 text-xs font-bold uppercase tracking-wider shrink-0"
                >
                  Visit Showroom
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Saved Quotes */}
        {activeTab === 'quotes' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft">
            <h3 className="font-serif font-bold text-xl text-forest-950 mb-4">
              Saved Quotations & Materials
            </h3>

            {items.length === 0 ? (
              <p className="text-xs text-charcoal-400 py-6">No materials currently in your quote list.</p>
            ) : (
              <div className="space-y-4">
                <div className="divide-y divide-cream-100">
                  {items.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-forest-950">{item.productName}</div>
                        <div className="text-xs text-charcoal-400">
                          {item.brand} • Qty: {item.quantity} {item.unit}
                        </div>
                      </div>
                      <div className="font-mono font-bold text-sm text-forest-950">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                  <span className="font-bold text-sm">Estimated Total (with GST):</span>
                  <span className="font-serif font-bold text-xl text-copper-600">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    to="/quote"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-copper-500 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper"
                  >
                    <span>Open Quotation Sheet</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Booked Site Visits */}
        {activeTab === 'visits' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft">
            <h3 className="font-serif font-bold text-xl text-forest-950 mb-4">
              Confirmed Site Visit Records
            </h3>

            {siteVisits.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs text-charcoal-400 mb-3">No site visits booked yet.</p>
                <Link
                  to="/site-visit"
                  className="px-4 py-2 rounded-xl bg-copper-500 text-white text-xs font-bold uppercase tracking-wider"
                >
                  Schedule Site Visit
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {siteVisits.map((v) => (
                  <div
                    key={v.id}
                    className="p-4 rounded-2xl bg-cream-50 border border-cream-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-copper-600">{v.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">
                          {v.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-forest-950 mt-1">{v.propertyType}</h4>
                      <p className="text-xs text-charcoal-400">
                        {v.city} • Slot: {v.preferredTime}
                      </p>
                    </div>

                    <div className="text-xs text-charcoal-400 font-mono">
                      {new Date(v.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
