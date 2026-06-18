import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, FileText, Activity, Heart, ClipboardCheck } from 'lucide-react';

const ConsultationForm = ({ session, onCancel, onComplete }) => {
  // Encapsulated Clinical Chart Documentation State Mapping
  const [formData, setFormData] = useState({
    chiefComplaint: '',
    hpi: '', // History of Present Illness
    clinicalExamination: '',
    diagnosisImpression: '',
    treatmentPlan: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(session.id, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Session Navigation Command Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-lg transition-colors bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Active Session Room</div>
            <h2 className="text-lg font-bold text-gray-900">{session.name} ({session.gender}, {session.age} Yrs)</h2>
          </div>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors bg-white"
          >
            Suspend Session
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm shadow-emerald-100"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Sign & Close EHR</span>
          </button>
        </div>
      </div>

      {/* Main Structural Input Matrix Panel Grid */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* SECTION 1: Chief Complaint */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>1. Chief Complaint (CC)</span>
          </label>
          <p className="text-xs text-gray-400">Primary symptom constraints reported directly by the patient causing them to seek medical attention.</p>
          <textarea
            required
            name="chiefComplaint"
            value={formData.chiefComplaint}
            onChange={handleInputChange}
            rows={2}
            placeholder="e.g., Acute substernal chest pressure radiating down left arm lasting 45 minutes, accompanied by diaphoresis..."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* SECTION 2: History of Present Illness (HPI) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <span>2. History of Present Illness (HPI)</span>
          </label>
          <p className="text-xs text-gray-400">Chronological analysis of the clinical timeline (location, quality, severity, onset timing, triggers).</p>
          <textarea
            required
            name="hpi"
            value={formData.hpi}
            onChange={handleInputChange}
            rows={4}
            placeholder="Describe chronological development of the patient's present illness parameters..."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* SECTION 3: Clinical Examination */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-500" />
            <span>3. Objective Clinical Examination Findings</span>
          </label>
          <p className="text-xs text-gray-400">Document physical diagnostic observations, general signs, system examinations, and auscultations.</p>
          <textarea
            required
            name="clinicalExamination"
            value={formData.clinicalExamination}
            onChange={handleInputChange}
            rows={3}
            placeholder="e.g., Chest clear to auscultation bilaterally. S1/S2 distinct with regular rhythm. No murmurs or gallops. Abdomen soft, non-tender..."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* SECTION 4 & 5 Matrix Grid Row Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Diagnosis / Clinical Impression */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
            <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-indigo-500" />
              <span>4. Diagnosis / Clinical Impression</span>
            </label>
            <p className="text-xs text-gray-400">Primary working medical evaluation index or code confirmation.</p>
            <textarea
              required
              name="diagnosisImpression"
              value={formData.diagnosisImpression}
              onChange={handleInputChange}
              rows={4}
              placeholder="e.g., Essential Hypertension (I10) / Uncontrolled Type 2 Diabetes Mellitus without complications (E11.9)..."
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          {/* Treatment Plan */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
            <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>5. Therapeutic Treatment Plan</span>
            </label>
            <p className="text-xs text-gray-400">Medication specifications, dosage frequencies, diagnostic orders, and counseling strategies.</p>
            <textarea
              required
              name="treatmentPlan"
              value={formData.treatmentPlan}
              onChange={handleInputChange}
              rows={4}
              placeholder="e.g., Increase Metformin to 1000mg PO BID with meals. Schedule 12-lead ECG and HbA1c review. Return to clinic in 14 days..."
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
            />
          </div>

        </div>

      </div>
    </form>
  );
};

export default ConsultationForm;