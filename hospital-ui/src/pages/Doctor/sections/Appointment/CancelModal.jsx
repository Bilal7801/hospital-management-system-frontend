import React from 'react';
import { XCircle } from 'lucide-react';

const CancelModal = ({ appointment, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 max-w-sm w-full p-6 text-center animate-in fade-in zoom-in-95 duration-150">
        <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Confirm System Cancellation</h3>
        <p className="text-sm text-gray-500 mt-2">
          Are you absolutely sure you want to drop the appointment slot tracking for <strong className="text-gray-800">{appointment.patient}</strong>? This slot will immediately open back up for general operations.
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Keep Session</button>
          <button type="button" onClick={() => onConfirm(appointment.id)} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-rose-100">Confirm Drop</button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;