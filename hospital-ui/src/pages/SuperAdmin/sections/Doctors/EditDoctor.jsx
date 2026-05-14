import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import api from "../../../../api/axios";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    doctorName: "",
    specialization: "",
    qualification: "",
    consultationFee: "",
    timing: "",
    departmentId: "",
    isActive: true,
  });

  // ======================
  // FETCH DOCTOR
  // ======================
  const fetchDoctor = async () => {
    try {
      const res = await api.get(`/Doctor/${id}`);

      setFormData({
        doctorName: res.data.doctorName || "",
        specialization: res.data.specialization || "",
        qualification: res.data.qualification || "",
        consultationFee: res.data.consultationFee || "",
        timing: res.data.timing || "",
        departmentId: res.data.departmentId || "",
        isActive: res.data.isActive,
      });
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  };

  // ======================
  // FETCH DEPARTMENTS
  // ======================
  const fetchDepartments = async () => {
    try {
      const res = await api.get("/Department");
      setDepartments(res.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDoctor();
    fetchDepartments();
  }, [id]);

  // ======================
  // HANDLE INPUT
  // ======================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ======================
  // STATUS TOGGLE
  // ======================
  const toggleStatus = (status) => {
    setFormData((prev) => ({
      ...prev,
      isActive: status,
    }));
  };

  // ======================
  // UPDATE DOCTOR
  // ======================
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await api.put(`/Doctor/${id}`, {
        doctorName: formData.doctorName,
        specialization: formData.specialization,
        qualification: formData.qualification,
        consultationFee: Number(formData.consultationFee),
        timing: formData.timing,
        departmentId: formData.departmentId
          ? Number(formData.departmentId)
          : null,
        isActive: formData.isActive,
      });

      alert("Doctor updated successfully");
      navigate("/dashboard/doctors");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen">

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

        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Edit Doctor #{id}
        </h2>

        {/* Doctor Name */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Doctor Name
          </label>
          <input
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Specialization */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Specialization
          </label>
          <input
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Qualification */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Qualification
          </label>
          <input
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Fee */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Consultation Fee
          </label>
          <input
            type="number"
            name="consultationFee"
            value={formData.consultationFee}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Timing */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Timing
          </label>
          <input
            name="timing"
            value={formData.timing}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Department
          </label>
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select Department</option>

            {departments.map((dept) => (
              <option
                key={dept.departmentId}
                value={dept.departmentId}
              >
                {dept.departmentName}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Status
          </label>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => toggleStatus(true)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border cursor-pointer ${
                formData.isActive
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => toggleStatus(false)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border cursor-pointer ${
                !formData.isActive
                  ? "bg-gray-100 text-gray-600 border-gray-300"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditDoctor;