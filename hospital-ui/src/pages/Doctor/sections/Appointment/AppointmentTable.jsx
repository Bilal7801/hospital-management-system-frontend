import React from 'react';
import { Clock, RefreshCw, XCircle, Calendar } from 'lucide-react';

const AppointmentTable = ({
  appointments,
  activeTab,
  canModify,
  onRescheduleClick,
  onCancelClick
}) => {
  const getStatusBadge = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'in progress':
      case 'progress':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'waiting':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'confirmed':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
      case 'upcoming':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  if (!appointments || appointments.length === 0) {
    return (
      <div className="p-16 text-center text-gray-500">
        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="font-medium text-gray-600">No appointments found</p>
        <p className="text-xs text-gray-400 mt-1">
          There are no records classified under this section.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-500 text-[11px] uppercase tracking-wider bg-gray-50/70 border-b border-gray-100">
            <th className="px-6 py-4 font-semibold">Patient Information</th>
            <th className="px-6 py-4 font-semibold">Date & Time</th>
            <th className="px-6 py-4 font-semibold">Type</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            {activeTab !== 'past' && (
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {appointments.map((apt, index) => {
            const appointmentId = apt.id || apt.Id;
            const status = apt.status || apt.Status || 'Pending';
            const patientName = apt.patient || apt.PatientName || apt.patientName || 'Unknown Patient';
            const phone = apt.phone || apt.Phone || 'N/A';
            const time = apt.time || apt.Time || '';
            const date = apt.date || apt.Date || '';
            const type = apt.type || apt.Type || 'Consultation';

            return (
              <tr
                key={appointmentId || index}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900 text-sm">
                    {patientName}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {phone}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{time}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 pl-6">
                    {date}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                  {type}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${getStatusBadge(status)}`}
                  >
                    {status}
                  </span>
                </td>

                {activeTab !== 'past' && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        disabled={!canModify || status.toLowerCase() === 'cancelled'}
                        onClick={() => onRescheduleClick(apt)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                        title="Reschedule Appointment"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>

                      <button
                        disabled={!canModify || status.toLowerCase() === 'cancelled'}
                        onClick={() => onCancelClick(apt)}
                        className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                        title="Cancel Appointment"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;