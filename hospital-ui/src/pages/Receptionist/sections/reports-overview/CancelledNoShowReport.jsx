import React from 'react';
import { UserX, RefreshCw, HelpCircle } from 'lucide-react';

const CancelledNoShowReport = () => {
  const attritionRecords = [
    { id: 1, name: "Hamza Malik", slot: "11:00 AM", category: "No-Show", excuse: "No communication / Absent at terminal window call" },
    { id: 2, name: "Zainab Bibi", slot: "02:30 PM", category: "Cancelled", excuse: "Patient revoked slot via digital text notification channel" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <UserX className="w-4 h-4 text-rose-600" />
          Attrition, Cancellation, & No-Show Diagnostics Log
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Track missing check-ins to reclaim slots and improve schedule optimization</p>
      </div>

      {/* Attrition Cards Array */}
      <div className="space-y-2.5">
        {attritionRecords.map((item) => (
          <div key={item.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-gray-50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-gray-800">{item.name}</span>
                <span className="text-[10px] font-mono text-gray-400 font-bold bg-white px-1.5 py-0.5 border border-gray-100 rounded">
                  Target Slot: {item.slot}
                </span>
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${
                  item.category === 'No-Show' 
                    ? 'bg-rose-50 text-rose-700 border-rose-100' 
                    : 'bg-amber-50 text-amber-700 border-amber-100'
                }`}>
                  {item.category}
                </span>
              </div>
              <p className="text-gray-500 font-medium flex items-center gap-1 text-[11px] tracking-normal">
                <HelpCircle className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" /> Reason: {item.excuse}
              </p>
            </div>

            <button className="self-start sm:self-center bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 text-gray-600 hover:text-blue-600 font-bold text-[10px] uppercase px-3 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-sm">
              <RefreshCw className="w-3 h-3" /> Reallocate Slot
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CancelledNoShowReport;