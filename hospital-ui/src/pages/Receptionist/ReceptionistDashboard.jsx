import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ReceptionistLayout from './components/ReceptionistLayout';
import { 
  Calendar, Users, DollarSign, Activity, LayoutDashboard, Loader2 
} from 'lucide-react';
import api from '../../api/axios';

const ReceptionistDashboard = () => {
  const location = useLocation();
  const isDashboardHome = location.pathname === '/receptionist' || location.pathname === '/receptionist/';

  return (
    <ReceptionistLayout>
      {isDashboardHome ? <DashboardHome /> : <Outlet />}
    </ReceptionistLayout>
  );
};

export const DashboardHome = () => {
  const [data, setData] = useState({
    activeAppointments: 0,
    waitingQueue: 0,
    activeDoctors: 0,
    todayRevenue: 0,
    recentCheckIns: [],
    doctors: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await api.get('/receptionist/dashboard');
        const result = response.data.data || response.data;

        console.log("Dashboard Data Received:", result);

        setData({
          activeAppointments: result.activeAppointments || 0,
          waitingQueue: result.waitingQueue || 0,
          activeDoctors: result.activeDoctors || 0,
          todayRevenue: result.todayRevenue || 0,
          recentCheckIns: result.recentCheckIns || [],
          doctors: result.doctors || []
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-white rounded-xl">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-blue-100" />
          Reception Operations Desk
        </h1>
        <p className="text-blue-100 text-sm mt-1">
          Monitor active medical slots, verify arriving clinical queues, and orchestrate patient registrations seamlessly
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStat label="Active Appointments" count={data.activeAppointments} icon={Calendar} color="blue" />
        <QuickStat label="Waiting Room Queue" count={data.waitingQueue} icon={Users} color="amber" />
        <QuickStat label="Practitioners On Duty" count={data.activeDoctors} icon={Activity} color="emerald" />
        <QuickStat label="Today's Total Revenue" count={`$${data.todayRevenue}`} icon={DollarSign} color="purple" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Current Queue Table */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-sm tracking-tight">Current Desk Patient Queue</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3.5 text-left">Patient</th>
                  <th className="px-5 py-3.5 text-left">Doctor</th>
                  <th className="px-5 py-3.5 text-left">Time</th>
                  <th className="px-5 py-3.5 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {data.recentCheckIns.length > 0 ? (
                  data.recentCheckIns.map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-5 py-4 font-bold text-gray-800">{item.patientName || item.PatientName || 'Unknown'}</td>
                      <td className="px-5 py-4 text-gray-600 font-semibold">{item.doctorName || item.DoctorName || 'N/A'}</td>
                      <td className="px-5 py-4 text-gray-500">{item.time || item.Time}</td>
                      <td className="px-5 py-4">
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full border ${
                          (item.status === 'Completed' || item.Status === 'Completed' || item.status === 'Checked-In' || item.Status === 'Checked-In') 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {item.status || item.Status || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-5 py-12 text-center text-gray-400">No recent activity</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Doctors Today Directory */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="border-b border-gray-100 pb-3 mb-4 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-sm tracking-tight">Clinical Provider Directory (Today)</h3>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">
              {data.activeDoctors} On Duty
            </span>
          </div>
          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {data.doctors.length > 0 ? (
              data.doctors.map((doc, idx) => {
                const isAvailable = (doc.isOnDutyToday === true || doc.IsOnDutyToday === true);
                return (
                  <DocStatus 
                    key={doc.doctorId || doc.DoctorId || idx} 
                    name={doc.doctorName || doc.DoctorName} 
                    dept={doc.departmentName || doc.DepartmentName || "General OPD"} 
                    available={isAvailable} 
                    schedule={doc.scheduleInfo || doc.ScheduleInfo}
                  />
                );
              })
            ) : (
              <div className="text-center py-12 text-gray-400">
                No doctors scheduled for today
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const QuickStat = ({ label, count, icon: Icon, color }) => (
  <div className={`rounded-xl border border-gray-200 border-l-4 shadow-sm p-4 ${
    color === 'blue' ? 'border-l-blue-600 bg-blue-50/20' : 
    color === 'amber' ? 'border-l-amber-500 bg-amber-50/20' : 
    color === 'emerald' ? 'border-l-emerald-500 bg-emerald-50/20' : 
    'border-l-purple-500 bg-purple-50/20'
  }`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-black text-gray-900 mt-1">{count}</p>
      </div>
      {Icon && <Icon className="w-6 h-6 text-gray-600" />}
    </div>
  </div>
);

const DocStatus = ({ name, dept, available, schedule }) => (
  <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
    <div>
      <p className="font-bold text-gray-800 text-xs">{name}</p>
      <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wide">{dept}</p>
      {schedule && <p className="text-[9px] text-gray-500 mt-0.5">{schedule}</p>}
    </div>
    <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full border ${
      available ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
    }`}>
      <div className={`w-2 h-2 rounded-full ${available ? 'bg-emerald-500' : 'bg-rose-500'}`} />
      {available ? 'ON DUTY TODAY' : 'OFF DUTY'}
    </div>
  </div>
);

export default ReceptionistDashboard;