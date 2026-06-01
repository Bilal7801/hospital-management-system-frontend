// pages/Receptionist/sections/appointment-management/SearchAppointments.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../../../api/axios';

const SearchAppointments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState("All");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  const fetchAppointments = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/receptionist/appointment/search', {
        params: {
          searchTerm: searchTerm,
          status: filterStatus === "All" ? null : filterStatus,
          page: page,
          pageSize: pageSize
        }
      });

      setAppointments(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
      setTotalCount(response.data.totalCount || 0);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
      setError("Failed to load appointments");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when search, filter, or page changes
  useEffect(() => {
    fetchAppointments(1); // Reset to page 1 when filters change
  }, [searchTerm, filterStatus]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchAppointments(page);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Checked-In': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Confirmed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Rescheduled': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
      case 'Missed': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'No-Show': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const calculateAppointmentStatus = (apt) => {
    // If already checked-in, cancelled, or rescheduled, return as-is
    if (apt.status === 'Checked-In' || apt.status === 'Cancelled' || apt.status === 'Rescheduled') {
      return apt.status;
    }

    // If appointment is marked as confirmed or upcoming, check if date has passed
    if (apt.status === 'Upcoming' || apt.status === 'Confirmed') {
      const appointmentDate = new Date(apt.appointmentDate);
      const today = new Date();
      
      // Normalize dates to compare only date part
      appointmentDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      // If appointment date has passed and patient hasn't checked in
      if (appointmentDate < today) {
        return 'No-Show'; // Patient didn't show up
      }
    }

    return apt.status;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Appointment Log Registry</h1>
        <p className="text-blue-100 text-sm mt-1">
          Search, filter, and audit patient appointments ({totalCount} total)
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Patient, Doctor or APT ID..." 
            className="w-full pl-10 pr-4 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 transition-all font-medium placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2.5 w-full sm:w-auto">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 sm:flex-initial px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white text-gray-700 font-bold cursor-pointer focus:outline-none focus:border-blue-600 transition-all"
          >
            <option value="All">All Appointments</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Checked-In">Checked-In</option>
            <option value="Confirmed">Confirmed</option>
            <option value="No-Show">No-Show</option>
            <option value="Rescheduled">Rescheduled</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          
          <button 
            onClick={() => fetchAppointments(1)}
            className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:border-blue-600 focus:outline-none transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-5 py-3.5 text-left">Appointment ID</th>
                <th className="px-5 py-3.5 text-left">Patient Name</th>
                <th className="px-5 py-3.5 text-left">Doctor</th>
                <th className="px-5 py-3.5 text-left">Date</th>
                <th className="px-5 py-3.5 text-left">Time</th>
                <th className="px-5 py-3.5 text-left">Status</th>
                <th className="px-5 py-3.5 text-left">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                    </div>
                  </td>
                </tr>
              ) : appointments.length > 0 ? (
                appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-blue-600 tracking-wide">{apt.appointmentCode}</td>
                    <td className="px-5 py-3.5 font-bold text-gray-800">{apt.patientName}</td>
                    <td className="px-5 py-3.5 font-semibold text-gray-600">
                      Dr. {apt.doctorName}
                      <span className="text-[10px] text-gray-400 block">{apt.specialization}</span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 font-medium">
                      {new Date(apt.appointmentDate).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 font-semibold text-gray-600">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{apt.time}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusBadge(calculateAppointmentStatus(apt))}`}>
                        {calculateAppointmentStatus(apt)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs max-w-45 truncate">
                      {apt.notes || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center text-gray-400 font-medium">
                    No appointments found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-5 py-3 shadow-sm">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{appointments.length}</span> of {totalCount} appointments
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      currentPage === pageNum 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAppointments;