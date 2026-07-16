import React, { useState } from 'react';
import { Search, Star, MessageSquare, CalendarCheck } from 'lucide-react';

const SearchDoctor = () => {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");

  const doctors = [
    { name: "Dr. Aman Gupta", specialty: "Cardiology", experience: "14 Years", rating: "4.9", reviews: "128", hospital: "Metropolitan Cardiac Wing" },
    { name: "Dr. Sarah Johnson", specialty: "Pediatrics", experience: "10 Years", rating: "4.8", reviews: "94", hospital: "Children Care Unit" },
    { name: "Dr. Vikrant Shah", specialty: "Orthopedics", experience: "12 Years", rating: "4.7", reviews: "110", hospital: "Spine & Joint Institute" }
  ];

  const filteredDocs = doctors.filter(doc => 
    (dept === "All" || doc.specialty === dept) &&
    doc.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctor by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
          />
        </div>
        
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm bg-white"
        >
          <option value="All">All Departments</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Orthopedics">Orthopedics</option>
        </select>
      </div>

      {/* Grid of Doctors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDocs.map((doc, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{doc.name}</h4>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-0.5">{doc.specialty}</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" /> {doc.rating}
                </div>
              </div>
              
              <div className="mt-4 space-y-2 text-xs text-gray-500">
                <p>💼 <strong>Experience:</strong> {doc.experience}</p>
                <p>📍 <strong>Facility:</strong> {doc.hospital}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-gray-100 pt-4 mt-6">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                <CalendarCheck className="w-4 h-4" /> View Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDoctor;