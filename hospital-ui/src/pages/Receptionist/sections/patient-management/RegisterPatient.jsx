import React, { useState } from 'react';
import { Mail, Phone, AlertCircle, CheckCircle, Calendar, MapPin, User } from 'lucide-react';
import api from '../../../../api/axios';

// --- Components moved outside to fix the focus issue ---

const InputField = ({ label, name, type = 'text', placeholder, required = false, icon: Icon = null, formData, handleInputChange, errors }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />}
      <input
        type={type}
        name={name}
        value={formData[name] || ''}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full ${Icon ? 'pl-9' : 'pl-3.5'} pr-3.5 py-2 text-sm border rounded-xl focus:outline-none transition ${
          errors[name] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
        } bg-gray-50 focus:bg-white`}
      />
    </div>
    {errors[name] && (
      <div className="flex items-center gap-1 mt-1 text-red-600 text-xs font-medium">
        <AlertCircle className="w-3.5 h-3.5" />
        {errors[name]}
      </div>
    )}
  </div>
);

const SelectField = ({ label, name, options, required = false, formData, handleInputChange, errors }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={formData[name] || ''}
      onChange={handleInputChange}
      className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:outline-none transition ${
        errors[name] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
      } bg-gray-50 focus:bg-white`}
    >
      <option value="">Select {label}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    {errors[name] && (
      <div className="flex items-center gap-1 mt-1 text-red-600 text-xs font-medium">
        <AlertCircle className="w-3.5 h-3.5" />
        {errors[name]}
      </div>
    )}
  </div>
);

// --- Main Component ---

const RegisterPatient = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', cnic: '', dateOfBirth: '',
    gender: '', bloodGroup: '', address: '', city: '', postalCode: '',
    emergencyContact: '', emergencyPhone: '', medicalHistory: '', 
    allergies: '', currentMedications: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.cnic.trim()) newErrors.cnic = 'CNIC is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await api.post('/receptionist/patient/register', formData);
      setSuccess(true);
      setFormData({
        fullName: '', email: '', phone: '', cnic: '', dateOfBirth: '',
        gender: '', bloodGroup: '', address: '', city: '', postalCode: '',
        emergencyContact: '', emergencyPhone: '', medicalHistory: '', 
        allergies: '', currentMedications: '',
      });
      setErrors({});
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to register patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold mb-1">Register New Patient</h1>
        <p className="text-blue-100 text-sm opacity-90">Add comprehensive patient information to the system</p>
      </div>

      {success && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-400 rounded-xl p-3.5">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-green-900 text-sm">Patient registered successfully!</p>
            <p className="text-green-700 text-xs mt-0.5">The patient has been added to the system.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200 bg-gray-50/50 rounded-t-xl">
          {['personal', 'medical', 'emergency'].map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-sm font-semibold text-center transition border-b-2 cursor-pointer ${
                activeTab === tab ? 'text-blue-600 border-blue-600 bg-white' : 'text-gray-500 border-transparent hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Information
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'personal' && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-gray-900 border-b pb-2 border-gray-100">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Full Name" name="fullName" placeholder="John Doe" required icon={User} formData={formData} handleInputChange={handleInputChange} errors={errors} />
                <InputField label="Email Address" name="email" type="email" placeholder="john@example.com" required icon={Mail} formData={formData} handleInputChange={handleInputChange} errors={errors} />
                <InputField label="Phone Number" name="phone" placeholder="03XX-XXXXXXX" required icon={Phone} formData={formData} handleInputChange={handleInputChange} errors={errors} />
                <InputField label="CNIC Number" name="cnic" placeholder="XXXXX-XXXXXXX-X" required formData={formData} handleInputChange={handleInputChange} errors={errors} />
                <InputField label="Date of Birth" name="dateOfBirth" type="date" required icon={Calendar} formData={formData} handleInputChange={handleInputChange} errors={errors} />
                <SelectField label="Gender" name="gender" options={['Male', 'Female', 'Other']} required formData={formData} handleInputChange={handleInputChange} errors={errors} />
                <SelectField label="Blood Group" name="bloodGroup" options={['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']} formData={formData} handleInputChange={handleInputChange} errors={errors} />
              </div>

              <div className="space-y-4 mt-6 pt-4 border-t border-gray-100">
                <h4 className="text-base font-bold text-gray-900">Address Information</h4>
                <InputField label="Street Address" name="address" placeholder="123 Main Street" required icon={MapPin} formData={formData} handleInputChange={handleInputChange} errors={errors} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="City" name="city" placeholder="Karachi" required formData={formData} handleInputChange={handleInputChange} errors={errors} />
                  <InputField label="Postal Code" name="postalCode" placeholder="75000" formData={formData} handleInputChange={handleInputChange} errors={errors} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medical' && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-gray-900 border-b pb-2 border-gray-100">Medical History</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Medical History</label>
                  <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleInputChange} rows="3"
                    placeholder="List any previous medical conditions..." className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 focus:bg-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Allergies</label>
                  <textarea name="allergies" value={formData.allergies} onChange={handleInputChange} rows="3"
                    placeholder="List any known allergies..." className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 focus:bg-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Medications</label>
                  <textarea name="currentMedications" value={formData.currentMedications} onChange={handleInputChange} rows="3"
                    placeholder="List current medications with dosage..." className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 focus:bg-white text-sm" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emergency' && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-gray-900 border-b pb-2 border-gray-100">Emergency Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Emergency Contact Name" name="emergencyContact" placeholder="Emergency contact person" icon={User} formData={formData} handleInputChange={handleInputChange} errors={errors} />
                <InputField label="Emergency Contact Phone" name="emergencyPhone" placeholder="03XX-XXXXXXX" icon={Phone} formData={formData} handleInputChange={handleInputChange} errors={errors} />
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8 pt-5 border-t border-gray-100 justify-end">
            <button type="button" className="px-5 py-2 text-sm font-semibold border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition min-w-[100px]">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition min-w-[130px]"
            >
              {loading ? 'Registering...' : 'Register Patient'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPatient;