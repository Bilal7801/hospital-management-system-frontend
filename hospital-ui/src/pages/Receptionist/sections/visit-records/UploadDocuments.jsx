import React, { useState, useEffect } from 'react';
import { UploadCloud, FileSpreadsheet, Trash2, CheckCircle, Loader2, AlertCircle, Users } from 'lucide-react';
import api from '../../../../api/axios';

const UploadDocuments = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [docCategory, setDocCategory] = useState('prescription');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [patients, setPatients] = useState([]);

  // Fetch Patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/receptionist/patient/search?searchTerm=&page=1&pageSize=200');
        setPatients(response.data.data || []);
      } catch (err) {
        console.error("Failed to load patients", err);
      }
    };
    fetchPatients();
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedPatientId) {
      setError("Please select a patient");
      return;
    }
    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    setUploading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('patientId', selectedPatientId);
    formData.append('documentType', docCategory);

    try {
      const response = await api.post('/receptionist/visit-records/document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setSuccess(true);
        setSelectedFile(null);
        setTimeout(() => setSuccess(false), 2500);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
          <UploadCloud className="w-5 h-5 text-blue-600" />
          Clinical File Asset Intake System
        </h3>
        <p className="text-sm text-gray-500 mt-1">Attach prescriptions, lab reports, and supporting documents securely</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel - Selection */}
        <div className="lg:col-span-5 space-y-6">
          {/* Patient Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">Select Patient</label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
              required
            >
              <option value="">Select Patient...</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.fullName} {p.patientIdCode ? `(${p.patientIdCode})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Document Category */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">Document Category</label>
            <select
              value={docCategory}
              onChange={(e) => setDocCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
            >
              <option value="prescription">Official Patient Prescription</option>
              <option value="report">Laboratory / Diagnostic Report</option>
              <option value="insurance">Insurance Claim Document</option>
              <option value="id-proof">National ID / Proof</option>
              <option value="other">Other Document</option>
            </select>
          </div>

          {/* File Upload Area */}
          <div 
            className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-2xl p-10 text-center transition-all cursor-pointer group"
            onClick={() => document.getElementById('fileInput').click()}
          >
            <UploadCloud className="w-12 h-12 mx-auto text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="mt-4 font-medium text-gray-700">Click to select file or drag & drop</p>
            <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG • Max 10MB</p>
            
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {selectedFile && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                <div className="text-sm">
                  <p className="font-medium text-gray-800 truncate max-w-[220px]">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                onClick={handleUpload}
                disabled={uploading || !selectedPatientId}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-xl text-sm font-semibold"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          )}
        </div>

        {/* Right Panel - Uploaded Files */}
        <div className="lg:col-span-7">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Recently Uploaded Documents</h4>
          <div className="border border-gray-200 rounded-xl p-6 text-center text-gray-400 min-h-[200px] flex items-center justify-center">
            Uploaded documents will appear here
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-start gap-3">
          <CheckCircle className="w-5 h-5 mt-0.5" />
          Document uploaded successfully!
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;