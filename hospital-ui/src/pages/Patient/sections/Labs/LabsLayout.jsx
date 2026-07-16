import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Beaker, ScrollText, Eye, Download, ShieldAlert } from 'lucide-react';
import PatientHeader from '../../components/PatientHeader';

const LabsLayout = () => {
  const tabs = [
    { icon: ScrollText, label: "View Lab Test Results", path: "results" },
    { icon: Eye, label: "View Imaging / Scan Results", path: "imaging" },
    { icon: Download, label: "Download / Share Reports", path: "export" },
    { icon: ShieldAlert, label: "Track Pending Tests", path: "pending" },
  ];

  return (
    <div>
      {/* Patient Header Section */}
      <PatientHeader 
        title="Lab & Diagnostic Imaging Center" 
        subtitle="Retrieve bio-medical clinical analysis, scan impressions, and keep track of ongoing processing labs." 
      />

      {/* Grid Side-by-Side Container */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side Menu List Card (Themed Teal Style) */}
        <div className="w-full lg:w-80 bg-white border border-teal-100 rounded-2xl p-6 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mb-3">
            <Beaker className="text-teal-600 w-8 h-8" />
          </div>
          <h4 className="text-sm font-bold text-teal-900 tracking-wider text-center uppercase">
            7. Lab & Imaging Reports
          </h4>
          <p className="text-xs text-gray-400 mt-1 text-center font-medium">Verify bio-marker evaluations</p>

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
                      ? 'bg-teal-600 text-white border-transparent shadow-md shadow-teal-600/10'
                      : 'bg-white text-gray-700 border-teal-100/50 hover:bg-teal-50/30'
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

export default LabsLayout;