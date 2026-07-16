import React from 'react';
import PatientHeader from '../components/PatientHeader';

const PatientAppointments = () => {
  return (
    <div>
      <PatientHeader 
        title="Appointments" 
        subtitle="Manage and schedule checkups with your medical specialist." 
      />
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
        <p className="text-gray-500 font-medium">Your upcoming and previous appointment logs will render here.</p>
      </div>
    </div>
  );
};

export default PatientAppointments;