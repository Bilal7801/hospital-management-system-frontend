// UpdateProfileSection.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { User, Mail, Phone, Briefcase, Check, Upload, Loader2, AlertCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7203';

const UpdateProfileSection = () => {
  const [profileData, setProfileData] = useState({
    userId: '',
    fullName: '',
    email: '',
    phone: '',
    profileImageUrl: '',
    role: '',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const authHeaders = useMemo(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const imageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE}${url}`;
  };

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await fetch(`${API_BASE}/api/doctor/profile/details`, {
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load profile');

      setProfileData((prev) => ({
        ...prev,
        userId: data.userId ?? data.UserId ?? '',
        fullName: data.fullName ?? data.FullName ?? '',
        email: data.email ?? data.Email ?? '',
        phone: data.phone ?? data.Phone ?? '',
        profileImageUrl: data.profileImageUrl ?? data.ProfileImageUrl ?? '',
        role: data.role ?? data.Role ?? '',
      }));
    } catch (err) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      setError('');
      setSaved(false);

      const res = await fetch(`${API_BASE}/api/doctor/profile/update-identity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify({
          fullName: profileData.fullName,
          email: profileData.email,
          phone: profileData.phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');

      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
      await loadProfile();
    } catch (err) {
      setError(err.message || 'Profile update failed');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    e.preventDefault();

    if (!avatarFile) {
      setError('Please choose an image first.');
      return;
    }

    try {
      setSavingAvatar(true);
      setError('');

      const formData = new FormData();
      formData.append('file', avatarFile);

      const res = await fetch(`${API_BASE}/api/doctor/profile/upload-avatar`, {
        method: 'POST',
        headers: {
          ...authHeaders,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to upload avatar');

      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
      setAvatarFile(null);
      await loadProfile();
    } catch (err) {
      setError(err.message || 'Avatar upload failed');
    } finally {
      setSavingAvatar(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 animate-fadeIn">
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b">
          <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xl border border-blue-200 shadow-inner overflow-hidden">
            {profileData.profileImageUrl ? (
              <img
                src={imageUrl(profileData.profileImageUrl)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              (profileData.fullName?.[0] || 'D').toUpperCase()
            )}
          </div>

          <div className="flex-1">
            <h4 className="text-sm font-bold text-gray-900">System Identity Avatar</h4>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">
              Profile images route to global platform directories.
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              {profileData.role || 'Doctor'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Full Registration Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none font-semibold text-gray-800"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Institutional Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none font-semibold text-gray-800"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Verified Contact Link
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none font-semibold text-gray-800"
              />
            </div>
          </div>

          
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-gray-900">Upload Profile Image</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Uses your controller upload endpoint.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            className="block w-full text-xs"
          />
          <button
            type="button"
            onClick={handleAvatarUpload}
            disabled={savingAvatar}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black disabled:opacity-60 transition-all text-white font-bold text-xs rounded-lg shadow-sm"
          >
            {savingAvatar ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            Upload Image
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 border border-emerald-100 rounded-lg animate-pulse">
            <Check className="w-3.5 h-3.5" /> Profile updated successfully
          </span>
        )}
        <button
          type="submit"
          disabled={savingProfile}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition-all text-white font-bold text-xs rounded-lg shadow-sm inline-flex items-center gap-2"
        >
          {savingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Commit Modifications
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileSection;