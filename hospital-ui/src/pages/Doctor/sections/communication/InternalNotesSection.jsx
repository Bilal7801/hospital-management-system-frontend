import React, { useState, useEffect } from 'react';
import { Lock, FileSignature, AlertTriangle, ShieldCheck, Loader2, Trash2 } from 'lucide-react';
import api from '../../../../api/axios';

const InternalNotesSection = () => {
  const [internalLog, setInternalLog] = useState('');
  const [remarks, setRemarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch existing internal remarks
  useEffect(() => {
    const fetchRemarks = async () => {
      try {
        setLoading(true);
        const res = await api.get('/receptionist/communication/remarks');
        setRemarks(res.data.data || []);
      } catch (err) {
        console.error("Failed to load internal remarks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRemarks();
  }, []);

  const handleSaveNote = async () => {
    if (!internalLog.trim()) return;

    setSaving(true);

    try {
      const res = await api.post('/receptionist/communication/remark', {
        message: internalLog,
        scope: "Clinical"
      });

      // Add to list immediately
      setRemarks([res.data.data, ...remarks]);
      setInternalLog('');
      alert('Internal clinical note saved successfully.');
    } catch (err) {
      console.error("Failed to save note", err);
      alert('Failed to save note. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const deleteRemark = async (id) => {
    if (!window.confirm("Delete this internal note?")) return;

    try {
      await api.delete(`/receptionist/communication/remark/${id}`);
      setRemarks(remarks.filter(r => r.id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
      alert("Failed to delete note.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
      {/* Clinician Sealed Encrypted Banner Warning Block */}
      <div className="bg-slate-900 text-slate-100 border border-slate-950 p-4 rounded-xl flex items-start gap-3 shadow-md">
        <Lock className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs space-y-1">
          <h4 className="font-bold uppercase tracking-wider text-[11px] text-amber-400">Restricted Internal Case Log Gate</h4>
          <p className="text-slate-400 font-medium leading-relaxed">
            Data committed here is hidden from patient access tokens, mobile apps, or diagnostic portal summaries. This area is used strictly for peer clinical reviews, internal diagnostics tracking, and case audit briefs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Core Input Canvas Editor Textarea */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm md:col-span-2 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Clinical Case Narrative Notes</label>
              <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 font-bold px-1.5 rounded">Encrypted At Rest</span>
            </div>
            <textarea
              rows={6}
              placeholder="Commit sensitive medical review differentials, internal clinical observations, or long-form medical case parameters..."
              value={internalLog}
              onChange={(e) => setInternalLog(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50/10 font-medium text-gray-800 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Sign-off: Active Session Authenticated</span>
            </div>
            <button
              onClick={handleSaveNote}
              disabled={saving || !internalLog.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileSignature className="w-3.5 h-3.5" />}
              {saving ? 'Saving...' : 'Save Clinical Thread'}
            </button>
          </div>
        </div>

        {/* Informative Guardrails + Live List */}
        <div className="space-y-4">
          <div className="bg-amber-50/40 border border-amber-200 rounded-xl p-4 text-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-800 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <h4 className="uppercase tracking-wider text-[10px]">Legal Hold Protocols</h4>
            </div>
            <p className="text-gray-600 font-medium leading-relaxed">
              While excluded from standard client summaries, internal records remain discoverable under legal subpoena frameworks. Keep narratives object-oriented and free from subjective conjecture.
            </p>
          </div>

          {/* Live Remarks List */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h4 className="text-xs font-bold text-gray-700 mb-3">Recent Internal Notes</h4>
            {remarks.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {remarks.map((remark) => (
                  <div key={remark.id} className="p-3 bg-gray-50 rounded-lg text-xs border border-gray-100 group">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">{remark.author}</span>
                      <button 
                        onClick={() => deleteRemark(remark.id)}
                        className="text-gray-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-gray-600 mt-1 leading-relaxed">{remark.message}</p>
                    <p className="text-[10px] text-gray-400 mt-1.5">{new Date(remark.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-xs italic py-4">No internal notes yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalNotesSection;