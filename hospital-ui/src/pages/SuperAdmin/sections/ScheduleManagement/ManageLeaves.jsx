import React, { useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Trash2,
  Plus,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from "../../../../api/axios";

const ManageLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();

  const fetchLeaves = async () => {
    try {
      const res = await api.get('/DoctorLeave');
      setLeaves(res.data || []);
    } catch (err) {
      console.error("Failed to load leaves:", err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/DoctorLeave/${id}/${status}`);

      setLeaves((prev) =>
        prev.map((leave) =>
          leave.leaveId === id ? { ...leave, status } : leave
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const deleteLeave = async (id) => {
    const confirmDelete = window.confirm("Delete this leave request?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/DoctorLeave/${id}`);
      setLeaves((prev) => prev.filter((leave) => leave.leaveId !== id));
    } catch (err) {
      console.error("Failed to delete leave:", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* Back + Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard/doctor-schedule')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Doctor Leaves Management
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Approve or manage doctor leave requests
            </p>
          </div>

          <button
            onClick={() => navigate('/dashboard/doctor-schedule/add-leave')}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl font-semibold hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Add Leave
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {leaves.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
          <p className="text-gray-500 text-sm">No leave requests found</p>

          <button
            onClick={() => navigate('/dashboard/doctor-schedule/add-leave')}
            className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Create First Leave
          </button>
        </div>
      ) : (
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
                <tr key={leave.leaveId} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {leave.doctorName}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {leave.departmentName}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {leave.leaveType}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {leave.fromDate} → {leave.toDate}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                    <p className="truncate">{leave.reason}</p>
                  </td>

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

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => updateStatus(leave.leaveId, 'Approved')}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md cursor-pointer"
                        title="Approve"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => updateStatus(leave.leaveId, 'Rejected')}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer"
                        title="Reject"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteLeave(leave.leaveId)}
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
      )}
    </div>
  );
};

export default ManageLeaves;