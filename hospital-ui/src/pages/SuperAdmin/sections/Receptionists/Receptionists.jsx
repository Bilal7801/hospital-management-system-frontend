import React, { useState } from 'react';
import { Plus, Edit2, Trash2, User, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Receptionists = () => {
  const navigate = useNavigate();

  const [receptionists] = useState([
    {
      id: 1,
      name: "Ayesha Khan",
      email: "ayesha@hospital.com",
      shift: "Morning",
      status: "Active",
    },
    {
      id: 2,
      name: "Ali Raza",
      email: "ali@hospital.com",
      shift: "Evening",
      status: "Active",
    },
  ]);

  const handleDelete = (id) => {
    console.log("Delete receptionist:", id);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Receptionists Management
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage hospital reception staff
          </p>
        </div>

        <button
          onClick={() => navigate("add")}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Receptionist
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr className="text-[11px] text-gray-400 uppercase">
              <th className="px-6 py-4">Receptionist</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Shift</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {receptionists.map((rec) => (
              <tr key={rec.id} className="hover:bg-gray-50">

                <td className="px-6 py-4 text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  {rec.name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {rec.email}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {rec.shift}
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-50 text-emerald-600">
                    {rec.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => navigate(`view/${rec.id}`)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigate(`edit/${rec.id}`)}
                      className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(rec.id)}
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

export default Receptionists;