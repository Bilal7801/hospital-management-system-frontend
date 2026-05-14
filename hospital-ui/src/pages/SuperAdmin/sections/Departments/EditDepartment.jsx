import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import api from "../../../../api/axios";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    departmentName: "",
    headDoctorId: "",
    isActive: true,
  });

  // ======================
  // GET DEPARTMENT BY ID
  // ======================
  const fetchDepartment = async () => {
    try {
      const res = await api.get(`/Department/${id}`);
      const data = res.data;

      setFormData({
        departmentName: data.departmentName || "",
        headDoctorId: data.headDoctorId || "",
        isActive: Boolean(data.isActive),
      });
    } catch (error) {
      console.error("Error fetching department:", error);
    }
  };

  // ======================
  // GET DOCTORS FOR DROPDOWN
  // ======================
  const fetchDoctors = async () => {
    try {
      const res = await api.get("/Doctor");
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDepartment();
    fetchDoctors();
  }, [id]);

  // ======================
  // INPUT CHANGE
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
  // UPDATE
  // ======================
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await api.put(`/Department/${id}`, {
        departmentName: formData.departmentName,
        headDoctorId: formData.headDoctorId
          ? parseInt(formData.headDoctorId)
          : null,
        isActive: formData.isActive,
      });

      alert("Department updated successfully");
      navigate("/dashboard/departments");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen">

      {/* Back */}
      <button
        onClick={() => navigate("/dashboard/departments")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Edit Department #{id}
        </h2>

        {/* Department Name */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Department Name
          </label>
          <input
            name="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm"
          />
        </div>

        {/* Head Doctor Dropdown */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Head Doctor
          </label>

          <select
            name="headDoctorId"
            value={formData.headDoctorId}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm"
          >
            <option value="">Select Head Doctor</option>

            {doctors.map((doc) => (
              <option key={doc.doctorId} value={doc.doctorId}>
                {doc.doctorName}
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
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border ${
                formData.isActive
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "border-gray-200"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => toggleStatus(false)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border ${
                !formData.isActive
                  ? "bg-gray-100 text-gray-600 border-gray-300"
                  : "border-gray-200"
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
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
};

export default EditDepartment;