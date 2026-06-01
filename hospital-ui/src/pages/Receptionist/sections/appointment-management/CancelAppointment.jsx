// pages/Receptionist/sections/appointment-management/CancelAppointment.jsx
import React, { useState, useEffect } from 'react';
import { Trash2, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';

const CancelAppointment = () => {
  const [formData, setFormData] = useState({
    appointmentId: '',
    reason: 'Patient Request'
  });

  const [appointments, setAppointments] = useState([]); // Active appointments
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch active/upcoming appointments
  useEffect(() => {
    const fetchActiveAppointments = async () => {
      try {
        const response = await api.get('/receptionist/appointment/search', {
          params: { 
            status: 'Upcoming', 
            pageSize: 100 
          }
        });
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filter cancellable appointments
        const cancellableAppointments = (response.data.data || []).filter(apt => {
          // Never show already cancelled appointments
          if (apt.status === 'Cancelled') return false;

          // Show rescheduled appointments (they can be cancelled)
          if (apt.status === 'Rescheduled') return true;

          // For No-Show status: check if date has passed
          if (apt.status === 'No-Show' || apt.status === 'Missed') {
            const aptDate = new Date(apt.appointmentDate);
            aptDate.setHours(0, 0, 0, 0);
            
            // If date has passed, don't show it (can't cancel past no-shows)
            if (aptDate < today) return false;
          }

          // Show all other valid appointments
          return true;
        });
        
        setAppointments(cancellableAppointments);
      } catch (err) {
        console.error(err);
      }
    };

    fetchActiveAppointments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.appointmentId) {
      setError("Please select an appointment to cancel");
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.put('/receptionist/appointment/cancel', {
        appointmentId: parseInt(formData.appointmentId),
        reason: formData.reason
      });

      setSuccess(true);
      
      // Reset form
      setFormData({
        appointmentId: '',
        reason: 'Patient Request'
      });

      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to cancel appointment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Brand Blue Header Banner */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Cancel Allocated Appointment</h1>
        <p className="text-blue-100 text-sm mt-1">
          Revoke active sessions and release doctor slots
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <p className="text-xs font-bold text-emerald-900">
            Appointment successfully cancelled. Slot is now available.
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <p className="text-xs font-bold text-red-900">{error}</p>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Select Appointment */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Appointment Reference ID <span className="text-red-500">*</span>
            </label>
            <select 
              name="appointmentId"
              value={formData.appointmentId}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 cursor-pointer text-gray-800 transition-all"
            >
              <option value="">Select appointment to cancel...</option>
              {appointments.map(apt => (
                <option key={apt.id} value={apt.id}>
                  {apt.appointmentCode} — {apt.patientName} with Dr. {apt.doctorName} 
                  ({new Date(apt.appointmentDate).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          {/* Cancellation Reason */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Cancellation Reason <span className="text-red-500">*</span>
            </label>
            <select 
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 cursor-pointer text-gray-800 transition-all"
            >
              <option value="Patient Request">Patient Request</option>
              <option value="Doctor Unavailability">Doctor Unavailability</option>
              <option value="Schedule Conflict">Schedule Conflict</option>
              <option value="Emergency">Emergency / Urgent Matter</option>
              <option value="Other">Other Reason</option>
            </select>
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-start gap-3 text-xs text-rose-900">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Warning: This action is irreversible</span>
            <p className="text-rose-700 font-medium leading-relaxed">
              Cancelling will permanently free this slot and notify the patient and doctor.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button 
            type="submit"
            disabled={submitting || !formData.appointmentId}
            className="px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl flex items-center gap-2 shadow-md shadow-blue-100 transition-all cursor-pointer font-semibold disabled:cursor-not-allowed"
          >
            <Trash2 className={`w-4 h-4 ${submitting ? 'animate-pulse' : ''}`} />
            <span>{submitting ? 'Revoking...' : 'Cancel Appointment'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CancelAppointment;