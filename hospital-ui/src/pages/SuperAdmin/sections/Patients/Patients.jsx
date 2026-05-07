 import React, { useState } from 'react';
import {
  Search,
  Eye,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Patients = () => {
  const navigate = useNavigate();

  const [patients] = useState([
    {
      id: 1,
      name: "Ahmed Raza",
      gender: "Male",
      age: 26,
      doctor: "Dr. James Wilson",
      appointments: 5,
      status: "Active",
    },
    {
      id: 2,
      name: "Sara Khan",
      gender: "Female",
      age: 31,
      doctor: "Dr. Sarah Jenkins",
      appointments: 3,
      status: "Active",
    },
  ]);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* Header */}
      <div className="mb-6">

        <h2 className="text-xl font-bold text-gray-900">
          Patient Management
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          View patient records, appointments and history
        </p>

      </div>

      {/* Search + Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Search */}
          <div className="relative md:col-span-2">

            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search patient..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Gender Filter */}
          <select className="px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer">
            <option>All Genders</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          {/* Status Filter */}
          <select className="px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

        </div>

      </div>

      {/* Patients Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr className="text-[11px] uppercase text-gray-400">

              <th className="px-6 py-4 text-left">Patient</th>
              <th className="px-6 py-4 text-left">Gender</th>
              <th className="px-6 py-4 text-left">Age</th>
              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-center">Appointments</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Action</th>

            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">

                {/* Name */}
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 flex items-center gap-2">

                  <User className="w-4 h-4 text-gray-400" />
                  {patient.name}

                </td>

                {/* Gender */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {patient.gender}
                </td>

                {/* Age */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {patient.age}
                </td>

                {/* Doctor */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {patient.doctor}
                </td>

                {/* Appointments */}
                <td className="px-6 py-4 text-center">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold">
                    {patient.appointments}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-center">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold">
                    {patient.status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">

                  <button
                    onClick={() => navigate(`view/${patient.id}`)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Patients;