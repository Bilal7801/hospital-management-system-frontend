import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const AdviseDateForm = ({ patients, initialPatientId }) => {
  const [selectedPatient, setSelectedPatient] = useState(initialPatientId || '');
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpNotes, setFollowUpNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Follow-up date scheduled for ${followUpDate} for patient ${selectedPatient}`);
    // Trigger API call/backend dispatch here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Patient</label>
        <select 
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">-- Choose Patient --</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Follow-up Date</label>
        <input 
          type="date" 
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Instructions for Next Visit</label>
        <textarea 
          rows="3"
          placeholder="e.g., Bring updated blood reports..."
          value={followUpNotes}
          onChange={(e) => setFollowUpNotes(e.target.value)}
          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
        <CheckCircle className="w-4 h-4" /> Save Schedule Requirement
      </button>
    </form>
  );
};

export default AdviseDateForm;