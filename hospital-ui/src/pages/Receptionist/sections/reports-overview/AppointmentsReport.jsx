import React from 'react';
import { ClipboardList, Printer, CheckCircle, Clock, CalendarRange } from 'lucide-react';

const AppointmentsReport = () => {
  const summaryCards = [
    { title: "Total Booked", value: "42", subtitle: "Scheduled Tracks", icon: CalendarRange, color: "text-blue-600 bg-blue-50" },
    { title: "Completed Checks", value: "28", subtitle: "Checked Out", icon: CheckCircle, color: "text-emerald-600 bg-emerald-50" },
    { title: "Pending Inactive", value: "14", subtitle: "Remaining Slots", icon: Clock, color: "text-amber-600 bg-amber-50" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-blue-600" />
            Today's Clinical Appointment Audit Ledger
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Live monitoring breakdown of current day reservations across sub-departments</p>
        </div>
        <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 self-start sm:self-center cursor-pointer shadow-sm">
          <Printer className="w-3.5 h-3.5 text-gray-500" /> Export List
        </button>
      </div>

      {/* KPI Metric Blocks Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between bg-gray-50/40">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{card.title}</span>
                <p className="text-2xl font-black text-gray-800 tracking-tight">{card.value}</p>
                <span className="text-[10px] text-gray-400 font-semibold block">{card.subtitle}</span>
              </div>
              <div className={`p-3 rounded-xl border border-gray-100 shadow-sm ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Department Distribution Mini Breakdown */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm text-xs">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-gray-500 uppercase tracking-wider text-[10px]">
          Slot Allocations by Department Block
        </div>
        <div className="divide-y divide-gray-100">
          <div className="p-4 flex items-center justify-between hover:bg-gray-50/50">
            <span className="font-bold text-gray-700">Cardiology Diagnostics Desk</span>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="font-mono font-bold text-gray-800">18 Slots (65% Cap)</span>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between hover:bg-gray-50/50">
            <span className="font-bold text-gray-700">General Medicine Out-Patient Room</span>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '40%' }}></div>
              </div>
              <span className="font-mono font-bold text-gray-800">12 Slots (40% Cap)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsReport;