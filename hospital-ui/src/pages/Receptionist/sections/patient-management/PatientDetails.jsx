import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, MapPin, Calendar, Loader, Activity } from 'lucide-react';
import api from '../../../../api/axios';

const PatientDetails = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await api.get(`/receptionist/patient/${patientId}`);
        setPatient(response.data);
      } catch (err) {
        console.error("Failed to load patient", err);
        setError(err.response?.data?.message || "Failed to load patient details");
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [patientId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">{error || "Patient not found"}</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Search
      </button>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl px-6 py-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">{patient.fullName}</h1>
        <p className="text-blue-100">Patient ID: {patient.patientIdCode}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h3 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
            <User className="w-4 h-4"/> Personal Info
          </h3>
          <p className="text-sm text-gray-600"><span className="font-semibold">Gender:</span> {patient.gender}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Age:</span> {patient.age}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Status:</span> {patient.status}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h3 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
            <Phone className="w-4 h-4"/> Contact
          </h3>
          <p className="text-sm text-gray-600"><span className="font-semibold">Phone:</span> {patient.phone}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Email:</span> {patient.email || 'N/A'}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Address:</span> {patient.address}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h3 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
            <Activity className="w-4 h-4"/> Medical Summary
          </h3>
          <p className="text-sm text-gray-600">Blood Type: N/A</p>
          <p className="text-sm text-gray-600">Allergies: None</p>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;