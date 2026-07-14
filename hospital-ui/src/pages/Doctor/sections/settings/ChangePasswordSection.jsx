// ChangePasswordSection.jsx
import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, Loader2, Check, AlertCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7203';

const ChangePasswordSection = () => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError('');
      setSaved(false);

      const token = localStorage.getItem('token') || localStorage.getItem('accessToken');

      const res = await fetch(`${API_BASE}/api/doctor/profile/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new,
          confirmPassword: passwords.confirm,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to change password');

      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      setError(err.message || 'Password change failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
          <KeyRound className="w-4 h-4 text-gray-400" /> Cryptographic Key Rotation Engine
        </h3>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5">
          Enforce password updates at regular intervals to uphold compliance protocols.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="max-w-md space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Current Authorization Key
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="password"
              placeholder="••••••••••••"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Target Generation Key (New)
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="password"
              placeholder="••••••••••••"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Verify Target Key Specification
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="password"
              placeholder="••••••••••••"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold text-xs rounded-lg shadow-sm transition-all"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
          <span>Update Security Authorization</span>
        </button>

        {saved && (
          <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-2 border border-emerald-100 rounded-lg">
            <Check className="w-3.5 h-3.5" /> Password changed successfully
          </div>
        )}
      </div>
    </form>
  );
};

export default ChangePasswordSection;