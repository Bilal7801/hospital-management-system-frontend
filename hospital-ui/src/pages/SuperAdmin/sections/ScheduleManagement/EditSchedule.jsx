import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Clock, User, AlertCircle } from 'lucide-react';
import api from "../../../../api/axios";

const EditSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

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
    notes: ''
  });

  const daysList = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const formatTimeForInput = (timeString) => {
    if (!timeString) return '';
    return String(timeString).slice(0, 5);
  };

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get(`/superadmin/doctor-schedule/${id}`);
      const data = response.data?.data || response.data;

      if (!data) throw new Error("Schedule not found");

      setFormData({
        doctorId: data.doctorId || 0,
        doctor: data.doctorName || '',
        department: data.departmentName || '',
        days: data.workingDays 
          ? String(data.workingDays).split(',').map(d => d.trim())
          : [],
        startTime: formatTimeForInput(data.startTime),
        endTime: formatTimeForInput(data.endTime),
        breakStart: formatTimeForInput(data.breakStart),
        breakEnd: formatTimeForInput(data.breakEnd),
        slotDuration: data.slotDuration || 15,
        status: data.isActive ? 'Active' : 'Inactive',
        notes: data.notes || ''
      });
    } catch (err) {
      console.error('Failed to fetch schedule:', err);
      setError("Failed to load schedule details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchSchedule();
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
    if (!formData.days.length) {
      setError("Please select at least one working day");
      return;
    }

    setSaving(true);
    setError('');

    try {
      const payload = {
        doctorId: formData.doctorId,
        days: formData.days,
        startTime: formData.startTime,
        endTime: formData.endTime,
        breakStart: formData.breakStart || null,
        breakEnd: formData.breakEnd || null,
        slotDuration: Number(formData.slotDuration),
        isActive: formData.status === 'Active',
        notes: formData.notes
      };

      await api.put(`/superadmin/doctor-schedule/${id}`, payload);

      alert('✅ Schedule updated successfully!');
      navigate('/dashboard/doctor-schedule');
    } catch (error) {
      console.error('Update failed:', error);
      setError(error?.response?.data?.message || "Failed to update schedule");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading schedule...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">
      <button
        onClick={() => navigate('/dashboard/doctor-schedule')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Schedules
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Edit Schedule
        </h2>

        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Doctor Info (Read Only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500">Doctor Name</label>
              <input value={formData.doctor} disabled className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500">Department</label>
              <input value={formData.department} disabled className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
            </div>
          </div>

          {/* Working Days */}
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-3 block">Working Days</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {daysList.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayToggle(day)}
                  className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    formData.days.includes(day)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              <label className="text-xs font-semibold text-gray-500">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          {/* Break Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500">Break Start (Optional)</label>
              <input
                type="time"
                name="breakStart"
                value={formData.breakStart}
                onChange={handleInputChange}
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500">Break End (Optional)</label>
              <input
                type="time"
                name="breakEnd"
                value={formData.breakEnd}
                onChange={handleInputChange}
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          {/* Slot Duration & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500">Slot Duration (minutes)</label>
              <select
                name="slotDuration"
                value={formData.slotDuration}
                onChange={handleInputChange}
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl"
              >
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="20">20 minutes</option>
                <option value="30">30 minutes</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500">Status</label>
              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, status: 'Active' }))}
                  className={`flex-1 py-2.5 rounded-xl border-2 font-medium cursor-pointer ${
                    formData.status === 'Active' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-gray-200'
                  }`}
                >
                  Active
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, status: 'Inactive' }))}
                  className={`flex-1 py-2.5 rounded-xl border-2 font-medium cursor-pointer ${
                    formData.status === 'Inactive' ? 'border-gray-600 bg-gray-100 text-gray-700' : 'border-gray-200'
                  }`}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 mt-4 cursor-pointer"
          >
            <Save className="w-5 h-5" />
            {saving ? "Saving Changes..." : "Save Schedule Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSchedule;