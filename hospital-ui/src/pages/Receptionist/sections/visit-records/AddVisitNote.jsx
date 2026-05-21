import React, { useState } from 'react';
import { FileText, Save, Info } from 'lucide-react';

const AddVisitNote = () => {
  const [noteText, setNoteText] = useState('');
  const [encounterId, setEncounterId] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Form Interface Controls */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            Append Front-Desk Desk Encounter Notes
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Log administrative checklists, non-clinical constraints, or priority intake guidelines</p>
        </div>

        <div className="space-y-4">
          <div className="max-w-xs">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Encounter Mapping Reference Code</label>
            <input
              type="text"
              placeholder="Ex: ENC-2026-904"
              value={encounterId}
              onChange={(e) => setEncounterId(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 font-semibold shadow-inner transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Note/Observation Summary Text Area</label>
            <textarea
              rows="5"
              placeholder="Provide intake descriptors (e.g., patient requires wheelchair assistance, verification flag on insurance panel)..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full p-4 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 font-medium tracking-normal shadow-inner transition-all resize-none"
            />
          </div>
        </div>

        <div className="pt-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide uppercase px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-100 flex items-center gap-2 cursor-pointer">
            <Save className="w-4 h-4" /> Save Encounter Note Entry
          </button>
        </div>
      </div>

      {/* Permissions / Rules Guard Box */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between text-xs">
        <div className="space-y-3.5">
          <h4 className="font-bold uppercase text-[10px] tracking-wider text-amber-600 flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-2.5 py-1.5 rounded-lg">
            <Info className="w-4 h-4" /> Administrative Restrictions Guard
          </h4>
          <p className="text-gray-500 font-semibold leading-relaxed">
            Front-desk operatives are permitted to append administrative, dispatch, and physical staging logs only.
          </p>
          <div className="h-px bg-gray-100 my-2"></div>
          <p className="text-gray-400 font-medium leading-relaxed">
            Strict medical chart files, primary diagnostics, and pharmacology updates can only be executed by credentialed clinical practitioners inside the triage portal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddVisitNote;