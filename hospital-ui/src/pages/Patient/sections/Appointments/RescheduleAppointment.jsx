import React, { useState } from 'react';
import { RefreshCw, Calendar, Clock, AlertTriangle } from 'lucide-react';

const RescheduleAppointment = () => {
  const [appt, setAppt] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const activeAppts = [
    { id: "1", label: "Dr. Aman Gupta - Cardiology (18 May 2024 at 10:30 AM)" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600">
          <RefreshCw className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Reschedule Consultation</h3>
      </div>

      <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 mb-6 text-xs text-amber-800 font-medium leading-relaxed flex gap-3 items-start">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>Appointments can only be rescheduled up to <strong>24 hours prior</strong> to the scheduled time slot. Late modifications will require clinical administrative confirmation.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Active Appointment</label>
          <select
            value={appt}
            onChange={(e) => setAppt(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white"
          >
            <option value="">-- Choose active booking --</option>
            {activeAppts.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Choose New Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Choose New Time Slot</label>
            <select
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm bg-white"
            >
              <option value="">-- Select Time --</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="03:00 PM">03:00 PM</option>
            </select>
          </div>
        </div>

        <button
          disabled={!appt || !newDate || !newTime}
          onClick={() => {
            alert("Reschedule Request Submitted Successfully!");
            setAppt(""); setNewDate(""); setNewTime("");
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-blue-500/10"
        >
          Submit Reschedule Request
        </button>
      </div>
    </div>
  );
};

export default RescheduleAppointment;