import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen">

      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/departments')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Card */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Create Department
        </h2>

        {/* Department Name */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Department Name
          </label>
          <input
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
            placeholder="Enter department name"
          />
        </div>

        {/* Head Doctor */}
        <div className="mb-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Head Doctor
          </label>
          <select className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
            <option>Select Head Doctor</option>
            <option>Dr. James Wilson</option>
            <option>Dr. Sarah Jenkins</option>
          </select>
        </div>

        {/* Create Button */}
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Create Department
        </button>

      </div>
    </div>
  );
};

export default AddDepartment;