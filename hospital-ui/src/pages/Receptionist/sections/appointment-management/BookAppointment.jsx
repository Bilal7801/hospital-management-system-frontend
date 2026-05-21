// pages/Receptionist/sections/appointment-management/BookAppointment.jsx
import React, { useState } from 'react';
import { Calendar, CheckCircle } from 'lucide-react';

const BookAppointment = () => {
  const [formData, setFormData] = useState({ patientId: '', doctorId: '', date: '', slot: '', type: 'Consultation', remarks: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientId || !formData.doctorId || !formData.date || !formData.slot) return;

    setLoading(true);
    // Simulate swift database queue validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
    setFormData({ patientId: '', doctorId: '', date: '', slot: '', type: 'Consultation', remarks: '' });
    setTimeout(() => setSuccess(false), 3500);
  };

  return (
    <div className="space-y-4">
      {/* Brand Blue Header Banner — Perfect layout uniformity across all modules */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Book New Appointment</h1>
        <p className="text-blue-100 text-sm mt-1">
          Schedule standard clinical check-ups, regular reviews, and diagnostic appointments
        </p>
      </div>

      {/* Success Notification Alert Stack */}
      {success && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <p className="text-xs font-bold text-emerald-900">
            Appointment successfully booked and allocated into active schedules!
          </p>
        </div>
      )}

      {/* Main Form Box */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Patient Dropdown Selection with Blue Focus */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Select Patient <span className="text-red-500">*</span>
            </label>
            <select 
              required 
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 cursor-pointer text-gray-800 transition-all" 
              value={formData.patientId} 
              onChange={e => setFormData({...formData, patientId: e.target.value})}
            >
              <option value="">Choose registered patient...</option>
              <option value="1">Ahmed Khan (PID-78492)</option>
              <option value="2">Zainab Malik (PID-10293)</option>
            </select>
          </div>

          {/* Specialist Dropdown Selection with Blue Focus */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Assigned Medical Specialist <span className="text-red-500">*</span>
            </label>
            <select 
              required 
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 cursor-pointer text-gray-800 transition-all" 
              value={formData.doctorId} 
              onChange={e => setFormData({...formData, doctorId: e.target.value})}
            >
              <option value="">Choose doctor...</option>
              <option value="d1">Dr. Aman Gupta (Cardiology)</option>
              <option value="d2">Dr. Sarah Johns (Orthopedics)</option>
            </select>
          </div>

          {/* Appointment Date input with Blue Focus */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Appointment Date <span className="text-red-500">*</span>
            </label>
            <input 
              type="date" 
              required 
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 transition-all" 
              value={formData.date} 
              onChange={e => setFormData({...formData, date: e.target.value})} 
            />
          </div>

          {/* Time Slot Dropdown Selection with Blue Focus */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Available Shift Slot <span className="text-red-500">*</span>
            </label>
            <select 
              required 
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 cursor-pointer text-gray-800 transition-all" 
              value={formData.slot} 
              onChange={e => setFormData({...formData, slot: e.target.value})}
            >
              <option value="">Select slot timings...</option>
              <option value="s1">10:15 AM - 10:30 AM</option>
              <option value="s2">10:45 AM - 11:00 AM</option>
              <option value="s3">02:15 PM - 02:30 PM</option>
            </select>
          </div>
        </div>

        {/* Clinical Remarks Input with Blue Focus */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Clinical Remarks / Symptoms Summary
          </label>
          <textarea 
            rows="3" 
            placeholder="Enter initial remarks or notes regarding clinical issues..." 
            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-sm text-gray-800 transition-all" 
            value={formData.remarks} 
            onChange={e => setFormData({...formData, remarks: e.target.value})} 
          />
        </div>

        {/* Action Button — Solid High-Contrast Royal Blue Theme */}
        <div className="flex justify-end pt-2 border-t border-gray-50">
          <button 
            type="submit" 
            disabled={loading || !formData.patientId || !formData.doctorId || !formData.date || !formData.slot}
            className="px-5 py-2.5 text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 text-white disabled:text-gray-400 rounded-xl flex items-center gap-2 shadow-md shadow-blue-100 transition-all cursor-pointer disabled:cursor-not-allowed border border-transparent disabled:border-gray-200 font-bold uppercase tracking-wider"
          >
            <Calendar className={`w-3.5 h-3.5 ${loading ? 'animate-pulse' : ''}`} />
            <span>{loading ? 'Confirming...' : 'Confirm Booking Slot'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;