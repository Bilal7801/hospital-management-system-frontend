import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Departments = () => {
  const navigate = useNavigate();

  const [departments] = useState([
    {
      id: 1,
      name: "Cardiology",
      doctors: ["Dr. James", "Dr. Wilson"],
      head: "Dr. James Wilson",
      status: "Active",
    },
    {
      id: 2,
      name: "Neurology",
      doctors: ["Dr. Sarah"],
      head: "Dr. Sarah Jenkins",
      status: "Active",
    },
  ]);

  const handleDelete = (id) => {
    console.log("Delete department:", id);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* Header */}
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

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        <table className="w-full text-left">

          {/* Head */}
          <thead className="bg-gray-50/50">
            <tr className="text-gray-400 text-[11px] uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Department</th>
              <th className="px-6 py-4 font-semibold">Head</th>
              <th className="px-6 py-4 font-semibold text-center">Doctors</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">

            {departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-gray-50 transition-colors">

                <td className="px-6 py-4 font-semibold text-sm text-gray-900">
                  {dept.name}
                </td>

                <td className="px-6 py-4 text-xs text-gray-600">
                  {dept.head}
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold">
                    {dept.doctors.length} Staff
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      dept.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {dept.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 cursor-pointer">

                    <button
                      onClick={() => navigate(`assign/${dept.id}`)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                    >
                      <Users className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigate(`edit/${dept.id}`)}
                      className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Departments;