import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddReceptionist = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen">

      <button
        onClick={() => navigate('/dashboard/receptionists')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Add Receptionist
        </h2>

        <div className="space-y-4">

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              Full Name
            </label>
            <input
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none"
              placeholder="Enter receptionist name"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none"
              placeholder="reception@example.com"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              Shift
            </label>

            <select className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer">
              <option>Morning</option>
              <option>Evening</option>
              <option>Night</option>
            </select>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700 cursor-pointer">

            <Save className="w-4 h-4" />
            Save Receptionist

          </button>

        </div>
      </div>
    </div>
  );
};

export default AddReceptionist;