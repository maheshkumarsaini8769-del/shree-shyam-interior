import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Monitor,
  Smartphone,
  Tablet,
  LogOut,
  RefreshCw,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Laptop
} from 'lucide-react';
import { apiService, AdminSession } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminSessions: React.FC = () => {
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showRevokeAllConfirm, setShowRevokeAllConfirm] = useState(false);
  const [selectedSessionToRevoke, setSelectedSessionToRevoke] = useState<AdminSession | null>(null);
  const { showToast } = useToast();

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const data = await apiService.getSessions();
      setSessions(data);
    } catch {
      showToast('Failed to load active sessions', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleRevokeSingle = async (session: AdminSession) => {
    try {
      setActionLoading(session.id);
      const res = await apiService.revokeSession(session.id);
      if (res.success) {
        showToast(
          session.isCurrent
            ? 'Current session logged out. Redirecting...'
            : `Logged out from ${session.deviceName}`,
          'success'
        );
        if (session.isCurrent) {
          window.location.href = '/admin/login';
          return;
        }
        setSessions((prev) => prev.filter((s) => s.id !== session.id));
      }
    } catch {
      showToast('Failed to revoke session. Please try again.', 'error');
    } finally {
      setActionLoading(null);
      setSelectedSessionToRevoke(null);
    }
  };

  const handleRevokeAllOthers = async () => {
    try {
      setActionLoading('all-others');
      const res = await apiService.revokeAllOtherSessions();
      if (res.success) {
        showToast('All other devices have been logged out successfully! (बाकी सभी डिवाइस लॉगआउट हो गए)', 'success');
        setSessions((prev) => prev.filter((s) => s.isCurrent));
      }
    } catch {
      showToast('Failed to revoke other sessions', 'error');
    } finally {
      setActionLoading(null);
      setShowRevokeAllConfirm(false);
    }
  };

  const currentSession = sessions.find((s) => s.isCurrent) || sessions[0];
  const otherSessions = sessions.filter((s) => !s.isCurrent);

  const getDeviceIcon = (deviceType: string, os: string) => {
    const lowerType = (deviceType || '').toLowerCase();
    const lowerOs = (os || '').toLowerCase();

    if (lowerType === 'mobile' || lowerOs.includes('iphone') || lowerOs.includes('android')) {
      return <Smartphone className="w-6 h-6 text-copper-500" />;
    }
    if (lowerType === 'tablet' || lowerOs.includes('ipad')) {
      return <Tablet className="w-6 h-6 text-amber-500" />;
    }
    if (lowerOs.includes('mac') || lowerOs.includes('windows') || lowerOs.includes('linux')) {
      return <Laptop className="w-6 h-6 text-blue-500" />;
    }
    return <Monitor className="w-6 h-6 text-forest-600 dark:text-cream-200" />;
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Just now';
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper-500/10 text-copper-600 dark:text-copper-400 text-[11px] font-bold uppercase tracking-wider mb-2 border border-copper-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Device Security & Session Manager</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50">
            Active Login Devices (लॉगिन डिवाइसेस)
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-200/70 mt-1">
            Check where your Admin Panel is currently logged in. Terminate unauthorized or old sessions with 1-click.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={fetchSessions}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-cream-200 dark:border-cream-200/20 bg-white dark:bg-[#121720] hover:bg-cream-100 dark:hover:bg-[#1A212C] text-xs font-semibold text-charcoal-700 dark:text-cream-100 transition-all cursor-pointer disabled:opacity-50"
            title="Refresh active sessions"
          >
            <RefreshCw className={`w-4 h-4 text-copper-500 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          {otherSessions.length > 0 && (
            <button
              onClick={() => setShowRevokeAllConfirm(true)}
              disabled={actionLoading === 'all-others'}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout All Other Devices ({otherSessions.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-charcoal-500 dark:text-cream-200/60 uppercase tracking-wider block">
              Total Active Devices
            </span>
            <span className="font-serif text-xl font-bold text-forest-950 dark:text-cream-50">
              {sessions.length} {sessions.length === 1 ? 'Device' : 'Devices'}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-copper-500/10 border border-copper-500/20 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5 text-copper-500" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-charcoal-500 dark:text-cream-200/60 uppercase tracking-wider block">
              Current IP Address
            </span>
            <span className="font-mono text-xs font-bold text-forest-950 dark:text-cream-50 block truncate max-w-[160px]">
              {currentSession?.ip || 'Checking...'}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-charcoal-500 dark:text-cream-200/60 uppercase tracking-wider block">
              Session Protection
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span>Cloud Monitored (Active)</span>
            </span>
          </div>
        </div>
      </div>

      {/* 1. CURRENT ACTIVE DEVICE */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-charcoal-600 dark:text-cream-200/80 flex items-center gap-2">
          <span>This Device (वर्तमान उपयोग में डिवाइस)</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Session
          </span>
        </h2>

        {currentSession ? (
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121720] border-2 border-emerald-500/40 dark:border-emerald-500/30 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  {getDeviceIcon(currentSession.deviceType, currentSession.os)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base font-bold text-forest-950 dark:text-cream-50">
                      {currentSession.deviceName}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white">
                      Current
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-charcoal-500 dark:text-cream-200/60 mt-1">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      IP: <strong className="font-mono text-forest-950 dark:text-cream-50">{currentSession.ip}</strong>
                    </span>
                    <span>•</span>
                    <span>Location: {currentSession.location || 'India'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="text-[11px] text-charcoal-500 dark:text-cream-200/60 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-copper-500" />
                  Logged in: {formatDate(currentSession.loginTime)}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-cream-100 dark:border-cream-200/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-charcoal-500 dark:text-cream-200/60">
              <span>Admin Account: <strong className="text-forest-950 dark:text-cream-100">{currentSession.adminEmail}</strong></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                ✓ All admin actions performed on this device are verified.
              </span>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 text-center text-xs text-charcoal-500">
            No active session detected. Please log in again.
          </div>
        )}
      </div>

      {/* 2. OTHER CONNECTED DEVICES */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-charcoal-600 dark:text-cream-200/80">
            Other Active Devices ({otherSessions.length})
          </h2>
          {otherSessions.length > 0 && (
            <span className="text-[11px] text-red-500 font-semibold">
              Tap "Remove / Logout" to force exit any device
            </span>
          )}
        </div>

        {otherSessions.length > 0 ? (
          <div className="grid grid-cols-1 gap-3.5">
            {otherSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-sm hover:border-red-500/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-cream-100 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 flex items-center justify-center shrink-0">
                    {getDeviceIcon(session.deviceType, session.os)}
                  </div>
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-forest-950 dark:text-cream-50">
                      {session.deviceName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-charcoal-500 dark:text-cream-200/60 mt-0.5">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        IP: {session.ip}
                      </span>
                      <span>•</span>
                      <span>Location: {session.location || 'India'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-charcoal-400" />
                        Last Active: {formatDate(session.lastActive || session.loginTime)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => setSelectedSessionToRevoke(session)}
                    disabled={actionLoading === session.id}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40 text-xs font-bold transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{actionLoading === session.id ? 'Revoking...' : 'Remove / Logout (हटाएं)'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-forest-950 dark:text-cream-50">
              No Other Devices Connected (सुरक्षित)
            </h3>
            <p className="text-xs text-charcoal-500 dark:text-cream-200/70 max-w-md mx-auto leading-relaxed">
              Your admin panel is not logged in anywhere else. If someone attempts to log in from another laptop or phone, it will instantly show up here.
            </p>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Single Device Logout */}
      {selectedSessionToRevoke && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full rounded-3xl bg-white dark:bg-[#121720] border border-red-500/30 p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50">
                Log Out This Device?
              </h3>
              <p className="text-xs text-charcoal-600 dark:text-cream-200/70 mt-1 leading-relaxed">
                Do you want to terminate the session for{' '}
                <strong className="text-forest-950 dark:text-cream-50">{selectedSessionToRevoke.deviceName}</strong> ({selectedSessionToRevoke.ip})?
              </p>
              <div className="mt-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
                ⚠️ That device will be immediately logged out and will require entering email & password to access again.
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedSessionToRevoke(null)}
                className="flex-1 py-2.5 rounded-xl border border-cream-200 dark:border-cream-200/20 text-xs font-bold text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-[#1A212C] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleRevokeSingle(selectedSessionToRevoke)}
                disabled={actionLoading === selectedSessionToRevoke.id}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {actionLoading === selectedSessionToRevoke.id ? 'Logging out...' : 'Confirm Log Out'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Revoke All Others */}
      {showRevokeAllConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full rounded-3xl bg-white dark:bg-[#121720] border border-red-500/30 p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50">
                Log Out All Other Devices?
              </h3>
              <p className="text-xs text-charcoal-600 dark:text-cream-200/70 mt-1 leading-relaxed">
                This will immediately terminate <strong className="text-red-500">{otherSessions.length} other active session(s)</strong> across other computers, laptops, and mobile phones.
              </p>
              <div className="mt-2 p-2.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-500/20 text-[11px] text-red-600 dark:text-red-300">
                🔒 Anyone using those devices will be instantly logged out and forced to enter email and password.
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRevokeAllConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-cream-200 dark:border-cream-200/20 text-xs font-bold text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-[#1A212C] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRevokeAllOthers}
                disabled={actionLoading === 'all-others'}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {actionLoading === 'all-others' ? 'Revoking All...' : 'Yes, Log Out All Others'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
