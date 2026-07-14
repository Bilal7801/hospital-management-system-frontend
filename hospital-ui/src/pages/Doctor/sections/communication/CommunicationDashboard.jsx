import React, { useState, useEffect } from 'react';
import { MessageSquare, UserSquare2, ClipboardList } from 'lucide-react';
import api from '../../../../api/axios';

import PatientMessagingSection from './PatientMessagingSection';
import ReceptionistNotesSection from './ReceptionistNotesSection';
import ConsultationSummarySection from './ConsultationSummarySection';

const CommunicationDashboard = () => {
  const [activeTab, setActiveTab] = useState('messaging');
  const [stats, setStats] = useState({
    totalNotifications: 0,
    pendingNotifications: 0,
    totalRemarks: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Fetch Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const res = await api.get('/receptionist/communication/stats');
        const data = res.data.data || res.data;

        setStats({
          totalNotifications: data.totalNotifications || 0,
          pendingNotifications: data.pendingNotifications || 0,
          totalRemarks: data.totalRemarks || 0
        });
      } catch (err) {
        console.error("Failed to load communication stats", err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  // Set exactly 3 active channels
  const tabs = [
    { id: 'messaging', label: 'Patient Messaging', icon: MessageSquare },
    { id: 'receptionist', label: 'Receptionist Notes', icon: UserSquare2 },
    { id: 'summary', label: 'Consultation Summary', icon: ClipboardList },
  ];

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 md:p-8 space-y-6">
      {/* Module Title Header Context */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Unified Communications Engine</h1>
          <p className="text-gray-500 text-xs mt-0.5">Central gateway routing direct patient notifications, front-desk logs, and private clinical narratives.</p>
        </div>

        {/* Stats Pills */}
        {!loadingStats && (
          <div className="flex gap-3 text-xs">
            <div className="bg-white px-3 py-1 rounded-lg border border-gray-200 flex items-center gap-1.5">
              <span className="font-bold text-blue-600">{stats.totalNotifications}</span>
              <span className="text-gray-500">Notifications</span>
            </div>
            <div className="bg-white px-3 py-1 rounded-lg border border-gray-200 flex items-center gap-1.5">
              <span className="font-bold text-amber-600">{stats.pendingNotifications}</span>
              <span className="text-gray-500">Pending</span>
            </div>
          </div>
        )}
      </div>

      {/* Main 3-Section Grid Switcher Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border border-gray-200 bg-white rounded-xl p-1.5 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" /> 
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Screen Segment Display Switcher Router Area */}
      <div className="bg-transparent mt-4">
        {activeTab === 'messaging' && <PatientMessagingSection />}
        {activeTab === 'receptionist' && <ReceptionistNotesSection />}
        {activeTab === 'summary' && <ConsultationSummarySection />}
      </div>
    </div>
  );
};

export default CommunicationDashboard;