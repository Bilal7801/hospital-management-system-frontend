// pages/Receptionist/sections/appointment-management/WalkInAppointment.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Zap, CheckCircle, AlertCircle, Search, User } from 'lucide-react';
import api from '../../../../api/axios';

const WalkInAppointment = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    notes: ''
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientSearch, setPatientSearch] = useState('');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [showPatientList, setShowPatientList] = useState(false);
  const [showDoctorList, setShowDoctorList] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const patientRef = useRef(null);
  const doctorRef = useRef(null);

  // Fetch Patients & Doctors
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [patientsRes, doctorsRes] = await Promise.all([
          api.get('/receptionist/patient/search?searchTerm=&page=1&pageSize=500'),
          api.get('/superadmin/doctors/search')
        ]);

        setPatients(patientsRes.data.data || []);
        setDoctors(doctorsRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (patientRef.current && !patientRef.current.contains(event.target)) {
        setShowPatientList(false);
      }
      if (doctorRef.current && !doctorRef.current.contains(event.target)) {
        setShowDoctorList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPatients = useMemo(() => 
    patients.filter(p => p.fullName?.toLowerCase().includes(patientSearch.toLowerCase())), 
    [patients, patientSearch]
  );

  const filteredDoctors = useMemo(() => 
    doctors.filter(d => 
      d.doctorName?.toLowerCase().includes(doctorSearch.toLowerCase()) || 
      d.specialization?.toLowerCase().includes(doctorSearch.toLowerCase())
    ), 
    [doctors, doctorSearch]
  );

  const selectPatient = (patient) => {
    setFormData(prev => ({ ...prev, patientId: patient.id }));
    setPatientSearch(patient.fullName);
    setShowPatientList(false);
  };

  const selectDoctor = (doctor) => {
    setFormData(prev => ({ ...prev, doctorId: doctor.doctorId }));
    setDoctorSearch(`Dr. ${doctor.doctorName}`);
    setShowDoctorList(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.patientId || !formData.doctorId) {
      setError("Please select both patient and doctor");
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.post('/receptionist/appointment/walkin', {
        patientId: parseInt(formData.patientId),
        doctorId: parseInt(formData.doctorId),
        notes: formData.notes || "Walk-in Appointment"
      });

      setSuccess(true);
      setFormData({ patientId: '', doctorId: '', notes: '' });
      setPatientSearch('');
      setDoctorSearch('');

      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create walk-in appointment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">On-Site Walk-In Matrix</h1>
        <p className="text-blue-100 text-sm mt-1">
          Instantly route patients to available doctors (Department auto-selected)
        </p>
      </div>

      {success && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <p className="text-xs font-bold text-emerald-900">Walk-in token generated successfully!</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <p className="text-xs font-bold text-red-900">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Searchable Patient */}
          <div className="relative" ref={patientRef}>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Search Patient <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Type patient name..."
                value={patientSearch}
                onChange={(e) => {
                  setPatientSearch(e.target.value);
                  setShowPatientList(true);
                }}
                onFocus={() => setShowPatientList(true)}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50"
              />
            </div>

            {showPatientList && patientSearch && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                {filteredPatients.length > 0 ? (
                  filteredPatients.slice(0, 15).map(p => (
                    <div
                      key={p.id}
                      onClick={() => selectPatient(p)}
                      className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-sm border-b last:border-none"
                    >
                      {p.fullName} <span className="text-gray-400">(PID-{p.id.toString().padStart(5, '0')})</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500">No patient found</div>
                )}
              </div>
            )}
          </div>

          {/* Searchable Doctor */}
          <div className="relative" ref={doctorRef}>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Search Doctor <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Type doctor name or specialization..."
                value={doctorSearch}
                onChange={(e) => {
                  setDoctorSearch(e.target.value);
                  setShowDoctorList(true);
                }}
                onFocus={() => setShowDoctorList(true)}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50"
              />
            </div>

            {showDoctorList && doctorSearch && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.slice(0, 12).map(d => (
                    <div
                      key={d.doctorId}
                      onClick={() => selectDoctor(d)}
                      className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-sm border-b last:border-none"
                    >
                      Dr. {d.doctorName} — <span className="text-blue-600">{d.specialization}</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500">No doctor found</div>
                )}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Reason for Visit / Notes
            </label>
            <textarea 
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows="3"
              placeholder="Fever, follow-up, emergency, general checkup, etc..."
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none bg-gray-50 focus:bg-white text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button 
            type="submit"
            disabled={submitting || !formData.patientId || !formData.doctorId}
            className="px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer font-semibold disabled:cursor-not-allowed"
          >
            <Zap className={`w-4 h-4 ${submitting ? 'animate-pulse' : ''}`} />
            <span>{submitting ? 'Generating Token...' : 'Generate Immediate Queue Token'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default WalkInAppointment;