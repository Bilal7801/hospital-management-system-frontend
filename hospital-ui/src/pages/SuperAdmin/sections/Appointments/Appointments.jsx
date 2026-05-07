import React, { useState } from 'react';
import {
  CalendarDays,
  Search,
  Eye,
  Edit2,
  Trash2,
  Plus,
  Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const navigate = useNavigate();

  const [appointments] = useState([
    {
      id: 1,
      patient: "Ahmed Raza",
      doctor: "Dr. James Wilson",
      department: "Cardiology",
      date: "12 May 2026",
      time: "10:30 AM",
      status: "Completed",
    },
    {
      id: 2,
      patient: "Sara Khan",
      doctor: "Dr. Sarah Jenkins",
      department: "Neurology",
      date: "18 May 2026",
      time: "02:00 PM",
      status: "Upcoming",
    },
    {
      id: 3,
      patient: "Ali Hamza",
      doctor: "Dr. Robert Fox",
      department: "Orthopedics",
      date: "20 May 2026",
      time: "11:15 AM",
      status: "Cancelled",
    },
  ]);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Appointments Management
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            SuperAdmin monitoring of all hospital appointments
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard/appointments/add')}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Appointment
        </button>

      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">

        <div className="relative">

          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search patient or doctor..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none"
          />

        </div>

      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr className="text-[11px] uppercase text-gray-400">

              <th className="px-6 py-4 text-left">Patient</th>
              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Date & Time</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>

            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {appointments.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">

                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {app.patient}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {app.doctor}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {app.department}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-gray-400" />
                    {app.date}

                    <Clock className="w-4 h-4 text-gray-400 ml-2" />
                    {app.time}
                  </div>
                </td>

                <td className="px-6 py-4 text-center">

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      app.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-600'
                        : app.status === 'Upcoming'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {app.status}
                  </span>

                </td>

                <td className="px-6 py-4 text-right">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => navigate(`/dashboard/appointments/view/${app.id}`)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigate(`/dashboard/appointments/edit/${app.id}`)}
                      className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer">
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

export default Appointments;