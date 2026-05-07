import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Clock, Building2, User } from 'lucide-react';

const EditSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data (later replace with API by id)
  const [formData, setFormData] = useState({
    doctor: "Dr. James Wilson",
    department: "Cardiology",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    startTime: "09:00",
    endTime: "15:00",
    breakStart: "13:00",
    breakEnd: "13:30",
    slotDuration: "15",
    status: "Active",
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Schedule updated:", formData);
    navigate('/dashboard/doctor-schedule');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">

      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/doctor-schedule')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Card */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Edit Schedule #{id}
        </h2>

        {/* Doctor Name */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Doctor Name
          </label>
          <input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleInputChange}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
          >
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Orthopedics</option>
            <option>Pediatrics</option>
            <option>General Surgery</option>
          </select>
        </div>

        {/* Working Days */}
        <div className="mb-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase mb-3 block">
            Working Days
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {days.map((day) => (
              <button
                key={day}
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

        {/* Time Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          {/* Start Time */}
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
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
            />
          </div>

          {/* Break Start */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              Break Start Time
            </label>
            <input
              type="time"
              name="breakStart"
              value={formData.breakStart}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
            />
          </div>

          {/* Break End */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase">
              Break End Time
            </label>
            <input
              type="time"
              name="breakEnd"
              value={formData.breakEnd}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
            />
          </div>

        </div>

        {/* Slot Duration */}
        <div className="mb-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Appointment Slot Duration (minutes)
          </label>
          <input
            type="number"
            name="slotDuration"
            value={formData.slotDuration}
            onChange={handleInputChange}
            min="5"
            step="5"
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
          />
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Status
          </label>

          <div className="flex gap-3 mt-2">

            <button
              onClick={() => setFormData((prev) => ({ ...prev, status: "Active" }))}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all cursor-pointer ${
                formData.status === "Active"
                  ? "bg-emerald-50 border-emerald-600 text-emerald-600"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => setFormData((prev) => ({ ...prev, status: "Inactive" }))}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all cursor-pointer ${
                formData.status === "Inactive"
                  ? "bg-gray-100 border-gray-600 text-gray-600"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Inactive
            </button>

          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>

      </div>
    </div>
  );
};

export default EditSchedule;
