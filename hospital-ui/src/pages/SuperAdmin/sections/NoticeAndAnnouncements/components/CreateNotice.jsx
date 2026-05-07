import React, { useState } from 'react';
import { Send, Clock } from 'lucide-react';

const CreateNotice = ({ onAddNotice }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    audience: 'Staff',
    priority: 'Normal',
    sendNow: true,
    scheduledDate: '',
    scheduledTime: '',
  });

  const [errors, setErrors] = useState({});

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
      newErrors.scheduledDate = 'Please select a date for scheduling';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const notice = {
        title: formData.title,
        message: formData.message,
        audience: formData.audience,
        priority: formData.priority,
        scheduledDate: !formData.sendNow
          ? `${formData.scheduledDate} ${formData.scheduledTime || '09:00'}`
          : null,
      };
      onAddNotice(notice);
      setFormData({
        title: '',
        message: '',
        audience: 'Staff',
        priority: 'Normal',
        sendNow: true,
        scheduledDate: '',
        scheduledTime: '',
      });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Notice</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notice Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., System Maintenance Notice"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter the notice message here..."
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* Audience Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Audience *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Staff', 'Patients', 'Both'].map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.audience === option
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="audience"
                    value={option}
                    checked={formData.audience === option}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 font-medium text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Priority Level
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="Normal">Normal</option>
              <option value="Medium">Medium</option>
              <option value="High">High (Urgent)</option>
            </select>
          </div>

          {/* Send/Schedule Options */}
          <div className="border-t pt-5">
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input
                type="checkbox"
                name="sendNow"
                checked={formData.sendNow}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="font-semibold text-gray-700">
                Send Notice Immediately
              </span>
            </label>

            {!formData.sendNow && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-3">
                      Schedule Notice
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          name="scheduledDate"
                          value={formData.scheduledDate}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        {errors.scheduledDate && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.scheduledDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Time
                        </label>
                        <input
                          type="time"
                          name="scheduledTime"
                          value={formData.scheduledTime}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              <Send className="w-4 h-4" />
              {formData.sendNow ? 'Send Notice' : 'Schedule Notice'}
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  title: '',
                  message: '',
                  audience: 'Staff',
                  priority: 'Normal',
                  sendNow: true,
                  scheduledDate: '',
                  scheduledTime: '',
                })
              }
              className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNotice;
