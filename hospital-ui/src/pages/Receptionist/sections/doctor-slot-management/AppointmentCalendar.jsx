// pages/Receptionist/sections/doctor-slot-management/AppointmentCalendar.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';

const AppointmentCalendar = () => {
  const [viewMode, setViewMode] = useState('Day'); // Day / Week / Month toggles

  // Mock schedule summary for dashboard blocks
  const calendarTimeline = [
    { id: 1, time: "09:00 AM", task: "Cardiac Echo Clearance", patient: "Vikas Khanna", doc: "Dr. Aman Gupta", room: "OPD-4" },
    { id: 2, time: "10:15 AM", task: "Orthopedic Cast Review", patient: "Meera Joshi", doc: "Dr. Sarah Johns", room: "Room 102" },
    { id: 3, time: "11:30 AM", task: "General Health Screening", patient: "Karan Adani", doc: "Dr. Aman Gupta", room: "OPD-4" },
  ];

  return (
    <div className="space-y-4">
      {/* Brand Blue Header Banner — Perfect layout uniformity across all modules */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Master Appointment Calendar</h1>
        <p className="text-blue-100 text-sm mt-1">
          Track live clinical timelines, toggle scheduling view modes, and monitor active patient-to-doctor room allocations
        </p>
      </div>

      {/* Main Calendar Board Box */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
        
        {/* Structural Toggle Header row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-50 rounded-xl border border-gray-200 cursor-pointer text-gray-600 transition-all shadow-sm">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-bold text-gray-800 tracking-tight px-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Thursday, May 21, 2026
            </span>
            <button className="p-2 hover:bg-gray-50 rounded-xl border border-gray-200 cursor-pointer text-gray-600 transition-all shadow-sm">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Day / Week / Month Tab Array Selector toggles */}
          <div className="bg-gray-100 p-1 rounded-xl flex border border-gray-200/40">
            {['Day', 'Week', 'Month'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  viewMode === mode 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {mode} View
              </button>
            ))}
          </div>
        </div>

        {/* Structured Day Timeline Track render block */}
        <div className="space-y-3.5">
          {calendarTimeline.map((item) => (
            <div key={item.id} className="flex border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition-all bg-white">
              
              {/* Time Stamp Track strip column */}
              <div className="bg-blue-50/40 border-r border-gray-200 text-blue-700 px-4 py-4 flex flex-col items-center justify-center min-w-[95px] font-bold text-xs gap-1 shadow-inner">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span className="tracking-wide">{item.time}</span>
              </div>

              {/* Allocation Parameters Body info block */}
              <div className="p-4 flex-1 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <span className="text-sm font-bold text-gray-800 block">{item.task}</span>
                  <span className="text-xs text-gray-500 font-medium mt-1 block">
                    Patient: <span className="text-gray-700 font-bold">{item.patient}</span> | Practitioner: <span className="text-blue-600 font-bold">{item.doc}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 border border-gray-200 text-gray-600 px-3 py-1 rounded-lg shadow-sm">
                    {item.room}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;