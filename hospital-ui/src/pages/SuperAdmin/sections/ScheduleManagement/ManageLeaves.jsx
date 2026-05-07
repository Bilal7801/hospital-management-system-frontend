import React, { useState } from 'react';
import { Calendar, CheckCircle2, XCircle, Clock, Trash2 } from 'lucide-react';

const ManageLeaves = () => {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      doctor: "Dr. James Wilson",
      department: "Cardiology",
      type: "Sick Leave",
      from: "10 May 2026",
      to: "12 May 2026",
      reason: "Fever and rest required",
      status: "Pending",
    },
    {
      id: 2,
      doctor: "Dr. Sarah Jenkins",
      department: "Neurology",
      type: "Annual Leave",
      from: "15 May 2026",
      to: "20 May 2026",
      reason: "Family vacation",
      status: "Approved",
    },
    {
      id: 3,
      doctor: "Dr. Robert Fox",
      department: "Orthopedics",
      type: "Emergency Leave",
      from: "05 May 2026",
      to: "06 May 2026",
      reason: "Personal emergency",
      status: "Rejected",
    },
  ]);

  const updateStatus = (id, status) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Doctor Leaves Management
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Approve or manage doctor leave requests
        </p>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr className="text-[11px] uppercase text-gray-400">

              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">Date Range</th>
              <th className="px-6 py-4 text-left">Reason</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>

            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {leaves.map((leave) => (
              <tr key={leave.id} className="hover:bg-gray-50 transition">

                {/* Doctor */}
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {leave.doctor}
                </td>

                {/* Department */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {leave.department}
                </td>

                {/* Type */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {leave.type}
                </td>

                {/* Date Range */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {leave.from} → {leave.to}
                  </div>
                </td>

                {/* Reason */}
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                  <p className="truncate">{leave.reason}</p>
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-center">

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      leave.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-600'
                        : leave.status === 'Pending'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {leave.status}
                  </span>

                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">

                  <div className="flex justify-end gap-2">

                    {/* Approve */}
                    <button
                      onClick={() => updateStatus(leave.id, 'Approved')}
                      className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md cursor-pointer"
                      title="Approve"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    {/* Reject */}
                    <button
                      onClick={() => updateStatus(leave.id, 'Rejected')}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer"
                      title="Reject"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
                      title="Delete"
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

export default ManageLeaves;