import React, { useState } from 'react';
import { Users, UserPlus, TrendingUp, Search, SlidersHorizontal } from 'lucide-react';

const PatientStatsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageGroup, setAgeGroup] = useState('ALL');

  const mockDemographics = [
    { id: 'REG-201', group: 'Pediatric (0-14)', activeCount: 412, growth: '+4.2%', priority: 'Standard' },
    { id: 'REG-202', group: 'Adult (15-64)', activeCount: 1845, growth: '+12.8%', priority: 'High Throughput' },
    { id: 'REG-203', group: 'Geriatric (65+)', activeCount: 923, growth: '+8.1%', priority: 'Chronic Tracking' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* High-Density Statistical Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Active Registry</span>
            <strong className="text-xl font-bold text-gray-900 block">3,180 Patients</strong>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-5 h-5" /></div>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">New Inflow (Current Month)</span>
            <strong className="text-xl font-bold text-gray-900 block">+142 Registrations</strong>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><UserPlus className="w-5 h-5" /></div>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Retention Stability Metric</span>
            <strong className="text-xl font-bold text-gray-900 block">94.6% Core Rate</strong>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><TrendingUp className="w-5 h-5" /></div>
        </div>
      </div>

      {/* Structured Matrix Filtering Grid */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50/70 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search data parameters..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" /> Filter Framework:
            <select 
              value={ageGroup} 
              onChange={(e) => setAgeGroup(e.target.value)}
              className="border border-gray-200 rounded-lg p-1 text-xs focus:outline-none bg-white font-bold text-blue-600"
            >
              <option value="ALL">All Age Subsets</option>
              <option value="STANDARD">Standard Focus</option>
              <option value="CHRONIC">Chronic Focus</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left text-xs text-gray-600 border-collapse">
          <thead className="bg-slate-50 border-b text-gray-500 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-3 pl-4">Cohort Metric Key</th>
              <th className="p-3">Demographic Target Group</th>
              <th className="p-3">Active Population Count</th>
              <th className="p-3">Growth Shift</th>
              <th className="p-3 text-right pr-4">Operational Layer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {mockDemographics.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/40">
                <td className="p-3 pl-4 font-mono font-bold text-gray-400">{row.id}</td>
                <td className="p-3 font-bold text-gray-900">{row.group}</td>
                <td className="p-3 text-slate-700 font-semibold">{row.activeCount.toLocaleString()} patients</td>
                <td className="p-3 text-emerald-600 font-bold">{row.growth}</td>
                <td className="p-3 text-right pr-4">
                  <span className="inline-block px-2 py-0.5 font-bold text-[9px] uppercase border bg-gray-50 border-gray-100 rounded text-gray-600">
                    {row.priority}
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

export default PatientStatsSection;