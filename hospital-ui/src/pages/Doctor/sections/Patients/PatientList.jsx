import React from 'react';
import { Search, User, ArrowRight } from 'lucide-react';

const PatientList = ({ patients, searchQuery, setSearchQuery, onSelectPatient }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Realtime Action Search Bar Area */}
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Patient Name, ID, or Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-white"
          />
        </div>
      </div>

      {/* Grid Content Matrix Container */}
      {patients.length === 0 ? (
        <div className="p-16 text-center text-gray-500">
          <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="font-medium text-gray-600">No patients located</p>
          <p className="text-xs text-gray-400 mt-1">No matching clinical entries found for your query parameters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-[11px] uppercase tracking-wider bg-gray-50/30 border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">ID Code</th>
                <th className="px-6 py-4 font-semibold">Demographics</th>
                <th className="px-6 py-4 font-semibold">Contact Metrics</th>
                <th className="px-6 py-4 font-semibold">Blood Matrix</th>
                <th className="px-6 py-4 font-semibold text-right">EHR Entry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {patients.map((pt) => (
                <tr key={pt.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-blue-600">
                    {pt.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 text-sm">{pt.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{pt.age} yrs • {pt.gender}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-800">{pt.phone}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{pt.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-gray-100 border text-gray-700 text-xs font-bold">
                      {pt.bloodGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onSelectPatient(pt)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-xs font-semibold text-gray-600 hover:text-blue-700 rounded-lg transition-all shadow-xs"
                    >
                      <span>View Charts</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientList;