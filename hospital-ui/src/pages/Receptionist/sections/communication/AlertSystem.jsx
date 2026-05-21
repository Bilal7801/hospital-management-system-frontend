import React from 'react';
import { BellRing, UserCheck, Stethoscope, AlertTriangle } from 'lucide-react';

const AlertSystem = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <BellRing className="w-4 h-4 text-blue-600" />
          Real-Time Provider & Patient Notification Matrix
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Push cross-departmental flash events directly into live operational feeds</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Action 1: Notify Doctor */}
        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between gap-4 hover:border-blue-300 transition-all group">
          <div className="space-y-1.5">
            <div className="p-2 bg-blue-50 border border-blue-100 text-blue-600 rounded-lg w-fit group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Stethoscope className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-gray-800">Signal Next Patient Arrival</h4>
            <p className="text-[11px] text-gray-400 leading-normal font-medium">Flash a live dashboard reminder directly to the doctor's screen that their next patient is waiting.</p>
          </div>
          <button className="w-full bg-gray-50 border border-gray-200 hover:bg-blue-600 text-gray-700 hover:text-white font-bold text-[11px] py-2 rounded-xl transition-all cursor-pointer">
            Ping Practitioner Screen
          </button>
        </div>

        {/* Action 2: Notify Patient */}
        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between gap-4 hover:border-blue-300 transition-all group">
          <div className="space-y-1.5">
            <div className="p-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg w-fit group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <UserCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-gray-800">Broadcast Waiting Display Callout</h4>
            <p className="text-[11px] text-gray-400 leading-normal font-medium">Push the patient token string directly onto lobby overhead monitors and wall display monitors.</p>
          </div>
          <button className="w-full bg-gray-50 border border-gray-200 hover:bg-emerald-600 text-gray-700 hover:text-white font-bold text-[11px] py-2 rounded-xl transition-all cursor-pointer">
            Push To Waiting Monitors
          </button>
        </div>

        {/* Action 3: Urgent Warning Flag */}
        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between gap-4 hover:border-rose-300 transition-all group">
          <div className="space-y-1.5">
            <div className="p-2 bg-rose-50 border border-rose-100 text-rose-600 rounded-lg w-fit group-hover:bg-rose-600 group-hover:text-white transition-all">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-gray-800">Broadcast Priority Shift Intercept</h4>
            <p className="text-[11px] text-gray-400 leading-normal font-medium">Flag urgent triage updates across all operational pods to clear out room allocations immediately.</p>
          </div>
          <button className="w-full bg-gray-50 border border-gray-200 hover:bg-rose-600 text-gray-700 hover:text-white font-bold text-[11px] py-2 rounded-xl transition-all cursor-pointer">
            Broadcast Emergency Flag
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertSystem;