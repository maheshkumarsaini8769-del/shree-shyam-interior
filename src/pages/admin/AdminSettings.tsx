import React, { useState, useEffect } from 'react';
import { Settings, Save, Lock, ShieldCheck, Check } from 'lucide-react';
import { apiService, BusinessSettings } from '../../services/apiService';
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

  const { showToast } = useToast();

  useEffect(() => {
    loadSettings();
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
    </div>
  );
};
