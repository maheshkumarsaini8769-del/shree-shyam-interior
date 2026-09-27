import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Save, Lock, ShieldCheck, Check, Users, UserPlus, Mail, Trash2, Send, Key, RefreshCw, X, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { apiService, BusinessSettings, AdminAuthority } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<BusinessSettings>({
    businessName: 'Shree Shyam Interior',
    gstNumber: '08AAAAA0000A1Z5',
    primaryPhone: '+91 98765 43210',
    whatsappNumber: '+91 98765 43210',
    email: 'contact@shreeshyaminterior.com',
    address: 'Piprali Road, Sikar, Rajasthan - 332001'
  });
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  // Authority & Team Access state
  const [authorities, setAuthorities] = useState<AdminAuthority[]>([]);
  const [loadingAuthorities, setLoadingAuthorities] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<'Super Admin' | 'Manager' | 'Editor'>('Manager');
  const [newAuthorityPassword, setNewAuthorityPassword] = useState('');
  const [sendEmailInvite, setSendEmailInvite] = useState(true);
  const [submittingAuthority, setSubmittingAuthority] = useState(false);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  const { showToast } = useToast();

  useEffect(() => {
    loadSettings();
    loadAuthorities();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await apiService.getSettings();
      if (data) setSettings(data);
    } catch {
      showToast('Failed to load settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadAuthorities = async () => {
    try {
      setLoadingAuthorities(true);
      const list = await apiService.getAuthorities();
      setAuthorities(list);
    } catch {
      // ignore
    } finally {
      setLoadingAuthorities(false);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewAuthorityPassword(result);
  };

  const handleCreateAuthority = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    if (!newName.trim()) {
      showToast('Please enter the team member name', 'error');
      return;
    }

    try {
      setSubmittingAuthority(true);
      const res = await apiService.addAuthority({
        email: newEmail.trim().toLowerCase(),
        name: newName.trim(),
        role: newRole,
        password: newAuthorityPassword.trim() || undefined,
        sendEmail: sendEmailInvite
      });

      showToast(
        sendEmailInvite
          ? `Authority granted! Login credentials sent to ${newEmail} via Resend Email.`
          : `Authority granted successfully for ${newName}!`,
        'success'
      );

      setShowAddModal(false);
      setNewEmail('');
      setNewName('');
      setNewRole('Manager');
      setNewAuthorityPassword('');
      await loadAuthorities();
    } catch (err: any) {
      showToast(err.message || 'Failed to grant authority', 'error');
    } finally {
      setSubmittingAuthority(false);
    }
  };

  const handleToggleStatus = async (auth: AdminAuthority) => {
    if (auth.isOwner) {
      showToast('Cannot suspend the primary Super Admin account', 'error');
      return;
    }

    const nextStatus = auth.status === 'Active' ? 'Suspended' : 'Active';
    try {
      setActionInProgress(auth.id);
      await apiService.updateAuthority(auth.id, { status: nextStatus });
      showToast(`Admin account ${auth.name} is now ${nextStatus}`, 'success');
      await loadAuthorities();
    } catch (err: any) {
      showToast(err.message || 'Failed to update admin status', 'error');
    } finally {
      setActionInProgress(null);
    }
  };

  const handleDeleteAuthority = async (auth: AdminAuthority) => {
    if (auth.isOwner) {
      showToast('Cannot remove primary Super Admin account', 'error');
      return;
    }

    if (!window.confirm(`Are you sure you want to revoke admin authority for ${auth.name} (${auth.email})? They will immediately lose access to this admin panel.`)) {
      return;
    }

    try {
      setActionInProgress(auth.id);
      await apiService.deleteAuthority(auth.id);
      showToast(`Revoked admin authority for ${auth.name}`, 'success');
      await loadAuthorities();
    } catch (err: any) {
      showToast(err.message || 'Failed to revoke authority', 'error');
    } finally {
      setActionInProgress(null);
    }
  };

  const handleResendCredentials = async (auth: AdminAuthority) => {
    try {
      setActionInProgress(auth.id);
      const res = await apiService.resendAuthorityInvite(auth.id);
      showToast(res.message || `Credentials re-sent to ${auth.email} via Resend Email`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to send credentials email', 'error');
    } finally {
      setActionInProgress(null);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingSettings(true);
      await apiService.updateSettings(settings);
      showToast('Business details updated successfully', 'success');
    } catch {
      showToast('Failed to save business settings', 'error');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    try {
      setSavingPassword(true);
      await apiService.changePassword(currentPassword, newPassword);
      showToast('Admin password changed successfully', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      showToast(err.message || 'Failed to update password', 'error');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
          Studio & Business Settings
        </h2>
        <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
          Update official showroom contact numbers, GST credentials, and admin security
        </p>
      </div>

      {/* Business Details Card */}
      <div className="bg-white dark:bg-[#121720] rounded-3xl p-6 sm:p-8 border border-cream-200 dark:border-cream-200/10 shadow-soft space-y-6">
        <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50 pb-2 border-b border-cream-100 dark:border-cream-200/10">
          Company & Contact Information
        </h3>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={settings.businessName || ''}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                GSTIN Number
              </label>
              <input
                type="text"
                value={settings.gstNumber || ''}
                onChange={(e) => setSettings({ ...settings, gstNumber: e.target.value })}
                className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs font-mono text-forest-950 dark:text-cream-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                Calling Number
              </label>
              <input
                type="text"
                value={settings.primaryPhone || ''}
                onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
                className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                WhatsApp Helpline
              </label>
              <input
                type="text"
                value={settings.whatsappNumber || ''}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
              Registered Showroom Address
            </label>
            <input
              type="text"
              value={settings.address || ''}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={savingSettings}
              className="px-5 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper"
            >
              {savingSettings ? 'Saving...' : 'Save Business Info'}
            </button>
          </div>
        </form>
      </div>

      {/* Active Login Devices & Sessions Card */}
      <div className="bg-white dark:bg-[#121720] rounded-3xl p-6 sm:p-8 border border-cream-200 dark:border-cream-200/10 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Active Login Devices & Security (लॉगिन डिवाइसेस)</span>
            </h3>
            <p className="text-xs text-charcoal-500 dark:text-cream-200/60 mt-1">
              Check all computers, laptops, and mobile phones currently logged into your admin panel and terminate sessions remotely.
            </p>
          </div>
          <Link
            to="/admin/sessions"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold transition-all shadow-glow-copper active:scale-95 shrink-0"
          >
            <span>View Active Devices & Logout →</span>
          </Link>
        </div>
      </div>

      {/* Admin Authority & Team Access Management (Resend Email + OTP Protected) */}
      <div className="bg-white dark:bg-[#121720] rounded-3xl p-6 sm:p-8 border border-cream-200 dark:border-cream-200/10 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-100 dark:border-cream-200/10">
          <div>
            <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50 flex items-center gap-2">
              <Users className="w-5 h-5 text-copper-500" />
              <span>Admin Authority & Team Access (एडमिन अथॉरिटी एवं टीम एक्सेस)</span>
            </h3>
            <p className="text-xs text-charcoal-500 dark:text-cream-200/60 mt-1">
              Grant admin privileges to verified email addresses. Only authorized emails can access the portal or receive OTP password reset codes via Resend.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              generatePassword();
              setShowAddModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold transition-all shadow-glow-copper active:scale-95 shrink-0 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Grant New Admin Authority</span>
          </button>
        </div>

        {/* Authorities List Table / Cards */}
        {loadingAuthorities ? (
          <div className="py-8 text-center text-xs text-charcoal-400">Loading authorized administrators...</div>
        ) : (
          <div className="space-y-3">
            {authorities.map((auth) => (
              <div
                key={auth.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 transition-all hover:border-copper-500/30"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                    auth.isOwner
                      ? 'bg-copper-500/20 text-copper-400 border border-copper-500/40'
                      : 'bg-cream-200 dark:bg-white/10 text-charcoal-700 dark:text-cream-200'
                  }`}>
                    {auth.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-forest-950 dark:text-cream-50">
                        {auth.name}
                      </span>
                      {auth.isOwner && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-copper-500/20 text-copper-400 border border-copper-500/30 uppercase tracking-wider">
                          Super Admin (Owner)
                        </span>
                      )}
                      {!auth.isOwner && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {auth.role}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        auth.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      }`}>
                        {auth.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-charcoal-500 dark:text-cream-200/60 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-copper-400" />
                      <span className="font-mono">{auth.email}</span>
                      {auth.createdAt && (
                        <span className="text-[11px] text-charcoal-400 dark:text-cream-200/40 ml-2">
                          • Added {new Date(auth.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  {!auth.isOwner && (
                    <button
                      type="button"
                      disabled={actionInProgress === auth.id}
                      onClick={() => handleResendCredentials(auth)}
                      className="px-3 py-1.5 rounded-xl border border-copper-500/30 text-copper-400 hover:bg-copper-500/10 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      title="Send login email via Resend"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{actionInProgress === auth.id ? 'Sending...' : 'Resend Email'}</span>
                    </button>
                  )}

                  {!auth.isOwner && (
                    <button
                      type="button"
                      disabled={actionInProgress === auth.id}
                      onClick={() => handleToggleStatus(auth)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 ${
                        auth.status === 'Active'
                          ? 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10'
                          : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                      }`}
                    >
                      {auth.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  )}

                  {!auth.isOwner && (
                    <button
                      type="button"
                      disabled={actionInProgress === auth.id}
                      onClick={() => handleDeleteAuthority(auth)}
                      className="p-1.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer disabled:opacity-50"
                      title="Revoke Admin Authority"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security & Password Card */}
      <div className="bg-white dark:bg-[#121720] rounded-3xl p-6 sm:p-8 border border-cream-200 dark:border-cream-200/10 shadow-soft space-y-6">
        <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50 pb-2 border-b border-cream-100 dark:border-cream-200/10 flex items-center gap-2">
          <Lock className="w-4 h-4 text-copper-500" />
          <span>Change Admin Password</span>
        </h3>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password (min 6 characters)"
              className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
            />
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="px-5 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper"
          >
            {savingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Grant Authority Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-[#121720] border border-copper-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-cream-200/50 hover:text-cream-50 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-copper-500/20 border border-copper-500/40 flex items-center justify-center text-copper-400 shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-cream-50">
                  Grant Admin Authority
                </h3>
                <p className="text-xs text-cream-200/60">
                  Authorize a new administrator email and send credentials directly via Resend
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateAuthority} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-cream-200/80 mb-1.5 uppercase tracking-wider">
                  Admin Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full bg-[#1A212C] border border-copper-500/20 rounded-xl px-3.5 py-2.5 text-xs text-cream-50 placeholder-charcoal-400 focus:outline-none focus:border-copper-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cream-200/80 mb-1.5 uppercase tracking-wider">
                  Authorized Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-copper-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="e.g. member@shreeshyaminterior.com"
                    className="w-full bg-[#1A212C] border border-copper-500/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-cream-50 placeholder-charcoal-400 focus:outline-none focus:border-copper-400"
                  />
                </div>
                <p className="text-[11px] text-cream-200/50 mt-1">
                  Only this exact email will be accepted during admin dashboard sign in.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-cream-200/80 mb-1.5 uppercase tracking-wider">
                  Access Role
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full bg-[#1A212C] border border-copper-500/20 rounded-xl px-3.5 py-2.5 text-xs text-cream-50 focus:outline-none focus:border-copper-400"
                >
                  <option value="Manager">Studio Manager (Can manage products, categories, leads, orders)</option>
                  <option value="Editor">Content Editor (Can edit products, showcase gallery, testimonials)</option>
                  <option value="Super Admin">Super Admin (Full access to all settings and team management)</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-cream-200/80 uppercase tracking-wider">
                    Initial Password
                  </label>
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="text-[11px] text-copper-400 hover:text-copper-300 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Generate Strong Password</span>
                  </button>
                </div>
                <div className="relative">
                  <Key className="w-4 h-4 text-copper-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={newAuthorityPassword}
                    onChange={(e) => setNewAuthorityPassword(e.target.value)}
                    placeholder="Enter or generate password"
                    className="w-full bg-[#1A212C] border border-copper-500/20 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-copper-400 focus:outline-none focus:border-copper-400"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendEmailInvite}
                    onChange={(e) => setSendEmailInvite(e.target.checked)}
                    className="mt-0.5 rounded border-copper-500/30 text-copper-500 focus:ring-copper-400/20"
                  />
                  <span className="text-xs text-cream-200/80">
                    Send login credentials, role instructions, and admin portal URL immediately via Resend Email API.
                  </span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-cream-200/70 hover:text-cream-50 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingAuthority}
                  className="px-5 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  {submittingAuthority ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Email & Authorizing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Grant Authority & Send</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
