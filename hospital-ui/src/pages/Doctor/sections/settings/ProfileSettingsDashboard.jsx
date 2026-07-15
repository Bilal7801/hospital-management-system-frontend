import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import UpdateProfileSection from './UpdateProfileSection';
import ChangePasswordSection from './ChangePasswordSection';

const ProfileSettingsDashboard = () => {
  const [currentTab, setCurrentTab] = useState('identity');

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 md:p-8 space-y-6 animate-fadeIn">
      {/* Structural Header Segment */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          Core Security & Profile Settings
        </h1>
        <p className="text-gray-500 text-xs">
          Manage practitioner credential records, identity configurations, and cryptographic authorization keys.
        </p>
      </div>

      {/* Premium Segmented Tab Switcher */}
      <div className="flex">
        <div className="inline-flex p-1 bg-white border border-gray-200 rounded-xl shadow-sm gap-1">
          <button
            onClick={() => setCurrentTab('identity')}
            className={`inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all duration-150 ${
              currentTab === 'identity' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <User className="w-3.5 h-3.5 flex-shrink-0" /> 
            <span>Update Profile</span>
          </button>
          
          <button
            onClick={() => setCurrentTab('security')}
            className={`inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all duration-150 ${
              currentTab === 'security' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Lock className="w-3.5 h-3.5 flex-shrink-0" /> 
            <span>Change Password</span>
          </button>
        </div>
      </div>

      {/* Section Content Switching Area */}
      <div className="mt-4">
        {currentTab === 'identity' && <UpdateProfileSection />}
        {currentTab === 'security' && <ChangePasswordSection />}
      </div>
    </div>
  );
};

export default ProfileSettingsDashboard;