import React, { useEffect, useState, useMemo } from 'react';
import { Plus, Edit2, Trash2, User, Eye, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from "../../../../api/axios";

const Receptionists = () => {
  const navigate = useNavigate();

  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true);

  // New States for Search, Filter & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // =========================
  // FETCH DATA (Unchanged)
  // =========================
  const fetchReceptionists = async () => {
    try {
      const res = await api.get("/Receptionist");
      setReceptionists(res.data || []);
    } catch (err) {
      console.error("Error fetching receptionists:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceptionists();
  }, []);

  // =========================
  // FILTERED & PAGINATED DATA (Client-side)
  // =========================
  const filteredAndPaginatedData = useMemo(() => {
    let result = [...receptionists];

    // Search by Name or Email
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(rec =>
        rec.name?.toLowerCase().includes(term) ||
        rec.email?.toLowerCase().includes(term)
      );
    }

    // Status Filter
    if (statusFilter !== 'All') {
      result = result.filter(rec => 
        rec.isActive === (statusFilter === 'Active')
      );
    }

    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = result.slice(startIndex, startIndex + itemsPerPage);

    return {
      data: paginatedData,
      totalPages,
      totalItems
    };
  }, [receptionists, searchTerm, statusFilter, currentPage]);

  // =========================
  // DELETE (Unchanged)
  // =========================
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this receptionist?");
    if (!confirm) return;

    try {
      await api.delete(`/Receptionist/${id}`);
      setReceptionists(prev => prev.filter(r => r.receptionistId !== id));
      setCurrentPage(1);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // =========================
  // TOGGLE STATUS (Unchanged)
  // =========================
  const toggleStatus = async (id) => {
    try {
      const res = await api.patch(`/Receptionist/${id}/toggle-status`);

      setReceptionists(prev =>
        prev.map(r =>
          r.receptionistId === id
            ? { ...r, isActive: res.data.isActive }
            : r
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Receptionists Management
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage hospital reception staff
          </p>
        </div>

        <button
          onClick={() => navigate("add")}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Receptionist
        </button>
      </div>

      {/* Search + Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Shift Filter (Placeholder - You can make it functional later) */}
          <select className="px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer">
            <option>All Shifts</option>
            <option>Morning</option>
            <option>Evening</option>
            <option>Night</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-10 text-gray-400">
          Loading receptionists...
        </div>
      ) : (
        <>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-[11px] text-gray-400 uppercase">
                  <th className="px-6 py-4">Receptionist</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredAndPaginatedData.data.length > 0 ? (
                  filteredAndPaginatedData.data.map((rec) => (
                    <tr key={rec.receptionistId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {rec.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {rec.email || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {rec.role}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleStatus(rec.receptionistId)}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-full cursor-pointer ${
                            rec.isActive
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {rec.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`view/${rec.receptionistId}`)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigate(`edit/${rec.receptionistId}`)}
                            className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(rec.receptionistId)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-gray-500">
                      No receptionists found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredAndPaginatedData.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 px-2">
              <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredAndPaginatedData.totalItems)} of{" "}
                {filteredAndPaginatedData.totalItems} receptionists
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm disabled:opacity-50 cursor-pointer hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, filteredAndPaginatedData.totalPages))}
                  disabled={currentPage === filteredAndPaginatedData.totalPages}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm disabled:opacity-50 cursor-pointer hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Receptionists;