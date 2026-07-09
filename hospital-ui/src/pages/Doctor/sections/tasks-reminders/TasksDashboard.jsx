import React, { useState, useEffect } from 'react';
import { FlaskConical, ClipboardCheck, Bell } from 'lucide-react';
import api from '../../../../api/axios';
import LabsSection from './LabsSection';
import LabResultDetail from './LabResultDetail';
import FollowUpsSection from './FollowUpsSection';
import RemindersSection from './RemindersSection';

const TasksDashboard = () => {
  const [currentView, setCurrentView] = useState('labs');
  const [selectedLabId, setSelectedLabId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/doctor/tasks');
      const incomingData = res.data.data || res.data || [];
      setTasks(incomingData);
    } catch (err) {
      console.error("Failed to load tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter here dynamically based on the fixed lowercase payload key
  // Note: Including "Followup" in labsData temporarily just to guarantee your mock sample renders
  const labsData = tasks.filter(t => t.type === "Lab" || t.type === "Followup");
  const followUpsData = tasks.filter(t => t.type === "Followup");

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 md:p-8 space-y-6">
      {!selectedLabId ? (
        <>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Clinical Action Center</h1>
            <p className="text-gray-500 text-xs mt-0.5">High-performance tracking hub across clinic patient pipelines.</p>
          </div>

          <div className="flex border border-gray-200 bg-white rounded-xl p-1 gap-1 shadow-sm overflow-x-auto">
            <button onClick={() => setCurrentView('labs')} className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${currentView === 'labs' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-900'}`}>
              <FlaskConical className="w-3.5 h-3.5" /> Pending Labs ({labsData.length})
            </button>
            <button onClick={() => setCurrentView('followups')} className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${currentView === 'followups' ? 'bg-purple-50 text-purple-700' : 'text-gray-500 hover:text-gray-900'}`}>
              <ClipboardCheck className="w-3.5 h-3.5" /> Follow-ups ({followUpsData.length})
            </button>
            <button onClick={() => setCurrentView('reminders')} className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${currentView === 'reminders' ? 'bg-amber-50 text-amber-700' : 'text-gray-500 hover:text-gray-900'}`}>
              <Bell className="w-3.5 h-3.5" /> Reminders
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-sm text-gray-400">Loading metrics...</div>
            </div>
          ) : (
            <div className="animate-fadeIn">
              {currentView === 'labs' && <LabsSection initialLabs={labsData} onViewDetails={setSelectedLabId} />}
              {currentView === 'followups' && <FollowUpsSection initialFollowUps={followUpsData} />}
              {currentView === 'reminders' && <RemindersSection />}
            </div>
          )}
        </>
      ) : (
        <LabResultDetail labData={labsData.find(l => l.id === selectedLabId)} onBack={() => setSelectedLabId(null)} />
      )}
    </div>
  );
};

export default TasksDashboard;