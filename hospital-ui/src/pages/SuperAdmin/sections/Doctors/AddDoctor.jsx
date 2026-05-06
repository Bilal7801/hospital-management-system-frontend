import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen">

      {/* Back */}
      <button
        onClick={() => navigate('/dashboard/doctors')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Card */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Add New Doctor
        </h2>

        {/* Doctor Name */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Doctor Name
          </label>
          <input
            type="text"
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
            placeholder="Enter doctor name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Email
          </label>
          <input
            type="email"
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
            placeholder="doctor@example.com"
          />
        </div>

        {/* Specialty */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Specialty
          </label>
          <input
            type="text"
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
            placeholder="e.g. Cardiology"
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Department
          </label>
          <select className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
            <option>Select Department</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Orthopedics</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Status
          </label>

          <div className="flex gap-3 mt-2">

            <button className="flex-1 py-2.5 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
              Active
            </button>

            <button className="flex-1 py-2.5 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
              Inactive
            </button>

          </div>
        </div>

        {/* Save */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer">

          <Save className="w-4 h-4" />
          Save Doctor

        </button>

      </div>
    </div>
  );
};

export default AddDoctor;