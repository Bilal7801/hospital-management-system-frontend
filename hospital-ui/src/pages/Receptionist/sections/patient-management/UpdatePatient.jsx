// pages/Receptionist/sections/patient-management/UpdatePatient.jsx
import React, { useState } from 'react';
import { Mail, Phone, AlertCircle, CheckCircle, Save, X, Calendar, MapPin, User } from 'lucide-react';

const INITIAL_PATIENT_DATA = {
  fullName: 'Ahmed Khan',
  email: 'ahmed@example.com',
  phone: '0300-1234567',
  cnic: '12345-6789012-3',
  dateOfBirth: '1995-03-15',
  gender: 'Male',
  bloodGroup: 'O+',
  address: '123 Main Street',
  city: 'Karachi',
  postalCode: '75000',
  emergencyContact: 'Fatima Khan',
  emergencyPhone: '0321-9876543',
  medicalHistory: 'Previous respiratory infection, controlled hypertension',
  allergies: 'Penicillin allergy',
  currentMedications: 'Amlodipine 5mg daily, Aspirin 100mg daily',
};

const UpdatePatient = () => {
  const [formData, setFormData] = useState({ ...INITIAL_PATIENT_DATA });
  const [changes, setChanges] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (INITIAL_PATIENT_DATA[name] !== value) {
      setChanges(prev => ({ ...prev, [name]: value }));
    } else {
      setChanges(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setChanges({});
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating patient:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...INITIAL_PATIENT_DATA });
    setChanges({});
    setErrors({});
  };

  const InputField = ({ label, name, type = 'text', placeholder, required = false, icon: Icon = null }) => (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />}
        <input
          type={type}
          name={name}
          value={formData[name] || ''}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-1.5 text-sm border rounded-xl focus:outline-none transition-colors ${
            errors[name] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
          } bg-gray-50 focus:bg-white`}
        />
      </div>
      {errors[name] && (
        <div className="flex items-center gap-1 mt-1 text-red-600 text-[11px] font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          {errors[name]}
        </div>
      )}
    </div>
  );

  const SelectField = ({ label, name, options, required = false }) => (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={formData[name] || ''}
        onChange={handleInputChange}
        className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:outline-none transition-colors cursor-pointer ${
          errors[name] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
        } bg-gray-50 focus:bg-white text-gray-800`}
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {errors[name] && (
        <div className="flex items-center gap-1 mt-1 text-red-600 text-[11px] font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          {errors[name]}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header Panel */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl px-5 py-4 text-white shadow-sm">
        <h1 className="text-xl font-bold tracking-tight">Update Patient Details</h1>
        <p className="text-blue-100 text-sm mt-0.5">Modify and manage patient records efficiently</p>
      </div>

      {/* Alert Messaging Stacks */}
      {success && (
        <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-green-900">Patient updated successfully!</p>
            <p className="text-green-700 text-xs mt-0.5">All modifications have been processed and saved.</p>
          </div>
        </div>
      )}

      {Object.keys(changes).length > 0 && (
        <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-amber-900">Unsaved Changes Detected</p>
            <p className="text-amber-700 text-xs mt-0.5">{Object.keys(changes).length} field(s) have been modified and require submission.</p>
          </div>
        </div>
      )}

      {/* Main Core Editor Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Compressed Navigation Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          {['personal', 'medical', 'emergency'].map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 px-4 text-xs font-bold text-center tracking-wider uppercase border-b transition-all cursor-pointer ${
                activeTab === tab
                  ? 'text-blue-600 border-blue-600 bg-white font-extrabold shadow-[inset_0_2px_0_0_rgba(37,99,235,1)]'
                  : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* Section A: Personal Information */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-sm font-bold text-gray-900">Core Demographics</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Full Name" name="fullName" placeholder="John Doe" required icon={User} />
                <InputField label="Email Address" name="email" type="email" placeholder="john@example.com" required icon={Mail} />
                <InputField label="Phone Number" name="phone" placeholder="03XX-XXXXXXX" required icon={Phone} />
                <InputField label="CNIC Number" name="cnic" placeholder="XXXXX-XXXXXXX-X" required />
                <InputField label="Date of Birth" name="dateOfBirth" type="date" required icon={Calendar} />
                <SelectField label="Gender" name="gender" options={['Male', 'Female', 'Other']} required />
                <SelectField label="Blood Group" name="bloodGroup" options={['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']} />
              </div>

              <div className="space-y-4 mt-5 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Address Routing</h4>
                <InputField label="Street Address" name="address" placeholder="123 Main Street" required icon={MapPin} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="City" name="city" placeholder="Karachi" required />
                  <InputField label="Postal Code" name="postalCode" placeholder="75000" />
                </div>
              </div>
            </div>
          )}

          {/* Section B: Medical Profile Details */}
          {activeTab === 'medical' && (
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-sm font-bold text-gray-900">Clinical Background</h3>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Medical History</label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory || ''}
                  onChange={handleInputChange}
                  placeholder="List any previous medical conditions, surgeries, or treatments..."
                  rows="3"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 focus:bg-white text-sm cursor-pointer transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Allergies</label>
                <textarea
                  name="allergies"
                  value={formData.allergies || ''}
                  onChange={handleInputChange}
                  placeholder="List any known allergies (medications, food, environmental, etc.)..."
                  rows="3"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 focus:bg-white text-sm cursor-pointer transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Current Medications</label>
                <textarea
                  name="currentMedications"
                  value={formData.currentMedications || ''}
                  onChange={handleInputChange}
                  placeholder="List current medications with dosage..."
                  rows="3"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 focus:bg-white text-sm cursor-pointer transition-colors"
                />
              </div>
            </div>
          )}

          {/* Section C: Emergency Metrics */}
          {activeTab === 'emergency' && (
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-sm font-bold text-gray-900">Crisis Contacts</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Emergency Contact Name" name="emergencyContact" placeholder="Emergency contact person" icon={User} />
                <InputField label="Emergency Contact Phone" name="emergencyPhone" placeholder="03XX-XXXXXXX" icon={Phone} />
              </div>

              <div className="mt-4 p-3 bg-blue-50/60 border border-blue-100 rounded-xl">
                <p className="text-xs text-blue-800 font-medium">
                  <span className="font-bold">Notice:</span> Crisis contact indexes are highly restricted and utilized only during acute clinical emergencies.
                </p>
              </div>
            </div>
          )}

          {/* Action Trigger Buttons Container */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-1.5 text-xs font-bold border border-gray-200 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Cancel Changes</span>
            </button>
            <button
              type="submit"
              disabled={loading || Object.keys(changes).length === 0}
              className="flex-1 px-4 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Processing...' : 'Save Patient Records'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Bottom Segment Meta Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">System Audit Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">System Patient ID</p>
            <p className="text-sm text-gray-800 font-bold mt-0.5">PID-78492</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">First Database Entry</p>
            <p className="text-sm text-gray-800 font-bold mt-0.5">January 15, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePatient;