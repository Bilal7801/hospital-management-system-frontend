import React, { useState } from 'react';
import { FlaskConical, AlertTriangle, CheckCircle2, Search } from 'lucide-react';

const LabTestReportsSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const mockLabs = [
    { code: 'LAB-77A', test: 'HbA1c Blood Panel', volume: 480, alerts: 32, status: 'Active Evaluation' },
    { code: 'LAB-77B', test: 'Lipid Profile Screen', volume: 320, alerts: 14, status: 'Active Evaluation' },
    { code: 'LAB-77C', test: 'Complete Blood Count (CBC)', volume: 1120, alerts: 8, status: 'Optimized Optimization' }
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="bg-white p-3 border border-gray-200 rounded-xl shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search diagnostics database indexes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
          />
        </div>
        <span className="text-[11px] font-mono text-gray-400 font-medium">Active Diagnostic Panels Tracked: {mockLabs.length}</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-gray-600 border-collapse">
          <thead className="bg-slate-50 border-b text-gray-500 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-3 pl-4">System Assay Ref</th>
              <th className="p-3">Diagnostic Diagnostic Test</th>
              <th className="p-3">Throughput Vol</th>
              <th className="p-3">Critical Flags Raised</th>
              <th className="p-3 text-right pr-4">System Integrity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {mockLabs.map((lab) => (
              <tr key={lab.code} className="hover:bg-slate-50/40">
                <td className="p-3 pl-4 font-mono font-semibold text-gray-500">{lab.code}</td>
                <td className="p-3 font-bold text-gray-900 flex items-center gap-2">
                  <FlaskConical className="w-3.5 h-3.5 text-blue-500" /> {lab.test}
                </td>
                <td className="p-3 text-gray-700 font-bold">{lab.volume} procedures</td>
                <td className="p-3">
                  <span className={`inline-flex items-center gap-1 font-mono font-bold ${lab.alerts > 15 ? 'text-rose-600' : 'text-amber-600'}`}>
                    <AlertTriangle className="w-3 h-3" /> {lab.alerts} Criticals
                  </span>
                </td>
                <td className="p-3 text-right pr-4 text-emerald-600 font-bold uppercase tracking-wider text-[10px]">
                  {lab.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabTestReportsSection;