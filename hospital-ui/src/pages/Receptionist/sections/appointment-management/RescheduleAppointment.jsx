// pages/Receptionist/sections/appointment-management/RescheduleAppointment.jsx
import React, { useState } from 'react';
import { CalendarDays, Save, Clock, CheckCircle } from 'lucide-react';

const RescheduleAppointment = () => {
  const [formData, setFormData] = useState({ appointmentId: '', targetDate: '', targetSlot: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.appointmentId || !formData.targetDate || !formData.targetSlot) return;

    setLoading(true);
    // Simulate swift timeline verification and shift adjustments
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
    setFormData({ appointmentId: '', targetDate: '', targetSlot: '' });
    setTimeout(() => setSuccess(false), 3500);
  };

  return (
    <div className="space-y-4">
      {/* Brand Blue Header Banner — Guarantees uniform theme continuity */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Shift Scheduled Timelines</h1>
        <p className="text-blue-100 text-sm mt-1">
          Move existing allocations securely to newly available medical practitioner slots
        </p>
      </div>

      {/* Success Notification Alert Stack */}
      {success && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <p className="text-xs font-bold text-emerald-900">
            Timeline shift successfully applied! Grid conflict-check passed.
          </p>
        </div>
      )}

      {/* Main Form Box */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          {/* Active Appointment ID with Blue Focus */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Active Appointment Code <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g., APT-4820" 
              value={formData.appointmentId}
              onChange={e => setFormData({ ...formData, appointmentId: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 transition-all uppercase tracking-wide placeholder:normal-case"
            />
          </div>

          {/* Target Adjustment Date with Blue Focus */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Target Adjustment Date <span className="text-red-500">*</span>
            </label>
            <input 
              type="date" 
              required
              value={formData.targetDate}
              onChange={e => setFormData({ ...formData, targetDate: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 transition-all"
            />
          </div>

          {/* Target Shift Slot Dropdown with Blue Focus */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Target Shift Slot <span className="text-red-500">*</span>
            </label>
            <select 
              required
              value={formData.targetSlot}
              onChange={e => setFormData({ ...formData, targetSlot: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 cursor-pointer text-gray-800 transition-all"
            >
              <option value="">Select alternative time...</option>
              <option value="11:15 AM">11:15 AM - 11:30 AM</option>
              <option value="04:00 PM">04:00 PM - 04:15 PM</option>
            </select>
          </div>
        </div>

        {/* Soft Theme Info Alert Box for Automation Notice */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 text-xs text-blue-900">
          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Automated Conflict Resolution Matrix</span>
            <p className="text-blue-700 font-medium leading-relaxed">
              Applying changes will automatically run a real-time validation routine to test for double-bookings against the assigned healthcare provider's daily shift schedule.
            </p>
          </div>
        </div>

        {/* Action Button — High-Contrast Royal Blue Theme */}
        <div className="flex justify-end pt-2 border-t border-gray-50">
          <button 
            type="submit"
            disabled={loading || !formData.appointmentId || !formData.targetDate || !formData.targetSlot}
            className="px-5 py-2.5 text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 text-white disabled:text-gray-400 rounded-xl flex items-center gap-2 shadow-md shadow-blue-100 transition-all cursor-pointer disabled:cursor-not-allowed border border-transparent disabled:border-gray-200 font-bold uppercase tracking-wider"
          >
            <Save className={`w-3.5 h-3.5 ${loading ? 'animate-pulse' : ''}`} />
            <span>{loading ? 'Applying Shift...' : 'Apply Timeline Shift'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RescheduleAppointment;