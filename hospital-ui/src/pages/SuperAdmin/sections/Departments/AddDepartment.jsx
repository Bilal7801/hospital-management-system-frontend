import React, { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";

const AddDepartment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    departmentName: "",
    departmentHead: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.departmentName || !formData.departmentHead) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/Department", formData);

      alert("Department created successfully");
      navigate("/dashboard/departments");
    } catch (error) {
      console.error("Create department failed:", error);
      alert("Failed to create department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/departments")}
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
            name="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="Enter department name"
          />
        </div>

        {/* Head Doctor */}
        <div className="mb-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Head Doctor
          </label>
          <input
            name="departmentHead"
            value={formData.departmentHead}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="Enter department head"
          />
        </div>

        {/* Create Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? "Creating..." : "Create Department"}
        </button>
      </div>
    </div>
  );
};

export default AddDepartment;