import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, Loader2, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';

const ChangePasswordSection = () => {
  const [passwords, setPasswords] = useState({ 
    current: '', 
    new: '', 
    confirm: '' 
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaved(false);

    if (passwords.new !== passwords.confirm) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem('token') || localStorage.getItem('accessToken');

      const res = await fetch('https://localhost:7203/api/doctor/profile/change-password', {
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
      setPasswords({ current: '', new: '', confirm: '' });
      
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message || 'Password change failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
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

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <Check className="w-4 h-4" />
          Password changed successfully!
        </div>
      )}

      <div className="max-w-md space-y-5">
        {/* Current Password */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Current Authorization Key
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type={showPasswords.current ? "text" : "password"}
              placeholder="••••••••••••"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => toggleVisibility('current')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Target Generation Key (New)
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type={showPasswords.new ? "text" : "password"}
              placeholder="••••••••••••"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => toggleVisibility('new')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Verify Target Key Specification
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type={showPasswords.confirm ? "text" : "password"}
              placeholder="••••••••••••"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => toggleVisibility('confirm')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving || !passwords.current || !passwords.new || !passwords.confirm}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold text-sm rounded-xl shadow-sm transition-all"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
          <span>{saving ? 'Updating Security Key...' : 'Update Security Authorization'}</span>
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordSection;