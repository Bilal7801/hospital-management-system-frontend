import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";

const Departments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  // ======================
  // FETCH DEPARTMENTS
  // ======================
  const fetchDepartments = async () => {
    try {
      const response = await api.get("/Department");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id) => {
    try {
      await api.delete(`/Department/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ======================
  // TOGGLE STATUS
  // ======================
  const handleToggleStatus = async (id) => {
    try {
      await api.patch(`/Department/toggle-status/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Department Management
          </h2>
          <p className="text-gray-400 mt-1 text-xs">
            Create and manage hospital departments.
          </p>
        </div>

        <button
          onClick={() => navigate("add")}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Department
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        <table className="w-full text-left">

          {/* HEAD */}
          <thead className="bg-gray-50/50">
            <tr className="text-gray-400 text-[11px] uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Department</th>
              <th className="px-6 py-4 font-semibold">Head Doctor</th>
              <th className="px-6 py-4 font-semibold text-center">Doctors</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-gray-100">

            {departments.map((dept) => (
              <tr
                key={dept.departmentId}
                className="hover:bg-gray-50 transition-colors"
              >

                {/* Department Name */}
                <td className="px-6 py-4 font-semibold text-sm text-gray-900">
                  {dept.departmentName}
                </td>

                {/* Head Doctor */}
                <td className="px-6 py-4 text-xs text-gray-600">
                  {dept.headDoctorName || (
                    <span className="text-gray-400">Not Assigned</span>
                  )}
                </td>

                {/* Doctor Count */}
                <td className="px-6 py-4 text-center">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold">
                    {dept.doctorCount || 0} Staff
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleToggleStatus(dept.departmentId)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer ${
                      dept.isActive
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {dept.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => navigate(`assign/${dept.departmentId}`)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                    >
                      <Users className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigate(`edit/${dept.departmentId}`)}
                      className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(dept.departmentId)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                </td>

              </tr>
            ))}

            {/* EMPTY STATE */}
            {departments.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-sm text-gray-400"
                >
                  No departments found
                </td>
              </tr>
            )}

          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Departments;