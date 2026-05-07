import React from 'react';
import {
  ArrowLeft,
  User,
  CalendarDays,
  Clock,
  Stethoscope,
  Building2,
  Activity,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dummy Data
  const appointment = {
    id,
    patient: "Ahmed Raza",
    doctor: "Dr. James Wilson",
    department: "Cardiology",
    date: "12 May 2026",
    time: "10:30 AM",
    status: "Completed",
    notes: "Patient showed improvement after medication.",
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">

      {/* Back */}
      <button
        onClick={() => navigate('/dashboard/appointments')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Card */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Appointment Details #{appointment.id}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Patient */}
          <div className="border border-gray-100 rounded-xl p-4">

            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-blue-600" />
              <p className="text-sm font-semibold">Patient</p>
            </div>

            <p className="text-sm text-gray-700">{appointment.patient}</p>

          </div>

          {/* Doctor */}
          <div className="border border-gray-100 rounded-xl p-4">

            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="w-4 h-4 text-emerald-600" />
              <p className="text-sm font-semibold">Doctor</p>
            </div>

            <p className="text-sm text-gray-700">{appointment.doctor}</p>

          </div>

          {/* Department */}
          <div className="border border-gray-100 rounded-xl p-4">

            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-purple-600" />
              <p className="text-sm font-semibold">Department</p>
            </div>

            <p className="text-sm text-gray-700">{appointment.department}</p>

          </div>

          {/* Date & Time */}
          <div className="border border-gray-100 rounded-xl p-4">

            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="w-4 h-4 text-blue-600" />
              <p className="text-sm font-semibold">Schedule</p>
            </div>

            <p className="text-sm text-gray-700">
              {appointment.date} • {appointment.time}
            </p>

          </div>

          {/* Status */}
          <div className="border border-gray-100 rounded-xl p-4">

            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-rose-600" />
              <p className="text-sm font-semibold">Status</p>
            </div>

            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold">
              {appointment.status}
            </span>

          </div>

          {/* Notes */}
          <div className="border border-gray-100 rounded-xl p-4 md:col-span-2">

            <p className="text-sm font-semibold mb-2">Doctor Notes</p>
            <p className="text-sm text-gray-700">{appointment.notes}</p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;