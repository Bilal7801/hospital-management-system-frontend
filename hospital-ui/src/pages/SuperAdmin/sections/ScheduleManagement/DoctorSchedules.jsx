import React, { useEffect, useState } from 'react';
import {
  Plus,
  Calendar,
  Eye,
  Edit2,
  Trash2,
  Clock,
  Building2,
  Search,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from "../../../../api/axios";

const DoctorSchedules = () => {
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // SEARCH + FILTER STATE
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const formatTime = (timeString) => {
    if (!timeString) return '--:--';
    try {
      const date = new Date(`1970-01-01T${timeString}`);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return String(timeString).slice(0, 5);
    }
  };

  const formatDays = (daysValue) => {
    if (!daysValue) return 'N/A';
    if (Array.isArray(daysValue)) return daysValue.join(', ');
    if (typeof daysValue === 'string') {
      return daysValue.includes(',')
        ? daysValue.split(',').map(d => d.trim()).join(', ')
        : daysValue;
    }
    return 'N/A';
  };

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✅ Correct API Route
      const response = await api.get('/superadmin/doctor-schedule');

      const formattedSchedules = (response.data?.data || response.data || []).map((item) => ({
        id: item.scheduleId,
        doctor: item.doctorName || 'N/A',
        department: item.departmentName || 'N/A',
        days: formatDays(item.workingDays),
        time: `${formatTime(item.startTime)} - ${formatTime(item.endTime)}`,
        break: `${formatTime(item.breakStart)} - ${formatTime(item.breakEnd)}`,
        slot: `${item.slotDuration} min`,
        status: item.isActive ? 'Active' : 'Inactive',
      }));

      setSchedules(formattedSchedules);
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      setError("Failed to load doctor schedules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this schedule?')) return;

    try {
      await api.delete(`/superadmin/doctor-schedule/${id}`);
      setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
      alert("Schedule deleted successfully");
    } catch (error) {
      console.error('Delete failed:', error);
      alert("Failed to delete schedule");
    }
  };

  // FILTER LOGIC
  const filteredSchedules = schedules.filter((sch) => {
    const q = search.toLowerCase();
    const matchesSearch = 
      sch.doctor.toLowerCase().includes(q) ||
      sch.department.toLowerCase().includes(q) ||
      sch.days.toLowerCase().includes(q);

    const matchesStatus = statusFilter === "All" || sch.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Doctor Schedule Management</h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage working hours, available days, breaks and appointment slots
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate('/dashboard/doctor-schedule/manage-leave')}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
          >
            Manage Leaves
          </button>

          <button
            onClick={() => navigate('/dashboard/doctor-schedule/set-schedule')}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Set New Schedule
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor, department or days..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Total Schedules</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{schedules.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Active</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {schedules.filter(s => s.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Slot System</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">Ready</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading schedules...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-[11px] uppercase tracking-wider text-gray-400">
                <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                <th className="px-6 py-4 text-left font-semibold">Department</th>
                <th className="px-6 py-4 text-left font-semibold">Working Days</th>
                <th className="px-6 py-4 text-left font-semibold">Time</th>
                <th className="px-6 py-4 text-left font-semibold">Break</th>
                <th className="px-6 py-4 text-left font-semibold">Slot</th>
                <th className="px-6 py-4 text-center font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredSchedules.length > 0 ? (
                filteredSchedules.map((sch) => (
                  <tr key={sch.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{sch.doctor}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sch.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sch.days}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sch.time}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sch.break}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sch.slot}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        sch.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {sch.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => navigate(`/dashboard/doctor-schedule/view/${sch.id}`)} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => navigate(`/dashboard/doctor-schedule/edit/${sch.id}`)} className="text-amber-600 hover:text-amber-800 cursor-pointer">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(sch.id)} className="text-red-600 hover:text-red-800 cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-gray-400">
                    No schedules found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorSchedules;