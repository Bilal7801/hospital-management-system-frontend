import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  User,
  DollarSign,
  Activity,
  Building2,
  Filter,
  Download,
} from 'lucide-react';
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
    const reportName = reports.find(r => r.key === activeReport)?.label || 'Report';
    const timestamp = new Date().toLocaleDateString();
    const data = `${reportName}\nGenerated: ${timestamp}\nTime Filter: ${timeFilter}\nDepartment: ${departmentFilter}`;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', `${reportName.replace(/\s+/g, '_')}_${Date.now()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Reports & Analytics
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Analyze hospital performance and operational insights
        </p>
      </div>

      {/* Report Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">

        {reports.map((r) => {
          const Icon = r.icon;

          return (
            <button
              key={r.key}
              onClick={() => setActiveReport(r.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
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

      {/* Filters Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center justify-between">

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Filter className="w-4 h-4" />
          Apply Filters
        </div>

        <div className="flex flex-wrap gap-2">

          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="p-2 border border-gray-200 rounded-lg text-sm cursor-pointer focus:outline-none focus:border-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>

          <select 
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="p-2 border border-gray-200 rounded-lg text-sm cursor-pointer focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Departments</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="pediatrics">Pediatrics</option>
          </select>

          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm cursor-pointer hover:bg-blue-700 transition-all font-semibold"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>

        </div>

      </div>

      {/* Report Content */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

        {activeReport === 'appointments' && (
          <AppointmentReport />
        )}

        {activeReport === 'doctors' && (
          <DoctorPerformance />
        )}

        {activeReport === 'revenue' && (
          <RevenueReport />
        )}

        {activeReport === 'patients' && (
          <PatientStats />
        )}

        {activeReport === 'departments' && (
          <DepartmentReport />
        )}

      </div>

    </div>
  );
};

export default ReportsAnalytics;