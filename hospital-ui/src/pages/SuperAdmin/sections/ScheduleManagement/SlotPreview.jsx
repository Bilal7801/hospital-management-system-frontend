import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, User, ArrowLeft } from 'lucide-react';
import api from "../../../../api/axios";

const SlotPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatTimeForInput = (time) => {
    if (!time) return '';
    return String(time).slice(0, 5);
  };

  const fetchSchedule = async () => {
    try {
      const res = await api.get(`/DoctorSchedule/${id}`);
      const data = res.data;

      setSchedule({
        doctor: data.doctorName || 'N/A',
        department: data.departmentName || 'N/A',
        startTime: formatTimeForInput(data.startTime),
        endTime: formatTimeForInput(data.endTime),
        breakStart: formatTimeForInput(data.breakStart),
        breakEnd: formatTimeForInput(data.breakEnd),
        slotDuration: data.slotDuration || 15,
      });
    } catch (error) {
      console.error("Failed to load schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [id]);

  const toMinutes = (time) => {
    if (!time) return 0;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const toTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const slots = useMemo(() => {
    if (!schedule) return [];

    const start = toMinutes(schedule.startTime);
    const end = toMinutes(schedule.endTime);
    const breakS = toMinutes(schedule.breakStart);
    const breakE = toMinutes(schedule.breakEnd);

    const result = [];

    for (let t = start; t < end; t += Number(schedule.slotDuration)) {
      const slotEnd = t + Number(schedule.slotDuration);

      // Skip slots that overlap with break time
      const overlapsBreak =
        (t >= breakS && t < breakE) ||
        (slotEnd > breakS && slotEnd <= breakE) ||
        (t <= breakS && slotEnd >= breakE);

      if (overlapsBreak) continue;

      result.push({
        start: toTime(t),
        end: toTime(slotEnd),
        status: "Available",
      });
    }

    return result;
  }, [schedule]);

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="text-center text-gray-400 text-sm py-10">
          Loading slot preview...
        </div>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/dashboard/doctor-schedule')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center text-red-400 text-sm py-10">
          Schedule not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Back */}
      <button
        onClick={() => navigate('/dashboard/doctor-schedule')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Slot Preview
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          Auto-generated appointment slots based on schedule
        </p>
      </div>

      {/* Doctor Info Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>

            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {schedule.doctor}
              </p>

              <p className="text-xs text-gray-400">
                {schedule.department}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {schedule.startTime} - {schedule.endTime}
            </span>

            <span className="flex items-center gap-1">
              Break: {schedule.breakStart} - {schedule.breakEnd}
            </span>

            <span className="flex items-center gap-1">
              Slot: {schedule.slotDuration} min
            </span>
          </div>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-3 bg-white hover:bg-blue-50 transition-all cursor-pointer"
          >
            <p className="text-xs font-semibold text-gray-900">
              {slot.start} - {slot.end}
            </p>

            <p className="text-[11px] text-emerald-600 mt-1 font-semibold">
              {slot.status}
            </p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {slots.length === 0 && (
        <div className="text-center text-gray-400 text-sm mt-10">
          No slots available for this schedule
        </div>
      )}
    </div>
  );
};

export default SlotPreview;