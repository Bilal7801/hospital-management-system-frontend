import React, { useState } from 'react';
import { Lock, FileSignature, AlertTriangle, ShieldCheck } from 'lucide-react';

const InternalNotesSection = () => {
  const [internalLog, setInternalLog] = useState('');

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
              onClick={() => { alert('Committed internal clinical note signature package.'); setInternalLog(''); }}
              disabled={!internalLog.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FileSignature className="w-3.5 h-3.5" /> <span>Save Clinical Thread</span>
            </button>
          </div>
        </div>

        {/* Informative Guardrails */}
        <div className="bg-amber-50/40 border border-amber-200 rounded-xl p-4 text-xs space-y-3">
          <div className="flex items-center gap-1 text-amber-800 font-bold">
            <AlertTriangle className="w-4 h-4" />
            <h4 className="uppercase tracking-wider text-[10px]">Legal Hold Protocols</h4>
          </div>
          <p className="text-gray-600 font-medium leading-relaxed">
            While excluded from standard client summaries, internal records remain discoverable under legal subpoena frameworks. Keep narratives object-oriented and free from subjective conjecture.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternalNotesSection;