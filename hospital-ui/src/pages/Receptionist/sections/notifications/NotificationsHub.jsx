import React, { useState, useEffect } from 'react';
import { Bell, CalendarClock, Stethoscope, CreditCard, AlertTriangle, Loader2, RefreshCw, Plus } from 'lucide-react';
import AppointmentAlerts from './AppointmentAlerts';
import ScheduleAlerts from './ScheduleAlerts';
import PaymentAlerts from './PaymentAlerts';
import SystemAlerts from './SystemAlerts';
import api from '../../../../api/axios';

const NotificationsHub = () => {
  const [activeTab, setActiveTab] = useState('appointment-alerts');
  const [stats, setStats] = useState({ totalAlerts: 0, unreadAlerts: 0, urgentAlerts: 0 });
  const [loadingStats, setLoadingStats] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const tabs = [
    { id: 'appointment-alerts', label: '1. Appointment Reminders', icon: CalendarClock },
    { id: 'schedule-alerts', label: '2. Doctor Schedule Changes', icon: Stethoscope },
    { id: 'payment-alerts', label: '3. Payment Alerts', icon: CreditCard },
    { id: 'system-alerts', label: '4. System Notifications', icon: AlertTriangle },
  ];

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const response = await api.get('/receptionist/notifications/stats');
      const data = response.data.data || response.data;
      setStats({
        totalAlerts: data.totalAlerts || 0,
        unreadAlerts: data.unreadAlerts || 0,
        urgentAlerts: data.urgentAlerts || 0
      });
    } catch (err) {
      console.error("Failed to load stats", err);
    } finally {
      setLoadingStats(false);
    }
  };

  // Auto Refresh every 8 seconds
  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 8000);
    return () => clearInterval(interval);
  }, []);

  // Generate New Alerts from System Data
  const handleGenerateAlerts = async () => {
    setIsGenerating(true);
    try {
      const response = await api.post('/receptionist/notifications/generate');
      await fetchStats();
      alert("✅ Alerts generated successfully from system data!");
    } catch (err) {
      console.error(err);
      alert("Failed to generate alerts");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-100" />
            Notifications & Alerts
          </h1>
          <p className="text-blue-100 text-sm mt-1">Real-time system & patient alerts</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGenerateAlerts}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-70"
          >
            <Plus className="w-4 h-4" />
            {isGenerating ? "Generating..." : "Generate Alerts"}
          </button>

          <button
            onClick={fetchStats}
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-70"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Alerts</div>
          <div className="text-3xl font-black text-gray-900 mt-1">
            {loadingStats ? "—" : stats.totalAlerts}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Unread</div>
          <div className="text-3xl font-black text-amber-600 mt-1">
            {loadingStats ? "—" : stats.unreadAlerts}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Urgent</div>
          <div className="text-3xl font-black text-red-600 mt-1">
            {loadingStats ? "—" : stats.urgentAlerts}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 p-2 flex flex-wrap gap-2 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
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
        {activeTab === 'appointment-alerts' && <AppointmentAlerts />}
        {activeTab === 'schedule-alerts' && <ScheduleAlerts />}
        {activeTab === 'payment-alerts' && <PaymentAlerts />}
        {activeTab === 'system-alerts' && <SystemAlerts />}
      </div>
    </div>
  );
};

export default NotificationsHub;