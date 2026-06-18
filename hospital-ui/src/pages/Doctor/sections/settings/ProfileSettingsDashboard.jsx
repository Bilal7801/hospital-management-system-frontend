import React, { useState } from 'react';
import { User, Lock, Settings2, BellRing, Settings } from 'lucide-react';
import UpdateProfileSection from './UpdateProfileSection';
import ChangePasswordSection from './ChangePasswordSection';
import ConsultationSettingsSection from './ConsultationSettingsSection';
import NotificationPreferencesSection from './NotificationPreferencesSection';

const ProfileSettingsDashboard = () => {
  const [currentTab, setCurrentTab] = useState('identity');

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 md:p-8 space-y-6">
      {/* Structural Header Segment */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          Core Security & Engine Parameters
        </h1>
        <p className="text-gray-500 text-xs mt-0.5">
          Manage practitioner credential records, scheduling threshold bounds, pricing parameters, and system webhooks.
        </p>
      </div>

      {/* Horizontal Filter Navigation Rows */}
      <div className="flex flex-col sm:flex-row gap-2 border border-gray-200 bg-white rounded-xl p-1.5 shadow-sm overflow-x-auto">
        <button
          onClick={() => setCurrentTab('identity')}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            currentTab === 'identity' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <User className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Update Profile</span>
        </button>
        
        <button
          onClick={() => setCurrentTab('security')}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            currentTab === 'security' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Lock className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Change Password</span>
        </button>

        <button
          onClick={() => setCurrentTab('consultation')}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            currentTab === 'consultation' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Settings2 className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Consultation Settings</span>
        </button>

        <button
          onClick={() => setCurrentTab('alerts')}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            currentTab === 'alerts' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <BellRing className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Notification Streams</span>
        </button>
      </div>

      {/* Primary Context Section Render Switcher */}
      <div className="mt-4">
        {currentTab === 'identity' && <UpdateProfileSection />}
        {currentTab === 'security' && <ChangePasswordSection />}
        {currentTab === 'consultation' && <ConsultationSettingsSection />}
        {currentTab === 'alerts' && <NotificationPreferencesSection />}
      </div>
    </div>
  );
};

export default ProfileSettingsDashboard;