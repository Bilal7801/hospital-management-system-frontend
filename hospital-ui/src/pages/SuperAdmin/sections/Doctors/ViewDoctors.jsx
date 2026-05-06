import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

const ViewDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // dummy data (later replace with API)
  const doctor = {
    id,
    name: "Dr. James Wilson",
    email: "james@hospital.com",
    specialty: "Cardiology",
    department: "Cardiology",
    status: "Active",
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">

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

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-900">
            Doctor Profile #{doctor.id}
          </h2>
        </div>

        {/* Info */}
        <div className="space-y-4 text-sm">

          <div>
            <p className="text-[11px] text-gray-400 uppercase">Name</p>
            <p className="font-semibold text-gray-800">{doctor.name}</p>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase">Email</p>
            <p className="font-semibold text-gray-800">{doctor.email}</p>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase">Specialty</p>
            <p className="font-semibold text-gray-800">{doctor.specialty}</p>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase">Department</p>
            <p className="font-semibold text-gray-800">{doctor.department}</p>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase">Status</p>
            <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-50 text-emerald-600">
              {doctor.status}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ViewDoctor;