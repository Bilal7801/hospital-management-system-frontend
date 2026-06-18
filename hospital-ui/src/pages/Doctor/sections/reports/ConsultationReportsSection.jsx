import React, { useState } from 'react';
import { CalendarDays, CheckCircle, XCircle, Search, FileDown } from 'lucide-react';

const ConsultationReportsSection = () => {
  const [filterView, setFilterView] = useState('ALL');

  const mockConsultations = [
    { id: 'CON-8841', doctor: 'Dr. Bilal Ahmed', patient: 'Muhammad Raza', type: 'Clinical Consultation', status: 'Completed', date: '2026-06-18' },
    { id: 'CON-8842', doctor: 'Dr. Bilal Ahmed', patient: 'Sana Khan', type: 'Emergency Review', status: 'Completed', date: '2026-06-18' },
    { id: 'CON-8843', doctor: 'Dr. Bilal Ahmed', patient: 'Arjun Mehta', type: 'Follow-up Evaluation', status: 'No Show', date: '2026-06-17' }
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-1.5 w-full sm:w-auto">
          {['ALL', 'COMPLETED', 'NO SHOW'].map(status => (
            <button
              key={status}
              onClick={() => setFilterView(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterView === status ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-bold text-gray-700 shadow-sm transition-all bg-white">
          <FileDown className="w-4 h-4 text-gray-400" /> <span>Export CSV Matrix</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-gray-600 border-collapse">
          <thead className="bg-gray-50 border-b text-gray-700 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-3 pl-4">Encounter Index</th>
              <th className="p-3">Patient Profile</th>
              <th className="p-3">Classification Type</th>
              <th className="p-3">Execution Date</th>
              <th className="p-3 text-right pr-4">Pipeline Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {mockConsultations
              .filter(c => filterView === 'ALL' || c.status.toUpperCase() === filterView)
              .map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/40">
                  <td className="p-3 pl-4 font-mono font-bold text-indigo-600">{item.id}</td>
                  <td className="p-3 font-bold text-gray-900">{item.patient}</td>
                  <td className="p-3 text-slate-600 font-medium">{item.type}</td>
                  <td className="p-3 text-gray-400 font-mono">{item.date}</td>
                  <td className="p-3 text-right pr-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[10px] uppercase border ${
                      item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                    }`}>
                      {item.status === 'Completed' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {item.status}
                    </span>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultationReportsSection;