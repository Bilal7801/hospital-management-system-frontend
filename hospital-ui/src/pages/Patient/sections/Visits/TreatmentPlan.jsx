import React from 'react';
import { ClipboardCheck, Activity, AlertCircle, Sparkles } from 'lucide-react';

const TreatmentPlan = () => {
  const prescriptions = [
    { name: "Bilastine 20mg", frequency: "Once Daily (Morning)", duration: "14 Days", instructions: "Avoid grapefruit juice or ingestion within 2 hours of meal schedule." }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Your Structured Treatment Plan</h3>
        <p className="text-sm text-gray-500">Therapies, active medication instructions, and general lifestyle adjustments scheduled for recovery.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Regimens */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <ClipboardCheck className="w-4 h-4 text-amber-600" /> Medical Regimen Instructions
          </h4>
          
          {prescriptions.map((med, index) => (
            <div key={index} className="p-5 border border-amber-100 rounded-2xl bg-amber-50/10 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">{med.name}</span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">{med.duration}</span>
              </div>
              <p className="text-xs text-gray-500 font-semibold">Dosage Frequency: <span className="text-gray-700">{med.frequency}</span></p>
              <div className="p-3 bg-white/70 border border-amber-100/50 rounded-xl text-xs text-gray-600">
                <strong>Directions:</strong> {med.instructions}
              </div>
            </div>
          ))}
        </div>

        {/* Therapy Guidelines / Habits */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-600" /> Lifestyle & Recovery Plans
          </h4>

          <div className="p-5 border border-gray-150 rounded-2xl space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 block">Hydration Goal</span>
              <p className="text-xs text-gray-600">Drink at least 2.5 to 3 Liters of mineralized water daily.</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 block">Cardiovascular Exercise</span>
              <p className="text-xs text-gray-600">Keep physical routines to low-impact walks (30 mins daily). Limit heavy lifting.</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 block">Dietary Restrictions</span>
              <p className="text-xs text-gray-600">Reduce total sodium intake below 2000mg/day. Limit highly processed foods.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlan;