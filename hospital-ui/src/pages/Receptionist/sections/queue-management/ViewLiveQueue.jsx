import React, { useState } from 'react';
import { Tv, Clock, RefreshCw, Layers } from 'lucide-react';

const ViewLiveQueue = () => {
  const [filterDept, setFilterDept] = useState('All');

  const fullQueue = [
    { token: "TKN-081", name: "Vikas Khanna", doc: "Dr. Aman Gupta", dept: "Cardiology", wait: "12 Min", state: "In Consultation" },
    { token: "TKN-082", name: "Karan Adani", doc: "Dr. Aman Gupta", dept: "Cardiology", wait: "25 Min", state: "Called Room" },
    { token: "TKN-083", name: "Meera Joshi", doc: "Dr. Sarah Johns", dept: "Orthopedics", wait: "34 Min", state: "Waiting Room" },
    { token: "TKN-084", name: "Asif Malik", doc: "Dr. Vikas Khanna", dept: "Pediatrics", wait: "41 Min", state: "Waiting Room" },
  ];

  const filteredData = filterDept === 'All' ? fullQueue : fullQueue.filter(q => q.dept === filterDept);

  return (
    <div className="space-y-4">
      {/* Dynamic Data Toolbar Filtering block Row */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Layers className="w-4 h-4 text-gray-400 hidden sm:block" />
          <select 
            value={filterDept}
            onChange={e => setFilterDept(e.target.value)}
            className="w-full sm:w-56 px-3 py-1.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 font-bold transition-all cursor-pointer shadow-inner"
          >
            <option value="All">All Departments / Specializations</option>
            <option value="Cardiology">Cardiology Department</option>
            <option value="Orthopedics">Orthopedics Suite</option>
            <option value="Pediatrics">Pediatrics Unit</option>
          </select>
        </div>
        
        <div className="text-[10px] font-bold uppercase tracking-wide text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
          <RefreshCw className="w-3 h-3 text-blue-600 animate-spin-slow" />
          Auto-Sync Active: <span className="text-blue-600 font-extrabold">{filteredData.length} Live Tracks</span>
        </div>
      </div>

      {/* Live Data Grid Matrix Records System Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-5 py-4 text-left font-bold">Token ID</th>
                <th className="px-5 py-4 text-left font-bold">Patient Demographics</th>
                <th className="px-5 py-4 text-left font-bold">Targeted Practitioner</th>
                <th className="px-5 py-4 text-left font-bold">Elapsed Wait</th>
                <th className="px-5 py-4 text-left font-bold">Live Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs bg-white">
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.token} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-5 py-4 font-bold text-blue-600 tracking-wide">{row.token}</td>
                    <td className="px-5 py-4 font-bold text-gray-800">{row.name}</td>
                    <td className="px-5 py-4 font-semibold text-gray-600">
                      <div className="space-y-0.5">
                        <span className="block text-gray-800">{row.doc}</span>
                        <span className="block text-[10px] text-gray-400 font-medium">{row.dept}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-500 flex items-center gap-1.5 mt-2 border-none">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {row.wait}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border ${
                        row.state === 'In Consultation' 
                          ? 'bg-blue-50 text-blue-700 border-blue-200' 
                          : row.state === 'Called Room'
                          ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                          : 'bg-gray-50 text-gray-600 border-gray-200/80'
                      }`}>
                        {row.state}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-5 py-10 text-center text-gray-400 font-medium">
                    No active tokens recorded under the selected clinical parameters.
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

export default ViewLiveQueue;