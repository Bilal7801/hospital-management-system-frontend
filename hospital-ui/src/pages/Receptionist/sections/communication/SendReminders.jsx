import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';

const SendReminders = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    type: 'SMS',
    template: 'appointment-reminder',
    recipient: '',
    message: ''
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch Patients and Doctors
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

  // Live Preview
  useEffect(() => {
    let preview = '';
    switch (formData.template) {
      case 'appointment-reminder': preview = "Dear Patient, this is a prompt confirmation note regarding your check-in code scheduled at Metro Care today. Kindly secure arrival 15 mins early."; break;
      case 'follow-up-alert': preview = "Hello, your consulting practitioner has recommended a secondary check-in evaluation cycle. Kindly launch your reservation dashboard slot."; break;
      case 'delay-announcement': preview = "Notice: Due to an un-scheduled medical trauma contingency, current operational timelines are running 20 mins delayed. Thank you for your patience."; break;
      default: preview = formData.message;
    }
    setFormData(prev => ({ ...prev, message: preview }));
  }, [formData.template]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.recipient?.trim()) {
      setError("Recipient (Phone or Email) is required");
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      // Clean payload before sending
      const payload = {
        ...formData,
        patientId: formData.patientId ? parseInt(formData.patientId) : null,
        doctorId: formData.doctorId ? parseInt(formData.doctorId) : null,
        message: formData.message || "General reminder from Metro Care."
      };

      const response = await api.post('/receptionist/communication/send-reminder', payload);
      
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setFormData({
            patientId: '',
            doctorId: '',
            type: 'SMS',
            template: 'appointment-reminder',
            recipient: '',
            message: ''
          });
        }, 2500);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to send reminder");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      {/* Header remains same */}
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-600" />
          Automated Dispatch Transmission Center
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Fire custom appointment configurations directly onto digital channels</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-5">
          {/* Type, Template, Patient, Recipient fields - same as before */}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Notification Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-blue-600 bg-gray-50">
              <option value="SMS">SMS</option>
              <option value="Email">Email</option>
              <option value="Both">SMS + Email</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Template</label>
            <select name="template" value={formData.template} onChange={handleChange} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-blue-600 bg-gray-50">
              <option value="appointment-reminder">Appointment Confirmation</option>
              <option value="follow-up-alert">Follow-up Alert</option>
              <option value="delay-announcement">Delay Announcement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Patient (Optional)</label>
            <select name="patientId" value={formData.patientId} onChange={handleChange} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-blue-600 bg-gray-50">
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.fullName || p.FullName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Recipient *</label>
            <input
              type="text"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              placeholder="03123456789 or email@example.com"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-blue-600 bg-gray-50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold text-xs uppercase py-3.5 rounded-xl flex items-center justify-center gap-2"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {submitting ? 'Sending...' : 'Send Reminder Now'}
          </button>
        </div>

        {/* Preview Area - same as before */}
        <div className="lg:col-span-2 bg-gray-50/50 border border-gray-200 rounded-xl p-5">
          <span className="text-[10px] font-bold text-gray-400 uppercase block mb-2">Message Preview</span>
          <div className="bg-white p-5 rounded-xl border border-gray-100 min-h-[160px] text-sm">
            {formData.message}
          </div>

          {success && <div className="mt-4 p-3 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Reminder sent successfully!</div>}
          {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-xl">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default SendReminders;