import React, { useState, useEffect } from 'react';
import { Receipt, Search, FileSpreadsheet, Loader2, CheckCircle, AlertCircle, User } from 'lucide-react';
import api from '../../../../api/axios';

const CreateInvoice = ({ onInvoiceCreated }) => {
  const [searchCode, setSearchCode] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);

  // Fetch Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/superadmin/doctors/search');
        setDoctors(response.data || []);
      } catch (err) {
        console.error("Failed to load doctors:", err);
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleCreateInvoice = async () => {
    if (!searchCode.trim()) {
      setError("Please enter patient name or appointment ID (e.g., APT-0006)");
      return;
    }
    if (!selectedDoctorId) {
      setError("Please select a doctor");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const payload = {
        searchTerm: searchCode.trim(),
        doctorId: parseInt(selectedDoctorId),
        notes: `Invoice created via receptionist panel for ${searchCode}`
      };

      const response = await api.post('/receptionist/billing/create-invoice', payload);
      const result = response.data;

      if (result.success) {
        setInvoiceData(result.data);
        setSuccess(true);

        if (onInvoiceCreated) {
          onInvoiceCreated(result.data.invoiceId, result.data.patientName);
        }
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to create invoice.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-blue-600" />
          Initialize New Patient Billing Statement
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Search by Patient Name or Appointment ID + Select Doctor
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Patient Search */}
        <div className="relative">
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Patient Name or Appointment ID <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter Appointment ID or Patient Name..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 transition-all font-semibold shadow-inner"
            />
          </div>
        </div>

        {/* Doctor Selection */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Assign Doctor <span className="text-red-500">*</span>
          </label>
          {loadingDoctors ? (
            <div className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading doctors...
            </div>
          ) : (
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 font-semibold cursor-pointer"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => {
                const docId = doc.doctorId || doc.DoctorId || doc.id;
                const docName = doc.doctorName || doc.DoctorName || doc.name;
                return (
                  <option key={docId} value={docId}>
                    {docName}
                  </option>
                );
              })}
            </select>
          )}
        </div>
      </div>

      <button 
        onClick={handleCreateInvoice}
        disabled={loading || !searchCode.trim() || !selectedDoctorId}
        className="w-full bg-blue-600 text-white font-bold text-xs tracking-wide uppercase px-5 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating Invoice...
          </>
        ) : (
          <>
            <FileSpreadsheet className="w-4 h-4" />
            Create Invoice
          </>
        )}
      </button>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>{error}</div>
        </div>
      )}

      {success && invoiceData && (
        <div className="border border-emerald-200 bg-emerald-50/60 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-emerald-700">Invoice Created Successfully!</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 text-xs block">Invoice ID</span>
              <p className="font-bold">#{invoiceData.invoiceId}</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs block">Patient</span>
              <p className="font-bold">{invoiceData.patientName}</p>
            </div>
            {invoiceData.doctorId && (
              <div>
                <span className="text-gray-500 text-xs block">Doctor ID</span>
                <p className="font-bold">Dr. #{invoiceData.doctorId}</p>
              </div>
            )}
            <div>
              <span className="text-gray-500 text-xs block">Status</span>
              <p className="font-bold text-emerald-600">Draft</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInvoice;