import React, { useState, useEffect } from 'react';
import { Search, History, Loader, AlertCircle, ChevronLeft, ChevronRight, ArrowLeft, FileText, Stethoscope, Calendar } from 'lucide-react';
import api from '../../../../api/axios';

const PatientHistory = () => {
  const [view, setView] = useState('list');
  const [patients, setPatients] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPatients = async (page = 1) => {
    setLoading(true);
    try {
      const response = await api.get('/receptionist/patient/search', {
        params: { searchTerm, page, pageSize: 10 }
      });
      setPatients(response.data.data || []);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      console.error("Failed to fetch patients", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = async (patient) => {
    setLoading(true);
    try {
      const response = await api.get(`/receptionist/patient/history/${patient.id}`);
      setHistory(response.data.history || []);
      setSelectedPatient(patient);
      setView('details');
    } catch (err) {
      console.error("Failed to load history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === 'list') fetchPatients(1);
  }, [view]);

  // --- DETAIL VIEW ---
  if (view === 'details') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('list')} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer shadow-sm">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl px-5 py-4 text-white shadow-sm flex-1">
            <h1 className="text-xl font-bold tracking-tight">Records: {selectedPatient?.fullName}</h1>
            <p className="text-purple-100 text-sm mt-0.5">ID: {selectedPatient?.patientIdCode} | {history.length} Visits</p>
          </div>
        </div>

        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-gray-200 text-gray-500">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              No medical records found for this patient.
            </div>
          ) : (
            history.map((record) => (
              <div key={record.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header: Date and Title */}
                <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                    <FileText className="w-4 h-4 text-purple-600" /> 
                    {record.title}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full uppercase">
                    <Calendar className="w-3 h-3" />
                    {new Date(record.recordDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Diagnosis and Prescription */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Diagnosis</p>
                      <p className="text-sm text-gray-700 mt-1 font-medium bg-gray-50 p-2.5 rounded-lg border border-gray-100">{record.diagnosis}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Prescription</p>
                      <p className="text-sm text-gray-700 mt-1 font-medium bg-blue-50 p-2.5 rounded-lg border border-blue-100">{record.prescription}</p>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Clinical Notes</p>
                    <div className="bg-gray-50 p-3 rounded-lg mt-1 text-sm text-gray-600 border border-gray-100">
                      {record.notes || "No additional notes provided."}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500 font-bold">
                    <Stethoscope className="w-4 h-4" /> Doctor: {record.doctorName}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl px-5 py-4 text-white shadow-sm">
        <h1 className="text-xl font-bold tracking-tight">Patient History Logs</h1>
        <p className="text-purple-100 text-sm mt-0.5">Find a patient to view their complete medical timeline</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name, Patient ID, or Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchPatients(1)}
            className="w-full pl-9 pr-3.5 py-1.5 text-sm border border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none bg-gray-50 transition"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/70">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Registered Patients</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {loading ? (
             <div className="p-8 text-center text-purple-600"><Loader className="w-6 h-6 animate-spin mx-auto" /></div>
          ) : patients.map((patient) => (
            <div key={patient.id} className="p-4 hover:bg-gray-50/40 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm">
                  {patient.fullName?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{patient.fullName}</h3>
                  <p className="text-xs font-semibold text-gray-400">ID: {patient.patientIdCode} • {patient.phone}</p>
                </div>
              </div>
              <button 
                onClick={() => handleViewHistory(patient)}
                className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition cursor-pointer flex items-center gap-2"
              >
                <History className="w-3.5 h-3.5" /> See History
              </button>
            </div>
          ))}
        </div>

        {patients.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-100">
            <p className="text-xs text-gray-500">Page {currentPage} of {totalPages}</p>
            <div className="flex gap-2">
              <button disabled={currentPage === 1} onClick={() => fetchPatients(currentPage - 1)} className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
              <button disabled={currentPage === totalPages} onClick={() => fetchPatients(currentPage + 1)} className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientHistory;