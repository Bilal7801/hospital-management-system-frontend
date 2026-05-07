import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Calendar, Clock, User, Building2, PauseCircle } from 'lucide-react';

const ViewSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data (later replace with API by id)
  const schedule = {
    id,
    doctor: "Dr. James Wilson",
    department: "Cardiology",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    startTime: "09:00 AM",
    endTime: "03:00 PM",
    breakStart: "01:00 PM",
    breakEnd: "01:30 PM",
    slotDuration: "15 min",
    status: "Active",
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">

      {/* Back */}
      <button
        onClick={() => navigate('/dashboard/doctor-schedule')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Schedules
      </button>

      {/* Header Card */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div>

            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              {schedule.doctor}
            </h2>

            <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              {schedule.department}
            </p>

          </div>

          <div className="flex gap-2">

            <button
              onClick={() => navigate(`/dashboard/doctor-schedule/edit/${id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl text-sm font-semibold hover:bg-amber-100 cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>

            <button
              onClick={() => navigate(`/dashboard/doctor-schedule/slot-preview/${id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              View Slots
            </button>

          </div>

        </div>

      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

        {/* Working Days */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <h3 className="text-xs uppercase text-gray-400 font-semibold mb-3">
            Working Days
          </h3>

          <div className="flex flex-wrap gap-2">
            {schedule.days.map((day) => (
              <span
                key={day}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold"
              >
                {day}
              </span>
            ))}
          </div>

        </div>

        {/* Status */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <h3 className="text-xs uppercase text-gray-400 font-semibold mb-3">
            Status
          </h3>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              schedule.status === 'Active'
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {schedule.status}
          </span>

        </div>

      </div>

      {/* Time Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <p className="text-[11px] uppercase text-gray-400 font-semibold">
            Working Time
          </p>

          <p className="text-sm font-bold text-gray-900 mt-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            {schedule.startTime} - {schedule.endTime}
          </p>

        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <p className="text-[11px] uppercase text-gray-400 font-semibold">
            Break Time
          </p>

          <p className="text-sm font-bold text-gray-900 mt-2 flex items-center gap-2">
            <PauseCircle className="w-4 h-4 text-gray-400" />
            {schedule.breakStart} - {schedule.breakEnd}
          </p>

        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <p className="text-[11px] uppercase text-gray-400 font-semibold">
            Slot Duration
          </p>

          <p className="text-sm font-bold text-gray-900 mt-2">
            {schedule.slotDuration}
          </p>

        </div>

      </div>

    </div>
  );
};

export default ViewSchedule;