import React from 'react';
import { Stethoscope, AlertCircle } from 'lucide-react';

const ScheduleAlerts = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
        <Stethoscope className="w-4 h-4 text-blue-600" />
        Doctor Schedule Change Alerts
      </h3>
      <div className="p-4 border border-rose-100 bg-rose-50 rounded-xl text-xs text-rose-800 flex gap-3">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <div>
          <p className="font-bold">Urgent: Dr. A. Gupta</p>
          <p>Schedule shifted due to surgery emergency. Morning slots (9 AM - 12 PM) cancelled. Please notify affected patients.</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAlerts;