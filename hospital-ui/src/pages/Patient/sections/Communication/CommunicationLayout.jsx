import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { MessageSquare, Send, Bell, Megaphone, PhoneCall } from 'lucide-react';
import PatientHeader from '../../components/PatientHeader';

const CommunicationLayout = () => {
  const tabs = [
    { icon: Send, label: "Send Message to Doctor", path: "chat" },
    { icon: Bell, label: "Notifications", path: "notifications" },
    { icon: Megaphone, label: "Announcements", path: "announcements" },
    { icon: PhoneCall, label: "Hospital Contact Info", path: "contact" },
  ];

  return (
    <div>
      {/* Patient Header Section */}
      <PatientHeader 
        title="Patient Communication Hub" 
        subtitle="Manage direct text inquiries with clinics, inspect urgent security notices, and track campus-wide health alerts." 
      />

      {/* Grid Side-by-Side Container */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side Menu List Card (Themed Green Style) */}
        <div className="w-full lg:w-80 bg-white border border-green-100 rounded-2xl p-6 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
            <MessageSquare className="text-green-600 w-8 h-8" />
          </div>
          <h4 className="text-sm font-bold text-green-950 tracking-wider text-center uppercase">
            9. Communication
          </h4>
          <p className="text-xs text-gray-400 mt-1 text-center font-medium">Verify direct secure inquiries</p>

          <hr className="w-full border-gray-100 my-4" />

          {/* Dynamic Navigation Action Items */}
          <div className="w-full space-y-2">
            {tabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-green-600 text-white border-transparent shadow-md shadow-green-600/10'
                      : 'bg-white text-gray-700 border-green-100/50 hover:bg-green-50/30'
                  }`
                }
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right Side Rendering Window */}
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CommunicationLayout;