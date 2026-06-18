import React, { useState } from 'react';
import ConsultationQueue from './ConsultationQueue';
import ConsultationForm from './ConsultationForm';

const DoctorConsultations = () => {
  const [activeConsultation, setActiveConsultation] = useState(null);
  
  // Simulated Real-time Waiting Line Queue
  const [queue, setQueue] = useState([
    { id: "Apt-101", patientId: "P-1043", name: "Arjun Mehta", age: 42, gender: "Male", timeSlot: "09:00 AM", status: "Waiting", reason: "Chronic Diabetes Checkup" },
    { id: "Apt-102", patientId: "P-2089", name: "Sana Khan", age: 29, gender: "Female", timeSlot: "10:30 AM", status: "Waiting", reason: "Asthma Exacerbation Follow-up" },
    { id: "Apt-103", patientId: "P-3112", name: "Rahul Verma", age: 35, gender: "Male", timeSlot: "11:45 AM", status: "Waiting", reason: "Severe Migraine Aura" }
  ]);

  const handleStartConsultation = (patient) => {
    // Transition patient to active "In Progress" status room
    setQueue(prev => prev.map(p => p.id === patient.id ? { ...p, status: 'In Progress' } : p));
    setActiveConsultation(patient);
  };

  const handleCompleteConsultation = (appointmentId, caseData) => {
    console.log("Saving clinical record encapsulation to server database...", caseData);
    
    // Remove or drop patient out of active waiting room queue list upon completion sign-off
    setQueue(prev => prev.filter(p => p.id !== appointmentId));
    setActiveConsultation(null);
  };

  return (
    <div className="space-y-6">
      {!activeConsultation ? (
        <>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Consultation Room Engine</h1>
            <p className="text-gray-500 text-sm mt-1">Initiate patient charts, document complaints, perform physical exams, and sign off on treatments.</p>
          </div>
          
          <ConsultationQueue 
            queue={queue} 
            onStart={handleStartConsultation} 
          />
        </>
      ) : (
        <ConsultationForm 
          session={activeConsultation} 
          onCancel={() => setActiveConsultation(null)}
          onComplete={handleCompleteConsultation}
        />
      )}
    </div>
  );
};

export default DoctorConsultations;