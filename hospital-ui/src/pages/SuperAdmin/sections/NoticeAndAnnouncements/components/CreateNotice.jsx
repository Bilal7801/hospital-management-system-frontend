import React, { useState } from 'react';
import { Send, Clock } from 'lucide-react';
import api from "../../../../../api/axios";

const CreateNotice = ({ onAddNotice }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    audience: 'Both',
    priority: 'Normal',
    sendNow: true,
    scheduledDate: '',
    scheduledTime: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.sendNow && !formData.scheduledDate) {
      newErrors.scheduledDate = 'Please select a date';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const noticeData = {
        title: formData.title,
        message: formData.message,
        audience: formData.audience,
        priority: formData.priority,
        scheduledDate: !formData.sendNow 
          ? `${formData.scheduledDate}T${formData.scheduledTime || '09:00'}` 
          : null,
      };

      await onAddNotice(noticeData);

      // Reset form
      setFormData({
        title: '',
        message: '',
        audience: 'Both',
        priority: 'Normal',
        sendNow: true,
        scheduledDate: '',
        scheduledTime: '',
      });
      setErrors({});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Create New Notice</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Notice Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., System Maintenance Notice"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter the notice message..."
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 resize-none"
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        {/* Audience */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Audience *</label>
          <div className="grid grid-cols-3 gap-3">
            {['Staff', 'Patients', 'Both'].map((option) => (
              <label
                key={option}
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.audience === option ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="audience"
                  value={option}
                  checked={formData.audience === option}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="ml-3 font-medium">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Priority Level</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
          >
            <option value="Normal">Normal</option>
            <option value="Medium">Medium</option>
            <option value="High">High (Urgent)</option>
          </select>
        </div>

        {/* Send Now / Schedule */}
        <div className="border-t pt-5">
          <label className="flex items-center gap-3 cursor-pointer mb-4">
            <input
              type="checkbox"
              name="sendNow"
              checked={formData.sendNow}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="font-semibold text-gray-700">Send Immediately</span>
          </label>

          {!formData.sendNow && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
                <p className="font-semibold">Schedule Notice</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">Date</label>
                  <input type="date" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Time</label>
                  <input type="time" name="scheduledTime" value={formData.scheduledTime} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" />
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-70 cursor-pointer"
        >
          <Send className="w-5 h-5" />
          {loading ? "Processing..." : formData.sendNow ? "Send Notice Now" : "Schedule Notice"}
        </button>
      </form>
    </div>
  );
};

export default CreateNotice;