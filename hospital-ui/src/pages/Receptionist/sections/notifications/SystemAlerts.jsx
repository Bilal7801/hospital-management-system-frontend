import React from 'react';
import { AlertTriangle } from 'lucide-react';

const SystemAlerts = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600" />
        Global System Notifications
      </h3>
      <div className="p-4 border border-amber-100 bg-amber-50 rounded-xl text-xs text-amber-900">
        <p className="font-bold">Scheduled Maintenance</p>
        <p>The system will undergo brief maintenance tonight from 12:00 AM to 1:00 AM. Please save all work.</p>
      </div>
    </div>
  );
};

export default SystemAlerts;