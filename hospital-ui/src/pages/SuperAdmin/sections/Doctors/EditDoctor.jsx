import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import api from "../../../../api/axios";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    doctorName: "",
    specialization: "",
    qualification: "",
    consultationFee: "",
    email: "",
    departmentId: "",
    isActive: true,
  });

  // Fetch Doctor Details
  const fetchDoctor = async () => {
    try {
      const res = await api.get(`/superadmin/doctors/${id}`);
      const data = res.data;

      setFormData({
        doctorName: data.doctorName || data.DoctorName || "",
        specialization: data.specialization || data.Specialization || "",
        qualification: data.qualification || data.Qualification || "",
        consultationFee: data.consultationFee || data.ConsultationFee || "",
        email: data.email || data.Email || "",
        departmentId: data.departmentId || data.DepartmentId || "",
        isActive: data.isActive !== undefined ? data.isActive : true,
      });
    } catch (error) {
      console.error("Error fetching doctor:", error);
      alert("Failed to load doctor details");
    } finally {
      setLoading(false);
    }
  };

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
    fetchDoctor();
    fetchDepartments();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleStatus = (status) => {
    setFormData((prev) => ({
      ...prev,
      isActive: status,
    }));
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);

      await api.put(`/superadmin/doctors/${id}`, {
        doctorName: formData.doctorName,
        specialization: formData.specialization,
        qualification: formData.qualification,
        consultationFee: Number(formData.consultationFee) || 0,
        email: formData.email,
        departmentId: formData.departmentId ? Number(formData.departmentId) : null,
        isActive: formData.isActive,
      });

      alert("Doctor updated successfully!");
      navigate("/dashboard/doctors");
    } catch (error) {
      console.error("Update failed:", error);
      alert(error.response?.data?.message || "Failed to update doctor");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading doctor details...</div>;
  }

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
        <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Doctor</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Doctor Name</label>
            <input
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Specialization</label>
            <input
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Qualification</label>
            <input
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Consultation Fee</label>
            <input
              type="number"
              name="consultationFee"
              value={formData.consultationFee}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">Department</label>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm"
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

        {/* Status */}
        <div className="mt-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">Status</label>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => toggleStatus(true)}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl border ${
                formData.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-white border-gray-300"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => toggleStatus(false)}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl border ${
                !formData.isActive ? "bg-gray-100 text-gray-600" : "bg-white border-gray-300"
              }`}
            >
              Inactive
            </button>
          </div>
        </div>

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="w-full mt-8 bg-blue-600 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditDoctor;