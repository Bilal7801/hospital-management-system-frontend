import React, { useState } from 'react';
import { Users, Calendar, ClipboardCopy } from 'lucide-react';
import PatientList from './PatientList';
import AdviseDateForm from './AdviseDateForm';
import VisitNotesForm from './VisitNotesForm';

const FollowUpDashboard = () => {
  const [activeTab, setActiveTab] = useState('view-patients');
  const [searchTerm, setSearchTerm] = useState('');
  const [targetPatientId, setTargetPatientId] = useState('');

  // Centralized Master Mock Data
  const [patients] = useState([
    { id: "P-1042", name: "Zubair Ahmed", lastVisit: "2026-06-10", condition: "Post-op Recovery", progress: 75, nextFollowUp: "2026-06-20" },
    { id: "P-1089", name: "Sana Khan", lastVisit: "2026-06-12", condition: "Hypertension Management", progress: 40, nextFollowUp: "2026-06-22" },
    { id: "P-1102", name: "Muhammad Raza", lastVisit: "2026-06-15", condition: "Type 2 Diabetes Control", progress: 90, nextFollowUp: "2026-06-29" },
  ]);

  // Handles dynamic context jumps (e.g. clicking 'Schedule' inside the list opens the correct tab and pre-fills data)
  const handleContextAction = (tabKey, patientId) => {
    setTargetPatientId(patientId);
    setActiveTab(tabKey);
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-6 md:p-8">
      {/* View Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Patient Follow-up Management</h1>
        <p className="text-gray-500 text-sm">Advise timelines, monitor vitals progress, and document clinical visit updates.</p>
      </div>

      {/* Unified Tabbed Layout Bar */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-4 pt-2 gap-2 shadow-sm">
        <button
          onClick={() => setActiveTab('view-patients')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'view-patients' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Users className="w-4 h-4" /> View Patients & Progress
        </button>
        <button
          onClick={() => setActiveTab('advise-date')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'advise-date' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Calendar className="w-4 h-4" /> Advise Follow-up Date
        </button>
        <button
          onClick={() => setActiveTab('add-notes')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'add-notes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <ClipboardCopy className="w-4 h-4" /> Add Visit Notes (SOAP)
        </button>
      </div>

      {/* Main Content Body */}
      <div className="bg-white p-6 rounded-b-xl shadow-sm border border-t-0 border-gray-100">
        {activeTab === 'view-patients' && (
          <PatientList 
            patients={patients} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            onAction={handleContextAction} 
          />
        )}

        {activeTab === 'advise-date' && (
          <AdviseDateForm 
            patients={patients} 
            initialPatientId={targetPatientId} 
          />
        )}

        {activeTab === 'add-notes' && (
          <VisitNotesForm 
            patients={patients} 
            initialPatientId={targetPatientId} 
          />
        )}
      </div>
    </div>
  );
};

export default FollowUpDashboard;