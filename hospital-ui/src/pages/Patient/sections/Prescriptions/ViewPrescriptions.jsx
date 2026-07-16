import React, { useState } from 'react';
import { Pill, User, Calendar, FileText, CheckCircle2, Clock } from 'lucide-react';

const ViewPrescriptions = () => {
  const [filter, setFilter] = useState("Active");

  const prescriptions = [
    { id: "RX-4091", drug: "Atorvastatin 20mg", type: "Tablet", prescribedBy: "Dr. Aman Gupta", date: "15 May 2026", status: "Active", condition: "Hypercholesterolemia" },
    { id: "RX-3882", drug: "Amoxicillin 500mg", type: "Capsule", prescribedBy: "Dr. Sarah Johnson", date: "12 Apr 2026", status: "Completed", condition: "Bacterial Infection" },
    { id: "RX-2710", drug: "Montelukast 10mg", type: "Tablet", prescribedBy: "Dr. Sarah Johnson", date: "12 Apr 2026", status: "Active", condition: "Allergic Rhinitis" }
  ];

  const filteredRx = prescriptions.filter(rx => filter === "All" || rx.status === filter);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Your Prescriptions</h3>
          <p className="text-sm text-gray-500">Track and monitor your active therapeutic regimens and past medication logs.</p>
        </div>

        <div className="flex gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100 shrink-0">
          {["Active", "Completed", "All"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === tab 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab} Medications
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRx.map((rx) => (
          <div key={rx.id} className="p-5 border border-purple-100 rounded-2xl bg-purple-50/10 hover:border-purple-300 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">{rx.id}</span>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  rx.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {rx.status}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
                  <Pill className="w-4 h-4 text-purple-600" /> {rx.drug}
                </h4>
                <p className="text-xs text-gray-500 font-semibold mt-1">Form: <span className="font-normal text-gray-400">{rx.type}</span></p>
                <p className="text-xs text-gray-500 font-semibold mt-1">Target Treatment: <span className="font-normal text-gray-400">{rx.condition}</span></p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-5 flex justify-between items-center text-[11px] text-gray-400">
              <span className="flex items-center gap-1 font-medium"><User className="w-3.5 h-3.5" /> {rx.prescribedBy}</span>
              <span className="flex items-center gap-1 font-medium"><Calendar className="w-3.5 h-3.5" /> {rx.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPrescriptions;