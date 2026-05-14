import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";
import api from "../../../../api/axios";

const ViewDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  // ======================
  // FETCH DOCTOR
  // ======================
  const fetchDoctor = async () => {
    try {
      const res = await api.get(`/Doctor/${id}`);
      setDoctor(res.data);
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  if (!doctor) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading doctor...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">

      {/* Back */}
      <button
        onClick={() => navigate("/dashboard/doctors")}
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
            Doctor Profile #{doctor.doctorId}
          </h2>
        </div>

        {/* Info */}
        <div className="space-y-5 text-sm">

          {/* Name */}
          <div>
            <p className="text-[11px] text-gray-400 uppercase">
              Doctor Name
            </p>
            <p className="font-semibold text-gray-800">
              {doctor.doctorName}
            </p>
          </div>

          {/* Specialization */}
          <div>
            <p className="text-[11px] text-gray-400 uppercase">
              Specialization
            </p>
            <p className="font-semibold text-gray-800">
              {doctor.specialization}
            </p>
          </div>

          {/* Qualification */}
          <div>
            <p className="text-[11px] text-gray-400 uppercase">
              Qualification
            </p>
            <p className="font-semibold text-gray-800">
              {doctor.qualification}
            </p>
          </div>

          {/* Department */}
          <div>
            <p className="text-[11px] text-gray-400 uppercase">
              Department
            </p>
            <p className="font-semibold text-gray-800">
              {doctor.departmentName || "Not Assigned"}
            </p>
          </div>

          {/* Fee */}
          <div>
            <p className="text-[11px] text-gray-400 uppercase">
              Consultation Fee
            </p>
            <p className="font-semibold text-gray-800">
              Rs. {doctor.consultationFee}
            </p>
          </div>

          {/* Timing */}
          <div>
            <p className="text-[11px] text-gray-400 uppercase">
              Timing
            </p>
            <p className="font-semibold text-gray-800">
              {doctor.timing}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="text-[11px] text-gray-400 uppercase">
              Status
            </p>
            <span
              className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${
                doctor.isActive
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {doctor.isActive ? "Active" : "Inactive"}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewDoctor;