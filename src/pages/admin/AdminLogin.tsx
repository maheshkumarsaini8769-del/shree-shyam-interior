import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldAlert } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const wasRevoked = searchParams.get('revoked') === 'true';
  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiService.login(email, password);
      showToast('Welcome to Shree Shyam Interior Admin Panel', 'success');
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid email address or password. Access restricted.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F15] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-forest-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-[#121720] border border-copper-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <img
            src="/logo.jpg"
            alt="Shree Shyam Interior Logo"
            className="w-16 h-16 rounded-2xl object-cover border border-copper-500/40 shadow-glow-copper mx-auto mb-4"
          />
          <span className="text-xs font-bold uppercase tracking-widest text-copper-400">
            Shree Shyam Interior
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50 mt-1">
            Studio CMS & Admin Portal
          </h1>
          <p className="text-xs text-cream-200/60 mt-1">
            Secure administrative control center for management & customization
          </p>
        </div>

        {wasRevoked && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold leading-relaxed flex items-start gap-2.5 text-left animate-in fade-in duration-300">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-200 mb-0.5">Session Terminated (रिमोट लॉगआउट)</span>
              Aapka session kisi doosre device se logout kar diya gaya hai. Kripya apna authorized email aur password lagakar dobara login karein.
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-cream-200/80 mb-1.5 uppercase tracking-wider">
              Authorized Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-copper-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1A212C] border border-copper-500/20 rounded-xl pl-10 pr-4 py-3 text-sm text-cream-100 placeholder-charcoal-400 focus:outline-none focus:border-copper-400 transition-colors"
                placeholder="Enter authorized admin email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-cream-200/80 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-copper-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A212C] border border-copper-500/20 rounded-xl pl-10 pr-4 py-3 text-sm text-cream-100 placeholder-charcoal-400 focus:outline-none focus:border-copper-400 transition-colors"
                placeholder="Enter secure password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-copper-500 hover:bg-copper-600 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer mt-4"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs text-copper-400 hover:underline inline-flex items-center gap-1"
          >
            ← Return to public website
          </a>
        </div>
      </div>
    </div>
  );
};
