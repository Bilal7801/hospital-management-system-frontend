import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import api from '../../../../api/axios';

const AdviseDateForm = ({ patients = [], initialPatientId }) => {
  const [formData, setFormData] = useState({
    patientId: initialPatientId || '',
    followUpDate: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.patientId || !formData.followUpDate) {
      alert("Please select a patient and follow-up date");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await api.post('/doctor/followup', {
        patientId: parseInt(formData.patientId),
        followUpDate: formData.followUpDate,
        notes: formData.notes?.trim() || null
      });

      setSuccess(true);
      alert("Follow-up scheduled successfully!");

      // Reset form
      setFormData({
        patientId: '',
        followUpDate: '',
        notes: ''
      });
    } catch (err) {
      console.error(err.response?.data || err);
      const msg = err.response?.data?.message || "Failed to schedule follow-up";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Patient</label>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Follow-up Date</label>
        <input 
          type="date" 
          value={formData.followUpDate}
          onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Instructions for Next Visit</label>
        <textarea 
          rows="3"
          placeholder="e.g., Bring updated blood reports, review recent labs..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading || !formData.patientId || !formData.followUpDate}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm w-full justify-center"
      >
        <CheckCircle className="w-4 h-4" /> 
        {loading ? 'Saving...' : 'Save Schedule Requirement'}
      </button>

      {success && (
        <div className="text-emerald-600 text-center text-sm font-medium">
          ✓ Follow-up saved successfully!
        </div>
      )}
    </form>
  );
};

export default AdviseDateForm;