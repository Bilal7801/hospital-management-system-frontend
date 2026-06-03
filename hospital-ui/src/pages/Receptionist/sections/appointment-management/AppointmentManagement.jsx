import React, { useState, useEffect } from 'react';
import { CalendarPlus, Search, CalendarDays, CalendarX, UserCheck, Calendar, Users, Clock, XCircle } from 'lucide-react';
import BookAppointment from './BookAppointment';
import SearchAppointments from './SearchAppointments';
import RescheduleAppointment from './RescheduleAppointment';
import CancelAppointment from './CancelAppointment';
import WalkInAppointment from './WalkInAppointment';
import api from '../../../../api/axios';

const StatCard = ({ title, value, trend, icon: Icon, iconColor }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center justify-between mb-2">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{title}</p>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
    <p className="text-xs text-gray-500 mt-1">{trend}</p>
  </div>
);

const AppointmentManagement = () => {
  const [subTab, setSubTab] = useState('book');

  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    upcomingAppointments: 0,
    cancelledAppointments: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Fetch Appointment Statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/receptionist/appointment/stats');
        setStats({
          totalAppointments: response.data.totalAppointments || 0,
          todayAppointments: response.data.todayAppointments || 0,
          upcomingAppointments: response.data.upcomingAppointments || 0,
          cancelledAppointments: response.data.cancelledAppointments || 0,
        });
      } catch (error) {
        console.error("Failed to fetch appointment stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const tabs = [
    { id: 'book', label: 'Book Appointment', icon: CalendarPlus },
    { id: 'search', label: 'Search / View', icon: Search },
    { id: 'reschedule', label: 'Reschedule', icon: CalendarDays },
    { id: 'cancel', label: 'Cancel', icon: CalendarX },
    { id: 'walk-in', label: 'Walk-in', icon: UserCheck },
  ];

  const renderSubContent = () => {
    switch (subTab) {
      case 'book': return <BookAppointment />;
      case 'search': return <SearchAppointments />;
      case 'reschedule': return <RescheduleAppointment />;
      case 'cancel': return <CancelAppointment />;
      case 'walk-in': return <WalkInAppointment />;
      default: return <BookAppointment />;
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Appointment Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage all patient appointments and schedules</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Appointments"
          value={loadingStats ? "..." : stats.totalAppointments.toLocaleString()}
          trend="All time"
          icon={Calendar}
          iconColor="text-blue-600"
        />
        <StatCard
          title="Today's Appointments"
          value={loadingStats ? "..." : stats.todayAppointments}
          trend="Scheduled today"
          icon={Clock}
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Upcoming"
          value={loadingStats ? "..." : stats.upcomingAppointments}
          trend="Confirmed & Pending"
          icon={CalendarDays}
          iconColor="text-amber-600"
        />
        <StatCard
          title="Cancelled"
          value={loadingStats ? "..." : stats.cancelledAppointments}
          trend="This month"
          icon={XCircle}
          iconColor="text-red-600"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer
                  ${isSelected
                    ? 'border-blue-600 text-blue-700 bg-blue-50/40'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected Tab Content */}
      <div className="transition-all duration-150">
        {renderSubContent()}
      </div>
    </div>
  );
};

export default AppointmentManagement;