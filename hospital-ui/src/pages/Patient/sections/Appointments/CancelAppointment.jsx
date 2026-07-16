import React, { useState } from 'react';
import { Ban, Trash2, ShieldAlert } from 'lucide-react';

const CancelAppointment = () => {
  const [selectedAppt, setSelectedAppt] = useState("");
  const [reason, setReason] = useState("");

  const upcomingList = [
    { id: "1", label: "Dr. Aman Gupta - Cardiology (18 May 2024 at 10:30 AM)" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-rose-50 p-2.5 rounded-xl text-rose-600">
          <Ban className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Cancel Appointment Booking</h3>
      </div>

      <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4 mb-6 text-xs text-rose-800 font-medium leading-relaxed flex gap-3 items-start">
        <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
        <p>Canceling an appointment releases the time slot immediately for other emergency patients. Frequent cancellation cycles may affect system scheduler prioritization.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Booking to Cancel</label>
          <select
            value={selectedAppt}
            onChange={(e) => setSelectedAppt(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
          >
            <option value="">-- Select active consultation booking --</option>
            {upcomingList.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Reason for Cancellation</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
          >
            <option value="">-- Please select a reason --</option>
            <option value="Schedule Conflict">Schedule Conflict</option>
            <option value="Feeling Better">Condition Improved / Feeling Better</option>
            <option value="Personal Emergency">Personal Emergency</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          disabled={!selectedAppt || !reason}
          onClick={() => {
            if (window.confirm("Are you absolutely sure you want to cancel this appointment? This action cannot be undone.")) {
              alert("Appointment Cancelled Successfully.");
              setSelectedAppt(""); setReason("");
            }
          }}
          className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-gray-100 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-rose-500/10 flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" /> Confirm Cancellation
        </button>
      </div>
    </div>
  );
};

export default CancelAppointment;