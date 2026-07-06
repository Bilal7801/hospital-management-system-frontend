import React, { useState, useEffect } from 'react';
import ConsultationQueue from './ConsultationQueue';
import ConsultationForm from './ConsultationForm';
import api from '../../../../api/axios';
import { Loader2 } from 'lucide-react';

const DoctorConsultations = () => {
  const [queue, setQueue] = useState([]);
  const [activeConsultation, setActiveConsultation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Today's Queue
  const fetchQueue = async () => {
    try {
      setLoading(true);
      const res = await api.get('/doctor/consultations/queue');
      setQueue(res.data.data || []);
    } catch (error) {
      console.error("Failed to load queue", error);
      setQueue([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleStartConsultation = async (patient) => {
    try {
      await api.post(`/doctor/consultations/${patient.id}/start`);
      setActiveConsultation(patient);
      fetchQueue(); // Refresh queue
    } catch (error) {
      console.error("Failed to start consultation", error);
      alert("Failed to start consultation");
    }
  };

  const handleCompleteConsultation = async (appointmentId, caseData) => {
    try {
      await api.post(`/doctor/consultations/${appointmentId}/complete`, caseData);
      setActiveConsultation(null);
      fetchQueue(); // Refresh queue
    } catch (error) {
      console.error("Failed to complete consultation", error);
      alert("Failed to save consultation");
    }
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
            loading={loading}
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