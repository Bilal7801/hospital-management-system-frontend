import React, { useState } from 'react';
import { UserCheck, Search, ShieldCheck } from 'lucide-react';

const CheckInPatient = () => {
  const [formData, setFormData] = useState({
    appointmentId: '',
    triageNotes: '',
    urgencyLevel: 'Standard Routine'
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-600" />
          Clinical Reception Intake & Verification
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Validate scheduled appointments and initialize real-time transit routing</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
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
                value={formData.appointmentId}
                onChange={(e) => setFormData({ ...formData, appointmentId: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 transition-all font-semibold shadow-inner"
              />
            </div>
          </div>

          {/* Triage Urgency State Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Initial Triage Allocation Class <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.urgencyLevel}
              onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value })}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 font-semibold transition-all cursor-pointer"
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
            placeholder="Document vital anomalies, initial BP metrics, or waiting area routing preferences..."
            value={formData.triageNotes}
            onChange={(e) => setFormData({ ...formData, triageNotes: e.target.value })}
            className="w-full p-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 transition-all font-medium"
          ></textarea>
        </div>

        {/* Action Button Row */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold text-xs tracking-wide uppercase px-5 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100 flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            Validate Attendance & Route to Desk Queue
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckInPatient;