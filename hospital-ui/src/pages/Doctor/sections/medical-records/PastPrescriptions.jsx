import React from 'react';
import { Pill, Calendar } from 'lucide-react';

const PastPrescriptions = ({ prescriptions }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Historical Rx Directives Log</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prescriptions.map((rx, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-400 border-b pb-2">
              <div className="flex items-center gap-1.5 font-medium text-gray-600">
                <Calendar className="w-3.5 h-3.5" />
                <span>Issued: {rx.date}</span>
              </div>
              <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{rx.rxId}</span>
            </div>

            <div className="space-y-2">
              {rx.medications.map((med, mIdx) => (
                <div key={mIdx} className="flex items-start gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <Pill className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">{med.name} <span className="text-xs font-normal text-gray-500">({med.strength})</span></div>
                    <div className="text-xs text-gray-600 mt-0.5 font-medium">{med.dosage} • {med.duration}</div>
                    {med.instructions && <div className="text-[11px] text-amber-700 italic mt-0.5">⚠️ Direction: {med.instructions}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastPrescriptions;