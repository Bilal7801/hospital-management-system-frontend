import React, { useState } from 'react';
import { Search, Calendar, ArrowUpRight } from 'lucide-react';
import CaseDetailsView from './CaseDetailsView';

const ViewVisitHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState(null);

  const mockTimeline = [
    { id: "ENC-2026-904", date: "12-May-2026", type: "Follow-up", provider: "Dr. Aman Gupta", dept: "Cardiology", status: "Completed" },
    { id: "ENC-2026-781", date: "24-Jan-2026", type: "Diagnostics", provider: "Dr. Sarah Johns", dept: "Orthopedics", status: "Completed" },
    { id: "ENC-2025-412", date: "15-Oct-2025", type: "Initial Triage", provider: "Dr. Rachel Zane", dept: "General", status: "Archived" },
  ];

  // Conditional intercept block to mount the view detail overlay pane seamlessly
  if (selectedCaseId) {
    return <CaseDetailsView caseId={selectedCaseId} onBack={() => setSelectedCaseId(null)} />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          Patient Historical Encounter Log Engine
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Filter through previous multi-department visits to assess continuity lines</p>
      </div>

      {/* Target Search Block */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Enter Patient Registration ID or Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 transition-all font-semibold shadow-inner"
        />
      </div>

      {/* Core Matrix Data Grid */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-5 py-3.5 text-left">Encounter Date</th>
              <th className="px-5 py-3.5 text-left">Visit Classification</th>
              <th className="px-5 py-3.5 text-left">Assigned Attending</th>
              <th className="px-5 py-3.5 text-left">Clinical Unit</th>
              <th className="px-5 py-3.5 text-center">Status</th>
              <th className="px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {mockTimeline.map((visit) => (
              <tr key={visit.id} className="hover:bg-blue-50/10 transition-colors group">
                <td className="px-5 py-4 font-bold text-gray-800 font-mono">{visit.date}</td>
                <td className="px-5 py-4">
                  <span className="bg-gray-100 text-gray-700 font-bold px-2 py-0.5 rounded border border-gray-200 text-[10px]">
                    {visit.type}
                  </span>
                </td>
                <td className="px-5 py-4 font-semibold text-gray-700">{visit.provider}</td>
                <td className="px-5 py-4 text-blue-600 font-bold">{visit.dept}</td>
                <td className="px-5 py-4 text-center">
                  <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${
                    visit.status === 'Completed' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                      : 'bg-gray-50 text-gray-500 border-gray-200'
                  }`}>
                    {visit.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button 
                    onClick={() => setSelectedCaseId(visit.id)}
                    className="text-gray-400 group-hover:text-blue-600 flex items-center justify-end gap-1 font-bold text-[11px] transition-colors cursor-pointer ml-auto"
                  >
                    View Case <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewVisitHistory;