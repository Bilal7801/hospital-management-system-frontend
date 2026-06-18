import React from 'react';
import { User, Play, Clock } from 'lucide-react';

const ConsultationQueue = ({ queue, onStart }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Today's Active Patient Intake Queue</h3>
      </div>

      {queue.length === 0 ? (
        <div className="p-16 text-center text-gray-500">
          <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="font-medium text-gray-600">Queue completely clear</p>
          <p className="text-xs text-gray-400 mt-1">No active intake profiles are marked waiting inside the triage workspace.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-[11px] uppercase tracking-wider bg-gray-50/20 border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Scheduled Window</th>
                <th className="px-6 py-4 font-semibold">Patient Information</th>
                <th className="px-6 py-4 font-semibold">Triage / Presenting Problem</th>
                <th className="px-6 py-4 font-semibold">State</th>
                <th className="px-6 py-4 font-semibold text-right">Room Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {queue.map((pt) => (
                <tr key={pt.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{pt.timeSlot}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 text-sm">{pt.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{pt.age} Yrs • {pt.gender} • <span className="font-mono">{pt.patientId}</span></div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                    {pt.reason}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                      pt.status === 'In Progress' 
                        ? 'bg-blue-50 text-blue-700 border-blue-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {pt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onStart(pt)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all shadow-sm shadow-blue-100 group"
                    >
                      <Play className="w-3 h-3 fill-white object-contain" />
                      <span>Start Consultation</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ConsultationQueue;