import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";
import api from "../../../../api/axios";

const AssignDoctors = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH DEPARTMENT
  // =========================
  const fetchDepartment = async () => {
    try {
      const res = await api.get(`/Department/${id}`);
      setDepartment(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // FETCH DOCTORS
  // =========================
  const fetchDoctors = async () => {
    try {
      const res = await api.get("/Doctor");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDepartment();
    fetchDoctors();
  }, [id]);

  // =========================
  // ASSIGN
  // =========================
  const assignDoctor = async (doctor) => {
    try {
      setLoading(true);

      await api.put(`/Doctor/${doctor.doctorId}`, {
        doctorName: doctor.doctorName,
        specialization: doctor.specialization,
        qualification: doctor.qualification,
        consultationFee: doctor.consultationFee,
        timing: doctor.timing,
        isActive: doctor.isActive,
        departmentId: parseInt(id),
      });

      fetchDoctors();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // REMOVE
  // =========================
  const removeDoctor = async (doctor) => {
    try {
      await api.put(`/Doctor/${doctor.doctorId}`, {
        doctorName: doctor.doctorName,
        specialization: doctor.specialization,
        qualification: doctor.qualification,
        consultationFee: doctor.consultationFee,
        timing: doctor.timing,
        isActive: doctor.isActive,
        departmentId: null,
      });

      fetchDoctors();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">

      {/* Back Button (UNCHANGED) */}
      <button
        onClick={() => navigate("/dashboard/departments")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header (UNCHANGED UI) */}
      <div className="mt-6 bg-blue-600 text-white rounded-2xl p-5 shadow-md">

        <p className="text-[11px] uppercase tracking-wider opacity-80">
          Department ID
        </p>

        <h2 className="text-xl font-bold">
          Assign Doctors
        </h2>

        <p className="text-sm opacity-90 mt-1">
          {department ? department.departmentName : "Loading..."}
        </p>

      </div>

      {/* Doctors List (UNCHANGED UI) */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-4">

        <h3 className="text-sm font-bold text-gray-900 mb-4">
          Available Doctors
        </h3>

        <div className="space-y-3">

          {doctors.map((doc) => {

            const deptId = parseInt(id);

            const isUnassigned = doc.departmentId === null;

            const isAssignedToThis = doc.departmentId === deptId;

            const isAssignedToOther =
              doc.departmentId !== null && doc.departmentId !== deptId;

            return (
              <div
                key={doc.doctorId}
                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
              >

                {/* Doctor Name (UNCHANGED UI) */}
                <span className="text-sm font-medium text-gray-700">
                  {doc.doctorName}
                </span>

                {/* BUTTON AREA (ONLY LOGIC FIXED) */}
                <div className="flex gap-2">

                  {/* NOT ASSIGNED → SHOW ASSIGN */}
                  {isUnassigned && (
                    <button
                      onClick={() => assignDoctor(doc)}
                      disabled={loading}
                      className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-blue-600 bg-white border border-gray-200 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      Assign
                    </button>
                  )}

                  {/* ASSIGNED TO THIS DEPT → SHOW REMOVE */}
                  {isAssignedToThis && (
                    <button
                      onClick={() => removeDoctor(doc)}
                      className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-red-600 bg-white border border-gray-200 rounded-lg hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                    >
                      Remove
                    </button>
                  )}

                  {/* ASSIGNED TO OTHER DEPT → SHOW BADGE (NO BUTTON) */}
                  {isAssignedToOther && (
                    <span className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg">
                      Assigned
                    </span>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
};

export default AssignDoctors;