import React, { useState, useEffect } from 'react';
import { Ticket, Printer, Clock, Loader2, AlertCircle, CheckCircle, User } from 'lucide-react';
import api from '../../../../api/axios'; // Adjust relative path based on your folder structure

const GenerateToken = ({ onActionSuccess }) => {
  // Form States
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [walkInName, setWalkInName] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('Standard Routine');
  
  // Data & UI State Management
  const [doctors, setDoctors] = useState([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Live Thermal Ticket Preview State
  const [tokenPreview, setTokenPreview] = useState({
    clinic: "Metro Care Medical Facility",
    number: "TKN-000",
    timestamp: "--/--/---- | --:-- --",
    estWait: "No Active Queue"
  });

  // Print Modal State
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [printData, setPrintData] = useState(null);

  // 1. Fetch available doctors to populate the dropdown on mount
  useEffect(() => {
    const fetchActiveDoctors = async () => {
      try {
        setIsLoadingDoctors(true);
        const response = await api.get('/receptionist/queue-management/doctors');
        const doctorData = response.data || [];
        setDoctors(doctorData);
        
        if (doctorData.length > 0) {
          const firstDocId = doctorData[0].doctorId ?? doctorData[0].DoctorId;
          setSelectedDoctor(firstDocId ? firstDocId.toString() : '');
        }
      } catch (error) {
        console.error("Failed loading doctor directory:", error);
        setFeedback({
          type: 'error',
          message: 'Could not load the healthcare provider directory. Please check your backend.'
        });
      } finally {
        setIsLoadingDoctors(false);
      }
    };

    fetchActiveDoctors();
  }, []);

  // 2. Submit Walk-In Entry to Database
 const handleGenerateToken = async (e) => {
  e.preventDefault();

  if (!walkInName.trim()) {
    setFeedback({ type: 'error', message: 'Patient name is required' });
    return;
  }
  if (!selectedDoctor) {
    setFeedback({ type: 'error', message: 'Please select a doctor' });
    return;
  }

  setIsSubmitting(true);
  setFeedback({ type: '', message: '' });

  try {
    const payload = {
      doctorId: parseInt(selectedDoctor),
      walkInPatientName: walkInName.trim(),
      urgencyLevel: urgencyLevel,
      triageNotes: "Walk-in patient"
    };

    const response = await api.post('/receptionist/queue-management/generate-token', payload);
    const data = response.data;

    const tokenNumber = data.token || data.number || "TKN-000";

    setFeedback({
      type: 'success',
      message: `Token ${tokenNumber} generated successfully!`
    });

    // Update Preview
    setTokenPreview({
      clinic: data.clinic || "Metro Care Medical Facility",
      number: tokenNumber,
      timestamp: data.timestamp || new Date().toLocaleString(),
      estWait: data.estWait || "Approx. 15 Mins"
    });

    setPrintData({
      clinic: data.clinic || "Metro Care Medical Facility",
      number: tokenNumber,
      timestamp: data.timestamp || new Date().toLocaleString(),
      estWait: data.estWait || "Approx. 15 Mins",
      patientName: walkInName.trim(),
      doctorName: doctors.find(d => (d.doctorId || d.DoctorId) == selectedDoctor)?.doctorName || 'N/A',
      urgency: urgencyLevel
    });

    setShowPrintPreview(true);
    setWalkInName(''); // Reset name field

  } catch (error) {
    console.error(error);
    setFeedback({
      type: 'error',
      message: error.response?.data?.message || "Failed to generate token"
    });
  } finally {
    setIsSubmitting(false);
  }
};

  // Handle Print Functionality
  const handlePrint = () => {
    window.print();
  };

  const closePrintPreview = () => {
    setShowPrintPreview(false);
    setPrintData(null);
  };

  return (
    <>
      {/* Print Preview Modal */}
      {showPrintPreview && printData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-blue-600" />
                Print Token
              </h2>
              <button
                onClick={closePrintPreview}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none font-bold p-1 cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Printable Ticket Content */}
            <div className="p-8 printable-section">
              <div className="border-4 border-gray-800 rounded-lg p-8 bg-white text-center space-y-4 font-serif">
                {/* Clinic Header */}
                <div className="text-sm font-bold uppercase tracking-wider text-gray-700 border-b-2 pb-3">
                  {printData.clinic}
                </div>

                {/* Token Number */}
                <div className="py-2">
                  <div className="text-xs text-gray-500 font-semibold tracking-wide mb-1">YOUR TOKEN NUMBER</div>
                  <div className="text-6xl font-black text-blue-600 tracking-tighter">
                    {printData.number}
                  </div>
                </div>

                {/* Divider Line */}
                <div className="border-b-2 border-gray-800 py-1"></div>

                {/* Patient Name */}
                <div className="text-left space-y-0.5">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Patient Name</div>
                  <div className="text-sm font-bold text-gray-800">{printData.patientName}</div>
                </div>

                {/* Doctor Name */}
                <div className="text-left space-y-0.5">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Assigned Doctor</div>
                  <div className="text-sm font-bold text-gray-800">{printData.doctorName}</div>
                </div>

                {/* Timestamp */}
                <div className="text-left space-y-0.5">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date & Time</div>
                  <div className="text-sm font-bold text-gray-800">{printData.timestamp}</div>
                </div>

                {/* Urgency Level */}
                <div className="text-left space-y-0.5">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Priority Level</div>
                  <div className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded inline-block border border-emerald-100">
                    {printData.urgency}
                  </div>
                </div>

                {/* Estimated Wait */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded p-3 text-sm font-semibold text-blue-800">
                  Estimated Wait Time: {printData.estWait}
                </div>

                {/* Footer */}
                <div className="border-t-2 border-gray-800 pt-3 text-xs text-gray-500 font-semibold">
                  Please keep this token safe. Our staff will call your token number when ready.
                </div>
              </div>
            </div>

            {/* Modal Footer - Action Buttons */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex gap-3">
              <button
                onClick={closePrintPreview}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-100"
              >
                <Printer className="w-4 h-4" />
                Print Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Stylesheet - Hidden from Screen */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-section,
            .printable-section * {
              visibility: visible;
            }
            .printable-section {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            @page {
              margin: 0.5cm;
            }
          }
        `}
      </style>

      {/* Main Component Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Parameters Matrix Selection */}
        <form onSubmit={handleGenerateToken} className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-blue-600" />
              Thermal Token Badge Issuer
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Generate standalone physical routing tokens for incoming healthcare walk-ins</p>
          </div>

          {/* Dynamic Status Notifications */}
          {feedback.message && (
            <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs font-semibold ${
              feedback.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              {feedback.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>{feedback.message}</div>
            </div>
          )}

          <div className="space-y-4">
            {/* Walk-in Name Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Walk-In Patient Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ex: Muhammad Raza"
                  disabled={isSubmitting}
                  value={walkInName}
                  onChange={(e) => setWalkInName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 font-semibold shadow-inner transition-all disabled:opacity-60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Target Doctor Dropdown */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Target Provider Allocation</label>
                {isLoadingDoctors ? (
                  <div className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-2 text-gray-400 font-medium">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" /> Fetching providers...
                  </div>
                ) : (
                  <select
                    value={selectedDoctor}
                    disabled={isSubmitting}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 font-semibold cursor-pointer transition-all disabled:opacity-60"
                  >
                    {doctors.length === 0 && <option value="">No Active Doctors Found</option>}
                    {doctors.map((doc) => {
                      const docId = doc.doctorId ?? doc.DoctorId;
                      const docName = doc.doctorName ?? doc.DoctorName;
                      const deptName = doc.departmentName || doc.DepartmentName || 'General OPD';
                      return (
                        <option key={docId} value={docId}>
                          {docName} ({deptName})
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>

              {/* Urgency Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Urgency Index Class</label>
                <select
                  value={urgencyLevel}
                  disabled={isSubmitting}
                  onChange={(e) => setUrgencyLevel(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 font-semibold cursor-pointer transition-all disabled:opacity-60"
                >
                  <option value="Standard Routine">Standard Routine Consultation</option>
                  <option value="Priority Follow-up">Priority Clinical Follow-up</option>
                  <option value="Urgent Triage Case">Urgent Triage Tracking Case</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50/40 rounded-xl p-4 border border-blue-100/60 text-xs text-blue-800 font-medium leading-relaxed">
              <strong>System Operational Note:</strong> Creating a sequential token instantly logs the patient identifier block into the live dashboard and pushes notification matrix streams directly to the targeted doctor's dashboard app console.
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isLoadingDoctors}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide uppercase px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-100 flex items-center gap-2 cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Generating Badge...
                </>
              ) : (
                <>
                  <Printer className="w-4 h-4" /> Execute Print & Issue Token Ticket
                </>
              )}
            </button>
          </div>
        </form>

        {/* Ticket Layout Preview Matrix */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between items-center text-center">
          <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest border border-gray-200 rounded-md px-2 py-0.5 bg-gray-50">
            Live Badge Preview Output
          </span>

          {/* Thermal Ticket Render */}
          <div className="w-full max-w-55 border-2 border-dashed border-gray-300 rounded-xl p-4 my-6 bg-amber-50/10 shadow-inner flex flex-col items-center animate-fade-in">
            <span className="text-[9px] font-extrabold text-blue-600 uppercase tracking-tight">{tokenPreview.clinic}</span>
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center my-3 text-blue-600 border border-blue-100">
              <Ticket className="w-4 h-4" />
            </div>
            <h2 className="text-2xl font-black tracking-wider text-gray-800">{tokenPreview.number}</h2>
            <div className="h-px bg-gray-200 w-full my-3"></div>
            
            <span className="text-[9px] text-gray-400 font-bold tracking-tight">{tokenPreview.timestamp}</span>
            
            <div className="mt-2.5 bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-md font-bold border border-emerald-100 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {tokenPreview.estWait}
            </div>
          </div>

          <p className="text-[10px] text-gray-400 font-semibold leading-normal px-2">
            Verify device synchronization constraints before deploying output to external point-of-sale terminal modules.
          </p>
        </div>
      </div>
    </>
  );
};

export default GenerateToken;