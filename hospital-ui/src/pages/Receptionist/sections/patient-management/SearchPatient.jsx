// pages/Receptionist/sections/patient-management/SearchPatient.jsx
import React, { useState } from 'react';
import { Search, Phone, MapPin, Calendar, Loader, AlertCircle } from 'lucide-react';

const SearchPatient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filterType, setFilterType] = useState('all');

  // Mock data
  const mockPatients = [
    {
      id: 'PID-78492',
      name: 'Ahmed Khan',
      phone: '0300-1234567',
      cnic: '12345-6789012-3',
      age: 29,
      gender: 'Male',
      email: 'ahmed@example.com',
      lastVisit: '2024-05-15',
      status: 'Active',
      address: 'Karachi, Pakistan'
    },
    {
      id: 'PID-78493',
      name: 'Fatima Ali',
      phone: '0321-9876543',
      cnic: '12346-6789012-3',
      age: 34,
      gender: 'Female',
      email: 'fatima@example.com',
      lastVisit: '2024-05-18',
      status: 'Active',
      address: 'Lahore, Pakistan'
    },
    {
      id: 'PID-78494',
      name: 'Muhammad Hassan',
      phone: '0333-5555555',
      cnic: '12347-6789012-3',
      age: 45,
      gender: 'Male',
      email: 'hassan@example.com',
      lastVisit: '2024-04-20',
      status: 'Inactive',
      address: 'Islamabad, Pakistan'
    },
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
  };

  const filteredPatients = mockPatients.filter(patient => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      patient.name.toLowerCase().includes(term) ||
      patient.id.toLowerCase().includes(term) ||
      patient.phone.includes(term) ||
      patient.cnic.includes(term);

    if (filterType === 'all') return matchesSearch;
    if (filterType === 'active') return matchesSearch && patient.status === 'Active';
    if (filterType === 'inactive') return matchesSearch && patient.status === 'Inactive';
    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header Panel - Scaled down to match layout */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl px-5 py-4 text-white shadow-sm">
        <h1 className="text-xl font-bold tracking-tight">Search Patient</h1>
        <p className="text-blue-100 text-sm mt-0.5">Find and access patient records instantly</p>
      </div>

      {/* Control Search & Filter Block */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 items-end">
          
          {/* Main Input query */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Search Query</label>
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Name, Patient ID, Phone or CNIC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-9 pr-3.5 py-1.5 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Dropdown status filter */}
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

          {/* Query Action trigger button */}
          <div>
            <button
              onClick={handleSearch}
              disabled={loading || !searchTerm.trim()}
              className="w-full px-4 py-1.5 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 transition flex items-center justify-center gap-2 cursor-pointer h-[34px]"
            >
              {loading ? (
                <>
                  <Loader className="w-3.5 h-3.5 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Core Search Results Segment */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/70">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Search Results {filteredPatients.length > 0 && <span className="text-blue-600 font-extrabold ml-0.5">({filteredPatients.length})</span>}
          </h2>
        </div>

        {filteredPatients.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              {searchTerm ? 'No records match your layout criteria.' : 'Enter a patient identity metric above to request listings.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="p-4 hover:bg-gray-50/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Left profile info cluster */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-sm">
                      {patient.name.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <h3 className="text-sm font-bold text-gray-900 truncate">{patient.name}</h3>
                        <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold border ${
                          patient.status === 'Active' 
                            ? 'bg-green-50 text-green-700 border-green-100' 
                            : 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}>
                          {patient.status}
                        </span>
                        <span className="text-xs font-semibold text-gray-400">ID: {patient.id}</span>
                      </div>

                      {/* Meta values row */}
                      <div className="flex items-center gap-x-4 gap-y-1 text-xs text-gray-500 flex-wrap font-medium">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{patient.age} yrs • {patient.gender}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span className="truncate max-w-[180px]">{patient.address}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 font-medium">Last Record Access: {new Date(patient.lastVisit).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Actions buttons cluster */}
                  <div className="flex sm:flex-col gap-2 justify-end">
                    <button
                      onClick={() => setSelectedPatient(selectedPatient?.id === patient.id ? null : patient)}
                      className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition cursor-pointer min-w-[95px] text-center"
                    >
                      {selectedPatient?.id === patient.id ? 'Hide' : 'View'} Details
                    </button>
                    <button className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold border border-blue-200 text-blue-600 bg-white hover:bg-gray-50 rounded-xl transition cursor-pointer min-w-[95px] text-center">
                      Appointment
                    </button>
                  </div>
                </div>

                {/* Extended Dropdown Detail Drawer */}
                {selectedPatient?.id === patient.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-50/50 p-3 rounded-xl border border-gray-100">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Route</p>
                      <p className="text-xs text-gray-800 font-semibold mt-0.5">{patient.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">National Identity Code (CNIC)</p>
                      <p className="text-xs text-gray-800 font-semibold mt-0.5">{patient.cnic}</p>
                    </div>
                    <div className="md:text-right">
                      <button className="w-full md:w-auto px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer">
                        Edit Profile Info
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPatient;