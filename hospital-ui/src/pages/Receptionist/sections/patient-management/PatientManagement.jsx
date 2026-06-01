import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Edit2, History, Users } from 'lucide-react';
import SearchPatient from './SearchPatient';
import RegisterPatient from './RegisterPatient';
import PatientHistory from './PatientHistory';
import api from '../../../../api/axios';

const StatCard = ({ title, value, trend, icon: Icon, iconColor, valueSize = "text-lg" }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center justify-between mb-1">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{title}</p>
      <Icon className={`w-4 h-4 ${iconColor}`} />
    </div>
    <p className={`${valueSize} font-bold text-gray-900 tracking-tight`}>{value}</p>
    <p className="text-[11px] text-gray-400 mt-0.5">{trend}</p>
  </div>
);

const PatientManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState('search');
  const [stats, setStats] = useState({
    totalPatients: 0,
    activePatients: 0,
    pendingUpdates: 0,
    lastUpdatedPatient: "N/A"
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Fetch dynamic stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/receptionist/patient/stats');
        setStats({
          totalPatients: response.data.totalPatients || 0,
          activePatients: response.data.activePatients || 0,
          pendingUpdates: response.data.pendingUpdates || 0,
          lastUpdatedPatient: response.data.lastUpdatedPatient || "N/A"
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        // Keep default values on error
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const tabs = [
    { id: 'search', label: 'Search Patient', icon: Search },
    { id: 'register', label: 'Register', icon: UserPlus },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Patient Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage patient records, registration, and medical history</p>
      </div>

      {/* Dynamic Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients"
          value={loadingStats ? "..." : stats.totalPatients.toLocaleString()}
          trend="+12 this month"
          icon={Users}
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active Today"
          value={loadingStats ? "..." : stats.activePatients}
          trend="Currently checked in"
          icon={Search}
          iconColor="text-green-600"
        />
        <StatCard
          title="Pending Updates"
          value={loadingStats ? "..." : stats.pendingUpdates}
          trend="Need review"
          icon={Edit2}
          iconColor="text-orange-600"
        />
        <StatCard
          title="Last Updated"
          value={loadingStats ? "..." : stats.lastUpdatedPatient}
          trend="Recently updated"
          icon={History}
          iconColor="text-purple-600"
          valueSize="text-base"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer
                  ${activeSubTab === tab.id
                    ? 'border-blue-600 text-blue-700 bg-blue-50/40'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected Tab */}
      <div className="pt-1">
        {activeSubTab === 'search' && <SearchPatient />}
        {activeSubTab === 'register' && <RegisterPatient />}
        {activeSubTab === 'history' && <PatientHistory />}
      </div>
    </div>
  );
};

export default PatientManagement;