import React, { useState } from 'react';
import { ArrowLeft, Save, Clock, Calendar, User, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SetSchedule = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    doctor: '',
    department: '',
    days: [],
    startTime: '',
    endTime: '',
    breakStart: '',
    breakEnd: '',
    slotDuration: '15',
  });

  const doctors = [
    "Dr. James Wilson",
    "Dr. Sarah Jenkins",
    "Dr. Robert Fox",
  ];

  const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
  ];

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const toggleDay = (day) => {
    setForm((prev) => {
      const exists = prev.days.includes(day);
      return {
        ...prev,
        days: exists
          ? prev.days.filter((d) => d !== day)
          : [...prev.days, day],
      };
    });
  };

  const handleSubmit = () => {
    console.log("Schedule Saved:", form);
    navigate('/dashboard/doctor-schedule');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">

      {/* Back */}
      <button
        onClick={() => navigate('/dashboard/doctor-schedule')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Card */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Set Doctor Schedule
        </h2>

        <div className="space-y-5">

          {/* Doctor */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500">
              Select Doctor
            </label>

            <div className="relative mt-1">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={form.doctor}
                onChange={(e) =>
                  setForm({ ...form, doctor: e.target.value })
                }
                className="w-full pl-10 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer"
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc}>{doc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500">
              Department
            </label>

            <div className="relative mt-1">
              <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
                className="w-full pl-10 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer"
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep}>{dep}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Days */}
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

          {/* Time */}
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

          {/* Break */}
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

          {/* Slot Duration */}
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

          {/* Save */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Schedule
          </button>

        </div>
      </div>
    </div>
  );
};

export default SetSchedule;