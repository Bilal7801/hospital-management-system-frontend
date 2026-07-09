import React, { useState, useEffect } from 'react';
import { Search, Users, Eye, Calendar } from 'lucide-react';
import api from '../../../../api/axios';
import PatientChartDetail from './PatientChartDetail';

const MedicalRecordsDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [patientSearch, setPatientSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all patients (for receptionist/doctor view)
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await api.get('/doctor/medical-records'); // Or /receptionist if needed
      setPatients(res.data.data || []);
    } catch (err) {
      console.error("Failed to load patients", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    (p.fullName || p.name || '').toLowerCase().includes(patientSearch.toLowerCase()) ||
    (p.patientIdCode || p.id || '').toString().includes(patientSearch)
  );

  const openPatientChart = (patient) => {
    setSelectedPatientId(patient.id);
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 md:p-8 print:bg-white print:p-0">
      
      {!selectedPatientId ? (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Master EHR Medical Records Registry</h1>
            <p className="text-gray-500 text-sm mt-0.5">Select a patient file to access clinical timelines, previous prescriptions, and lab data.</p>
          </div>

          {/* Search Controls */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search patient database by name or ID..."
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400 self-end sm:self-center">
              <Users className="w-4 h-4 text-gray-400" />
              <span>Total Records: {patients.length}</span>
            </div>
          </div>

          {/* Patients Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-700">
                  <tr>
                    <th className="p-4">Patient Profile</th>
                    <th className="p-4">Demographics</th>
                    <th className="p-4">Primary Diagnosis</th>
                    <th className="p-4">Last Visit</th>
                    <th className="p-4">Registry Scope</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan="6" className="text-center py-12">Loading records...</td></tr>
                  ) : filteredPatients.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-12 text-gray-400">No patients found</td></tr>
                  ) : (
                    filteredPatients.map((p) => (
                      <tr 
                        key={p.id} 
                        onClick={() => openPatientChart(p)}
                        className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                      >
                        <td className="p-4">
                          <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{p.fullName}</div>
                          <div className="text-xs text-gray-400 font-mono mt-0.5">{p.patientIdCode}</div>
                        </td>
                        <td className="p-4 text-gray-700 font-medium">
                          {p.age} yrs / {p.gender}
                          <div className="text-xs text-gray-400 mt-0.5">Blood Type: {p.bloodGroup || 'N/A'}</div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800">
                            {p.condition || 'N/A'}
                          </span>
                        </td>
                        <td className="p-4 text-xs text-gray-500 font-medium">
                          {p.lastVisit ? new Date(p.lastVisit).toLocaleDateString() : "No visits"}
                        </td>
                        <td className="p-4">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border bg-emerald-50 border-emerald-100 text-emerald-700">
                            Active
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={(e) => { e.stopPropagation(); openPatientChart(p); }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-blue-600 hover:text-white rounded-lg border text-xs font-bold text-gray-700 transition-all shadow-sm"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Open Chart</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <PatientChartDetail 
          patientId={selectedPatientId} 
          onBack={() => setSelectedPatientId(null)} 
        />
      )}
    </div>
  );
};

export default MedicalRecordsDashboard;