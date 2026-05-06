import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus } from 'lucide-react';

const AssignDoctors = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctors = [
    "Dr. Bilal Ahmed",
    "Dr. Sarah Jenkins",
    "Dr. Robert Fox",
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">

      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/departments')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header Card */}
      <div className="mt-6 bg-blue-600 text-white rounded-2xl p-5 shadow-md">

        <p className="text-[11px] uppercase tracking-wider opacity-80">
          Department ID
        </p>

        <h2 className="text-xl font-bold">
          Assign Doctors
        </h2>

        <p className="text-sm opacity-90 mt-1">
          Department #{id}
        </p>

      </div>

      {/* Doctors List Card */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-4">

        <h3 className="text-sm font-bold text-gray-900 mb-4">
          Available Doctors
        </h3>

        <div className="space-y-3">

          {doctors.map((doc) => (
            <div
              key={doc}
              className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
            >

              {/* Doctor Name */}
              <span className="text-sm font-medium text-gray-700">
                {doc}
              </span>

              {/* Assign Button */}
              <button className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-blue-600 bg-white border border-gray-200 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer">

                <UserPlus className="w-3.5 h-3.5" />
                Assign

              </button>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default AssignDoctors;