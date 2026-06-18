import React, { useState } from 'react';
import { User, Mail, Phone, Briefcase, Globe, Check } from 'lucide-react';

const UpdateProfileSection = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Bilal Ahmed',
    email: 'bilal.ahmed@vitruvia.org',
    phone: '+92 300 1234567',
    designation: 'Senior Consultant & Web Systems Director',
    biography: 'Specialized in internal medicine workflows and clinical information framework optimizations.'
  });

  const [saved, setSaved] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 animate-fadeIn">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b">
          <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xl border border-blue-200 shadow-inner">
            BA
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">System Identity Avatar</h4>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">Profile images route to global platform directories.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Full Registration Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                value={profileData.fullName}
                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none font-semibold text-gray-800"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Institutional Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="email" 
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none font-semibold text-gray-800"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Verified Contact Link</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none font-semibold text-gray-800"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Professional Designation</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                value={profileData.designation}
                onChange={(e) => setProfileData({...profileData, designation: e.target.value})}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none font-semibold text-gray-800"
              />
            </div>
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Clinical Practitioner Profile Abstract</label>
            <textarea 
              rows="3"
              value={profileData.biography}
              onChange={(e) => setProfileData({...profileData, biography: e.target.value})}
              className="w-full p-3 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none font-medium text-gray-700 leading-relaxed"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 border border-emerald-100 rounded-lg animate-pulse">
            <Check className="w-3.5 h-3.5" /> Identity Registry Mutated Successfully
          </span>
        )}
        <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white font-bold text-xs rounded-lg shadow-sm">
          Commit Modifications
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileSection;