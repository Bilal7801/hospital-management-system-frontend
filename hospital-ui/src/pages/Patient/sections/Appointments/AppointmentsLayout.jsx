import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Calendar, Search, CalendarDays, ClipboardList, History, RefreshCw, Ban } from 'lucide-react';
import PatientHeader from '../../components/PatientHeader';

const AppointmentsLayout = () => {
  const tabs = [
    { icon: Calendar, label: "Book Appointment", path: "book" },
    { icon: Search, label: "Search Doctor / Department", path: "search" },
    { icon: CalendarDays, label: "View Doctor Availability", path: "availability" },
    { icon: ClipboardList, label: "Upcoming Appointments", path: "upcoming" },
    { icon: History, label: "Past Appointments", path: "past" },
    { icon: RefreshCw, label: "Reschedule Appointment", path: "reschedule" },
    { icon: Ban, label: "Cancel Appointment", path: "cancel" },
  ];

  return (
    <div>
      {/* Dynamic Patient Page Header */}
      <PatientHeader 
        title="Consultations & Appointments" 
        subtitle="Secure, manage, reschedule, and book new medical slots instantly." 
      />

      {/* Grid Side-by-Side Container */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side Menu List Card (Styled after image specs) */}
        <div className="w-full lg:w-80 bg-white border border-blue-100 rounded-2xl p-6 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
            <Calendar className="text-blue-600 w-8 h-8" />
          </div>
          <h4 className="text-sm font-bold text-blue-900 tracking-wider text-center uppercase">
            4. Appointments
          </h4>
          <p className="text-xs text-gray-400 mt-1 text-center font-medium">Coordinate medical consult parameters</p>

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
                      ? 'bg-blue-600 text-white border-transparent shadow-md'
                      : 'bg-white text-gray-700 border-gray-200/80 hover:bg-gray-50'
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

export default AppointmentsLayout;