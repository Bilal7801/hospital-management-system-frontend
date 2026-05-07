import React from 'react';
import {
  ArrowLeft,
  Save,
  Info,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddAppointment = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">

      {/* Back */}
      <button
        onClick={() => navigate('/dashboard/appointments')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Card */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Add Appointment (Admin Override)
        </h2>

        <div className="space-y-5">

          {/* Patient */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500">
              Select Patient
            </label>

            <select className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer">
              <option>Ahmed Raza</option>
              <option>Sara Khan</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500">
              Department
            </label>

            <select className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer">
              <option>Cardiology</option>
              <option>Neurology</option>
            </select>
          </div>

          {/* Doctor (should be filtered by department later) */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500">
              Select Doctor
            </label>

            <select className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer">
              <option>Dr. James Wilson (Available)</option>
              <option>Dr. Sarah Jenkins (Busy)</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-[11px] uppercase font-semibold text-gray-500">
                Appointment Date
              </label>

              <input
                type="date"
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase font-semibold text-gray-500">
                Appointment Time
              </label>

              <input
                type="time"
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none"
              />
            </div>

          </div>

          {/* Status */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500">
              Status
            </label>

            <select className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer">
              <option>Upcoming</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          {/* Admin Note */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500 flex items-center gap-1">
              Admin Note <Info className="w-3 h-3" />
            </label>

            <textarea
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none"
              placeholder="Reason for manual appointment (optional)"
            />
          </div>

          {/* Save */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer">

            <Save className="w-4 h-4" />
            Save Appointment

          </button>

        </div>
      </div>
    </div>
  );
};

export default AddAppointment;