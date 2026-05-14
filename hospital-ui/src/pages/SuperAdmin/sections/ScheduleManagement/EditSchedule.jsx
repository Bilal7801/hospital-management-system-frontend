import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Clock, User } from 'lucide-react';
import api from "../../../../api/axios";

const EditSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    doctorId: 0,
    doctor: '',
    department: '',
    days: [],
    startTime: '',
    endTime: '',
    breakStart: '',
    breakEnd: '',
    slotDuration: 15,
    status: 'Active',
  });

  const daysList = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const formatTimeForInput = (timeString) => {
    if (!timeString) return '';
    return String(timeString).slice(0, 5);
  };

  const fetchSchedule = async () => {
    try {
      const response = await api.get(`/DoctorSchedule/${id}`);
      const data = response.data;

      setFormData({
        doctorId: data.doctorId || 0,
        doctor: data.doctorName || '',
        department: data.departmentName || '',
        days: data.workingDays
          ? String(data.workingDays).split(',').map((d) => d.trim())
          : [],
        startTime: formatTimeForInput(data.startTime),
        endTime: formatTimeForInput(data.endTime),
        breakStart: formatTimeForInput(data.breakStart),
        breakEnd: formatTimeForInput(data.breakEnd),
        slotDuration: data.slotDuration || 15,
        status: data.isActive ? 'Active' : 'Inactive',
      });
    } catch (error) {
      console.error('Failed to fetch schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [id]);

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'slotDuration' ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        doctorId: formData.doctorId,
        days: formData.days,
        startTime: formData.startTime,
        endTime: formData.endTime,
        breakStart: formData.breakStart,
        breakEnd: formData.breakEnd,
        slotDuration: Number(formData.slotDuration),
        isActive: formData.status === 'Active',
      };

      await api.put(`/DoctorSchedule/${id}`, payload);

      alert('Schedule updated successfully');
      navigate('/dashboard/doctor-schedule');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update schedule');
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400">
        Loading schedule...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">
      <button
        onClick={() => navigate('/dashboard/doctor-schedule')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Edit Schedule #{id}
        </h2>

        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Doctor Name
          </label>
          <input
            value={formData.doctor}
            disabled
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl bg-gray-50 text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Department
          </label>
          <input
            value={formData.department}
            disabled
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl bg-gray-50 text-sm"
          />
        </div>

        <div className="mb-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase mb-3 block">
            Working Days
          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {daysList.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(day)}
                className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                  formData.days.includes(day)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              <Clock className="w-4 h-4 inline mr-1" />
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              Break Start
            </label>
            <input
              type="time"
              name="breakStart"
              value={formData.breakStart}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              Break End
            </label>
            <input
              type="time"
              name="breakEnd"
              value={formData.breakEnd}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Slot Duration
          </label>
          <input
            type="number"
            name="slotDuration"
            value={formData.slotDuration}
            onChange={handleInputChange}
            min="5"
            step="5"
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl"
          />
        </div>

        <div className="mb-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Status
          </label>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, status: 'Active' }))
              }
              className={`flex-1 py-2.5 rounded-xl border-2 ${
                formData.status === 'Active'
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-600'
                  : 'border-gray-200'
              }`}
            >
              Active
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, status: 'Inactive' }))
              }
              className={`flex-1 py-2.5 rounded-xl border-2 ${
                formData.status === 'Inactive'
                  ? 'bg-gray-100 border-gray-600 text-gray-600'
                  : 'border-gray-200'
              }`}
            >
              Inactive
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditSchedule;