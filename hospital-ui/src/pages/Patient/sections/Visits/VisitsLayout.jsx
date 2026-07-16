import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Stethoscope, CalendarRange, Clipboard, AlertTriangle, ShieldCheck, ClipboardCheck } from 'lucide-react';
import PatientHeader from '../../components/PatientHeader';

const VisitsLayout = () => {
  const tabs = [
    { icon: CalendarRange, label: "View Visit History", path: "history" },
    { icon: Clipboard, label: "Consultation Summary", path: "summary" },
    { icon: AlertTriangle, label: "Chief Complaints", path: "complaints" },
    { icon: ShieldCheck, label: "Diagnosis", path: "diagnosis" },
    { icon: ClipboardCheck, label: "Treatment Plan", path: "treatment" }
  ];

  return (
    <div>
      {/* Patient Header Section */}
      <PatientHeader 
        title="Visits & Clinical Consultations" 
        subtitle="Manage history, read official clinic summaries, diagnoses, and active treatment directives." 
      />

      {/* Grid Side-by-Side Container */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side Menu List Card (Styled after image specs - Warm Amber Style) */}
        <div className="w-full lg:w-80 bg-white border border-amber-100 rounded-2xl p-6 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-3">
            <Stethoscope className="text-amber-600 w-8 h-8" />
          </div>
          <h4 className="text-sm font-bold text-amber-900 tracking-wider text-center uppercase">
            5. Visits & Consultations
          </h4>
          <p className="text-xs text-gray-400 mt-1 text-center font-medium">Verify primary clinical records</p>

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
                      ? 'bg-amber-600 text-white border-transparent shadow-md shadow-amber-600/10'
                      : 'bg-white text-gray-700 border-amber-100/50 hover:bg-amber-50/30'
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

export default VisitsLayout;