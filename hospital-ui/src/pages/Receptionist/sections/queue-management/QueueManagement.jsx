import React, { useState } from 'react';
import { UserCheck, Ticket, Volume2, Tv, Activity } from 'lucide-react';
import CheckInPatient from './CheckInPatient';
import GenerateToken from './GenerateToken';
import CallPatient from './CallPatient';
import ViewLiveQueue from './ViewLiveQueue';
import ConsultationStatus from './ConsultationStatus';

const QueueManagement = () => {
  const [activeTab, setActiveTab] = useState('check-in');

  const tabs = [
    { id: 'check-in', label: 'Check-In Patient', icon: UserCheck },
    { id: 'generate-token', label: 'Generate Token', icon: Ticket },
    { id: 'call-next', label: 'Call Next Patient', icon: Volume2 },
    { id: 'live-queue', label: 'View Live Queue', icon: Tv },
    { id: 'consultation', label: 'Consultation Tracker', icon: Activity },
  ];

  return (
    <div className="space-y-4">
      {/* Brand Blue Header Banner */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Queue & Check-In Control Panel</h1>
        <p className="text-blue-100 text-sm mt-1">
          Streamline clinical entry flows, print thermal tokens, manage live patient calling, and verify dynamic consultation statuses
        </p>
      </div>

      {/* Horizontal Nav Bar — Aligned exactly with image_6333c8 design rules */}
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

      {/* Render Active View Matrix Segment */}
      <div className="transition-all duration-200">
        {activeTab === 'check-in' && <CheckInPatient />}
        {activeTab === 'generate-token' && <GenerateToken />}
        {activeTab === 'call-next' && <CallPatient />}
        {activeTab === 'live-queue' && <ViewLiveQueue />}
        {activeTab === 'consultation' && <ConsultationStatus />}
      </div>
    </div>
  );
};

export default QueueManagement;