import React, { useState } from 'react';
import { Plus, Trash2, FileText, Pill, Clock, Eye } from 'lucide-react';

const PrescriptionForm = ({ patient, initialData, onSubmit }) => {
  const [medicines, setMedicines] = useState(initialData.medicines);
  const [notes, setNotes] = useState(initialData.notes);

  const addMedicineRow = () => {
    setMedicines([
      ...medicines,
      { id: Date.now(), name: '', dosage: '1-0-1', instructions: 'After meals', duration: '5 Days' }
    ]);
  };

  const removeMedicineRow = (id) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  const handleMedChange = (id, field, value) => {
    setMedicines(medicines.map(med => med.id === id ? { ...med, [field]: value } : med));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ medicines, notes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Patient Strip Banner */}
      <div className="bg-gray-900 text-white px-6 py-4 rounded-xl flex flex-wrap justify-between items-center gap-4 shadow-sm">
        <div className="text-sm font-medium">
          Patient: <span className="text-blue-400 font-bold">{patient.name}</span> ({patient.gender}, {patient.age} Yrs)
        </div>
        <div className="text-xs font-mono bg-gray-800 text-gray-300 px-3 py-1 rounded border border-gray-700">
          ID: {patient.id} • Date: {patient.date}
        </div>
      </div>

      {/* Medicines Form Block */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <Pill className="w-4 h-4 text-blue-600" />
            <span>Medication Specification Matrix</span>
          </h3>
          <button
            type="button"
            onClick={addMedicineRow}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Medication</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {medicines.map((med, index) => (
            <div key={med.id} className="flex flex-col md:flex-row items-end gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
              <div className="w-6 text-xs font-bold text-gray-400 text-center self-center hidden md:block">
                {index + 1}.
              </div>

              {/* Medicine Input Name */}
              <div className="flex-1 w-full">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Brand / Generic Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Amoxicillin 500mg"
                  value={med.name}
                  onChange={(e) => handleMedChange(med.id, 'name', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Dosage Input mapping */}
              <div className="w-full md:w-32">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Dosage Pattern</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 1-0-1"
                  value={med.dosage}
                  onChange={(e) => handleMedChange(med.id, 'dosage', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-mono text-center"
                />
              </div>

              {/* Special Administration Instructions */}
              <div className="w-full md:w-48">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Timing / Instructions</label>
                <select
                  value={med.instructions}
                  onChange={(e) => handleMedChange(med.id, 'instructions', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-white"
                >
                  <option value="After meals">After meals</option>
                  <option value="Before meals">Before meals</option>
                  <option value="With meals">With meals</option>
                  <option value="At bedtime">At bedtime</option>
                  <option value="On empty stomach">On empty stomach</option>
                  <option value="As required (PRN)">As required (PRN)</option>
                </select>
              </div>

              {/* Duration Timeline */}
              <div className="w-full md:w-32">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Duration</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 5 Days"
                  value={med.duration}
                  onChange={(e) => handleMedChange(med.id, 'duration', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Delete Button Container */}
              {medicines.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMedicineRow(med.id)}
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100 mb-0.5"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notes and Form Submission Controls */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-500" />
            <span>Clinical Advice / Dietary Notes</span>
          </label>
          <textarea
            rows={3}
            placeholder="Add relevant instructions, lifestyle recommendations, allergy safety warmings, or scheduling alerts here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div className="border-t pt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm shadow-blue-100"
          >
            <Eye className="w-4 h-4" />
            <span>Generate Rx Summary Preview</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default PrescriptionForm;