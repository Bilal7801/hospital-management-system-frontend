import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, Trash2, CheckCircle } from 'lucide-react';

const UploadDocuments = () => {
  const [docCategory, setDocCategory] = useState('prescription');

  const activeStagedFiles = [
    { id: 1, name: "Rx_Consultation_Scan_449.pdf", size: "1.4 MB", tag: "Prescription" },
    { id: 2, name: "Lab_Haematology_Report.png", size: "890 KB", tag: "Diagnostic Report" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-blue-600" />
          Clinical File Asset Intake System
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Attach physical prescriptions, local imaging files, and diagnostic slips securely into core charts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Upload Selection Fields Column */}
        <div className="md:col-span-1 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Document Group Category Tag</label>
            <select
              value={docCategory}
              onChange={(e) => setDocCategory(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 font-semibold cursor-pointer transition-all"
            >
              <option value="prescription">Official Patient Prescription</option>
              <option value="report">Laboratory Diagnostic Report</option>
              <option value="insurance">Insurance Claim Settlement Sheet</option>
              <option value="id-proof">National Identification Scan</option>
            </select>
          </div>

          {/* Faux File Drop Target Drag Frame */}
          <div className="border-2 border-dashed border-gray-200 hover:border-blue-500 rounded-xl p-5 text-center transition-all bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer group">
            <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors mb-2" />
            <span className="text-xs font-bold text-gray-700 block">Select Target Data File</span>
            <span className="text-[10px] text-gray-400 font-medium block mt-0.5">PDF, PNG, JPG up to 10MB</span>
          </div>
        </div>

        {/* Live Staged Records Subgrid */}
        <div className="md:col-span-2 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
            Queued Record Transfers Pending Database Commit
          </span>

          <div className="space-y-2">
            {activeStagedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3.5 border border-gray-100 rounded-xl bg-gray-50/60 text-xs hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white border border-gray-100 rounded-lg text-blue-600 shadow-sm">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{file.name}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400 font-bold">
                      <span>{file.size}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="text-blue-600 uppercase tracking-wide text-[9px]">{file.tag}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold px-2 py-0.5 rounded-md">
                    <CheckCircle className="w-3 h-3" /> Ready
                  </span>
                  <button className="text-gray-400 hover:text-rose-600 transition-colors cursor-pointer p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;