import React, { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";

const AddDepartment = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doctorLoading, setDoctorLoading] = useState(true);

  const [formData, setFormData] = useState({
    departmentName: "",
    headDoctorId: "",
  });

  const fetchDoctors = async () => {
    try {
      setDoctorLoading(true);
      const res = await api.get("/Doctor");
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setDoctorLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.departmentName) {
      alert("Department name required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/Department", {
        departmentName: formData.departmentName,
        headDoctorId: formData.headDoctorId
          ? parseInt(formData.headDoctorId)
          : null,
      });

      alert("Department created successfully");
      navigate("/dashboard/departments");
    } catch (error) {
      console.error("Create failed:", error);
      alert("Failed to create department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen">
      <button
        onClick={() => navigate("/dashboard/departments")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Create Department
        </h2>

        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Department Name
          </label>
          <input
            name="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
            placeholder="Enter department name"
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mb-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Head Doctor
          </label>

          <select
            name="headDoctorId"
            value={formData.headDoctorId}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              {doctorLoading ? "Loading doctors..." : "Select Head Doctor"}
            </option>

            {doctors.map((doctor) => (
              <option key={doctor.doctorId} value={doctor.doctorId}>
                {doctor.doctorName}
              </option>
            ))}
          </select>

          {!doctorLoading && doctors.length === 0 && (
            <p className="text-xs text-rose-500 mt-2">
              No doctors found. Please add a doctor first.
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {loading ? "Creating..." : "Create Department"}
        </button>
      </div>
    </div>
  );
};

export default AddDepartment;