// pages/Receptionist/sections/appointment-management/WalkInAppointment.jsx
import React, { useState } from 'react';
import { Zap, CheckCircle } from 'lucide-react';

const WalkInAppointment = () => {
  const [formData, setFormData] = useState({ patientId: '', providerPool: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientId || !formData.providerPool) return;
    
    setLoading(true);
    // Simulate swift queue token generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
    setFormData({ patientId: '', providerPool: '' });
    setTimeout(() => setSuccess(false), 3500);
  };

  return (
    <div className="space-y-4">
      {/* Brand Blue Header Banner — Matches the "Register New Patient" look */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">On-Site Walk-In Matrix</h1>
        <p className="text-blue-100 text-sm mt-1">
          Instantly route non-scheduled patients directly into the active triage or nearest open consultation pool
        </p>
      </div>

      {/* Success Notification Alert Stack */}
      {success && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <p className="text-xs font-bold text-emerald-900">
            Immediate Queue Token Generated Successfully! Routed to active pool.
          </p>
        </div>
      )}

      {/* Main Form Box */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Patient dropdown selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Patient Tracking Reference <span className="text-red-500">*</span>
            </label>
            <select 
              required
              value={formData.patientId}
              onChange={e => setFormData({ ...formData, patientId: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 cursor-pointer text-gray-800 transition-all"
            >
              <option value="">Select current walk-in patient...</option>
              <option value="p1">Ahmed Khan (PID-78492)</option>
              <option value="p2">Vikas Khanna (PID-90211)</option>
              <option value="p3">Meera Joshi (PID-48204)</option>
            </select>
          </div>

          {/* Provider Target Dropdown */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Target Medical Provider Pool <span className="text-red-500">*</span>
            </label>
            <select 
              required
              value={formData.providerPool}
              onChange={e => setFormData({ ...formData, providerPool: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 cursor-pointer text-gray-800 transition-all"
            >
              <option value="">Route to first available general physician...</option>
              <option value="d1">Dr. Rachel Zane (General Medicine)</option>
              <option value="d2">Dr. Mike Ross (Triage / Emergency Care)</option>
            </select>
          </div>
        </div>

        {/* Action Button — High Contrast Blue Theme */}
        <div className="flex justify-end pt-2 border-t border-gray-50">
          <button 
            type="submit"
            disabled={loading || !formData.patientId || !formData.providerPool}
            className="px-5 py-2.5 text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 text-white disabled:text-gray-400 rounded-xl flex items-center gap-2 shadow-md shadow-blue-100 transition-all cursor-pointer disabled:cursor-not-allowed border border-transparent disabled:border-gray-200 font-bold uppercase tracking-wider"
          >
            <Zap className={`w-3.5 h-3.5 ${loading ? 'animate-pulse' : ''}`} />
            <span>{loading ? 'Generating...' : 'Generate Immediate Queue Token'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default WalkInAppointment;