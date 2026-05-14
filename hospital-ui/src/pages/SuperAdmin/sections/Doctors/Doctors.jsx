import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, User, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  // ======================
  // FETCH DOCTORS
  // ======================
  const fetchDoctors = async () => {
    try {
      const res = await api.get("/Doctor");
      console.log("Doctors API:", res.data);
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id) => {
    try {
      await api.delete(`/Doctor/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ======================
  // TOGGLE STATUS
  // ======================
  const handleToggleStatus = async (id) => {
    try {
      await api.patch(`/Doctor/toggle-status/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Doctors Management
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage hospital doctors
          </p>
        </div>

        <button
          onClick={() => navigate("add")}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Doctor
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-[11px] text-gray-400 uppercase">
              <th className="px-6 py-4">Doctor</th>
              <th className="px-6 py-4">Specialty</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {doctors.map((doc) => (
              <tr key={doc.doctorId} className="hover:bg-gray-50">
                {/* Doctor Name + Badge */}
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />

                    <span>{doc.doctorName}</span>

                    {doc.isHeadOfDepartment ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                        Head
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                        Doctor
                      </span>
                    )}
                  </div>
                </td>

                {/* Specialty */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {doc.specialization}
                </td>

                {/* Department */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {doc.departmentName || "Not Assigned"}
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleToggleStatus(doc.doctorId)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-full cursor-pointer ${
                      doc.isActive
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {doc.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => navigate(`view/${doc.doctorId}`)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigate(`edit/${doc.doctorId}`)}
                      className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(doc.doctorId)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {doctors.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-sm text-gray-400"
                >
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Doctors;