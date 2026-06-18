import React, { useState } from 'react';
import PrescriptionForm from './PrescriptionForm';
import PrescriptionPreview from './PrescriptionPreview';

const DoctorPrescriptions = () => {
  const [currentView, setCurrentView] = useState('create'); // 'create' or 'preview'
  const [activePatient] = useState({
    id: "P-1043",
    name: "Arjun Mehta",
    age: 42,
    gender: "Male",
    date: "June 17, 2026"
  });

  const [prescriptionData, setPrescriptionData] = useState({
    medicines: [
      { id: 1, name: 'Metformin 500mg', dosage: '1-0-1', instructions: 'After meals', duration: '30 Days' },
      { id: 2, name: 'Atorvastatin 10mg', dosage: '0-0-1', instructions: 'At bedtime', duration: '15 Days' }
    ],
    notes: 'Monitor fasting blood glucose levels daily. Maintain low glycemic index diet lifestyle patterns.'
  });

  const handleFormSubmit = (updatedData) => {
    setPrescriptionData(updatedData);
    setCurrentView('preview');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Rx Prescription Engine</h1>
        <p className="text-gray-500 text-sm mt-1">Generate accurate therapeutic scripts, coordinate exact dosages, add clinical warnings, and print order charts.</p>
      </div>

      {currentView === 'create' ? (
        <PrescriptionForm 
          patient={activePatient}
          initialData={prescriptionData}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <PrescriptionPreview 
          patient={activePatient}
          data={prescriptionData}
          onEdit={() => setCurrentView('create')}
        />
      )}
    </div>
  );
};

export default DoctorPrescriptions;