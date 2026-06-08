import React, { useState, useEffect } from 'react';
import { MessageSquare, BellRing, StickyNote, Mail, Loader2 } from 'lucide-react';
import SendReminders from './SendReminders';
import AlertSystem from './AlertSystem';
import InternalRemarks from './InternalRemarks';
import api from '../../../../api/axios';

const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState('send-reminders');
  const [stats, setStats] = useState({
    totalNotifications: 0,
    pendingNotifications: 0,
    totalRemarks: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Tab Configuration
  const tabs = [
    { id: 'send-reminders', label: '1. Send SMS / Email Reminders', icon: Mail },
    { id: 'inform-alerts', label: '2. Inform Doctor / Patient', icon: BellRing },
    { id: 'internal-remarks', label: '3. Internal Notes & Remarks', icon: StickyNote },
  ];

  // Fetch Communication Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const response = await api.get('/receptionist/communication/stats');
        const data = response.data.data || response.data;
        
        setStats({
          totalNotifications: data.totalNotifications || 0,
          pendingNotifications: data.pendingNotifications || 0,
          totalRemarks: data.totalRemarks || 0
        });
      } catch (err) {
        console.error("Failed to load communication stats", err);
        // Fallback stats
        setStats({
          totalNotifications: 0,
          pendingNotifications: 0,
          totalRemarks: 0
        });
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-4">
      {/* Brand Royal Blue Header */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-100" />
            Communication Hub
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Dispatch automated notification runs, trigger real-time panel broadcast flags, and manage sticky internal desk workflows
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Notifications</div>
          <div className="text-3xl font-black text-gray-900 mt-1">
            {loadingStats ? "—" : stats.totalNotifications}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Notifications</div>
          <div className="text-3xl font-black text-amber-600 mt-1">
            {loadingStats ? "—" : stats.pendingNotifications}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Internal Remarks</div>
          <div className="text-3xl font-black text-blue-600 mt-1">
            {loadingStats ? "—" : stats.totalRemarks}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-2 flex flex-wrap gap-2 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Content */}
      <div className="transition-all duration-200">
        {activeTab === 'send-reminders' && <SendReminders />}
        {activeTab === 'inform-alerts' && <AlertSystem />}
        {activeTab === 'internal-remarks' && <InternalRemarks />}
      </div>
    </div>
  );
};

export default CommunicationHub;