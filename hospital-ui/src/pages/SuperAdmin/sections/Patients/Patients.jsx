import React, { useEffect, useMemo, useState } from 'react';
import { Search, Eye, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/axios';

const Patients = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All Genders');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await api.get('/superadmin/patients');
        
        setPatients(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError('Failed to load patients. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Process rows with proper doctor name extraction
  const rows = useMemo(() => {
    return patients.map((patient) => {
      const doctorName = patient.assignedDoctor 
        ? (patient.assignedDoctor.doctorName || 
           patient.assignedDoctor.fullName || 
           'Not Assigned')
        : 'Not Assigned';

      return {
        id: patient.id,
        name: patient.fullName || 'N/A',
        gender: patient.gender || 'N/A',
        age: patient.age ?? '-',
        doctor: doctorName,
        status: patient.status || 'Active',
      };
    });
  }, [patients]);

  const filteredPatients = useMemo(() => {
    return rows.filter((patient) => {
      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        patient.name.toLowerCase().includes(search) ||
        patient.doctor.toLowerCase().includes(search);

      const matchesGender =
        genderFilter === 'All Genders' || patient.gender === genderFilter;

      const matchesStatus =
        statusFilter === 'All Status' || patient.status === statusFilter;

      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [rows, searchTerm, genderFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / itemsPerPage));

  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPatients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPatients, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, genderFilter, statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startItem = filteredPatients.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredPatients.length);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Patient Management</h2>
        <p className="text-xs text-gray-400 mt-1">
          View patient records, appointments and history
        </p>
      </div>

      {/* Search + Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patient or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer"
          >
            <option>All Genders</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading patients...</div>
        ) : error ? (
          <div className="p-8 text-center text-rose-600">{error}</div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-[11px] uppercase text-gray-400">
                  <th className="px-6 py-4 text-left">Patient</th>
                  <th className="px-6 py-4 text-left">Gender</th>
                  <th className="px-6 py-4 text-left">Age</th>
                  <th className="px-6 py-4 text-left">Assigned Doctor</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedPatients.length > 0 ? (
                  paginatedPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {patient.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{patient.gender}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{patient.age}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{patient.doctor}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          patient.status === 'Active' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => navigate(`view/${patient.id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {filteredPatients.length > 0 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Showing {startItem} to {endItem} of {filteredPatients.length} patients
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600 px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-50"
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

export default Patients;