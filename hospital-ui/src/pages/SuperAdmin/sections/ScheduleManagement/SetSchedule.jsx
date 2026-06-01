import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save, Clock, User, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from "../../../../api/axios";

const SetSchedule = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

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
    notes: ''
  });

  const [error, setError] = useState('');

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const toggleDay = (day) => {
    setForm((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  // Fetch All Doctors
  const fetchDoctors = async () => {
    try {
      const res = await api.get('/superadmin/doctors');
      setDoctors(res.data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setDoctorsLoading(false);
    }
  };

  // Fetch Already Scheduled Doctors
  const fetchScheduledDoctors = async () => {
    try {
      const res = await api.get('/superadmin/doctor-schedule');
      const ids = (res.data?.data || []).map((s) => s.doctorId);
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
    setError('');
    
    if (!form.doctorId) {
      setError("Please select a doctor");
      return;
    }
    if (form.days.length === 0) {
      setError("Please select at least one working day");
      return;
    }
    if (!form.startTime || !form.endTime) {
      setError("Start and End time are required");
      return;
    }

    setSubmitLoading(true);

    try {
      const payload = {
        doctorId: Number(form.doctorId),
        days: form.days,
        startTime: form.startTime,
        endTime: form.endTime,
        breakStart: form.breakStart || null,
        breakEnd: form.breakEnd || null,
        slotDuration: Number(form.slotDuration),
        isActive: true,
        notes: form.notes
      };

      await api.post('/superadmin/doctor-schedule', payload);

      alert("✅ Schedule created successfully!");
      navigate('/dashboard/doctor-schedule'); // Change route as per your structure
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to create schedule";
      setError(message);
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/dashboard/doctor-schedule')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Schedules
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Set Doctor Schedule</h2>

        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Doctor Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Select Doctor</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <select
                value={form.doctorId}
                onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
                className="w-full pl-10 p-3 border border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
                disabled={doctorsLoading}
              >
                <option value="">{doctorsLoading ? "Loading doctors..." : "Select Doctor"}</option>
                {doctors.map((doc) => {
                  const isScheduled = scheduledDoctorIds.includes(doc.doctorId);
                  return (
                    <option
                      key={doc.doctorId}
                      value={doc.doctorId}
                      disabled={isScheduled}
                    >
                      {doc.doctorName} {isScheduled ? "(Already Scheduled)" : ""}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Working Days */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Working Days</label>
            <div className="flex flex-wrap gap-2">
              {weekDays.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
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

          {/* Timing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Start Time</label>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">End Time</label>
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Break Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Break Start (Optional)</label>
              <input
                type="time"
                value={form.breakStart}
                onChange={(e) => setForm({ ...form, breakStart: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Break End (Optional)</label>
              <input
                type="time"
                value={form.breakEnd}
                onChange={(e) => setForm({ ...form, breakEnd: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Slot Duration */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Slot Duration (minutes)</label>
            <select
              value={form.slotDuration}
              onChange={(e) => setForm({ ...form, slotDuration: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            >
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
              <option value="20">20 minutes</option>
              <option value="30">30 minutes</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={submitLoading || !form.doctorId || form.days.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <Save className="w-5 h-5" />
            {submitLoading ? "Saving Schedule..." : "Save Doctor Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetSchedule;