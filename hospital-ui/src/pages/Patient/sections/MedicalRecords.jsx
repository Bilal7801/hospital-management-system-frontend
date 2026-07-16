import React from 'react';
import PatientHeader from '../components/PatientHeader';

const MedicalRecords = () => {
  return (
    <div>
      <PatientHeader 
        title="Medical Records" 
        subtitle="Access your health prescriptions, files, and treatment history safely." 
      />
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
        <p className="text-gray-500 font-medium">Your comprehensive medical histories will render here.</p>
      </div>
    </div>
  );
};

export default MedicalRecords;