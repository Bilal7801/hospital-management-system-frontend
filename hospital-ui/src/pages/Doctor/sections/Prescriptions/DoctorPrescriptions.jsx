import React, { useState, useEffect } from 'react';
import PrescriptionForm from './PrescriptionForm';
import PrescriptionPreview from './PrescriptionPreview';
import api from '../../../../api/axios';
import { Loader2, ChevronLeft, ChevronRight, User, Eye } from 'lucide-react';

const DoctorPrescriptions = () => {
  const [patients, setPatients] = useState([]); // Actually appointments now
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentView, setCurrentView] = useState('patient-list');
  const [prescriptionData, setPrescriptionData] = useState({ medicines: [], notes: '' });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingPrescription, setViewingPrescription] = useState(null);
  const itemsPerPage = 10;

  // Fetch Doctor's Appointments
  const fetchMyAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/doctor/prescriptions/my-appointments');
      const data = res.data.data || [];
      console.log("📋 Appointments loaded:", data);
      setPatients(data);
      setFilteredPatients(data);
    } catch (error) {
      console.error("Failed to load appointments", error);
      setPatients([]);
      setFilteredPatients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  // Search + Pagination
  useEffect(() => {
    let result = patients;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = patients.filter(p => 
        p.patientName?.toLowerCase().includes(term) || 
        p.appointmentCode?.toLowerCase().includes(term)
      );
    }

    setFilteredPatients(result);
    setCurrentPage(1);
  }, [searchTerm, patients]);

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectPatient = (appointment) => {
    console.log("👤 Selected Appointment:", appointment);
    console.log("Appointment ID to send:", appointment.id);
    // Map appointment to patient object with all required fields
    const patientObj = {
      id: appointment.id,
      name: appointment.patientName,
      gender: appointment.gender || 'Not specified',
      age: appointment.age || 'N/A',
      date: appointment.date,
      appointmentCode: appointment.appointmentCode
    };
    setSelectedPatient(patientObj);
    setCurrentView('create');
    setPrescriptionData({ medicines: [], notes: '' });
  };

  // Fetch existing prescription for viewing
  const fetchExistingPrescription = async (appointmentId) => {
    try {
      setLoading(true);
      const res = await api.get(`/doctor/prescriptions/${appointmentId}`);
      const prescription = res.data.data;
      console.log("📄 Prescription fetched:", prescription);
      
      // Find the appointment data for patient info
      const appointment = patients.find(p => p.id === appointmentId);
      if (appointment) {
        const patientObj = {
          id: appointment.id,
          name: appointment.patientName,
          gender: appointment.gender || 'Not specified',
          age: appointment.age || 'N/A',
          date: appointment.date,
          appointmentCode: appointment.appointmentCode
        };
        setSelectedPatient(patientObj);
      }
      
      setViewingPrescription(prescription);
      setCurrentView('view-prescription');
    } catch (error) {
      console.error("Failed to load prescription", error);
      alert("No prescription found for this appointment or failed to load.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (updatedData) => {
    try {
      const payload = {
        appointmentId: selectedPatient?.id || 0,
        medicines: updatedData.medicines.map(m => ({
          medicineName: m.name || '',
          dosage: m.dosage || '',
          instructions: m.instructions || '',
          duration: m.duration || ''
        })),
        clinicalNotes: updatedData.notes || ''
      };

      console.log("🚀 SENDING TO BACKEND:", payload);

      const response = await api.post('/doctor/prescriptions', payload);
      
      console.log("✅ SUCCESS:", response.data);
      setPrescriptionData(updatedData);
      setCurrentView('preview');
      alert("Prescription saved successfully!");
    } catch (error) {
      console.error("❌ FAILED:", error.response?.data || error);
      alert("Failed to save. Check console for details.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Rx Prescription Engine</h1>
        <p className="text-gray-500 text-sm mt-1">Select appointment → Generate prescription</p>
      </div>

      {currentView === 'patient-list' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by patient name or APT-XXXX..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="mb-6 border border-gray-200 rounded-xl overflow-hidden">
            {paginatedPatients.length === 0 ? (
              <p className="py-12 text-center text-gray-500">No appointments found</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {paginatedPatients.map(apt => (
                  <div key={apt.id} className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-5 py-4 hover:bg-blue-50/60 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{apt.patientName}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {apt.appointmentCode} • {new Date(apt.date).toLocaleDateString()} 
                          {apt.age && apt.gender ? ` • ${apt.age} Yrs • ${apt.gender}` : ''}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => fetchExistingPrescription(apt.id)}
                        className="inline-flex items-center justify-center rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm font-medium text-amber-600 transition hover:border-amber-300 hover:bg-amber-50"
                        title="View Prescription"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleSelectPatient(apt)}
                        className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-600 transition hover:border-blue-300 hover:bg-blue-50"
                      >
                        Create Prescription
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {currentView === 'create' && selectedPatient && (
        <PrescriptionForm 
          patient={selectedPatient}
          initialData={prescriptionData}
          onSubmit={handleFormSubmit}
          onBack={() => setCurrentView('patient-list')}
        />
      )}

      {currentView === 'preview' && selectedPatient && (
        <PrescriptionPreview 
          patient={selectedPatient}
          data={prescriptionData}
          onEdit={() => setCurrentView('create')}
        />
      )}

      {currentView === 'view-prescription' && selectedPatient && viewingPrescription && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <button
              onClick={() => {
                setCurrentView('patient-list');
                setViewingPrescription(null);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to List
            </button>
            <h2 className="ml-auto font-semibold text-gray-900">Current Prescription</h2>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            {/* Patient Info */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Patient Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Name</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Age</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.age} Years</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Gender</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Date</p>
                  <p className="text-sm font-medium text-gray-900">{new Date(selectedPatient.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Medicines */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Medications</h3>
              {viewingPrescription.medicines && viewingPrescription.medicines.length > 0 ? (
                <div className="space-y-3">
                  {viewingPrescription.medicines.map((med, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Medicine</p>
                          <p className="text-sm font-medium text-gray-900">{med.medicineName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Dosage</p>
                          <p className="text-sm font-medium text-gray-900 font-mono">{med.dosage}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Instructions</p>
                          <p className="text-sm font-medium text-gray-900">{med.instructions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Duration</p>
                          <p className="text-sm font-medium text-gray-900">{med.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No medications prescribed.</p>
              )}
            </div>

            {/* Clinical Notes */}
            {viewingPrescription.clinicalNotes && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Clinical Notes</h3>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{viewingPrescription.clinicalNotes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPrescriptions;