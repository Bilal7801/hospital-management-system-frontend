import React from 'react';
import { Clock, MoreVertical } from 'lucide-react';

const DoctorOverview = () => {
  const appointments = [
    { id: 1, patient: "Arjun Mehta", time: "09:00 AM", type: "Checkup", status: "In Progress" },
    { id: 2, patient: "Sana Khan", time: "10:30 AM", type: "Follow-up", status: "Waiting" },
    { id: 3, patient: "Rahul Verma", time: "11:45 AM", type: "Report Review", status: "Waiting" },
  ];

  return (
    <>
      {/* Greetings block context banner */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Good Morning, Doctor</h2>
          <p className="text-gray-500 mt-1">You have 8 appointments scheduled for today.</p>
        </div>
        <div className="text-sm font-medium text-gray-400 bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* Quick Status KPI Stats Cards Container Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Today's Patients" value="12" sub="4 completed" color="bg-blue-600" />
        <StatCard label="Pending Reports" value="05" sub="2 urgent" color="bg-orange-500" />
        <StatCard label="Next Surgery" value="02:30 PM" sub="OT Room 04" color="bg-emerald-600" />
      </div>

      {/* Appointment Dynamic Table View Layout */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h3 className="font-bold text-gray-900">Upcoming Appointments</h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-[11px] uppercase tracking-wider border-b border-gray-50 bg-gray-50/50">
                <th className="px-6 py-4 font-semibold">Patient Name</th>
                <th className="px-6 py-4 font-semibold">Time</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{apt.patient}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gray-400" /> {apt.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600 text-sm">{apt.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase ${
                      apt.status === 'In Progress' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const StatCard = ({ label, value, sub, color }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
    <div className={`absolute top-0 left-0 w-1 h-full ${color}`}></div>
    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{label}</p>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    <p className="text-xs text-gray-400 mt-1">{sub}</p>
  </div>
);

export default DoctorOverview;