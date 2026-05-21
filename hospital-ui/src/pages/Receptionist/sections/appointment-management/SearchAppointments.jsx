// pages/Receptionist/sections/appointment-management/SearchAppointments.jsx
import React, { useState } from 'react';
import { Search, Filter, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

const SearchAppointments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRange, setFilterRange] = useState("Today's Schedule");
  
  const records = [
    { id: "APT-9021", patient: "Vikas Khanna", doctor: "Dr. Aman Gupta", date: "2026-05-21", time: "10:15 AM", status: "Checked-In" },
    { id: "APT-4820", patient: "Meera Joshi", doctor: "Dr. Sarah Johns", date: "2026-05-21", time: "10:30 AM", status: "Pending" },
    { id: "APT-1104", patient: "Karan Adani", doctor: "Dr. Aman Gupta", date: "2026-05-22", time: "10:45 AM", status: "Confirmed" },
  ];

  // Filter records based on active query reference or patient tracking data
  const filteredRecords = records.filter(apt => 
    apt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Brand Blue Header Banner — Perfect theme alignment across all deck blocks */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Appointment Log Registry</h1>
        <p className="text-blue-100 text-sm mt-1">
          Search, filter, and audit cross-sectional patient allocations and live medical queue blocks
        </p>
      </div>

      {/* High-density Query Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search matching slots, IDs, or names..." 
            className="w-full pl-10 pr-4 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 transition-all font-medium placeholder:text-gray-400 shadow-inner"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2.5 w-full sm:w-auto">
          <select 
            value={filterRange}
            onChange={e => setFilterRange(e.target.value)}
            className="flex-1 sm:flex-initial px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white text-gray-700 font-bold cursor-pointer focus:outline-none focus:border-blue-600 transition-all"
          >
            <option value="Today's Schedule">Today's Schedule</option>
            <option value="All Upcoming">All Upcoming</option>
          </select>
          
          <button className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:border-blue-600 focus:outline-none transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Grid Board Records System */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-5 py-3.5 text-left font-bold">Appointment ID</th>
                <th className="px-5 py-3.5 text-left font-bold">Patient Name</th>
                <th className="px-5 py-3.5 text-left font-bold">Assigned Provider</th>
                <th className="px-5 py-3.5 text-left font-bold">Schedule Date</th>
                <th className="px-5 py-3.5 text-left font-bold">Timeline Slot</th>
                <th className="px-5 py-3.5 text-left font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((apt) => (
                  <tr key={apt.id} className="hover:bg-blue-50/30 transition-colors">
                    {/* Consistent Blue theme accent text for core reference links */}
                    <td className="px-5 py-3.5 font-bold text-blue-600 tracking-wide">{apt.id}</td>
                    <td className="px-5 py-3.5 font-bold text-gray-800">{apt.patient}</td>
                    <td className="px-5 py-3.5 font-semibold text-gray-600">{apt.doctor}</td>
                    <td className="px-5 py-3.5 text-gray-500 font-medium">{apt.date}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 font-semibold text-gray-600">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{apt.time}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                        apt.status === 'Checked-In' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        apt.status === 'Confirmed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center text-gray-400 font-medium">
                    No matching records discovered inside active timelines.
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

export default SearchAppointments;