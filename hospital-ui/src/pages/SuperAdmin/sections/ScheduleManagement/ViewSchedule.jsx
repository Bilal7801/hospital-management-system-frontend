import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Calendar,
  Clock,
  User,
  Building2,
  PauseCircle,
} from 'lucide-react';
import api from '../../../../api/axios';

const ViewSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatTime = (time) => {
    if (!time) return '--:--';
    return String(time).slice(0, 5); // Convert TimeSpan to HH:mm
  };

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get(`/superadmin/doctor-schedule/${id}`);
      const data = res.data?.data || res.data;

      if (!data) {
        throw new Error("Schedule data not found");
      }

      setSchedule({
        id: data.scheduleId,
        doctorId: data.doctorId,
        doctor: data.doctorName || 'Unknown Doctor',
        department: data.departmentName || 'N/A',
        days: data.workingDays 
          ? String(data.workingDays).split(',').map(d => d.trim()) 
          : [],
        startTime: formatTime(data.startTime),
        endTime: formatTime(data.endTime),
        breakStart: formatTime(data.breakStart),
        breakEnd: formatTime(data.breakEnd),
        slotDuration: data.slotDuration || 15,
        status: data.isActive ? 'Active' : 'Inactive',
        createdAt: data.createdAt,
      });
    } catch (err) {
      console.error('Failed to load schedule:', err);
      setError("Failed to load schedule details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchSchedule();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="text-gray-500 mt-3">Loading schedule...</p>
      </div>
    );
  }

  if (error || !schedule) {
    return (
      <div className="p-10 text-center text-red-500">
        {error || "Schedule not found"}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">

      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/doctor-schedule')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Schedules
      </button>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <User className="w-5 h-5 text-blue-600" />
              {schedule.doctor}
            </h2>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              {schedule.department}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/dashboard/doctor-schedule/edit/${id}`)}
              className="flex items-center gap-2 px-5 py-2 bg-amber-50 text-amber-600 rounded-xl text-sm font-semibold hover:bg-amber-100 transition cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
              Edit Schedule
            </button>

            <button
              onClick={() => navigate(`/dashboard/doctor-schedule/slot-preview/${id}`)}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              View Available Slots
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Working Days */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-xs uppercase font-semibold text-gray-500 mb-4">Working Days</h3>
          <div className="flex flex-wrap gap-2">
            {schedule.days.length > 0 ? (
              schedule.days.map((day) => (
                <span
                  key={day}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium"
                >
                  {day}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No days selected</p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-xs uppercase font-semibold text-gray-500 mb-4">Schedule Status</h3>
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              schedule.status === 'Active'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {schedule.status}
          </span>
        </div>

      </div>

      {/* Timing Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="text-xs uppercase font-semibold text-gray-500 mb-1">Working Hours</p>
          <p className="text-lg font-bold text-gray-900 mt-2 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            {schedule.startTime} - {schedule.endTime}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="text-xs uppercase font-semibold text-gray-500 mb-1">Break Time</p>
          <p className="text-lg font-bold text-gray-900 mt-2 flex items-center gap-2">
            <PauseCircle className="w-5 h-5 text-gray-400" />
            {schedule.breakStart && schedule.breakEnd 
              ? `${schedule.breakStart} - ${schedule.breakEnd}` 
              : 'No Break'}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="text-xs uppercase font-semibold text-gray-500 mb-1">Slot Duration</p>
          <p className="text-lg font-bold text-gray-900 mt-2">
            {schedule.slotDuration} minutes
          </p>
        </div>
      </div>

    </div>
  );
};

export default ViewSchedule;