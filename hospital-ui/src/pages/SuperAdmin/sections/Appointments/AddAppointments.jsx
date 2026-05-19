import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save, CalendarDays, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/axios';

const AddAppointment = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    departmentId: '',
    appointmentDate: '',
    appointmentTime: '',
    status: 'Upcoming',
    notes: ''
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Fetch Patients and Doctors
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [patientsRes, doctorsRes] = await Promise.all([
          api.get('/superadmin/patients'),
          api.get('/superadmin/doctors')
        ]);

        setPatients(Array.isArray(patientsRes.data) ? patientsRes.data : []);
        setDoctors(Array.isArray(doctorsRes.data) ? doctorsRes.data : []);
      } catch (err) {
        console.error(err);
        setError('Failed to load patients or doctors');
      } finally {
        setLoadingData(false);
      }
    };

    fetchDropdownData();
  }, []);

  // Auto-fill DepartmentId when Doctor is selected (Hidden)
  useEffect(() => {
    if (formData.doctorId) {
      const selectedDoctor = doctors.find(d => d.doctorId === parseInt(formData.doctorId));
      if (selectedDoctor?.departmentId) {
        setFormData(prev => ({
          ...prev,
          departmentId: selectedDoctor.departmentId.toString()
        }));
      }
    }
  }, [formData.doctorId, doctors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const appointmentDateTime = `${formData.appointmentDate}T${formData.appointmentTime}`;

      const payload = {
        patientId: parseInt(formData.patientId),
        doctorId: parseInt(formData.doctorId),
        departmentId: formData.departmentId ? parseInt(formData.departmentId) : null,
        appointmentDate: appointmentDateTime,
        status: formData.status,
        notes: formData.notes
      };

      await api.post('/superadmin/appointments', payload);

      alert('Appointment created successfully!');
      navigate('/dashboard/appointments');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create appointment');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">
      <button
        onClick={() => navigate('/dashboard/appointments')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Appointments
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Create New Appointment</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-2">
              Select Patient *
            </label>
            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer"
            >
              <option value="">-- Select Patient --</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-2">
              Select Doctor *
            </label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer"
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map(d => (
                <option key={d.doctorId} value={d.doctorId}>
                  {d.doctorName} - {d.specialization}
                </option>
              ))}
            </select>
          </div>

          {/* Hidden Department Field */}
          <input type="hidden" name="departmentId" value={formData.departmentId} />

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-2">
                Appointment Date *
              </label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-2">
                Appointment Time *
              </label>
              <input
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Notes / Reason - Big Field */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-2">
              Notes / Reason
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={6}                    // ← Bigger size
              placeholder="Enter reason, special instructions, or additional notes..."
              className="w-full p-4 border border-gray-200 rounded-xl text-sm outline-none resize-y min-h-[140px]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition-all text-white py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Creating Appointment...' : 'Create Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;