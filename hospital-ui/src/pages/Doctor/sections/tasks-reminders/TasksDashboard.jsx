import React, { useState } from 'react';
import { FlaskConical, ClipboardCheck, Bell, FileText } from 'lucide-react';
import LabsSection from './LabsSection';
import LabResultDetail from './LabResultDetail'; // Imported deep sub-module page
import FollowUpsSection from './FollowUpsSection';
import RemindersSection from './RemindersSection';
import ScratchpadSection from './ScratchpadSection';

const TasksDashboard = () => {
  const [currentView, setCurrentView] = useState('labs');
  const [selectedLabId, setSelectedLabId] = useState(null); // Handles dynamic single page route toggle

  // Scaled Mock Registries Database
  const [labsData] = useState([
    { id: 'L-901', patientName: 'Arjun Mehta', patientId: 'P-1043', testType: 'HbA1c Panels Evaluation', orderedDate: 'June 16, 2026', status: 'Urgent Review' },
    { id: 'L-902', patientName: 'Sana Khan', patientId: 'P-1089', testType: 'Serum Electrolytes Profile', orderedDate: 'June 17, 2026', status: 'In Lab Analysis' }
  ]);

  const [followUpsData, setFollowUpsData] = useState([
    { id: 'F-441', patientName: 'Muhammad Raza', reason: 'Post-Op Knee joint flexion evaluation and telemetry readout verification.', dueDate: 'June 20, 2026' },
    { id: 'F-442', patientName: 'Fatima Ali', reason: 'Hypertension medication titration check-in compliance log review.', dueDate: 'June 22, 2026' }
  ]);

  const [appointmentsData] = useState([
    { id: 'A-11', patientName: 'Zainab Ahmed', type: 'Chronic Consult Followup', time: '03:15 PM' },
    { id: 'A-12', patientName: 'Rahul Sharma', type: 'Initial Diagnostic Review', time: '04:30 PM' }
  ]);

  const [medicationsData] = useState([
    { id: 'M-51', patientName: 'Arjun Mehta', medication: 'Metformin HCl titration monitoring', schedule: 'Post 90-Days Check' }
  ]);

  // Find targeted data matching selected item lookup query
  const activeLabRecord = labsData.find(lab => lab.id === selectedLabId);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 md:p-8 space-y-6">
      
      {/* PAGE CONDITION MATRIX EVALUATION */}
      {!selectedLabId ? (
        <>
          {/* Main Workspace Dashboard Grid Header */}
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Clinical Action Center</h1>
            <p className="text-gray-500 text-xs mt-0.5">High-performance tracking hub across clinic patient pipelines.</p>
          </div>

          {/* Master Segment Switcher Buttons Navbar */}
          <div className="flex border border-gray-200 bg-white rounded-xl p-1 gap-1 shadow-sm overflow-x-auto">
            <button
              onClick={() => setCurrentView('labs')}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                currentView === 'labs' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" /> Pending Labs ({labsData.length})
            </button>
            <button
              onClick={() => setCurrentView('followups')}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                currentView === 'followups' ? 'bg-purple-50 text-purple-700' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" /> Follow-ups ({followUpsData.length})
            </button>
            <button
              onClick={() => setCurrentView('reminders')}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                currentView === 'reminders' ? 'bg-amber-50 text-amber-700' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Bell className="w-3.5 h-3.5" /> Reminders ({appointmentsData.length + medicationsData.length})
            </button>
            <button
              onClick={() => setCurrentView('scratchpad')}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                currentView === 'scratchpad' ? 'bg-slate-100 text-slate-800' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Personal Notes
            </button>
          </div>

          {/* Active List View Segments */}
          <div className="animate-fadeIn">
            {currentView === 'labs' && (
              <LabsSection 
                labs={labsData} 
                onViewDetails={(id) => setSelectedLabId(id)} // 🚀 Connected callback triggers page change state
              />
            )}
            {currentView === 'followups' && (
              <FollowUpsSection 
                followUps={followUpsData} 
                onResolve={(id) => setFollowUpsData(followUpsData.filter(f => f.id !== id))} 
              />
            )}
            {currentView === 'reminders' && <RemindersSection appointments={appointmentsData} medications={medicationsData} />}
            {currentView === 'scratchpad' && <ScratchpadSection />}
          </div>
        </>
      ) : (
        /* Render Full Isolated Page sheet wrapper */
        <LabResultDetail 
          labData={activeLabRecord} 
          onBack={() => setSelectedLabId(null)} 
        />
      )}
    </div>
  );
};

export default TasksDashboard;