import React, { useState } from 'react';
import { Calendar, User, MapPin, Video, Search, ChevronRight } from 'lucide-react';

const ViewVisitHistory = () => {
  const [filterType, setFilterType] = useState("All");

  const visits = [
    { id: "V-9082", date: "15 May 2026", doctor: "Dr. Aman Gupta", department: "Cardiology", type: "In-Person", facility: "Metropolitan Cardiac Wing - Room 302", status: "Completed" },
    { id: "V-8711", date: "12 Apr 2026", doctor: "Dr. Sarah Johnson", department: "Pediatrics", type: "Tele-Consult", facility: "Virtual Room B", status: "Completed" },
    { id: "V-8402", date: "10 Feb 2026", doctor: "Dr. Vikrant Shah", department: "Orthopedics", type: "In-Person", facility: "Spine & Joint Institute - Room 105", status: "Completed" }
  ];

  const filteredVisits = filterType === "All" 
    ? visits 
    : visits.filter(v => v.type === filterType);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Visit History Log</h3>
          <p className="text-sm text-gray-500">A comprehensive record of your previous physical and virtual consultations.</p>
        </div>

        <div className="flex gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100 shrink-0">
          {["All", "In-Person", "Tele-Consult"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterType === type 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredVisits.map((visit) => (
          <div key={visit.id} className="group border border-gray-100 rounded-2xl p-5 hover:border-amber-200 hover:bg-amber-50/10 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${visit.type === 'In-Person' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                {visit.type === 'In-Person' ? <MapPin className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{visit.id}</span>
                  <span className="text-xs font-semibold text-gray-300">•</span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md">{visit.department}</span>
                </div>
                <h4 className="text-base font-bold text-gray-900 mt-1">{visit.doctor}</h4>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {visit.date}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto border-t md:border-0 pt-3 md:pt-0 border-gray-50">
              <div className="text-left md:text-right">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Location / Platform</span>
                <span className="text-xs font-semibold text-gray-700 mt-0.5 block">{visit.facility}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-600 transition-all ml-4 hidden md:block" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewVisitHistory;