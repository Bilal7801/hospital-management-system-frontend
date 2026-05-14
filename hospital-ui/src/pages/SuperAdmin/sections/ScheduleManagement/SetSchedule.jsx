import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from "../../../../api/axios";

const SetSchedule = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [doctorsLoading, setDoctorsLoading] = useState(true);

  const [doctors, setDoctors] = useState([]);
  const [scheduledDoctorIds, setScheduledDoctorIds] = useState([]);

  const [form, setForm] = useState({
    doctorId: '',
    days: [],
    startTime: '',
    endTime: '',
    breakStart: '',
    breakEnd: '',
    slotDuration: 15,
  });

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const toggleDay = (day) => {
    setForm((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/Doctor');
      const activeDoctors = (res.data || []).filter((d) => d.isActive);
      setDoctors(activeDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setDoctorsLoading(false);
    }
  };

  const fetchScheduledDoctors = async () => {
    try {
      const res = await api.get('/DoctorSchedule');
      const ids = (res.data || []).map((s) => s.doctorId);
      setScheduledDoctorIds(ids);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchScheduledDoctors();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!form.doctorId) {
        alert("Please select a doctor");
        return;
      }

      if (form.days.length === 0) {
        alert("Please select at least one working day");
        return;
      }

      const payload = {
        doctorId: Number(form.doctorId),
        days: form.days,
        startTime: form.startTime,
        endTime: form.endTime,
        breakStart: form.breakStart,
        breakEnd: form.breakEnd,
        slotDuration: Number(form.slotDuration),
        isActive: true,
      };

      await api.post('/DoctorSchedule', payload);

      alert("Schedule created successfully");
      navigate('/dashboard/doctor-schedule');
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Failed to create schedule";

      console.error("Error creating schedule:", error);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">
      <button
        onClick={() => navigate('/dashboard/doctor-schedule')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Set Doctor Schedule
        </h2>

        <div className="space-y-5">
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500">
              Select Doctor
            </label>

            <div className="relative mt-1">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={form.doctorId}
                onChange={(e) =>
                  setForm({ ...form, doctorId: e.target.value })
                }
                className="w-full pl-10 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer"
                disabled={doctorsLoading}
              >
                <option value="">
                  {doctorsLoading ? "Loading doctors..." : "Select Doctor"}
                </option>

                {doctors.map((doc) => {
                  const isScheduled = scheduledDoctorIds.includes(doc.doctorId);

                  return (
                    <option
                      key={doc.doctorId}
                      value={doc.doctorId}
                      disabled={isScheduled}
                    >
                      {doc.doctorName}{isScheduled ? " (Already Scheduled)" : ""}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500">
              Working Days
            </label>

            <div className="flex flex-wrap gap-2 mt-2">
              {weekDays.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                    form.days.includes(day)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-1">
              Timing
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase font-semibold text-gray-500">
                  Start Time
                </label>
                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) =>
                    setForm({ ...form, startTime: e.target.value })
                  }
                  className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase font-semibold text-gray-500">
                  End Time
                </label>
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) =>
                    setForm({ ...form, endTime: e.target.value })
                  }
                  className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-1">
              Break Time
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase font-semibold text-gray-500">
                  Break Start
                </label>
                <input
                  type="time"
                  value={form.breakStart}
                  onChange={(e) =>
                    setForm({ ...form, breakStart: e.target.value })
                  }
                  className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase font-semibold text-gray-500">
                  Break End
                </label>
                <input
                  type="time"
                  value={form.breakEnd}
                  onChange={(e) =>
                    setForm({ ...form, breakEnd: e.target.value })
                  }
                  className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500">
              Appointment Slot Duration (minutes)
            </label>

            <div className="relative mt-1">
              <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={form.slotDuration}
                onChange={(e) =>
                  setForm({ ...form, slotDuration: e.target.value })
                }
                className="w-full pl-10 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer"
              >
                <option value="10">10 min</option>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Save Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetSchedule;