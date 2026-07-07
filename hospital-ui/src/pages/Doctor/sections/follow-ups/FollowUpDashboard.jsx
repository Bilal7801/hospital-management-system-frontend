import React, { useState, useEffect } from 'react';
import PatientList from './PatientList';
import AdviseDateForm from './AdviseDateForm';
import VisitNotesForm from './VisitNotesForm';
import PatientMedicalRecord from '../Patients/PatientMedicalRecord';
import api from '../../../../api/axios';

const FollowUpDashboard = () => {
  const [activeTab, setActiveTab] = useState('view-patients');
  const [patients, setPatients] = useState([]);
  const [targetPatientId, setTargetPatientId] = useState('');
  const [selectedPatientDetail, setSelectedPatientDetail] = useState(null);
  const [loading, setLoading] = useState(true);

const fetchMyPatients = async () => {
  try {
    setLoading(true);
    const res = await api.get('/doctor/followup/my-patients');   // ← Fixed Route
    setPatients(res.data.data || []);
  } catch (err) {
    console.error("Failed to load my patients", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchMyPatients();
  }, []);

  const handleContextAction = (tab, patientId) => {
    setTargetPatientId(patientId);
    setActiveTab(tab);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatientDetail(patient);
    setActiveTab('patient-details');
  };

  const handleBackToList = () => {
    setSelectedPatientDetail(null);
    setActiveTab('view-patients');
  };
const normalizePatientDetail = (patient) => ({
  name: patient?.fullName || patient?.name || 'Unnamed Patient',
  patientCode: patient?.patientIdCode || patient?.id || 'N/A',
  age: patient?.age || 'N/A',
  gender: patient?.gender || 'N/A',
  bloodGroup: patient?.bloodGroup || 'N/A',
  phone: patient?.phone || 'N/A',
  email: patient?.email || 'N/A',
  address: patient?.address || 'N/A',
  condition: patient?.condition || 'N/A',
  lastVisit: patient?.lastVisit || 'N/A',
  nextFollowUp: patient?.nextFollowUp || 'Not Set',
  visitHistory: [], // You can expand later
  allergies: [], 
  conditions: [],
});
  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Patient Follow-ups</h1>
        <p className="text-gray-500 text-sm">Manage follow-ups for patients under your care.</p>
      </div>

      <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-4 pt-2 gap-2 shadow-sm">
        <button onClick={() => setActiveTab('view-patients')} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === 'view-patients' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>View Patients & Progress</button>
        <button onClick={() => setActiveTab('advise-date')} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === 'advise-date' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Advise Follow-up Date</button>
        <button onClick={() => setActiveTab('add-notes')} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === 'add-notes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Add Visit Notes (SOAP)</button>
      </div>

      <div className="bg-white p-6 rounded-b-xl shadow-sm border border-t-0 border-gray-100">
        {loading ? <div className="py-20 text-center">Loading your patients...</div> : (
          <>
            {activeTab === 'view-patients' && (
              <PatientList
                patients={patients}
                onAction={handleContextAction}
                onViewPatient={handleViewPatient}
              />
            )}

            {activeTab === 'patient-details' && selectedPatientDetail && (
              <PatientMedicalRecord
                patient={normalizePatientDetail(selectedPatientDetail)}
                onBack={handleBackToList}
              />
            )}

            {activeTab === 'advise-date' && <AdviseDateForm patients={patients} initialPatientId={targetPatientId} />}
            {activeTab === 'add-notes' && <VisitNotesForm patients={patients} initialPatientId={targetPatientId} />}
          </>
        )}
      </div>
    </div>
  );
};

export default FollowUpDashboard;