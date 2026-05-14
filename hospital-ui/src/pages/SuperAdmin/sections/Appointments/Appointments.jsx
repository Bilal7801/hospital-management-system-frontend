import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  Search,
  Eye,
  Edit2,
  Trash2,
  Plus,
  Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/axios';

const Appointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await api.get('/superadmin/appointments');
        setAppointments(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError('Failed to load appointments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getDoctorName = (doctor) => {
    if (!doctor) return 'Not Assigned';
    return doctor.doctorName || doctor.fullName || doctor.name || 'Unknown';
  };

  const getPatientName = (patient) => {
    if (!patient) return 'Unknown Patient';
    return patient.fullName || patient.name || 'Unknown';
  };

  const getDepartmentName = (department) => {
    if (!department) return 'N/A';
    return department.departmentName || department.name || 'N/A';
  };

  const rows = useMemo(() => {
    return appointments.map((app) => ({
      id: app.id,
      patient: getPatientName(app.patient),
      doctor: getDoctorName(app.doctor),
      department: getDepartmentName(app.department),
      appointmentDate: app.appointmentDate,
      status: app.status || 'Upcoming',
      notes: app.notes,
    }));
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return rows.filter((app) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        app.patient.toLowerCase().includes(search) ||
        app.doctor.toLowerCase().includes(search) ||
        app.department.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === 'All' || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rows, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / itemsPerPage));

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const startItem = filteredAppointments.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredAppointments.length);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Appointments Management</h2>
          <p className="text-xs text-gray-400 mt-1">
            SuperAdmin monitoring of all hospital appointments
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard/appointments/add')}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Appointment
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search patient or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading appointments...</div>
        ) : error ? (
          <div className="p-8 text-center text-rose-600">{error}</div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-[11px] uppercase text-gray-400">
                  <th className="px-6 py-4 text-left">Patient</th>
                  <th className="px-6 py-4 text-left">Doctor</th>
                  <th className="px-6 py-4 text-left">Department</th>
                  <th className="px-6 py-4 text-left">Date & Time</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedAppointments.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {app.patient}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.doctor}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-gray-400" />
                        {new Date(app.appointmentDate).toLocaleDateString('en-GB')}
                        <Clock className="w-4 h-4 text-gray-400 ml-2" />
                        {new Date(app.appointmentDate).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          app.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-600'
                            : app.status === 'Upcoming'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-rose-50 text-rose-600'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate(`/dashboard/appointments/view/${app.id}`)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/dashboard/appointments/edit/${app.id}`)}
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {filteredAppointments.length > 0 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Showing {startItem} to {endItem} of {filteredAppointments.length} appointments
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-600 px-3">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Appointments;