import React, { useEffect, useState } from 'react';
import { UserPlus, Users, Calendar, Activity, TrendingUp, Clock } from 'lucide-react';
import api from "../../../api/axios";

const Overview = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    todayAppointments: 0,
    upcomingAppointments: 0,
    completedToday: 0,
    totalRevenue: 0,
  });
  const [recentCompleted, setRecentCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [doctorsRes, patientsRes, appointmentsRes] = await Promise.all([
        api.get("/superadmin/doctors"),
        api.get("/superadmin/patients"),
        api.get("/superadmin/reports/appointments?period=month")   // Get last month data
      ]);

      const reportStats = appointmentsRes.data.stats || {};

      setStats({
        totalDoctors: doctorsRes.data.length || 0,
        totalPatients: patientsRes.data.length || 0,
        todayAppointments: reportStats.totalAppointments || 0,
        upcomingAppointments: reportStats.pending || 0,
        completedToday: reportStats.completed || 0,
        totalRevenue: 542000,
      });

      // Filter only Completed appointments for "Recent" section
      let completedAppointments = (appointmentsRes.data.recentAppointments || [])
        .filter(apt => apt.status === 'Completed')
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by latest first

      setRecentCompleted(completedAppointments.slice(0, 5));

    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: "Total Doctors", count: stats.totalDoctors, icon: UserPlus, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Patients", count: stats.totalPatients.toLocaleString(), icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Today's Appointments", count: stats.todayAppointments, icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Upcoming Appointments", count: stats.upcomingAppointments, icon: Activity, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard overview...</div>;
  }

  return (
    <div className="p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <Icon className={`${stat.color} w-6 h-6`} />
                </div>
                <TrendingUp className="text-emerald-500 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-3xl font-semibold text-gray-900 mt-1">{stat.count}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Completed Appointments */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Recently Completed Appointments
          </h3>
          <button 
            onClick={() => window.location.href = '/dashboard/appointments'}
            className="text-blue-600 text-sm font-medium hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Patient</th>
                <th className="px-6 py-4 font-medium">Doctor</th>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentCompleted.length > 0 ? (
                recentCompleted.map((apt, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-medium">{apt.patient}</td>
                    <td className="px-6 py-4 text-gray-700">{apt.doctor}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {apt.date} • {apt.time}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                    No recently completed appointments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;