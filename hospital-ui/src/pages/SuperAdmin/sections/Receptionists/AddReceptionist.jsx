import React, { useState } from 'react';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/axios';   // ← Using your custom api

const AddReceptionist = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shift: 'Morning',
    permissions: 'ViewAppointments,BookAppointment,CheckInPatient'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        shift: formData.shift,
        permissions: formData.permissions || ''
      };

      // Try both common routes
      const response = await api.post('/Receptionist', payload);
      // If above fails, you can also try: '/api/receptionists'

      setSuccess(true);
      
      setTimeout(() => {
        navigate('/dashboard/receptionists');
      }, 1500);

    } catch (err) {
      console.error(err.response?.data); // Helpful for debugging
      setError(
        err.response?.data?.message || 
        err.response?.data?.title || 
        'Failed to add receptionist. Please check the console.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen">

      <button
        onClick={() => navigate('/dashboard/receptionists')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Receptionists
      </button>

      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Add New Receptionist
        </h2>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
            ✅ Receptionist added successfully! Redirecting...
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors"
              placeholder="receptionist@example.com"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors"
              placeholder="0300-1234567"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
              Shift
            </label>
            <select
              name="shift"
              value={formData.shift}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
              Permissions <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="permissions"
              value={formData.permissions}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors"
              placeholder="ViewAppointments,BookAppointment,CheckInPatient"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Receptionist...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Receptionist
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddReceptionist;