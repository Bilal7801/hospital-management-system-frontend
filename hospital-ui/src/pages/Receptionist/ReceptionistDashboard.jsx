import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ReceptionistLayout from './components/ReceptionistLayout';
import {
  Clock, Filter, MoreHorizontal, Calendar,
  Users, DollarSign, Activity, LayoutDashboard
} from 'lucide-react';

// ================== Dashboard Home Segment ==================
export const DashboardHome = () => {   // ← Added 'export'
  const recentCheckIns = [
    { id: 1, name: "Vikas Khanna", doctor: "Dr. Aman (Cardio)", time: "10:15 AM", bill: "Paid" },
    { id: 2, name: "Meera Joshi", doctor: "Dr. Sarah (Ortho)", time: "10:30 AM", bill: "Pending" },
    { id: 3, name: "Karan Adani", doctor: "Dr. Aman (Cardio)", time: "10:45 AM", bill: "Paid" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-blue-100" />
            Reception Operations Desk
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Monitor active medical slots, verify arriving clinical queues, and orchestrate patient registrations seamlessly
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStat label="Active Appointments" count="24" icon={Calendar} color="blue" trend="+12%" />
        <QuickStat label="Waiting Room Queue" count="08" icon={Users} color="amber" trend="-2 slots" />
        <QuickStat label="Practitioners On Duty" count="12" icon={Activity} color="emerald" trend="+1 active" />
        <QuickStat label="Today's Total Revenue" count="₹45k" icon={DollarSign} color="purple" trend="+8% shift" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <h3 className="font-bold text-gray-800 text-sm tracking-tight">Current Desk Patient Queue</h3>
              <button className="p-2 hover:bg-gray-50 rounded-xl border border-gray-200 transition-all shadow-sm cursor-pointer">
                <Filter className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-3.5 text-left">Patient Demographics</th>
                    <th className="px-5 py-3.5 text-left">Assigned Provider</th>
                    <th className="px-5 py-3.5 text-left">Timestamp</th>
                    <th className="px-5 py-3.5 text-left">Billing State</th>
                    <th className="px-5 py-3.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {recentCheckIns.map((item) => (
                    <tr key={item.id} className="group hover:bg-blue-50/20 transition-colors">
                      <td className="px-5 py-4 font-bold text-gray-800">{item.name}</td>
                      <td className="px-5 py-4 text-gray-600 font-semibold">{item.doctor}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                          <Clock className="w-3.5 h-3.5 text-blue-500" />
                          <span>{item.time}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border
                          ${item.bill === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                          {item.bill}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <div className="border-b border-gray-100 pb-3 mb-4">
              <h3 className="font-bold text-gray-800 text-sm tracking-tight">Clinical Provider Directory</h3>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">Live facility attendance tracking metrics</p>
            </div>
            
            <div className="space-y-2.5">
              <DocStatus name="Dr. Aman Gupta" dept="Cardiology Hub" available />
              <DocStatus name="Dr. Sarah Johns" dept="Orthopedics Suite" available={false} />
              <DocStatus name="Dr. Mike Ross" dept="Neurology Center" available />
              <DocStatus name="Dr. Rachel Zane" dept="General Triage" available />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const QuickStat = ({ label, count, icon: Icon, color, trend }) => {
  const colorClasses = {
    blue: 'border-l-blue-600 bg-blue-50/20 shadow-blue-50/10',
    amber: 'border-l-amber-500 bg-amber-50/20 shadow-amber-50/10',
    emerald: 'border-l-emerald-500 bg-emerald-50/20 shadow-emerald-50/10',
    purple: 'border-l-purple-500 bg-purple-50/20 shadow-purple-50/10',
  };

  return (
    <div className={`rounded-xl border border-gray-200/70 border-l-4 shadow-sm hover:shadow-md transition-all ${colorClasses[color]}`}>
      <div className="p-4 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-black text-gray-800 tracking-tight">{count}</p>
          </div>
          {Icon && (
            <div className="p-2 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center">
              <Icon className="w-4 h-4 text-gray-600" />
            </div>
          )}
        </div>
        {trend && (
          <div className="text-[10px] text-gray-500 font-bold mt-2 pt-2 border-t border-gray-100/40 flex items-center gap-1">
            <span className="text-emerald-600 font-extrabold">{trend}</span> snapshot parameter
          </div>
        )}
      </div>
    </div>
  );
};

const DocStatus = ({ name, dept, available }) => (
  <div className="flex items-center justify-between p-3.5 bg-gray-50/60 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
    <div className="space-y-0.5">
      <p className="font-bold text-gray-800 text-xs">{name}</p>
      <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wide">{dept}</p>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${
        available ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
      }`}>
        {available ? 'Active' : 'Offline'}
      </span>
      <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${available ? 'bg-emerald-500' : 'bg-rose-500'}`} />
    </div>
  </div>
);

const ReceptionistDashboard = () => {
  const location = useLocation();
  const isDashboardHome = location.pathname === '/receptionist' || location.pathname === '/receptionist/';

  return (
    <ReceptionistLayout>
      {isDashboardHome ? <DashboardHome /> : <Outlet />}
    </ReceptionistLayout>
  );
};

export default ReceptionistDashboard;