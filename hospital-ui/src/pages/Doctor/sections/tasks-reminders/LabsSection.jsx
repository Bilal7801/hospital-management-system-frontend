import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const LabsSection = ({ initialLabs, onViewDetails }) => {
  const [labs, setLabs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    // Process the data passed directly from the dashboard parent component
    const mappedLabs = initialLabs.map(item => ({
      id: item.id,
      patientName: item.patientName || 'Unknown Patient',
      patientId: item.patientId || 'N/A',
      testType: item.title || 'Diagnostic Review',
      orderedDate: item.dueDate ? new Date(item.dueDate).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }) : 'N/A',
      status: item.status || "Pending"
    }));
    setLabs(mappedLabs);
  }, [initialLabs]);

  const filteredLabs = labs.filter(lab => {
    const matchesSearch = 
      (lab.patientName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (lab.patientId || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || lab.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
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
          {['ALL', 'Pending', 'Urgent Review', 'In Lab Analysis'].map(status => (
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

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600 border-collapse">
            <thead className="bg-gray-50 border-b text-gray-700 font-semibold uppercase">
              <tr>
                <th className="p-3 pl-4">Patient Profile</th>
                <th className="p-3">Diagnostic Request</th>
                <th className="p-3">Ordered Timestamp</th>
                <th className="p-3">Status Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLabs.map((lab) => (
                <tr 
                  key={lab.id} 
                  onClick={() => onViewDetails(lab.id)}
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
                      lab.status.toLowerCase() === 'urgent review' ? 'bg-rose-50 text-rose-700 border border-rose-100 animate-pulse' : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {lab.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredLabs.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-400 italic">
                    No entries found matching filters.
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

export default LabsSection;