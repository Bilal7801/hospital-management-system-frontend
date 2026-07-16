import React from 'react';
import { Clock, CalendarDays, RefreshCw } from 'lucide-react';

const DosageDuration = () => {
  const dosingSchedules = [
    { drug: "Atorvastatin 20mg", dose: "1 Tablet", frequency: "Daily", timing: "Nighttime", duration: "30 Days", refillsLeft: 2, pillCounter: "20 / 30 remaining" },
    { drug: "Montelukast 10mg", dose: "1 Tablet", frequency: "Daily", timing: "Bedtime", duration: "60 Days", refillsLeft: 4, pillCounter: "45 / 60 remaining" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Dosage, Duration & Refill Tracking</h3>
        <p className="text-sm text-gray-500">Review remaining medication cycles, specific intake quantities, and system prescription refills.</p>
      </div>

      <div className="space-y-4">
        {dosingSchedules.map((item, idx) => (
          <div key={idx} className="p-5 border border-gray-150 rounded-2xl hover:border-purple-200 hover:bg-purple-50/10 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <h4 className="text-base font-bold text-gray-900">{item.drug}</h4>
                <span className="text-xs font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">{item.dose}</span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400 font-medium">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Repeat: {item.frequency} ({item.timing})</span>
                <span>•</span>
                <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> Cycle: {item.duration}</span>
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-0 pt-4 md:pt-0 border-gray-100 gap-2">
              <div className="text-left md:text-right">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Cycle Progress</span>
                <span className="text-xs font-bold text-purple-800">{item.pillCounter}</span>
              </div>
              <div className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold uppercase px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> {item.refillsLeft} Refills Left
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DosageDuration;