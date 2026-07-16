import React, { useState } from 'react';
import { AlertTriangle, HelpCircle, ShieldAlert, Sparkles, Coffee } from 'lucide-react';

const MedicationInstructions = () => {
  const [selectedRx, setSelectedRx] = useState("RX-4091");

  const instructions = {
    "RX-4091": {
      drug: "Atorvastatin 20mg",
      timing: "Once daily, preferably in the evening to match standard cholesterol synthesis cycles.",
      dietary: "Avoid taking with large quantities of grapefruit juice. Can be taken with or without food.",
      sideEffects: "Report any unexplained muscle pain, tenderness, or physical weakness immediately.",
      storage: "Store at room temperature (20°C - 25°C) away from moisture and direct heat source."
    },
    "RX-2710": {
      drug: "Montelukast 10mg",
      timing: "Once daily at bedtime to target asthma and seasonal allergy markers.",
      dietary: "No major food interactions reported. Ensure regular fluid intake.",
      sideEffects: "May cause mild headaches, nasal congestion, or sleep disruptions.",
      storage: "Keep in dry cabinet, protected from light."
    }
  };

  const active = instructions[selectedRx] || instructions["RX-4091"];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Medication Administration Instructions</h3>
          <p className="text-sm text-gray-500">Crucial safety recommendations, food cautions, and storage conditions.</p>
        </div>

        <select
          value={selectedRx}
          onChange={(e) => setSelectedRx(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 outline-none text-sm bg-white font-semibold"
        >
          <option value="RX-4091">Atorvastatin 20mg</option>
          <option value="RX-2710">Montelukast 10mg</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-purple-50/30 border border-purple-100 rounded-2xl space-y-2">
            <h4 className="text-xs font-extrabold text-purple-700 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Recommended Timing
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">{active.timing}</p>
          </div>

          <div className="p-4 bg-amber-50/30 border border-amber-100 rounded-2xl space-y-2">
            <h4 className="text-xs font-extrabold text-amber-700 uppercase tracking-widest flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-amber-600" /> Food & Beverage Guidelines
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">{active.dietary}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-rose-50/30 border border-rose-100 rounded-2xl space-y-2">
            <h4 className="text-xs font-extrabold text-rose-700 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" /> Warnings & Precautions
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">{active.sideEffects}</p>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-150 rounded-2xl space-y-2">
            <h4 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-gray-400" /> Optimal Storage
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">{active.storage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationInstructions;