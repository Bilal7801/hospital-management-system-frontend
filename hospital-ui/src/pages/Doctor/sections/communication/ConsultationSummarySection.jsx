import React, { useState } from 'react';
import { FileHeart, Printer, Share2, ClipboardList, CheckCircle } from 'lucide-react';

const ConsultationSummarySection = () => {
  const [summaryData, setSummaryData] = useState({
    diagnosis: '',
    instructions: '',
    nextReview: ''
  });

  const handlePushSummary = (e) => {
    e.preventDefault();
    alert('Consultation outline summary synchronized to patient portal cloud network pipeline.');
    setSummaryData({ diagnosis: '', instructions: '', nextReview: '' });
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Active Input Composition Editor Panel Block Form */}
        <form onSubmit={handlePushSummary} className="space-y-4 md:col-span-2">
          <div className="border-b pb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4 text-sky-600" /> Draft Patient-Facing Summary
            </h3>
            <span className="text-[10px] text-gray-400 font-medium">Translates technical metrics to clear guidance</span>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Clinical Assessment Overview</label>
            <input 
              type="text"
              placeholder="e.g. Mild Hypertension under therapeutic monitoring regime titration."
              value={summaryData.diagnosis}
              onChange={(e) => setSummaryData({ ...summaryData, diagnosis: e.target.value })}
              className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Home-Care Plan & Lifestyle Adjustments</label>
            <textarea 
              rows={4}
              placeholder="Provide clean instructions (e.g. Limit daily salt intake below 2g, track morning blood pressure values)..."
              value={summaryData.instructions}
              onChange={(e) => setSummaryData({ ...summaryData, instructions: e.target.value })}
              className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600 resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Target Next Review Timeline Window</label>
            <input 
              type="text"
              placeholder="e.g. 2 Weeks (Early July 2026 check-in)"
              value={summaryData.nextReview}
              onChange={(e) => setSummaryData({ ...summaryData, nextReview: e.target.value })}
              className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600"
            />
          </div>

          <div className="flex items-center justify-end gap-2 border-t pt-3">
            <button 
              type="button" 
              onClick={() => window.print()}
              className="px-3 py-1.5 border hover:bg-gray-50 text-gray-600 text-xs font-bold rounded-lg transition-all flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" /> Print Slip
            </button>
            <button 
              type="submit"
              disabled={!summaryData.diagnosis.trim() || !summaryData.instructions.trim()}
              className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Share2 className="w-3.5 h-3.5" /> Sync & Send to Patient
            </button>
          </div>
        </form>

        {/* Live Clean Slate Sheet Preview Panel Container Card */}
        <div className="border border-sky-100 bg-sky-50/20 rounded-xl p-4 space-y-4 self-stretch flex flex-col">
          <h4 className="text-[10px] font-bold text-sky-800 uppercase tracking-wider flex items-center gap-1">
            <FileHeart className="w-3.5 h-3.5" /> Portal Summary Preview Layout
          </h4>
          <div className="bg-white border rounded-lg p-3 space-y-3 text-xs flex-1 shadow-sm">
            <div>
              <span className="text-[9px] uppercase font-bold text-gray-400 block">Assessment Briefing</span>
              <p className="text-gray-800 font-semibold mt-0.5">{summaryData.diagnosis || <span className="text-gray-300 font-normal italic">No diagnosis summary drafted</span>}</p>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-gray-400 block">Your Guidelines & Care Tasks</span>
              <p className="text-gray-700 font-medium mt-0.5 whitespace-pre-wrap leading-relaxed">{summaryData.instructions || <span className="text-gray-300 font-normal italic">No care guidelines written yet</span>}</p>
            </div>
            <div className="border-t pt-2 mt-2 flex items-center justify-between text-[11px]">
              <span className="text-gray-400 font-medium">Follow-Up Target:</span>
              <strong className="text-sky-700 font-bold">{summaryData.nextReview || 'As requested'}</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConsultationSummarySection;