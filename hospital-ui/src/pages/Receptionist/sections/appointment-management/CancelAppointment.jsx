// pages/Receptionist/sections/appointment-management/CancelAppointment.jsx
import React, { useState } from 'react';
import { Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

const CancelAppointment = () => {
  const [formData, setFormData] = useState({ appointmentId: '', reason: 'Patient Request' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.appointmentId) return;

    setLoading(true);
    // Simulate swift timeline revocation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
    setFormData({ appointmentId: '', reason: 'Patient Request' });
    setTimeout(() => setSuccess(false), 3500);
  };

  return (
    <div className="space-y-4">
      {/* Brand Blue Header Banner — Maintains perfect consistency with Patient Management */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Cancel Allocated Appointment</h1>
        <p className="text-blue-100 text-sm mt-1">
          Revoke active sessions and release doctor slots back to the database queue instantly
        </p>
      </div>

      {/* Success Notification Alert Stack */}
      {success && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <p className="text-xs font-bold text-emerald-900">
            Appointment allocation successfully revoked! Timeslots updated in real-time.
          </p>
        </div>
      )}

      {/* Main Form Box */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Appointment ID Input Field with standard Blue focus ring */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Appointment Reference ID <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g., APT-9021" 
              value={formData.appointmentId}
              onChange={e => setFormData({ ...formData, appointmentId: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 transition-all uppercase tracking-wide placeholder:normal-case"
            />
          </div>

          {/* Cancellation Reason Category Dropdown with standard Blue focus ring */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Cancellation Reason Category <span className="text-red-500">*</span>
            </label>
            <select 
              value={formData.reason}
              onChange={e => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 cursor-pointer text-gray-800 transition-all"
            >
              <option value="Patient Request">Patient Request</option>
              <option value="Doctor Unavailability">Doctor Unavailability</option>
              <option value="Schedule Conflict Adjustment">Schedule Conflict Adjustment</option>
            </select>
          </div>
        </div>

        {/* Inner Context Warning Notice - Stays red for critical system safety alerts */}
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-start gap-3 text-xs text-rose-900">
          <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Warning: This operation is destructive</span>
            <p className="text-rose-700 font-medium leading-relaxed">
              Proceeding will immediately clear the queue token allocation, notify corresponding tracking systems, and permanently free up this block for alternate patient scheduling.
            </p>
          </div>
        </div>

        {/* Action Button — Swapped to signature solid Royal Blue theme */}
        <div className="flex justify-end pt-2 border-t border-gray-50">
          <button 
            type="submit"
            disabled={loading || !formData.appointmentId}
            className="px-5 py-2.5 text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 text-white disabled:text-gray-400 rounded-xl flex items-center gap-2 shadow-md shadow-blue-100 transition-all cursor-pointer disabled:cursor-not-allowed border border-transparent disabled:border-gray-200 font-bold uppercase tracking-wider"
          >
            <Trash2 className={`w-3.5 h-3.5 ${loading ? 'animate-pulse' : ''}`} />
            <span>{loading ? 'Revoking...' : 'Revoke Allocation Block'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CancelAppointment;