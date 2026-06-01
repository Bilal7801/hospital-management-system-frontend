// pages/Receptionist/sections/doctor-slot-management/ViewDoctors.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Stethoscope, MapPin, CheckCircle, XCircle, Loader2, AlertCircle, Users } from 'lucide-react';
import api from '../../../../api/axios';

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = useCallback(async (search = '') => {
    setLoading(true);
    setError(null);

    try {
      const url = search 
        ? `/receptionist/doctor-slot-management/doctors?search=${encodeURIComponent(search)}`
        : `/receptionist/doctor-slot-management/doctors`;

      console.log('🔗 Fetching doctors from:', url);

      const response = await api.get(url);

      if (response.data.success) {
        setDoctors(response.data.data || []);
      } else {
        throw new Error(response.data.message || 'Failed to load doctors');
      }
    } catch (err) {
      console.error('❌ Error fetching doctors:', err);
      
      let errorMsg = 'Something went wrong';
      if (err.response?.status === 404) {
        errorMsg = 'API endpoint not found. Please check backend.';
      } else if (err.response?.status === 401) {
        errorMsg = 'Unauthorized access.';
      } else {
        errorMsg = err.response?.data?.message || err.message;
      }

      setError(errorMsg);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchDoctors(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, fetchDoctors]);

  return (
    <div className="space-y-5">
      {/* Header Section - Matching AppointmentManagement */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Doctor Slot Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          View and manage medical practitioners and their availability
        </p>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search doctor name or specialization..." 
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 transition-all font-medium placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="text-xs font-bold text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>Total Doctors:</span>
          <span className="text-blue-600 font-extrabold">
            {loading ? '...' : doctors.length}
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-16 flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading medical practitioners...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 flex gap-3">
          <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Failed to load doctors</p>
            <p className="text-sm mt-1">{error}</p>
            <button 
              onClick={() => fetchDoctors(searchQuery)}
              className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Doctors Table */}
      {!loading && !error && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Provider ID</th>
                  <th className="px-6 py-4 text-left font-bold">Doctor Name</th>
                  <th className="px-6 py-4 text-left font-bold">Specialization</th>
                  <th className="px-6 py-4 text-left font-bold">Department</th>
                  <th className="px-6 py-4 text-left font-bold">Duty Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {doctors.length > 0 ? (
                  doctors.map((doc) => (
                    <tr key={doc.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-blue-600 tracking-wide">
                        {doc.doctorCode}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-800">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold border border-blue-100">
                            {doc.name?.split(' ')[1]?.charAt(0) || 'D'}
                          </div>
                          <span>{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-blue-500" />
                          {doc.specialty}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {doc.department}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${
                          doc.status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {doc.status === 'Active' ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {doc.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center text-gray-400 font-medium">
                      {searchQuery 
                        ? 'No matching doctors found for your search.' 
                        : 'No doctors available in the registry.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDoctors;