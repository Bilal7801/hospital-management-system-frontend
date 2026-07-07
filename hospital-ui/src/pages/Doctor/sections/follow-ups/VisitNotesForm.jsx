import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import api from '../../../../api/axios';

const VisitNotesForm = ({ patients, initialPatientId }) => {
  const [formData, setFormData] = useState({
    patientId: initialPatientId || '',
    subjective: '',
    objective: '',
    plan: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientId) {
      alert("Please select a patient");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with real endpoint later (e.g., /doctor/visit-notes)
      await api.post('/doctor/followup', {   // Temporary reuse or change later
        patientId: parseInt(formData.patientId),
        notes: `SOAP Notes:\nSubjective: ${formData.subjective}\nObjective: ${formData.objective}\nPlan: ${formData.plan}`,
        followUpDate: new Date().toISOString().split('T')[0] // dummy
      });

      alert("SOAP Notes saved successfully!");
      setFormData({ patientId: '', subjective: '', objective: '', plan: '' });
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to save notes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
        <select 
          value={formData.patientId}
          onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">-- Choose Patient --</option>
          {patients.map(p => (
            <option key={p.id || p.patientId} value={p.id || p.patientId}>
              {p.fullName || p.name} ({p.patientIdCode || p.id})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Subjective (Symptoms/Complaints)</label>
          <textarea 
            rows="4"
            placeholder="Patient reports mild headaches in the morning..."
            value={formData.subjective}
            onChange={(e) => setFormData({ ...formData, subjective: e.target.value })}
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Objective (Vitals/Findings)</label>
          <textarea 
            rows="4"
            placeholder="BP: 142/90 mmHg, HR: 74 bpm..."
            value={formData.objective}
            onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Assessment & Plan</label>
        <textarea 
          rows="3"
          placeholder="Diagnosis details and clinical treatment plan steps..."
          value={formData.plan}
          onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm disabled:opacity-70"
      >
        <Plus className="w-4 h-4" /> 
        {loading ? 'Saving...' : 'Commit Notes to EHR'}
      </button>
    </form>
  );
};

export default VisitNotesForm;