import React, { useEffect, useMemo, useState } from 'react';
import { Search, Bell, User, Loader2, AlertCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7203';

const DoctorHeader = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    role: '',
    profileImageUrl: '',
  });

  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
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

        setProfile({
          fullName: data.fullName ?? data.FullName ?? '',
          role: data.role ?? data.Role ?? 'Doctor',
          profileImageUrl: data.profileImageUrl ?? data.ProfileImageUrl ?? '',
        });
      } catch (err) {
        setError(err.message || 'Failed to load header data');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [authHeaders]);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search patient records..."
            className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-700"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </div>

        <div className="flex items-center gap-3 pl-5 border-l border-gray-200">
          {loading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          ) : (
            <>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {profile.fullName || 'Doctor'}
                </p>
                <p className="text-[10px] font-medium text-blue-600 uppercase tracking-wide">
                  {profile.role || 'Doctor'}
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center overflow-hidden">
                {profile.profileImageUrl ? (
                  <img
                    src={imageUrl(profile.profileImageUrl)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-blue-600" />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default DoctorHeader;