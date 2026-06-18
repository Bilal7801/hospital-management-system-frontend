import React from 'react';
import { RefreshCw } from 'lucide-react';

const RescheduleModal = ({ appointment, onClose, onSubmit }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newDate = e.target.newDate.value;
    const newTime = e.target.newTime.value;
    onSubmit(appointment.id, newDate, newTime);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-150">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-blue-600" /> Reschedule Grid Target
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Modifying schedule parameters for patient <strong className="text-gray-800">{appointment.patient}</strong>.
        </p>
        
        <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Target Action Date</label>
            <input required type="date" name="newDate" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Target Session Time Slot</label>
            <input required type="text" placeholder="e.g., 11:30 AM" name="newTime" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Discard</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-blue-100">Commit Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RescheduleModal;