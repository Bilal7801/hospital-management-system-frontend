// pages/Receptionist/ReceptionistDashboard.jsx
import React from 'react';
import ReceptionistLayout from './components/ReceptionistLayout';
import {
  Plus, Search, UserCheck, CreditCard, Clock, Phone,
  Filter, MoreHorizontal, ClipboardList, LogOut, LayoutGrid,
  Calendar, Users, DollarSign, Activity
} from 'lucide-react';

const ReceptionistDashboard = () => {
  const recentCheckIns = [
    { id: 1, name: "Vikas Khanna", doctor: "Dr. Aman (Cardio)", time: "10:15 AM", type: "New", bill: "Paid" },
    { id: 2, name: "Meera Joshi", doctor: "Dr. Sarah (Ortho)", time: "10:30 AM", type: "Follow-up", bill: "Pending" },
    { id: 3, name: "Karan Adani", doctor: "Dr. Aman (Cardio)", time: "10:45 AM", type: "Emergency", bill: "Paid" },
  ];

  return (
    <ReceptionistLayout>
      {/* Status Cards with refined styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <QuickStat
          label="Active Appointments"
          count="24"
          icon={Calendar}
          color="indigo"
          trend="+12%"
        />
        <QuickStat
          label="Waiting Room"
          count="08"
          icon={Users}
          color="amber"
          trend="-2"
        />
        <QuickStat
          label="Doctors on Duty"
          count="12"
          icon={Activity}
          color="emerald"
          trend="+1"
        />
        <QuickStat
          label="Today's Revenue"
          count="₹45k"
          icon={DollarSign}
          color="blue"
          trend="+8%"
        />
      </div>

      {/* Main Grid: Patient Queue & Doctor Availability */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Patient Queue Table - enhanced with better UX */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-lg">Current Patient Queue</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-200">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80 text-gray-500 text-[11px] font-semibold uppercase tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left rounded-tl-xl">Patient Name</th>
                  <th className="px-6 py-4 text-left">Assigned Doctor</th>
                  <th className="px-6 py-4 text-left">Time</th>
                  <th className="px-6 py-4 text-left">Payment</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentCheckIns.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-indigo-50/30 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{item.doctor}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`
                        inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                        ${item.bill === 'Paid'
                          ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
                          : 'bg-rose-100 text-rose-700 ring-1 ring-rose-200'
                        }
                      `}>
                        {item.bill}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-700 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Optional footer with "View all" link */}
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/40 text-right">
            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              View all appointments →
            </button>
          </div>
        </div>

        {/* Doctor Availability Panel - polished */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex flex-col h-fit">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-800 text-lg">Doctor Availability</h3>
            <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Today</span>
          </div>
          <div className="space-y-3">
            <DocStatus name="Dr. Aman Gupta" dept="Cardio" available />
            <DocStatus name="Dr. Sarah Johns" dept="Ortho" available={false} />
            <DocStatus name="Dr. Mike Ross" dept="Neuro" available />
            <DocStatus name="Dr. Rachel Zane" dept="General" available />
          </div>
          <button className="w-full mt-6 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-sm font-semibold transition-all border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-200">
            Full Schedule
          </button>
        </div>
      </div>
    </ReceptionistLayout>
  );
};

// ====================== Helper Components ======================

const QuickStat = ({ label, count, icon: Icon, color, trend }) => {
  const colorClasses = {
    indigo: 'border-l-indigo-500 bg-indigo-50/30',
    amber: 'border-l-amber-500 bg-amber-50/30',
    emerald: 'border-l-emerald-500 bg-emerald-50/30',
    blue: 'border-l-blue-500 bg-blue-50/30',
  };

  const trendClasses = {
    indigo: 'text-indigo-600 bg-indigo-100',
    amber: 'text-amber-600 bg-amber-100',
    emerald: 'text-emerald-600 bg-emerald-100',
    blue: 'text-blue-600 bg-blue-100',
  };

  return (
    <div className={`
      relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm
      hover:shadow-md transition-all duration-200 group
      ${colorClasses[color]}
    `}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{count}</p>
          </div>
          {Icon && (
            <div className="p-2 bg-white/60 rounded-xl shadow-sm">
              <Icon className="w-5 h-5 text-gray-600" />
            </div>
          )}
        </div>
        {trend && (
          <div className="mt-3 flex items-center gap-1">
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${trendClasses[color]}`}>
              {trend}
            </span>
            <span className="text-[10px] text-gray-400">vs yesterday</span>
          </div>
        )}
      </div>
    </div>
  );
};

const DocStatus = ({ name, dept, available }) => (
  <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow transition-all duration-150">
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-800">{name}</span>
      <span className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wide mt-0.5">{dept}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-[10px] font-medium ${available ? 'text-emerald-600' : 'text-rose-500'}`}>
        {available ? 'Available' : 'Busy'}
      </span>
      <div className={`w-2.5 h-2.5 rounded-full ${available ? 'bg-emerald-500 shadow-sm' : 'bg-rose-400'}`}></div>
    </div>
  </div>
);

export default ReceptionistDashboard;