import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import api from "../../../../../api/axios";

const AppointmentReport = ({ period = "month" }) => {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchAppointmentData();
  }, [period]);

  const fetchAppointmentData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/superadmin/reports/appointments?period=${period}`);
      
      setStats(res.data.stats || {});
      setRecent(res.data.recentAppointments || []);
      setCurrentPage(1); // Reset to first page when data changes
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointment data");
    } finally {
      setLoading(false);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(recent.length / itemsPerPage);
  const paginatedData = recent.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <div className="text-center py-12">Loading appointment data...</div>;

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <AlertCircle className="w-12 h-12 mx-auto mb-3" />
        <p>{error}</p>
        <button onClick={fetchAppointmentData} className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg cursor-pointer">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div>
        <h3 className="text-lg font-bold mb-4">Appointment Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total Appointments" value={stats.totalAppointments || 0} icon={Clock} color="text-blue-600" />
          <StatCard label="Completed" value={stats.completed || 0} icon={CheckCircle} color="text-emerald-600" />
          <StatCard label="Cancelled" value={stats.cancelled || 0} icon={XCircle} color="text-rose-600" />
          <StatCard label="Pending" value={stats.pending || 0} icon={Eye} color="text-amber-600" />
        </div>
      </div>

      {/* Recent Appointments Table with Pagination */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Recent Appointments</h3>
            <p className="text-sm text-gray-400 mt-1">Latest appointment activity</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Clock className="w-4 h-4" />
            Live data
          </div>
        </div>

        {recent.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>No recent appointments found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-[11px] uppercase tracking-wider text-gray-400">
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                    <th className="px-6 py-4 text-left font-semibold">Patient</th>
                    <th className="px-6 py-4 text-left font-semibold">Time</th>
                    <th className="px-6 py-4 text-center font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((apt, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600">{apt.date}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{apt.doctor}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{apt.patient}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{apt.time}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                          apt.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                          apt.status === 'Cancelled' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {apt.status === 'Completed' ? <CheckCircle className="w-3 h-3" /> :
                           apt.status === 'Cancelled' ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-6 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-sm font-semibold text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="p-5 border border-gray-200 rounded-2xl bg-white hover:shadow-md transition-all cursor-pointer">
    <div className="flex items-center justify-between mb-3">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default AppointmentReport;