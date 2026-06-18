import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const LabsSection = ({ labs, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredLabs = labs.filter(lab => {
    const matchesSearch = lab.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || lab.patientId.includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || lab.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search and Control Filters Header */}
      <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search patient or test description..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto justify-end">
          {['ALL', 'Urgent Review', 'In Lab Analysis'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Enterprise Scale Data Table Grid */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600 border-collapse">
            <thead className="bg-gray-50 border-b text-gray-700 font-semibold uppercase">
              <tr>
                <th className="p-3 pl-4">Patient Profile</th>
                <th className="p-3">Diagnostic Request</th>
                <th className="p-3">Ordered Timestamp</th>
                <th className="p-3">Status Scope</th>
                <th className="p-3 text-right pr-4">Pipeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLabs.map((lab) => (
                <tr 
                  key={lab.id} 
                  onClick={() => onViewDetails(lab.id)} // Entire row clickable for large target usability
                  className="hover:bg-slate-50/60 transition-colors cursor-pointer group"
                >
                  <td className="p-3 pl-4">
                    <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{lab.patientName}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{lab.patientId}</div>
                  </td>
                  <td className="p-3 font-medium text-slate-700">{lab.testType}</td>
                  <td className="p-3 text-gray-500">{lab.orderedDate}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-bold uppercase tracking-wide text-[10px] ${
                      lab.status === 'Urgent Review' ? 'bg-rose-50 text-rose-700 border border-rose-100 animate-pulse' : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {lab.status}
                    </span>
                  </td>
                  <td className="p-3 text-right pr-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents double click executions
                        onViewDetails(lab.id);
                      }}
                      className="p-1.5 text-gray-500 hover:text-white border rounded-md hover:bg-blue-600 transition-all shadow-sm"
                      title="Open Comprehensive Diagnostic Panel"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLabs.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400 italic">No lab entries found matches standard query scope.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Scaled Footer Pagination Engine */}
        <div className="bg-gray-50 border-t p-3 flex items-center justify-between text-xs text-gray-500 font-medium">
          <span>Showing 1 to {filteredLabs.length} of {filteredLabs.length} entries</span>
          <div className="flex gap-1">
            <button className="p-1 border rounded bg-white hover:bg-gray-50 text-gray-400 cursor-not-allowed"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1 border rounded bg-white hover:bg-gray-50 text-gray-400 cursor-not-allowed"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabsSection;