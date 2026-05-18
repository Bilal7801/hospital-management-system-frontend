import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";
import api from "../../../../api/axios";

const ViewDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ======================
  // FETCH DOCTOR BY ID
  // ======================
  const fetchDoctor = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await api.get(`/superadmin/doctors/${id}`);   // ← Fixed Route
      console.log("Doctor Details:", res.data);
      setDoctor(res.data);
    } catch (error) {
      console.error("Error fetching doctor:", error);
      setError("Failed to load doctor details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDoctor();
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 min-h-screen">
        Loading doctor details...
      </div>
    );
  }

  // Error State
  if (error || !doctor) {
    return (
      <div className="p-6 max-w-3xl mx-auto min-h-screen">
        <button
          onClick={() => navigate("/dashboard/doctors")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Doctors
        </button>
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl text-center">
          {error || "Doctor not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/doctors")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Doctors
      </button>

      {/* Doctor Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {doctor.doctorName}
            </h2>
            <p className="text-gray-500">Doctor ID: #{doctor.doctorId}</p>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest">Specialization</p>
            <p className="font-semibold text-gray-800 mt-1">{doctor.specialization || "N/A"}</p>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest">Qualification</p>
            <p className="font-semibold text-gray-800 mt-1">{doctor.qualification || "N/A"}</p>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest">Department</p>
            <p className="font-semibold text-gray-800 mt-1">
              {doctor.departmentName || "Not Assigned"}
            </p>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest">Consultation Fee</p>
            <p className="font-semibold text-gray-800 mt-1">
              Rs. {doctor.consultationFee || 0}
            </p>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest">Timing</p>
            <p className="font-semibold text-gray-800 mt-1">{doctor.timing || "N/A"}</p>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest">Status</p>
            <span
              className={`inline-block px-3 py-1 text-[11px] font-bold rounded-full mt-1 ${
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