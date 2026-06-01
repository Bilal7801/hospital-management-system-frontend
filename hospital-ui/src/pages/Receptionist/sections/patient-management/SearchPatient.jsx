import React, { useState, useEffect } from 'react';
import { Search, Phone, MapPin, Calendar, Loader, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/axios';

const SearchPatient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const navigate = useNavigate();

  // Fetch data function
  const handleSearch = async (page = 1) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/receptionist/patient/search', {
        params: {
          searchTerm: searchTerm,
          status: filterType,
          page: page,
          pageSize: 10
        }
      });

      setPatients(response.data.data || response.data || []);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage || 1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search patients');
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    handleSearch(1);
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl px-5 py-4 text-white shadow-sm">
        <h1 className="text-xl font-bold tracking-tight">Search Patient</h1>
        <p className="text-blue-100 text-sm mt-0.5">Find and access patient records instantly</p>
      </div>

      {/* Search Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Search Query</label>
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Name, Patient ID, Phone or CNIC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(1)}
                className="w-full pl-9 pr-3.5 py-1.5 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status Filter</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 cursor-pointer text-gray-700 font-medium transition"
            >
              <option value="all">All Patients</option>
              <option value="active">Active Patients</option>
              <option value="inactive">Inactive Patients</option>
            </select>
          </div>

          <div>
            <button
              onClick={() => handleSearch(1)}
              disabled={loading}
              className="w-full px-4 py-1.5 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 transition flex items-center justify-center gap-2 cursor-pointer h-[34px]"
            >
              {loading ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <> <Search className="w-3.5 h-3.5" /> <span>Search</span></>}
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm p-3 bg-red-50 rounded-xl">{error}</p>}

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/70">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Search Results</h2>
        </div>

        {patients.length === 0 && !loading && (
          <div className="px-4 py-8 text-center">
            <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No patients found.</p>
          </div>
        )}

        <div className="divide-y divide-gray-100">
          {patients.map((patient) => (
            <div key={patient.id} className="p-4 hover:bg-gray-50/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-sm">
                    {patient.fullName?.charAt(0) || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <h3 className="text-sm font-bold text-gray-900 truncate">{patient.fullName}</h3>
                      <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold border ${patient.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {patient.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-x-4 gap-y-1 text-xs text-gray-500 flex-wrap font-medium">
                      <div className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-gray-400" /><span>{patient.phone}</span></div>
                      <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gray-400" /><span>{patient.age} yrs • {patient.gender}</span></div>
                      <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /><span className="truncate max-w-[180px]">{patient.address}</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 justify-end">
                  {/* ✅ Fixed Navigation */}
                  <button 
                    onClick={() => navigate(`/receptionist/patient/details/${patient.id}`)}
                    className="px-4 py-1.5 text-xs font-semibold bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition cursor-pointer min-w-[100px]"
                  >
                    View Details
                  </button>

                  {/* Update Patient Button */}
             <button 
  onClick={() => navigate(`/receptionist/patient/edit/${patient.id}`)}
  className="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition cursor-pointer min-w-[100px]"
>
  Update Patient
</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {patients.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-100">
            <p className="text-xs text-gray-500">Page {currentPage} of {totalPages}</p>
            <div className="flex gap-2">
              <button disabled={currentPage === 1} onClick={() => handleSearch(currentPage - 1)} className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
              <button disabled={currentPage === totalPages} onClick={() => handleSearch(currentPage + 1)} className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPatient;