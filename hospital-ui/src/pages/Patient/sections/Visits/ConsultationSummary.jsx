import React, { useState } from 'react';
import { Clipboard, Heart, Thermometer, Activity, User2 } from 'lucide-react';

const ConsultationSummary = () => {
  const [selectedVisit, setSelectedVisit] = useState("V-9082");

  const summaries = {
    "V-9082": {
      doctor: "Dr. Aman Gupta",
      dept: "Cardiology",
      date: "15 May 2026",
      reason: "Quarterly Cardiovascular Checkup",
      vitals: { bp: "122/80 mmHg", hr: "72 bpm", temp: "36.6°C", spo2: "98%" },
      clinicalNotes: "Patient reports mild fatigue late in the afternoons but denies chest pain, palpitations, or dyspnea on exertion. EKG done during visit shows normal sinus rhythm without ischemic changes. Advised continuing hydration strategies and adjusting timing of cardiovascular vitamins.",
      nextReview: "August 15, 2026"
    },
    "V-8711": {
      doctor: "Dr. Sarah Johnson",
      dept: "Pediatrics",
      date: "12 Apr 2026",
      reason: "Seasonal Allergy Evaluation",
      vitals: { bp: "110/70 mmHg", hr: "80 bpm", temp: "37.1°C", spo2: "99%" },
      clinicalNotes: "Tele-consultation conducted to evaluate persistent allergic rhinitis symptoms. Patient has congestion, dry cough, and itchy eyes. Symptoms are aggravated by seasonal pollen counts. Lung fields clear to auscultation. Recommended over-the-counter antihistamines.",
      nextReview: "As needed"
    }
  };

  const active = summaries[selectedVisit];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Consultation Summaries</h3>
          <p className="text-sm text-gray-500">Access official SOAP summaries, diagnostic notes, and measured vital indicators.</p>
        </div>

        <select
          value={selectedVisit}
          onChange={(e) => setSelectedVisit(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm bg-white font-semibold"
        >
          <option value="V-9082">Visit: 15 May 2026 (Cardiology)</option>
          <option value="V-8711">Visit: 12 Apr 2026 (Pediatrics)</option>
        </select>
      </div>

      {/* Vitals Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-rose-50/30 border border-rose-100/50 rounded-2xl flex items-center gap-3">
          <Heart className="w-5 h-5 text-rose-500 shrink-0" />
          <div>
            <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">Blood Pressure</span>
            <span className="text-sm font-bold text-gray-800">{active.vitals.bp}</span>
          </div>
        </div>

        <div className="p-4 bg-orange-50/30 border border-orange-100/50 rounded-2xl flex items-center gap-3">
          <Activity className="w-5 h-5 text-orange-500 shrink-0" />
          <div>
            <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">Heart Rate</span>
            <span className="text-sm font-bold text-gray-800">{active.vitals.hr}</span>
          </div>
        </div>

        <div className="p-4 bg-amber-50/30 border border-amber-100/50 rounded-2xl flex items-center gap-3">
          <Thermometer className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">Body Temp</span>
            <span className="text-sm font-bold text-gray-800">{active.vitals.temp}</span>
          </div>
        </div>

        <div className="p-4 bg-blue-50/30 border border-blue-100/50 rounded-2xl flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center text-[10px] font-extrabold text-blue-500 shrink-0">O₂</div>
          <div>
            <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">SpO₂ Level</span>
            <span className="text-sm font-bold text-gray-800">{active.vitals.spo2}</span>
          </div>
        </div>
      </div>

      {/* Main Medical Summary Box */}
      <div className="border border-gray-150 rounded-2xl p-6 bg-gray-50/30 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Consulting Clinician</span>
          <span className="text-sm font-bold text-gray-900">{active.doctor} ({active.dept})</span>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Clinical Notes & Findings</span>
          <p className="text-sm text-gray-600 leading-relaxed font-normal">{active.clinicalNotes}</p>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-xs">
          <span className="font-bold text-gray-400 uppercase tracking-wider">Target Re-evaluation Timeline</span>
          <span className="font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">{active.nextReview}</span>
        </div>
      </div>
    </div>
  );
};

export default ConsultationSummary;