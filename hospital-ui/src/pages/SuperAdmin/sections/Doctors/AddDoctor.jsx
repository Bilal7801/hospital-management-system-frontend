import React, { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";

const AddDoctor = () => {
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
    fetchDepartments();
  }, []);

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
  // STATUS
  // ======================
  const toggleStatus = (status) => {
    setFormData((prev) => ({
      ...prev,
      isActive: status,
    }));
  };

  // ======================
  // SAVE DOCTOR
  // ======================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api.post("/Doctor", {
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

      alert("Doctor added successfully");
      navigate("/dashboard/doctors");
    } catch (error) {
      console.error("Add doctor failed:", error);
      alert("Failed to add doctor");
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
          Add New Doctor
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
            placeholder="Enter doctor name"
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
            placeholder="e.g Cardiology"
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
            placeholder="MBBS, FCPS"
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
            placeholder="2500"
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
            placeholder="9 AM - 2 PM"
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
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? "Saving..." : "Save Doctor"}
        </button>
      </div>
    </div>
  );
};

export default AddDoctor;