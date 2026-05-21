import React from 'react';
import { CalendarClock, CheckCircle, Clock } from 'lucide-react';

const AppointmentAlerts = () => {
  const alerts = [
    { id: 1, patient: "Vikas Khanna", time: "2:00 PM", status: "Reminder Sent", type: "SMS" },
    { id: 2, patient: "Anita Desai", time: "3:30 PM", status: "Pending", type: "Email" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
        <CalendarClock className="w-4 h-4 text-blue-600" />
        Upcoming Appointment Reminders
      </h3>
      {alerts.map(alert => (
        <div key={alert.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50 text-xs">
          <div>
            <p className="font-bold text-gray-800">{alert.patient}</p>
            <p className="text-gray-500">{alert.time} • {alert.type}</p>
          </div>
          <span className={`px-2 py-1 rounded-md font-bold ${alert.status === 'Reminder Sent' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
            {alert.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AppointmentAlerts;