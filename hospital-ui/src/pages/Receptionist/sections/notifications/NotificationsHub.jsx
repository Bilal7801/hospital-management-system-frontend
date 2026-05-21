import React, { useState } from 'react';
import { Bell, CalendarClock, Stethoscope, CreditCard, AlertTriangle } from 'lucide-react';
import AppointmentAlerts from './AppointmentAlerts';
import ScheduleAlerts from './ScheduleAlerts';
import PaymentAlerts from './PaymentAlerts';
import SystemAlerts from './SystemAlerts';

const NotificationsHub = () => {
  const [activeTab, setActiveTab] = useState('appointment-alerts');

  // Aligning with the 11. Notifications & Alerts node in the system blueprint
  const tabs = [
    { id: 'appointment-alerts', label: '1. Appointment Reminders', icon: CalendarClock },
    { id: 'schedule-alerts', label: '2. Doctor Schedule Changes', icon: Stethoscope },
    { id: 'payment-alerts', label: '3. Payment Alerts', icon: CreditCard },
    { id: 'system-alerts', label: '4. System Notifications', icon: AlertTriangle },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-100" />
            Notifications & Alerts
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Stay updated with real-time alerts regarding patient schedules, payment activities, and critical system updates.
          </p>
        </div>
      </div>

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