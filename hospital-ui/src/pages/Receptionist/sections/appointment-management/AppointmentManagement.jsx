import React, { useState } from 'react';
import { CalendarPlus, Search, CalendarDays, CalendarX, UserCheck } from 'lucide-react';
import BookAppointment from './BookAppointment';
import SearchAppointments from './SearchAppointments';
import RescheduleAppointment from './RescheduleAppointment';
import CancelAppointment from './CancelAppointment';
import WalkInAppointment from './WalkInAppointment';

const AppointmentManagement = () => {
  const [subTab, setSubTab] = useState('book');

  const tabs = [
    { id: 'book', label: 'Book Appointment', icon: CalendarPlus },
    { id: 'search', label: 'Search / View', icon: Search },
    { id: 'reschedule', label: 'Reschedule', icon: CalendarDays },
    { id: 'cancel', label: 'Cancel', icon: CalendarX },
    { id: 'walk-in', label: 'Walk-in', icon: UserCheck },
  ];

  const renderSubContent = () => {
    switch (subTab) {
      case 'book': return <BookAppointment />;
      case 'search': return <SearchAppointments />;
      case 'reschedule': return <RescheduleAppointment />;
      case 'cancel': return <CancelAppointment />;
      case 'walk-in': return <WalkInAppointment />;
      default: return <BookAppointment />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Dynamic Navigation Toolbar Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1.5 flex flex-wrap gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Container Content */}
      <div className="transition-all duration-150">
        {renderSubContent()}
      </div>
    </div>
  );
};

export default AppointmentManagement;