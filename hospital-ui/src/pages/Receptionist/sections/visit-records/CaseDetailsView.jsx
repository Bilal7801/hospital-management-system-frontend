import React from 'react';
import { ArrowLeft, FileText, Calendar, User, Activity, Clock, Download, ShieldCheck } from 'lucide-react';

const CaseDetailsView = ({ caseId = "ENC-2026-904", onBack }) => {
  // Mock structured case file data matching the row click
  const caseData = {
    id: caseId,
    date: "12-May-2026",
    time: "10:15 AM",
    patientName: "Vikas Khanna",
    patientId: "PT-9082",
    provider: "Dr. Aman Gupta",
    department: "Cardiology Hub",
    visitType: "Regular Follow-up",
    frontDeskNotes: "Patient requested wheelchair assistance upon arrival. Insurance eligibility check verified successfully.",
    uploadedFiles: [
      { name: "Rx_Consultation_Scan_449.pdf", size: "1.4 MB", type: "Prescription" },
      { name: "Lab_Haematology_Report.png", size: "890 KB", type: "Diagnostic Report" }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      {/* Header / Back Navigation Row */}
      <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all shadow-sm cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-blue-600 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight">Case File Details</h3>
              <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                {caseData.id}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Comprehensive administrative and archival summary for this medical encounter</p>
          </div>
        </div>

        <button className="sm:self-center bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm">
          <Download className="w-3.5 h-3.5 text-blue-600" /> Export Case Dossier
        </button>
      </div>

      {/* Core Demographics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50/60 border border-gray-100 p-4 rounded-xl text-xs">
        <div className="space-y-1">
          <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider flex items-center gap-1">
            <User className="w-3 h-3 text-gray-400" /> Patient Info
          </span>
          <p className="font-bold text-gray-800">{caseData.patientName}</p>
          <p className="text-[10px] text-gray-500 font-mono font-semibold">ID: {caseData.patientId}</p>
        </div>

        <div className="space-y-1">
          <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider flex items-center gap-1">
            <Activity className="w-3 h-3 text-blue-500" /> Medical Officer
          </span>
          <p className="font-bold text-gray-800">{caseData.provider}</p>
          <p className="text-[10px] text-blue-600 font-bold">{caseData.department}</p>
        </div>

        <div className="space-y-1">
          <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider flex items-center gap-1">
            <Calendar className="w-3 h-3 text-gray-400" /> Schedule Data
          </span>
          <p className="font-bold text-gray-800 font-mono">{caseData.date}</p>
          <p className="text-[10px] text-gray-500 flex items-center gap-1 font-medium mt-0.5">
            <Clock className="w-3 h-3 text-gray-400" /> {caseData.time}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-gray-400 font-bold block uppercase text-[10px] tracking-wider">Classification</span>
          <div>
            <span className="inline-block bg-white text-gray-700 font-bold px-2 py-0.5 rounded border border-gray-200 text-[10px] mt-0.5 shadow-sm">
              {caseData.visitType}
            </span>
          </div>
        </div>
      </div>

      {/* Core Details Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Administrative Notes Progress Log */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-50 pb-2">
              <FileText className="w-4 h-4 text-blue-600" /> Front-Desk Operative Notes
            </h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed bg-gray-50/50 p-3.5 border border-gray-100 rounded-xl tracking-normal">
              {caseData.frontDeskNotes}
            </p>
          </div>
        </div>

        {/* Right Column: Embedded Attached Documents Track */}
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-50 pb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Secured Attachments
            </h4>
            
            <div className="space-y-2.5">
              {caseData.uploadedFiles.map((file, idx) => (
                <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs flex items-center justify-between hover:bg-gray-100/70 transition-colors">
                  <div className="space-y-0.5 max-w-[70%]">
                    <p className="font-bold text-gray-800 truncate">{file.name}</p>
                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wide">{file.type}</p>
                  </div>
                  <button className="p-2 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg text-gray-500 hover:text-blue-600 shadow-sm transition-all cursor-pointer">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsView;