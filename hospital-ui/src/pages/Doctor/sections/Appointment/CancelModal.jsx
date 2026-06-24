import React from 'react';
import { XCircle } from 'lucide-react';

const CancelModal = ({ appointment, onClose, onConfirm }) => {
  const appointmentId = appointment?.id || appointment?.Id;
  const patientName =
    appointment?.patient ||
    appointment?.PatientName ||
    appointment?.patientName ||
    "Unknown Patient";

  const handleConfirm = () => {
    if (appointmentId) {
      onConfirm(appointmentId);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-sm w-full p-6 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-5">
          <XCircle className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Confirm Cancellation
        </h3>

        <p className="text-gray-600 text-[15px] leading-relaxed">
          Are you sure you want to cancel the appointment for <br />
          <strong className="text-gray-800 font-medium">{patientName}</strong>?
        </p>

        <p className="text-xs text-rose-500 mt-3 font-medium">
          This action cannot be undone. The slot will be freed immediately.
        </p>

        <div className="flex gap-3 justify-center mt-8">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
          >
            Keep Appointment
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!appointmentId}
            className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all shadow-sm"
          >
            Yes, Cancel Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;