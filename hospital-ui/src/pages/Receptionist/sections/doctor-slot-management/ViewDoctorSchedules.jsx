// pages/Receptionist/sections/doctor-slot-management/ViewDoctorSchedules.jsx
import React, { useState } from 'react';
import { CalendarDays, Clock } from 'lucide-react';

const ViewDoctorSchedules = () => {
  const [selectedDoc, setSelectedDoc] = useState('d1');

  const schedules = {
    d1: [
      { day: "Monday", morning: "09:00 AM - 12:30 PM", evening: "04:00 PM - 07:00 PM", slots: "25 Slots" },
      { day: "Wednesday", morning: "09:00 AM - 12:30 PM", evening: "04:00 PM - 07:00 PM", slots: "25 Slots" },
      { day: "Friday", morning: "09:00 AM - 01:00 PM", evening: "Closed", slots: "15 Slots" },
    ],
    d2: [
      { day: "Tuesday", morning: "10:00 AM - 02:00 PM", evening: "05:00 PM - 08:00 PM", slots: "30 Slots" },
      { day: "Thursday", morning: "10:00 AM - 02:00 PM", evening: "05:00 PM - 08:00 PM", slots: "30 Slots" },
    ]
  };

  const activeSchedule = schedules[selectedDoc] || [];

  return (
    <div className="space-y-4">
      {/* Brand Blue Header Banner — Matches the Appointment Management consistency */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Doctor Duty Schedules</h1>
        <p className="text-blue-100 text-sm mt-1">
          Monitor weekly shift tracking schedules, clinical time slots, and maximum patient capacities
        </p>
      </div>

      {/* Main Content Box */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
        
        {/* Doctor Dropdown Selector Element */}
        <div className="max-w-xs">
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Select Medical Practitioner <span className="text-red-500">*</span>
          </label>
          <select 
            value={selectedDoc} 
            onChange={e => setSelectedDoc(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 cursor-pointer text-gray-800 font-semibold transition-all"
          >
            <option value="d1">Dr. Aman Gupta (Cardiology)</option>
            <option value="d2">Dr. Sarah Johns (Orthopedics)</option>
          </select>
        </div>

        {/* Routine Grid Distribution Table */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-gray-50/30">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-5 py-4 text-left font-bold">Working Day</th>
                <th className="px-5 py-4 text-left font-bold">Morning Routine Shift</th>
                <th className="px-5 py-4 text-left font-bold">Evening Routine Shift</th>
                <th className="px-5 py-4 text-left font-bold">Max Capacity Matrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs bg-white">
              {activeSchedule.length > 0 ? (
                activeSchedule.map((sched, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-5 py-4 font-bold text-gray-800 flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5 text-blue-600" />
                      {sched.day}
                    </td>
                    <td className="px-5 py-4 text-gray-600 font-medium">
                      <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-bold border border-gray-200/50">
                        <Clock className="w-3 h-3 text-gray-400" /> {sched.morning}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 font-medium">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold border ${
                        sched.evening === 'Closed' 
                          ? 'bg-red-50 text-red-600 border-red-100' 
                          : 'bg-gray-100 text-gray-700 border-gray-200/50'
                      }`}>
                        <Clock className="w-3 h-3 text-gray-400" /> {sched.evening}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold text-blue-600 tracking-wide">{sched.slots}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-5 py-10 text-center text-gray-400 font-medium">
                    No active schedule tracks found for this provider.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctorSchedules;