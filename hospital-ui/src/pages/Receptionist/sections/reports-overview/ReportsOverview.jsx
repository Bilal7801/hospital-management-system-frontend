import React, { useState } from 'react';
import { BarChart3, ClipboardList, Users2, Banknote, UserX } from 'lucide-react';
import AppointmentsReport from './AppointmentsReport';
import QueueReport from './QueueReport';
import CollectionReport from './CollectionReport';
import CancelledNoShowReport from './CancelledNoShowReport';

const ReportsOverview = () => {
  const [activeTab, setActiveTab] = useState('appointments-rpt');

  // Grounded components mapped directly from the target system chart blocks
  const metricsSegments = [
    { id: 'appointments-rpt', label: "1. Today's Appointments", icon: ClipboardList },
    { id: 'queue-rpt', label: '2. Queue Analytics', icon: Users2 },
    { id: 'collection-rpt', label: '3. Collection Report', icon: Banknote },
    { id: 'noshow-rpt', label: '4. Cancelled / No-Shows', icon: UserX },
  ];

  return (
    <div className="space-y-4">
      {/* Royal Blue Institutional Header banner */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-100" />
            Reports & Operational Overview
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Analyze daily desk operations, monitor raw payment volumes, and review clinic utilization curves
          </p>
        </div>
      </div>

      {/* Segmented Horizontal Navigation Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 p-2 flex flex-wrap gap-2 shadow-sm">
        {metricsSegments.map((tab) => {
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

      {/* Primary Context Dashboard Router Frame */}
      <div className="transition-all duration-200">
        {activeTab === 'appointments-rpt' && <AppointmentsReport />}
        {activeTab === 'queue-rpt' && <QueueReport />}
        {activeTab === 'collection-rpt' && <CollectionReport />}
        {activeTab === 'noshow-rpt' && <CancelledNoShowReport />}
      </div>
    </div>
  );
};

export default ReportsOverview;