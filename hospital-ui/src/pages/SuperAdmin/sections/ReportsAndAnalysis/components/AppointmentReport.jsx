import React from 'react';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

const AppointmentReport = () => {
  const appointmentStats = [
    { label: 'Total Appointments', value: '1,245', icon: Clock, color: 'text-blue-600' },
    { label: 'Completed', value: '980', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Cancelled', value: '120', icon: XCircle, color: 'text-rose-600' },
    { label: 'Pending', value: '145', icon: Eye, color: 'text-amber-600' },
  ];

  const appointmentDetails = [
    { date: '2025-01-15', doctor: 'Dr. James Wilson', patient: 'John Doe', status: 'Completed', time: '10:00 AM' },
    { date: '2025-01-14', doctor: 'Dr. Sarah Jenkins', patient: 'Jane Smith', status: 'Completed', time: '02:30 PM' },
    { date: '2025-01-14', doctor: 'Dr. Michael Brown', patient: 'Bob Johnson', status: 'Cancelled', time: '03:00 PM' },
    { date: '2025-01-13', doctor: 'Dr. Emily Davis', patient: 'Alice Williams', status: 'Completed', time: '11:00 AM' },
    { date: '2025-01-13', doctor: 'Dr. James Wilson', patient: 'Charlie Miller', status: 'Pending', time: '04:00 PM' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Appointment Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {appointmentStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Recent Appointments</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Doctor</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Patient</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Time</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointmentDetails.map((apt, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition-all">
                  <td className="px-4 py-3">{apt.date}</td>
                  <td className="px-4 py-3 font-medium">{apt.doctor}</td>
                  <td className="px-4 py-3">{apt.patient}</td>
                  <td className="px-4 py-3">{apt.time}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      apt.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentReport;