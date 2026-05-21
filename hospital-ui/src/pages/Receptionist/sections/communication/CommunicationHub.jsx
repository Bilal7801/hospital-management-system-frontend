import React, { useState } from 'react';
import { MessageSquare, BellRing, StickyNote, Mail } from 'lucide-react';
import SendReminders from './SendReminders';
import AlertSystem from './AlertSystem';
import InternalRemarks from './InternalRemarks';

const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState('send-reminders');

  // Synchronized seamlessly with item 9 node elements in the flowchart
  const tabs = [
    { id: 'send-reminders', label: '1. Send SMS / Email Reminders', icon: Mail },
    { id: 'inform-alerts', label: '2. Inform Doctor / Patient', icon: BellRing },
    { id: 'internal-remarks', label: '3. Internal Notes & Remarks', icon: StickyNote },
  ];

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

      {/* Navigation Row Array */}
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

      {/* Dynamic Sub-Component Output Frame */}
      <div className="transition-all duration-200">
        {activeTab === 'send-reminders' && <SendReminders />}
        {activeTab === 'inform-alerts' && <AlertSystem />}
        {activeTab === 'internal-remarks' && <InternalRemarks />}
      </div>
    </div>
  );
};

export default CommunicationHub;