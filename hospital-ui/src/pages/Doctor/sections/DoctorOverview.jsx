import React, { useState, useEffect } from 'react';
import { Clock, MoreVertical, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../../api/axios';

const DoctorOverview = () => {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch Stats & Today's Appointments
  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true);
        
        const [statsRes, apptRes] = await Promise.all([
          api.get('/doctor/reports/stats'),
          api.get('/doctor/reports/consultations')
        ]);

        setStats(statsRes.data.data);
        setAppointments(apptRes.data.data || []);
      } catch (err) {
        console.error("Failed to load overview data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const paginatedAppointments = appointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {/* Greetings block context banner */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Good Morning, Doctor</h2>
          <p className="text-gray-500 mt-1">
            You have {stats?.todayAppointments || 0} appointments scheduled for today.
          </p>
        </div>
        <div className="text-sm font-medium text-gray-400 bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* Quick Status KPI Stats Cards Container Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {loading ? (
          <div className="col-span-3 flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          </div>
        ) : stats && (
          <>
            <StatCard 
              label="Today's Patients" 
              value={stats.todayAppointments || 0} 
              sub={`${stats.completedToday || 0} completed`} 
              color="bg-blue-600" 
            />
            
            <StatCard 
              label="Completion Rate" 
              value={`${stats.completionRate || 0}%`} 
              sub="Today's appointments" 
              color="bg-emerald-600" 
            />
            
            <StatCard 
              label="Total Patients" 
              value={stats.totalPatients || 0} 
              sub="Under your care" 
              color="bg-purple-600" 
            />
          </>
        )}
      </div>

      {/* Appointment Dynamic Table View Layout */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h3 className="font-bold text-gray-900">Upcoming Appointments</h3>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages || 1}
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
            </div>
          ) : (
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
                {paginatedAppointments.length > 0 ? (
                  paginatedAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{apt.patient}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-gray-400" /> 
                          {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 text-sm">{apt.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase ${
                          apt.status === 'Completed' || apt.status === 'In Progress' 
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                      No appointments scheduled for today.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 bg-gray-50">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const StatCard = ({ label, value, sub, color }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
    <div className={`absolute top-0 left-0 w-1 h-full ${color}`}></div>
    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{label}</p>
    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    <p className="text-xs text-gray-400 mt-1">{sub}</p>
  </div>
);

export default DoctorOverview;