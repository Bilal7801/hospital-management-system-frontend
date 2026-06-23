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
    email: "",
    specialization: "",
    qualification: "",
    consultationFee: "",
    departmentId: "",
    isActive: true,
  });

  // Fetch Departments
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

  // Handle Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Toggle Status
  const toggleStatus = (status) => {
    setFormData((prev) => ({
      ...prev,
      isActive: status,
    }));
  };

  // Submit Doctor
  const handleSubmit = async () => {
    if (!formData.email) {
      alert("Email is required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/superadmin/doctors", {
        doctorName: formData.doctorName,
        email: formData.email,
        specialization: formData.specialization,
        qualification: formData.qualification,
        consultationFee: Number(formData.consultationFee) || 0,
        departmentId: formData.departmentId ? Number(formData.departmentId) : null,
        isActive: formData.isActive,
      });

      alert("Doctor added successfully! Activation email sent.");
      navigate("/dashboard/doctors");
    } catch (error) {
      console.error("Add doctor failed:", error);
      alert(error.response?.data?.message || "Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen">
      <button
        onClick={() => navigate("/dashboard/doctors")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Doctors
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add Doctor</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              Doctor Name
            </label>
            <input
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Enter doctor name"
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="doctor@example.com"
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              Specialization
            </label>
            <input
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="e.g. Cardiology"
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              Qualification
            </label>
            <input
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="MBBS, FCPS"
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              Consultation Fee
            </label>
            <input
              type="number"
              name="consultationFee"
              value={formData.consultationFee}
              onChange={handleChange}
              placeholder="2500"
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
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
                <option key={dept.departmentId} value={dept.departmentId}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Status
          </label>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => toggleStatus(true)}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl border ${
                formData.isActive
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-white border-gray-300"
              }`}
            >
              Active
            </button>

            <button
              type="button"
              onClick={() => toggleStatus(false)}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl border ${
                !formData.isActive
                  ? "bg-gray-100 text-gray-600 border-gray-300"
                  : "bg-white border-gray-300"
              }`}
            >
              Inactive
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-8 bg-blue-600 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? "Saving Doctor..." : "Save & Send Activation Email"}
        </button>
      </div>
    </div>
  );
};

export default AddDoctor;