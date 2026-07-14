import React, { useState, useEffect } from 'react';
import { Users, CalendarDays, Pill, FlaskConical, BarChart3, Loader2 } from 'lucide-react';
import api from '../../../../api/axios';

import PatientStatsSection from './PatientStatsSection';
import ConsultationReportsSection from './ConsultationReportsSection';
import PrescriptionReportsSection from './PrescriptionReportsSection';
import LabTestReportsSection from './LabTestReportsSection';
import PerformanceSummarySection from './PerformanceSummarySection';

const ReportsDashboard = () => {
  const [activeReportTab, setActiveReportTab] = useState('patient-stats');
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Fetch overall stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const res = await api.get('/doctor/reports/stats');
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 md:p-8 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Analytical Reporting Registry</h1>
        <p className="text-gray-500 text-xs mt-0.5">High-performance systemic data grids evaluating clinic operations, patient flow distributions, and performance tracking matrix frameworks.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {loadingStats ? (
          <div className="col-span-4 flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          </div>
        ) : stats && (
          <>
            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
              <p className="text-xs text-gray-500 font-bold">TOTAL PATIENTS</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalPatients}</p>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
              <p className="text-xs text-gray-500 font-bold">TODAY'S APPOINTMENTS</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.todayAppointments}</p>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
              <p className="text-xs text-gray-500 font-bold">COMPLETED TODAY</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.completedToday}</p>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
              <p className="text-xs text-gray-500 font-bold">COMPLETION RATE</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.completionRate}%</p>
            </div>
          </>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 border border-gray-200 bg-white rounded-xl p-1.5 shadow-sm overflow-x-auto">
        <button
          onClick={() => setActiveReportTab('patient-stats')}
          className={`inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
            activeReportTab === 'patient-stats' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Users className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Patient Statistics</span>
        </button>
        <button
          onClick={() => setActiveReportTab('consultations')}
          className={`inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
            activeReportTab === 'consultations' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <CalendarDays className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Consultation Logs</span>
        </button>
        <button
          onClick={() => setActiveReportTab('prescriptions')}
          className={`inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
            activeReportTab === 'prescriptions' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Pill className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Prescription Index</span>
        </button>
        <button
          onClick={() => setActiveReportTab('labs')}
          className={`inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
            activeReportTab === 'labs' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <FlaskConical className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Lab Diagnostics</span>
        </button>
        <button
          onClick={() => setActiveReportTab('performance')}
          className={`inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all col-span-2 md:col-span-1 ${
            activeReportTab === 'performance' ? 'bg-slate-900 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <BarChart3 className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Performance Summary</span>
        </button>
      </div>

      {/* Dynamic Content */}
      <div className="mt-4">
        {activeReportTab === 'patient-stats' && <PatientStatsSection />}
        {activeReportTab === 'consultations' && <ConsultationReportsSection />}
        {activeReportTab === 'prescriptions' && <PrescriptionReportsSection />}
        {activeReportTab === 'labs' && <LabTestReportsSection />}
        {activeReportTab === 'performance' && <PerformanceSummarySection />}
      </div>
    </div>
  );
};

export default ReportsDashboard;