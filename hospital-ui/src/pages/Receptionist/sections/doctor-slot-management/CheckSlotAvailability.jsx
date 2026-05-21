// pages/Receptionist/sections/doctor-slot-management/CheckSlotAvailability.jsx
import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';

const CheckSlotAvailability = () => {
  const [checkData, setCheckData] = useState({ doctorId: 'd1', targetDate: '2026-05-21' });

  // Dummy dynamic timeline grid data matrix
  const currentSlots = [
    { time: "09:00 AM", status: "Available" },
    { time: "09:30 AM", status: "Booked" },
    { time: "10:00 AM", status: "Available" },
    { time: "10:30 AM", status: "Booked" },
    { time: "11:00 AM", status: "Available" },
    { time: "11:30 AM", status: "Available" },
    { time: "04:00 PM", status: "Available" },
    { time: "04:30 PM", status: "Booked" },
  ];

  return (
    <div className="space-y-4">
      {/* Brand Blue Header Banner — Perfect layout uniformity across all modules */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Check Slot Availability</h1>
        <p className="text-blue-100 text-sm mt-1">
          Verify live timeline matrices, check allocated sessions, and track real-time calendar availability parameters
        </p>
      </div>

      {/* Parameter Control Panel Box */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-5 shadow-sm">
        {/* Specialist Dropdown Selection with Blue Focus */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Assigned Medical Specialist <span className="text-red-500">*</span>
          </label>
          <select 
            value={checkData.doctorId}
            onChange={e => setCheckData({...checkData, doctorId: e.target.value})}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 cursor-pointer text-gray-800 font-semibold transition-all"
          >
            <option value="d1">Dr. Aman Gupta (Cardiology)</option>
            <option value="d2">Dr. Sarah Johns (Orthopedics)</option>
          </select>
        </div>

        {/* Target Verification Date input with Blue Focus */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Target Verification Date <span className="text-red-500">*</span>
          </label>
          <input 
            type="date"
            value={checkData.targetDate}
            onChange={e => setCheckData({...checkData, targetDate: e.target.value})}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 font-medium transition-all"
          />
        </div>
      </div>

      {/* Visual Live Grid System Output */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            Live Timeline Matrix Outlay
          </h4>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Available Slots
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span> Allocated Blocks
            </span>
          </div>
        </div>

        {/* Time Badge Tiles Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {currentSlots.map((slot, index) => {
            const isAvail = slot.status === 'Available';
            return (
              <div 
                key={index}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 relative overflow-hidden ${
                  isAvail 
                    ? 'bg-emerald-50/40 border-emerald-200 text-emerald-900 shadow-sm shadow-emerald-50/50' 
                    : 'bg-gray-50 border-gray-200 text-gray-400 line-through'
                }`}
              >
                <Clock className={`w-4 h-4 ${isAvail ? 'text-emerald-600' : 'text-gray-300'}`} />
                <span className="text-xs font-bold tracking-wide text-gray-800">{slot.time}</span>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md ${
                  isAvail 
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-100' 
                    : 'bg-gray-200 text-gray-500 no-underline border border-gray-300/30'
                }`}>
                  {slot.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CheckSlotAvailability;