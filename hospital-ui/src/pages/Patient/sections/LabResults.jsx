import React from 'react';
import PatientHeader from '../components/PatientHeader';

const LabResults = () => {
  return (
    <div>
      <PatientHeader 
        title="Lab Results" 
        subtitle="Track down diagnostics, pathology charts, and scans." 
      />
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
        <p className="text-gray-500 font-medium">Detailed physiological reports and test results go here.</p>
      </div>
    </div>
  );
};

export default LabResults;