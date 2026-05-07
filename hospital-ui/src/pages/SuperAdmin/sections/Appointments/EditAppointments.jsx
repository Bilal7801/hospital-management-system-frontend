import React from 'react';
import {
  ArrowLeft,
  Save,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const EditAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
          Edit Appointment #{id}
        </h2>

        <div className="space-y-5">

          {/* Patient */}
          <div>
            <label className="text-[11px] uppercase text-gray-500 font-semibold">
              Patient
            </label>

            <select className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer">
              <option>Ahmed Raza</option>
              <option>Sara Khan</option>
            </select>
          </div>

          {/* Doctor */}
          <div>
            <label className="text-[11px] uppercase text-gray-500 font-semibold">
              Doctor
            </label>

            <select className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer">
              <option>Dr. James Wilson</option>
              <option>Dr. Sarah Jenkins</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="date"
              className="p-3 border border-gray-200 rounded-xl text-sm"
            />

            <input
              type="time"
              className="p-3 border border-gray-200 rounded-xl text-sm"
            />

          </div>

          {/* Status */}
          <div>
            <label className="text-[11px] uppercase text-gray-500 font-semibold">
              Status
            </label>

            <select className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer">
              <option>Upcoming</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          {/* Save */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer">

            <Save className="w-4 h-4" />
            Save Changes

          </button>

        </div>
      </div>
    </div>
  );
};

export default EditAppointment;