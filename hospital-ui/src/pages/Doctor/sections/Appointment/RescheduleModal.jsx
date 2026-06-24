import React from 'react';
import { RefreshCw } from 'lucide-react';

const RescheduleModal = ({ appointment, onClose, onSubmit }) => {
  // Safe property access (handles both camelCase and PascalCase from backend)
  const patientName = appointment?.patient || 
                      appointment?.PatientName || 
                      appointment?.patientName || 
                      "Unknown Patient";

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newDate = e.target.newDate.value;
    const newTime = e.target.newTime.value;

    if (!newDate || !newTime) {
      alert("Please select both date and time");
      return;
    }

    onSubmit(appointment?.id || appointment?.Id, newDate, newTime);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Reschedule Appointment</h3>
            <p className="text-sm text-gray-500">For {patientName}</p>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              New Appointment Date
            </label>
            <input 
              required 
              type="date" 
              name="newDate" 
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              New Appointment Time
            </label>
            <input 
              required 
              type="text" 
              placeholder="e.g., 11:30 AM" 
              name="newTime" 
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all" 
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            
            <button 
              type="submit" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-sm"
            >
              Reschedule Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RescheduleModal;