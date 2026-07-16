import React from 'react';
import PatientHeader from '../components/PatientHeader';

const TeleConsult = () => {
  return (
    <div>
      <PatientHeader 
        title="Tele-Consultation" 
        subtitle="Instantly connect to medical checkups online through live calls." 
      />
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
        <p className="text-gray-500 font-medium">Your video consulting connections and scheduler tools will reside here.</p>
      </div>
    </div>
  );
};

export default TeleConsult;