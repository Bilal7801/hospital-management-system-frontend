import React from 'react';
import { Clock, RefreshCw, XCircle, Calendar } from 'lucide-react';

const AppointmentTable = ({ appointments, activeTab, canModify, onRescheduleClick, onCancelClick }) => {
  
  // Dynamic status styling configurations
  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Waiting': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Confirmed': return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Cancelled': return 'bg-rose-50 text-rose-700 border border-rose-200';
      default: return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  // Empty state panel handler
  if (appointments.length === 0) {
    return (
      <div className="p-16 text-center text-gray-500">
        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="font-medium text-gray-600">No appointments found</p>
        <p className="text-xs text-gray-400 mt-1">There are no records classified under this section view timeline.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-500 text-[11px] uppercase tracking-wider bg-gray-50/70 border-b border-gray-100">
            <th className="px-6 py-4 font-semibold">Patient Information</th>
            <th className="px-6 py-4 font-semibold">Date & Time Target</th>
            <th className="px-6 py-4 font-semibold">Classification Type</th>
            <th className="px-6 py-4 font-semibold">Current State</th>
            {activeTab !== 'past' && <th className="px-6 py-4 font-semibold text-right">Operational Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {appointments.map((apt) => (
            <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="font-semibold text-gray-900 text-sm">{apt.patient}</div>
                <div className="text-xs text-gray-400 mt-0.5">{apt.phone}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{apt.time}</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5 pl-6">{apt.date}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                {apt.type}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${getStatusBadge(apt.status)}`}>
                  {apt.status}
                </span>
              </td>
              {activeTab !== 'past' && (
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      disabled={!canModify || apt.status === 'Cancelled'}
                      onClick={() => onRescheduleClick(apt)}
                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                      title="Reschedule Appointment"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button 
                      disabled={!canModify || apt.status === 'Cancelled'}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;