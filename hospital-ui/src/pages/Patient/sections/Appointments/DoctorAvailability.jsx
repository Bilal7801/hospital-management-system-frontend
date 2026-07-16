import React, { useState } from 'react';
import { CalendarRange, Check, AlertCircle } from 'lucide-react';

const DoctorAvailability = () => {
  const [selectedDoc, setSelectedDoc] = useState("Dr. Aman Gupta");

  const roster = {
    "Dr. Aman Gupta": [
      { day: "Monday", status: "Available", slots: "3 Slots left" },
      { day: "Tuesday", status: "Full", slots: "Fully Booked" },
      { day: "Wednesday", status: "Available", slots: "5 Slots left" },
      { day: "Thursday", status: "Available", slots: "2 Slots left" },
      { day: "Friday", status: "On Leave", slots: "Unavailable" },
    ],
    "Dr. Sarah Johnson": [
      { day: "Monday", status: "Full", slots: "Fully Booked" },
      { day: "Tuesday", status: "Available", slots: "4 Slots left" },
      { day: "Wednesday", status: "Available", slots: "1 Slot left" },
      { day: "Thursday", status: "Full", slots: "Fully Booked" },
      { day: "Friday", status: "Available", slots: "6 Slots left" },
    ]
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Doctor Availability Schedules</h3>
          <p className="text-sm text-gray-500 mt-1">Review live structural duty rosters before booking.</p>
        </div>
        
        <select
          value={selectedDoc}
          onChange={(e) => setSelectedDoc(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm bg-white"
        >
          <option value="Dr. Aman Gupta">Dr. Aman Gupta</option>
          <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {roster[selectedDoc].map((dayRoster, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-xl border text-center flex flex-col justify-between h-32 ${
              dayRoster.status === "Available" 
                ? "bg-emerald-50/40 border-emerald-100" 
                : dayRoster.status === "Full" 
                ? "bg-amber-50/40 border-amber-100" 
                : "bg-rose-50/40 border-rose-100"
            }`}
          >
            <div>
              <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">{dayRoster.day}</p>
              <p className={`text-sm font-bold mt-2 ${
                dayRoster.status === "Available" 
                  ? "text-emerald-700" 
                  : dayRoster.status === "Full" 
                  ? "text-amber-700" 
                  : "text-rose-700"
              }`}>
                {dayRoster.status}
              </p>
            </div>
            <p className="text-xs text-gray-500 font-medium">{dayRoster.slots}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAvailability;