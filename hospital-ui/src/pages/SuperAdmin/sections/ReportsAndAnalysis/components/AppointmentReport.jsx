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
      <div>
        <h3 className="text-lg font-bold mb-4">Recent Appointments</h3>
        
        {recent.length === 0 ? (
          <div className="text-center py-10 text-gray-500 border border-dashed rounded-xl">No recent appointments found</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Doctor</th>
                    <th className="px-4 py-3 text-left">Patient</th>
                    <th className="px-4 py-3 text-left">Time</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((apt, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50 transition-all cursor-pointer">
                      <td className="px-4 py-3">{apt.date}</td>
                      <td className="px-4 py-3 font-medium">{apt.doctor}</td>
                      <td className="px-4 py-3">{apt.patient}</td>
                      <td className="px-4 py-3">{apt.time}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                          apt.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>
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
              <div className="flex items-center justify-between mt-4 px-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
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