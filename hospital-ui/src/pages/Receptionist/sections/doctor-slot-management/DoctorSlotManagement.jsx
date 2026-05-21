// pages/Receptionist/sections/doctor-slot-management/DoctorSlotManagement.jsx
import React, { useState } from 'react';
import { UserCheck, CalendarDays, SearchCode, CalendarRange } from 'lucide-react';

// Sub-component placeholders — We will write these next
import ViewDoctors from './ViewDoctors';
import ViewDoctorSchedules from './ViewDoctorSchedules';
import CheckSlotAvailability from './CheckSlotAvailability';
import AppointmentCalendar from './AppointmentCalendar';

const DoctorSlotManagement = () => {
  const [activeTab, setActiveTab] = useState('view-doctors');

  const tabs = [
    { id: 'view-doctors', label: 'View Doctors', icon: UserCheck },
    { id: 'doctor-schedules', label: 'View Doctor Schedules', icon: CalendarDays },
    { id: 'slot-availability', label: 'Check Slot Availability', icon: SearchCode },
    { id: 'appointment-calendar', label: 'Appointment Calendar', icon: CalendarRange },
  ];

  return (
    <div className="space-y-4">
      {/* Dynamic Sub-Navigation Bar — Locked to premium brand styles */}
      <div className="bg-white rounded-xl border border-gray-200 p-1.5 flex flex-wrap gap-1 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Render viewport block */}
      <div className="transition-all duration-200">
        {activeTab === 'view-doctors' && <ViewDoctors />}
        {activeTab === 'doctor-schedules' && <ViewDoctorSchedules />}
        {activeTab === 'slot-availability' && <CheckSlotAvailability />}
        {activeTab === 'appointment-calendar' && <AppointmentCalendar />}
      </div>
    </div>
  );
};

export default DoctorSlotManagement;