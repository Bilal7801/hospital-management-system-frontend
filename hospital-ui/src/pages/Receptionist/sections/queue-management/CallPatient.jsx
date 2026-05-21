import React from 'react';
import { Volume2, ChevronRight, UserMinus, AlertCircle, PlayCircle } from 'lucide-react';

const CallPatient = () => {
  const currentServing = { token: "TKN-081", patient: "Vikas Khanna", doc: "Dr. Aman Gupta", desk: "OPD Desk 4" };

  const upNextList = [
    { token: "TKN-082", patient: "Karan Adani", type: "Scheduled" },
    { token: "TKN-083", patient: "Meera Joshi", type: "Walk-In Routine" },
    { token: "TKN-084", patient: "Asif Malik", type: "Priority Case" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Terminal Deck Console Controller */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-blue-600" />
            Live Desk Operator Audio Console
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Control live terminal status tracks, dispatch audio alerts, and clear local queues</p>
        </div>

        {/* Currently Highlighted Room Element */}
        <div className="bg-gradient-to-br from-blue-50/60 to-blue-50/10 border border-blue-100 rounded-xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="space-y-1">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-100/60 border border-blue-200/50 px-2 py-0.5 rounded-md">
              Actively Dispatched & Called Case
            </span>
            <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2 mt-1">
              <span className="text-blue-600">{currentServing.token}</span> — {currentServing.patient}
            </h2>
            <p className="text-xs text-gray-500 font-semibold">
              Practitioner Room Assignment: <span className="text-gray-700 font-bold">{currentServing.doc}</span> | <span className="text-gray-500">{currentServing.desk}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-blue-600 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer">
              <PlayCircle className="w-3.5 h-3.5" /> Repeat Audio
            </button>
            <button className="bg-white border border-gray-200 text-gray-600 font-bold text-xs uppercase px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer">
              <UserMinus className="w-3.5 h-3.5 text-gray-400" /> Flag Absent
            </button>
          </div>
        </div>

        {/* Master Workflow Step Controller triggers */}
        <div className="flex justify-end pt-2">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide uppercase px-5 py-3 rounded-xl transition-all shadow-md shadow-emerald-100 flex items-center gap-2 cursor-pointer">
            Advance Terminal Workflow to Next Token
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sequential Upcoming Triage Pipeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            Next Pipeline Lineup
          </h4>

          <div className="space-y-2.5">
            {upNextList.map((next, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-blue-600 tracking-wide block">{next.token}</span>
                  <span className="text-xs font-bold text-gray-800 block">{next.patient}</span>
                </div>
                <span className="text-[9px] font-extrabold uppercase bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-md shadow-sm">
                  {next.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-gray-400 font-semibold leading-normal pt-4 border-t border-gray-50 mt-4">
          This panel handles physical speaker systems and updates digital signage across terminal dashboards in real time.
        </p>
      </div>
    </div>
  );
};

export default CallPatient;