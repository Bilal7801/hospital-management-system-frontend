import React from 'react';
import { Activity, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

const ConsultationStatus = () => {
  const activeRooms = [
    { room: "OPD Desk 4", doctor: "Dr. Aman Gupta", patient: "Vikas Khanna", status: "In Consultation" },
    { room: "Room 102-A", doctor: "Dr. Sarah Johns", patient: "Meera Joshi", status: "Awaiting Triage Input" },
    { room: "Cabin B-3", doctor: "Dr. Vikas Khanna", patient: "None (Idle)", status: "Available / Free" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-600" />
          Clinical Consultation Status Tracker
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Real-time room occupancy logs and session tracking matrices across your facility</p>
      </div>

      {/* Grid Dashboard Grid Layout Render */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeRooms.map((cell, idx) => {
          const isBusy = cell.status === 'In Consultation';
          const isIdle = cell.status === 'Available / Free';
          
          return (
            <div 
              key={idx} 
              className={`p-4 border rounded-xl flex flex-col justify-between gap-4 transition-all hover:shadow-sm bg-white ${
                isBusy 
                  ? 'border-blue-100 shadow-sm shadow-blue-50/20' 
                  : isIdle 
                  ? 'border-emerald-100' 
                  : 'border-amber-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-md">
                    {cell.room}
                  </span>
                  <h4 className="text-sm font-bold text-gray-800 mt-1.5">{cell.doctor}</h4>
                  <p className="text-xs text-gray-500 font-medium">
                    Patient: <span className="text-gray-700 font-bold">{cell.patient}</span>
                  </p>
                </div>
                {isBusy ? (
                  <ArrowUpRight className="w-4 h-4 text-blue-500" />
                ) : isIdle ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                )}
              </div>

              {/* Status Indicator Bar */}
              <div className={`text-[10px] font-bold uppercase tracking-widest text-center py-1 rounded-md border ${
                isBusy 
                  ? 'bg-blue-50 text-blue-700 border-blue-200/60' 
                  : isIdle 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' 
                  : 'bg-amber-50 text-amber-700 border-amber-200/60'
              }`}>
                {cell.status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConsultationStatus;