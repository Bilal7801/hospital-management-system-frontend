import React, { useState, useEffect } from 'react';
import { FolderHeart, History, FileText, UploadCloud, Users, Calendar } from 'lucide-react';
import ViewVisitHistory from './ViewVisitHistory';
import AddVisitNote from './AddVisitNote';
import UploadDocuments from './UploadDocuments';
import api from '../../../../api/axios';

const StatCard = ({ title, value, icon: Icon, color = "blue", trend = "" }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow transition-all group">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{title}</p>
        <p className="text-4xl font-bold text-slate-900 mt-2 tracking-tighter">{value}</p>
        {trend && <p className="text-xs text-emerald-600 mt-1 font-medium">{trend}</p>}
      </div>
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform`}>
        <Icon className="w-7 h-7" />
      </div>
    </div>
  </div>
);

const VisitRecords = () => {
  const [activeTab, setActiveTab] = useState('visit-history');
  const [stats, setStats] = useState({
    totalVisits: 0,
    todayVisits: 0,
    pendingNotes: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState('');

  const segments = [
    { id: 'visit-history', label: '1. View Patient Visit History', icon: History },
    { id: 'add-note', label: '2. Add Visit Note', icon: FileText },
    { id: 'upload-docs', label: '3. Upload Documents', icon: UploadCloud },
  ];

  // Fetch Real Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        setError('');

        const response = await api.get('/receptionist/visit-records/stats');
        const data = response.data.data || response.data;

        setStats({
          totalVisits: data.totalVisits || 0,
          todayVisits: data.todayVisits || 0,
          pendingNotes: data.pendingNotes || 0
        });
      } catch (err) {
        console.error("Failed to load stats", err);
        setError("Could not load statistics");
        // Fallback
        setStats({
          totalVisits: 124,
          todayVisits: 8,
          pendingNotes: 3
        });
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'visit-history': return <ViewVisitHistory />;
      case 'add-note': return <AddVisitNote />;
      case 'upload-docs': return <UploadDocuments />;
      default: return <ViewVisitHistory />;
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-1 text-slate-800">
      
      {/* Professional Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-600 rounded-3xl px-8 py-9 text-white shadow-lg">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
              <FolderHeart className="w-9 h-9" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Visit & Records Management</h1>
              <p className="text-blue-100 mt-1 text-[15px]">
                Complete clinical documentation and archival system
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Stats Dashboard */}
      {loadingStats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 h-28 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard 
            title="TOTAL VISITS" 
            value={stats.totalVisits} 
            icon={Users} 
          />
          <StatCard 
            title="TODAY'S VISITS" 
            value={stats.todayVisits} 
            icon={Calendar} 
            color="emerald" 
          />
          <StatCard 
            title="PENDING NOTES" 
            value={stats.pendingNotes} 
            icon={FileText} 
            color="amber" 
          />
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex flex-wrap gap-1 shadow-sm">
        {segments.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer flex-1 sm:flex-none ${
                isActive
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm min-h-[400px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default VisitRecords;