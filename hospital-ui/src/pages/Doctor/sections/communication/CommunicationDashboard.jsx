import React, { useState } from 'react';
import { MessageSquare, UserSquare2, Lock, ClipboardList } from 'lucide-react';
import PatientMessagingSection from './PatientMessagingSection';
import ReceptionistNotesSection from './ReceptionistNotesSection';
import InternalNotesSection from './InternalNotesSection';
import ConsultationSummarySection from './ConsultationSummarySection';

const CommunicationDashboard = () => {
  const [activeTab, setActiveTab] = useState('messaging');

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 md:p-8 space-y-6">
      {/* Module Title Header Context */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Unified Communications Engine</h1>
        <p className="text-gray-500 text-xs mt-0.5">Central gateway routing direct patient notifications, front-desk logs, and private clinical narratives.</p>
      </div>

      {/* Main Multi-channel Grid Selection Switcher Row Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border border-gray-200 bg-white rounded-xl p-1.5 shadow-sm">
        <button
          onClick={() => setActiveTab('messaging')}
          className={`inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'messaging' ? 'bg-slate-900 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <MessageSquare className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Patient Messaging</span>
        </button>
        <button
          onClick={() => setActiveTab('receptionist')}
          className={`inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'receptionist' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <UserSquare2 className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Receptionist Notes</span>
        </button>
        <button
          onClick={() => setActiveTab('internal')}
          className={`inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'internal' ? 'bg-amber-50 text-amber-800' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Lock className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Internal Case Notes</span>
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'summary' ? 'bg-sky-50 text-sky-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <ClipboardList className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Consultation Summary</span>
        </button>
      </div>

      {/* Screen Segment Display Switcher Router Area */}
      <div className="bg-transparent mt-4">
        {activeTab === 'messaging' && <PatientMessagingSection />}
        {activeTab === 'receptionist' && <ReceptionistNotesSection />}
        {activeTab === 'internal' && <InternalNotesSection />}
        {activeTab === 'summary' && <ConsultationSummarySection />}
      </div>
    </div>
  );
};

export default CommunicationDashboard;