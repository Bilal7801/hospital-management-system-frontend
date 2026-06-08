import React, { useState, useEffect } from 'react';
import { FileText, Save, Info, Loader2, CheckCircle, AlertCircle, User, Calendar } from 'lucide-react';
import api from '../../../../api/axios';

const AddVisitNote = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    appointmentId: '',
    doctorId: '',
    noteType: 'FrontDesk',
    noteText: ''
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch Patients & Doctors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, doctorsRes] = await Promise.all([
          api.get('/receptionist/patient/search?searchTerm=&page=1&pageSize=100'),
          api.get('/superadmin/doctors/search')
        ]);

        setPatients(patientsRes.data.data || []);
        setDoctors(doctorsRes.data || []);
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.patientId || !formData.noteText.trim()) {
      setError("Patient and Note text are required");
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const payload = {
        patientId: parseInt(formData.patientId),
        appointmentId: formData.appointmentId ? parseInt(formData.appointmentId) : null,
        doctorId: formData.doctorId ? parseInt(formData.doctorId) : null,
        noteType: formData.noteType,
        noteText: formData.noteText.trim()
      };

      const response = await api.post('/receptionist/visit-records/note', payload);

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          patientId: '',
          appointmentId: '',
          doctorId: '',
          noteType: 'FrontDesk',
          noteText: ''
        });
        
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save note");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="border-b border-gray-100 pb-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
            <FileText className="w-5 h-5 text-blue-600" />
            Add Front-Desk Encounter Note
          </h3>
          <p className="text-sm text-gray-500 mt-1">Log administrative observations, intake notes, and non-clinical details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Patient</label>
              <select
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
                required
              >
                <option value="">Select Patient</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} {p.patientIdCode ? `(${p.patientIdCode})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Doctor (Optional)</label>
              <select
                value={formData.doctorId}
                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
              >
                <option value="">Select Doctor</option>
                {doctors.map(d => (
                  <option key={d.doctorId || d.DoctorId} value={d.doctorId || d.DoctorId}>
                    {d.doctorName || d.DoctorName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Note Type</label>
            <select
              value={formData.noteType}
              onChange={(e) => setFormData({ ...formData, noteType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
            >
              <option value="FrontDesk">Front Desk Observation</option>
              <option value="Administrative">Administrative Note</option>
              <option value="Intake">Intake / Triage Note</option>
              <option value="FollowUp">Follow-up Instruction</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Note / Observation</label>
            <textarea
              rows="6"
              value={formData.noteText}
              onChange={(e) => setFormData({ ...formData, noteText: e.target.value })}
              placeholder="Patient arrived with family member. Requested wheelchair assistance. Insurance verified successfully..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm resize-y min-h-[140px]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !formData.patientId || !formData.noteText.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving Note...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Encounter Note
              </>
            )}
          </button>
        </form>
      </div>

      {/* Info Panel */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-600">
            <Info className="w-5 h-5" />
            <h4 className="font-semibold">Important Guidelines</h4>
          </div>
          <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
            <p>• Only administrative and front-desk observations should be recorded here.</p>
            <p>• Medical diagnosis, prescriptions, and treatment plans must be entered by doctors.</p>
            <p>• All notes are timestamped and linked to the responsible staff member.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVisitNote;