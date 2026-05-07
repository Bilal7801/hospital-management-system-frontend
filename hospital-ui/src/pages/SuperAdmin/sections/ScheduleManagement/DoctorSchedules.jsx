import React, { useState } from 'react';
import { Plus, Calendar, Eye, Edit2, Trash2, Clock, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorSchedules = () => {
  const navigate = useNavigate();

  const [schedules] = useState([
    {
      id: 1,
      doctor: "Dr. James Wilson",
      department: "Cardiology",
      days: "Mon - Fri",
      time: "09:00 AM - 03:00 PM",
      break: "01:00 - 01:30 PM",
      slot: "15 min",
      status: "Active",
    },
    {
      id: 2,
      doctor: "Dr. Sarah Jenkins",
      department: "Neurology",
      days: "Mon - Thu",
      time: "10:00 AM - 04:00 PM",
      break: "01:00 - 02:00 PM",
      slot: "30 min",
      status: "Active",
    },
    {
      id: 3,
      doctor: "Dr. Robert Fox",
      department: "Orthopedics",
      days: "Tue - Sat",
      time: "11:00 AM - 05:00 PM",
      break: "02:00 - 02:30 PM",
      slot: "15 min",
      status: "Inactive",
    },
  ]);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Doctor Schedule Management
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage working hours, available days, breaks and appointment slots
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate('/dashboard/doctor-schedule/manage-leave')}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
          >
            Manage Leaves
          </button>

          <button
            onClick={() => navigate('/dashboard/doctor-schedule/set-schedule')}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Set Schedule
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
            Total Schedules
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {schedules.length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
            Active
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {schedules.filter((s) => s.status === 'Active').length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
            Slot System
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            Ready
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr className="text-[11px] uppercase tracking-wider text-gray-400">
              <th className="px-6 py-4 text-left font-semibold">Doctor</th>
              <th className="px-6 py-4 text-left font-semibold">Department</th>
              <th className="px-6 py-4 text-left font-semibold">Working Days</th>
              <th className="px-6 py-4 text-left font-semibold">Time</th>
              <th className="px-6 py-4 text-left font-semibold">Break</th>
              <th className="px-6 py-4 text-left font-semibold">Slot</th>
              <th className="px-6 py-4 text-center font-semibold">Status</th>
              <th className="px-6 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {schedules.map((sch) => (
              <tr key={sch.id} className="hover:bg-gray-50 transition-colors">

                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {sch.doctor}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    {sch.department}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {sch.days}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {sch.time}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {sch.break}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {sch.slot}
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      sch.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {sch.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => navigate(`/dashboard/doctor-schedule/view-schedule/${sch.id}`)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-all cursor-pointer"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigate(`/dashboard/doctor-schedule/edit/${sch.id}`)}
                      className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md transition-all cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-all cursor-pointer"
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

export default DoctorSchedules;