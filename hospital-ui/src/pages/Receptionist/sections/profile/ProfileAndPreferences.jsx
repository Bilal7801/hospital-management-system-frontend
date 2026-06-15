import React, { useState, useEffect, useRef } from 'react';
import { User, Lock, Save, Camera, Loader2, CheckCircle } from 'lucide-react';
import api from '../../../../api/axios'; // Targets your custom interceptor instance

const ProfileAndPreferences = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    profilePic: '',
    shift: 'Not Assigned'
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const fileInputRef = useRef(null);

  // 🌍 BASE BACKEND HOST (For rendering static image assets out of wwwroot)
  const BACKEND_URL = "https://localhost:7203";

  // Maps static directory paths dynamically
  const getFullImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${BACKEND_URL}${path}`;
  };

  // Load Profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/receptionist/profile');
        const incomingData = res.data;
        console.log("Profile Payload Received:", incomingData);

        if (incomingData) {
          setProfile({
            name: incomingData.name || incomingData.Name || '',
            email: incomingData.email || incomingData.Email || '',
            phone: incomingData.phone || incomingData.Phone || '',
            employeeId: incomingData.employeeId || incomingData.userId || incomingData.UserId || '',
            profilePic: incomingData.profileImageUrl || incomingData.ProfileImageUrl || '',
            shift: incomingData.shift || 'Not Assigned'
          });
        }
      } catch (err) {
        console.error("Profile view failed to load:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getInitials = () => {
    if (profile.name && typeof profile.name === 'string') {
      const cleanName = profile.name.trim();
      if (cleanName.length > 0 && !cleanName.includes('@')) {
        return cleanName.charAt(0).toUpperCase();
      }
    }
    if (profile.email && typeof profile.email === 'string') {
      return profile.email.trim().charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Handle local image file upload sequence
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 3MB Max boundary rule
    if (file.size > 3 * 1024 * 1024) {
      alert("Selected image is too large. Please supply a graphic under 3MB.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setSuccessMsg("Uploading image...");
      
      // Your interceptor automatically strips headers to build multipart boundary correctly!
      const res = await api.post('/receptionist/profile/upload-image', formData);

      const uploadedPath = res.data.imageUrl || res.data.profileImageUrl;
      setProfile(prev => ({
        ...prev,
        profilePic: uploadedPath
      }));

      setSuccessMsg("Profile photo updated successfully!");
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error("Image upload exception:", err);
      alert("Failed to save profile picture to server.");
    }
  };

  const handleProfileSave = async () => {
    setSavingProfile(true);
    try {
      const payloadDto = {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        shift: profile.shift
      };

      await api.put('/receptionist/profile', payloadDto);
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile details.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    setSavingPassword(true);
    try {
      await api.post('/receptionist/profile/change-password', passwordData);
      setSuccessMsg("Password changed successfully!");
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      alert("Failed to change password.");
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-6">
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <User className="w-6 h-6 text-blue-100" />
          Profile Settings
        </h1>
        <p className="text-blue-100 text-sm mt-1">Manage personal account configurations, contact info, and security metrics.</p>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            <User className="w-4 h-4 text-blue-600" /> Personal Details
          </h3>
          
          <div className="space-y-4">
            {/* Dynamic Photo Container */}
            <div className="flex items-center gap-4 mb-4">
              {profile.profilePic ? (
                <img 
                  src={getFullImageUrl(profile.profilePic)} 
                  alt="Profile Avatar" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-600 shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full flex items-center justify-center border-2 border-white shadow-md text-xl font-bold uppercase tracking-wider select-none">
                  {getInitials()}
                </div>
              )}

              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />

              <button 
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1 bg-transparent border-none outline-none"
              >
                <Camera className="w-3.5 h-3.5" /> Change Photo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase">Full Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full mt-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 font-semibold text-gray-800" 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase">Employee ID</label>
                <input type="text" value={profile.employeeId} disabled className="w-full mt-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-100 text-gray-500 font-mono font-semibold" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase">Email Address</label>
              <input 
                type="email" 
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full mt-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 font-semibold text-gray-800" 
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase">Phone Number</label>
              <input 
                type="tel" 
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full mt-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 font-semibold text-gray-800" 
              />
            </div>

            <button 
              onClick={handleProfileSave}
              disabled={savingProfile}
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <Save className="w-3.5 h-3.5" /> 
              {savingProfile ? "Saving..." : "Save Details"}
            </button>
          </div>
        </div>

        {/* Security Credentials Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            <Lock className="w-4 h-4 text-blue-600" /> Security Credentials
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase">Current Password</label>
              <input 
                type="password" 
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                className="w-full mt-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase">New Password</label>
              <input 
                type="password" 
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                className="w-full mt-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase">Confirm New Password</label>
              <input 
                type="password" 
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                className="w-full mt-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50" 
              />
            </div>
            <button 
              onClick={handlePasswordChange}
              disabled={savingPassword}
              className="w-full bg-gray-800 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-gray-900 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <Lock className="w-3.5 h-3.5" /> 
              {savingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAndPreferences;