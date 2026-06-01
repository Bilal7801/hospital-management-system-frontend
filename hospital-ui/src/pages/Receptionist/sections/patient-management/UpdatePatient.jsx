import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import api from '../../../../api/axios';

const UpdatePatient = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', cnic: '', dateOfBirth: '',
    gender: '', bloodGroup: '', address: '', city: '', postalCode: '',
    emergencyContact: '', emergencyPhone: '', medicalHistory: '',
    allergies: '', currentMedications: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Load patient data
  useEffect(() => {
    if (!patientId) {
      navigate('/receptionist/patient-management');
      return;
    }

    const fetchPatient = async () => {
      try {
        const response = await api.get(`/receptionist/patient/${patientId}`);
        const p = response.data;

        setFormData({
          fullName: p.fullName || '',
          email: p.email || '',
          phone: p.phone || '',
          cnic: p.cnic || '',
          dateOfBirth: p.dateOfBirth ? p.dateOfBirth.split('T')[0] : '',
          gender: p.gender || '',
          bloodGroup: p.bloodGroup || '',
          address: p.address || '',
          city: p.city || '',
          postalCode: p.postalCode || '',
          emergencyContact: p.emergencyContact || '',
          emergencyPhone: p.emergencyPhone || '',
          medicalHistory: p.medicalHistory || '',
          allergies: p.allergies || '',
          currentMedications: p.currentMedications || '',
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load patient data");
        navigate('/receptionist/patient-management');
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    try {
      await api.put('/receptionist/patient/update', {
        patientId: parseInt(patientId),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        cnic: formData.cnic,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        medicalHistory: formData.medicalHistory,
        allergies: formData.allergies,
        currentMedications: formData.currentMedications,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to update patient. Please check all fields.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/receptionist/patient-management');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button 
        onClick={handleCancel} 
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Patient Management
      </button>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl px-5 py-4 text-white shadow-sm">
        <h1 className="text-xl font-bold tracking-tight">Update Patient Details</h1>
        <p className="text-blue-100 text-sm mt-0.5">Modify and manage patient records efficiently</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 font-semibold flex items-center gap-2">
          ✅ Patient updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          {['personal', 'medical', 'emergency'].map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 px-4 text-xs font-bold text-center tracking-wider uppercase border-b transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'text-blue-600 border-blue-600 bg-white font-extrabold' 
                  : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-sm font-bold text-gray-900">Core Demographics</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField 
                  label="Full Name" 
                  name="fullName" 
                  required 
                  icon={User} 
                  value={formData.fullName} 
                  onChange={handleInputChange}
                  placeholder="John Doe" 
                />
                <InputField 
                  label="Email Address" 
                  name="email" 
                  type="email" 
                  required 
                  icon={Mail} 
                  value={formData.email} 
                  onChange={handleInputChange}
                  placeholder="john@example.com" 
                />
                <InputField 
                  label="Phone Number" 
                  name="phone" 
                  required 
                  icon={Phone} 
                  value={formData.phone} 
                  onChange={handleInputChange}
                  placeholder="03XX-XXXXXXX" 
                />
                <InputField 
                  label="CNIC Number" 
                  name="cnic" 
                  required 
                  value={formData.cnic} 
                  onChange={handleInputChange}
                  placeholder="XXXXX-XXXXXXX-X" 
                />
                <InputField 
                  label="Date of Birth" 
                  name="dateOfBirth" 
                  type="date" 
                  required 
                  icon={Calendar} 
                  value={formData.dateOfBirth} 
                  onChange={handleInputChange} 
                />
                <SelectField 
                  label="Gender" 
                  name="gender" 
                  options={['Male', 'Female', 'Other']} 
                  value={formData.gender} 
                  onChange={handleInputChange} 
                />
                <SelectField 
                  label="Blood Group" 
                  name="bloodGroup" 
                  options={['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']} 
                  value={formData.bloodGroup} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-4 mt-5 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Address Information</h4>
                <InputField 
                  label="Street Address" 
                  name="address" 
                  required 
                  icon={MapPin} 
                  value={formData.address} 
                  onChange={handleInputChange}
                  placeholder="123 Main Street, Phase 2" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField 
                    label="City" 
                    name="city" 
                    required 
                    value={formData.city} 
                    onChange={handleInputChange}
                    placeholder="Sialkot" 
                  />
                  <InputField 
                    label="Postal Code" 
                    name="postalCode" 
                    value={formData.postalCode} 
                    onChange={handleInputChange}
                    placeholder="51310" 
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medical' && (
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-sm font-bold text-gray-900">Medical Information</h3>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Medical History</label>
                <textarea 
                  name="medicalHistory" 
                  value={formData.medicalHistory} 
                  onChange={handleInputChange} 
                  rows="3" 
                  placeholder="Diabetes, Hypertension, Previous Surgery..."
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Allergies</label>
                <textarea 
                  name="allergies" 
                  value={formData.allergies} 
                  onChange={handleInputChange} 
                  rows="3" 
                  placeholder="Penicillin, Dust, Nuts..."
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Current Medications</label>
                <textarea 
                  name="currentMedications" 
                  value={formData.currentMedications} 
                  onChange={handleInputChange} 
                  rows="3" 
                  placeholder="Metformin 500mg, Amlodipine 5mg..."
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 focus:bg-white text-sm"
                />
              </div>
            </div>
          )}

          {activeTab === 'emergency' && (
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-sm font-bold text-gray-900">Emergency Contact</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField 
                  label="Emergency Contact Name" 
                  name="emergencyContact" 
                  icon={User} 
                  value={formData.emergencyContact} 
                  onChange={handleInputChange}
                  placeholder="Muhammad Ahmed" 
                />
                <InputField 
                  label="Emergency Contact Phone" 
                  name="emergencyPhone" 
                  icon={Phone} 
                  value={formData.emergencyPhone} 
                  onChange={handleInputChange}
                  placeholder="03XX-XXXXXXX" 
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8 pt-5 border-t border-gray-100">
            <button 
              type="button" 
              onClick={handleCancel} 
              className="flex-1 px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving} 
              className="flex-1 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition font-semibold"
            >
              {saving ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Helper Components
const InputField = ({ label, name, type = 'text', placeholder = '', required = false, icon: Icon = null, value, onChange }) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />}
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 focus:bg-white transition"
      />
    </div>
  </div>
);

const SelectField = ({ label, name, options, value, onChange }) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
    <select 
      name={name} 
      value={value || ''} 
      onChange={onChange} 
      className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 focus:bg-white transition"
    >
      <option value="">Select {label}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default UpdatePatient;