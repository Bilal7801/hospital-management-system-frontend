import React, { useState, useEffect } from 'react';
import { ClipboardList, Printer, CheckCircle, Clock, CalendarRange, Loader2, AlertCircle, User, Stethoscope } from 'lucide-react';
import api from '../../../../api/axios';

const AppointmentsReport = () => {
  const [reportData, setReportData] = useState({
    totalBooked: 0,
    completed: 0,
    pending: 0,
    appointments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch live report records from the C# backend ledger
  const fetchAppointmentsReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/receptionist/reports/appointments');
      
      if (response.data.success) {
        setReportData(response.data.data);
      }
    } catch (err) {
      console.error("Failed to load appointments clinical audit ledger:", err);
      setError("Unable to sync with data server. Verify server connectivity.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentsReport();
  }, []);

  // 2. Generate dynamic practitioner allocation distributions based on live rows
  const getPractitionerDistribution = () => {
    const appointments = reportData.appointments || [];
    if (appointments.length === 0) return [];

    // Group appointment frequencies by DoctorName
    const counts = appointments.reduce((acc, current) => {
      acc[current.doctorName] = (acc[current.doctorName] || 0) + 1;
      return acc;
    }, {});

    // Map into list format calculating percentage allocations
    return Object.entries(counts).map(([name, count]) => {
      const percentage = Math.round((count / appointments.length) * 100);
      return { name, count, percentage };
    }).sort((a, b) => b.count - a.count);
  };

  const dynamicSummaryCards = [
    { title: "Total Booked", value: reportData.totalBooked.toString(), subtitle: "Scheduled Tracks", icon: CalendarRange, color: "text-blue-600 bg-blue-50" },
    { title: "Completed Checks", value: reportData.completed.toString(), subtitle: "Checked Out / In", icon: CheckCircle, color: "text-emerald-600 bg-emerald-50" },
    { title: "Pending Active", value: reportData.pending.toString(), subtitle: "Remaining Slots", icon: Clock, color: "text-amber-600 bg-amber-50" }
  ];

  const practitionerDistribution = getPractitionerDistribution();

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 flex flex-col items-center justify-center gap-3 shadow-sm min-h-[350px]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs font-semibold text-slate-400">Loading daily clinical reservation ledger...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-rose-200 p-8 text-center space-y-3 shadow-sm">
        <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
        <p className="text-sm font-bold text-slate-800">{error}</p>
        <button 
          onClick={fetchAppointmentsReport} 
          className="text-xs bg-slate-100 hover:bg-slate-200 font-bold px-4 py-2 rounded-xl transition-all border border-slate-200 text-slate-700 cursor-pointer"
        >
          Retry Ledger Sync
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 text-slate-800">
      
      {/* Header Block */}
      <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-blue-600" />
            Today's Clinical Appointment Audit Ledger
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Live monitoring breakdown of current day reservations across sub-departments</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 self-start sm:self-center cursor-pointer shadow-sm"
        >
          <Printer className="w-3.5 h-3.5 text-gray-500" /> Export List
        </button>
      </div>

      {/* KPI Metric Blocks Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {dynamicSummaryCards.map((card, idx) => {
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

      {/* Dynamic Practitioner Distribution Breakdown */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm text-xs">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-gray-500 uppercase tracking-wider text-[10px]">
          Slot Allocations by Active Provider Node
        </div>
        <div className="divide-y divide-gray-100">
          {practitionerDistribution.length === 0 ? (
            <div className="p-4 text-center text-gray-400 font-medium">
              No allocations recorded for today's operating cycle.
            </div>
          ) : (
            practitionerDistribution.map((provider, index) => (
              <div key={index} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors">
                <span className="font-bold text-gray-700 flex items-center gap-2">
                  <Stethoscope className="w-3.5 h-3.5 text-slate-400" /> {provider.name}
                </span>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="w-32 bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${provider.percentage}%` }}></div>
                  </div>
                  <span className="font-mono font-bold text-gray-800 w-28 text-right">
                    {provider.count} Slots ({provider.percentage}% Cap)
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Live Appointment Slot Tracking Sub-View */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm text-xs">
        <div className="bg-slate-800 text-white px-4 py-3 font-bold uppercase tracking-wider text-[10px]">
          Real-Time Audit Timeline Matrix
        </div>
        <div className="max-h-[260px] overflow-y-auto divide-y divide-gray-100">
          {reportData.appointments.length === 0 ? (
            <div className="p-6 text-center text-gray-400 font-medium bg-gray-50/10">
              No clinical slot reservations booked on this universal calendar track.
            </div>
          ) : (
            reportData.appointments.map((apt) => (
              <div key={apt.id} className="p-3.5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" /> {apt.patientName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">({apt.time})</span>
                  </div>
                  <p className="text-slate-400 text-[11px] font-medium">Assigned: {apt.doctorName}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-md font-extrabold text-[9px] uppercase tracking-wide border shadow-sm ${
                  apt.status === 'Completed' || apt.status === 'Checked-In'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    : apt.status === 'Cancelled'
                    ? 'bg-rose-50 text-rose-700 border-rose-100'
                    : 'bg-blue-50 text-blue-700 border-blue-100'
                }`}>
                  {apt.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default AppointmentsReport;