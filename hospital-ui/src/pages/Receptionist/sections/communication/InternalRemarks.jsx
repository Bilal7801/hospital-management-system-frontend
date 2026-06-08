import React, { useState, useEffect } from 'react';
import { StickyNote, Send, Pin, Loader2, CheckCircle2, AlertCircle, User } from 'lucide-react';
import api from '../../../../api/axios';

const InternalRemarks = () => {
  // Input fields tracking state
  const [author, setAuthor] = useState('Reception Desk');
  const [scope, setScope] = useState('');
  const [message, setMessage] = useState('');

  // Async workflow lifecycle states
  const [activeDeskLogs, setActiveDeskLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  // 1. Fetch active remarks from the C# controller database layer
  const fetchRemarks = async () => {
    try {
      setLoadingLogs(true);
      const response = await api.get('/receptionist/communication/remarks');
      if (response.data.success) {
        setActiveDeskLogs(response.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load clinical desk internal remarks:", err);
    } finally {
      setLoadingLogs(false);
    }
  };

  // Run initial fetch on layout mount
  useEffect(() => {
    fetchRemarks();
  }, []);

  // 2. Commit a new remark entry to the backend database
  const handleCommitNote = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setFeedback({ type: 'error', text: 'Remark description context is required.' });
      return;
    }

    try {
      setSubmitting(true);
      setFeedback({ type: '', text: '' });

      const response = await api.post('/receptionist/communication/remark', {
        author: author.trim() || 'Receptionist',
        scope: scope.trim() || 'General',
        message: message.trim()
      });

      if (response.data.success) {
        setFeedback({ type: 'success', text: 'Note entry successfully locked into registry.' });
        setMessage(''); // Clear out textarea description
        setScope('');   // Clear scope
        
        // Refresh feed list live from database state changes
        await fetchRemarks();
      }
    } catch (err) {
      console.error("Failed to save desk record:", err);
      setFeedback({ 
        type: 'error', 
        text: err.response?.data?.message || 'Transmission error caching remark data row.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Corrected calculation translating universal system times into your exact local time
  const formatTime = (isoString) => {
    if (!isoString) return 'Just Now';
    
    let safeIsoString = isoString;
    
    // Check if string lacks a UTC marker 'Z' or explicit offset '+/-'
    const hasOffset = safeIsoString.includes('+') || (safeIsoString.lastIndexOf('-') > 10);
    if (!safeIsoString.endsWith('Z') && !hasOffset) {
      safeIsoString += 'Z'; // Append manual UTC tag so the browser correctly adds local time offsets
    }
    
    try {
      const date = new Date(safeIsoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch (error) {
      return 'Just Now';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-slate-800">
      
      {/* Form Submission Pane */}
      <form onSubmit={handleCommitNote} className="lg:col-span-1 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4 h-fit">
        <div className="border-b border-slate-100 pb-3">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <StickyNote className="w-4 h-4 text-blue-600" /> Log Internal Desk Note
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-medium">
            Post quick administrative directives or handover alerts for incoming staff shifts.
          </p>
        </div>

        {/* Localized Error Feedback */}
        {feedback.text && (
          <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 border animate-fade-in ${
            feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200/60' : 'bg-rose-50 text-rose-800 border-rose-200/60'
          }`}>
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            <span>{feedback.text}</span>
          </div>
        )}

        <div className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1">Author Identity</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text" 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your designation code..." 
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1">Context Scope Tag</label>
            <input 
              type="text" 
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="Ex: Shift Handover, Maintenance..." 
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1">Remark Description</label>
            <textarea 
              rows="4" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Provide clear notes context indicators..." 
              className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-700 resize-none leading-relaxed"
            />
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs uppercase py-2.5 rounded-xl transition-all shadow-md shadow-blue-100 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            Commit Note Entry
          </button>
        </div>
      </form>

      {/* Notice Board Workspace Viewport */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block pb-1 border-b border-slate-100">
          Active Administrative Desk Notice Board
        </span>

        {loadingLogs ? (
          /* Central Loading Box Grid */
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
            <Loader2 className="w-7 h-7 animate-spin text-blue-500" />
            <p className="text-xs font-semibold">Pulling records from clinical matrix sync node...</p>
          </div>
        ) : activeDeskLogs.length === 0 ? (
          /* Empty Log Placeholder Grid */
          <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl bg-slate-50/20">
            <p className="text-slate-400 font-medium text-xs">No active administrative logs posted for this workspace cycle.</p>
          </div>
        ) : (
          /* Active Notice Stream Map */
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {activeDeskLogs.map((log) => (
              <div key={log.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/40 text-xs hover:bg-slate-50 hover:border-slate-200/60 transition-all relative group">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-slate-900">{log.author}</span>
                      <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider">
                        {log.scope || 'General'}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed pr-6 whitespace-pre-line">
                      {log.message}
                    </p>
                  </div>
                  
                  <span className="text-[10px] font-mono text-slate-400 font-bold flex-shrink-0 flex items-center gap-1.5 bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">
                    <Pin className="w-3 h-3 text-slate-400 fill-slate-100" /> {formatTime(log.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default InternalRemarks;