import React, { useState } from 'react';
import { User, Lock, Bell, Save, Camera, Mail, Phone, ShieldCheck } from 'lucide-react';

const ProfileAndPreferences = () => {
  const [notifSettings, setNotifSettings] = useState({
    appointments: true,
    payments: true,
    system: false,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <User className="w-6 h-6 text-blue-100" />
          Profile & Preferences
        </h1>
        <p className="text-blue-100 text-sm mt-1">Manage your account credentials, security settings, and alert configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Update Profile Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            <User className="w-4 h-4 text-blue-600" /> Update Personal Profile
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 relative">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer">Change Photo</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase">Full Name</label>
                <input type="text" defaultValue="Sarah Jenkins" className="w-full mt-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 font-semibold" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase">Employee ID</label>
                <input type="text" disabled defaultValue="REC-2026-001" className="w-full mt-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-100 text-gray-500 font-mono" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase">Email Address</label>
              <input type="email" defaultValue="s.jenkins@metrocare.com" className="w-full mt-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 font-semibold" />
            </div>
            <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer transition-all">
              <Save className="w-3.5 h-3.5" /> Save Profile Details
            </button>
          </div>
        </div>

        {/* 2. Security Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            <Lock className="w-4 h-4 text-blue-600" /> Change Password
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full mt-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full mt-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full mt-1 p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50" />
            </div>
            <button className="w-full bg-gray-800 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-gray-900 flex items-center justify-center gap-2 cursor-pointer transition-all mt-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Update Security Credentials
            </button>
          </div>
        </div>
      </div>

      {/* 3. Notification Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
          <Bell className="w-4 h-4 text-blue-600" /> Notification Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'appointments', label: 'Appointment Reminders', desc: 'Alerts for upcoming bookings' },
            { id: 'payments', label: 'Payment Alerts', desc: 'Updates on invoice status' },
            { id: 'system', label: 'System Notifications', desc: 'Maintenance and downtime alerts' },
          ].map((item) => (
            <div key={item.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-800">{item.label}</p>
                <p className="text-[10px] text-gray-400 font-medium">{item.desc}</p>
              </div>
              <button 
                onClick={() => setNotifSettings({...notifSettings, [item.id]: !notifSettings[item.id]})}
                className={`w-10 h-5 rounded-full transition-colors relative ${notifSettings[item.id] ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${notifSettings[item.id] ? 'translate-x-5' : 'translate-x-0'}`}></span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileAndPreferences;