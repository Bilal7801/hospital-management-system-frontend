import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { User, Phone, ShieldAlert, FileText } from 'lucide-react';
import PatientHeader from '../../components/PatientHeader';

const ProfileLayout = () => {
  const tabs = [
    { icon: User, label: "Personal Information", path: "personal-info" },
    { icon: Phone, label: "Emergency Contacts", path: "emergency-contacts" },
    { icon: ShieldAlert, label: "Allergies & Conditions", path: "allergies" },
    { icon: FileText, label: "Health Summary", path: "summary" },
  ];

  return (
    <div>
      {/* Page Header */}
      <PatientHeader 
        title="My Profile" 
        subtitle="Securely control your personal credentials and diagnostic specs." 
      />

      {/* Split Profile Container */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side: Profile & Health Summary Layout Card */}
        <div className="w-full lg:w-80 bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3">
            <User className="text-emerald-600 w-8 h-8" />
          </div>
          <h4 className="text-sm font-bold text-emerald-800 tracking-wider text-center uppercase">
            3. Profile & Health Summary
          </h4>
          <p className="text-xs text-gray-400 mt-1 text-center font-medium">Manage medical charts & metrics</p>

          <hr className="w-full border-gray-100 my-4" />

          {/* Sub Navigation Links */}
          <div className="w-full space-y-2">
            {tabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white border-transparent shadow-md'
                      : 'bg-white text-gray-700 border-gray-200/80 hover:bg-gray-50'
                  }`
                }
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right Side: Active Child Section Content */}
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;