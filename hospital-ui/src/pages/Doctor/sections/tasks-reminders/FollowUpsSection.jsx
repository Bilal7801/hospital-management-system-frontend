import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, Calendar, Loader2 } from 'lucide-react';
import api from '../../../../api/axios';

const FollowUpsSection = () => {
  const [followUps, setFollowUps] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch Follow-ups
  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        setLoading(true);
        const res = await api.get('/doctor/tasks');
        const data = res.data.data || res.data || [];

        // FIXED CASING: item.Type -> item.type, item.Id -> item.id, etc.
        const filtered = data
          .filter(item => item.type === "Followup")
          .map(item => ({
            id: item.id,
            patientName: item.patientName || 'Unknown Patient',
            reason: item.description || 'No reason provided',
            dueDate: item.dueDate ? new Date(item.dueDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            }) : 'N/A'
          }));

        setFollowUps(filtered);
      } catch (err) {
        console.error("Failed to load follow-ups", err);
        setFollowUps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUps();
  }, []);

  const filteredData = followUps.filter(f => 
    (f.patientName || '').toLowerCase().includes(query.toLowerCase()) || 
    (f.reason || '').toLowerCase().includes(query.toLowerCase())
  );

  const handleResolve = async (id) => {
    if (!window.confirm("Mark this follow-up as completed?")) return;

    try {
      await api.put(`/doctor/tasks/${id}/complete`); // Optional endpoint
      setFollowUps(followUps.filter(f => f.id !== id));
    } catch (err) {
      console.error("Failed to resolve follow-up", err);
      alert("Failed to mark as complete. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-3 border border-gray-200 rounded-xl shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search pending target parameters..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
          />
        </div>
        <span className="text-xs text-gray-400 font-medium">Total Actions Tracked: {filteredData.length}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map(task => (
            <div key={task.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-between gap-4 hover:border-purple-300 transition-all group relative">
              <div className="space-y-1.5">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm truncate">{task.patientName}</h4>
                    <span className="text-[10px] font-mono bg-purple-50 text-purple-700 px-1.5 rounded">{task.id}</span>
                  </div>
                  <button 
                    onClick={() => handleResolve(task.id)}
                    className="p-1.5 bg-gray-50 hover:bg-emerald-600 text-gray-400 hover:text-white rounded-lg border transition-all"
                    title="Mark Complete"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium pt-1">{task.reason}</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium border-t pt-2 mt-auto">
                <Calendar className="w-3.5 h-3.5" /> Due Window: <strong className="text-gray-700">{task.dueDate}</strong>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400 italic">No pending follow-ups found.</div>
        )}
      </div>
    </div>
  );
};

export default FollowUpsSection;