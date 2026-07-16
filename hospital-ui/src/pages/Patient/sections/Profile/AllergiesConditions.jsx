import React, { useState } from 'react';
import { ShieldAlert, Plus, X } from 'lucide-react';

const AllergiesConditions = () => {
  const [allergies, setAllergies] = useState(["Penicillin", "Peanuts", "Dust Mites"]);
  const [newAllergy, setNewAllergy] = useState("");
  
  const [conditions, setConditions] = useState(["Asthma", "Mild Hypertension"]);
  const [newCondition, setNewCondition] = useState("");

  const handleAddAllergy = (e) => {
    e.preventDefault();
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy("");
    }
  };

  const handleAddCondition = (e) => {
    e.preventDefault();
    if (newCondition.trim() && !conditions.includes(newCondition.trim())) {
      setConditions([...conditions, newCondition.trim()]);
      setNewCondition("");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-8">
      {/* Allergies Block */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-rose-50 p-2 rounded-xl text-rose-600">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Drug & Food Allergies</h3>
        </div>

        <form onSubmit={handleAddAllergy} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add new allergy (e.g. Soy, Penicillin)"
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            className="flex-1 px-4 py-2 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
          />
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl transition-all">
            <Plus className="w-4 h-4" />
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {allergies.map((allergy, index) => (
            <span key={index} className="flex items-center gap-2 bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1.5 rounded-full text-xs font-semibold">
              {allergy}
              <button onClick={() => setAllergies(allergies.filter((_, i) => i !== index))}>
                <X className="w-3.5 h-3.5 hover:text-rose-900 transition-colors" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Chronic Conditions Block */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-50 p-2 rounded-xl text-amber-600">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Chronic & Existing Conditions</h3>
        </div>

        <form onSubmit={handleAddCondition} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add medical condition (e.g. Asthma, Diabetes)"
            value={newCondition}
            onChange={(e) => setNewCondition(e.target.value)}
            className="flex-1 px-4 py-2 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
          />
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl transition-all">
            <Plus className="w-4 h-4" />
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {conditions.map((condition, index) => (
            <span key={index} className="flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1.5 rounded-full text-xs font-semibold">
              {condition}
              <button onClick={() => setConditions(conditions.filter((_, i) => i !== index))}>
                <X className="w-3.5 h-3.5 hover:text-amber-900 transition-colors" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllergiesConditions;