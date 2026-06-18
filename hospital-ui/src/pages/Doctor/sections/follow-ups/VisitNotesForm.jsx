import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const VisitNotesForm = ({ patients, initialPatientId }) => {
  const [visitNotes, setVisitNotes] = useState({
    patientId: initialPatientId || '',
    subjective: '',
    objective: '',
    plan: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`SOAP Notes saved for patient ${visitNotes.patientId}`);
    // Trigger API call/backend dispatch here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
        <select 
          value={visitNotes.patientId}
          onChange={(e) => setVisitNotes({ ...visitNotes, patientId: e.target.value })}
          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">-- Choose Patient --</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Subjective (Symptoms/Complaints)</label>
          <textarea 
            rows="4"
            placeholder="Patient reports mild headaches in the morning..."
            value={visitNotes.subjective}
            onChange={(e) => setVisitNotes({ ...visitNotes, subjective: e.target.value })}
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Objective (Vitals/Findings)</label>
          <textarea 
            rows="4"
            placeholder="BP: 142/90 mmHg, HR: 74 bpm..."
            value={visitNotes.objective}
            onChange={(e) => setVisitNotes({ ...visitNotes, objective: e.target.value })}
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Assessment & Plan</label>
        <textarea 
          rows="3"
          placeholder="Diagnosis details and clinical treatment plan steps..."
          value={visitNotes.plan}
          onChange={(e) => setVisitNotes({ ...visitNotes, plan: e.target.value })}
          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
        <Plus className="w-4 h-4" /> Commit Notes to Electronic Health Record (EHR)
      </button>
    </form>
  );
};

export default VisitNotesForm;