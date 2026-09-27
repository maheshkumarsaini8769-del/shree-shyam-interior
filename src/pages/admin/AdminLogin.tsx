import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Eye, EyeOff, KeyRound, CheckCircle2, X, RefreshCw, ShieldCheck } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Forgot Password / OTP State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [otpStep, setOtpStep] = useState<1 | 2>(1);
  const [resetEmail, setResetEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    try {
      await apiService.login(cleanEmail, cleanPassword);
      showToast('Welcome to Shree Shyam Interior Admin Panel', 'success');
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid email address or password. Access restricted.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForgotModal = () => {
    setResetEmail(email.trim());
    setOtpStep(1);
    setOtpCode('');
    setNewPassword('');
    setConfirmPassword('');
    setOtpMessage('');
    setOtpError('');
    setShowForgotModal(true);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = resetEmail.trim().toLowerCase();
    if (!cleanEmail) {
      setOtpError('Please enter your authorized admin email address.');
      return;
    }

    try {
      setSendingOtp(true);
      setOtpError('');
      setOtpMessage('');
      const res = await apiService.forgotPassword(cleanEmail);
      setOtpMessage(res.message || `A 6-digit OTP verification code has been sent to ${cleanEmail}.`);
      setOtpStep(2);
      showToast('Verification code sent to your email!', 'success');
    } catch (err: any) {
      setOtpError(err.message || 'Failed to send OTP. Please verify this email has authorized admin privileges.');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtpAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setOtpError('Please enter the 6-digit OTP received in your email.');
      return;
    }
    if (newPassword.length < 6) {
      setOtpError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setOtpError('New password and confirm password do not match.');
      return;
    }

    try {
      setResettingPassword(true);
      setOtpError('');
      const res = await apiService.verifyOtpAndResetPassword(resetEmail.trim().toLowerCase(), otpCode.trim(), newPassword);
      showToast(res.message || 'Password reset successfully! You can now login.', 'success');
      setEmail(resetEmail.trim());
      setPassword('');
      setShowForgotModal(false);
    } catch (err: any) {
      setOtpError(err.message || 'Invalid or expired OTP code. Please try again.');
    } finally {
      setResettingPassword(false);
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

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-cream-200/80 mb-1.5 uppercase tracking-wider">
              Authorized Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-copper-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1A212C] border border-copper-500/20 rounded-xl pl-10 pr-4 py-3 text-sm text-cream-100 placeholder-charcoal-400 focus:outline-none focus:border-copper-400 transition-colors"
                placeholder="Enter authorized email or username"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-cream-200/80 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-copper-400 hover:text-copper-300 flex items-center gap-1 font-medium transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Show</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-copper-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A212C] border border-copper-500/20 rounded-xl pl-10 pr-10 py-3 text-sm text-cream-100 placeholder-charcoal-400 focus:outline-none focus:border-copper-400 transition-colors"
                placeholder="Enter secure password"
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-1">
            <button
              type="button"
              onClick={handleOpenForgotModal}
              className="text-xs text-copper-400 hover:text-copper-300 transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Forgot password? Reset via Email OTP</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-copper-500 hover:bg-copper-600 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer mt-2"
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

      {/* Forgot Password / Resend OTP Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-[#121720] border border-copper-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="absolute top-5 right-5 text-cream-200/50 hover:text-cream-50 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-copper-500/20 border border-copper-500/40 flex items-center justify-center text-copper-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-cream-50">
                  {otpStep === 1 ? 'Verify Admin Email' : 'Reset Password with OTP'}
                </h3>
                <p className="text-xs text-cream-200/60">
                  {otpStep === 1
                    ? 'Only authorized admin emails can receive password recovery OTPs.'
                    : `Enter the 6-digit code sent to ${resetEmail}`}
                </p>
              </div>
            </div>

            {otpError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold leading-relaxed">
                {otpError}
              </div>
            )}

            {otpMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{otpMessage}</span>
              </div>
            )}

            {otpStep === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-cream-200/80 mb-1.5 uppercase tracking-wider">
                    Authorized Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-copper-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      autoFocus
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="e.g. maheshkumarsaini8769@gmail.com"
                      className="w-full bg-[#1A212C] border border-copper-500/20 rounded-xl pl-10 pr-4 py-3 text-sm text-cream-100 placeholder-charcoal-400 focus:outline-none focus:border-copper-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-white/10 text-cream-200/70 hover:text-cream-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sendingOtp}
                    className="flex-1 py-3 px-4 rounded-xl bg-copper-500 hover:bg-copper-600 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                  >
                    {sendingOtp ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending OTP via Resend...</span>
                      </>
                    ) : (
                      <>
                        <span>Send 6-Digit OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtpAndReset} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-cream-200/80 mb-1.5 uppercase tracking-wider">
                    6-Digit Verification Code (OTP)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full bg-[#1A212C] border border-copper-500/30 rounded-xl px-4 py-3 text-center text-xl font-mono tracking-[0.4em] font-bold text-copper-400 placeholder-charcoal-500 focus:outline-none focus:border-copper-400"
                  />
                  <p className="text-[11px] text-cream-200/50 mt-1 text-center">
                    Check your email inbox or spam folder. OTP is valid for 10 minutes.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-cream-200/80 uppercase tracking-wider">
                      New Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="text-[11px] text-copper-400 hover:text-copper-300 font-medium cursor-pointer"
                    >
                      {showNewPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-copper-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full bg-[#1A212C] border border-copper-500/20 rounded-xl pl-10 pr-4 py-3 text-sm text-cream-100 placeholder-charcoal-400 focus:outline-none focus:border-copper-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-cream-200/80 mb-1.5 uppercase tracking-wider">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-copper-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full bg-[#1A212C] border border-copper-500/20 rounded-xl pl-10 pr-4 py-3 text-sm text-cream-100 placeholder-charcoal-400 focus:outline-none focus:border-copper-400"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpStep(1);
                      setOtpError('');
                    }}
                    className="px-4 py-2.5 rounded-xl border border-white/10 text-cream-200/70 hover:text-cream-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Change Email / Resend
                  </button>
                  <button
                    type="submit"
                    disabled={resettingPassword}
                    className="flex-1 py-3 px-4 rounded-xl bg-copper-500 hover:bg-copper-600 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                  >
                    {resettingPassword ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying & Resetting...</span>
                      </>
                    ) : (
                      <>
                        <span>Reset Password & Login</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

