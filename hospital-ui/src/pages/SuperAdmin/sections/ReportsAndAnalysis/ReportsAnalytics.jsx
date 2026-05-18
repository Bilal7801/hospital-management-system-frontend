import React, { useState } from 'react';
import { FileText, Calendar, User, DollarSign, Activity, Building2, Filter, Download } from 'lucide-react';

import AppointmentReport from './components/AppointmentReport';
import DoctorPerformance from './components/DoctorPerformance';
import RevenueReport from './components/RevenueReport';
import PatientStats from './components/PatientStat';
import DepartmentReport from './components/DepartmentReport';

const ReportsAnalytics = () => {
  const [activeReport, setActiveReport] = useState('appointments');
  const [timeFilter, setTimeFilter] = useState('month');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const reports = [
    { key: 'appointments', label: 'Appointment Reports', icon: Calendar },
    { key: 'doctors', label: 'Doctor Performance', icon: User },
    { key: 'revenue', label: 'Revenue Reports', icon: DollarSign },
    { key: 'patients', label: 'Patient Statistics', icon: Activity },
    { key: 'departments', label: 'Department Reports', icon: Building2 },
  ];

  const handleExport = () => {
    alert("Export feature will be enhanced with real data (PDF/Excel) soon!");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Reports & Analytics</h2>
        <p className="text-xs text-gray-400 mt-1">Real-time hospital performance insights</p>
      </div>

      {/* Report Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <button
              key={r.key}
              onClick={() => setActiveReport(r.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                activeReport === r.key
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {r.label}
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-3 justify-between">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Filter className="w-4 h-4" />
          Filters
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 font-semibold cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Dynamic Report Content */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        {activeReport === 'appointments' && <AppointmentReport period={timeFilter} />}
        {activeReport === 'doctors' && <DoctorPerformance />}
        {activeReport === 'revenue' && <RevenueReport period={timeFilter} />}
        {activeReport === 'patients' && <PatientStats />}
        {activeReport === 'departments' && <DepartmentReport />}
      </div>
    </div>
  );
};

export default ReportsAnalytics;