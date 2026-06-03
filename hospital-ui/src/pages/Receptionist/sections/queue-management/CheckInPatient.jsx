import React, { useState } from 'react';
import { UserCheck, Search, ShieldCheck, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import api from '../../../../api/axios'; // Adjust this relative path based on your folder structure

const CheckInPatient = ({ onActionSuccess }) => {
  const [formData, setFormData] = useState({
    appointmentId: '',
    triageNotes: '',
    urgencyLevel: 'Standard Routine'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear out warning labels as soon as the user starts correcting entries
    if (feedback.message) setFeedback({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side payload guard validation
    if (!formData.appointmentId.trim()) {
      setFeedback({ 
        type: 'error', 
        message: 'Appointment Reference Code is highly critical and mandatory.' 
      });
      return;
    }

    setIsLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      // Direct pipeline dispatch via your custom Axios configuration wrapper
      const response = await api.post('/receptionist/queue-management/check-in', {
        appointmentId: formData.appointmentId.trim(),
        triageNotes: formData.triageNotes.trim(),
        urgencyLevel: formData.urgencyLevel
      });

      // Axios unpacks data directly into .data
      const data = response.data;

      setFeedback({
        type: 'success',
        message: `Validation Confirmed! Allocated Token: ${data.tokenNumber || 'Success'}`
      });

      // Clear layout fields for next intake entry record processing
      setFormData({
        appointmentId: '',
        triageNotes: '',
        urgencyLevel: 'Standard Routine'
      });

      // Fire hook to update parent state trackers or real-time counters if provided
      if (onActionSuccess) {
        onActionSuccess(`Patient checked in successfully. Token: ${data.tokenNumber}`);
      }

    } catch (error) {
      // Extracts descriptive messages thrown out from .NET validation logic or custom filters
      const apiErrorMessage = error.response?.data?.message || error.response?.data?.title;
      
      setFeedback({
        type: 'error',
        message: apiErrorMessage || error.message || 'Verification pipeline encountered a system fallback error.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-600" />
          Clinical Reception Intake & Verification
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Validate scheduled appointments and initialize real-time transit routing</p>
      </div>

      {/* Dynamic Network / Validation Request Alerts */}
      {feedback.message && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs font-semibold tracking-wide ${
          feedback.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-rose-50 border-rose-200 text-rose-900'
        }`}>
          {feedback.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div>{feedback.message}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Appointment Reference Field */}
          <div className="relative">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Appointment Reference Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Ex: APT-40921"
                disabled={isLoading}
                value={formData.appointmentId}
                onChange={(e) => handleInputChange('appointmentId', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 transition-all font-semibold shadow-inner disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Triage Urgency State Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Initial Triage Allocation Class <span className="text-red-500">*</span>
            </label>
            <select
              disabled={isLoading}
              value={formData.urgencyLevel}
              onChange={(e) => handleInputChange('urgencyLevel', e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 font-semibold transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <option value="Standard Routine">Standard Routine Consultation</option>
              <option value="Priority Follow-up">Priority Clinical Follow-up</option>
              <option value="Urgent Triage Case">Urgent Triage Tracking Case</option>
            </select>
          </div>
        </div>

        {/* Triage Check-in Intake Notes */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Reception Observation Notes / Intake Symptoms</label>
          <textarea
            rows="3"
            disabled={isLoading}
            placeholder="Document vital anomalies, initial BP metrics, or waiting area routing preferences..."
            value={formData.triageNotes}
            onChange={(e) => handleInputChange('triageNotes', e.target.value)}
            className="w-full p-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 transition-all font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          ></textarea>
        </div>

        {/* Action Button Row */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white font-bold text-xs tracking-wide uppercase px-5 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100 flex items-center gap-2 cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying and Routing...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Validate Attendance & Route to Desk Queue
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckInPatient;