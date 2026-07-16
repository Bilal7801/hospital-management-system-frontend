import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Pill, FileSpreadsheet, Scroll, AlertTriangle, RefreshCcw, Printer } from 'lucide-react';
import PatientHeader from '../../components/PatientHeader';

const PrescriptionsLayout = () => {
  const tabs = [
    { icon: FileSpreadsheet, label: "View Prescriptions", path: "view" },
    { icon: AlertTriangle, label: "Medication Instructions", path: "instructions" },
    { icon: RefreshCcw, label: "Dosage & Duration", path: "dosage" },
    { icon: Printer, label: "Download / Print Prescription", path: "print" },
  ];

  return (
    <div>
      {/* Patient Header Section */}
      <PatientHeader 
        title="Prescriptions & Therapeutics" 
        subtitle="Access details of active medical prescription files, safe drug administrations, and dosages." 
      />

      {/* Grid Side-by-Side Container */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side Menu List Card (Styled after image specs - Rx Purple Style) */}
        <div className="w-full lg:w-80 bg-white border border-purple-100 rounded-2xl p-6 shadow-sm flex flex-col items-center">
          {/* Rx Symbol Mock */}
          <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
            <span className="text-3xl font-extrabold text-purple-700 font-serif leading-none">Rₓ</span>
          </div>
          <h4 className="text-sm font-bold text-purple-900 tracking-wider text-center uppercase">
            6. Prescriptions
          </h4>
          <p className="text-xs text-gray-400 mt-1 text-center font-medium">Coordinate medicinal parameters</p>

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
                      ? 'bg-purple-600 text-white border-transparent shadow-md shadow-purple-600/10'
                      : 'bg-white text-gray-700 border-purple-100/50 hover:bg-purple-50/30'
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

export default PrescriptionsLayout;